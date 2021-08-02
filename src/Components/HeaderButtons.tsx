import React from 'react'
import styled from 'styled-components'

const HeaderButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	button + button {
		margin-left: 10px;
	}
	button:first-child {
		margin: 0;
	}
`

export const HeaderButtons: React.FC = ({ children }) => (
	<HeaderButtonsContainer>{children}</HeaderButtonsContainer>
)
