import { useEffect } from 'react'
import styled from 'styled-components'
// import ReactPlayer from 'react-player/lazy'
import { useYouTube, useReferences } from 'Hooks'
import {
	Loader,
	ReferenceSection,
	AssetsSection,
	YouTubePlayer,
} from '../Components'

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

const YouTubeContainer = styled.div``

const YouTubeInfoContainer = styled.div<{ asideVisible: boolean }>`
	display: grid;
	grid-template-columns: ${props =>
		props.asideVisible ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr'};
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
			<YouTubePlayer videoId={youTubeVideoDetails.id} />
			<h2>{youTubeVideoDetails.title}</h2>
			<YouTubeInfoContainer
				asideVisible={
					youTubeVideo.assets.length > 0 || youTubeVideo.references.length > 0
				}
			>
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
