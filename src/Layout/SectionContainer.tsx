import styled from 'styled-components'
import { ContainerFluid } from '.'
import device from '../device'

export const SectionContainer = styled(ContainerFluid)`
	font-size: var(--checklist-item-size-mobile);
	padding: var(--container-gap-mobile);
	h2 {
		font-size: var(--h4);
		color: var(--section-title-color);
		margin: 0;
		margin-bottom: 30px;
	}
	&:last-child {
		margin-bottom: 0;
	}
	&:nth-child(even) {
		background: var(--background-color-section-even);
	}

	@media ${device.mobile} {
		font-size: var(--checklist-item-size);
		padding: var(--container-gap);
	}
`
