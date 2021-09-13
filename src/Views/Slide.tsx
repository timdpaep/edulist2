import { useRef, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { SLIDE } from '../graphql/queries'
import { ISlide } from '../interfaces'
import { Loader } from '../Components/Loader'

/**
 * Types
 */

interface ISlideProps {
	slideId: string
}

interface ISlideData {
	slide: ISlide
}

const generateSlidesUrl = ({
	slideUrl,
	slidesStyle,
	slideX,
	slideY,
	hideShareButton,
	hideByLine,
}: ISlide) => {
	const slideURL = new URL(`${slideUrl}/embed`)
	slideURL.searchParams.append('style', slidesStyle)
	if (hideShareButton) slideURL.searchParams.append('share', 'hidden')
	if (hideByLine) slideURL.searchParams.append('byline', 'hidden')
	return `${slideURL.href}#/${slideX}/${slideY}`
}

export default ({ slideId }: ISlideProps) => {
	const { loading, error, data } = useQuery<ISlideData>(SLIDE, {
		variables: { id: slideId },
	})
	const iFrameRef = useRef<HTMLIFrameElement>(null)
	const [iFrameLoading, setIFrameLoading] = useState<boolean>(true)

	useEffect(() => {
		const onLoaded = () => setIFrameLoading(false)
		iFrameRef.current?.addEventListener('load', onLoaded)
		return () => {
			iFrameRef.current?.removeEventListener('load', onLoaded)
		}
	}, [data])

	// return nothing when we are loading or having an error
	if (error || !data) return null

	// destructure slide data
	const { slide } = data

	return (
		<>
			{(loading || iFrameLoading) && <Loader />}

			<iframe
				ref={iFrameRef}
				width='100%'
				height='95%'
				title={slide.title}
				src={generateSlidesUrl(slide)}
				scrolling='no'
				frameBorder='0'
				allowFullScreen
			/>
		</>
	)
}
