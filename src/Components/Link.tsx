import React, { useCallback } from 'react'
import { useDownloadFile } from 'Hooks'

interface ILinkProps {
	href: string
	children: React.ReactNode
	target?: string
	download?: boolean
	fileLabel?: string
}

export const Link = ({
	href,
	fileLabel = 'default',
	children,
	target = '_blank',
	download = false,
}: ILinkProps) => {
	const { downloadFile } = useDownloadFile()
	const linkClick = useCallback(
		(u: string, l: string, t: string, d: boolean) => {
			if (!d) window.open(u, t)
			else downloadFile(u, l)
		},
		[]
	)
	return (
		<a
			onClick={e => {
				e.preventDefault()
				linkClick(href, fileLabel, target, download)
			}}
			href={href}
			target={target}
			rel='noreferrer'
		>
			{children}
		</a>
	)
}
