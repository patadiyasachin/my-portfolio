import React, { useEffect } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
    useEffect(() => {
        if (!project) return undefined;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [project, onClose]);

    if (!project) return null;

    return (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby={`project-${project.id}-title`}>
                <button className="modal-close" type="button" onClick={onClose} aria-label="Close project details"><X size={20} /></button>
                <div className="modal-hero">
                    <div>
                        <p className="eyebrow">CASE STUDY / {project.category.toUpperCase()}</p>
                        <h2 id={`project-${project.id}-title`}>{project.title}</h2>
                        <p>{project.description}</p>
                    </div>
                    <div className={`modal-art project-visual--${project.visual}`} aria-hidden="true"><span className="project-device"><span className="project-device__top" /><span className="project-device__content"><span className="project-device__line project-device__line--short" /><span className="project-device__line" /><span className="project-device__line project-device__line--medium" /><span className="project-device__block" /></span></span></div>
                </div>
                <div className="case-study-grid">
                    <article><p className="case-label">Overview</p><p>{project.description}</p></article>
                    <article><p className="case-label">Solution</p><p>Built around clear product workflows, responsive interfaces, and reliable integration between the client and service layers.</p></article>
                    <article><p className="case-label">My role</p><p>Designed and developed the application experience, connected the required APIs and data flows, and focused on usability, maintainability, and testing.</p></article>
                    <article><p className="case-label">Key features</p><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></article>
                    <article><p className="case-label">Technology stack</p><div className="case-tags">{project.tech.map((technology) => <span key={technology}>{technology}</span>)}</div></article>
                    <article><p className="case-label">Challenges & approach</p><p>Balanced product complexity with focused UI, kept integration boundaries clear, and validated workflows through practical development and testing.</p></article>
                </div>
                <div className="modal-actions">
                    {project.github && <a className="primary-btn" href={project.github} target="_blank" rel="noreferrer"><Github size={17} /> View GitHub</a>}
                    <button className="secondary-btn" type="button" onClick={onClose}>Back to projects <ArrowUpRight size={17} /></button>
                </div>
            </section>
        </div>
    );
}
