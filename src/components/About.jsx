import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import useIsMobile from '../useIsMobile'

const stats = [
  { num: '5+',  label: 'Años desarrollando' },
  { num: '10+', label: 'Proyectos completados' },
  { num: '11+', label: 'E-commerce' },
  { num: '∞',   label: 'Ganas de aprender', orange: true },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isMobile = useIsMobile()

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay }
  })

  return (
    <section id="about" ref={ref} style={{ background: '#000', padding: isMobile ? '80px 24px' : '100px 60px', position: 'relative' }}>
      <div style={{ maxWidth: 940, margin: '0 auto' }}>

        <motion.span {...fade(0)} style={{
          color: '#FF6B00', fontSize: 10.5, letterSpacing: '3.5px',
          textTransform: 'uppercase', display: 'block', marginBottom: 14
        }}>
          01 — Sobre mí
        </motion.span>

        <motion.h2 {...fade(0.1)} style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 'clamp(26px,4vw,42px)', marginBottom: 52, lineHeight: 1.15
        }}>
          E-commerce, desarrollo web y frontend moderno
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.25fr 1fr', gap: isMobile ? 36 : 56, alignItems: 'start' }}>

          {/* texto */}
          <motion.div {...fade(0.2)}>
            {[
              'Soy Ingeniero en Software y actualmente trabajo como E-commerce Developer & Webmaster, especializado en el desarrollo, mantenimiento y optimización de plataformas Shopify, WordPress y WooCommerce.',
              'Durante los últimos cinco años he participado en proyectos que van desde tiendas en línea y catálogos B2B hasta sitios corporativos, integrando soluciones enfocadas en rendimiento, experiencia de usuario, SEO técnico y procesos de negocio.',
              'Actualmente estoy ampliando mis conocimientos en React, Next.js y tecnologías modernas de frontend, con el objetivo de complementar mi experiencia en e-commerce y evolucionar hacia un perfil cada vez más sólido como desarrollador frontend.',
            ].map((p, i) => (
              <p key={i} style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.88, fontSize: 15.5, marginBottom: 17 }}>{p}</p>
            ))}
          </motion.div>

          {/* stats */}
          <motion.div {...fade(0.3)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ borderColor: 'rgba(255,107,0,0.5)', boxShadow: '0 0 24px rgba(255,107,0,0.1)' }}
                style={{
                  background: '#0d0d0d',
                  border: '1px solid rgba(255,107,0,0.18)',
                  borderRadius: 14, padding: 24,
                  transition: 'all .35s'
                }}
              >
                <p style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 800,
                  fontSize: 40, lineHeight: 1,
                  color: s.orange ? '#FF6B00' : '#fff',
                  textShadow: s.orange ? '0 0 20px rgba(255,107,0,0.5)' : 'none'
                }}>{s.num}</p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12.5, marginTop: 6 }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}