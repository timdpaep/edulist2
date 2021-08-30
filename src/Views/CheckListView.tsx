import { useQuery } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Header, Footer, Main } from '../Layout'
import { CHECKLIST } from '../graphql/queries'
import { ICheckList } from '../interfaces'
import {
	CheckListSection,
	Loader,
	CheckListHeaderButtons,
	ReferenceSection,
	AssetsSection,
} from '../Components'
import { useReferences } from '../Hooks'
import device from '../device'

/**
 * TypeScript
 */

interface ICheckListRouteParams {
	courseSlug: string
	checklistSlug: string
}

interface ICheckListData {
	checklist: ICheckList
}

interface ICheckListViewContainerProps {
	asideVisible: boolean
}

/**
 * Styled Components
 */

const CheckListViewContainer = styled.div<ICheckListViewContainerProps>`
	display: grid;
	grid-template-columns: 1fr;
	@media ${device.tablet} {
		grid-template-columns: ${props => (!props.asideVisible ? '1fr' : '4fr 2fr')};
	}
	@media ${device.laptop} {
		grid-template-columns: ${props => (!props.asideVisible ? '1fr' : '5fr 2fr')};
	}
`

const AsideContainer = styled.aside`
	padding: var(--container-gap-mobile);
	section + section {
		margin-top: 1.2rem;
	}
	@media ${device.mobile} {
		padding: var(--container-gap);
	}
`

export default () => {
	const { courseSlug, checklistSlug } = useParams<ICheckListRouteParams>()
	const history = useHistory()
	const { getReferencesPerType } = useReferences()
	const { loading, error, data } = useQuery<ICheckListData>(CHECKLIST, {
		variables: { checklistSlug },
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
						onOverviewClicked={() => history.push(`/${courseSlug}`)}
						teamsMeetings={data.checklist.teamsMeetings}
					/>
				}
			/>
			<Main>
				<CheckListViewContainer
					asideVisible={
						data.checklist.assets.length > 0 || data.checklist.references.length > 0
					}
				>
					<div>
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
					</div>
					<AsideContainer>
						{data.checklist.assets && (
							<AssetsSection assets={data.checklist.assets} />
						)}
						{data.checklist.references &&
							getReferencesPerType(data.checklist.references).map(r => (
								<ReferenceSection
									key={r.type}
									type={r.type}
									references={r.references}
								/>
							))}
					</AsideContainer>
				</CheckListViewContainer>
			</Main>
			<Footer />
		</>
	)
}
