import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faYoutube,
	faEarlybirds,
	faGithub,
} from '@fortawesome/free-brands-svg-icons'
import {
	faFilePdf,
	faLink,
	faEdit,
	faDownload,
} from '@fortawesome/free-solid-svg-icons'
import { IconButtonType } from '../enums'

/**
 * Types
 */

interface IButtonIcon {
	iconButtonType: IconButtonType
}

export const ButtonIcon = ({
	iconButtonType = IconButtonType.Default,
}: IButtonIcon) => (
	<>
		{iconButtonType === IconButtonType.Link && <FontAwesomeIcon icon={faLink} />}
		{iconButtonType === IconButtonType.YouTube && (
			<FontAwesomeIcon icon={faYoutube} />
		)}
		{iconButtonType === IconButtonType.Default && (
			<FontAwesomeIcon icon={faEarlybirds} />
		)}
		{iconButtonType === IconButtonType.Exercise && (
			<FontAwesomeIcon icon={faEdit} />
		)}
		{iconButtonType === IconButtonType.GitHub && (
			<FontAwesomeIcon icon={faGithub} />
		)}
		{iconButtonType === IconButtonType.Pdf && (
			<FontAwesomeIcon icon={faFilePdf} />
		)}
		{iconButtonType === IconButtonType.Asset && (
			<FontAwesomeIcon icon={faDownload} />
		)}
	</>
)
