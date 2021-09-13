/**
 * Used interfaces
 */

import { ReferenceType, SlidesType } from 'enums'

/**
 * Courses
 */

export interface ICourse {
	id: string
	title: string
	slug: string
	canvasUrl: string
	teamsChannelUrl: string
}

export interface ICourseSection {
	id: string
	title: string
	checklists: ICheckList[]
}

/**
 * Checklists
 */

export interface ICheckListSection {
	id: string
	title: string
	checklistItems: ICheckListItem[]
}

export interface ICheckList {
	id: string
	title: string
	slug: string
	checklistSections: ICheckListSection[]
	assets: IAsset[]
	references: IReference[]
	teamsMeetings: ITeamsMeeting[]
}

export interface ICheckListItem {
	id: string
	type: string
	duration: number
	asset: {
		id: string
	}
	url: string
	exercise: {
		id: string
	}
	youTube: {
		id: string
		videoId: string
	}
	slide: {
		id: string
	}
	description: string
	bigDescription: string
}

/**
 * Teams Meeting
 */

export interface ITeamsMeeting {
	time: string
	meetingLink: string
}

/**
 * Exercises
 */

export interface IExercise {
	description: string
	assets: IAsset[]
}

/**
 * YouTube
 */

export interface IYouTube {
	videoId: string
	assets: IAsset[]
	references: IReference[]
}

export interface IYouTubeVideoDetails {
	id: string
	description: string
	title: string
	tags: string[]
	duration: string
	readableDuration: string
}

/**
 * Asset
 */

export interface IAsset {
	title: string
	url: string
	mimeType: string
	fileName: string
}

/**
 * References
 */

export interface IReference {
	title: string
	referenceType: ReferenceType
	url: string
}

/**
 * Database
 */

export interface IChecklistCheck {
	id?: number
	checklistId?: string
	checklistItemId?: string
}

/**
 * Progress
 */

export interface IProgress {
	totalPercentage: number
	totalDuration: number
	totalDurationReadable: string
	totalDurationSections: IProgressSection[]
	totalDurationLeft: number
	totalDurationDone: number
	totalDurationLeftReadable: string
	totalDurationDoneReadable: string
}

export interface IProgressSection {
	id: string
	totalDuration: number
	totalDurationReadable: string
	checklistItemProgress: IChecklistItemProgress[]
}

export interface IChecklistItemProgress {
	id: string
	checked: boolean
	duration: number
}

/**
 * Slides
 */

export interface ISlide {
	title: string
	slideUrl: string
	slidesStyle: SlidesType
	slideX: number
	slideY: number
	hideByLine: boolean
	hideShareButton: boolean
}
