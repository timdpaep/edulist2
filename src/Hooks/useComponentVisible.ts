import { useState, useEffect, useRef } from 'react'

export const useComponentVisible = (initialIsVisible: boolean) => {
	const [isComponentVisible, setIsComponentVisible] =
		useState<boolean>(initialIsVisible)
	const ref = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: Event) => {
		if (
			event.target instanceof Element &&
			ref.current &&
			!ref.current?.contains(event.target)
		) {
			setIsComponentVisible(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return { ref, isComponentVisible, setIsComponentVisible }
}
