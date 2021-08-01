import styled from 'styled-components'

export const Button = styled.button`
	${props => (props.color ? `background-color:var(--${props.color})` : '')}
`
