import React from 'react'
import { Player, Youtube, DefaultUi } from '@vime/react'

interface IYouTubePlayerProps {
	videoId: string
}

export const YouTubePlayer = ({ videoId }: IYouTubePlayerProps) => (
	<Player volume={50}>
		<Youtube showFullscreenControl videoId={videoId} />
		<DefaultUi />
	</Player>
)
