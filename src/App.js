// App.js (main component)
import React, { useState } from 'react';
import './App.css';

// Sample data - replace with your actual information
const portfolioData = {
  name: "Your Name",
  title: "Web Developer",
  about: "I'm a passionate developer with expertise in creating web applications using modern technologies. I enjoy turning complex problems into simple, beautiful solutions.",
  email: "your.email@example.com",
  phone: "+1 (234) 567-8900",
  address: "City, Country",
  socialMedia: [
    { name: "GitHub", url: "https://github.com/", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/", icon: "linkedin" },
    { name: "Twitter", url: "https://twitter.com/", icon: "twitter" },
    { name: "Instagram", url: "https://instagram.com/", icon: "instagram" }
  ],
  skills: ["JavaScript", "React", "HTML/CSS", "Node.js", "Python", "UI/UX Design"],
  projects: [
    {
      id: 1,
      title: "E-Commerce Website",
      description: "A fully functional e-commerce site with shopping cart and payment integration.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "https://via.placeholder.com/300x200?text=E-Commerce+Project",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "An application for managing tasks with drag-and-drop functionality.",
      technologies: ["React", "Firebase", "Material UI"],
      image: "https://via.placeholder.com/300x200?text=Task+App+Project",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather information with 5-day forecast for any location.",
      technologies: ["JavaScript", "API Integration", "CSS"],
      image: "https://via.placeholder.com/300x200?text=Weather+App+Project",
      liveUrl: "#",
      githubUrl: "#"
    }
  ]
};

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="App">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <HeroSection data={portfolioData} setActiveSection={setActiveSection} />
      <AboutSection data={portfolioData} />
      <SkillsSection data={portfolioData} />
      <ProjectsSection data={portfolioData} />
      <ContactSection data={portfolioData} />
      <Footer data={portfolioData} />
    </div>
  );
}

// Navigation Component
function Navigation({ activeSection, setActiveSection }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          {portfolioData.name}
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActiveSection('home')}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActiveSection('about')}
            >
              About
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#skills" 
              className={activeSection === 'skills' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActiveSection('skills')}
            >
              Skills
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#projects" 
              className={activeSection === 'projects' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActiveSection('projects')}
            >
              Projects
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActiveSection('contact')}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// Hero Section Component
function HeroSection({ data, setActiveSection }) {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Hi, I'm {data.name}</h1>
        <p className="hero-subtitle">{data.title}</p>
        <div className="hero-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => setActiveSection('projects')}
          >
            View My Work
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setActiveSection('contact')}
          >
            Contact Me
          </button>
        </div>
      </div>
      <div className="hero-image">
        <div className="image-placeholder">
          {/* Replace with your photo */}
          <span>Your Photo Here</span>
        </div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection({ data }) {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <p>{data.about}</p>
          <div className="about-details">
            <div className="detail-item">
              <strong>Email:</strong> {data.email}
            </div>
            <div className="detail-item">
              <strong>Phone:</strong> {data.phone}
            </div>
            <div className="detail-item">
              <strong>Location:</strong> {data.address}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section Component
function SkillsSection({ data }) {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-container">
          {data.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section Component
function ProjectsSection({ data }) {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {data.projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveUrl} className="project-link">Live Demo</a>
                  <a href={project.githubUrl} className="project-link">GitHub</a>
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
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p>Feel free to reach out for collaboration or just to say hello!</p>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email:</strong> {data.email}
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> {data.phone}
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
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
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
          <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
          <div className="footer-social">
            {data.socialMedia.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className={`fab fa-${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;