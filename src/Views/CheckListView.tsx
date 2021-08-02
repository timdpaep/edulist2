import { useQuery } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { Header, Footer, Main } from '../Layout'
import { CHECKLIST } from '../graphql/queries'
import { ICheckList } from '../interfaces'
import { CheckListSection, Loader, CheckListHeaderButtons } from '../Components'

interface ICheckListRouteParams {
	slug: string
	checklistId: string
}

interface ICheckListData {
	checklist: ICheckList
}

export default () => {
	const { checklistId, slug } = useParams<ICheckListRouteParams>()
	const history = useHistory()
	const { loading, error, data } = useQuery<ICheckListData>(CHECKLIST, {
		variables: { id: checklistId },
	})

	// use the load effect
	if (loading) return <Loader />

	if (error || !data) return null

	return (
		<>
			<Header
				title={data.checklist.title}
				buttons={
					<CheckListHeaderButtons
						onOverviewClicked={() => history.push(`/${slug}`)}
					/>
				}
			/>
			<Main>
				{data &&
					data.checklist &&
					data.checklist.checklistSections &&
					data.checklist.checklistSections.map(checkListSection => (
						<CheckListSection
							key={checkListSection.id}
							checkListId={data.checklist.id}
							checkListSection={checkListSection}
						/>
					))}
			</Main>
			<Footer />
		</>
	)
}
