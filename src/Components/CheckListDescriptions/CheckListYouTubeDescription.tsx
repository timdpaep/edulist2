import { useYouTube } from 'Hooks'

interface ICheckListYouTubeDescriptionProps {
	youTubeId: string
}

export const CheckListYouTubeDescription = ({
	youTubeId,
}: ICheckListYouTubeDescriptionProps) => {
	const { loading, youTubeVideoDetails } = useYouTube(youTubeId)

	return (
		<span className='title__main'>
			{loading
				? '...'
				: `${youTubeVideoDetails?.title} (${youTubeVideoDetails?.readableDuration})`}
		</span>
	)
}
