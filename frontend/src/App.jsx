import React, { useEffect, useRef } from 'react'
import './App.css'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const skills = [
  {
    category: 'Programming',
    icon: '💻',
    items: ['C', 'C++', 'Python'],
  },
  {
    category: 'Web Dev',
    icon: '🌐',
    items: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    category: 'AI / ML',
    icon: '🤖',
    items: ['TensorFlow', 'Keras', 'Pandas', 'NumPy', 'Scikit-learn'],
  },
  {
    category: 'Tools',
    icon: '🛠',
    items: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Tableau'],
  },
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
  },
  {
    num: '02 — Algorithms (C++)',
    title: "Dijkstra's Shortest Path",
    desc: "Implementation of Dijkstra's algorithm in C++ using a min-heap priority queue. Supports weighted directed graphs with interactive CLI input.",
    tags: ['C++', 'DSA', 'Graphs', 'STL'],
    github: 'https://github.com/alok-kharwar',
    emoji: '📊',
    reverse: true,
  },
  {
    num: '03 — Data Visualization',
    title: 'Tableau Analytics Dashboard',
    desc: 'Interactive Tableau dashboard for sales trend analysis, regional breakdowns, and KPI tracking — built from a cleaned CSV dataset.',
    tags: ['Tableau', 'Data Analysis', 'Excel'],
    github: 'https://github.com/alok-kharwar',
    emoji: '📈',
    reverse: false,
  },
  {
    num: '04 — OS Concepts (C)',
    title: 'CPU Scheduling Simulator',
    desc: 'Simulates FCFS, SJF, Round Robin, and Priority scheduling algorithms in C. Calculates average waiting time and turnaround time for each algorithm.',
    tags: ['C', 'Operating Systems', 'Algorithms'],
    github: 'https://github.com/alok-kharwar',
    emoji: '⚙️',
    reverse: true,
  },
  {
    num: '05 — AI Chatbot',
    title: 'AI Chatbot for Household Tasks',
    desc: 'An NLP-powered chatbot that understands natural language commands for daily household task management — reminders, schedules, and checklists.',
    tags: ['Python', 'NLP', 'React', 'Flask'],
    github: 'https://github.com/alok-kharwar',
    emoji: '🏠',
    reverse: false,
  },
]

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const App = () => {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    revealRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addReveal = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  return (
    <div id="d1">

      {/* ══ NAV ══ */}
      <nav>
        <div className="logo">Alok Kharwar</div>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main>

        {/* ══ HERO ══ */}
        <section className="hero" id="home">
          <div className="hero-left">
            <div className="hero-eyebrow"><span></span> B.Tech CSE (AI) Student</div>
            <h1 className="one">Hi, I'm <em>Alok</em></h1>
            <div className="two">
              I am a <span className="bold">&lt;Developer/&gt;</span> passionate about
              AI, Machine Learning, and building things that actually work.
            </div>
            <div className="button-container">
              <a href="#contact" className="btn btn-primary">Contact Me</a>
              <a href="#projects" className="btn btn-ghost">View Projects</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-img-wrap">
              <div className="img-placeholder">👨‍💻</div>
            </div>
            <div className="hero-badge">
              <span className="badge-num">5+</span>
              <span className="badge-label">Projects Done</span>
            </div>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section className="about-section" id="about">
          <div className="about-card reveal" ref={addReveal}>
            <div className="section-label"><span></span> 🧑‍💻 Who I Am <span></span></div>
            <h2>About Me</h2>
            <div className="about-grid">
              <div className="about-info">
                <div className="info-row">
                  <span className="info-label">Name</span>
                  <span className="info-value">Alok Kharwar</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Age</span>
                  <span className="info-value">18</span>
                </div>
                <div className="info-row">
                  <span className="info-label">City</span>
                  <span className="info-value">Gorakhpur, UP</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Course</span>
                  <span className="info-value">B.Tech CSE (AI)</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Interests</span>
                  <span className="info-value">AI · ML · Web Dev · DSA</span>
                </div>
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
                  {['Artificial Intelligence', 'Machine Learning', 'Web Development', 'Data Structures', 'Open Source'].map((item) => (
                    <span className="chip" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <section className="skills-section" id="skills">
          <div className="section-header reveal" ref={addReveal}>
            <div className="section-label"><span></span> 🛠 What I Know <span></span></div>
            <h2>Skills</h2>
          </div>
          <div className="skills-grid">
            {skills.map((s, idx) => (
              <div className="skill-card reveal" key={idx} ref={addReveal}>
                <div className="skill-card-header">
                  <span className="skill-icon">{s.icon}</span>
                  <span className="skill-category">{s.category}</span>
                </div>
                <div className="skill-items">
                  {s.items.map((item) => (
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
            <div className="section-label"><span></span> 📂 My Work <span></span></div>
            <h2>Featured Projects</h2>
          </div>

          {projects.map((p, idx) => (
            <div
              key={idx}
              className={`project-card reveal${p.reverse ? ' reverse' : ''}`}
              ref={addReveal}
            >
              <div className="project-image project-emoji-panel">
                <div className="project-emoji">{p.emoji}</div>
              </div>
              <div className="project-info">
                <div className="project-number">{p.num}</div>
                <div className="text">{p.title}</div>
                <p>{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ══ RESUME ══ */}
        <section className="resume-section" id="resume">
          <div className="resume-card reveal" ref={addReveal}>
            <div className="section-label"><span></span> 📄 Resume <span></span></div>
            <h2>My Resume</h2>
            <p className="resume-desc">
              Want to know more about my experience and education? Download my resume below.
            </p>
            {/* Replace href with your actual PDF path e.g. /resume.pdf or ./Alok_Resume.pdf */}
            <a
              href="https://drive.google.com/file/d/1vx3OBpF_sJoLdTbQcySjioXLt9sU0EyW/view?usp=sharing"
              download="Alok_Kharwar_Resume.pdf"
              className="btn btn-primary resume-btn"
            >
              ⬇ Download Resume (PDF)
            </a>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section className="contact-section" id="contact">
          <div className="section-header reveal" ref={addReveal}>
            <div className="section-label"><span></span> 📞 Get In Touch <span></span></div>
            <h2>Contact Me</h2>
          </div>
          <div className="contact-grid">
            {/* Replace with your actual email */}
            <a href="mailto:alok.860111@gmail.com" className="contact-card reveal" ref={addReveal}>
              <span className="contact-icon">✉️</span>
              <span className="contact-label">Email</span>
              <span className="contact-value">alok.860111@gmail.com</span>
            </a>

            {/* Replace with your actual LinkedIn URL */}
            <a
              href="https://www.linkedin.com/in/alok-kharwar-282b08328"
              target="_blank"
              rel="noreferrer"
              className="contact-card reveal"
              ref={addReveal}
            >
              <span className="contact-icon">💼</span>
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">linkedin.com/in/alok-kharwar-282b08328</span>
            </a>

            {/* Replace with your actual GitHub URL */}
            <a
              href="https://github.com/alokxkh"
              target="_blank"
              rel="noreferrer"
              className="contact-card reveal"
              ref={addReveal}
            >
              <span className="contact-icon">🐙</span>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">github.com/alokxkh</span>
            </a>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="footer">
          <p>© {new Date().getFullYear()} Alok Kharwar · Built with React</p>
        </footer>

      </main>
    </div>
  )
}

export default App