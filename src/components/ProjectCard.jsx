import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

const ProjectVisual = ({ project }) => (
    <div className={`project-visual project-visual--${project.visual}`} aria-hidden="true">
        <span className="project-orbit project-orbit--one" />
        <span className="project-orbit project-orbit--two" />
        <span className="project-device">
            <span className="project-device__top" />
            <span className="project-device__content">
                <span className="project-device__line project-device__line--short" />
                <span className="project-device__line" />
                <span className="project-device__line project-device__line--medium" />
                <span className="project-device__block" />
            </span>
        </span>
        <span className="project-visual__label">{project.title.split(' ')[0]}</span>
    </div>
);

export default function ProjectCard({ project, index, onView }) {
    const Icon = project.icon;
    const cardContent = (
        <>
            <div className="project-card__top">
                <div className="project-icon" aria-hidden="true"><Icon size={22} /></div>
                <span className="project-index">0{index + 1}</span>
            </div>
            <ProjectVisual project={project} />
            <div className="project-card__body">
                <p className="project-type">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags" aria-label={`${project.title} technologies`}>
                    {project.tech.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <div className="project-card__features">
                    {project.features.slice(0, 3).map((feature) => <span key={feature}>{feature}</span>)}
                </div>
                <div className="project-card__actions">
                    {project.url
                        ? <span className="text-link">Open project <ArrowUpRight size={16} /></span>
                        : <button className="text-link" type="button" onClick={() => onView(project)}>View project <ArrowUpRight size={16} /></button>}
                    {project.github && <a className="text-link" href={project.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>}
                </div>
            </div>
        </>
    );

    const cardClassName = `project-card project-card--${project.accent} reveal`;
    return project.url
        ? <a className={cardClassName} href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>{cardContent}</a>
        : <article className={cardClassName}>{cardContent}</article>;
}
