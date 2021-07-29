/**
 * A YouTube helper
 */

import { IYouTubeSnippet } from 'interfaces'

export const getVideoSnippet = async (
	videoId: string
): Promise<IYouTubeSnippet> => {
	const url = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.REACT_APP_YOUTUBE_API}&id=${videoId}&part=snippet`
	const data = await fetch(url)
	const youTubeData = await data.json()
	const { description, title, tags } = youTubeData.items[0].snippet
	return {
		description,
		title,
		tags,
	}
}
