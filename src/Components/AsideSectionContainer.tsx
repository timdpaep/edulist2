import React from 'react'
import styled from 'styled-components'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cross from '../images/cross.svg'
import { Link } from '.'
import device from '../device'

/**
 * TypeScript
 */

export interface IAsideSectionContainerItem {
	url: string
	label: string
	icon?: IconProp
	download?: boolean
}

interface IAsideSectionContainerProps {
	title: string
	style?: React.CSSProperties
	asideSectionContainerItems: IAsideSectionContainerItem[]
}

/**
 * Styled Components
 */

const AsideSectionContainerWrapper = styled.section`
	border-radius: var(--default-border-radius);
	padding: var(--container-gap-mobile);
	background: var(--lightGrey);
	h3 {
		font-size: var(--h5);
		margin-top: 0;
	}

	ul {
		margin: 0;
		list-style-type: none;
	}

	ul li {
		display: flex;
		list-style-position: outside;
		margin-bottom: 1.2rem;
	}

	ul li:last-child {
		margin-bottom: 0;
	}

	ul li img,
	ul li svg {
		margin-top: 0.35rem;
		width: 1rem;
		height: 1rem;
		margin-right: 15px;
	}

	@media ${device.mobile} {
		padding: 20px;
	}
`

export const AsideSectionContainer = ({
	title,
	asideSectionContainerItems,
	style = {},
}: IAsideSectionContainerProps) => (
	<AsideSectionContainerWrapper style={style}>
		<h3>{title}</h3>
		<ul>
			{asideSectionContainerItems &&
				asideSectionContainerItems.map(item => (
					<li key={item.label}>
						{item.icon ? (
							<FontAwesomeIcon icon={item.icon} fixedWidth />
						) : (
							<img src={cross} alt='list item for aside items' />
						)}
						<Link
							fileLabel={item.label}
							download={item.download}
							href={item.url}
							target='_blank'
						>
							{item.label}
						</Link>
					</li>
				))}
		</ul>
	</AsideSectionContainerWrapper>
)
