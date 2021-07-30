import { useState, useEffect } from 'react'
import { setSideBar } from '../redux/appSlice'
import { useAppDispatch } from '../Hooks'
import { SideBar } from '../Components/SideBar'
import { Exercise, YouTube } from '.'

/**
 * Interfaces
 */

interface IEduSideBarProps {
	open: boolean
	type?: string
	value?: string
}

export default ({
	open = false,
	type = 'text',
	value = 'Dit is een test',
}: IEduSideBarProps) => {
	const dispatch = useAppDispatch()
	const [currentType, setCurrentType] = useState('none')
	const [isLoading, setIsLoading] = useState(false)

	/**
	 * Sets the current type and changes the state
	 */
	useEffect(() => {
		setCurrentType(type)
	}, [type])

	return (
		<SideBar
			open={open}
			animationDuration={0.3}
			loading={isLoading}
			onCloseClicked={() => dispatch(setSideBar({ open: false, value, type }))}
			onClosed={() => dispatch(setSideBar({ open: false, value: '' }))}
		>
			{currentType === 'youtube' && (
				<YouTube
					youtubeId={value}
					loadingChanged={loading => setIsLoading(loading)}
				/>
			)}
			{currentType === 'exercise' && (
				<Exercise
					exerciseId={value}
					loadingChanged={loading => setIsLoading(loading)}
				/>
			)}
		</SideBar>
	)
}
