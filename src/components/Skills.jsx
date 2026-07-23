import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const row1 = [
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',         name: 'HTML5' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',           name: 'CSS3' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', name: 'JavaScript' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg',    name: 'WordPress' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',             name: 'PHP' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',         name: 'React' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',       name: 'Node.js' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',             name: 'Git' },
  { icon: 'https://cdn.simpleicons.org/shopify',     name: 'Shopify' },

]
const row2 = [
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',         name: 'MySQL' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',         name: 'Figma' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg', name: 'Bootstrap' },
  { icon: 'https://cdn.simpleicons.org/mailchimp', name: 'MailChimp' },
  { icon: 'https://cdn.simpleicons.org/googlegemini', name: 'Google Gemini' },
  { icon: 'https://cdn.simpleicons.org/claude', name: 'Claude' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',       name: 'Next.js' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg',       name: 'jQuery' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',       name: 'GitHub' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',       name: 'VS Code' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg', name: 'Photoshop' },

]

const skills = [
  { name: 'HTML / CSS',          pct: 90 },
  { name: 'WordPress',           pct: 85 },
  { name: 'WooCommerce',         pct: 80 },
  { name: 'Shopify',             pct: 83 },
  { name: 'JavaScript',          pct: 45 },
  { name: 'PHP',                 pct: 45 },
  { name: 'SEO Técnico',         pct: 72 },
  { name: 'React (en progreso)', pct: 20 },
  { name: 'Git & Versionado',    pct: 55 },
  { name: 'Figma',               pct: 40 },
  { name: 'IA Generativa',       pct: 70 },


]

function Chip({ icon, name }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 40, padding: '10px 20px', margin: '0 7px',
      whiteSpace: 'nowrap', flexShrink: 0
    }}>
      <img src={icon} alt={name} style={{ width: 22, height: 22 }} />
      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{name}</span>
    </div>
  )
}

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div style={{
      overflow: 'hidden', marginBottom: 14,
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
    }}>
      <div style={{
        display: 'flex', width: 'max-content',
        animation: `${reverse ? 'mql' : 'mqr'} ${reverse ? 28 : 32}s linear infinite`
      }}>
        {doubled.map((item, i) => <Chip key={i} {...item} />)}
      </div>
    </div>
  )
}

function SkillBar({ name, pct, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ color: '#fff', fontSize: 14.5, fontWeight: 500 }}>{name}</span>
        <span style={{ color: '#FF6B00', fontSize: 13, fontWeight: 500 }}>{pct}%</span>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 5, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
          style={{
            height: '100%', borderRadius: 4,
            background: 'linear-gradient(90deg, #FF6B00, #FF8C00)',
            boxShadow: '0 0 12px rgba(255,107,0,0.5)'
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} style={{ background: '#050505', padding: '100px 60px', position: 'relative' }}>
      <style>{`
        @keyframes mqr { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes mql { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>

      <div style={{ maxWidth: 940, margin: '0 auto' }}>

        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ color: '#FF6B00', fontSize: 10.5, letterSpacing: '3.5px', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}
        >
          02 — Habilidades
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,42px)', marginBottom: 52, lineHeight: 1.15 }}
        >
          Stack técnico
        </motion.h2>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: 60 }}
        >
          <MarqueeRow items={row1} reverse={false} />
          <MarqueeRow items={row2} reverse={true} />
        </motion.div>

        {/* Skill bars */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 64px' }}>
          {skills.map((s, i) => (
            <SkillBar key={s.name} {...s} inView={inView} delay={0.3 + i * 0.07} />
          ))}
        </div>

      </div>
    </section>
  )
}