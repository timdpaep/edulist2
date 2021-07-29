import styled from 'styled-components'
import { Container } from './Container'

export const SectionContainer = styled(Container)`
	h2 {
		font-size: var(--h4);
		color: var(--section-title-color);
		margin: 0;
	}
	margin-bottom: var(--container-gap);
	&:last-child {
		margin-bottom: 0;
	}
`
