import { ReactNode } from 'react'
import styled from 'styled-components'
import { ContainerFluid } from './ContainerFluid'
import device from '../device'

interface IHeaderProps {
	title: string
	buttons?: ReactNode
}

const HeaderContainer = styled(ContainerFluid)`
  width: 100%;
 	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 30px;
  padding-bottom: 30px;
	font-size: 1em;

  h1 {
    font-size: 1rem;
    @media ${device.mobile} { font-size: var(--h4); }
    margin: 0;
  }
}
`

export const Header = ({ title, buttons }: IHeaderProps) => (
	<header style={{ borderBottom: '1px solid var(--lightGrey)' }}>
		<HeaderContainer>
			<h1>{title}</h1>
			{buttons && buttons}
		</HeaderContainer>
	</header>
)
