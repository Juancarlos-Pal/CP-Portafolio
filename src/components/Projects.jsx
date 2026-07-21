import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    title: 'E-commerce Moda',
    desc: 'Tienda WooCommerce con 500+ productos, pasarelas de pago integradas y gestión de inventario optimizada para conversión.',
    tags: ['WordPress', 'WooCommerce', 'PHP', 'CSS'],
  },
  {
    title: 'Landing Corporativa',
    desc: 'Sitio B2B de alto impacto con animaciones on-scroll, formularios avanzados y versión multilingüe.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
  },
  {
    title: 'Portal Inmobiliario',
    desc: 'Plataforma de listings con filtros avanzados, mapas interactivos y panel de administración personalizado.',
    tags: ['WordPress', 'ACF', 'Maps API'],
  },
  {
    title: 'Dashboard Analytics',
    desc: 'Panel de métricas con gráficas en tiempo real e integración completa con WooCommerce REST API.',
    tags: ['React', 'Chart.js', 'REST API'],
  },
  {
    title: 'Dashboard Analytics',
    desc: 'Panel de métricas con gráficas en tiempo real e integración completa con WooCommerce REST API.',
    tags: ['React', 'Chart.js', 'REST API'],
  },
  {
    title: 'Dashboard Analytics',
    desc: 'Panel de métricas con gráficas en tiempo real e integración completa con WooCommerce REST API.',
    tags: ['React', 'Chart.js', 'REST API'],
  },
  {
    title: 'Dashboard Analytics',
    desc: 'Panel de métricas con gráficas en tiempo real e integración completa con WooCommerce REST API.',
    tags: ['React', 'Chart.js', 'REST API'],
  },
  {
    title: 'Dashboard Analytics',
    desc: 'Panel de métricas con gráficas en tiempo real e integración completa con WooCommerce REST API.',
    tags: ['React', 'Chart.js', 'REST API'],
  },
  {
    title: 'Dashboard Analytics',
    desc: 'Panel de métricas con gráficas en tiempo real e integración completa con WooCommerce REST API.',
    tags: ['React', 'Chart.js', 'REST API'],
  },
  {
    title: 'Dashboard Analytics',
    desc: 'Panel de métricas con gráficas en tiempo real e integración completa con WooCommerce REST API.',
    tags: ['React', 'Chart.js', 'REST API'],
  },
]

function ProjectCard({ title, desc, tags, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -7, borderColor: 'rgba(255,107,0,0.35)' }}
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16, padding: 30,
        background: 'rgba(255,255,255,0.02)',
        position: 'relative', overflow: 'hidden',
        transition: 'border-color .35s, background .35s',
        cursor: 'default'
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,0,0.04)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
    >
      {/* línea superior en hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #FF6B00, transparent)',
          transformOrigin: 'left'
        }}
      />

      {/* dot icon */}
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: 'rgba(255,107,0,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 18
      }}>
        <div style={{
          width: 16, height: 16, borderRadius: '50%',
          background: '#FF6B00',
          boxShadow: '0 0 14px #FF6B00'
        }} />
      </div>

      <h3 style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 700,
        fontSize: 18, marginBottom: 10, color: '#fff'
      }}>{title}</h3>

      <p style={{
        color: 'rgba(255,255,255,0.47)', fontSize: 14,
        lineHeight: 1.72, marginBottom: 18
      }}>{desc}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {tags.map(t => (
          <span key={t} style={{
            background: 'rgba(255,107,0,0.09)', color: '#FF6B00',
            padding: '4px 12px', borderRadius: 18, fontSize: 12,
            border: '1px solid rgba(255,107,0,0.2)'
          }}>{t}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} style={{ background: '#000', padding: '100px 60px', position: 'relative' }}>
      <div style={{ maxWidth: 940, margin: '0 auto' }}>

        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ color: '#FF6B00', fontSize: 10.5, letterSpacing: '3.5px', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}
        >
          03 — Proyectos
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,42px)', marginBottom: 52, lineHeight: 1.15 }}
        >
          Trabajo reciente
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} {...p} inView={inView} delay={0.2 + i * 0.12} />
          ))}
        </div>

      </div>
    </section>
  )
}