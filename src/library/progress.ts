/**
 * Calculating the progress
 */

import { IconButtonType } from 'enums'
import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'
import {
	ICheckListSection,
	IProgress,
	IYouTubeVideoDetails,
	IChecklistItemProgress,
} from 'interfaces'
import { getChecklistBySlug } from './edulist'
import { getVideoDetails } from './youtube'
import EduDatabase from './edudatabase'

const totalDurationOfSection = async (
	checklistId: string,
	checklistSection: ICheckListSection
) => {
	const { checklistItems } = checklistSection
	const promises = checklistItems.map(
		checklistItem =>
			new Promise<IChecklistItemProgress>(r => {
				// check if this item is checked via the edu database
				EduDatabase.checklistChecks
					.where({
						checklistId,
						checklistItemId: checklistItem.id,
					})
					.count()
					.then((amountOfCheckedItems: number) => {
						// If the type of our item is a YouTube video
						if (
							!checklistItem.duration &&
							checklistItem.type === IconButtonType.YouTube
						) {
							getVideoDetails(checklistItem.youTube.videoId).then(
								({ duration }: IYouTubeVideoDetails) => {
									r({
										id: checklistItem.id,
										duration: dayjs.duration(duration).asSeconds(),
										checked: amountOfCheckedItems > 0,
									})
								}
							)
						}
						// If the type of our item is something else
						else {
							r({
								id: checklistItem.id,
								duration: checklistItem.duration ? checklistItem.duration : 0,
								checked: amountOfCheckedItems > 0,
							})
						}
					})
			})
	)

	const checklistItemProgress: IChecklistItemProgress[] = await Promise.all(
		promises
	)
	const totalDuration: number = checklistItemProgress.reduce<number>(
		(a, b) => a + b.duration,
		0
	)

	return {
		id: checklistSection.id,
		totalDuration,
		totalDurationReadable: dayjs
			.duration(totalDuration * 1000)
			.format('HH[u]mm[m]ss[s]'),
		checklistItemProgress,
	}
}

export const getDurationDone = (progress: IProgress) =>
	progress.totalDurationSections
		.map(section =>
			section.checklistItemProgress.map(checklistItemProgress =>
				checklistItemProgress.checked ? checklistItemProgress.duration : 0
			)
		)
		.flatMap(x => x)
		.reduce((a, b) => a + b, 0)

export const calculatePercentage = (progress: IProgress) =>
	// calculate the total percentage
	Math.ceil((getDurationDone(progress) / progress.totalDuration) * 100)

export const getProgress = async (
	checklistSlug: string
): Promise<IProgress> => {
	const { data } = await getChecklistBySlug(checklistSlug)
	const { checklist } = data
	const { checklistSections } = checklist
	dayjs.extend(durationPlugin)

	// Initial value
	const progress: IProgress = {
		totalPercentage: 0,
		totalDuration: 0,
		totalDurationReadable: '',
		totalDurationSections: [],
		totalDurationDone: 0,
		totalDurationLeft: 0,
		totalDurationDoneReadable: '',
		totalDurationLeftReadable: '',
	}

	/**
	 * First calculate the duration of each section
	 */

	// map the promises that will calculate the total duration
	const promises = checklistSections?.map(checklistSection =>
		totalDurationOfSection(checklist.id, checklistSection)
	)

	// wait and calculate the totalduration of each section
	if (promises) {
		progress.totalDurationSections = await Promise.all(promises)
	}

	/**
	 * Make the sum of all sections
	 */

	progress.totalDuration = progress.totalDurationSections.reduce(
		(a, totalDurationSection) => a + totalDurationSection.totalDuration,
		0
	)

	/**
	 * Make the sum of all sections readable
	 */
	progress.totalDurationReadable = dayjs
		.duration(progress.totalDuration * 1000)
		.format('HH:mm:ss')

	/**
	 * Calculate the percentage
	 */

	progress.totalPercentage = calculatePercentage(progress)

	/**
	 * Calculate the done and left progress
	 */

	progress.totalDurationDone = getDurationDone(progress)
	progress.totalDurationLeft =
		progress.totalDuration - progress.totalDurationDone
	progress.totalDurationDoneReadable = dayjs
		.duration(progress.totalDurationDone * 1000)
		.format('HH[u]mm[m]ss[s]')
	progress.totalDurationLeftReadable = dayjs
		.duration(progress.totalDurationLeft * 1000)
		.format('HH[u]mm[m]ss[s]')

	return progress
}
