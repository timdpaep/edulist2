import { useState, useEffect } from 'react'
import { IYouTube, IYouTubeVideoDetails } from 'interfaces'
import { getVideoDetails } from 'library/youtube'
import { useQuery } from '@apollo/client'
import { YOUTUBE } from '../graphql/queries'

interface IYouTubeData {
	youTube: IYouTube
}

export const useYouTube = (youTubeId: string) => {
	const { loading: loadingYouTubeId, data } = useQuery<IYouTubeData>(YOUTUBE, {
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
		if (data && data.youTube) {
			setLoadingYouTubeData(true)
			getVideoDetails(data.youTube.videoId).then(
				(videoDetails: IYouTubeVideoDetails) => {
					setYouTubeVideoDetails(videoDetails)
				}
			)
		}
	}, [data])

	useEffect(() => {
		if (loadingYouTubeData && youTubeVideoDetails.title !== '')
			setLoadingYouTubeData(false)
	}, [youTubeVideoDetails])

	return {
		loading: loadingYouTubeId || loadingYouTubeData,
		youTubeVideoDetails,
	}
}
