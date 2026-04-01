import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experience = [
  {
    role: 'Webmaster Senior',
    company: 'Agencia Digital MX',
    period: '2022 – Presente',
    desc: 'Administración de 8+ ecommerce en WooCommerce. Optimización de SEO técnico, velocidad y tasa de conversión. Desarrollo de plugins y temas personalizados en PHP.'
  },
  {
    role: 'Desarrollador Web Freelance',
    company: 'Proyectos independientes',
    period: '2020 – 2022',
    desc: 'Sitios WordPress a medida para PyMEs. Integración de pasarelas de pago y sistemas de reservas. Contratos de soporte y mantenimiento mensual.'
  },
  {
    role: 'Ingeniería en Software',
    company: 'Universidad de Guadalajara',
    period: '2016 – 2021',
    desc: 'Formación en software, bases de datos, algoritmos y metodologías ágiles. Proyecto de capstone con enfoque en apps web de alto rendimiento.'
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

  return (
    <section id="experience" ref={ref} style={{ background: '#050505', padding: '100px 60px', position: 'relative' }}>
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