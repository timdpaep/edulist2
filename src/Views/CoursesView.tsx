import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Main } from '../Layout'
import { Loader } from '../Components'
import { COURSES, COURSE } from '../graphql/queries'
import { ICourse } from '../interfaces'

/**
 * Styled Components
 */

const CoursesContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	ul {
		list-style-type: none;
	}

	h1 {
		font-size: var(--h3);
	}
`

export default () => {
	const { loading, error, data, client } = useQuery(COURSES)

	// return nothing when we are loading or having an error
	if (loading) return <Loader />

	if (error || !data) return null

	// destructure courses
	const { courses } = data

	return (
		<Main>
			<CoursesContainer>
				<div>
					<h1>Cursussen</h1>
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
												variables: { courseSlug: course.slug },
											})
										}
									>
										{course.title}
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
			</CoursesContainer>
		</Main>
	)
}
