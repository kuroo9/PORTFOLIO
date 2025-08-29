import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

// Sample data - replace with your actual information
const portfolioData = {
  name: "ADITYA's portfolio",
  title: "Creative Developer",
  about: "I'm a pasionate developer with expertise in creating web applications using modern technologies. I enjoy turning complex problems into simple, beautiful solutions.",
  email: "ashriwas688@gmail.com",
  phone: "+917028685307",
  address: "INDIA,PUNE",
  socialMedia: [
    { name: "GitHub", url: "https://github.com/kuroo9", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aditya-shriwas-ab4201248/", icon: "linkedin" },
    { name: "Twitter", url: "https://x.com/kuroooo_9", icon: "twitter" },
    { name: "Instagram", url: "https://www.instagram.com/kurooo._7/", icon: "instagram" }
  ],
  skills: [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "HTML/CSS", level: 95 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "AI TOOLS", level: 85 }
  ],
  projects: [
    {
      id: 1,
      title: "Ride sharing app",
      description: "A fully functional e-commerce site with shopping cart and payment integration.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "https://github.com/kuroo9/VeloRide"
    },
    {
      id: 2,
      title: "Music streaming platform",
      description: "An application for managing tasks with drag-and-drop functionality.",
      technologies: ["React", "Firebase", "Material UI"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "https://github.com/kuroo9/TUNIFY-LAST"
    },
    {
      id: 3,
      title: "coming soon",
      description: "Real-time weather information with 5-day forecast for any location.",
      technologies: ["JavaScript", "API Integration", "CSS"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#"
    }
  ]
};

// Intersection Observer Hook for animations
const useInView = (options) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, inView];
};

