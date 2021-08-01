export const useDownloadFile = () => {
	const downloadFile = (assetUrl: string, filename: string): void => {
		// fetch the data
		fetch(assetUrl)
			.then(response => response.blob())
			.then(blob => {
				const url = URL.createObjectURL(blob)
				const a = document.createElement('a')
				a.href = url
				a.download = filename || 'download'
				const clickHandler = () => {
					setTimeout(() => {
						URL.revokeObjectURL(url)
						a.removeEventListener('click', clickHandler)
					}, 150)
				}
				a.addEventListener('click', clickHandler, false)
				a.click()
			})
	}

	return { downloadFile }
}
