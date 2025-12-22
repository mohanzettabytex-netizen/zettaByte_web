import React, { useState, useEffect } from 'react';
import {
    Code,
    Smartphone,
    Monitor,
    FileText,
    ArrowRight,
    Sparkles,
    Zap,
    Users,
    Target,
    Award,
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Twitter,
    Send,
    CheckCircle,
    TrendingUp,
    Layers,
    Rocket,
    Menu,
    X
} from "lucide-react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import Counter from './Counter';
import emailjs from "emailjs-com";
import zbxLogo from "./asset/zbx_logo-3.png";







export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [activeService, setActiveService] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [statsStart, setStatsStart] = useState(false); // counting start flag
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [careerSuccess, setCareerSuccess] = useState(false);
    const [isSending, setIsSending] = useState(false);






    /* -------------------- ACTIVE SECTION SCROLL -------------------- */
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);

            const sections = ['home', 'about', 'projects', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* -------------------- SERVICE AUTO-HIGHLIGHT -------------------- */
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveService((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        document.title = "ZettaByteX | Modern Digital Solutions";
    }, []);


    /* -------------------- STATS COUNTER TRIGGER -------------------- */
    useEffect(() => {
        const section = document.getElementById("stats-section");
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setStatsStart(true);
                    observer.disconnect(); // run once
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSending) return;

        setIsSending(true);

        const form = e.target;
        const formData = new FormData(form);

        try {
            const res = await fetch("https://formspree.io/f/xblnnbod", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (res.ok) {
                setShowSuccess(true);
                form.reset();

                // Hide popup after 3 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            } else {
                console.error("Formspree error:", await res.json());
                alert("Failed to send message. Please try again.");
            }
        } catch (err) {
            console.error("Form submission error:", err);
            alert("Network error. Please try again.");
        } finally {
            // ✅ VERY IMPORTANT
            setIsSending(false);
        }
    };


    const handleCareerSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        const form = e.target;
        const formData = new FormData(form);

        try {
            const res = await fetch("https://formspree.io/f/myzrrqeg", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            const data = await res.json(); // important for debugging

            if (res.ok) {
                form.reset();

                // CLOSE CAREER POPUP
                setSelectedJob(null);

                // SHOW SUCCESS POPUP
                setCareerSuccess(true);

                setTimeout(() => {
                    setCareerSuccess(false);
                }, 3000);
            } else {
                console.error("Formspree error:", data);
                alert("Application submission failed. Please try again.");
            }
        } catch (error) {
            console.error("Career submit error:", error);
            alert("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const jobs = [
        {
            title: "Frontend Developer",
            desc: "Build modern, responsive web interfaces using React and Tailwind.",
            tags: ["React", "Tailwind", "UI", "2+ Years"]
        },
        {
            title: "Backend Developer",
            desc: "Develop secure APIs and scalable backend systems.",
            tags: ["Node.js / .NET", "API", "SQL", "2+ Years"]
        },
        {
            title: "UI/UX Designer",
            desc: "Design intuitive user experiences and modern interfaces.",
            tags: ["Figma", "UX", "Design System"]
        },
        {
            title: "Software Intern",
            desc: "Learn real-world development by working on live projects.",
            tags: ["Internship", "React", "Learning"]
        }
    ];

    /* -------------------- DATA ARRAYS -------------------- */
    const services = [
        { icon: Code, title: 'Software Development', color: 'from-blue-100 to-blue-50', desc: 'Custom scalable solutions' },
        { icon: Smartphone, title: 'App Development', color: 'from-purple-100 to-pink-50', desc: 'iOS & Android apps' },
        { icon: Monitor, title: 'Desktop Applications', color: 'from-orange-100 to-red-50', desc: 'Cross-platform apps' },
        { icon: FileText, title: 'PPT Creation', color: 'from-green-100 to-emerald-50', desc: 'Professional presentations' }
    ];

    const projects = [
        {
            title: 'FinTech Dashboard',
            category: 'Web Application',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
            tech: ['React', 'Node.js', 'MongoDB']
        },
        {
            title: 'Healthcare Mobile App',
            category: 'Mobile Development',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
            tech: ['React Native', 'Firebase']
        },
        {
            title: 'E-Commerce Platform',
            category: 'Full Stack',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
            tech: ['Next.js', 'Stripe', 'AWS']
        }
    ];

    const stats = [
        { icon: Rocket, number: '25+', label: 'Projects Delivered' },
        { icon: Users, number: '40+', label: 'Happy Clients' },
        { icon: Award, number: '10+', label: 'Awards Won' },
        { icon: TrendingUp, number: '98%', label: 'Success Rate' }
    ];

    const scrollToSection = (id) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });


    return (
        <div className="relative min-h-screen text-gray-800 overflow-hidden">

            {/* GLOBAL BACKGROUND */}
            <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
            />

            {/* SUBTLE ANIMATED BLOBS */}
            <motion.div
                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="fixed top-[-120px] left-[-120px] w-[420px] h-[420px] bg-blue-300/20 blur-3xl rounded-full -z-10"
            />

            <motion.div
                animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="fixed bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-indigo-300/20 blur-3xl rounded-full -z-10"
            />

            {/* CONTENT STARTS HERE */}


            {/* -------------------- NAVBAR -------------------- */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <div
                        onClick={() => scrollToSection('home')}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        {/* Logo Image */}
                        <img
                            src={zbxLogo}
                            alt="ZettaByteX Logo"
                            className="w-12 h-12 object-contain"
                        />
                        {/* Brand Name */}
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            ZettaByteX
                        </span>
                    </div>


                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {['home', 'about', 'projects', 'careers', 'contact'].map(item => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className={`capitalize font-medium transition ${activeSection === item
                                    ? 'text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>



            <section id="home" className="relative min-h-screen flex items-center pt-28 bg-white overflow-hidden">

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-purple-100 opacity-70 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-14 items-center relative z-10">

                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-blue-200 shadow-sm"
                        >
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-blue-600">Innovating Since 2024</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900"
                        >
                            Build the
                            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                Future with Us
                            </span>
                        </motion.h1>

                        {/* Sub Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-gray-600 max-w-xl"
                        >
                            Crafting powerful, scalable, and intelligent digital solutions for modern businesses.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 
                    transition-all font-semibold"
                            >
                                Explore Projects
                            </button>

                            <button
                                onClick={() => scrollToSection('contact')}
                                className="px-8 py-4 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all font-semibold"
                            >
                                Contact Us
                            </button>
                        </motion.div>

                        {/* Animated Stats */}
                        <motion.div
                            id="stats-section"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10"
                        >
                            {stats.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.08 }}
                                        className="text-center bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer transition"
                                    >
                                        <Icon className="w-7 h-7 text-blue-600 mx-auto mb-3" />

                                        <div className="text-3xl font-extrabold text-gray-900">
                                            <Counter value={stat.number} startAnimation={statsStart} />
                                        </div>

                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT CONTENT – Animated Floating Cards */}
                    <div className="relative flex justify-center items-center">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="relative w-full grid grid-cols-2 gap-5"
                        >
                            {services.map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.06, rotate: 1 }}
                                        className="p-8 rounded-2xl border border-gray-200 bg-white shadow-md cursor-pointer transition-all"
                                    >
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                                            <Icon className="w-7 h-7 text-gray-800" />
                                        </div>
                                        <h3 className="text-lg font-bold">{service.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1">{service.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Floating glow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 1 }}
                            className="absolute -bottom-10 w-72 h-72 bg-blue-300 blur-3xl opacity-30 rounded-full"
                        />
                    </div>
                </div>
            </section>
            {/* -------------------- ABOUT SECTION -------------------- */}
            <section
                id="about"
                className="relative py-10 overflow-hidden"
            >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 pointer-events-none" />

                {/* Soft glow accents */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300/20 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-300/20 blur-3xl rounded-full pointer-events-none" />

                {/* CONTENT WRAPPER (IMPORTANT) */}
                <div className="relative max-w-7xl mx-auto px-6">

                    {/* HEADER */}
                    <div className="text-center mb-16">
                        <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-100 text-sm">
                            About Zettabytex
                        </span>

                        <h2 className="text-5xl font-bold mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            Innovation Meets Excellence
                        </h2>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
                            We're digital architects crafting the future of technology.
                        </p>
                    </div>

                    {/* ABOUT CARDS */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            { icon: Target, title: 'Our Mission', desc: 'To empower businesses with cutting-edge tech solutions.', gradient: 'from-blue-100 to-blue-50' },
                            { icon: Zap, title: 'Our Vision', desc: 'To become a global leader in digital transformation.', gradient: 'from-purple-100 to-pink-50' },
                            { icon: Layers, title: 'Our Values', desc: 'Excellence, integrity, innovation, and client success.', gradient: 'from-orange-100 to-red-50' }
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={i}
                                    className="bg-white/90 backdrop-blur border border-gray-200 shadow-sm rounded-3xl p-8 text-center"
                                >
                                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                                        <Icon className="w-8 h-8 text-gray-700" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                                    <p className="mt-3 text-gray-600">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* WHY CHOOSE US */}
                    <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h3 className="text-4xl font-bold text-gray-900">Why Choose Us?</h3>

                            <p className="text-gray-600 text-lg">
                                With over a decade of experience, we bring unmatched expertise.
                            </p>

                            <div className="space-y-4">
                                {[
                                    'Expert team of certified developers',
                                    'Agile methodology for rapid delivery',
                                    '24/7 support and maintenance',
                                    'Cutting-edge technology stack',
                                    'Proven track record across industries'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start space-x-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                            {stats.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={i}
                                        className="text-center bg-white/90 backdrop-blur p-4 rounded-xl border border-gray-200 shadow-sm hover:scale-105 transition"
                                    >
                                        <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />

                                        <div className="text-2xl font-bold text-gray-900">
                                            <Counter value={stat.number} startAnimation={statsStart} />
                                        </div>

                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>

            <section id="careers" className="relative py-28 overflow-hidden">

                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-300/20 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-300/20 blur-3xl rounded-full pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 text-sm">
                            Careers
                        </span>

                        <h2 className="text-5xl font-bold mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            Join Our Team
                        </h2>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
                            Work with passionate people building impactful digital products.
                        </p>
                    </div>

                    {/* Job Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map((job, i) => (
                            <div
                                key={i}
                                className="bg-white/90 backdrop-blur border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
                            >
                                <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>

                                <p className="text-gray-600 mt-3">{job.desc}</p>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {job.tags.map((tag, j) => (
                                        <span
                                            key={j}
                                            className="text-xs px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setSelectedJob(job.title)}
                                    className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
                                >
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* -------------------- PROJECTS SECTION -------------------- */}
            <section id="projects" className="relative py-16 overflow-hidden">

                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-300/30 blur-3xl rounded-full" />

                <div className="relative max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="text-center mb-20">
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur border border-blue-200 text-blue-700 text-sm font-medium shadow-sm">
                            🚀 Our Work
                        </span>

                        <h2 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Real-World Digital Products
                        </h2>

                        <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">
                            We design and build scalable platforms used by schools, startups, and growing businesses.
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

                        {projects.map((project, i) => (
                            <div
                                key={i}
                                className="group relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500"
                            >

                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                    />

                                    {/* Image overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

                                    {/* Category badge */}
                                    <span className="absolute top-4 left-4 px-4 py-1 rounded-full bg-white/90 text-sm font-semibold text-gray-800 shadow">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-7 space-y-4">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, j) => (
                                            <span
                                                key={j}
                                                className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-4 flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Used by {project.users}+ users
                                        </span>

                                        <button className="text-blue-600 font-semibold hover:underline">
                                            View Case Study →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-24">
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-semibold shadow-xl hover:bg-blue-700 hover:-translate-y-1 transition-all"
                        >
                            Start Your Project
                        </button>
                    </div>

                </div>
            </section>
            {/* -------------------- CONTACT SECTION -------------------- */}
            <section id="contact" className="py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-16">
                        <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-100 text-sm">
                            Get In Touch
                        </span>

                        <h2 className="text-5xl font-bold mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            Let's Build Together
                        </h2>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
                            Ready to transform your digital presence? Let's talk.
                        </p>
                    </div>


                    <div className="grid lg:grid-cols-2 gap-12">

                        <div className="space-y-8">
                            {[
                                { icon: Mail, title: 'Email Us', info: 'info@zettabytex.in', link: 'mailto:info@zettabytex.in' },
                                { icon: Phone, title: 'Call Us', info: '+91 9500250290', link: '+91 9500250290' },
                                { icon: MapPin, title: 'Visit Us', info: '3/155 Eripalayam, Udumalpet, Tamil Nadu, 642-126', link: '#' }
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={i}
                                        href={item.link}
                                        className="flex items-start space-x-4 p-4 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition"
                                    >
                                        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-blue-700" />
                                        </div>

                                        <div>
                                            <div className="text-sm text-gray-500">{item.title}</div>
                                            <div className="text-lg font-semibold text-gray-800">{item.info}</div>
                                        </div>
                                    </a>
                                );
                            })}

                            {/* SOCIAL LINKS */}
                            <div className="pt-6">
                                <div className="text-sm text-gray-500 mb-4">Follow Us</div>

                                <div className="flex space-x-4">
                                    {[Twitter, Linkedin, Github].map((Icon, i) => (
                                        <div
                                            key={i}
                                            className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition cursor-pointer"
                                        >
                                            <Icon className="w-5 h-5 text-gray-600" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* CONTACT FORM */}
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white border border-gray-200 shadow-md rounded-3xl p-8 space-y-6"
                        >

                            <input type="hidden" name="_subject" value="New Website Enquiry" />
                            <input type="hidden" name="_captcha" value="false" />

                            <div>
                                <label className="text-sm font-medium text-gray-700">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full mt-2 px-4 py-3 border rounded-xl"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full mt-2 px-4 py-3 border rounded-xl"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full mt-2 px-4 py-3 border rounded-xl"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold"
                            >
                                Send Message
                            </button>
                        </form>

                    </div>
                </div>
            </section>
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                        />

                        {/* LEFT Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 260, damping: 28 }}
                            className="fixed left-0 top-0 z-[70] h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b">
                                <div className="flex items-center space-x-2">
                                    <Sparkles className="w-6 h-6 text-blue-600" />
                                    <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                                        ZettaByteX
                                    </span>
                                </div>

                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* BODY (Blank-page feel) */}
                            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

                                {/* Brand Info */}
                                <div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        We build modern, scalable digital products for businesses,
                                        schools, and startups using cutting-edge technology.
                                    </p>
                                </div>

                                {/* Navigation */}
                                <div className="space-y-2">
                                    {['home', 'about', 'projects', 'careers', 'contact'].map((item, i) => (
                                        <motion.button
                                            key={item}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.07 }}
                                            onClick={() => {
                                                scrollToSection(item);
                                                setMobileMenuOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-4 rounded-xl text-lg font-semibold capitalize
                           text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                                        >
                                            {item}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Extra Info (THIS makes it feel like a page) */}
                                <div className="pt-4 border-t space-y-4">
                                    <div className="flex items-center space-x-3 text-gray-700">
                                        <Phone className="w-5 h-5 text-blue-600" />
                                        <span>+91 9500250290</span>
                                    </div>

                                    <div className="flex items-center space-x-3 text-gray-700">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                        <span>info@zettabytex.in</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="p-6 border-t">
                                <button
                                    onClick={() => {
                                        scrollToSection('contact');
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition"
                                >
                                    Get in Touch
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

                    {/* Popup */}
                    <div className="relative bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm mx-auto animate-scaleIn">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                                className="w-7 h-7 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                        <p className="text-gray-600 mt-2">
                            Thank you for contacting us. We’ll get back to you shortly.
                        </p>
                    </div>
                </div>
            )}

            {selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => !isSubmitting && setSelectedJob(null)}
                    />

                    <div className="relative bg-white rounded-3xl shadow-xl p-8 w-full max-w-md animate-scaleIn">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Apply for {selectedJob}
                        </h3>

                        {/* FORM HERE */}
                    </div>
                </div>
            )}


            {selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setSelectedJob(null)}
                    />

                    <div className="relative bg-white rounded-3xl shadow-xl p-8 w-full max-w-md animate-scaleIn">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Apply for {selectedJob}
                        </h3>

                        <form onSubmit={handleCareerSubmit} className="space-y-4 mt-4">
                            <input type="hidden" name="_subject" value={`Career Application - ${selectedJob}`} />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="job" value={selectedJob} />

                            <input
                                required
                                name="name"
                                placeholder="Your Name"
                                className="w-full px-4 py-3 border rounded-xl"
                            />

                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 border rounded-xl"
                            />

                            <textarea
                                name="message"
                                rows={3}
                                placeholder="Why should we hire you?"
                                className="w-full px-4 py-3 border rounded-xl"
                            />

                            {/* <input
                                type="file"
                                name="resume"
                                accept=".pdf,.doc,.docx"
                                required
                                className="w-full mt-2 px-4 py-2 border rounded-xl"
                            /> */}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center
      ${isSubmitting ? "bg-indigo-400" : "bg-indigo-600 text-white"}
    `}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Application"}
                            </button>
                        </form>


                    </div>
                </div>
            )}

            {careerSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

                    <div className="relative bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm animate-scaleIn">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                                className="w-7 h-7 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900">Application Submitted!</h3>
                        <p className="text-gray-600 mt-2">
                            We’ll review your profile and get back to you soon.
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
}
