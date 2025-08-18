import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectImageCarousel from '@/components/ProjectImageCarousel';

const Projects = () => {
  const projects = [
    {
      title: 'Recipe Sharing Platform',
      description: 'A comprehensive web application that enables users to search for recipes based on ingredients and cuisine preferences. Implemented user profile management and recipe creation functionality with ingredient-based search and step-by-step cooking instructions.',
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'RESTful API'],
      images: [
        '/lovable-uploads/96d9f8b4-3f4f-4585-8633-89b16a2224ac.png',
        '/lovable-uploads/47aea1c0-8f33-49c9-b278-b70269ad3059.png',
        '/lovable-uploads/081ab0c8-cedb-4c42-b3ab-a4f98c0b6eaa.png',
        '/lovable-uploads/12914a8b-3812-4913-8b75-3035c057f418.png',
        '/lovable-uploads/9537221e-4926-44ff-a6e2-6a25fe69265d.png'
      ],
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'Telemedicine Chatbot & Appointment System',
      description: 'Created a web-based chatbot for real-time medical consultation, health advice, and appointment scheduling. Developed symptom analysis functionality to provide users with preliminary health guidance and integrated appointment booking system.',
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
      images: [
        '/lovable-uploads/e64e457e-2359-41e8-a61e-2a7dbfd42d7d.png',
        '/lovable-uploads/98ecc94f-c9cb-4cd5-b66a-89a0438289fc.png',
        '/lovable-uploads/835947d0-bb22-4462-8f18-75d86900e906.png'
      ],
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'Movie Discovery Platform (CineSphere)',
      description: 'Built a comprehensive platform for discovering movies through search functionality and browsing categorized listings. Implemented detailed movie information displays, trailer integration, and personalized watchlist creation with an intuitive user interface.',
      tech: ['React', 'JavaScript', 'CSS3', 'Movie API', 'Responsive Design'],
      images: ['/placeholder.svg'],
      github: '#',
      demo: '#',
      featured: false
    },
    {
      title: 'Quotation Generator',
      description: 'Winner of 1st place at Brain O Vision MERN Stack Hackathon. A web application for generating and managing business quotations with dynamic pricing and client management features.',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      images: ['/placeholder.svg'],
      github: '#',
      demo: '#',
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-playfair font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and side projects
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <ProjectImageCarousel 
                  images={project.images} 
                  projectTitle={project.title}
                />
              </div>

              {/* Project Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div>
                  <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm glass-effect rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="group">
                    <Github className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                    View Code
                  </Button>
                  <Button className="group glow-effect">
                    <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Other <span className="text-gradient">Projects</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="premium-border p-6 hover-lift glow-effect group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-bold group-hover:text-gradient transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-accent rounded text-accent-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 text-xs text-muted-foreground">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
