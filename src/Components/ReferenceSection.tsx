import React, { useCallback } from 'react'
import { ReferenceType } from '../enums'
import { IReference } from '../interfaces'
import { AsideSectionContainer } from '.'

/**
 * TypeScript
 */

interface IReferenceSectionProps {
	type: ReferenceType
	style?: React.CSSProperties
	references: IReference[]
}

export const ReferenceSection = ({
	type,
	references = [],
	style = {},
}: IReferenceSectionProps) => {
	const referenceTitle = useCallback((referenceType: ReferenceType): string => {
		switch (referenceType) {
			case ReferenceType.Article:
				return 'Artikels'
			case ReferenceType.Podcast:
				return 'Podcasts'
			case ReferenceType.Link:
				return 'Links'
			case ReferenceType.Video:
				return 'Video'
			default:
				return 'Unknown'
		}
	}, [])

	if (references.length === 0) return null

	return (
		<AsideSectionContainer
			title={referenceTitle(type)}
			style={style}
			asideSectionContainerItems={references.map(({ title, url }: IReference) => ({
				label: title,
				url,
				download: false,
			}))}
		/>
	)
}
