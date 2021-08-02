import Dexie from 'dexie'
import { IChecklistCheck } from '../interfaces'

class EduDatabase extends Dexie {
	public checklistChecks: Dexie.Table<IChecklistCheck, number>

	public constructor() {
		super('EduDatabase')
		this.version(2).stores({
			checklistChecks: '++id,[checklistId+checklistItemId]',
		})
		this.checklistChecks = this.table('checklistChecks')
	}
}

const db = new EduDatabase()

export default db
