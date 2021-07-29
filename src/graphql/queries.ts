import { gql } from '@apollo/client'

const COURSES = gql`
	{
		courses {
			id
			slug
			title
		}
	}
`

const COURSE = gql`
	query Course($slug: String!) {
		course(where: { slug: $slug }) {
			id
			title
			slug
			courseSections {
				id
				title
				checklists {
					id
					title
				}
			}
		}
	}
`

const CHECKLIST = gql`
	query CheckList($id: ID!) {
		checklist(where: { id: $id }) {
			id
			title
			checklistSections {
				id
				title
				checklistItems {
					id
					type
					description
					value
				}
			}
		}
	}
`

const EXERCISE = gql`
	query Exercise($id: ID!) {
		exercise(where: { id: $id }) {
			description
		}
	}
`

const YOUTUBE = gql`
	query YouTube($id: ID!) {
		youTube(where: { id: $id }) {
			videoId
		}
	}
`

export { COURSES, COURSE, CHECKLIST, EXERCISE, YOUTUBE }
