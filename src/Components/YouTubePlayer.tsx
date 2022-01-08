import React from 'react'
import { Player, Youtube } from '@vime/react'
import '@vime/core/themes/default.css'
// import ReactPlayer from 'react-player/lazy'

interface IYouTubePlayerProps {
	videoId: string
}

export const YouTubePlayer = ({ videoId }: IYouTubePlayerProps) => (
	<>
		{/* Leave this, there is a bug in Vime. Waiting until it's fixed. */}
		<Player controls autoplay isVideoView volume={50}>
			<Youtube videoId={videoId} />
		</Player>
		{/* <ReactPlayer
			url={`https://www.youtube.com/watch?v=${videoId}`}
			style={{
				borderRadius: 5,
			}}
			playing
			className='react-player'
			width='100%'
			controls
			volume={0.5}
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
		/> */}
	</>
)
