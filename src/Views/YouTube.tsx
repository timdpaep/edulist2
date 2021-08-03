import { useEffect } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player/lazy'
import { useYouTube } from 'Hooks'
import { Loader } from '../Components'

/**
 * Types
 */

interface IYouTubeProps {
	youtubeId: string
	loadingChanged: (loading: boolean) => void
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
	const { loading, youTubeVideoDetails } = useYouTube(youtubeId)

	useEffect(() => {
		loadingChanged(loading)
	}, [loading])

	// return loader while loading
	if (loading) return <Loader />

	// if nothing, return nothing
	if (!youTubeVideoDetails) return null

	return (
		<YouTubeContainer>
			<ReactPlayer
				url={`https://www.youtube.com/watch?v=${youTubeVideoDetails.id}`}
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
			<p>{youTubeVideoDetails.title}</p>
			<p>{youTubeVideoDetails.description}</p>
		</YouTubeContainer>
	)
}
