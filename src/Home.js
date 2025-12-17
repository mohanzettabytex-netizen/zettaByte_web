import React, { useState, useEffect } from 'react';
import {
    Code, Smartphone, Monitor, FileText, ArrowRight, Sparkles, Zap,
    Users, Target, Award, Mail, Phone, MapPin, Github, Linkedin, Twitter,
    Send, CheckCircle, TrendingUp, Layers, Rocket
} from 'lucide-react';
import { motion, useAnimationControls } from "framer-motion";
import Counter from './Counter';



export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [activeService, setActiveService] = useState(0);
    const [activeSection, setActiveSection] = useState('home');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [statsStart, setStatsStart] = useState(false); // counting start flag

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
        document.title = "Zettabytex - Software & App Development";
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

    /* -------------------- COUNTER COMPONENT -------------------- */
    // function Counter({ value, startAnimation }) {
    //     const controls = useAnimationControls();
    //     const end = parseInt(value.replace("+", ""));

    //     useEffect(() => {
    //         if (startAnimation) {
    //             controls.start({
    //                 count: end,
    //                 transition: { duration: 2, ease: "easeOut" }
    //             });
    //         }
    //     }, [startAnimation]);

    //     return (
    //         <motion.span
    //             animate={controls}
    //             initial={{ count: 0 }}
    //         >
    //             {Math.floor(controls.get().count)}+
    //         </motion.span>
    //     );
    // }

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
        { icon: Rocket, number: '500+', label: 'Projects Delivered' },
        { icon: Users, number: '150+', label: 'Happy Clients' },
        { icon: Award, number: '25+', label: 'Awards Won' },
        { icon: TrendingUp, number: '99%', label: 'Success Rate' }
    ];

    const scrollToSection = (id) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });


    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
            
            {/* -------------------- NAVBAR -------------------- */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    

                    {/* Logo */}
                    <div
                        onClick={() => scrollToSection('home')}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <Sparkles className="w-7 h-7 text-blue-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            ZettaByteX
                        </span>
                    </div>

                    {/* Navigation Items */}
                    <div className="hidden md:flex items-center space-x-4">
                        {['home', 'about', 'projects', 'contact'].map(item => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className={`px-4 py-2 rounded-lg capitalize font-medium transition ${activeSection === item
                                    ? 'text-blue-600 bg-blue-100'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
                        Get Started
                    </button> */}
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
            <section id="about" className="py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">

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
                                <div key={i} className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 text-center">
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

                        {/* Small counters block (Now Fixed) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                            {stats.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={i}
                                        className="text-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition"
                                    >
                                        <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />

                                        {/* FIX: startAnimation added */}
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






            {/* -------------------- PROJECTS SECTION -------------------- */}
            <section id="projects" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-16">
                        <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-100 text-sm">
                            Our Work
                        </span>

                        <h2 className="text-5xl font-bold mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            Featured Projects
                        </h2>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
                            Explore our portfolio of transformative solutions.
                        </p>
                    </div>


                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, i) => (
                            <div
                                key={i}
                                className="group bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden hover:shadow-lg transition cursor-pointer"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-6">
                                    <div className="text-sm text-blue-600 font-medium mb-2">{project.category}</div>

                                    <h3 className="text-2xl font-bold">{project.title}</h3>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.tech.map((tech, j) => (
                                            <span
                                                key={j}
                                                className="text-xs px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="text-center mt-16">
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition font-semibold"
                        >
                            View All Projects
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
                            className="bg-white border border-gray-200 shadow-md rounded-3xl p-8 space-y-6"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div>
                                <label className="text-sm font-medium text-gray-700">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="w-full mt-2 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full mt-2 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition font-semibold"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
