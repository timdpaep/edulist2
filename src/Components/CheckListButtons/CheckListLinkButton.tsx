import { IconButtonType } from 'enums'
import { CheckListIconButton } from '..'
import { ICheckListItem } from '../../interfaces'

interface ICheckListLinkButtonProp {
	iconButtonType: IconButtonType
	url: string
	target?: string
	disabled?: boolean
	checkListItem: ICheckListItem
}

export const CheckListLinkButton = ({
	iconButtonType,
	url = '',
	target = '_blank',
	disabled = false,
	checkListItem,
}: ICheckListLinkButtonProp) => (
	<CheckListIconButton
		iconButtonType={iconButtonType}
		onClick={() => window.open(url, target)?.focus()}
		disabled={disabled}
		checkListItem={checkListItem}
	/>
)
