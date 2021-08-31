import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CheckBoxProps {
	strokeColor?: string
	checkBoxWidth: string
	checkBoxHeight: string
	strokeWidth?: number
	checked?: boolean
	checkedChanged?: (checked: boolean) => void
}

/**
 * Framer Motion Variants
 */

const rectVariants = ({ borderColor = '#000000' }) => ({
	unchecked: {
		stroke: borderColor,
		opacity: 1,
	},
	checked: {
		stroke: borderColor,
		opacity: 1,
	},
	pressed: {
		scale: 0.9,
		opacity: 0.5,
	},
	hover: {
		stroke: borderColor,
		opacity: 0.5,
		transition: {
			duration: 0.2,
			ease: 'easeOut',
		},
	},
})

const pathVariants = ({ strokeColor = '#000000' }) => ({
	checked: {
		pathLength: 1,
		stroke: strokeColor,
		transition: {
			duration: 0.2,
			ease: 'easeInOut',
		},
	},
	unchecked: {
		pathLength: 0,
		stroke: strokeColor,
		transition: {
			duration: 0.2,
			ease: 'easeInOut',
		},
	},
})

export const CheckBox = ({
	strokeColor = '#000000',
	checkBoxWidth = '100px',
	checkBoxHeight = '100px',
	strokeWidth = 6,
	checked = false,
	checkedChanged,
}: CheckBoxProps) => {
	const [isChecked, setIsChecked] = useState<boolean>(checked)

	useEffect(() => {
		setIsChecked(checked)
	}, [checked])

	return (
		<div
			style={{
				width: checkBoxWidth,
				height: checkBoxHeight,
			}}
		>
			<motion.svg
				animate={isChecked ? 'checked' : 'unchecked'}
				initial='unchecked'
				whileHover='hover'
				whileTap='pressed'
				viewBox='0 0 100 100'
				onClick={() => {
					if (checkedChanged) checkedChanged(!isChecked)
					setIsChecked(!isChecked)
				}}
			>
				<motion.rect
					fillRule='nonzero'
					width={100 - strokeWidth}
					height={100 - strokeWidth}
					fill='transparent'
					strokeWidth={strokeWidth}
					x={strokeWidth / 2}
					y={strokeWidth / 2}
					variants={rectVariants({
						borderColor: strokeColor,
					})}
				/>
				<motion.path
					d='M 20 20 L 80 80'
					strokeWidth={strokeWidth}
					variants={pathVariants({
						strokeColor,
					})}
				/>
				<motion.path
					d='M 80 20 L 20 80'
					strokeWidth={strokeWidth}
					variants={pathVariants({
						strokeColor,
					})}
				/>
			</motion.svg>
		</div>
	)
}
