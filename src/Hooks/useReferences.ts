import { useCallback } from 'react'
import { ReferenceType } from '../enums'
import { IReference } from '../interfaces'

interface ILinksPerType {
	type: ReferenceType
	references: IReference[]
}

export const useReferences = () => {
	const getUsedTypes = useCallback(
		(references: IReference[]): ReferenceType[] =>
			Array.from(
				new Set(references.map((reference: IReference) => reference.referenceType))
			),
		[]
	)

	const getReferencesOfType = useCallback(
		(references: IReference[], type: ReferenceType): IReference[] =>
			references.filter((link: IReference) => link.referenceType === type),
		[]
	)

	const getReferencesPerType = useCallback(
		(references: IReference[]): ILinksPerType[] => {
			const usedTypes = getUsedTypes(references)
			return usedTypes.map(currentType => ({
				type: currentType,
				references: getReferencesOfType(references, currentType),
			}))
		},
		[]
	)

	return { getUsedTypes, getReferencesOfType, getReferencesPerType }
}
