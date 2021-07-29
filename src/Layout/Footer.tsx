import styled from 'styled-components'
import { Container } from './Container'
import arteveldehs from '../images/arteveldehs.svg'

const FooterContainer = styled(Container)`
  padding: 60px 0;
  text-align: center;
}
`

const FooterVersionNumber = styled.div`
	font-size: 0.7em;
	opacity: 0.7;
`

export const Footer = () => (
	<footer style={{ borderTop: '1px solid var(--lightGrey)' }}>
		<FooterContainer>
			<a href='https://www.arteveldehogeschool.be'>
				<img
					style={{ height: 40 }}
					src={arteveldehs}
					alt='Artevelde Hogeschool Logo'
				/>
			</a>
			<FooterVersionNumber>Edulist 2 - v0.1</FooterVersionNumber>
		</FooterContainer>
	</footer>
)
