import { NavLink } from 'react-router'

function Navigation() {
  return (
    <header className="site-header">
      <div className="nav-container">
        <NavLink className="nav-brand" to="/">
          ApplyTrack
        </NavLink>

        <nav className="nav-links" aria-label="Ana navigasyon">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'nav-link nav-link-active'
                : 'nav-link'
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/applications"
            className={({ isActive }) =>
              isActive
                ? 'nav-link nav-link-active'
                : 'nav-link'
            }
          >
            Başvurular
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navigation