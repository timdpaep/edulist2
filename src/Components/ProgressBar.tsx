// import { useCallback } from 'react'
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
	bgColor?: string
}

/**
 * Styled Components
 */

const Bar = styled.div<IBarProps>`
	overflow: hidden;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 98;
	background-color: var(--lightGrey);
	width: ${props => (props.width ? props.width : '100%')};
	height: ${props => (props.height ? props.height : '100%')};
`

const BarFilling = styled(motion.div)<IBarFillingProps>`
	position: absolute;
	top: 0;
	left: 0;
	background-color: ${props =>
		props.bgColor ? props.bgColor : 'var(--lightGrey)'};
	width: ${props => (props.width ? props.width : '100%')};
	height: ${props => (props.height ? props.height : '100%')};
`
const getBackgroundColor = (p: number): string => {
	if (p >= 0 && p < 20) {
		return 'var(--background-color-20)'
	}
	if (p >= 20 && p < 40) {
		return 'var(--background-color-20)'
	}
	if (p >= 40 && p < 60) {
		return 'var(--background-color-40)'
	}
	if (p >= 60 && p < 80) {
		return 'var(--background-color-60)'
	}
	if (p >= 80 && p < 100) {
		return 'var(--background-color-80)'
	}
	return 'var(--background-color-100)'
}

export const ProgressBar = ({
	width = '100%',
	height = '10px',
	percentage = 0,
}: IProgressBarProps) => (
	<Bar width={width} height={height}>
		<BarFilling
			bgColor={getBackgroundColor(percentage)}
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
