import { useState, useEffect } from 'react'
import useIsMobile from '../useIsMobile'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { id: 'about',      label: 'Sobre mí' },
    { id: 'skills',     label: 'Skills' },
    { id: 'projects',   label: 'Proyectos' },
    { id: 'experience', label: 'Experiencia' },
  ]

  const handleLink = (id) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        padding: isMobile ? '14px 22px' : '16px 60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(0,0,0,0.97)' : 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(18px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,107,0,0.32)' : 'rgba(255,107,0,0.18)'}`,
        transition: 'all .4s'
      }}>
        {/* Logo */}
        <a href="#hero" style={{
          color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 22, textDecoration: 'none',
          textShadow: '0 0 24px rgba(255,107,0,0.55)'
        }}>
          CP<span style={{ color: '#FF6B00' }}>.</span>
        </a>

        {/* Links desktop */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: 26, listStyle: 'none', alignItems: 'center' }}>
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13.5 }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" style={{
                color: '#FF6B00', border: '1px solid rgba(255,107,0,0.4)',
                padding: '7px 19px', borderRadius: 22,
                textDecoration: 'none', fontSize: 13.5
              }}>Contacto</a>
            </li>
          </ul>
        )}

        {/* Botón hamburguesa móvil */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 5, padding: 4
            }}
          >
            <span style={{
              display: 'block', width: 24, height: 2,
              background: '#fff', borderRadius: 2,
              transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              transition: 'transform .3s'
            }} />
            <span style={{
              display: 'block', width: 24, height: 2,
              background: '#fff', borderRadius: 2,
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity .3s'
            }} />
            <span style={{
              display: 'block', width: 24, height: 2,
              background: '#fff', borderRadius: 2,
              transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              transition: 'transform .3s'
            }} />
          </button>
        )}
      </nav>

      {/* Menú móvil desplegable */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 56, left: 0, right: 0, zIndex: 999,
          background: 'rgba(0,0,0,0.97)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255,107,0,0.18)',
          padding: menuOpen ? '20px 22px 28px' : '0 22px',
          maxHeight: menuOpen ? 400 : 0,
          overflow: 'hidden',
          transition: 'all .35s cubic-bezier(.4,0,.2,1)'
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {links.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => handleLink(id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.7)', fontSize: 16,
                    fontFamily: 'inherit', padding: '10px 0', width: '100%',
                    textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)',
                    transition: 'color .2s'
                  }}
                  onMouseEnter={e => e.target.style.color = '#FF6B00'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
                >
                  {label}
                </button>
              </li>
            ))}
            <li style={{ marginTop: 10 }}>
    <a
    href="#contact"
    onClick={() => setMenuOpen(false)}
    style={{
      display: 'block', textAlign: 'center',
      color: '#FF6B00', border: '1px solid rgba(255,107,0,0.4)',
      padding: '11px', borderRadius: 10,
      textDecoration: 'none', fontSize: 15, fontWeight: 500
    }}
  >
    Contacto
  </a>
</li>
          </ul>
        </div>
      )}
    </>
  )
}