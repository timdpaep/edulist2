import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Header, Footer, Main } from '../Layout'
import { COURSE } from '../graphql/queries'
import { CourseSection, Loader } from '../Components'
import { ICourseSection } from '../interfaces'

interface CourseParams {
	slug: string
}

export default () => {
	const { slug } = useParams<CourseParams>()
	const { loading, error, data } = useQuery(COURSE, { variables: { slug } })

	if (loading) return <Loader />

	if (error) return null

	return (
		<>
			<Header title={data.course.title} />
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
