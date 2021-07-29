/**
 * Used interfaces
 */

/**
 * Courses
 */

export interface ICourse {
	id: string
	title: string
	slug: string
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
	checklistSections: ICheckListSection[]
}

export interface ICheckListItem {
	id: string
	type: string
	value: string
	description: string
}

/**
 * Exercises
 */

export interface IExercise {
	description: string
}

/**
 * YouTube
 */

export interface IYouTube {
	videoId: string
}

export interface IYouTubeSnippet {
	description: string
	title: string
	tags: string[]
}
