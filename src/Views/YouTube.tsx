import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
// import YouTubeVideo from 'react-youtube'
import ReactPlayer from 'react-player/lazy'
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
			<ReactPlayer
				url={`https://www.youtube.com/watch?v=${youTube.videoId}`}
				style={{
					borderRadius: 5,
				}}
				playing
				controls
				muted
				volume={0}
				config={{
					youtube: {
						playerVars: {
							modestbranding: 1,
							showinfo: 0,
							showsearch: 0,
							fs: 1,
						},
					},
				}}
			/>
			<p>{youTubeSnippet.title}</p>
			<p>{youTubeSnippet.description}</p>
		</YouTubeContainer>
	)
}
