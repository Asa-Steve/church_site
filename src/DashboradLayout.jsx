import { Outlet } from 'react-router-dom'
import './DashboardLayout.scss'
import Footer from './components/Footer/Footer'

function DashboardLayout() {

  return (
    <>
      {/* No Navbar */}
      <div className="content">
        <Outlet />
      </div>
    </>
  )
}

export default DashboardLayout
