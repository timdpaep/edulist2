import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from 'Components'
import { setModal } from '../redux/appSlice'
import { useAppDispatch } from '../Hooks'

/**
 * Interfaces
 */

interface IEduModalProps {
	open: boolean
	title?: string
	content: React.ReactNode
}

const ModalContentContainer = styled.div`
	position: relative;
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

export default ({ open = false, title = '', content }: IEduModalProps) => {
	const dispatch = useAppDispatch()

	function closeModal() {
		dispatch(setModal({ open: false, content: '' }))
	}

	return (
		<Modal
			className='edu-modal-content'
			overlayClassName='edu-modal-overlay'
			isOpen={open}
			onRequestClose={closeModal}
		>
			<ModalContentContainer>
				<CloseButtonContainer showTitle={title !== ''}>
					{title && <h4>{title}</h4>}
					<IconButton onClick={() => closeModal()} icon={faTimes} />
				</CloseButtonContainer>
				<p>{content}</p>
			</ModalContentContainer>
		</Modal>
	)
}
