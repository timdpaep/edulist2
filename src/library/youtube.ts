/**
 * A YouTube helper
 */

import { IYouTubeVideoDetails } from 'interfaces'
import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'

export const getVideoDetails = async (
	videoId: string
): Promise<IYouTubeVideoDetails> => {
	const url = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.REACT_APP_YOUTUBE_API}&id=${videoId}&part=snippet,contentDetails`
	const data = await fetch(url)
	const youTubeData = await data.json()
	const { id } = youTubeData.items[0]
	const { description, title, tags } = youTubeData.items[0].snippet
	const { duration } = youTubeData.items[0].contentDetails
	dayjs.extend(durationPlugin)
	return {
		id,
		description,
		title,
		tags,
		duration,
		readableDuration: dayjs.duration(duration).format('mm:ss'),
	}
}
