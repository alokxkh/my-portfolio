import React, { useEffect, useRef, useState } from 'react'
import './App.css'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const skills = [
  { category: 'Programming', icon: '💻', items: ['C', 'C++', 'Python'] },
  { category: 'Web Dev', icon: '🌐', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { category: 'AI / ML', icon: '🤖', items: ['TensorFlow', 'Keras', 'Pandas', 'NumPy', 'Scikit-learn'] },
  { category: 'Tools', icon: '🛠', items: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Tableau'] },
]

const projects = [
  {
    num: '01 — Deep Learning',
    title: 'CNN Cat vs Dog Classifier',
    desc: 'A Convolutional Neural Network trained on the Kaggle Dogs vs Cats dataset. Achieves ~95% accuracy using data augmentation and dropout regularization.',
    tags: ['Python', 'TensorFlow', 'Keras', 'CNN'],
    github: 'https://github.com/alokk2005/cnn-cat-vs-dog-classification.git',
    emoji: '🐱🐶',
    reverse: false,
    color: '#9b4dff',
  },
  {
    num: '02 — Algorithms (C++)',
    title: "Dijkstra's Shortest Path",
    desc: "Implementation of Dijkstra's algorithm in C++ using a min-heap priority queue. Supports weighted directed graphs with interactive CLI input.",
    tags: ['C++', 'DSA', 'Graphs', 'STL'],
    github: 'https://github.com/alok-kharwar',
    emoji: '📊',
    reverse: true,
    color: '#ff4dac',
  },
  {
    num: '03 — Data Visualization',
    title: 'Tableau Analytics Dashboard',
    desc: 'Interactive Tableau dashboard for sales trend analysis, regional breakdowns, and KPI tracking — built from a cleaned CSV dataset.',
    tags: ['Tableau', 'Data Analysis', 'Excel'],
    github: 'https://github.com/alok-kharwar',
    emoji: '📈',
    reverse: false,
    color: '#4d9fff',
  },
  {
    num: '04 — OS Concepts (C)',
    title: 'CPU Scheduling Simulator',
    desc: 'Simulates FCFS, SJF, Round Robin, and Priority scheduling algorithms in C. Calculates average waiting time and turnaround time for each algorithm.',
    tags: ['C', 'Operating Systems', 'Algorithms'],
    github: 'https://github.com/alok-kharwar',
    emoji: '⚙️',
    reverse: true,
    color: '#ff9b4d',
  },
  {
    num: '05 — AI Chatbot',
    title: 'AI Chatbot for Household Tasks',
    desc: 'An NLP-powered chatbot that understands natural language commands for daily household task management — reminders, schedules, and checklists.',
    tags: ['Python', 'NLP', 'React', 'Flask'],
    github: 'https://github.com/alok-kharwar',
    emoji: '🏠',
    reverse: false,
    color: '#4dffb8',
  },
]

/* ─────────────────────────────────────────
   TYPEWRITER HOOK
───────────────────────────────────────── */
function useTypewriter(texts, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[idx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setIdx(i => (i + 1) % texts.length)
    }

    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, idx, texts, speed, pause])

  return display
}

/* ─────────────────────────────────────────
   AURORA BACKGROUND
───────────────────────────────────────── */
function Aurora() {
  return (
    <div className="aurora-wrap" aria-hidden="true">
      <div className="aurora a1" />
      <div className="aurora a2" />
      <div className="aurora a3" />
      <div className="aurora a4" />
    </div>
  )
}

