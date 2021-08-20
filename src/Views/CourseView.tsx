import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Header, Footer, Main } from '../Layout'
import { COURSE } from '../graphql/queries'
import { CourseSection, Loader, CourseHeaderButtons } from '../Components'
import { ICourseSection } from '../interfaces'

interface CourseParams {
	courseSlug: string
}

export default () => {
	const { courseSlug } = useParams<CourseParams>()
	const { loading, error, data } = useQuery(COURSE, {
		variables: { courseSlug },
	})

	if (loading) return <Loader />

	if (error) return null

	return (
		<>
			<Header
				title={data.course.title}
				buttons={
					<CourseHeaderButtons
						showCanvas={data?.course?.canvasUrl}
						onCanvasClicked={() => window.open(data?.course?.canvasUrl, '_blank')}
					/>
				}
			/>
			<Main>
				{data.course.courseSections &&
					data.course.courseSections.length > 0 &&
					data.course.courseSections.map((courseSection: ICourseSection) => (
						<CourseSection
							key={courseSection.id}
							courseSection={courseSection}
							course={data.course}
						/>
					))}
			</Main>
			<Footer />
		</>
	)
}
