import styled from 'styled-components'
import { ContainerFluid } from '.'

export const SectionContainer = styled(ContainerFluid)`
	font-size: var(--checklist-item-size);
	h2 {
		font-size: var(--h4);
		color: var(--section-title-color);
		margin: 0;
		margin-bottom: 30px;
	}
	&:last-child {
		margin-bottom: 0;
	}
	padding: var(--container-gap);
	&:nth-child(even) {
		background: var(--background-color-section-even);
	}
`
