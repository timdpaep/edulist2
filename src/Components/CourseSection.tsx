import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SectionContainer } from '../Layout'
import rightArrow from '../images/right-arrow.svg'
import { ICourse, ICourseSection } from '../interfaces'

interface CourseSectionProps {
	course: ICourse
	courseSection: ICourseSection
}

const CourseSectionList = styled.ul`
	padding-left: 0;
	list-style-type: none;

	li > a {
		color: var(--black);
	}

	li > a:hover {
		text-decoration: underline;
	}

	li:before {
		content: '';
		display: inline-block;
		height: 1em;
		width: 1em;
		background-image: url(${rightArrow});
		background-size: contain;
		background-repeat: no-repeat;
		padding-left: 2em;
		position: relative;
		top: 3px;
	}
`

export const CourseSection = ({
	courseSection,
	course,
}: CourseSectionProps) => {
	const { checklists } = courseSection
	return (
		<SectionContainer>
			<h2>{courseSection.title}</h2>
			{checklists && checklists.length > 0 && (
				<CourseSectionList>
					{courseSection.checklists.map(checklist => (
						<li key={checklist.id}>
							<Link
								to={{
									pathname: `/${course.slug}/${checklist.slug}`,
									state: { id: courseSection.id },
								}}
							>
								{checklist.title}
							</Link>
						</li>
					))}
				</CourseSectionList>
			)}
		</SectionContainer>
	)
}
