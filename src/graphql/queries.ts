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
	query Course($courseSlug: String!) {
		course(where: { slug: $courseSlug }) {
			id
			title
			slug
			canvasUrl
			teamsChannelUrl
			courseSections {
				id
				title
				checklists {
					id
					title
					slug
				}
			}
		}
	}
`

const CHECKLIST = gql`
	query CheckList($checklistSlug: String!) {
		checklist(where: { slug: $checklistSlug }) {
			id
			title
			slug
			checklistSections {
				id
				title
				checklistItems {
					id
					type
					duration
					description
					bigDescription
					url
					youTube {
						id
						videoId
					}
					exercise {
						id
					}
					asset {
						id
					}
				}
			}
			assets {
				title
				url
				mimeType
				fileName
			}
			references {
				title
				referenceType
				url
			}
			teamsMeetings {
				time
				meetingLink
			}
		}
	}
`

const CHECKLISTS_FOR_CALCULATING_PROGRESS = `
	query CheckList($checklistSlug: String!) {
		checklist(where: { slug: $checklistSlug }) {
			id
			title
			slug
			checklistSections {
				id
				title
				checklistItems {
					id
					type
					duration
					youTube {
						id
						videoId
					}
					exercise {
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
			assets {
				title
				url
				mimeType
				fileName
			}
		}
	}
`

const YOUTUBE = gql`
	query YouTube($id: ID!) {
		youTube(where: { id: $id }) {
			videoId
			assets {
				title
				url
				mimeType
				fileName
			}
			references {
				title
				referenceType
				url
			}
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

export {
	COURSES,
	COURSE,
	CHECKLIST,
	CHECKLISTS_FOR_CALCULATING_PROGRESS,
	EXERCISE,
	YOUTUBE,
	GET_ASSET,
}
