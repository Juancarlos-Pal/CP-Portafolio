import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import useIsMobile from '../useIsMobile'

const SERVICE_ID  = 'service_hpvfi6g'
const TEMPLATE_ID = 'template_tr8ms21'
const PUBLIC_KEY  = 'N15lrklNySCKsAwUh'

export default function Contact() {
  const ref    = useRef(null)
  const formRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isMobile = useIsMobile()

  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

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
    <section id="contact" ref={ref} style={{ background: '#000', padding: isMobile ? '80px 24px' : '100px 60px' }}>
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

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          {...fade(0.3)}
          style={{ display: 'flex', flexDirection: 'column', gap: 11, textAlign: 'left' }}
        >
          <input
            name="from_name"
            type="text"
            placeholder="Tu nombre"
            required
            style={inputStyle}
            onFocus={handleFocus} onBlur={handleBlur}
          />
          <input
            name="from_email"
            type="email"
            placeholder="Tu email"
            required
            style={inputStyle}
            onFocus={handleFocus} onBlur={handleBlur}
          />
          <textarea
            name="message"
            placeholder="Cuéntame sobre tu proyecto..."
            rows={4}
            required
            style={{ ...inputStyle, resize: 'none' }}
            onFocus={handleFocus} onBlur={handleBlur}
          />

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={status !== 'sending' ? { boxShadow: '0 10px 32px rgba(255,107,0,0.55)', y: -2 } : {}}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '15px', borderRadius: 10, fontSize: 15.5,
              fontWeight: 500, fontFamily: 'inherit',
              background: status === 'success' ? '#22c55e' : '#FF6B00',
              color: '#fff', border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              marginTop: 4, transition: 'background .3s',
              opacity: status === 'sending' ? 0.7 : 1
            }}
          >
            {status === 'idle'    && 'Enviar mensaje'}
            {status === 'sending' && 'Enviando...'}
            {status === 'success' && '¡Mensaje enviado! ✓'}
            {status === 'error'   && 'Error, intenta de nuevo'}
          </motion.button>

        </motion.form>

        <motion.p {...fade(0.4)} style={{
          color: 'rgba(255,255,255,0.2)', fontSize: 12.5,
          marginTop: 34, letterSpacing: '.5px'
        }}>
          juan.palomeque.m96@gmail.com · Guadalajara, Jalisco · México
        </motion.p>

      </div>

      {/* Footer */}
      <motion.footer {...fade(0.5)} style={{
        maxWidth: 940, margin: '80px auto 0',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: isMobile ? 12 : 0,
        textAlign: isMobile ? 'center' : 'left',
        borderTop: '1px solid rgba(255,107,0,0.12)',
        paddingTop: 28
      }}>
        <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: 13 }}>
          © 2025 JCarlos Palomeque. Hecho con código y café.
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