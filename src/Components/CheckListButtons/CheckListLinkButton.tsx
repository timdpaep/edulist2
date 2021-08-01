import { IconButtonType } from 'enums'
import { CheckListIconButton } from '..'

interface ICheckListLinkButtonProp {
	iconButtonType: IconButtonType
	url: string
	target?: string
	disabled?: boolean
}

export const CheckListLinkButton = ({
	iconButtonType,
	url = '',
	target = '_blank',
	disabled = false,
}: ICheckListLinkButtonProp) => (
	<CheckListIconButton
		iconButtonType={iconButtonType}
		onClick={() => window.open(url, target)?.focus()}
		disabled={disabled}
	/>
)
