import React from 'react'

interface ISvgIconProps {
	source: string
	title: string
	width?: string
	height?: string
	style?: React.CSSProperties
}

export const SvgIcon = ({
	style,
	title,
	source,
	width = '1em',
	height = '1em',
}: ISvgIconProps) => (
	<img style={{ ...style, width, height }} src={source} alt={title} />
)
