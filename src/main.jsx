import React, { Suspense, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Code2, Smartphone, Database, Server, Sun, Moon } from 'lucide-react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'RMTS / BRTS', type: 'FLUTTER • MOBILE APPLICATION', text: 'A Flutter application for public-transport riders, focused on practical everyday navigation. You can watch that application from play store.', icon: Smartphone },
  { title: 'Nidhivan Ratri 2026', type: 'MERN STACK • LIVE WEBSITE', text: 'A polished event website designed to make the Nidhivan Ratri 2026 experience easy to explore.', icon: Code2, url: 'https://nidhivan-ratri-2026.vercel.app/' },
];

function Orb({ position, color, scale = 1 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.28;
    ref.current.position.y += Math.sin(state.clock.elapsedTime * 1.1 + position[0]) * 0.0009;
  });
  return <mesh ref={ref} position={position} scale={scale}>
    <icosahedronGeometry args={[1.1, 4]} />
    <MeshDistortMaterial color={color} roughness={0.2} metalness={0.75} distort={0.22} speed={1.4} />
  </mesh>;
}

function Scene({ theme }) {
  return <Canvas className="scene" camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true }}>
    <color attach="background" args={[theme === 'dark' ? '#151d18' : '#f5f8f4']} />
    <ambientLight intensity={1.8} />
    <directionalLight position={[4, 5, 5]} intensity={3.5} color="#ffffff" />
    <pointLight position={[-4, -2, 2]} intensity={8} color="#69b99b" />
    <Suspense fallback={null}>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.8}>
        <Orb position={[0.9, 0.15, 0]} color="#a6d6bf" scale={1.3} />
      </Float>
      <Float speed={2.1} rotationIntensity={0.8} floatIntensity={1}>
        <Orb position={[-2.8, 1.45, -1.4]} color="#8dbacb" scale={0.48} />
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <Orb position={[2.9, -1.45, -1.1]} color="#e4c58e" scale={0.58} />
      </Float>
      <Sparkles count={60} scale={11} size={1.2} speed={0.25} color={theme === 'dark' ? '#a2dbbb' : '#79a58f'} />
      <Environment preset="city" />
    </Suspense>
  </Canvas>;
}

function App() {
  const root = useRef(null);
  const hero = useRef(null);
  const orb = useRef(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111713' : '#f7f9f6');
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Theme changes still work when storage is unavailable.
    }
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
      gsap.utils.toArray('.project-card').forEach((el, i) => gsap.from(el, { y: 90, rotateX: 8, opacity: 0, duration: 0.9, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }));
    }, root);
    return () => { ctx.revert(); cancelAnimationFrame(raf); lenis.destroy(); gsap.ticker.remove((time) => lenis.raf(time * 1000)); };
  }, []);

  return <div ref={root}>
    <nav className="nav"><a className="brand" href="#top">SP<span>.</span></a><div className="nav-links"><a href="#about">About</a><a href="#work">Work</a><a href="#contact">Contact</a></div><div className="nav-actions"><button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button><a className="nav-cta" href="https://www.linkedin.com/in/sachinpatadiya" target="_blank" rel="noreferrer">Let's talk <ArrowUpRight size={16} /></a></div></nav>
    <main>
      <section ref={hero} id="top" className="hero">
        <div className="scene-wrap"><Scene theme={theme} /></div>
        <div className="hero-copy">
          <p className="eyebrow">FLUTTER • MERN • CREATIVE DEVELOPMENT</p>
          <h1>Building digital<br /><em>experiences</em> that move.</h1>
          <p className="hero-sub">I'm Sachin — a developer who turns ideas into polished mobile and web products.</p>
          <a className="primary-btn" href="#work">Explore my work <ArrowDown size={18} /></a>
        </div>
        <div className="scroll-cue">SCROLL TO EXPLORE <ArrowDown size={15} /></div>
      </section>

      <section id="about" className="section about">
        <div className="section-label reveal">01 / ABOUT</div>
        <div className="about-grid">
          <h2 className="reveal">Code is the tool.<br /><span>Experience is the goal.</span></h2>
          <div className="about-text reveal"><p>I work across Flutter and the MERN stack, combining clean engineering with thoughtful interfaces, animation and real-world product thinking.</p><p>I enjoy taking a complex idea, breaking it into a structured plan, and turning it into something people can actually use.</p></div>
        </div>
        <div className="skill-heading reveal"><p className="eyebrow">TECHNOLOGY</p><h3>My toolkit</h3></div><div className="skill-row reveal"><article className="skill-item"><div className="skill-meta"><Code2 /><span>01</span></div><h4>Frontend & mobile</h4><ul><li>React</li><li>Flutter</li><li>Dart</li></ul></article><article className="skill-item"><div className="skill-meta"><Server /><span>02</span></div><h4>Backend</h4><ul><li>Node.js</li><li>REST APIs</li><li>Java</li></ul></article><article className="skill-item"><div className="skill-meta"><Database /><span>03</span></div><h4>Data & services</h4><ul><li>SQL</li><li>MongoDB</li><li>Firebase</li></ul></article></div>
      </section>

      <section id="work" className="section work"><div className="section-label reveal">02 / SELECTED WORK</div><div className="work-head"><h2 className="reveal">Things I've<br /><span>built.</span></h2><p className="reveal">A website and a mobile application shaped around real-world needs.</p></div><div className="projects">{projects.map((p) => { const Icon = p.icon; return <article className="project-card" key={p.title}><div className="project-icon"><Icon /></div><div><p className="project-type">{p.type}</p><h3>{p.title}</h3><p>{p.text}</p></div>{p.url ? <a className="project-link" href={p.url} target="_blank" rel="noreferrer">Visit website <ArrowUpRight className="project-arrow" /></a> : <span className="project-link project-link-static">Mobile application</span>}</article>; })}</div></section>

      <section className="section philosophy"><div className="big-statement reveal">Good products feel<br /><span>simple.</span> Great ones<br />feel <span>alive.</span></div></section>

      <section id="contact" className="section contact"><div className="section-label reveal">03 / CONTACT</div><div className="contact-inner"><p className="eyebrow reveal">HAVE A PROJECT IN MIND?</p><h2 className="reveal">Let's make<br /><em>something memorable.</em></h2><a className="primary-btn reveal" href="https://www.linkedin.com/in/sachinpatadiya" target="_blank" rel="noreferrer">Start a conversation <Linkedin size={18} /></a><div className="socials reveal"><a href="https://github.com/patadiyasachin" target="_blank" rel="noreferrer"><Github size={19} /> GitHub</a><a href="https://www.linkedin.com/in/sachinpatadiya" target="_blank" rel="noreferrer"><Linkedin size={19} /> LinkedIn</a></div></div></section>
    </main>
    <footer><span>© {new Date().getFullYear()} Sachin Patadiya</span><span>Built with React + Three.js</span></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
