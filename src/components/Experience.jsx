import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import useIsMobile from '../useIsMobile'

const experience = [
  {
    role: 'E-commerce Developer & Webmaster',
    company: 'OMG International',
    period: '2022 – Presente',
    desc: 'Lidero la evolución técnica de plataformas Shopify y WordPress, colaborando con equipos de marketing y diseño para desarrollar experiencias digitales enfocadas en conversión, rendimiento y escalabilidad.'
  },
  {
    role: 'Desarrollador Web Freelance',
    company: 'Proyectos independientes',
    period: '2020 – Presente',
    desc: 'He colaborado con empresas de distintos sectores desarrollando tiendas en línea, sitios corporativos y soluciones a medida. Cada proyecto representa un reto distinto y una oportunidad para seguir aprendiendo nuevas tecnologías.'
  },
  {
    role: 'Desarrollador Web',
    company: 'Möller Consultores',
    period: '2018 – 2019',
    desc: 'Aquí consolidé mis bases en desarrollo frontend y WordPress, participando en plataformas internas, sitios corporativos y proyectos desarrollados desde cero.'
  },
  {
    role: 'Prácticas Profesionales',
    company: 'Universidad Politécnica de Tapachula',
    period: '2017',
    desc: 'Fue mi primer acercamiento al desarrollo profesional, trabajando en soporte, infraestructura y desarrollo web dentro de la universidad.'
  },
]

function TimelineItem({ role, company, period, desc, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      style={{ position: 'relative', paddingLeft: 32, paddingBottom: 42 }}
    >
      {/* línea vertical */}
      <div style={{
        position: 'absolute', left: 6, top: 16, bottom: 0,
        width: 1, background: 'rgba(255,107,0,0.18)'
      }} />

      {/* dot con glow */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
        style={{
          position: 'absolute', left: 0, top: 10,
          width: 14, height: 14, borderRadius: '50%',
          background: '#FF6B00',
          boxShadow: '0 0 14px rgba(255,107,0,0.9), 0 0 28px rgba(255,107,0,0.45)'
        }}
      />

      <p style={{
        color: '#FF6B00', fontSize: 10.5,
        letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 6
      }}>{period}</p>

      <h3 style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 700,
        fontSize: 19.5, marginBottom: 5, color: '#fff'
      }}>{role}</h3>

      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13.5, marginBottom: 11 }}>{company}</p>

      <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: 14.5, lineHeight: 1.8 }}>{desc}</p>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isMobile = useIsMobile()

  return (
    <section id="experience" ref={ref} style={{ background: '#050505', padding: isMobile ? '80px 24px' : '100px 60px', position: 'relative' }}>
      <div style={{ maxWidth: 940, margin: '0 auto' }}>

        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ color: '#FF6B00', fontSize: 10.5, letterSpacing: '3.5px', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}
        >
          04 — Experiencia
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,42px)', marginBottom: 52, lineHeight: 1.15 }}
        >
          Trayectoria profesional
        </motion.h2>

        <div>
          {experience.map((e, i) => (
            <TimelineItem key={e.role} {...e} inView={inView} delay={0.2 + i * 0.15} />
          ))}
        </div>

      </div>
    </section>
  )
}