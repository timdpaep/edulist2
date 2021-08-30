import React, { MouseEvent } from 'react'
import styled from 'styled-components'

interface IDropDownMenuItemProps {
	divider?: boolean
	onClick?: (event: MouseEvent) => void
	children?: React.ReactNode
}

const DropDownMenuItemContainer = styled.li<IDropDownMenuItemProps>`
	display: block;
	${({ divider }) =>
		divider ? `border-bottom: 1px solid var(--lightGrey);` : ''}
	margin: 0;
	padding: 5px 15px;
	white-space: nowrap;
	&:hover {
		background-color: var(--lightPurple);
	}
	a {
		color: var(--black);
		width: 100%;
		display: block;
	}
	a:hover {
		text-decoration: none;
	}
	&:last-child {
		border: none;
	}
`

export const DropDownMenuItem = ({
	divider,
	onClick,
	children,
}: IDropDownMenuItemProps) => (
	<DropDownMenuItemContainer divider={divider} onClick={onClick}>
		{children}
	</DropDownMenuItemContainer>
)