/* ─────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────── */
function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight * 3

    const COUNT = 80
    const dots = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random(),
    }))

    let raf
    function draw() {
      ctx.clearRect(0, 0, W, H)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(155,77,255,${d.a * 0.6})`
        ctx.fill()
      })
      // draw lines between close dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(155,77,255,${(1 - dist / 120) * 0.12})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight * 3
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />
}

/* ─────────────────────────────────────────
   CURSOR GLOW
───────────────────────────────────────── */
function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let px = window.innerWidth / 2, py = window.innerHeight / 2
    let cx = px, cy = py
    let raf

    const onMove = e => { px = e.clientX; py = e.clientY }
    window.addEventListener('mousemove', onMove)

    function animate() {
      cx += (px - cx) * 0.08
      cy += (py - cy) * 0.08
      el.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

/* ─────────────────────────────────────────
   NAV
───────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={scrolled ? 'nav-scrolled' : ''}>
      <div className="logo">
        <span className="logo-bracket">&lt;</span>Alok<span className="logo-bracket">/&gt;</span>
      </div>
      <ul>
        {['home', 'about', 'skills', 'projects', 'contact'].map(s => (
          <li key={s}><a href={`#${s}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</a></li>
        ))}
      </ul>
    </nav>
  )
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const App = () => {
  const revealRefs = useRef([])
  const typed = useTypewriter(['Developer', 'AI Engineer', 'ML Enthusiast', 'Problem Solver'])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    revealRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addReveal = el => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  return (
    <div id="d1">

      {/* ══ GLOBAL BG EFFECTS ══ */}
      <Aurora />
      <Particles />
      <CursorGlow />

      {/* ══ NAV ══ */}
      <Nav />

      <main>

        {/* ══ HERO ══ */}
        <section className="hero" id="home">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              B.Tech CSE (AI) Student
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="glitch-name" data-text="Alok">Alok</span>
            </h1>

            <div className="hero-typewriter">
              I am a&nbsp;
              <span className="typed-text">{typed}</span>
              <span className="caret">|</span>
            </div>

            <p className="hero-sub">
              Passionate about AI, Machine Learning, and building things that
              actually&nbsp;<em>work</em>.
            </p>

            <div className="button-container">
              <a href="#contact" className="btn btn-primary">
                <span>Contact Me</span>
                <div className="btn-shine" />
              </a>
              <a href="#projects" className="btn btn-ghost">View Projects ↓</a>
            </div>

            <div className="hero-stats">
              {[['5+', 'Projects'], ['3+', 'AI Models'], ['10+', 'Skills']].map(([n, l]) => (
                <div className="stat-item" key={l}>
                  <span className="stat-num">{n}</span>
                  <span className="stat-label">{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-orb-ring">
              <div className="orb-ring r1" />
              <div className="orb-ring r2" />
              <div className="orb-ring r3" />
              <div className="hero-img-wrap">
                <div className="img-placeholder">👨‍💻</div>
              </div>
            </div>
            <div className="hero-badge">
              <span className="badge-num">5+</span>
              <span className="badge-label">Projects Done</span>
            </div>
            <div className="hero-badge2">
              <span className="badge-icon">🤖</span>
              <span className="badge-label2">AI · ML</span>
            </div>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section className="about-section" id="about">
          <div className="about-card reveal" ref={addReveal}>
            <div className="card-glow-border" />
            <div className="section-label"><span /> 🧑‍💻 Who I Am <span /></div>
            <h2>About Me</h2>
            <div className="about-grid">
              <div className="about-info">
                {[
                  ['Name', 'Alok Kharwar'],
                  ['Age', '18'],
                  ['City', 'Gorakhpur, UP'],
                  ['Course', 'B.Tech CSE (AI)'],
                  ['Interests', 'AI · ML · Web Dev · DSA'],
                ].map(([label, value]) => (
                  <div className="info-row" key={label}>
                    <span className="info-label">{label}</span>
                    <span className="info-value">{value}</span>
                  </div>
                ))}
              </div>
              <div className="about-right">
                <p className="about-bio">
                  Hey! I'm <strong>Alok</strong>, a Computer Science undergrad specialising in
                  Artificial Intelligence. I love bridging the gap between theory and real-world
                  applications — whether it's training neural networks, visualising data, or
                  building full-stack web apps.
                </p>
                <p className="about-bio" style={{ marginTop: '1rem' }}>
                  I'm deeply interested in <strong>AI & Machine Learning</strong>, competitive
                  programming, and creating tools that solve everyday problems. Currently
                  looking for internship and freelance opportunities.
                </p>
                <div className="interest-chips">
                  {['Artificial Intelligence', 'Machine Learning', 'Web Development', 'Data Structures', 'Open Source'].map(item => (
                    <span className="chip" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ EDUCATION & CERTIFICATIONS ══ */}
        <section className="edu-section" id="education">
          <div className="section-header reveal" ref={addReveal}>
            <div className="section-label"><span /> 🎓 Background <span /></div>
            <h2>Education &amp; Certifications</h2>
          </div>

          <div className="edu-cert-grid">

            {/* ── Education card ── */}
            <div className="edu-card reveal" ref={addReveal}>
              <div className="card-glow-border" />
              <div className="edu-card-title">
                <span className="edu-card-icon">🎓</span>
                Education
              </div>
              <div className="edu-timeline">

                {[
                  {
                    degree: 'B.Tech in Computer Science Engineering (AI)',
                    sub: 'KIET Deemed-to-be University',
                    meta: '2024 – 2028  •  Ghaziabad , Delhi NCR',
                    active: true,
                  },
                  {
                    degree: 'Intermediate (Class XII)',
                    sub: "PM SHRI Kendriya Vidyalaya GANGRANI",
                    meta: '2024  •  CBSE Board  •  Science (PCM) ',
                    active: false,
                  },
                  {
                    degree: 'High School (Class X)',
                    sub: "KUSHINAGAR PUB SCH AMWA KUBERSTHAN",
                    meta: '2022  •  CBSE Board  •  Science ',
                    active: false,
                  },
                ].map((e, i) => (
                  <div className={`edu-item${e.active ? ' edu-active' : ''}`} key={i}>
                    <div className="edu-dot">
                      {e.active && <div className="edu-dot-pulse" />}
                    </div>
                    <div className="edu-content">
                      <div className="edu-degree">{e.degree}</div>
                      <div className="edu-school">{e.sub}</div>
                      <div className="edu-meta">{e.meta}</div>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* ── Certifications card ── */}
            <div className="cert-card reveal" ref={addReveal}>
              <div className="card-glow-border" />
              <div className="edu-card-title">
                <span className="edu-card-icon">🏅</span>
                Certifications
              </div>
              <div className="cert-list">

                {[
                  {
                    badge: 'AWS',
                    color: '#FF9900',
                    bg: 'linear-gradient(135deg,#1a0f00,#3d2200)',
                    name: 'AWS Certified Cloud Practitioner',
                    issuer: 'Amazon Web Services',
                    year: '2025',
                  },
                  {
                    badge: 'AI',
                    color: '#FF6F00',
                    bg: 'linear-gradient(135deg,#1a1000,#3d2800)',
                    name: 'AI for Everyone',
                    issuer: 'DeepLearning.AI (Coursera)',
                    year: '2024',
                  },
                  {
                    badge: 'AI',
                    color: '#4d9fff',
                    bg: 'linear-gradient(135deg,#00101a,#001f3d)',
                    name: 'AMD AI Academy Certification',
                    issuer: 'Hackingly',
                    year: '2026',
                  },
                ].map((c, i) => (
                  <div className="cert-item" key={i}>
                    <div className="cert-badge" style={{ background: c.bg, color: c.color, borderColor: c.color + '44' }}>
                      {c.badge}
                    </div>
                    <div className="cert-info">
                      <div className="cert-name">{c.name}</div>
                      <div className="cert-issuer">{c.issuer} <span className="cert-year">• {c.year}</span></div>
                    </div>
                    <div className="cert-arrow">→</div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <section className="skills-section" id="skills">
          <div className="section-header reveal" ref={addReveal}>
            <div className="section-label"><span /> 🛠 What I Know <span /></div>
            <h2>Skills</h2>
          </div>
          <div className="skills-grid">
            {skills.map((s, idx) => (
              <div className="skill-card reveal" key={idx} ref={addReveal}>
                <div className="skill-card-bg" />
                <div className="skill-card-header">
                  <span className="skill-icon">{s.icon}</span>
                  <span className="skill-category">{s.category}</span>
                </div>
                <div className="skill-items">
                  {s.items.map(item => (
                    <span className="skill-pill" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ PROJECTS ══ */}
        <section className="projects-section" id="projects">
          <div className="section-header reveal" ref={addReveal}>
            <div className="section-label"><span /> 📂 My Work <span /></div>
            <h2>Featured Projects</h2>
          </div>

          {projects.map((p, idx) => (
            <div
              key={idx}
              className={`project-card reveal${p.reverse ? ' reverse' : ''}`}
              ref={addReveal}
              style={{ '--proj-color': p.color }}
            >
              <div className="project-image project-emoji-panel">
                <div className="proj-panel-bg" />
                <div className="project-emoji">{p.emoji}</div>
              </div>
              <div className="project-info">
                <div className="project-number">{p.num}</div>
                <div className="text">{p.title}</div>
                <p>{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
                <div className="project-actions">
                  <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <span>GitHub →</span>
                    <div className="btn-shine" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ══ RESUME ══ */}
        <section className="resume-section" id="resume">
          <div className="resume-card reveal" ref={addReveal}>
            <div className="card-glow-border" />
            <div className="section-label"><span /> 📄 Resume <span /></div>
            <h2>My Resume</h2>
            <p className="resume-desc">Want to know more about my experience and education? Download my resume below.</p>
            <a
              href="https://drive.google.com/file/d/1JxfXSXAWTjdSSLyRDtML9-sIsSiiwRbP/view?usp=sharing"
              download="Alok_Kharwar_Resume.pdf"
              className="btn btn-primary resume-btn"
            >
              <span>⬇ Download Resume (PDF)</span>
              <div className="btn-shine" />
            </a>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section className="contact-section" id="contact">
          <div className="section-header reveal" ref={addReveal}>
            <div className="section-label"><span /> 📞 Get In Touch <span /></div>
            <h2>Contact Me</h2>
          </div>
          <div className="contact-grid">
            {[
              { href: 'mailto:alok.860111@gmail.com', icon: '✉️', label: 'Email', value: 'alok.860111@gmail.com' },
              { href: 'https://www.linkedin.com/in/alok-kharwar-282b08328', icon: '💼', label: 'LinkedIn', value: 'alok-kharwar-282b08328', blank: true },
              { href: 'https://github.com/alokxkh', icon: '🐙', label: 'GitHub', value: 'github.com/alokxkh', blank: true },
            ].map(c => (
              <a
                key={c.label}
                href={c.href}
                target={c.blank ? '_blank' : undefined}
                rel={c.blank ? 'noreferrer' : undefined}
                className="contact-card reveal"
                ref={addReveal}
              >
                <div className="contact-card-glow" />
                <span className="contact-icon">{c.icon}</span>
                <span className="contact-label">{c.label}</span>
                <span className="contact-value">{c.value}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="footer">
          <div className="footer-line" />
          <p>© {new Date().getFullYear()} <span className="footer-name">Alok Kharwar</span></p>
        </footer>

      </main>
    </div>
  )
}

export default App