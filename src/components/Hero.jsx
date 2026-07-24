import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useIsMobile from '../useIsMobile'

const WORDS = ['E-commerce Developer', 'Webmaster']

function useTyping(el) {
  useEffect(() => {
    let wi = 0, ci = 0, del = false, timer
    function tick() {
      const w = WORDS[wi]
      if (!del) {
        if (el.current) el.current.textContent = w.slice(0, ++ci)
        if (ci === w.length) { del = true; timer = setTimeout(tick, 1700); return }
      } else {
        if (el.current) el.current.textContent = w.slice(0, --ci)
        if (ci === 0) { del = false; wi = (wi + 1) % WORDS.length }
      }
      timer = setTimeout(tick, del ? 50 : 82)
    }
    tick()
    return () => clearTimeout(timer)
  }, [])
}

function useLava(canvas, hero) {
  useEffect(() => {
    const cvs = canvas.current
    const sec = hero.current
    if (!cvs || !sec) return
    const ctx = cvs.getContext('2d')
    let W, H, bubbles = [], raf
    const mouse = { x: null, y: null }

    function resize() {
      W = cvs.width  = sec.offsetWidth
      H = cvs.height = sec.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    sec.addEventListener('mousemove', e => {
      const r = sec.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    })
    sec.addEventListener('mouseleave', () => { mouse.x = mouse.y = null })

    function mkBubble() {
      const r  = 28 + Math.random() * 65
      const up = Math.random() > 0.28
      return {
        x: r + Math.random() * (W - r * 2),
        y: up ? H + r + 20 : -r - 20,
        r, up,
        vx: (Math.random() - 0.5) * 0.45,
        vy: up ? -(0.22 + Math.random() * 0.52) : (0.18 + Math.random() * 0.42),
        tx: (Math.random() - 0.5) * 0.5,
        ph: Math.random() * Math.PI * 2,
        pp: Math.random() * Math.PI * 2,
        wf: 0.3 + Math.random() * 0.35,
        wa: 0.5 + Math.random() * 1.5,
      }
    }

    // spawn inicial con posiciones random
    bubbles = Array.from({ length: 17 }, () => {
      const b = mkBubble()
      b.y = Math.random() * H  // ya visibles al cargar
      return b
    })

    function update(b) {
      b.ph += 0.016; b.pp += 0.022
      b.vx += (b.tx - b.vx) * 0.012
      if (Math.random() < 0.004) b.tx = (Math.random() - 0.5) * 0.7
      b.x += b.vx + Math.sin(b.ph * b.wf) * b.wa * 0.04
      b.y += b.vy
      if (b.x - b.r < 0)  { b.x = b.r;     b.vx =  Math.abs(b.vx) }
      if (b.x + b.r > W)  { b.x = W - b.r; b.vx = -Math.abs(b.vx) }
      if (b.up  && b.y + b.r < -30) Object.assign(b, mkBubble())
      if (!b.up && b.y - b.r > H + 30) Object.assign(b, mkBubble())
      if (mouse.x !== null) {
        const dx = b.x - mouse.x, dy = b.y - mouse.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        const T  = 165
        if (d < T && d > 1) { const f = ((T - d) / T) * 3.2; b.x += (dx/d)*f; b.y += (dy/d)*f }
      }
    }

    function draw() {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)

      // glow ambiental
      ctx.globalCompositeOperation = 'source-over'
      bubbles.forEach(b => {
        const pr = b.r + Math.sin(b.pp) * 6
        const g  = ctx.createRadialGradient(b.x, b.y, pr * 0.5, b.x, b.y, pr * 2.2)
        g.addColorStop(0, 'rgba(255,65,0,0.07)')
        g.addColorStop(1, 'rgba(255,30,0,0)')
        ctx.beginPath(); ctx.arc(b.x, b.y, pr * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
      })

      // relleno aditivo (burbujas se fusionan)
      ctx.globalCompositeOperation = 'lighter'
      bubbles.forEach(b => {
        const pr = b.r + Math.sin(b.pp) * 6
        const ox = b.x - pr * 0.22, oy = b.y - pr * 0.18
        const g  = ctx.createRadialGradient(ox, oy, 0, b.x, b.y, pr)
        g.addColorStop(0,    'rgba(255,155,25,0.92)')
        g.addColorStop(0.35, 'rgba(255,88,0,0.82)')
        g.addColorStop(0.72, 'rgba(218,48,0,0.48)')
        g.addColorStop(1,    'rgba(170,22,0,0)')
        ctx.beginPath(); ctx.arc(b.x, b.y, pr, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
      })

      // contorno brillante
      ctx.globalCompositeOperation = 'source-over'
      bubbles.forEach(b => {
        const pr = b.r + Math.sin(b.pp) * 6
        ctx.beginPath(); ctx.arc(b.x, b.y, pr, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,165,55,0.6)'
        ctx.lineWidth   = 2.2
        ctx.shadowBlur  = 24
        ctx.shadowColor = 'rgba(255,105,0,0.88)'
        ctx.stroke()
        ctx.shadowBlur  = 0
        // highlight
        const hx = b.x - pr * 0.3, hy = b.y - pr * 0.3
        const gh = ctx.createRadialGradient(hx, hy, 0, hx, hy, pr * 0.42)
        gh.addColorStop(0, 'rgba(255,225,110,0.5)')
        gh.addColorStop(1, 'rgba(255,200,60,0)')
        ctx.beginPath(); ctx.arc(hx, hy, pr * 0.42, 0, Math.PI * 2)
        ctx.fillStyle = gh; ctx.fill()
      })

      bubbles.forEach(update)
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])
}

export default function Hero() {
  const canvasRef = useRef(null)
  const heroRef   = useRef(null)
  const typedRef  = useRef(null)
  const isMobile = useRef(null)

  useLava(canvasRef, heroRef)
  useTyping(typedRef)

  return (
    <section id="hero" ref={heroRef} style={{
      minHeight: '100vh', background: '#000',
      display: 'flex', alignItems: 'center',
      padding: isMobile ? '100px 24px 60px' : '120px 60px 80px',
      position: 'relative', overflow: 'hidden'
    }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:1, maxWidth: isMobile ? '100%': 680 }}>
        <motion.span
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.15, duration:.7 }}
          style={{ color:'#FF6B00', fontSize:11, letterSpacing:'3.5px', textTransform:'uppercase', display:'block', marginBottom:18 }}
        >
          Hola, soy
        </motion.span>

        <motion.h1
          initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ delay:.3, duration:.8 }}
          style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize: isMobile ? 'clamp(28px, 8vw, 48px)' : 'clamp(50px, 7vw, 88px)', lineHeight:1.02, marginBottom:20 }}
        >
          Carlos<br />
          <span style={{ color:'#FF6B00', textShadow:'0 0 50px rgba(255,107,0,0.45)' }}>Palomeque</span>
        </motion.h1>

        <motion.p
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.45, duration:.7 }}
          style={{ color:'rgba(255,255,255,0.52)', fontSize:18.5, marginBottom:46, lineHeight:1.7, minHeight:30 }}
        >
          Ing. en Software · <span style={{ color:'#d8eaff' }} ref={typedRef}></span>
          <span style={{
            display:'inline-block', width:2, height:'1.1em',
            background:'#FF6B00', marginLeft:2, verticalAlign:'middle',
            boxShadow:'0 0 8px #FF6B00',
            animation:'blink 1s step-end infinite'
          }} />
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.7 }}
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 15,
            lineHeight: 1.75,
            marginBottom: 36,
            maxWidth: 800
          }}
          >
            Construyo plataformas Shopify y WordPress enfocadas en rendimiento, experiencia de usuario y crecimiento del negocio. 
            Actualmente ampliando mi stack hacia el desarrollo frontend con React.
          </motion.p>

        <motion.div
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.6, duration:.7 }}
          style={{ display:'flex', gap:13, flexWrap:'wrap' }}
        >
          <a href="#projects" style={{
            padding:'14px 32px', borderRadius:8, fontSize:15, fontWeight:500,
            background:'#FF6B00', color:'#fff', textDecoration:'none',
            transition:'all .3s', boxShadow:'0 0 0 rgba(255,107,0,0)'
          }}
          onMouseEnter={e => e.target.style.boxShadow='0 10px 32px rgba(255,107,0,0.55)'}
          onMouseLeave={e => e.target.style.boxShadow='0 0 0 rgba(255,107,0,0)'}
          >
            Ver proyectos
          </a>
          <a href="#contact" style={{
            padding:'14px 32px', borderRadius:8, fontSize:15, fontWeight:500,
            background:'transparent', color:'#fff', textDecoration:'none',
            border:'1px solid rgba(255,255,255,0.22)', transition:'all .3s'
          }}
          onMouseEnter={e => { e.target.style.borderColor='#FF6B00'; e.target.style.color='#FF6B00' }}
          onMouseLeave={e => { e.target.style.borderColor='rgba(255,255,255,0.22)'; e.target.style.color='#fff' }}
          >
            Contáctame
          </a>
        </motion.div>
      </div>
      {/* scroll hint */}      
      {!isMobile && (
        <div style={{ position:'absolute', bottom:34, left:'50%', transform:'translateX(-50%)', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:8, opacity:.5 }}>
          <span style={{ fontSize:10, letterSpacing:'3px', textTransform:'uppercase' }}>scroll</span>
          <div style={{
            width:22, height:22,
            borderRight:'1.5px solid #FF6B00', borderBottom:'1.5px solid #FF6B00',
            transform:'rotate(45deg)', boxShadow:'2px 2px 6px rgba(255,107,0,0.4)',
            animation:'bounce 1.6s ease-in-out infinite'
          }} />
        </div>
      )}
      <style>{`
        @keyframes blink { 50% { opacity: 0 } }
        @keyframes bounce {
          0%,100% { transform: rotate(45deg) translateY(0); opacity:.8 }
          50%      { transform: rotate(45deg) translateY(7px); opacity:.3 }
        }
      `}</style>
    </section>
  )
}