// Main App component
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const currentScrollPos = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        /* Black and White Theme */
        :root {
          --primary-color: #000000;
          --secondary-color: #333333;
          --dark-color: #1a1a1a;
          --light-color: #f0f0f0;
          --text-color: #111111;
          --text-light: #555555;
          --background: #ffffff;
          --background-alt: #f7f7f7;
          --shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          --transition: all 0.5s ease-in-out;
        }

        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: var(--text-color);
          background: var(--background);
          overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Navigation */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 1.2rem 0;
          z-index: 1000;
          transition: var(--transition);
          background: transparent;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 0.8rem 0;
          box-shadow: var(--shadow);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .nav-logo span {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .nav-menu {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          text-decoration: none;
          color: var(--text-light);
          font-weight: 500;
          position: relative;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--primary-color);
        }

        .nav-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-color);
          transition: width 0.3s ease;
        }

        .nav-link.active .nav-indicator {
          width: 100%;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1001;
        }

        .hamburger span {
          width: 25px;
          height: 3px;
          background: var(--text-color);
          margin: 2px 0;
          transition: var(--transition);
          border-radius: 2px;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 0 20px;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.05;
          background-image: radial-gradient(circle, #000 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-greeting {
          font-size: 1.2rem;
          color: var(--text-light);
          margin-bottom: 0.5rem;
          font-weight: 500;
          animation: fadeIn 1s ease-out;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          color: var(--primary-color);
          line-height: 1.2;
          animation: slideInLeft 1s ease-out;
        }

        .hero-subtitle {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: var(--text-light);
          animation: slideInLeft 1.2s ease-out;
        }

        .typewriter {
          position: relative;
        }

        .typewriter::after {
          content: '|';
          position: absolute;
          right: -2px;
          animation: blink 0.7s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-description {
          font-size: 1.1rem;
          margin-bottom: 2.5rem;
          color: var(--text-light);
          line-height: 1.7;
          animation: fadeIn 1.5s ease-out;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          animation: fadeIn 1.8s ease-out;
        }

        .btn {
          padding: 1rem 2rem;
          border: 1px solid var(--primary-color);
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .btn-primary {
          background: var(--primary-color);
          color: white;
        }

        .btn-secondary {
          background: transparent;
          color: var(--primary-color);
        }

        .btn-primary:hover {
          background: var(--dark-color);
        }

        .btn-secondary:hover {
          background: var(--primary-color);
          color: white;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          animation: fadeIn 1.5s ease-out;
        }

        .image-container {
          position: relative;
          width: 350px;
          height: 350px;
        }

        .main-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background);
          position: relative;
          z-index: 2;
          animation: rotateAndScale 10s linear infinite;
        }

        .main-image img {
          width: 95%;
          height: 95%;
          object-fit: cover;
          border-radius: 50%;
          filter: grayscale(100%);
          transition: filter 0.5s ease;
        }
        
        .main-image:hover img {
          filter: grayscale(0%);
        }

        @keyframes rotateAndScale {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(360deg) scale(1.05); }
        }

        .floating-element {
          position: absolute;
          border-radius: 50%;
          z-index: 1;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .element-1 {
          width: 80px;
          height: 80px;
          background: var(--primary-color);
          top: -20px;
          right: 30px;
        }

        .element-2 {
          width: 50px;
          height: 50px;
          background: var(--secondary-color);
          bottom: 40px;
          left: -20px;
          animation-delay: 1s;
        }

        .element-3 {
          width: 40px;
          height: 40px;
          background: var(--primary-color);
          bottom: -10px;
          right: -10px;
          animation-delay: 0.5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--text-light);
          font-size: 0.9rem;
        }

        .scroll-line {
          width: 1px;
          height: 50px;
          background: var(--text-light);
          margin-top: 10px;
          position: relative;
          overflow: hidden;
        }

        .scroll-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 20px;
          background: var(--primary-color);
          animation: scroll 2s infinite;
        }

        @keyframes scroll {
          0% { top: -20px; }
          100% { top: 100%; }
        }

        /* Sections common styles */
        section {
          padding: 6rem 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--dark-color);
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: var(--primary-color);
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: var(--text-light);
          margin-bottom: 1.5rem;
        }

        .section-divider {
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          margin: 0 auto;
        }

        /* About Section */
        .about {
          background: var(--background-alt);
        }
        
        .about-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        
        .about-text.animate-in {
          animation: slideInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .about-visual.animate-in {
          animation: fadeIn 1.2s ease-in-out;
        }

        .about-text p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.8;
          color: var(--text-light);
        }

        .about-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .detail-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: background 0.3s ease, color 0.3s ease;
        }
        
        .detail-item:hover .detail-icon {
          background: var(--primary-color);
          color: white;
        }

        .detail-content h4 {
          margin-bottom: 0.3rem;
          color: var(--dark-color);
        }

        .detail-content p {
          color: var(--text-light);
          margin: 0;
        }

        .about-visual {
          display: flex;
          justify-content: center;
        }

        .visual-card {
          position: relative;
          width: 200px;
          height: 200px;
          background: white;
          border-radius: 20px;
          box-shadow: var(--shadow);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
        }

        .card-shape {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          background: var(--primary-color);
          opacity: 0.05;
          z-index: -1;
          transform: rotate(10deg);
        }

        .card-content h3 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }

        .card-content p {
          color: var(--text-light);
          font-size: 0.9rem;
        }

        /* Skills Section */
        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skill-item {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: var(--shadow);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-item.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .skill-header h4 {
          color: var(--dark-color);
          font-weight: 600;
        }

        .skill-header span {
          color: var(--primary-color);
          font-weight: 600;
        }

        .skill-bar {
          height: 8px;
          background: var(--background-alt);
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          background: var(--primary-color);
          border-radius: 4px;
          position: relative;
          transition: width 1.5s ease;
        }

        /* Projects Section */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .project-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .project-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          transition: transform 0.5s ease, filter 0.5s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
          filter: grayscale(0%);
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-links {
          display: flex;
          gap: 1rem;
        }

        .project-link {
          width: 50px;
          height: 50px;
          background: var(--primary-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          font-size: 1.2rem;
          transition: var(--transition);
        }

        .project-link:hover {
          background: var(--secondary-color);
          transform: scale(1.1);
        }

        .project-content {
          padding: 1.5rem;
        }

        .project-title {
          font-size: 1.3rem;
          margin-bottom: 0.8rem;
          color: var(--dark-color);
        }

        .project-description {
          color: var(--text-light);
          margin-bottom: 1.2rem;
          line-height: 1.6;
        }

        .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          padding: 0.4rem 0.8rem;
          background: var(--background-alt);
          color: var(--text-color);
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid var(--background-alt);
          transition: border-color 0.3s ease;
        }
        
        .project-card:hover .tech-tag {
          border-color: var(--primary-color);
        }

        /* Contact Section */
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }
        
        .contact-info.animate-in {
          animation: slideInLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .contact-form.animate-in {
          animation: slideInRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .contact-info h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: var(--dark-color);
        }

        .contact-info > p {
          color: var(--text-light);
          margin-bottom: 2.5rem;
          line-height: 1.7;
        }

        .contact-details {
          margin-bottom: 2.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .contact-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--background-alt);
          color: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .contact-text h4 {
          margin-bottom: 0.3rem;
          color: var(--dark-color);
        }

        .contact-text p {
          color: var(--text-light);
          margin: 0;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: var(--background-alt);
          color: var(--text-color);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 1.2rem;
          transition: var(--transition);
        }

        .social-link:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-5px) scale(1.1);
        }

        .contact-form {
          background: white;
          padding: 2.5rem;
          border-radius: 10px;
          box-shadow: var(--shadow);
        }

        .form-group {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem 0;
          border: none;
          border-bottom: 1px solid #ddd;
          font-size: 1rem;
          color: var(--dark-color);
          outline: none;
          background: transparent;
          transition: border-bottom 0.3s ease;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: var(--text-light);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-bottom-color: var(--primary-color);
        }

        .form-group textarea {
          resize: vertical;
        }

        .contact-form .btn {
          margin-top: 1rem;
          width: auto;
          padding: 0.8rem 1.8rem;
          float: right;
        }

        .form-message {
          margin-top: 1rem;
          text-align: center;
          font-size: 1rem;
          font-weight: 500;
        }

        .form-message.success {
          color: var(--primary-color);
        }

        .form-message.error {
          color: var(--secondary-color);
        }

        /* Footer Section */
        .footer {
          background: var(--dark-color);
          color: white;
          padding: 4rem 0 1rem;
          text-align: center;
        }

        .footer .container {
          max-width: 1000px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
          gap: 2rem;
        }

        .footer-logo h3 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: white;
        }

        .footer-logo p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .footer-links a {
          color: white;
          text-decoration: none;
          margin: 0 1rem;
          transition: color 0.3s ease;
          opacity: 0.8;
        }

        .footer-links a:hover {
          color: var(--light-color);
          opacity: 1;
        }

        .footer-social .social-link {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        
        .footer-social .social-link:hover {
          background: var(--light-color);
          color: var(--primary-color);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1rem;
        }

        .footer-bottom p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: 5rem;
          }
          .hero-visual {
            order: -1;
            margin-bottom: 2rem;
          }
          .about-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }
          .about-text,
          .about-details {
            align-items: center;
          }
          .about-details {
            flex-direction: column;
          }
          .contact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .contact-info {
            text-align: center;
          }
          .contact-details {
            align-items: center;
          }
          .contact-item {
            justify-content: center;
          }
          .social-links {
            justify-content: center;
          }
          .footer-content {
            flex-direction: column;
            gap: 1.5rem;
          }
          .footer-links a {
            margin: 0 0.8rem;
          }
        }

        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 250px;
            height: 100vh;
            background: var(--background-alt);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            gap: 1.5rem;
            transition: right 0.5s ease;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          }
          .nav-menu.active {
            right: 0;
          }
          .hamburger {
            display: flex;
          }
          .nav-background {
            display: none;
          }
          .nav-link {
            font-size: 1.2rem;
          }
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.5rem;
          }
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          .about-visual {
            display: none;
          }
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
      <div className="App">
        <Navigation activeSection={activeSection} isScrolled={isScrolled} />
        <HeroSection data={portfolioData} />
        <AboutSection data={portfolioData} />
        <SkillsSection data={portfolioData} />
        <ProjectsSection data={portfolioData} />
        <ContactSection data={portfolioData} />
        <Footer data={portfolioData} />
      </div>
    </>
  );
}

