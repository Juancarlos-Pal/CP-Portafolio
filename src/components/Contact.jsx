import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay }
  })

  const inputStyle = {
    padding: '15px 20px', borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.04)',
    color: '#fff', fontSize: 15,
    fontFamily: 'inherit', outline: 'none',
    width: '100%',
    transition: 'border-color .25s, box-shadow .25s'
  }

  const handleFocus = e => {
    e.target.style.borderColor = 'rgba(255,107,0,0.5)'
    e.target.style.boxShadow   = '0 0 0 3px rgba(255,107,0,0.1)'
  }
  const handleBlur = e => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
    e.target.style.boxShadow   = 'none'
  }

  return (
    <section id="contact" ref={ref} style={{ background: '#000', padding: '100px 60px' }}>
      <div style={{ maxWidth: 540, margin: '0 auto', textAlign: 'center' }}>

        <motion.span {...fade(0)} style={{
          color: '#FF6B00', fontSize: 10.5, letterSpacing: '3.5px',
          textTransform: 'uppercase', display: 'block', marginBottom: 14
        }}>
          05 — Contacto
        </motion.span>

        <motion.h2 {...fade(0.1)} style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 'clamp(26px,4vw,42px)', marginBottom: 16, lineHeight: 1.15
        }}>
          ¿Trabajamos juntos?
        </motion.h2>

        <motion.p {...fade(0.2)} style={{
          color: 'rgba(255,255,255,0.45)', marginBottom: 44,
          lineHeight: 1.8, fontSize: 15.5
        }}>
          Disponible para proyectos freelance, colaboraciones y oportunidades. ¡Escríbeme sin compromiso!
        </motion.p>

        <motion.div {...fade(0.3)} style={{ display: 'flex', flexDirection: 'column', gap: 11, textAlign: 'left' }}>
          <input
            type="text" placeholder="Tu nombre"
            style={inputStyle}
            onFocus={handleFocus} onBlur={handleBlur}
          />
          <input
            type="email" placeholder="Tu email"
            style={inputStyle}
            onFocus={handleFocus} onBlur={handleBlur}
          />
          <textarea
            placeholder="Cuéntame sobre tu proyecto..."
            rows={4}
            style={{ ...inputStyle, resize: 'none' }}
            onFocus={handleFocus} onBlur={handleBlur}
          />
          <motion.button
            whileHover={{ boxShadow: '0 10px 32px rgba(255,107,0,0.55)', y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '15px', borderRadius: 10, fontSize: 15.5,
              fontWeight: 500, fontFamily: 'inherit',
              background: '#FF6B00', color: '#fff',
              border: 'none', cursor: 'pointer', marginTop: 4,
              transition: 'all .3s'
            }}
          >
            Enviar mensaje
          </motion.button>
        </motion.div>

        <motion.p {...fade(0.4)} style={{
          color: 'rgba(255,255,255,0.2)', fontSize: 12.5,
          marginTop: 34, letterSpacing: '.5px'
        }}>
          juan@ejemplo.com · Zapopan, Jalisco · México
        </motion.p>

      </div>

      {/* Footer */}
      <motion.footer {...fade(0.5)} style={{
        maxWidth: 940, margin: '80px auto 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid rgba(255,107,0,0.12)', paddingTop: 28
      }}>
        <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: 13 }}>
          © 2025 Juan David Pérez López. Hecho con código y café.
        </p>
        <div style={{ display: 'flex', gap: 18 }}>
          {['GitHub', 'LinkedIn', 'Twitter/X'].map(s => (
            <a key={s} href="#" style={{
              color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
              fontSize: 13, transition: 'color .2s'
            }}
            onMouseEnter={e => e.target.style.color = '#FF6B00'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
            >{s}</a>
          ))}
        </div>
      </motion.footer>

    </section>
  )
}