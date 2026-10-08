import React, { Suspense, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Menu, Moon, Server, Sun, X } from 'lucide-react';
import { aboutHighlights, currentExperience, education, experience, journey, profile, projects, technologyGroups } from './data';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  ['Home', 'top'],
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Experience', 'experience'],
  ['Projects', 'projects'],
  ['Journey', 'journey'],
  ['Contact', 'contact'],
];

function Orb({ position, color, scale = 1 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.28;
    ref.current.position.y += Math.sin(state.clock.elapsedTime * 1.1 + position[0]) * 0.0009;
  });
  return <mesh ref={ref} position={position} scale={scale}><icosahedronGeometry args={[1.1, 4]} /><MeshDistortMaterial color={color} roughness={0.2} metalness={0.75} distort={0.22} speed={1.4} /></mesh>;
}

function OrbitRings({ theme }) {
  const ref = useRef();
  useFrame((_, delta) => { ref.current.rotation.y += delta * 0.12; ref.current.rotation.z += delta * 0.08; });
  const ringColor = theme === 'dark' ? '#a1dcb9' : '#287b5d';
  return <group ref={ref} position={[2.1, 0.1, 0]}>
    <mesh rotation={[0.95, 0.25, 0.2]}><torusGeometry args={[1.7, 0.012, 12, 120]} /><meshStandardMaterial color={ringColor} metalness={0.65} roughness={0.3} transparent opacity={0.72} /></mesh>
    <mesh rotation={[0.3, 1.15, 0.8]}><torusGeometry args={[2.05, 0.009, 12, 120]} /><meshStandardMaterial color="#8dbacb" metalness={0.6} roughness={0.35} transparent opacity={0.56} /></mesh>
  </group>;
}

function SceneContent({ theme }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  return <group scale={isMobile ? 0.78 : 1} position={[isMobile ? -0.15 : 0, 0, 0]}>
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.8}><Orb position={[2.1, 0.1, 0]} color={theme === 'dark' ? '#80bd9b' : '#a6d6bf'} scale={1.25} /></Float>
    <OrbitRings theme={theme} />
    <Float speed={2.1} rotationIntensity={0.8} floatIntensity={1}><Orb position={[3.7, 1.55, -1.4]} color="#8dbacb" scale={0.38} /></Float>
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.9}><Orb position={[0.6, -2.4, -1.1]} color="#e4c58e" scale={0.46} /></Float>
    <Sparkles count={60} scale={11} size={1.2} speed={0.25} color={theme === 'dark' ? '#a2dbbb' : '#79a58f'} />
  </group>;
}

function CameraRig() {
  const { camera, viewport } = useThree();

  useEffect(() => {
    const isMobile = viewport.width < 6;
    camera.position.set(0, 0, isMobile ? 6.5 : 7);
    camera.lookAt(0, 0, 0);
  }, [camera, viewport.width]);

  return null;
}

function Scene({ theme, onReady }) {
  return <Canvas className="scene" camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} onCreated={() => onReady()}>
    <color attach="background" args={[theme === 'dark' ? '#151d18' : '#f5f8f4']} />
    <ambientLight intensity={1.8} /><directionalLight position={[4, 5, 5]} intensity={3.5} color="#ffffff" /><pointLight position={[-4, -2, 2]} intensity={8} color="#69b99b" />
    <CameraRig />
    <Suspense fallback={null}><SceneContent theme={theme} /></Suspense>
  </Canvas>;
}

