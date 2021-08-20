/**
 * TypeScript
 */

import { useCallback } from 'react'
import { useDownloadFile } from 'Hooks'

interface ILinkProps {
	href: string
	label: string
	target?: string
	download?: boolean
}

export const Link = ({
	href,
	label,
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
				linkClick(href, label, target, download)
			}}
			href={href}
			target={target}
			rel='noreferrer'
		>
			{label}
		</a>
	)
}
