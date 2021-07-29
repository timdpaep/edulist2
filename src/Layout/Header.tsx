import styled from 'styled-components'
import { Container } from './Container'
import device from '../device'

interface Props {
	title: string
}

const HeaderContainer = styled(Container)`
  width: 100%;
 	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 15px;
  padding-bottom: 15px;
	font-size: 1em;

  h1 {
    font-size: var(--small);
    @media ${device.mobile} { font-size: var(--h4); }
    margin: 0;
  }
}
`

export const Header = ({ title }: Props) => (
	<header style={{ borderBottom: '1px solid var(--lightGrey)' }}>
		<HeaderContainer>
			<h1>{title}</h1>
		</HeaderContainer>
	</header>
)
