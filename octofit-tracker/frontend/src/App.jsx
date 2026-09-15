import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['Leaderboard', '/leaderboard'],
  ['Activities', '/activities'],
  ['Teams', '/teams'],
  ['Athletes', '/users'],
  ['Workouts', '/workouts'],
]

function App() {
  return <div className="app-shell">
    <header className="site-header">
      <NavLink className="brand" to="/leaderboard"><img src="/octofitapp-small.png" alt="" /><span>OctoFit<small>Tracker</small></span></NavLink>
      <nav aria-label="Primary navigation">{navigation.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}</nav>
    </header>
    <main><Routes>
      <Route path="/" element={<Navigate to="/leaderboard" replace />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/users" element={<Users />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="*" element={<Navigate to="/leaderboard" replace />} />
    </Routes></main>
    <footer><span>OctoFit Tracker</span><span>Move. Measure. Improve.</span></footer>
  </div>
}

export default App