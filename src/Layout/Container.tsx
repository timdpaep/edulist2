import styled from 'styled-components'
import device from '../device'

export const Container = styled.div`
	width: 100%;
	padding: 0 var(--container-gap-mobile);
	margin: 0 auto;

	@media ${device.mobile} {
		padding: 0 var(--container-gap);
		max-width: calc(100% - 20px);
	}
	@media ${device.tablet} {
		max-width: calc(100% - 30px);
	}
	@media ${device.laptop} {
		max-width: calc(100% - 50px);
	}
	@media ${device.desktop} {
		max-width: 1140px;
	}
`
