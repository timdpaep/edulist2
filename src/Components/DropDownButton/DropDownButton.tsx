import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useComponentVisible } from 'Hooks'
import { Button } from '..'

/**
 * TypeScript
 */

interface IDropDownButtonProps {
	label?: string
	icon?: IconProp
	children?: React.ReactNode
	color?: string
	svgIcon?: string
}

/**
 * Framer Motion
 */

/**
 * Styled Compenents
 */

const DropDownButtonContainer = styled.div`
	position: relative;
	display: flex;
	align-item: center;
	justify-content: center;
`

export const DropDownButton = ({
	children,
	label,
	icon,
	color = 'blue',
	svgIcon,
}: IDropDownButtonProps) => {
	const { ref, isComponentVisible, setIsComponentVisible } =
		useComponentVisible(false)
	return (
		<DropDownButtonContainer ref={ref}>
			<Button
				style={{
					color: 'var(--white)',
				}}
				color={color}
				onClick={() => setIsComponentVisible(!isComponentVisible)}
			>
				{icon && <FontAwesomeIcon icon={icon} />}
				{svgIcon && (
					<img
						style={{ width: '1em', display: 'block' }}
						src={svgIcon}
						alt='SVG Icon'
					/>
				)}
				{label && label}
			</Button>
			{isComponentVisible && <>{children}</>}
		</DropDownButtonContainer>
	)
}
