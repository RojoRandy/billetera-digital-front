import { useEffect, useState } from "react"
import { cn } from "../lib/utils"
import { NavLink } from "react-router"

const navItems = [
  { to: "/", titulo: "Registro" },
  { to: "billetera", titulo: "Billetera" },
  { to: "pagos", titulo: "Pagos" },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(()=>{
    const handleScroll = () => {
      setIsScrolled(window.screenY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll);
  },[])

  return (
    <nav className={cn(
      "fixed w-full z-40 transition-all duration-300",
      isScrolled ? "py-3 bg-emerald-500/80 backdrop-blur-md shadow-xs" : "bg-emerald-500 py-5"
    )}>
      <div className="container flex items-center justify-between gap-4">

      <h1 className="text-xl text-white">Billetera Digital</h1>
      
      <div className="flex space-x-8">
        {
          navItems.map((item, key) => (
            <NavLink 
              key={key}
              to={item.to}
              className={({ isActive}) => isActive ? 'text-white border-b border-white' : 'hover:text-white'}
            >
              {item.titulo}
            </NavLink>
          ))
        }
      </div>
      </div>
    </nav>
  )
}

export default Navbar
