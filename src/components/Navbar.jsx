import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      padding: '16px 60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(0,0,0,0.97)' : 'rgba(0,0,0,0.88)',
      backdropFilter: 'blur(18px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(255,107,0,0.32)' : 'rgba(255,107,0,0.18)'}`,
      transition: 'all .4s'
    }}>
      <a href="#hero" style={{
        color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 800,
        fontSize: 22, textDecoration: 'none',
        textShadow: '0 0 24px rgba(255,107,0,0.55)'
      }}>
        JP<span style={{ color: '#FF6B00' }}>.</span>
      </a>
      <ul style={{ display: 'flex', gap: 26, listStyle: 'none', alignItems: 'center' }}>
        {['about','skills','projects','experience'].map(id => (
          <li key={id}>
            <a href={`#${id}`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13.5 }}>
              {{ about:'Sobre mí', skills:'Skills', projects:'Proyectos', experience:'Experiencia' }[id]}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" style={{
            color: '#FF6B00', border: '1px solid rgba(255,107,0,0.4)',
            padding: '7px 19px', borderRadius: 22, textDecoration: 'none', fontSize: 13.5
          }}>Contacto</a>
        </li>
      </ul>
    </nav>
  )
}