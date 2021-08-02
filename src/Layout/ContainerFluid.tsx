import styled from 'styled-components'
import device from '../device'

export const ContainerFluid = styled.div`
	width: 100%;
	padding: 0 var(--container-gap-mobile);
	margin: 0 auto;

	@media ${device.mobile} {
		padding: 0 var(--container-gap);
	}
`
