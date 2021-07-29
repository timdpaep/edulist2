import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import YouTubeVideo from 'react-youtube'
import { IYouTube, IYouTubeSnippet } from '../interfaces'
import { YOUTUBE } from '../graphql/queries'
import { getVideoSnippet } from '../library/youtube'
import { Loader } from '../Components'

/**
 * Types
 */

interface IYouTubeProps {
	youtubeId: string
	loadingChanged: (loading: boolean) => void
}

interface IYouTubeData {
	youTube: IYouTube
}

/**
 * Styled Components
 */

const YouTubeContainer = styled.div`
	iframe {
		width: 100%;
	}
`

export default ({ youtubeId, loadingChanged }: IYouTubeProps) => {
	const { loading, error, data } = useQuery<IYouTubeData>(YOUTUBE, {
		variables: { id: youtubeId },
	})
	const [youTubeSnippet, setYouTubeSnippet] = useState<IYouTubeSnippet>({
		title: '',
		description: '',
		tags: [],
	})

	// when loading changed
	useEffect(() => loadingChanged(loading), [loadingChanged, loading])

	// when mounting the component
	useEffect(() => {
		if (data && data.youTube) {
			getVideoSnippet(data.youTube.videoId).then((videoSnippet: any) =>
				setYouTubeSnippet(videoSnippet)
			)
		}
	}, [data])

	// return nothing when we are loading or having an error
	if (loading) return <Loader />

	if (error || !data) return null

	// destructure youtube
	const { youTube } = data

	return (
		<YouTubeContainer>
			<YouTubeVideo videoId={youTube.videoId} />
			<p>{youTubeSnippet.title}</p>
			<p>{youTubeSnippet.description}</p>
		</YouTubeContainer>
	)
}
