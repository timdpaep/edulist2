import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EduModal from 'Views/EduModal'
import { CoursesView, CourseView, CheckListView, EduSideBar } from './Views'
import { useAppSelector } from './Hooks'
import { selectSideBar, selectModal } from './redux/appSlice'

const App: React.FC = () => {
	const sideBar = useAppSelector(selectSideBar)
	const modal = useAppSelector(selectModal)
	return (
		<>
			<Router>
				<Switch>
					<Route exact path='/'>
						<CoursesView />
					</Route>
					<Route path='/:courseSlug/:checklistSlug' component={CheckListView} />
					<Route path='/:courseSlug' component={CourseView} />
				</Switch>
			</Router>
			<EduSideBar open={sideBar.open} type={sideBar.type} value={sideBar.value} />
			<EduModal open={modal.open} title={modal.title} content={modal.content} />
		</>
	)
}

export default App
