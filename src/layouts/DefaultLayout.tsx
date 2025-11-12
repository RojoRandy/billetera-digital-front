import DashedGrid from '../components/DashedGrid'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const DefaultLayout = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Dashed Grid */}
      <DashedGrid />

      <Navbar />

      <main className='container min-h-screen relative py-24 px-4'>
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout
