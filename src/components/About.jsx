import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { num: '5+',  label: 'Años de experiencia' },
  { num: '10+', label: 'Proyectos completados' },
  { num: '11+', label: 'Clientes satisfechos' },
  { num: '∞',   label: 'Ganas de aprender', orange: true },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay }
  })

  return (
    <section id="about" ref={ref} style={{ background: '#000', padding: '100px 60px', position: 'relative' }}>
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
          Webmaster con pasión<br />por el frontend moderno
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 56, alignItems: 'start' }}>

          {/* texto */}
          <motion.div {...fade(0.2)}>
            {[
              'Soy Ingeniero en Software especializado en e-commerce con +5 años de experiencia administrando y optimizando plataformas Shopify y WordPress/WooCommerce de alto tráfico. , creando sitios en WordPress y desarrollando soluciones web a medida. Me apasiona el detalle visual y la experiencia de usuario.',
              'Experiencia contrastada en gestión integral de catálogo, maquetación UI/UX de alta conversión, integración de pasarelas de pago, optimización SEO',
              'Actualmente profundizando en React, Next.js y animaciones avanzadas para crear interfaces que no solo funcionen perfecto, sino que genuinamente deslumbren.',
              'Basado en Guadalara, Jalisco — disponible para proyectos remotos y locales.'
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