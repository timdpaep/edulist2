import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Main } from '../Layout'
import { Loader } from '../Components'
import { COURSES, COURSE } from '../graphql/queries'
import { ICourse } from '../interfaces'

export default () => {
	const { loading, error, data, client } = useQuery(COURSES)

	// return nothing when we are loading or having an error
	if (loading) return <Loader />

	if (error || !data) return null

	// destructure courses
	const { courses } = data

	return (
		<Main>
			{courses && courses.length > 0 && (
				<ul>
					{courses.map((course: ICourse) => (
						<li key={course.id}>
							<Link
								to={{
									pathname: `/${course.slug}`,
									state: { id: course.id },
								}}
								onMouseOver={() =>
									client.query({
										query: COURSE,
										variables: { slug: course.slug },
									})
								}
							>
								{course.title}
							</Link>
						</li>
					))}
				</ul>
			)}
		</Main>
	)
}
