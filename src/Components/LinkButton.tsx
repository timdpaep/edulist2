import React, { MouseEvent } from 'react'

interface ILinkButtonProps {
	children: React.ReactNode
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	className?: string
	disabled?: boolean
}

export const LinkButton = ({
	children,
	onClick,
	className,
	disabled = false,
}: ILinkButtonProps) => (
	<button
		type='button'
		disabled={disabled}
		className={className || 'link-button'}
		onClick={onClick}
	>
		{children}
	</button>
)
