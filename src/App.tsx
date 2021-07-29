import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CoursesView, CourseView, CheckListView, EduSideBar } from './Views'
import { useAppSelector } from './Hooks'
import { selectSideBar } from './redux/appSlice'

const App: React.FC = () => {
	const sideBar = useAppSelector(selectSideBar)
	return (
		<>
			<Router>
				<Switch>
					<Route exact path='/'>
						<CoursesView />
					</Route>
					<Route path='/:slug/:checklistId' component={CheckListView} />
					<Route path='/:slug' component={CourseView} />
				</Switch>
			</Router>
			<EduSideBar open={sideBar.open} type={sideBar.type} value={sideBar.value} />
		</>
	)
}

export default App
