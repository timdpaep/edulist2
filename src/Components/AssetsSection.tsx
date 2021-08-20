import React, { useCallback } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
	faFileArchive,
	faFilePdf,
	faFilePowerpoint,
	faFileDownload,
	faFile,
	faFileImage,
} from '@fortawesome/free-solid-svg-icons'
import { IAsset } from '../interfaces'
import { AsideSectionContainer } from '.'

/**
 * TypeScript
 */

interface IAssetSectionProps {
	style?: React.CSSProperties
	assets: IAsset[]
}

export const AssetsSection = ({
	style = {},
	assets = [],
}: IAssetSectionProps) => {
	const getFaIconForMimeType = useCallback((mimeType: string): IconProp => {
		switch (mimeType) {
			case 'application/zip':
				return faFileArchive
			case 'application/pdf':
				return faFilePdf
			case 'application/json':
				return faFile
			case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
				return faFilePowerpoint
			case 'image/jpeg':
				return faFileImage
			default:
				return faFileDownload
		}
	}, [])

	if (assets.length === 0) return null

	return (
		<AsideSectionContainer
			title='Assets'
			style={style}
			asideSectionContainerItems={assets.map(
				({ fileName, url, mimeType }: IAsset) => ({
					label: fileName,
					url,
					icon: getFaIconForMimeType(mimeType),
					download: true,
				})
			)}
		/>
	)
}
