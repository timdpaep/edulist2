import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

/**
 * TypeScript
 */

interface IProgressBarProps {
	percentage: number
	width?: string
	height?: string
}

interface IBarProps {
	width?: string
	height?: string
}

interface IBarFillingProps {
	width?: string
	height?: string
}

/**
 * Framer motion
 */

/**
 * Styled Components
 */

const Bar = styled.div<IBarProps>`
	overflow: hidden;
	position: relative;
	background-color: var(--lightGrey);
	width: ${props => (props.width ? props.width : '100%')};
	height: ${props => (props.height ? props.height : '100%')};
`

const BarFilling = styled(motion.div)<IBarFillingProps>`
	position: absolute;
	top: 0;
	left: 0;
	background-color: var(--orange);
	width: ${props => (props.width ? props.width : '100%')};
	height: ${props => (props.height ? props.height : '100%')};
`

export const ProgressBar = ({
	width = '100%',
	height = '10px',
	percentage = 0,
}: IProgressBarProps) => (
	<Bar width={width} height={height}>
		<BarFilling
			initial={{
				width: '0',
			}}
			animate={{
				width: `${percentage}%`,
			}}
			transition={{
				duration: 0.4,
				type: 'tween',
			}}
		/>
	</Bar>
)
