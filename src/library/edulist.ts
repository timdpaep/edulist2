/**
 * Getting data from edulist
 */

import { ICheckList } from 'interfaces'
import { CHECKLISTS_FOR_CALCULATING_PROGRESS } from '../graphql/queries'

const getEdulistData = async <T>(body: string): Promise<T> =>
	new Promise<T>((resolve, reject) => {
		try {
			if (process.env.REACT_APP_GRAPH_CMS) {
				fetch(process.env.REACT_APP_GRAPH_CMS, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body,
				})
					.then(r => r.json())
					.then(d => resolve(d))
					.catch(e => reject(e))
			}
		} catch (e) {
			reject(e)
		}
	})

export const getChecklistBySlug = async (
	checklistSlug: string
): Promise<{ data: { checklist: ICheckList } }> =>
	getEdulistData<{ data: { checklist: ICheckList } }>(
		JSON.stringify({
			query: CHECKLISTS_FOR_CALCULATING_PROGRESS,
			variables: { checklistSlug },
		})
	)
