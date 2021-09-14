import { EduSideBarType, IconButtonType } from 'enums'
import { CheckListIconButton } from '..'
import { useEduSideBar } from '../../Hooks'
import { ICheckListItem } from '../../interfaces'

interface ICheckListSideBarButtonProp {
	eduSidebarType: EduSideBarType
	iconButtonType: IconButtonType
	value: string
	disabled?: boolean
	checkListItem: ICheckListItem
}

/**
 * Converts the iconbutton type to an edusidebartype
 *
 * @param iconButtonType
 * @returns EduSideBarType
 */
export const eduSideBarTypeFromIconButtonType = (
	iconButtonType: IconButtonType
): EduSideBarType => {
	switch (iconButtonType) {
		case IconButtonType.Exercise:
			return EduSideBarType.Exercise
		case IconButtonType.YouTube:
			return EduSideBarType.YouTube
		default:
			return EduSideBarType.None
	}
}

export const CheckListSideBarButton = ({
	eduSidebarType = EduSideBarType.None,
	iconButtonType,
	value,
	disabled = false,
	checkListItem,
}: ICheckListSideBarButtonProp) => {
	const { openSideBar } = useEduSideBar()
	return (
		<CheckListIconButton
			onClick={() => openSideBar(eduSidebarType, value)}
			iconButtonType={iconButtonType}
			disabled={disabled}
			checkListItem={checkListItem}
		/>
	)
}
