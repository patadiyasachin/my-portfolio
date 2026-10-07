import { Activity, Braces, Cloud, Code2, Database, Folders, GitBranch, Layers, MonitorSmartphone, Palette, Server, Smartphone, Terminal, Workflow } from 'lucide-react';

export const profile = {
    name: 'Sachin Patadiya',
    location: 'Rajkot, Gujarat, India',
    email: null,
    github: 'https://github.com/patadiyasachin',
    linkedin: 'https://www.linkedin.com/in/sachin-patadiya-308608253',
};

export const aboutHighlights = [
    { value: '1+', label: 'Year', detail: 'Industry experience' },
    { value: 'Flutter + MERN', label: 'Focus', detail: 'Cross-platform development' },
    { value: 'Live', label: 'Projects', detail: 'From development to deployment' },
];

export const technologyGroups = [
    { title: 'Mobile Development', icon: Smartphone, items: ['Flutter', 'Dart', 'Provider', 'Riverpod', 'Firebase'] },
    { title: 'Frontend Development', icon: MonitorSmartphone, items: ['React', 'JavaScript', 'HTML', 'CSS'] },
    { title: 'Backend Development', icon: Server, items: ['Node.js', 'Express.js', 'REST APIs'] },
    { title: 'Database', icon: Database, items: ['SQL', 'MongoDB'] },
    { title: 'Programming', icon: Code2, items: ['Java', 'JavaScript', 'Dart'] },
    { title: 'Tools & Workflow', icon: Workflow, items: ['Git', 'GitHub', 'Android Studio', 'VS Code', 'Azure'] },
];

export const experience = {
    company: 'Prioxis',
    role: 'Flutter Developer',
    period: '1+ Year',
    summary: 'Worked on Flutter-based cross-platform mobile applications from development through testing and maintenance.',
    responsibilities: [
        'Developing Flutter applications',
        'Building responsive mobile UI',
        'REST API integration',
        'Firebase integration',
        'State management using Provider/Riverpod',
        'Debugging and testing',
        'Working with live projects',
        'Git and pull-request workflow',
        'Task and ticket management using Microsoft Azure',
        'Maintaining applications from initial development through support',
    ],
};

export const projects = [
    {
        id: 'ridemate',
        title: 'RideMate',
        category: 'Flutter • Google Maps • REST APIs',
        description: 'A ride-booking style mobile application inspired by modern transportation platforms, with location-based functionality and a smooth user experience.',
        features: ['Location-based search', 'Ride booking flow', 'Google Maps', 'REST API integration'],
        tech: ['Flutter', 'Dart', 'Google Maps', 'Places API', 'REST APIs'],
        visual: 'ride',
        icon: Smartphone,
        accent: 'green',
    },
    {
        id: 'mern-commerce',
        title: 'MERN E-Commerce Platform',
        category: 'React • Node.js • MongoDB',
        description: 'A full-stack commerce platform with customer authentication, catalog management, cart and order workflows, and admin tools.',
        features: ['Authentication', 'Product management', 'Shopping cart', 'Orders', 'Admin functionality', 'GST & shipping'],
        tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
        visual: 'commerce',
        icon: Layers,
        accent: 'blue',
    },
    {
        id: 'navratri-rang',
        title: 'Navratri Rang 2026',
        category: 'React • Vite • GSAP',
        description: 'A creative, mobile-first Navratri-themed website with interactive scrolling, layered motion, and responsive visual storytelling.',
        features: ['Mobile-first design', 'Interactive scroll motion', 'Responsive sections', 'Animated storytelling'],
        tech: ['React', 'Vite', 'GSAP'],
        visual: 'festival',
        icon: Palette,
        accent: 'amber',
    },
    {
        id: 'rmts-buses',
        title: 'RMTS / BRTS Flutter App',
        category: 'Flutter • Dart • Mobile',
        description: 'A Flutter-based academic and project application focused on practical public-transport experience and cross-platform mobile delivery.',
        features: ['Cross-platform mobile UI', 'Live project delivery', 'Responsive screens', 'Application maintenance'],
        tech: ['Flutter', 'Dart'],
        visual: 'transport',
        icon: Activity,
        accent: 'violet',
    },
    {
        id: 'coffee-management',
        title: 'Coffee Shop Management',
        category: 'ASP.NET Core • MVC • SQL',
        description: 'A coffee shop management system that brings customer, product, order, billing, and administrative workflows into one structured application.',
        features: ['User management', 'Product CRUD', 'Order details', 'Billing', 'Search', 'Authentication'],
        tech: ['ASP.NET Core', 'REST API', 'MVC', 'SQL'],
        visual: 'coffee',
        icon: Folders,
        accent: 'orange',
    },
];

export const journey = [
    { year: 'The beginning', title: 'Started exploring software development', text: 'Built a foundation in programming, problem solving, and modern application development.' },
    { year: 'Flutter', title: 'Entered mobile development', text: 'Focused on cross-platform applications, responsive interfaces, and practical product workflows.' },
    { year: 'Prioxis', title: 'Industry training & experience', text: 'Worked on live Flutter projects and supported applications through development and maintenance.' },
    { year: 'MERN Stack', title: 'Expanded into full-stack development', text: 'Developed web applications with React, Node.js, Express.js, and MongoDB.' },
    { year: 'Today', title: 'Building modern web & mobile applications', text: 'Combining clean engineering, thoughtful interfaces, and reliable delivery.' },
];

export const education = {
    degree: 'B.Tech',
    university: 'Darshan University',
    location: 'Rajkot, Gujarat, India',
};

export const icons = { Braces, Cloud, GitBranch, Terminal };
