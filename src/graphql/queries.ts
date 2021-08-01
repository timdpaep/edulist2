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
			canvasUrl
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
					url
					youTube {
						id
					}
					exercise {
						id
					}
					asset {
						id
					}
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

const GET_ASSET = gql`
	query GetAsset($id: ID!) {
		asset(where: { id: $id }) {
			title
			url
			mimeType
			fileName
		}
	}
`

export { COURSES, COURSE, CHECKLIST, EXERCISE, YOUTUBE, GET_ASSET }
