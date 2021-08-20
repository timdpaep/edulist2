import { useState, useEffect } from 'react'
import { IYouTube, IYouTubeVideoDetails } from 'interfaces'
import { getVideoDetails } from 'library/youtube'
import { useQuery } from '@apollo/client'
import { YOUTUBE } from '../graphql/queries'

interface IYouTubeData {
	youTube: IYouTube
}

export const useYouTube = (youTubeId: string) => {
	const { loading: loadingYouTubeId, data: youTubeVideo } =
		useQuery<IYouTubeData>(YOUTUBE, {
			variables: { id: youTubeId },
		})
	const [loadingYouTubeData, setLoadingYouTubeData] = useState(true)
	const [youTubeVideoDetails, setYouTubeVideoDetails] =
		useState<IYouTubeVideoDetails>({
			id: '',
			title: '',
			description: '',
			tags: [],
			duration: '0S',
			readableDuration: '',
		})

	useEffect(() => {
		if (youTubeVideo && youTubeVideo.youTube) {
			setLoadingYouTubeData(true)
			getVideoDetails(youTubeVideo.youTube.videoId).then(
				(videoDetails: IYouTubeVideoDetails) => {
					setYouTubeVideoDetails(videoDetails)
				}
			)
		}
	}, [youTubeVideo])

	useEffect(() => {
		if (loadingYouTubeData && youTubeVideoDetails.title !== '')
			setLoadingYouTubeData(false)
	}, [youTubeVideoDetails])

	return {
		loading: loadingYouTubeId || loadingYouTubeData,
		youTubeVideo: youTubeVideo?.youTube,
		youTubeVideoDetails,
	}
}
