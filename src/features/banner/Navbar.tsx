import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import menuIcon from '@assets/images/menu.svg'
import { toggle } from '@features/navbar/NavMenu/navMenuSlice'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { useAppSelector } from '@hooks/useAppSelector'

const menus = [
  {
    name: 'Home',
    href: '#home',
  },
  {
    name: 'Projects',
    href: '#projects',
  },
  {
    name: 'Certifications',
    href: '#certifications',
  },
  {
    name: 'Contact Me',
    href: '#contact',
  },
]

const Navbar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>('Home')
  const navMenu = useAppSelector((state) => state.navMenu.value)
  const activeSection = useAppSelector((state) => state.activeSection.name)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setActiveMenuItem(activeSection)
  }, [activeSection])

  return (
    <nav className='bg-light-gray/90 h-auto px-8 fixed top-0 left-0 right-0 z-40 backdrop-blur-md'>
      <div className='md:container md:px-20 h-20 flex items-center justify-between'>
        <a href='/' className='text-black text-2xl font-extrabold'>
          DARMA<span className='text-purple'>.</span>
        </a>
        <button
          className='border-[1px] border-slate-900 h-8 w-8 flex justify-center items-center rounded-full hover:scale-105 transition-all md:hidden'
          onClick={() => dispatch(toggle())}>
          <img src={menuIcon} alt='Click to toggle the menu list' />
        </button>
        <ul
          className={`fixed md:static md:flex items-center bg-light-gray/90 md:bg-light-gray/0 backdrop-blur-md md:backdrop-blur-0 top-20 md:top-0 z-40 md:z-auto left-0 px-8 md:px-0 right-0 origin-top ${
            navMenu === 'opened'
              ? 'scale-y-100 opacity-1'
              : 'scale-y-0 opacity-0'
          } transition-all md:scale-100 md:opacity-100`}>
          {menus.map((menu) => {
            return (
              <li
                key={uuidv4()}
                className='md:ml-5 nav-link-item'
                onClick={() => setActiveMenuItem(menu.name)}>
                <a
                  href={`${menu.href}`}
                  className={`font-medium text-lg hover:text-purple transition-all min-h-[44px] flex md:items-center md:justify-center ${
                    menu.name === activeMenuItem ? 'text-purple' : 'text-black'
                  }`}>
                  {menu.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar