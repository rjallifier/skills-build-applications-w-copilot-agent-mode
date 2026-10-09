import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { API_BASE_URL } from './api.js'
import logo from './assets/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
]

function Home() {
  return (
    <section className="p-4 p-md-5 mb-4 bg-body-tertiary rounded-3 border">
      <h1 className="display-6 fw-bold">Welcome to OctoFit Tracker</h1>
      <p className="lead">
        Log activities, join teams, climb the leaderboard, and discover workouts tailored to you.
      </p>
      <div className="d-flex flex-wrap gap-2">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className="btn btn-outline-primary">
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="OctoFit logo" className="app-logo" />
            OctoFit Tracker
          </Link>
          <ul className="navbar-nav flex-row flex-wrap gap-2 gap-md-0">
            {navItems.map((item) => (
              <li key={item.to} className="nav-item">
                <NavLink className="nav-link px-2" to={item.to}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="container pb-4 small text-muted">
        API: <code>{API_BASE_URL}/api/</code>
      </footer>
    </>
  )
}

export default App
