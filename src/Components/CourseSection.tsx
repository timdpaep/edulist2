import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SectionContainer } from '../Layout'
import rightArrow from '../images/right-arrow.svg'
import { ICourse, ICourseSection } from '../interfaces'
import device from '../device'

interface CourseSectionProps {
	course: ICourse
	courseSection: ICourseSection
}

const CourseSectionList = styled.ul`
	padding-left: 0;
	list-style-type: none;
`

const CourseSectionListLiContentWrapper = styled.div`
	display: grid;
	grid-template-columns: 1em 1fr;
	grid-gap: 10px;

	& > a {
		color: var(--black);
	}

	& > a:hover {
		text-decoration: underline;
	}

	& > img {
		position: relative;
		top: 5px;
	}

	@media ${device.mobile} {
		& > img {
			top: 8px;
		}
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
							<CourseSectionListLiContentWrapper>
								<img src={rightArrow} alt='Right List Arrow' />
								<Link
									to={{
										pathname: `/${course.slug}/${checklist.slug}`,
										state: { id: courseSection.id },
									}}
								>
									{checklist.title}
								</Link>
							</CourseSectionListLiContentWrapper>
						</li>
					))}
				</CourseSectionList>
			)}
		</SectionContainer>
	)
}