function App() {
  const root = useRef(null);
  const hero = useRef(null);
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'; } catch { return 'light'; } });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [selectedProject, setSelectedProject] = useState(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111713' : '#f7f9f6');
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Storage can be unavailable. */ }
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      gsap.from('.nav', { y: -30, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.hero-copy > *', { y: 55, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.25 });
      gsap.to('.hero-copy', { yPercent: -18, opacity: 0.55, scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.scroll-cue', { opacity: 0, y: 20, scrollTrigger: { trigger: hero.current, start: 'top top', end: '25% top', scrub: true } });
      gsap.utils.toArray('.reveal').forEach((el) => gsap.from(el, { y: 70, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%', once: true } }));
      gsap.utils.toArray('.timeline-item').forEach((el) => gsap.from(el, { x: -40, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }));
    }, root);
    return () => { ctx.revert(); cancelAnimationFrame(raf); lenis.destroy(); gsap.ticker.remove((time) => lenis.raf(time * 1000)); };
  }, []);

  useEffect(() => {
    const sections = navItems.slice(1).map(([, id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light');
  const closeMenu = () => setMenuOpen(false);

  return <div ref={root}>
    <nav className="nav" aria-label="Main navigation">
      <a className="brand" href="#top" aria-label="Sachin Patadiya home"><span className="brand-monogram" aria-hidden="true"><span>S</span><span>P</span></span><span className="brand-name">Sachin<br />Patadiya</span></a>
      <div className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={closeMenu}>{label}</a>)}
      </div>
      <div className="nav-actions">
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
        <a className="nav-cta" href={profile.linkedin} target="_blank" rel="noreferrer">Let's talk <ArrowUpRight size={16} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </nav>
    <main>
      <section ref={hero} id="top" className="hero">
        <div className={`scene-wrap ${sceneReady ? 'scene-wrap--ready' : ''}`}>
          <Scene theme={theme} onReady={() => setSceneReady(true)} />
          {!sceneReady && <div className="scene-loader" role="status" aria-live="polite"><span /><p>Loading 3D experience</p></div>}
        </div>
        <div className="hero-copy">
          <p className="eyebrow">FLUTTER • MERN • CREATIVE DEVELOPMENT</p>
          <h1 className="hero-title"><span className="hero-intro">Hello, I'm</span><span className="hero-name">Sachin<br /><span className="hero-surname">Patadiya</span><span className="hero-name-dot">.</span></span></h1>
          <p className="hero-sub">I build thoughtful mobile and web experiences, blending clean engineering with a strong sense of design.</p>
          <a className="primary-btn" href="#projects">Explore my work <ArrowDown size={18} /></a>
        </div>
        <div className="scroll-cue">SCROLL TO EXPLORE <ArrowDown size={15} /></div>
      </section>

      <section id="about" className="section about">
        <div className="section-label reveal">01 / ABOUT</div>
        <div className="about-grid"><h2 className="reveal">Code is the tool.<br /><span>Experience is the goal.</span></h2><div className="about-text reveal"><p>I work across Flutter and the MERN stack, combining clean engineering with thoughtful interfaces, animation and real-world product thinking.</p><p>I enjoy transforming complex ideas into structured, useful products that are easy to understand and enjoyable to use.</p></div></div>
        <div className="about-highlights">{aboutHighlights.map((item) => <article className="about-highlight reveal" key={item.label}><strong>{item.value}</strong><span>{item.label}</span><small>{item.detail}</small></article>)}</div>
        <div className="about-note reveal"><Server size={22} /><div><span>Development focus</span><p>Mobile products, full-stack platforms, APIs, cloud services, and polished interfaces.</p></div></div>
      </section>

      <section id="skills" className="section skills">
        <div className="section-heading reveal"><div><p className="eyebrow">02 / CAPABILITIES</p><h2>Technologies I<br /><span>work with.</span></h2></div><p>Practical tools chosen to build reliable products from the first interface through production delivery.</p></div>
        <div className="technology-grid">{technologyGroups.map(({ title, icon: Icon, items }, index) => <article className="technology-card reveal" key={title}><div className="technology-card__head"><span className="technology-number">0{index + 1}</span><Icon size={21} /><h3>{title}</h3></div><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section id="experience" className="section experience">
        <div className="section-heading reveal"><div><p className="eyebrow">03 / EXPERIENCE</p><h2>Building with<br /><span>purpose.</span></h2></div><p>Hands-on experience across mobile development, full-stack development, API integration, state management, testing, and live project delivery.</p></div>
        <div className="timeline">
          <article className="timeline-item reveal"><div className="timeline-marker"><span /></div><div className="timeline-company"><span>{experience.period}</span><h3>{experience.company}</h3><p className="timeline-role">{experience.role}</p></div><div className="timeline-content"><p>{experience.summary}</p><ul>{experience.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul><div className="tech-tags">{experience.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>
          <article className="timeline-item reveal"><div className="timeline-marker"><span /></div><div className="timeline-company"><span>{currentExperience.period}</span><h3>{currentExperience.company}</h3><p className="timeline-role">{currentExperience.role}</p></div><div className="timeline-content"><p>{currentExperience.summary}</p><ul>{currentExperience.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul><div className="tech-tags">{currentExperience.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="section-heading reveal"><div><p className="eyebrow">04 / SELECTED WORK</p><h2>Featured<br /><span>projects.</span></h2></div><p>A selection of mobile, web, and full-stack applications built with a focus on practical outcomes and usable experiences.</p></div>
        <div className="projects">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onView={setSelectedProject} />)}</div>
      </section>

      <section className="section philosophy"><div className="big-statement reveal">Good products feel<br /><span>simple.</span> Great ones<br />feel <span>alive.</span></div></section>

      <section id="journey" className="section journey">
        <div className="section-heading reveal"><div><p className="eyebrow">05 / MY JOURNEY</p><h2>From curiosity<br /><span>to craft.</span></h2></div><p>A progressive path through software development, industry experience, and full-stack product building.</p></div>
        <div className="journey-track">{journey.map((step, index) => <article className="timeline-item journey-item reveal" key={step.title}><div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span></div><div className="journey-year">{step.year}</div><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
      </section>

      <section id="education" className="section education">
        <div className="section-heading reveal"><div><p className="eyebrow">06 / EDUCATION</p><h2>Learning that<br /><span>moves forward.</span></h2></div><p>Formal education and practical experience working alongside modern development tools.</p></div>
        <div className="education-layout"><article className="education-card reveal"><span className="education-icon">B</span><div><p className="education-label">DEGREE</p><h3>{education.degree}</h3><p>{education.university}</p><small>{education.location}</small></div><span className="education-status">CURRENT</span></article><div className="certification-note reveal"><span>Certificates</span><p>No certificates are currently listed. When verified certificate material is available, it can be added here.</p></div></div>
      </section>

      <section id="contact" className="section contact">
        <div className="contact-grid-bg" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="section-label reveal">07 / CONTACT</div>
        <div className="contact-inner"><p className="eyebrow reveal">HAVE A PROJECT IN MIND?</p><h2 className="reveal">Let's build<br /><em>something memorable.</em></h2><p className="contact-copy reveal">Have an idea, project, or opportunity? I'd love to hear about it.</p><a className="primary-btn reveal" href={profile.linkedin} target="_blank" rel="noreferrer">Start a conversation <Linkedin size={18} /></a></div>
        <div className="contact-details reveal"><div><span>Name</span><strong>{profile.name}</strong></div><div><span>Location</span><strong>{profile.location}</strong></div><div><span>Social</span><div className="contact-socials"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a></div></div></div>
      </section>
    </main>
    <footer><div><strong>Sachin Patadiya</strong><span>Flutter Developer • Full Stack Developer</span></div><p>© {new Date().getFullYear()} Sachin Patadiya</p><span className="footer-signature">Built with passion and code.</span></footer>
    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);