import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import useIsMobile from '../useIsMobile'

const projects = [
  {
    title: 'Arome México',
    desc: 'Administración integral de e-commerce en Shopify. Gestión de catálogo, maquetación de landing pages para campañas, integración de pasarelas de pago y sincronización con app móvil nativa (Vajro).',
    tags: ['Shopify', 'e-commerce', 'SEO', 'UX/UI', 'Payment Gateways'],
    url: 'https://arome.mx/',
  },
  {
    title: 'YoungMi',
    desc: 'Gestión de e-commerce en Shopify y estrategia omnicanal. Maquetación de landings, mailing masivo, notificaciones push vía app móvil (Vajro) e integración de IA (Gemini) para copy de campañas.',
    tags: ['Shopify', 'e-commerce', 'Mailchimp', 'SEO', 'AI Copywriting'],
    url: 'https://youngmi.mx/',
  },
  {
    title: 'Clean Scents',
    desc: 'Sitio corporativo desarrollado desde cero en WordPress + Elementor. Maquetación responsive basada en diseños de equipo UI/UX, animaciones avanzadas e integración de plugins clave.',
    tags: ['WordPress', 'CSS/JS', 'UI/UX', 'Responive Desing'],
    url: 'https://clean-scents.com/',

  },
  {
    title: 'Agromg',
    desc: 'Rediseño web y catálogo B2B en WordPress + WooCommerce. Estructura personalizada a partir de plantilla base, campos personalizados (ACF) y SEO optimizado con Yoast.',
    tags: ['WordPress', 'WooCommerce', 'SEO', 'Responsive Desing'],
    url: 'https://agromg.com/',

  },
  {
    title: 'GofeLogistics',
    desc: 'Sitio web corporativo para servicios de logística. Desarrollado en WordPress + Elementor a partir de plantilla base, con enfoque en arquitectura de información y responsive design.',
    tags: ['WordPress', 'Responsive Design', 'Elementor', 'UI Layout', 'CSS3'],
    url: 'https://gofelogistics.com/',
  },
  {
    title: 'SinDolart',
    desc: 'Desarrollo y administración de e-commerce en Shopify para el sector salud. Maquetación de landings para campañas, pasarelas de pago, gestión de catálogo y SEO técnico.',
    tags: ['Shopify', 'E-commerce', 'Payment Gateways', 'Shipping Rules', 'SEO'],
    url: 'https://sindolart.mx/',
  },
  {
    title: 'HowlerSound',
    desc: 'E-commerce en WordPress + WooCommerce desarrollado como proyecto freelance. Configuración integral de checkout, pasarelas de pago, reglas de envío y catálogo de 50+ productos.',
    tags: ['WordPress', 'WooCommerce', 'Payment Gateways', 'Shipping Rules'],
    url: 'https://howlersound.com/',
  },
  {
    title: 'Dale Desarrollos',
    desc: 'Sitio web corporativo para desarrollo inmobiliario. Creado en WordPress + Elementor con enfoque en diseño responsive, maquetación de servicios y formularios de contacto.',
    tags: ['WordPress', 'Responsive Design', 'UI/UX'],
    url: 'https://daledesarrollos.com/',
  },
  {
    title: 'Perfiherrajes',
    desc: 'Catálogo industrial B2B en WordPress + WooCommerce con más de 200 productos. Estructuración masiva de categorías, diseño responsive y navegación optimizada para consultas.',
    tags: ['WordPress', 'WooCommerce', 'B2B Catalog', 'Responsive Design'],
    url: 'https://phimmsa.com.mx/',
  },
  {
    title: 'MJL Cocinas & Acabados',
    desc: 'Portal web corporativo en WordPress + Elementor. Maquetación sobre plantilla base, gestión de cambio de dominio, migración de servidor y resolución de errores en producción.',
    tags: ['WordPress', 'Elementor', 'Domain Migration', 'DNS / Hosting'],
    url: 'https://mjl.mx/',
  },
]

function ProjectCard({ title, desc, tags, url, delay, inView }) {
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
      {url && (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      marginTop: 16, color: '#FF6B00', fontSize: 13,
      textDecoration: 'none', fontWeight: 500,
      transition: 'gap .2s'
    }}
    onMouseEnter={e => e.currentTarget.style.gap = '10px'}
    onMouseLeave={e => e.currentTarget.style.gap = '6px'}
  >
    Ver proyecto
    <span style={{ fontSize: 16 }}>→</span>
  </a>
)}
      
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isMobile = useIsMobile()

  return (
    <section id="projects" ref={ref} style={{ background: '#000', padding: isMobile ? '80px 24px' : '100px 60px', position: 'relative' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} {...p} inView={inView} delay={0.2 + i * 0.12} />
          ))}
        </div>

      </div>
    </section>
  )
}