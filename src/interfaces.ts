/**
 * Used interfaces
 */

import { ReferenceType } from 'enums'

/**
 * Courses
 */

export interface ICourse {
	id: string
	title: string
	slug: string
	canvasUrl: string
	teamsChannelUrl: string
}

export interface ICourseSection {
	id: string
	title: string
	checklists: ICheckList[]
}

/**
 * Checklists
 */

export interface ICheckListSection {
	id: string
	title: string
	checklistItems: ICheckListItem[]
}

export interface ICheckList {
	id: string
	title: string
	slug: string
	checklistSections: ICheckListSection[]
	assets: IAsset[]
	references: IReference[]
	teamsMeetings: ITeamsMeeting[]
}

export interface ICheckListItem {
	id: string
	type: string
	asset: {
		id: string
	}
	url: string
	youTube: {
		id: string
	}
	exercise: {
		id: string
	}
	description: string
	bigDescription: string
}

/**
 * Teams Meeting
 */

export interface ITeamsMeeting {
	time: string
	meetingLink: string
}

/**
 * Exercises
 */

export interface IExercise {
	description: string
	assets: IAsset[]
}

/**
 * YouTube
 */

export interface IYouTube {
	videoId: string
	assets: IAsset[]
	references: IReference[]
}

export interface IYouTubeVideoDetails {
	id: string
	description: string
	title: string
	tags: string[]
	duration: string
	readableDuration: string
}

/**
 * Asset
 */

export interface IAsset {
	title: string
	url: string
	mimeType: string
	fileName: string
}

/**
 * References
 */

export interface IReference {
	title: string
	referenceType: ReferenceType
	url: string
}

/**
 * Database
 */

export interface IChecklistCheck {
	id?: number
	checklistId?: string
	checklistItemId?: string
}
