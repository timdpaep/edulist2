import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { IconButtonType } from 'enums'
import { IAsset } from '../../interfaces'
import { GET_ASSET } from '../../graphql/queries'
import { CheckListIconButton } from '..'

interface ICheckListPdfProp {
	assetId: string
	disabled?: boolean
}

interface ICheckListAssetData {
	asset: IAsset
}

export const CheckListPdfButton = ({
	assetId,
	disabled = false,
}: ICheckListPdfProp) => {
	const [getAssetdata, { data: assetData }] = useLazyQuery<ICheckListAssetData>(
		GET_ASSET,
		{
			variables: { id: assetId },
			fetchPolicy: 'no-cache',
		}
	)

	useEffect(() => {
		if (assetData && assetData.asset) {
			const { mimeType, url } = assetData.asset
			if (mimeType === 'application/pdf') {
				window.open(url)
			}
		}
	}, [assetData])

	return (
		<CheckListIconButton
			iconButtonType={IconButtonType.Pdf}
			onClick={() => getAssetdata()}
			disabled={disabled}
		/>
	)
}
