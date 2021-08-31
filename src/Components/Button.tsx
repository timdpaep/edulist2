import styled from 'styled-components'

export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	${props => (props.color ? `background-color:var(--${props.color})` : '')}
`
