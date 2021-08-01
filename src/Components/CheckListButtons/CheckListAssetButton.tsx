import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { IconButtonType } from 'enums'
import { IAsset } from '../../interfaces'
import { GET_ASSET } from '../../graphql/queries'
import { useDownloadFile } from '../../Hooks'
import { CheckListIconButton } from '..'

interface ICheckListAssetProp {
	assetId: string
	disabled?: boolean
}

interface ICheckListAssetData {
	asset: IAsset
}

export const CheckListAssetButton = ({
	assetId,
	disabled = false,
}: ICheckListAssetProp) => {
	const { downloadFile } = useDownloadFile()
	const [getAssetdata, { data: assetData }] = useLazyQuery<ICheckListAssetData>(
		GET_ASSET,
		{
			variables: { id: assetId },
			fetchPolicy: 'no-cache',
		}
	)

	useEffect(() => {
		if (assetData && assetData.asset)
			downloadFile(assetData.asset.url, assetData.asset.fileName)
	}, [assetData])

	return (
		<CheckListIconButton
			iconButtonType={IconButtonType.Asset}
			onClick={() => getAssetdata()}
			disabled={disabled}
		/>
	)
}
