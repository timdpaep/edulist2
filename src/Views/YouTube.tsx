import { useEffect } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player/lazy'
import { useYouTube, useReferences } from 'Hooks'
import { Loader, ReferenceSection, AssetsSection } from '../Components'

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

const YouTubeInfoContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	column-gap: 20px;
	p {
		margin-top: 0;
		margin-bottom: 30px;
	}
`

const AsideContainer = styled.div`
	grid-column-end: -1;
	section {
		margin-bottom: 15px;
	}
`

export default ({ youtubeId, loadingChanged }: IYouTubeProps) => {
	const { loading, youTubeVideo, youTubeVideoDetails } = useYouTube(youtubeId)
	const { getReferencesPerType } = useReferences()

	useEffect(() => {
		loadingChanged(loading)
	}, [loading])

	// return loader while loading
	if (loading) return <Loader />

	// if nothing, return nothing
	if (!youTubeVideo || !youTubeVideoDetails) return null

	return (
		<YouTubeContainer>
			<ReactPlayer
				url={`https://www.youtube.com/watch?v=${youTubeVideoDetails.id}`}
				style={{
					borderRadius: 5,
				}}
				playing
				className='react-player'
				width='100%'
				controls
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
			<h2>{youTubeVideoDetails.title}</h2>
			<YouTubeInfoContainer>
				<p>{youTubeVideoDetails.description}</p>
				<AsideContainer>
					<AssetsSection assets={youTubeVideo.assets} />
					{getReferencesPerType(youTubeVideo.references).map(r => (
						<ReferenceSection key={r.type} type={r.type} references={r.references} />
					))}
				</AsideContainer>
			</YouTubeInfoContainer>
		</YouTubeContainer>
	)
}
