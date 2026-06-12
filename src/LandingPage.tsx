import { useState, useEffect } from 'react';
import { 
  Send, 
  Tag, 
  Phone, 
  Users, 
  BarChart2, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  TrendingUp, 
  Volume2, 
  FileText, 
  Play,
  Database,
  Activity
} from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
}

export default function LandingPage({ onLaunch }: LandingPageProps) {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'create' | 'whatsapp' | 'email' | 'sms' | 'tracking'>('create');
  
  // Custom scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll reveal Intersection Observer hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Chatbase chatbot widget integration
  useEffect(() => {
    const win = window as any;
    if (!win.chatbase || win.chatbase("getState") !== "initialized") {
      win.chatbase = (...args: any[]) => {
        if (!win.chatbase.q) {
          win.chatbase.q = [];
        }
        win.chatbase.q.push(args);
      };
      win.chatbase = new Proxy(win.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args: any[]) => target(prop, ...args);
        }
      });
    }

    const onLoad = function () {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "nSFGl9WWd7gsbPpyUhO-3";
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
      win.chatbaseScriptElement = script;
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      if (win.chatbaseScriptElement) {
        win.chatbaseScriptElement.remove();
        win.chatbaseScriptElement = null;
      }
      
      // Clean up chatbase bubble and bubble-window iframes
      const bubbleFrame = document.getElementById("chatbase-bubble-window");
      if (bubbleFrame) bubbleFrame.remove();
      
      const bubbleButton = document.getElementById("chatbase-bubble-button");
      if (bubbleButton) bubbleButton.remove();

      const chatbaseElements = document.querySelectorAll("[id^='chatbase']");
      chatbaseElements.forEach(el => el.remove());

      delete win.chatbase;
    };
  }, []);

  return (
    <div className="zoho-landing-container">
      {/* Dynamic Style Sheet injection for landing page specific styles */}
      <style>{`
        .zoho-landing-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: #1a202c;
          background-color: #ffffff;
          margin: 0;
          padding: 0;
          scroll-behavior: smooth;
        }
        
        /* Typography scale */
        .zoho-h1 {
          font-size: 44px;
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: #0c1427;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .zoho-h1 { font-size: 32px; }
        }
        
        .zoho-h2 {
          font-size: 32px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: #0c1427;
          margin-bottom: 16px;
          text-align: center;
        }
        
        .zoho-p-sub {
          font-size: 18px;
          line-height: 1.6;
          color: #4a5568;
          margin-bottom: 30px;
        }
        
        .zoho-body {
          font-size: 15px;
          line-height: 1.6;
          color: #4a5568;
        }

        /* Scroll Reveal Animation Styles */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Nav styles */
        .zoho-nav {
          position: sticky;
          top: 0;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          z-index: 1000;
        }
        @media (max-width: 1024px) {
          .zoho-nav { padding: 0 20px; }
        }
        
        .zoho-nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 20px;
          color: #0c1427;
          cursor: pointer;
        }
        
        .zoho-nav-logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background-color: #e31a22;
          color: #ffffff;
          border-radius: 6px;
          font-weight: 800;
          font-size: 16px;
        }
        
        .zoho-nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        @media (max-width: 1024px) {
          .zoho-nav-links { display: none; }
        }
        
        .zoho-nav-link {
          font-size: 14.5px;
          font-weight: 500;
          color: #4a5568;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.15s ease;
        }
        .zoho-nav-link:hover {
          color: #e31a22;
        }
        
        .zoho-nav-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .zoho-btn-text {
          font-size: 14.5px;
          font-weight: 600;
          color: #0c1427;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.15s ease;
        }
        .zoho-btn-text:hover {
          color: #e31a22;
        }
        
        .zoho-btn-red {
          background-color: #e31a22;
          color: #ffffff;
          font-weight: 600;
          font-size: 14.5px;
          padding: 10px 22px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: background-color 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .zoho-btn-red:hover {
          background-color: #c51218;
        }
        
        .zoho-btn-outline {
          background: none;
          color: #4a5568;
          font-weight: 600;
          font-size: 14.5px;
          padding: 10px 22px;
          border-radius: 4px;
          border: 1px solid #cbd5e1;
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .zoho-btn-outline:hover {
          background-color: #f8fafc;
          border-color: #94a3b8;
          color: #0f172a;
        }

        /* Layout grids and wrappers */
        .zoho-section {
          padding: 80px 40px;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .zoho-section { padding: 50px 20px; }
        }
        
        .zoho-section-alt {
          background-color: #f8fafc;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
        }
        
        /* Hero Section */
        .zoho-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 50px;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .zoho-hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
        }
        
        /* Dashboard Mockup styling */
        .zoho-browser-mockup {
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          text-align: left;
        }
        
        .zoho-browser-header {
          background-color: #f1f5f9;
          height: 38px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .zoho-browser-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }
        
        .zoho-browser-body {
          display: flex;
          height: 340px;
          background-color: #f8fafc;
        }
        
        .zoho-browser-sidebar {
          width: 65px;
          background-color: #ffffff;
          border-right: 1px solid #e2e8f0;
          padding: 15px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        
        .zoho-browser-main {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
        }
        
        /* Capabilities Grid */
        .zoho-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 40px;
        }
        @media (max-width: 1024px) {
          .zoho-features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .zoho-features-grid { grid-template-columns: 1fr; }
        }
        
        .zoho-feature-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 28px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
          text-align: left;
        }
        .zoho-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04);
          border-color: #cbd5e1;
        }
        
        .zoho-feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 6px;
          background-color: #f1f5f9;
          color: #2563eb;
          margin-bottom: 18px;
          transition: all 0.3s ease;
        }
        .zoho-feature-card:hover .zoho-feature-icon {
          background-color: #eff6ff;
          color: #1f57e7;
          transform: scale(1.05);
        }
        
        .zoho-feature-title {
          font-size: 17px;
          font-weight: 700;
          color: #0c1427;
          margin-bottom: 10px;
        }

        /* Nightly Shopper Metrics Flowchart */
        .zoho-flowchart-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 6px;
          margin-top: 30px;
        }
        
        .zoho-flowchart-node {
          flex: 1;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          min-height: 180px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.01);
        }
        .zoho-flowchart-node:hover {
          transform: translateY(-4px);
          border-color: #1f57e7;
          box-shadow: 0 12px 20px rgba(31, 87, 231, 0.08);
        }
        
        .zoho-flowchart-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #eff6ff;
          color: #1f57e7;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .zoho-flowchart-node:hover .zoho-flowchart-icon-wrapper {
          background-color: #1f57e7;
          color: #ffffff;
          transform: rotate(5deg) scale(1.05);
        }
        
        .zoho-flowchart-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #0f172a;
        }
        
        .zoho-flowchart-desc {
          font-size: 11px;
          color: #64748b;
          line-height: 1.4;
        }
        
        .zoho-flowchart-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .zoho-flowchart-arrow.vertical {
          display: none;
        }
        
        .zoho-arrow-path {
          stroke-dasharray: 6;
          animation: zohoFlowArrow 1.5s linear infinite;
        }
        @keyframes zohoFlowArrow {
          to {
            stroke-dashoffset: -12;
          }
        }
        
        @media (max-width: 1150px) {
          .zoho-flowchart-row {
            flex-direction: column;
            gap: 6px;
          }
          .zoho-flowchart-node {
            width: 100%;
            max-width: 480px;
            min-height: auto;
            padding: 16px 20px;
            flex-direction: row;
            text-align: left;
            gap: 16px;
          }
          .zoho-flowchart-arrow.horizontal {
            display: none;
          }
          .zoho-flowchart-arrow.vertical {
            display: flex;
            transform: rotate(90deg);
            margin: 4px 0;
          }
          .zoho-flowchart-desc {
            margin-top: 2px;
          }
        }
        
        /* Showcase tabs */
        .zoho-showcase-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        
        .zoho-showcase-tab {
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          background: none;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .zoho-showcase-tab:hover {
          background-color: #f8fafc;
          color: #0c1427;
        }
        .zoho-showcase-tab.active {
          background-color: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }
        
        /* Voice Campaigns Highlight Section layout */
        .zoho-highlight-section {
          background: linear-gradient(180deg, #ffffff 0%, #f4f7ff 100%);
          border-top: 1px solid #dbeafe;
          border-bottom: 1px solid #dbeafe;
        }
        
        .zoho-featured-badge {
          display: inline-block;
          background-color: #eff6ff;
          color: #1f57e7;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid #bfdbfe;
          margin-bottom: 16px;
          letter-spacing: 0.05em;
        }

        .zoho-voice-workflow {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 15px;
          margin-top: 40px;
        }
        @media (max-width: 1024px) {
          .zoho-voice-workflow { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .zoho-voice-workflow { grid-template-columns: 1fr; }
        }
        
        .zoho-voice-step {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 24px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .zoho-voice-step:hover {
          transform: translateY(-4px);
          border-color: #1f57e7;
          box-shadow: 0 10px 20px rgba(31, 87, 231, 0.08);
        }
        
        /* Comparison Table */
        .zoho-comp-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 40px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .zoho-comp-table th {
          background-color: #0c1427;
          color: #ffffff;
          padding: 16px 20px;
          font-weight: 700;
          text-align: left;
        }
        
        .zoho-comp-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
          color: #4a5568;
        }
        
        .zoho-comp-table tr:hover td {
          background-color: #f8fafc;
        }
        
        /* Final Dark CTA (Matching User Screenshot) */
        .zoho-dark-cta {
          background-color: #000000;
          color: #ffffff;
          text-align: center;
          padding: 100px 20px;
          border-top: 1px solid #111111;
          border-bottom: 1px solid #111111;
        }
        
        .zoho-dark-cta-title {
          font-size: 38px;
          font-weight: 800;
          line-height: 1.2;
          color: #ffffff;
          margin-bottom: 12px;
          letter-spacing: -0.015em;
        }
        
        .zoho-dark-cta-subtitle {
          font-size: 16px;
          color: #94a3b8;
          margin-bottom: 30px;
          font-weight: 500;
        }
        
        .zoho-dark-btn-red {
          background-color: #e31a22;
          color: #ffffff;
          font-weight: 700;
          font-size: 13.5px;
          padding: 14px 30px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 0.05em;
          transition: background-color 0.15s ease;
          display: inline-block;
          text-transform: uppercase;
        }
        .zoho-dark-btn-red:hover {
          background-color: #c51218;
        }
        
        .zoho-dark-btn-blue-outline {
          background-color: transparent;
          color: #0091ff;
          border: 1px solid #0091ff;
          border-radius: 4px;
          font-weight: 700;
          font-size: 13.5px;
          padding: 13px 30px;
          cursor: pointer;
          letter-spacing: 0.05em;
          transition: all 0.15s ease;
          display: inline-block;
          margin-left: 16px;
          text-transform: uppercase;
        }
        .zoho-dark-btn-blue-outline:hover {
          background-color: rgba(0, 145, 255, 0.06);
          color: #33a6ff;
          border-color: #33a6ff;
        }
        @media (max-width: 640px) {
          .zoho-dark-btn-red, .zoho-dark-btn-blue-outline {
            width: 100%;
            max-width: 320px;
            display: block;
            margin: 0 auto;
          }
          .zoho-dark-btn-blue-outline {
            margin-top: 14px;
          }
        }
        
        /* Footer */
        .zoho-footer {
          background-color: #ffffff;
          border-top: 1px solid #e2e8f0;
          padding: 50px 40px 30px;
        }
        
        .zoho-footer-grid {
          display: grid;
          grid-template-columns: 1.5fr repeat(4, 1fr);
          gap: 40px;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .zoho-footer-grid { grid-template-columns: 1fr; gap: 30px; }
        }
        
        .zoho-footer-title {
          font-weight: 700;
          font-size: 14px;
          color: #0f172a;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .zoho-footer-link {
          display: block;
          font-size: 14px;
          color: #475569;
          text-decoration: none;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .zoho-footer-link:hover {
          color: #e31a22;
        }
        @media (max-width: 1024px) {
          .xenia-inside-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .xenia-inside-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        .zoho-table-responsive {
          overflow-x: auto;
          width: 100%;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          margin-top: 40px;
        }
        
        .zoho-comp-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 0 !important;
          border: none !important;
        }

        @media (max-width: 640px) {
          .zoho-nav-actions {
            gap: 8px !important;
          }
          .zoho-btn-text {
            display: none !important;
          }
          .zoho-btn-red {
            padding: 8px 14px !important;
            font-size: 13px !important;
          }
          .zoho-nav-logo span {
            font-size: 16px !important;
          }
        }
      `}</style>

      {/* SECTION 1 – NAVIGATION */}
      <nav className="zoho-nav">
        <div className="zoho-nav-logo" onClick={() => scrollToSection('home')}>
          <img src="/logo.png" alt="Xenia CRM" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          <span>Xenia CRM</span>
        </div>
        
        <div className="zoho-nav-links">
          <span className="zoho-nav-link" onClick={() => scrollToSection('home')}>Home</span>
          <span className="zoho-nav-link" onClick={() => scrollToSection('features')}>Features</span>
          <span className="zoho-nav-link" onClick={() => scrollToSection('how-it-works')}>How it works</span>
          <span className="zoho-nav-link" onClick={() => scrollToSection('showcase')}>Campaigns</span>
          <span className="zoho-nav-link" onClick={() => scrollToSection('voice')}>Voice Campaigns</span>
          <span className="zoho-nav-link" onClick={() => scrollToSection('why-xenia')}>Why Xenia</span>
        </div>
        
        <div className="zoho-nav-actions">
          <button className="zoho-btn-text" onClick={onLaunch}>Sign In</button>
          <button className="zoho-btn-red" onClick={onLaunch}>
            Launch Xenia <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* SECTION 2 – HERO SECTION */}
      <header id="home" className="zoho-section scroll-reveal" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="zoho-hero-grid">
          <div>
            <h1 className="zoho-h1">
              Every Customer Journey Creates An Opportunity
            </h1>
            <p className="zoho-p-sub">
              Xenia helps retail teams discover growth opportunities, engage shoppers at the right moment, and understand the business impact of every action.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="zoho-btn-red" style={{ padding: '12px 28px' }} onClick={onLaunch}>
                Launch Xenia
              </button>
              <button className="zoho-btn-outline" style={{ padding: '12px 28px' }} onClick={() => scrollToSection('features')}>
                Explore Features
              </button>
            </div>
          </div>
          
          <div>
            <div className="zoho-browser-mockup">
              <div className="zoho-browser-header">
                <div className="zoho-browser-dot" style={{ backgroundColor: '#ff5f56' }} />
                <div className="zoho-browser-dot" style={{ backgroundColor: '#ffbd2e' }} />
                <div className="zoho-browser-dot" style={{ backgroundColor: '#27c93f' }} />
                <div style={{ marginLeft: '12px', fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>xenia-crm-operations.local</div>
              </div>
              <div className="zoho-browser-body">
                <div className="zoho-browser-sidebar">
                  <div style={{ width: '28px', height: '28px', borderRadius: '5px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={14} color="#64748b" /></div>
                  <div style={{ width: '28px', height: '28px', borderRadius: '5px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={14} color="#2563eb" /></div>
                  <div style={{ width: '28px', height: '28px', borderRadius: '5px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Tag size={14} color="#64748b" /></div>
                  <div style={{ width: '28px', height: '28px', borderRadius: '5px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone size={14} color="#64748b" /></div>
                </div>
                <div className="zoho-browser-main">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>Growth Operations</div>
                    <div style={{ fontSize: '10px', color: '#10b981', backgroundColor: '#ecfdf5', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Active</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ padding: '12px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                      <div style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Recoverable Revenue</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px', color: '#0f172a' }}>₹4,12,050</div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                      <div style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Reactivation Rate</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px', color: '#2563eb' }}>28.4%</div>
                    </div>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Suggested Action Pipeline</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#475569', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ color: '#ef4444', fontWeight: 700 }}>● High</span>
                      <span>Lost Champions reactivation</span>
                      <span style={{ marginLeft: 'auto', fontWeight: 600 }}>₹1.8M</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#475569', padding: '6px 0' }}>
                      <span style={{ color: '#f59e0b', fontWeight: 700 }}>● Med</span>
                      <span>Chennai category affinity boost</span>
                      <span style={{ marginLeft: 'auto', fontWeight: 600 }}>₹450K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* WHAT HAPPENS INSIDE XENIA SECTION */}
      <section className="zoho-section scroll-reveal" style={{ borderTop: '1px solid #e2e8f0', paddingBottom: '40px' }}>
        <h2 className="zoho-h2">What Happens Inside Xenia?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginTop: '30px' }} className="xenia-inside-grid">
          <div className="zoho-feature-card" style={{ padding: '24px 20px', minHeight: '140px' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#e31a22', marginBottom: '8px' }}>01</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Discover</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.45' }}>Find customer groups that need attention.</p>
          </div>
          <div className="zoho-feature-card" style={{ padding: '24px 20px', minHeight: '140px' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#e31a22', marginBottom: '8px' }}>02</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Plan</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.45' }}>Build targeted campaigns around business goals.</p>
          </div>
          <div className="zoho-feature-card" style={{ padding: '24px 20px', minHeight: '140px' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#e31a22', marginBottom: '8px' }}>03</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Review</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.45' }}>Validate audiences, content, and promotions.</p>
          </div>
          <div className="zoho-feature-card" style={{ padding: '24px 20px', minHeight: '140px' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#e31a22', marginBottom: '8px' }}>04</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Launch</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.45' }}>Reach shoppers across multiple channels.</p>
          </div>
          <div className="zoho-feature-card" style={{ padding: '24px 20px', minHeight: '140px' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#e31a22', marginBottom: '8px' }}>05</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Measure</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.45' }}>Track engagement, purchases, and outcomes.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 – KEY CAPABILITIES */}
      <section id="features" className="zoho-section zoho-section-alt scroll-reveal">
        <h2 className="zoho-h2">What makes Xenia CRM essential?</h2>
        <p className="zoho-body" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px', fontSize: '16px' }}>
          Traditional CRM platforms capture data but leave strategy to guesswork. Xenia unifies insight, workflow, and delivery.
        </p>
        
        <div className="zoho-features-grid">
          <div className="zoho-feature-card">
            <div className="zoho-feature-icon"><Flame size={20} /></div>
            <h3 className="zoho-feature-title">Suggested Actions</h3>
            <p className="zoho-body">
              Automated cohort discovery indexes customer reactivation signals. Instantly uncovers VIP and churn risks.
            </p>
          </div>
          
          <div className="zoho-feature-card">
            <div className="zoho-feature-icon"><Send size={20} /></div>
            <h3 className="zoho-feature-title">Campaign Management</h3>
            <p className="zoho-body">
              Design multi-channel campaigns. Draft layout structures, define rules, and manage all shopper assets side-by-side.
            </p>
          </div>
          
          <div className="zoho-feature-card">
            <div className="zoho-feature-icon"><Tag size={20} /></div>
            <h3 className="zoho-feature-title">Promotion Management</h3>
            <p className="zoho-body">
              Map margins and coupon categories to specific locations. Avoid blank discounting with margin-aware targeting.
            </p>
          </div>
          
          <div className="zoho-feature-card">
            <div className="zoho-feature-icon"><Phone size={20} /></div>
            <h3 className="zoho-feature-title">Voice Campaigns</h3>
            <p className="zoho-body">
              Premium ElevenLabs outbound calling. Reach lost champions in regional languages (Tamil/Hindi) using native script.
            </p>
          </div>
          
          <div className="zoho-feature-card">
            <div className="zoho-feature-icon"><Users size={20} /></div>
            <h3 className="zoho-feature-title">Shopper Intelligence</h3>
            <p className="zoho-body">
              Drill down into individual Shopper Stories. Review purchase timeline records, preferred channels, and RFM details.
            </p>
          </div>
          
          <div className="zoho-feature-card">
            <div className="zoho-feature-icon"><BarChart2 size={20} /></div>
            <h3 className="zoho-feature-title">Campaign Tracking & Revenue Attribution</h3>
            <p className="zoho-body">
              Link communication dispatches to order checkout baskets. Track precise ROI metrics for all running campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 – HOW XENIA WORKS: METRICS PIPELINE FLOWCHART */}
      <section id="how-it-works" className="zoho-section scroll-reveal">
        <h2 className="zoho-h2">Automated Shopper Metrics & Data Lifecycle</h2>
        <p className="zoho-body" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 30px', fontSize: '16px' }}>
          See how Xenia transforms database rows into calculated metrics, targeted campaigns, and clear revenue attribution.
        </p>
        
        <div className="zoho-flowchart-row">
          {/* Step 1: DB */}
          <div className="zoho-flowchart-node">
            <div className="zoho-flowchart-icon-wrapper">
              <Database size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div className="zoho-flowchart-title">Shopper Data</div>
              <div className="zoho-flowchart-desc">
                Secure database storing visit histories and loyalty profiles.
              </div>
            </div>
          </div>
          
          <div className="zoho-flowchart-arrow horizontal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>
          <div className="zoho-flowchart-arrow vertical">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>

          {/* Step 2: Nightly Analysis */}
          <div className="zoho-flowchart-node">
            <div className="zoho-flowchart-icon-wrapper">
              <Activity size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div className="zoho-flowchart-title">Nightly Analysis</div>
              <div className="zoho-flowchart-desc">
                Calculates churn probability and RFM segmentation metrics.
              </div>
            </div>
          </div>
          
          <div className="zoho-flowchart-arrow horizontal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>
          <div className="zoho-flowchart-arrow vertical">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>

          {/* Step 3: Suggested Actions */}
          <div className="zoho-flowchart-node">
            <div className="zoho-flowchart-icon-wrapper">
              <Flame size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div className="zoho-flowchart-title">Suggested Actions</div>
              <div className="zoho-flowchart-desc">
                Automatically flags high-value churn-risk opportunities.
              </div>
            </div>
          </div>
          
          <div className="zoho-flowchart-arrow horizontal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>
          <div className="zoho-flowchart-arrow vertical">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>

          {/* Step 4: Campaign Creation */}
          <div className="zoho-flowchart-node">
            <div className="zoho-flowchart-icon-wrapper">
              <Send size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div className="zoho-flowchart-title">Campaign Creation</div>
              <div className="zoho-flowchart-desc">
                Formulates layouts and margin-safe promotion rules.
              </div>
            </div>
          </div>
          
          <div className="zoho-flowchart-arrow horizontal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>
          <div className="zoho-flowchart-arrow vertical">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>

          {/* Step 5: Dispatch */}
          <div className="zoho-flowchart-node">
            <div className="zoho-flowchart-icon-wrapper">
              <Volume2 size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div className="zoho-flowchart-title">Dispatch</div>
              <div className="zoho-flowchart-desc">
                Outbound voice, WhatsApp, Email, or SMS delivery.
              </div>
            </div>
          </div>
          
          <div className="zoho-flowchart-arrow horizontal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>
          <div className="zoho-flowchart-arrow vertical">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>

          {/* Step 6: Tracking */}
          <div className="zoho-flowchart-node">
            <div className="zoho-flowchart-icon-wrapper">
              <CheckCircle2 size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div className="zoho-flowchart-title">Engagement Tracking</div>
              <div className="zoho-flowchart-desc">
                Monitors delivery status and real-time coupon redemptions.
              </div>
            </div>
          </div>
          
          <div className="zoho-flowchart-arrow horizontal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>
          <div className="zoho-flowchart-arrow vertical">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#1f57e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="zoho-arrow-path" />
            </svg>
          </div>

          {/* Step 7: Revenue */}
          <div className="zoho-flowchart-node">
            <div className="zoho-flowchart-icon-wrapper">
              <BarChart2 size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div className="zoho-flowchart-title">Revenue Attribution</div>
              <div className="zoho-flowchart-desc">
                Attributes store checkout sales to outbound dispatches.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 – CAMPAIGN WORKSPACE SHOWCASE */}
      <section id="showcase" className="zoho-section zoho-section-alt scroll-reveal">
        <h2 className="zoho-h2">Inside the Campaign Workspace</h2>
        <p className="zoho-body" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px', fontSize: '16px' }}>
          Review layouts, test messaging variants, and examine cross-channel customer previews before dispatch.
        </p>
        
        <div className="zoho-showcase-tabs">
          <button 
            className={`zoho-showcase-tab ${activeShowcaseTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveShowcaseTab('create')}
          >
            Campaign Creation
          </button>
          <button 
            className={`zoho-showcase-tab ${activeShowcaseTab === 'whatsapp' ? 'active' : ''}`}
            onClick={() => setActiveShowcaseTab('whatsapp')}
          >
            WhatsApp Preview
          </button>
          <button 
            className={`zoho-showcase-tab ${activeShowcaseTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveShowcaseTab('email')}
          >
            Email Preview
          </button>
          <button 
            className={`zoho-showcase-tab ${activeShowcaseTab === 'sms' ? 'active' : ''}`}
            onClick={() => setActiveShowcaseTab('sms')}
          >
            SMS Preview
          </button>
          <button 
            className={`zoho-showcase-tab ${activeShowcaseTab === 'tracking' ? 'active' : ''}`}
            onClick={() => setActiveShowcaseTab('tracking')}
          >
            Tracking Dashboard
          </button>
        </div>

        <div className="zoho-hero-grid" style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div>
            {activeShowcaseTab === 'create' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0c1427', marginBottom: '12px' }}>Draft and target in one interface</h3>
                <p className="zoho-body" style={{ marginBottom: '20px' }}>
                  Define your outreach campaign goals and let Xenia CRM map customer demographics, category affinities, and promotional parameters into structured templates.
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568', lineHeight: '1.8' }}>
                  <li>Auto-populate target segment counts</li>
                  <li>Incorporate active promo code rules</li>
                  <li>Draft text templates with dynamic shopper variables</li>
                </ul>
              </div>
            )}
            
            {activeShowcaseTab === 'whatsapp' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0c1427', marginBottom: '12px' }}>Interactive WhatsApp Message Previews</h3>
                <p className="zoho-body" style={{ marginBottom: '20px' }}>
                  Preview high-deliverability conversational templates exactly as they will look on shoppers' mobile phones, including bold formatting and custom CTA buttons.
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568', lineHeight: '1.8' }}>
                  <li>Simulate phone viewport renders</li>
                  <li>Preview localized name placeholder variables</li>
                  <li>Check coupon call-to-action click paths</li>
                </ul>
              </div>
            )}
            
            {activeShowcaseTab === 'email' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0c1427', marginBottom: '12px' }}>Rich HTML Email Templates</h3>
                <p className="zoho-body" style={{ marginBottom: '20px' }}>
                  Ensure proper email structure, subject line variants, and branding elements are fully configured before launching bulk newsletter dispatches.
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568', lineHeight: '1.8' }}>
                  <li>Structured header and footer zones</li>
                  <li>Verify coupon copy highlighting</li>
                  <li>A/B test subject headers</li>
                </ul>
              </div>
            )}
            
            {activeShowcaseTab === 'sms' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0c1427', marginBottom: '12px' }}>Short, High-Impact SMS Copy</h3>
                <p className="zoho-body" style={{ marginBottom: '20px' }}>
                  Draft character-count-restricted SMS outreach messages designed for fast delivery and high click rates.
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568', lineHeight: '1.8' }}>
                  <li>Character limit safety guidelines (160 cap)</li>
                  <li>Dynamic short links inclusion</li>
                  <li>Urgent but professional win-back copy</li>
                </ul>
              </div>
            )}
            
            {activeShowcaseTab === 'tracking' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0c1427', marginBottom: '12px' }}>Attribution funnel dashboard</h3>
                <p className="zoho-body" style={{ marginBottom: '20px' }}>
                  Monitor campaign dispatch lifecycles from transmission and delivery reports to final order attribution.
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568', lineHeight: '1.8' }}>
                  <li>Check CTR and open ratios</li>
                  <li>Trace coupon code usage counts</li>
                  <li>Attributed campaign ROI metric summaries</li>
                </ul>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* Visual representation of the tab's output */}
            <div style={{ width: '100%', maxWidth: '340px', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '16px', backgroundColor: '#f8fafc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              {activeShowcaseTab === 'create' && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Draft Workspace</div>
                  <div style={{ padding: '10px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12.5px', color: '#334155' }}>
                    <strong>Goal:</strong> VIP Electronics Reactivation<br />
                    <strong>Code:</strong> VIPWIN25<br />
                    <strong>Channel:</strong> WhatsApp
                  </div>
                </div>
              )}
              {activeShowcaseTab === 'whatsapp' && (
                <div style={{ background: '#e5ddd5', borderRadius: '8px', padding: '12px', minHeight: '180px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '11px', alignSelf: 'flex-start', maxWidth: '85%', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                    <p style={{ margin: 0, color: '#111827' }}>Hey Ramesh! 👋 Get <strong>25% off</strong> on Electronics. Use code <strong>VIPWIN25</strong>. Shop now!</p>
                    <div style={{ marginTop: '6px', borderTop: '1px solid #f1f5f9', paddingTop: '4px', textAlign: 'center', color: '#34b7f1', fontWeight: 600 }}>Shop Now</div>
                  </div>
                </div>
              )}
              {activeShowcaseTab === 'email' && (
                <div style={{ backgroundColor: '#ffffff', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px', minHeight: '180px' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '6px', marginBottom: '8px', fontSize: '10px', color: '#64748b' }}>
                    <strong>Subject:</strong> Exclusive VIP Offer Inside 🎁
                  </div>
                  <div style={{ fontSize: '11px', color: '#334155' }}>
                    <p>Dear Customer,</p>
                    <p style={{ margin: '6px 0' }}>As a loyal VIP, enjoy a special discount on our catalog. Use promo code <strong>VIPWIN25</strong>.</p>
                  </div>
                </div>
              )}
              {activeShowcaseTab === 'sms' && (
                <div style={{ padding: '12px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', minHeight: '120px' }}>
                  <div style={{ fontSize: '9px', color: '#64748b', marginBottom: '6px' }}>Message Preview (102 chars)</div>
                  <div style={{ padding: '8px', backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: '11px', color: '#1e293b' }}>
                    Xenia: We miss you! Enjoy 25% off categories using code VIPWIN25 at checkout: xn.co/vip
                  </div>
                </div>
              )}
              {activeShowcaseTab === 'tracking' && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Funnel Metrics</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Delivered</span><strong>98.2%</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Open Rate</span><strong>84.1%</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Click-Through (CTR)</span><strong>22.4%</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '6px', marginTop: '4px' }}><span style={{ color: '#16a34a', fontWeight: 600 }}>Attributed Revenue</span><strong>₹1,42,000</strong></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 – VOICE CAMPAIGNS (Highlighted Section) */}
      <section id="voice" className="zoho-section zoho-highlight-section scroll-reveal">
        <div style={{ textAlign: 'center' }}>
          <span className="zoho-featured-badge">Featured Strategy Option</span>
          <h2 className="zoho-h2">Premium Regional Voice Strategy</h2>
          <p className="zoho-body" style={{ maxWidth: '600px', margin: '0 auto 40px', fontSize: '16px' }}>
            Outbound calling with high-quality ElevenLabs voice synthesis. Target VIPs in regional scripts without generic robotic text-to-speech.
          </p>
        </div>
        
        <div className="zoho-voice-workflow">
          <div className="zoho-voice-step">
            <div style={{ padding: '8px', backgroundColor: '#eff6ff', borderRadius: '5px' }}><Users size={18} color="#2563eb" /></div>
            <strong style={{ fontSize: '14px', color: '#0f172a' }}>1. Target Cohorts</strong>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Champion / Lost Champions</span>
          </div>
          
          <div className="zoho-voice-step">
            <div style={{ padding: '8px', backgroundColor: '#eff6ff', borderRadius: '5px' }}><FileText size={18} color="#2563eb" /></div>
            <strong style={{ fontSize: '14px', color: '#0f172a' }}>2. Script Draft</strong>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Tamil / Hindi native scripts</span>
          </div>
          
          <div className="zoho-voice-step">
            <div style={{ padding: '8px', backgroundColor: '#eff6ff', borderRadius: '5px' }}><Volume2 size={18} color="#2563eb" /></div>
            <strong style={{ fontSize: '14px', color: '#0f172a' }}>3. Voice Preview</strong>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Test speech pace and tone</span>
          </div>
          
          <div className="zoho-voice-step">
            <div style={{ padding: '8px', backgroundColor: '#eff6ff', borderRadius: '5px' }}><Play size={18} color="#2563eb" /></div>
            <strong style={{ fontSize: '14px', color: '#0f172a' }}>4. Outbound Dial</strong>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Simulate real connection logs</span>
          </div>
          
          <div className="zoho-voice-step">
            <div style={{ padding: '8px', backgroundColor: '#eff6ff', borderRadius: '5px' }}><CheckCircle2 size={18} color="#2563eb" /></div>
            <strong style={{ fontSize: '14px', color: '#0f172a' }}>5. Tracking</strong>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Call lifecycle funnel log</span>
          </div>
        </div>
      </section>

      {/* SECTION 7 – WHY XENIA */}
      <section id="why-xenia" className="zoho-section zoho-section-alt scroll-reveal">
        <h2 className="zoho-h2">Designed for trust and clarity</h2>
        <p className="zoho-body" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 20px', fontSize: '16px' }}>
          Compare Xenia CRM against traditional black-box platforms.
        </p>
        
        <div className="zoho-table-responsive">
          <table className="zoho-comp-table">
            <thead>
              <tr>
                <th>CRITERION</th>
                <th>XENIA CRM WORKFLOW</th>
                <th>TRADITIONAL MARKETING TOOLS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Explainable Decisions</strong></td>
                <td>Clear context reasons for customer selections and metrics.</td>
                <td>Opaque algorithms recommending bulk cohorts with zero visibility.</td>
              </tr>
              <tr>
                <td><strong>Human Approval</strong></td>
                <td>Marketers review, edit, and approve every generated campaign.</td>
                <td>Risky auto-blast integrations that can dispatch incorrect offers.</td>
              </tr>
              <tr>
                <td><strong>Promotion Control</strong></td>
                <td>Checks margins, cities, and categories dynamically.</td>
                <td>Flat discount codes that erode product margins indiscriminately.</td>
              </tr>
              <tr>
                <td><strong>Voice Outreach</strong></td>
                <td>High-quality regional voice (Tamil/Hindi) calling options.</td>
                <td>Spammy SMS/emails that customers filter automatically.</td>
              </tr>
              <tr>
                <td><strong>Attribution Funnel</strong></td>
                <td>Tracks dispatches directly to checkout order items.</td>
                <td>Vague pixel estimates with no direct checkout mapping.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 8 – FINAL CTA (Black Background banner) */}
      <section className="zoho-dark-cta scroll-reveal">
        <h2 className="zoho-dark-cta-title">Engage your shoppers. Grow your business.</h2>
        <p className="zoho-dark-cta-subtitle">15-day free trial. No credit card required.</p>
        <div>
          <button className="zoho-dark-btn-red" onClick={onLaunch}>
            Sign Up For Free
          </button>
          <button className="zoho-dark-btn-blue-outline" onClick={() => scrollToSection('features')}>
            Book A Demo
          </button>
        </div>
      </section>

      {/* SECTION 9 – FOOTER */}
      <footer className="zoho-footer scroll-reveal">
        <div className="zoho-footer-grid">
          <div>
            <div className="zoho-nav-logo" style={{ marginBottom: '16px' }}>
              <img src="/logo.png" alt="Xenia CRM" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              <span>Xenia CRM</span>
            </div>
            <p className="zoho-body" style={{ fontSize: '13px', color: '#64748b' }}>
              Enterprise shopper CRM system optimized for margin-aware promotion management, campaign tracking, and regional voice strategy.
            </p>
          </div>
          
          <div>
            <h4 className="zoho-footer-title">Products</h4>
            <span className="zoho-footer-link" onClick={() => scrollToSection('features')}>Features</span>
            <span className="zoho-footer-link" onClick={() => scrollToSection('showcase')}>Campaigns</span>
            <span className="zoho-footer-link" onClick={() => scrollToSection('voice')}>Voice Campaigns</span>
          </div>
          
          <div>
            <h4 className="zoho-footer-title">Resources</h4>
            <span className="zoho-footer-link" onClick={() => scrollToSection('how-it-works')}>How it works</span>
            <span className="zoho-footer-link" onClick={() => scrollToSection('why-xenia')}>Why Xenia</span>
            <a className="zoho-footer-link" href="https://github.com" target="_blank" rel="noreferrer">GitHub Project</a>
          </div>
          
          <div>
            <h4 className="zoho-footer-title">Enterprise</h4>
            <span className="zoho-footer-link" onClick={onLaunch}>Sign In</span>
            <span className="zoho-footer-link" onClick={onLaunch}>Launch App</span>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '40px', paddingTop: '20px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          © {new Date().getFullYear()} Xenia CRM. All rights reserved. Built for professional retail shopper growth.
        </div>
      </footer>
    </div>
  );
}
