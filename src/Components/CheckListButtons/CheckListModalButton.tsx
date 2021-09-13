import { EduModalType, IconButtonType } from 'enums'
import { CheckListIconButton } from '..'
import { useEduModal } from '../../Hooks'

/**
 * TypeScript
 */

interface ICheckListSlidesButtonProp {
	eduModalType: EduModalType
	iconButtonType: IconButtonType
	value: string
	disabled?: boolean
}

/**
 * Converts an iconbuttontype to an edusmodaltype
 *
 * @param iconButtonType
 * @returns EduSideBarType
 */
export const eduModalTypeFromIconButtonType = (
	iconButtonType: IconButtonType
): EduModalType => {
	switch (iconButtonType) {
		case IconButtonType.Slides:
			return EduModalType.Slides
		default:
			return EduModalType.None
	}
}

export const CheckListModalButton = ({
	eduModalType = EduModalType.None,
	iconButtonType = IconButtonType.None,
	value = '',
	disabled = false,
}: ICheckListSlidesButtonProp) => {
	const { openModal } = useEduModal()

	return (
		<CheckListIconButton
			onClick={() => openModal({ value, type: eduModalType })}
			iconButtonType={iconButtonType}
			disabled={disabled}
		/>
	)
}
