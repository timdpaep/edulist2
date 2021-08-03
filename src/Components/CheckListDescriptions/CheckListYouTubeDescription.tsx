import { useYouTube } from 'Hooks'

interface ICheckListYouTubeDescriptionProps {
	youTubeId: string
}

export const CheckListYouTubeDescription = ({
	youTubeId,
}: ICheckListYouTubeDescriptionProps) => {
	const { loading, youTubeVideoDetails } = useYouTube(youTubeId)

	return (
		<div>
			{loading
				? '...'
				: `${youTubeVideoDetails?.title} (${youTubeVideoDetails?.readableDuration})`}
		</div>
	)
}
