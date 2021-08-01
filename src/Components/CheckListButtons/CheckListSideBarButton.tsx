import { IconButtonType } from 'enums'
import { CheckListIconButton } from '..'
import { useEduSideBar } from '../../Hooks'

interface ICheckListSideBarButtonProp {
	iconButtonType: IconButtonType
	value: string
	disabled?: boolean
}

export const CheckListSideBarButton = ({
	iconButtonType,
	value,
	disabled = false,
}: ICheckListSideBarButtonProp) => {
	const { openSideBar } = useEduSideBar()
	return (
		<CheckListIconButton
			onClick={() => openSideBar(iconButtonType, value)}
			iconButtonType={iconButtonType}
			disabled={disabled}
		/>
	)
}
