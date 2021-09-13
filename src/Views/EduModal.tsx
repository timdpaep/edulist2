import Modal from 'react-modal'
import styled from 'styled-components'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from 'Components'
import { EduModalType } from 'enums'
import { setModal } from '../redux/appSlice'
import { useAppDispatch } from '../Hooks'
import Slide from './Slide'

/**
 * Interfaces
 */

interface IEduModalProps {
	open: boolean
	title?: string
	value: string
	type: EduModalType
}

const ModalContentContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	padding: var(--modal-content-padding);
	& > *:last-child {
		margin-bottom: 0;
	}
`

const CloseButtonContainer = styled.div<{ showTitle: boolean }>`
	display: flex;
	${({ showTitle }) =>
		showTitle ? 'justify-content: space-between;' : 'justify-content: flex-end;'}
	align-items: flex-start;
	h4 {
		margin: 0;
	}
`

export default ({
	open = false,
	title = '',
	value = '',
	type = EduModalType.None,
}: IEduModalProps) => {
	const dispatch = useAppDispatch()

	function closeModal() {
		dispatch(
			setModal({ open: false, value: '', title: '', type: EduModalType.None })
		)
	}

	return (
		<Modal
			className={`edu-modal-${type}`}
			overlayClassName='edu-modal-overlay'
			isOpen={open}
			onRequestClose={() => closeModal()}
		>
			<ModalContentContainer>
				<CloseButtonContainer showTitle={title !== ''}>
					{title && <h4>{title}</h4>}
					<IconButton onClick={() => closeModal()} icon={faTimes} />
				</CloseButtonContainer>
				{type === EduModalType.None && <p>{value}</p>}
				{type === EduModalType.Slides && <Slide slideId={value} />}
			</ModalContentContainer>
		</Modal>
	)
}
