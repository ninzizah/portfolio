import React, { useState, useEffect } from 'react';
import ThreeScene from './components/ThreeScene';
import Navbar from './components/Navbar';
import { dbService } from './services/dbService';
import { Loader2 } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Project, SiteConfig, Research } from './types';

// New Modular Components
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import ResearchSection from './components/Research';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import LoginModal from './components/LoginModal';
import AdminPortal from './components/AdminPortal';

const App: React.FC = () => {
  // SCROLL PROGRESS BAR LOGIC
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [research, setResearch] = useState<Research[]>([]);
  const [skills, setSkills] = useState<any[]>([]); // Using any for simplicity with DB format
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState<'settings' | 'projects' | 'research' | 'skills' | 'messages'>('settings');
  const [messages, setMessages] = useState<any[]>([]);

  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [tempConfig, setTempConfig] = useState<SiteConfig | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingResearch, setEditingResearch] = useState<Partial<Research> | null>(null);

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        const [fetchedProjects, fetchedConfig, fetchedResearch, fetchedSkills, fetchedMessages] = await Promise.all([
          dbService.getProjects(),
          dbService.getConfig(),
          dbService.getResearch(),
          dbService.getSkills(),
          dbService.getMessages(),
        ]);

        setProjects(fetchedProjects || []);
        setResearch(fetchedResearch || []);
        setSkills(fetchedSkills || []);
        setMessages(fetchedMessages || []);

        if (fetchedConfig) {
          setSiteConfig(fetchedConfig);
          setTempConfig(fetchedConfig);

          if (fetchedConfig.heroName) {
            document.title = "Ninziza Shema Honore | Software Engineer";
          }
          if (fetchedConfig.heroImage) {
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) {
              link.href = fetchedConfig.heroImage;
            } else {
              const newLink = document.createElement('link');
              newLink.rel = 'icon';
              newLink.href = fetchedConfig.heroImage;
              document.head.appendChild(newLink);
            }
          }
        }
      } catch (e) {
        console.error("Initialization error:", e);
      }

      const isAdmin = localStorage.getItem('honore_admin_session') === 'true';
      if (isAdmin) setIsAdminPortalOpen(true);
      setIsLoading(false);
    };
    initData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const username = loginForm.username.trim().toLowerCase();
    const password = loginForm.password.trim();
    if (username === 'honore' && password === 'K a 47@12345') {
      setShowLogin(false);
      setIsAdminPortalOpen(true);
      localStorage.setItem('honore_admin_session', 'true');
    } else {
      alert('Access Denied: Invalid Credentials.');
    }
  };

  const handleLogout = () => {
    setIsAdminPortalOpen(false);
    localStorage.removeItem('honore_admin_session');
  };

  const handleSaveConfig = async () => {
    if (tempConfig) {
      await dbService.saveConfig(tempConfig);
      setSiteConfig(tempConfig);
      alert('Portfolio Core Synchronized.');
    }
  };

  const handleSaveProject = async () => {
    if (editingProject) {
      await dbService.saveProject(editingProject);
      const updated = await dbService.getProjects();
      setProjects(updated);
      setEditingProject(null);
      alert('Registry Entry Updated.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Decommission this project node?')) {
      await dbService.deleteProject(id);
      const updated = await dbService.getProjects();
      setProjects(updated);
    }
  };

  const handleSaveResearch = async () => {
    if (editingResearch) {
      await dbService.saveResearch(editingResearch);
      const updated = await dbService.getResearch();
      setResearch(updated);
      setEditingResearch(null);
      alert('Knowledge Archive Updated.');
    }
  };

  const handleDeleteResearch = async (id: string) => {
    if (confirm('Delete this research record?')) {
      await dbService.deleteResearch(id);
      const updated = await dbService.getResearch();
      setResearch(updated);
    }
  };

  const handleViewCV = () => {
    if (!siteConfig?.cvUrl || siteConfig.cvUrl === '') {
      alert('No CV Document available. Upload one via Admin Hub.');
      return;
    }

    if (siteConfig.cvUrl.startsWith('data:')) {
      const win = window.open();
      if (win) {
        win.document.write(
          `<iframe src="${siteConfig.cvUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
        );
      } else {
        const link = document.createElement('a');
        link.href = siteConfig.cvUrl;
        link.download = 'Ninziza_Honore_CV.pdf';
        link.click();
      }
    } else {
      window.open(siteConfig.cvUrl, '_blank');
    }
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && tempConfig) {
      const reader = new FileReader();
      reader.onloadend = () => setTempConfig({ ...tempConfig, heroImage: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && tempConfig) {
      const reader = new FileReader();
      reader.onloadend = () => setTempConfig({ ...tempConfig, cvUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      const reader = new FileReader();
      reader.onloadend = () => setEditingProject({ ...editingProject, imageUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleResearchImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingResearch) {
      const reader = new FileReader();
      reader.onloadend = () => setEditingResearch({ ...editingResearch, imageUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSkill = async (skill: any) => {
    await dbService.saveSkill(skill);
    const updated = await dbService.getSkills();
    setSkills(updated);
    alert('Skill Stack Updated.');
  };

  const handleDeleteSkill = async (id: string) => {
    if (confirm('Delete this skill category?')) {
      await dbService.deleteSkill(id);
      const updated = await dbService.getSkills();
      setSkills(updated);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Permanently delete this message from archive?')) {
      await dbService.deleteMessage(id);
      const updated = await dbService.getMessages();
      setMessages(updated);
    }
  };


  if (isLoading || !siteConfig) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Architecture...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen selection:bg-indigo-500/30 overflow-x-hidden bg-transparent">
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 z-[9999] shadow-[0_0_15px_#6366f1] pointer-events-none"
        style={{ scaleX, transformOrigin: 'left' }}
      />

      <ThreeScene />
      <Navbar />

      <main className="relative z-10 bg-transparent">
        <Hero siteConfig={siteConfig} handleViewCV={handleViewCV} setShowLogin={setShowLogin} />
        <About siteConfig={siteConfig} projectsCount={projects.length} researchCount={research.length} />
        <Projects projects={projects} />
        <ResearchSection research={research} />
        <Skills siteConfig={siteConfig} skills={skills} />
        <Contact
          siteConfig={siteConfig}
          contactForm={contactForm}
          setContactForm={setContactForm}
          isSending={isSending}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
        />
        <Footer siteConfig={siteConfig} handleViewCV={handleViewCV} setShowLogin={setShowLogin} />
      </main>

      <FloatingActions siteConfig={siteConfig} />

      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        handleLogin={handleLogin}
      />

      <AdminPortal
        isAdminPortalOpen={isAdminPortalOpen}
        handleLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tempConfig={tempConfig}
        setTempConfig={setTempConfig}
        handleSaveConfig={handleSaveConfig}
        editingProject={editingProject}
        setEditingProject={setEditingProject}
        projects={projects}
        handleSaveProject={handleSaveProject}
        handleDeleteProject={handleDeleteProject}
        handleProjectImageUpload={handleProjectImageUpload}
        editingResearch={editingResearch}
        setEditingResearch={setEditingResearch}
        research={research}
        handleSaveResearch={handleSaveResearch}
        handleDeleteResearch={handleDeleteResearch}
        handleResearchImageUpload={handleResearchImageUpload}
        handleCVUpload={handleCVUpload}
        handleHeroImageUpload={handleHeroImageUpload}
        skills={skills}
        handleSaveSkill={handleSaveSkill}
        handleDeleteSkill={handleDeleteSkill}
        messages={messages}
        handleDeleteMessage={handleDeleteMessage}
      />
    </div>
  );
};

export default App;