// Navigation Component
function Navigation({ activeSection, isScrolled }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e, section) => {
    e.preventDefault();
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span>{portfolioData.name}</span>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
            <a
              key={section}
              href={`#${section}`}
              className={`nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={(e) => handleScroll(e, section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <span className="nav-indicator"></span>
            </a>
          ))}
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

// Hero Section Component
function HeroSection({ data }) {
  return (
    <section id="home" className="hero">
      <div className="hero-background"></div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h6 className="hero-greeting">Hello, I'm</h6>
          <h1 className="hero-title">ADITYA SHRIWAS</h1>
          <h2 className="hero-subtitle">
            <span className="typewriter">{data.title}</span>
          </h2>
          <p className="hero-description">{data.about}</p>
          
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="image-container">
            <div className="main-image">
              <img src="/531500995_18088666294758908_1262871774284512153_n.jpg" alt="AdityA shriwas" />
            </div>
            <div className="floating-element element-1"></div>
            <div className="floating-element element-2"></div>
            <div className="floating-element element-3"></div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection({ data }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  
  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
          <div className="section-divider"></div>
        </div>
        
        <div className="about-content">
          <div className={`about-text ${inView ? 'animate-in' : ''}`}>
            <p>{data.about}</p>
            <div className="about-details">
              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="detail-content">
                  <h4>Email</h4>
                  <p>{data.email}</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="detail-content">
                  <h4>Phone</h4>
                  <p>{data.phone}</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="detail-content">
                  <h4>Location</h4>
                  <p>{data.address}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`about-visual ${inView ? 'animate-in' : ''}`}>
            <div className="visual-card">
              <div className="card-shape"></div>
              <div className="card-content">
                <h3>Experienced</h3>
                <p>Creating digital solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section Component
function SkillsSection({ data }) {
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });
  
  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Skills</h2>
          <p className="section-subtitle">Technologies I work with</p>
          <div className="section-divider"></div>
        </div>
        
        <div className="skills-container">
          {data.skills.map((skill, index) => (
            <div 
              key={index} 
              className={`skill-item ${inView ? 'animate-in' : ''}`} 
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="skill-header">
                <h4>{skill.name}</h4>
                <span>{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ width: inView ? `${skill.level}%` : '0%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section Component
function ProjectsSection({ data }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">A selection of my recent work</p>
          <div className="section-divider"></div>
        </div>
        
        <div className="projects-grid">
          {data.projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card ${inView ? 'animate-in' : ''}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.liveUrl} className="project-link">
                      <i className="fas fa-eye"></i>
                    </a>
                    <a href={project.githubUrl} className="project-link">
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section Component


function ContactSection({ data }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
// ...existing code...
emailjs.send(
  process.env.REACT_APP_EMAILJS_SERVICE_ID,
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  },
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY
)

    .then(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      setFormStatus('error');
    });
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's work together</p>
          <div className="section-divider"></div>
        </div>
        
        <div className="contact-content">
          <div className={`contact-info ${inView ? 'animate-in' : ''}`}>
            <h3>Don't be shy!</h3>
            <p>Feel free to reach out for collaboration or just to say hello!</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="detail-content">
                  <h4>Email</h4>
                  <p>{data.email}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="detail-content">
                  <h4>Phone</h4>
                  <p>{data.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="detail-content">
                  <h4>Location</h4>
                  <p>{data.address}</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              {data.socialMedia.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className={`fab fa-${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <form className={`contact-form ${inView ? 'animate-in' : ''}`} onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <textarea 
                name="message"
                placeholder="Your Message" 
                rows="5" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              <i className="fas fa-paper-plane"></i>
            </button>
            {formStatus === 'success' && <p className="form-message success">Message sent successfully! Thank you.</p>}
            {formStatus === 'error' && <p className="form-message error">Failed to send message. Please try again later.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer({ data }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>{data.name}</h3>
            <p>Creative Developer</p>
          </div>
          
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          
          <div className="footer-social">
            {data.socialMedia.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className={`fab fa-${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}