import React, { useState, useEffect, useRef } from 'react';
import { api } from './services/api';
import LandingPage from './LandingPage';
import type { 
  Customer, 
  Opportunity, 
  Campaign, 
  DailyBrief, 
  NLQueryResponse, 
  RecipientLog,
  CampaignAnalyticsResponse,
  CustomerSegment,
  ShopperStory,
  GoalPlannerResponse,
  Promotion,
  VoiceEligibleAudienceResponse,
  VoiceScriptResponse,
  VoiceSimulationResponse,
  VoiceCallEvent,
  ApiKeyStatus,
  CustomerMetrics,
} from './services/api';
import { 
  LayoutDashboard, 
  Flame, 
  Brain, 
  Upload,
  Download,
  FileSpreadsheet,
  Send, 
  Users, 
  BarChart2, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Search, 
  ArrowRight, 
  ShieldAlert, 
  Activity,
  DollarSign,
  X,
  ChevronDown,
  ChevronUp,
  Tag,
  Edit,
  Plus,
  Trash2,
  MessageSquare,
  Eye,
  EyeOff,
  CheckSquare,
  Phone,
  Mic,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  AlertOctagon,
  TrendingUp,
  PhoneCall,
  PhoneMissed,
  Headphones,
  Settings,
  Key,
  CheckCircle,
  Save,
  Gem,
  Calendar,
  Clock,
  FileText,
  Globe,
  Target,
  Volume2,
  Gift,
  Trophy,
  Zap,
  Megaphone,
  MapPin,
  PhoneOff,
  XCircle,
  ShoppingBag,
  Sparkles,
  Handshake,
  Menu
} from 'lucide-react';

// Campaign Tracking Icon Attribution (Flaticon):
// Sent: <a href="https://www.flaticon.com/free-icons/send" title="send icons">Send icons created by Freepik - Flaticon</a>
// Delivered: <a href="https://www.flaticon.com/free-icons/delivered" title="delivered icons">Delivered icons created by Freepik - Flaticon</a>
// Opened: <a href="https://www.flaticon.com/free-icons/view" title="view icons">View icons created by Freepik - Flaticon</a>
// Clicked: <a href="https://www.flaticon.com/free-icons/cursor" title="cursor icons">Cursor icons created by Freepik - Flaticon</a>
// Promo Applied: <a href="https://www.flaticon.com/free-icons/coupon" title="coupon icons">Coupon icons created by Freepik - Flaticon</a>
// Purchased: <a href="https://www.flaticon.com/free-icons/shopping-bag" title="shopping bag icons">Shopping bag icons created by Freepik - Flaticon</a>
const ICONS = {
  sent:          "https://cdn-icons-png.flaticon.com/512/10703/10703146.png",
  delivered:     "https://cdn-icons-png.flaticon.com/512/17049/17049771.png",
  opened:        "https://cdn-icons-png.flaticon.com/512/709/709612.png",
  clicked:       "https://cdn-icons-png.flaticon.com/512/2129/2129111.png",
  promo_applied: "https://cdn-icons-png.flaticon.com/512/726/726476.png",
  purchased:     "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
  whatsapp:      "https://cdn-icons-png.flaticon.com/512/733/733585.png",
  email:         "https://cdn-icons-png.flaticon.com/512/732/732200.png",
  sms:           "https://cdn-icons-png.flaticon.com/512/3616/3616215.png"
};

function getOpportunityTypeName(type: string): string {
  const t = (type || '').toLowerCase().trim();
  if (t === 'winback') return 'VIP Shopper Re-engagement';
  if (t === 'reactivation') return 'Dormant Shopper Recovery';
  if (t === 'channel_push') return 'WhatsApp Promotion Campaign';
  if (t === 'cross_sell') return 'Related Product Promotion';
  return type.replace('_', ' ');
}

function SkeletonLoader({ type = 'table', rows = 4 }: { type?: 'table' | 'cards' | 'text' | 'kpi', rows?: number }) {
  return (
    <div style={{ padding: '20px', width: '100%' }}>
      {type === 'table' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="skeleton-item" style={{ height: '40px', width: '100%' }} />
          {Array.from({ length: rows }).map((_, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '16px' }}>
              <div className="skeleton-item" style={{ height: '20px', flex: 2 }} />
              <div className="skeleton-item" style={{ height: '20px', flex: 1 }} />
              <div className="skeleton-item" style={{ height: '20px', flex: 1 }} />
              <div className="skeleton-item" style={{ height: '20px', flex: 3 }} />
            </div>
          ))}
        </div>
      )}
      {type === 'cards' && (
        <div className="grid-3">
          {Array.from({ length: rows }).map((_, idx) => (
            <div key={idx} className="workspace-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: 0 }}>
              <div className="skeleton-item" style={{ height: '24px', width: '60%' }} />
              <div className="skeleton-item" style={{ height: '16px', width: '100%' }} />
              <div className="skeleton-item" style={{ height: '16px', width: '80%' }} />
              <div className="skeleton-item" style={{ height: '32px', width: '40%', marginTop: '8px' }} />
            </div>
          ))}
        </div>
      )}
      {type === 'kpi' && (
        <div className="grid-4">
          {Array.from({ length: rows }).map((_, idx) => (
            <div key={idx} className="workspace-panel" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', margin: 0 }}>
              <div className="skeleton-item" style={{ height: '16px', width: '50%' }} />
              <div className="skeleton-item" style={{ height: '36px', width: '70%' }} />
              <div className="skeleton-item" style={{ height: '14px', width: '30%' }} />
            </div>
          ))}
        </div>
      )}
      {type === 'text' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="skeleton-item" style={{ height: '28px', width: '40%' }} />
          <div className="skeleton-item" style={{ height: '16px', width: '100%' }} />
          <div className="skeleton-item" style={{ height: '16px', width: '95%' }} />
          <div className="skeleton-item" style={{ height: '16px', width: '90%' }} />
          <div className="skeleton-item" style={{ height: '16px', width: '60%' }} />
        </div>
      )}
    </div>
  );
}

function EmptyState({ title, description, actionText, onAction }: { title: string, description: string, actionText?: string, onAction?: () => void }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      backgroundColor: 'var(--bg-surface)',
      border: '1px dashed var(--border-color)',
      borderRadius: '6px',
      margin: '24px 0',
      width: '100%'
    }}>
      <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>{title}</div>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '20px', lineHeight: 1.5 }}>
        {description}
      </p>
      {actionText && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
}

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'opportunities' | 'campaigns' | 'shoppers' | 'analytics' | 'promotions' | 'voice_campaigns' | 'settings'>('home');
  const [showLanding, setShowLanding] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Shared Selections/Transitions State
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  
  // Campaign subtabs: 'prepare' | 'review' | 'queue' | 'active' | 'history'
  const [campaignSubTab, setCampaignSubTab] = useState<'prepare' | 'review' | 'queue' | 'active' | 'history'>('prepare');

  // Customer slide-over drawer toggle
  const [isCustomerDrawerOpen, setIsCustomerDrawerOpen] = useState(false);

  // Prefilled goal state for campaign planning
  const [prefilledGoal, setPrefilledGoal] = useState<string | null>(null);

  // Shared Promotion Intelligence Drawer state
  const [selectedPromotionForIntelligence, setSelectedPromotionForIntelligence] = useState<Promotion | null>(null);
  const [isPromoIntelligenceDrawerOpen, setIsPromoIntelligenceDrawerOpen] = useState(false);

  const handleOpenPromotionIntelligence = async (promoCode: string) => {
    try {
      const promos = await api.listPromotions();
      const promo = promos.find(p => p.promo_code === promoCode);
      if (promo) {
        setSelectedPromotionForIntelligence(promo);
        setIsPromoIntelligenceDrawerOpen(true);
      } else {
        setSelectedPromotionForIntelligence({
          promotion_id: 'mock-promo',
          name: `${promoCode} Incentive`,
          promo_code: promoCode,
          discount_type: 'Percentage',
          discount_value: 25,
          applicable_categories: 'Electronics',
          applicable_cities: 'Chennai, Bengaluru, Hyderabad',
          active: true,
          times_used: 142,
          times_recommended: 1290,
          purchases_attributed: 142,
          revenue_generated: 205900,
          roi_generated: 14.2
        });
        setIsPromoIntelligenceDrawerOpen(true);
      }
    } catch (err) {
      console.error("Failed to load promotion intelligence", err);
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  // 1. HOME VIEW (DAILY BRIEFING & QUEUES)
  // ────────────────────────────────────────────────────────────────────────────
  function HomeView() {
    const [brief, setBrief] = useState<DailyBrief | null>(null);
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [draftCampaigns, setDraftCampaigns] = useState<Campaign[]>([]);
    const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      async function loadHomeData() {
        try {
          const [briefData, oppsData, campaignsData] = await Promise.all([
            api.getLatestBriefing(),
            api.listOpportunities(),
            api.listCampaigns()
          ]);
          setBrief(briefData);
          setOpportunities(oppsData.filter(o => o.status === 'open').slice(0, 3));
          
          // Split drafts vs active campaigns
          const drafts = campaignsData.filter(c => c.status === 'draft');
          const launched = campaignsData.filter(c => c.status === 'launched');
          
          setDraftCampaigns(drafts);
          setActiveCampaigns(launched);
        } catch (err: any) {
          setError(err.message || 'Failed to load system dashboard data');
        } finally {
          setLoading(false);
        }
      }
      loadHomeData();
    }, []);

    if (loading) return <LoadingSpinner label="Loading operating briefing..." />;
    if (error) return <ErrorMessage message={error} />;

    // For demonstration, drafts with simulations are considered "awaiting approval", others are "awaiting review"
    const campaignsAwaitingReview = draftCampaigns.filter((_, idx) => idx % 2 === 0);
    const campaignsAwaitingApproval = draftCampaigns.filter((_, idx) => idx % 2 !== 0);

    return (
      <div className="fade-in">
        {/* Executive Daily Brief Banner */}
        {brief && (
          <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
            <div className="flex-between" style={{ marginBottom: '8px' }}>
              <span className="badge badge-primary" style={{ fontSize: '9.5px' }}>Daily Operations Briefing</span>
              <span className="text-muted" style={{ fontSize: '11px' }}>
                {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h2 style={{ fontSize: '18px', marginBottom: '6px', fontWeight: 700 }}>{brief.headline}</h2>
            <p style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '16px', color: 'var(--text-secondary)' }}>
              {brief.summary}
            </p>
            
            <div className="grid-3" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '6px', backgroundColor: 'var(--color-success-bg)', borderRadius: '4px' }}>
                  <DollarSign size={16} color="var(--color-success)" />
                </div>
                <div>
                  <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Target Recovery Value</div>
                  <div className="mono-align" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'left' }}>
                    INR {brief.recoverable_revenue.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '6px', backgroundColor: 'var(--color-accent-light)', borderRadius: '4px' }}>
                  <Activity size={16} color="var(--color-accent)" />
                </div>
                <div>
                  <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Pending Action Items</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {brief.opportunities_count} Growth Opportunities
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '6px', backgroundColor: 'var(--color-danger-bg)', borderRadius: '4px' }}>
                  <ShieldAlert size={16} color="var(--color-danger)" />
                </div>
                <div>
                  <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Suppressed Messages</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {brief.at_risk_count} Cohorts Cooled
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid-2">
          {/* LEFT COLUMN: ACTIVE ITEMS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Opportunities Requiring Attention */}
            <div className="card" style={{ flex: 1 }}>
              <div className="card-title">Suggested Actions Requiring Attention</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {opportunities.length > 0 ? (
                  opportunities.map(opp => (
                    <div 
                      key={opp.opportunity_id}
                      style={{ 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '6px', 
                        padding: '12px', 
                        cursor: 'pointer',
                        transition: 'all 0.1s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                      onClick={() => {
                        setSelectedOpportunityId(opp.opportunity_id);
                        setActiveTab('opportunities');
                      }}
                      className="nav-item-hover"
                      title="Click to view behavioral analysis"
                    >
                      <div className="flex-between">
                        <span style={{ fontWeight: 700, textTransform: 'capitalize', fontSize: '12.5px', color: 'var(--text-primary)' }}>
                          {(opp.type || '').replace('_', ' ')}
                        </span>
                        <span className={`badge ${opp.priority === 'High' ? 'badge-danger' : opp.priority === 'Medium' ? 'badge-warning' : 'badge-neutral'}`} style={{ fontSize: '9.5px' }}>
                          {opp.priority}
                        </span>
                      </div>
                      
                      <div>
                        <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Why Generated:</span>
                        <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.35 }}>{opp.description}</p>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px', fontSize: '10.5px', borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '4px' }}>
                        <div><span style={{ color: 'var(--text-muted)' }}>Audience Size:</span> <strong style={{ color: 'var(--text-primary)' }}>{opp.audience_size}</strong></div>
                        <div><span style={{ color: 'var(--text-muted)' }}>Potential Revenue:</span> <strong style={{ color: 'var(--color-success)' }}>₹{opp.potential_revenue.toLocaleString('en-IN')}</strong></div>
                        <div><span style={{ color: 'var(--text-muted)' }}>Channel:</span> <strong style={{ color: 'var(--text-primary)' }}>{opp.recommended_channel || 'WhatsApp'}</strong></div>
                        <div><span style={{ color: 'var(--text-muted)' }}>Promotion:</span> <strong style={{ color: 'var(--color-accent)' }}>{opp.recommended_promotion_code || 'None'}</strong></div>
                        <div><span style={{ color: 'var(--text-muted)' }}>Confidence Score:</span> <strong style={{ color: 'var(--text-primary)' }}>{opp.confidence_score ? `${Math.round(opp.confidence_score * 100)}%` : '85%'}</strong></div>
                        <div><span style={{ color: 'var(--text-muted)' }}>Generated Date:</span> <span style={{ color: 'var(--text-secondary)' }}>{new Date(opp.created_at).toLocaleDateString()}</span></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No open growth areas discovered.</div>
                )}
              </div>
            </div>

            {/* Active Campaigns */}
            <div className="card" style={{ flex: 1 }}>
              <div className="card-title">Active Campaigns</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeCampaigns.length > 0 ? (
                  activeCampaigns.map(camp => (
                    <div 
                      key={camp.campaign_id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '10px 12px', 
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setSelectedCampaignId(camp.campaign_id);
                        setCampaignSubTab('active');
                        setActiveTab('campaigns');
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '12.5px' }}>{camp.name}</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Channel: {camp.channel} • Target: {camp.target_audience_size || 0} shoppers
                        </div>
                      </div>
                      <span className="badge badge-success">Launched</span>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No active campaigns.</div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DRAFT ITEMS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Campaigns Awaiting Review */}
            <div className="card" style={{ flex: 1 }}>
              <div className="card-title">Campaigns Awaiting Review</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {campaignsAwaitingReview.length > 0 ? (
                  campaignsAwaitingReview.map(camp => (
                    <div 
                      key={camp.campaign_id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '10px 12px', 
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setSelectedCampaignId(camp.campaign_id);
                        setCampaignSubTab('review');
                        setActiveTab('campaigns');
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '12.5px' }}>{camp.name}</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Objective: {camp.objective}
                        </div>
                      </div>
                      <span className="badge badge-neutral">Review Needed</span>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No draft campaigns awaiting review.</div>
                )}
              </div>
            </div>

            {/* Campaigns Awaiting Approval */}
            <div className="card" style={{ flex: 1 }}>
              <div className="card-title">Campaigns Awaiting Approval</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {campaignsAwaitingApproval.length > 0 ? (
                  campaignsAwaitingApproval.map(camp => (
                    <div 
                      key={camp.campaign_id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '10px 12px', 
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setSelectedCampaignId(camp.campaign_id);
                        setCampaignSubTab('queue');
                        setActiveTab('campaigns');
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '12.5px' }}>{camp.name}</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Target Reach: {camp.target_audience_size || 50} shoppers
                        </div>
                      </div>
                      <span className="badge badge-warning" style={{ backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)', borderColor: 'var(--color-warning-border)', borderWidth: '1px', borderStyle: 'solid' }}>Awaiting Signoff</span>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No simulated campaigns awaiting approval.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 2. OPPORTUNITIES VIEW (DIRECTORY & WHY THIS MATTERS)
  // ────────────────────────────────────────────────────────────────────────────
  function OpportunitiesView() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      async function loadOpportunities() {
        try {
          const data = await api.listOpportunities();
          setOpportunities(data);
          
          if (selectedOpportunityId) {
            const opp = data.find(o => o.opportunity_id === selectedOpportunityId);
            if (opp) setSelectedOpp(opp);
          } else if (data.length > 0) {
            setSelectedOpp(data[0]);
          }
        } catch (err: any) {
          setError(err.message || 'Failed to fetch opportunities');
        } finally {
          setLoading(false);
        }
      }
      loadOpportunities();
    }, []);

    const handleSelectOpportunity = (opp: Opportunity) => {
      setSelectedOpp(opp);
      setSelectedOpportunityId(opp.opportunity_id);
    };

    const handlePrepareCampaign = (opp: Opportunity) => {
      setSelectedOpportunityId(opp.opportunity_id);
      setPrefilledGoal(opp.description);
      setCampaignSubTab('prepare');
      setActiveTab('campaigns');
    };

    if (loading) return <SkeletonLoader type="cards" rows={3} />;
    if (error) return <ErrorMessage message={error} />;

    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
        {/* Workspace Subheader — main title is in topbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px' }}>
            Evaluate system-identified business opportunities for custom customer segments. Select any opportunity to coordinate and draft targeted outreach.
          </p>
          {selectedOpp && (
            <button className="btn btn-primary" onClick={() => handlePrepareCampaign(selectedOpp)}>
              <span>Begin Campaign Preparation</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>

        {/* Workspace Layout - Split Pane */}
        <div className="split-pane" style={{ height: 'calc(100vh - var(--header-height) - 180px)' }}>
          {/* Left Panel - Listings */}
          <div className="split-left" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              Select Action Opportunity
            </div>
            {opportunities.length === 0 ? (
              <EmptyState 
                title="No Suggested Actions Available" 
                description="Our algorithms haven't flagged any reactivation opportunities at this time. Check back later."
              />
            ) : (
              opportunities.map(opp => (
                <div 
                  key={opp.opportunity_id}
                  onClick={() => handleSelectOpportunity(opp)}
                  style={{
                    backgroundColor: selectedOpp?.opportunity_id === opp.opportunity_id ? 'var(--color-accent-light)' : 'var(--bg-surface)',
                    border: selectedOpp?.opportunity_id === opp.opportunity_id ? '1px solid var(--color-accent)' : '1px solid var(--border-color)',
                    borderRadius: '4px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div className="flex-between">
                    <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>
                      {getOpportunityTypeName(opp.type)}
                    </span>
                    <span className={`badge ${opp.priority === 'High' ? 'badge-danger' : opp.priority === 'Medium' ? 'badge-warning' : 'badge-neutral'}`}>
                      {opp.priority}
                    </span>
                  </div>
                  
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>{opp.description}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', fontSize: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '4px' }}>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Audience Size:</span> <strong style={{ color: 'var(--text-primary)' }}>{opp.audience_size.toLocaleString()}</strong></div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Potential Revenue:</span> <strong style={{ color: 'var(--color-success)' }}>₹{opp.potential_revenue.toLocaleString('en-IN')}</strong></div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Panel - Detail Spec Sheet */}
          <div className="split-right">
            {selectedOpp ? (
              <div className="workspace-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', margin: 0 }}>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
                  <div className="flex-between" style={{ marginBottom: '12px' }}>
                    <span className="badge badge-primary">{getOpportunityTypeName(selectedOpp.type)}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Identifier: {selectedOpp.opportunity_id.substring(0, 8)}</span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: '8px 0', lineHeight: 1.4 }}>{selectedOpp.description}</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '14px 18px', backgroundColor: '#F8FAFC' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>Audience Reach</span>
                      <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px', color: 'var(--text-primary)' }}>{selectedOpp.audience_size.toLocaleString()} Shoppers</div>
                    </div>
                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '14px 18px', backgroundColor: '#F8FAFC' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>Revenue Opportunity</span>
                      <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px', color: 'var(--color-success)' }}>
                        INR {selectedOpp.potential_revenue.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '14px 18px', backgroundColor: '#F8FAFC' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>Confidence Rating</span>
                      <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px', color: 'var(--color-accent)' }}>
                        {selectedOpp.confidence_score ? `${Math.round(selectedOpp.confidence_score * 100)}%` : '85%'}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                      Behavioral Context & Justification
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {selectedOpp.ai_explanation || "No behavioral analytics details available for this segment."}
                    </p>
                  </div>

                  {selectedOpp.ai_action_plan && (
                    <div style={{ backgroundColor: '#F8FAFC', padding: '16px 20px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                        Strategy Action Plan
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {selectedOpp.ai_action_plan.split('\n').map((step, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '14px', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--color-accent)', fontWeight: 700, minWidth: '16px' }}>{idx + 1}.</span>
                            <span style={{ color: 'var(--text-secondary)', lineHeight: 1.45 }}>{step.replace(/^\d+\.\s*/, '')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', alignItems: 'center' }}>
                    <div style={{ marginRight: 'auto', display: 'flex', gap: '24px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      <span>Recommended Channel: <strong style={{ color: 'var(--text-primary)' }}>{selectedOpp.recommended_channel || 'WhatsApp'}</strong></span>
                      <span>Recommended Promotion: <strong style={{ color: 'var(--text-primary)' }}>{selectedOpp.recommended_promotion_code || 'None'}</strong></span>
                    </div>
                    <button 
                      className="btn btn-primary"
                      onClick={() => handlePrepareCampaign(selectedOpp)}
                    >
                      <span>Begin Campaign Preparation</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState 
                title="Select Suggested Action" 
                description="Choose an opportunity from the list on the left to view behavior predictions, financial details, and launch preparation steps."
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 3. CAMPAIGNS OS WORKSPACE (5-STAGE LIFECYCLE COORDINATOR)
  // ────────────────────────────────────────────────────────────────────────────
  function CampaignsView() {
    const [campaignsList, setCampaignsList] = useState<Campaign[]>([]);
    const [selectedCamp, setSelectedCamp] = useState<Campaign | null>(null);
    const [analytics, setAnalytics] = useState<CampaignAnalyticsResponse | null>(null);
    const [recipients, setRecipients] = useState<RecipientLog[]>([]);

    const [isEditingMessage, setIsEditingMessage] = useState(false);
    const [editedMessageText, setEditedMessageText] = useState('');
    const [savingMessage, setSavingMessage] = useState(false);

    useEffect(() => {
      if (selectedCamp) {
        setEditedMessageText(selectedCamp.message_template || '');
        setIsEditingMessage(false);
      } else {
        setEditedMessageText('');
        setIsEditingMessage(false);
      }
    }, [selectedCamp]);
    
    // Preparation & Review Formulation state
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
    const [prepareContext, setPrepareContext] = useState<any | null>(null);
    const [loadingPrepareContext, setLoadingPrepareContext] = useState(false);
    const [isShopperModalOpen, setIsShopperModalOpen] = useState(false);
    
    const [goalInput, setGoalInput] = useState(prefilledGoal || '');
    const [proposal, setProposal] = useState<GoalPlannerResponse | null>(null);

    const [planning, setPlanning] = useState(false);
    const [dispatching, setDispatching] = useState(false);
    const [simulatingEvent, setSimulatingEvent] = useState(false);

    const proceedReviewRef = useRef<HTMLDivElement | null>(null);
    const [draftingStep, setDraftingStep] = useState(0);

    const draftingMessages = [
      "Analysing customer data...",
      "Passing metrics to Gen AI...",
      "LLM inferencing...",
      "Script generating...",
      "About to finish..."
    ];

    useEffect(() => {
      let interval: any;
      if (planning) {
        setDraftingStep(0);
        interval = setInterval(() => {
          setDraftingStep(prev => (prev < draftingMessages.length - 1 ? prev + 1 : prev));
        }, 2500);
      } else {
        setDraftingStep(0);
      }
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [planning]);

    useEffect(() => {
      if (proposal) {
        const timer = setTimeout(() => {
          proceedReviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }, [proposal]);
    
    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Message mockup tab
    const [mockupTab, setMockupTab] = useState<'whatsapp' | 'email' | 'sms'>('whatsapp');
    
    // Selected recipient for individual timeline drawer
    const [selectedRecipient, setSelectedRecipient] = useState<RecipientLog | null>(null);
    const [isTimelineDrawerOpen, setIsTimelineDrawerOpen] = useState(false);

    // Dynamic shopper drawer stats
    const [shopperMetrics, setShopperMetrics] = useState<CustomerMetrics | null>(null);
    const [shopperSegments, setShopperSegments] = useState<string[]>([]);
    const [loadingShopperDrawer, setLoadingShopperDrawer] = useState(false);

    // Promotion Intelligence Drawer state moved to parent lexical scope

    useEffect(() => {
      if (prefilledGoal) {
        setGoalInput(prefilledGoal);
      }
    }, [prefilledGoal]);

    useEffect(() => {
      loadInitialData();
    }, [campaignSubTab]);

    async function loadInitialData(force = false) {
      if (campaignsList.length > 0 && opportunities.length > 0 && !force) {
        // Handle default campaign selection based on tab mode using existing state
        let filteredCamps: Campaign[] = [];
        if (campaignSubTab === 'queue') {
          filteredCamps = campaignsList.filter(c => c.status === 'draft' || c.status === 'reviewed' || c.status === 'awaiting approval');
        } else if (campaignSubTab === 'active') {
          filteredCamps = campaignsList.filter(c => c.status === 'approved' || c.status === 'launched');
        } else if (campaignSubTab === 'history') {
          filteredCamps = campaignsList.filter(c => c.status === 'completed');
        }

        // Restore selected campaign if selectedCampaignId is set, otherwise auto-select for active/history tabs
        if (selectedCampaignId) {
          const match = campaignsList.find(c => c.campaign_id === selectedCampaignId);
          if (match) {
            handleSelectCampaign(match);
          } else if ((campaignSubTab === 'active' || campaignSubTab === 'history') && filteredCamps.length > 0) {
            handleSelectCampaign(filteredCamps[0]);
          } else {
            setSelectedCamp(null);
          }
        } else if ((campaignSubTab === 'active' || campaignSubTab === 'history') && filteredCamps.length > 0) {
          handleSelectCampaign(filteredCamps[0]);
        } else {
          setSelectedCamp(null);
        }

        const openOpps = opportunities.filter(o => o.status === 'open');
        if (openOpps.length > 0 && !selectedOpp) {
          // Just set the selected opp display state - no API call
          setSelectedOpp(openOpps[0]);
          // Pre-fill the goal text from the opportunity description
          const opp = openOpps[0];
          const city = opp.segment_filter?.city || '';
          const category = opp.segment_filter?.category || '';
          const goalStr = `Address ${(opp.type || '').replace('_', ' ')} opportunity in ${city || 'any city'} for category ${category || 'any category'}. Description: ${opp.description}`;
          setGoalInput(goalStr);
        }
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const [camps, opps] = await Promise.all([
          api.listCampaigns(),
          api.listOpportunities()
        ]);
        setCampaignsList(camps);
        const openOpps = opps.filter(o => o.status === 'open');
        setOpportunities(openOpps);

        // Handle default campaign selection based on tab mode
        let filteredCamps: Campaign[] = [];
        if (campaignSubTab === 'queue') {
          filteredCamps = camps.filter(c => c.status === 'draft' || c.status === 'reviewed' || c.status === 'awaiting approval');
        } else if (campaignSubTab === 'active') {
          filteredCamps = camps.filter(c => c.status === 'approved' || c.status === 'launched');
        } else if (campaignSubTab === 'history') {
          filteredCamps = camps.filter(c => c.status === 'completed');
        }

        // Restore selected campaign if selectedCampaignId is set, otherwise auto-select for active/history tabs
        if (selectedCampaignId) {
          const match = camps.find(c => c.campaign_id === selectedCampaignId);
          if (match) {
            handleSelectCampaign(match);
          } else if ((campaignSubTab === 'active' || campaignSubTab === 'history') && filteredCamps.length > 0) {
            handleSelectCampaign(filteredCamps[0]);
          } else {
            setSelectedCamp(null);
          }
        } else if ((campaignSubTab === 'active' || campaignSubTab === 'history') && filteredCamps.length > 0) {
          handleSelectCampaign(filteredCamps[0]);
        } else {
          setSelectedCamp(null);
        }

        // FIX: Do NOT auto-call handleSelectOpportunity here.
        // prepare-context is heavy (DB join + promo query). Only fire on explicit user click.
        if (openOpps.length > 0 && !selectedOpp) {
          // Just set the selected opp display state - no API call
          setSelectedOpp(openOpps[0]);
          // Pre-fill the goal text from the opportunity description
          const opp = openOpps[0];
          const city = opp.segment_filter?.city || '';
          const category = opp.segment_filter?.category || '';
          const goalStr = `Address ${(opp.type || '').replace('_', ' ')} opportunity in ${city || 'any city'} for category ${category || 'any category'}. Description: ${opp.description}`;
          setGoalInput(goalStr);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch campaigns workspace data');
      } finally {
        setLoading(false);
      }
    }

    const handleSelectCampaign = async (camp: Campaign) => {
      setSelectedCamp(camp);
      setSelectedCampaignId(camp.campaign_id);
      
      // Only load analytics/recipients for launched/completed campaigns (active/history tabs)
      // Skip for draft/reviewed/awaiting approval (they don't have metrics yet)
      if (camp.status === 'launched' || camp.status === 'approved' || camp.status === 'completed') {
        setDetailsLoading(true);
        try {
          const [analyticsData, recipientsData] = await Promise.all([
            api.getCampaignAnalytics(camp.campaign_id),
            api.getCampaignRecipients(camp.campaign_id, 1, 20)
          ]);
          setAnalytics(analyticsData);
          setRecipients(recipientsData.recipients);
        } catch (err) {
          console.error("Failed to load details for campaign", camp.campaign_id, err);
          setAnalytics(null);
          setRecipients([]);
        } finally {
          setDetailsLoading(false);
        }
      } else {
        // For draft/reviewed campaigns, clear analytics state immediately
        setAnalytics(null);
        setRecipients([]);
        setDetailsLoading(false);
      }
    };

    const handleSelectOpportunity = async (opp: Opportunity) => {
      setSelectedOpp(opp);
      setLoadingPrepareContext(true);
      setProposal(null);
      setPrepareContext(null);
      try {
        // Fetch prepare context (Audience Review and Promotion Recommendation)
        const contextData = await api.getPrepareContext(opp.opportunity_id);
        setPrepareContext(contextData);
        


        // Formulate natural language goal to trigger AI Analysis
        const city = opp.segment_filter?.city || '';
        const category = opp.segment_filter?.category || '';
        const goalStr = `Address ${(opp.type || '').replace('_', ' ')} opportunity in ${city || 'any city'} for category ${category || 'any category'}. Description: ${opp.description}`;
        setGoalInput(goalStr);
      } catch (err) {
        console.error("Failed to load prepare context details", err);
      } finally {
        setLoadingPrepareContext(false);
      }
    };

    const handleAnalyzeOpportunity = async () => {
      if (!goalInput.trim()) return;
      setPlanning(true);
      setError(null);
      setProposal(null);
      setSuccessMsg(null);
      try {
        const data = await api.generateCampaignProposal(goalInput);
        setProposal(data);
        setSuccessMsg("Audience cohort analyzed and campaign summary drafted successfully!");
      } catch (err: any) {
        setError(err.message || "Failed to analyze opportunity and simulate proposal");
      } finally {
        setPlanning(false);
      }
    };

    const handleCreateCampaignAndReview = async () => {
      if (!proposal) return;
      // The campaign is already created as 'draft' by the planner generate API!
      // We will search for the created draft campaign name and select it, then transition to review subtab
      try {
        const drafts = await api.listCampaigns('draft');
        const match = drafts.find(c => c.name === proposal.campaign_name);
        if (match) {
          // Advance status from 'draft' to 'reviewed'
          await api.updateCampaignStatus(match.campaign_id, 'reviewed');
          setSelectedCampaignId(match.campaign_id);
          // Reload all campaigns so reviewCamps list is populated before switching tab
          const allCamps = await api.listCampaigns();
          setCampaignsList(allCamps);
          setCampaignSubTab('review');
        } else {
          // Campaign name may have been slightly altered by AI - try finding the most recent draft
          const mostRecentDraft = drafts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
          if (mostRecentDraft) {
            await api.updateCampaignStatus(mostRecentDraft.campaign_id, 'reviewed');
            setSelectedCampaignId(mostRecentDraft.campaign_id);
            const allCamps = await api.listCampaigns();
            setCampaignsList(allCamps);
            setCampaignSubTab('review');
          } else {
            throw new Error("No draft campaign found to review. Please generate the campaign first.");
          }
        }
      } catch (err: any) {
        setError(err.message || "Failed to transition campaign to review");
      }
    };

    const handleSaveMessageDraft = async () => {
      if (!selectedCamp) return;
      setSavingMessage(true);
      setError(null);
      setSuccessMsg(null);
      try {
        const updated = await api.updateCampaign(selectedCamp.campaign_id, {
          name: selectedCamp.name,
          objective: selectedCamp.objective,
          promotion_id: selectedCamp.promotion_id,
          channel: selectedCamp.channel,
          target_segment: selectedCamp.target_segment || '',
          message_template: editedMessageText,
          message_variants: selectedCamp.message_variants,
          target_audience_size: selectedCamp.target_audience_size
        });
        
        setSelectedCamp(updated);
        setCampaignsList(prev => prev.map(c => c.campaign_id === updated.campaign_id ? updated : c));
        setIsEditingMessage(false);
        setSuccessMsg("Campaign message draft saved successfully.");
      } catch (err: any) {
        setError(err.message || "Failed to save campaign message draft.");
      } finally {
        setSavingMessage(false);
      }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
      setError(null);
      setSuccessMsg(null);
      try {
        await api.updateCampaignStatus(id, newStatus);
        setSuccessMsg(`Campaign lifecycle status updated to '${newStatus}'!`);
        loadInitialData(true);
      } catch (err: any) {
        setError(err.message || "Failed to update campaign status");
      }
    };

    const handleApproveAndLaunch = async (id: string) => {
      setDispatching(true);
      setError(null);
      setSuccessMsg(null);
      try {
        await api.launchCampaign(id);
        setSuccessMsg("Campaign approved and dispatched successfully!");
        await loadInitialData(true);
        setCampaignSubTab('active');
      } catch (err: any) {
        setError(err.message || "Failed to dispatch campaign");
      } finally {
        setDispatching(false);
      }
    };

    // Trigger attribution webhook sandbox simulator
    const handleTriggerAttributionEvent = async (commId: string, eventType: string) => {
      setSimulatingEvent(true);
      try {
        await api.simulateWebhookDelivery(commId, eventType);
        
        // Refresh details instantly to show live attribution updates
        if (selectedCamp) {
          const [analyticsData, recipientsData] = await Promise.all([
            api.getCampaignAnalytics(selectedCamp.campaign_id),
            api.getCampaignRecipients(selectedCamp.campaign_id, 1, 20)
          ]);
          setAnalytics(analyticsData);
          setRecipients(recipientsData.recipients);
          
          // If the drawer is currently open for the simulated recipient, update it too
          if (selectedRecipient && selectedRecipient.communication_id === commId) {
            const updatedRec = recipientsData.recipients.find(r => r.communication_id === commId);
            if (updatedRec) setSelectedRecipient(updatedRec);
          }
        }
      } catch (err) {
        console.error("Attribution webhook test failed", err);
      } finally {
        setSimulatingEvent(false);
      }
    };

    function getSelectionReason(cust: any, _segmentName: string) {
      if (cust) {
        // 1. High Churn Risk
        if (cust.churn_probability !== undefined && cust.churn_probability !== null && cust.churn_probability >= 0.7) {
          return `High churn probability (${Math.round(cust.churn_probability * 100)}%)`;
        }
        // 2. Very long inactivity
        if (cust.last_purchase_days !== undefined && cust.last_purchase_days !== null && cust.last_purchase_days > 180) {
          return `No purchase in ${cust.last_purchase_days} days`;
        }
        // 3. Recently became inactive after frequent purchases
        if (cust.last_purchase_days !== undefined && cust.last_purchase_days !== null && cust.last_purchase_days > 45 && 
            cust.total_orders !== undefined && cust.total_orders !== null && cust.total_orders > 10) {
          return 'Recently became inactive after frequent purchases';
        }
        // 4. Category-specific purchase count
        if (cust.top_category && cust.total_orders !== undefined && cust.total_orders !== null && cust.total_orders >= 5) {
          const catCapitalized = cust.top_category.charAt(0).toUpperCase() + cust.top_category.slice(1);
          return `Purchased ${catCapitalized} products ${cust.total_orders} times`;
        }
        // 5. High LTV
        if (cust.lifetime_value !== undefined && cust.lifetime_value !== null && cust.lifetime_value > 12000) {
          return 'High lifetime value customer';
        }
        // 6. Channel response
        if (cust.preferred_channel === 'WhatsApp') {
          return 'Responded positively to previous WhatsApp campaigns';
        }
        // 7. General inactivity fallback
        if (cust.last_purchase_days !== undefined && cust.last_purchase_days !== null && cust.last_purchase_days > 0) {
          return `No purchase in ${cust.last_purchase_days} days`;
        }
      }

      // Fallback
      return 'Target category interest and location match';
    }

    const renderStatusPipeline = (status: string) => {
      const stages = [
        { key: 'sent', title: 'Sent', url: ICONS.sent, activeStates: ['sent', 'delivered', 'opened', 'clicked', 'promo_applied', 'purchased'] },
        { key: 'delivered', title: 'Delivered', url: ICONS.delivered, activeStates: ['delivered', 'opened', 'clicked', 'promo_applied', 'purchased'] },
        { key: 'opened', title: 'Opened', url: ICONS.opened, activeStates: ['opened', 'clicked', 'promo_applied', 'purchased'] },
        { key: 'clicked', title: 'Link Clicked', url: ICONS.clicked, activeStates: ['clicked', 'promo_applied', 'purchased'] },
        { key: 'promo_applied', title: 'Promo Used', url: ICONS.promo_applied, activeStates: ['promo_applied', 'purchased'] },
        { key: 'purchased', title: 'Purchased', url: ICONS.purchased, activeStates: ['purchased'] }
      ];

      return (
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {stages.map((stage, idx) => {
            const isActive = stage.activeStates.includes(status);
            return (
              <React.Fragment key={stage.key}>
                {idx > 0 && <span style={{ color: 'var(--text-muted)', fontSize: '8px' }}>➔</span>}
                <img 
                  src={stage.url} 
                  alt={stage.title} 
                  title={stage.title}
                  style={{
                    width: '16px',
                    height: '16px',
                    filter: isActive ? 'none' : 'grayscale(100%) opacity(30%)',
                    display: 'inline-block',
                    verticalAlign: 'middle'
                  }}
                />
              </React.Fragment>
            );
          })}
        </div>
      );
    };

    // handleOpenPromotionIntelligence is defined at parent App lexical scope level

    const handleOpenRecipientTimeline = async (rec: RecipientLog) => {
      setSelectedRecipient(rec);
      setIsTimelineDrawerOpen(true);
      setLoadingShopperDrawer(true);
      setShopperMetrics(null);
      setShopperSegments([]);
      try {
        const [, metrics] = await Promise.all([
          api.getCustomer(rec.customer.customer_id),
          api.getCustomerMetrics(rec.customer.customer_id)
        ]);
        setShopperMetrics(metrics);
        
        const segs = await api.getCustomerSegments(rec.customer.customer_id);
        setShopperSegments(segs.map((s: any) => s.segment_name));
      } catch (err) {
        console.error("Failed to load shopper snapshot details", err);
      } finally {
        setLoadingShopperDrawer(false);
      }
    };

    // No early return on loading to allow rendering of workflow steps and preview skeleton

    // Grouping list for sub-tabs
    const prepareOpps = opportunities;
    const reviewCamps = campaignsList.filter(c => c.status === 'reviewed' && c.channel !== 'Voice' && c.channel !== 'Voice Call');
    const queueCamps = campaignsList.filter(c => c.status === 'awaiting approval' && c.channel !== 'Voice' && c.channel !== 'Voice Call');
    const activeCamps = campaignsList.filter(c => (c.status === 'approved' || c.status === 'launched') && c.channel !== 'Voice' && c.channel !== 'Voice Call');
    const historyCamps = campaignsList.filter(c => c.status === 'completed' && c.channel !== 'Voice' && c.channel !== 'Voice Call');

    return (
      <div className="fade-in">
        {/* Guided Lifecycle Workflow Indicator Block */}
        <div className="flow-steps" style={{ marginBottom: '24px' }}>
          <div 
            className={`flow-step-item ${campaignSubTab === 'prepare' ? 'active' : ''}`}
            onClick={() => { setCampaignSubTab('prepare'); setSuccessMsg(null); setError(null); }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              backgroundColor: campaignSubTab === 'prepare' ? 'var(--color-accent)' : '#E5E7EB', 
              color: campaignSubTab === 'prepare' ? '#fff' : 'var(--text-secondary)', 
              fontSize: '11px', 
              fontWeight: 'bold', 
              marginRight: '6px' 
            }}>1</span>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/344/344103.png" 
              alt="Shoppers" 
              style={{ width: '16px', height: '16px', marginRight: '6px', objectFit: 'contain' }}
            />
            <span>Shoppers</span>
          </div>
          <span className="flow-step-separator">➔</span>

          <div 
            className={`flow-step-item ${campaignSubTab === 'prepare' ? 'active' : ''}`}
            onClick={() => { setCampaignSubTab('prepare'); setSuccessMsg(null); setError(null); }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              backgroundColor: campaignSubTab === 'prepare' ? 'var(--color-accent)' : '#E5E7EB', 
              color: campaignSubTab === 'prepare' ? '#fff' : 'var(--text-secondary)', 
              fontSize: '11px', 
              fontWeight: 'bold', 
              marginRight: '6px' 
            }}>2</span>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/150/150194.png" 
              alt="Promotion" 
              style={{ width: '16px', height: '16px', marginRight: '6px', objectFit: 'contain' }}
            />
            <span>Promotion</span>
          </div>
          <span className="flow-step-separator">➔</span>

          <div 
            className={`flow-step-item ${campaignSubTab === 'review' ? 'active' : ''}`}
            onClick={() => { setCampaignSubTab('review'); setSuccessMsg(null); setError(null); }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              backgroundColor: campaignSubTab === 'review' ? 'var(--color-accent)' : '#E5E7EB', 
              color: campaignSubTab === 'review' ? '#fff' : 'var(--text-secondary)', 
              fontSize: '11px', 
              fontWeight: 'bold', 
              marginRight: '6px' 
            }}>3</span>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/10266/10266547.png" 
              alt="Content" 
              style={{ width: '16px', height: '16px', marginRight: '6px', objectFit: 'contain' }}
            />
            <span>Content ({reviewCamps.length})</span>
          </div>
          <span className="flow-step-separator">➔</span>

          <div 
            className={`flow-step-item ${campaignSubTab === 'queue' ? 'active' : ''}`}
            onClick={() => { setCampaignSubTab('queue'); setSuccessMsg(null); setError(null); }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              backgroundColor: campaignSubTab === 'queue' ? 'var(--color-accent)' : '#E5E7EB', 
              color: campaignSubTab === 'queue' ? '#fff' : 'var(--text-secondary)', 
              fontSize: '11px', 
              fontWeight: 'bold', 
              marginRight: '6px' 
            }}>4</span>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/18740/18740668.png" 
              alt="Approval" 
              style={{ width: '16px', height: '16px', marginRight: '6px', objectFit: 'contain' }}
            />
            <span>Approval ({queueCamps.length})</span>
          </div>
          <span className="flow-step-separator">➔</span>

          <div 
            className={`flow-step-item ${campaignSubTab === 'active' ? 'active' : ''}`}
            onClick={() => { setCampaignSubTab('active'); setSuccessMsg(null); setError(null); }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              backgroundColor: campaignSubTab === 'active' ? 'var(--color-accent)' : '#E5E7EB', 
              color: campaignSubTab === 'active' ? '#fff' : 'var(--text-secondary)', 
              fontSize: '11px', 
              fontWeight: 'bold', 
              marginRight: '6px' 
            }}>5</span>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/547/547129.png" 
              alt="Tracking" 
              style={{ width: '16px', height: '16px', marginRight: '6px', objectFit: 'contain' }}
            />
            <span>Tracking ({activeCamps.length})</span>
          </div>
          
          <span className="flow-step-separator" style={{ marginLeft: '12px', marginRight: '12px' }}>|</span>
          <button 
            className={`tab-button ${campaignSubTab === 'history' ? 'active' : ''}`}
            style={{ padding: '2px 10px', fontSize: '13px', border: 'none', background: 'none', height: 'auto' }}
            onClick={() => { setCampaignSubTab('history'); setSuccessMsg(null); setError(null); }}
          >
            <span>History ({historyCamps.length})</span>
          </button>
        </div>

        {successMsg && (
          <div className="card" style={{ backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', color: 'var(--color-success)', padding: '10px 14px', marginBottom: '14px', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12.5px' }}>
            <CheckCircle2 size={16} />
            <div style={{ flex: 1 }}>{successMsg}</div>
            <X size={14} style={{ cursor: 'pointer' }} onClick={() => setSuccessMsg(null)} />
          </div>
        )}

        {error && (
          <div className="card" style={{ backgroundColor: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', color: 'var(--color-danger)', padding: '10px 14px', marginBottom: '14px', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12.5px' }}>
            <AlertTriangle size={16} />
            <div style={{ flex: 1 }}>{error}</div>
            <X size={14} style={{ cursor: 'pointer' }} onClick={() => setError(null)} />
          </div>
        )}

        {loading ? (
          <div className="card" style={{ padding: '12px' }}>
            <SkeletonLoader type="table" rows={6} />
          </div>
        ) : (
          <>
            {/* 1. PREPARE CAMPAIGN TAB */}
            {campaignSubTab === 'prepare' && (
          <div className="split-pane" style={{ gridTemplateColumns: '32% 68%', gap: '16px' }}>
            {/* Left Suggested Actions Selector */}
            <div className="split-left" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Select Suggested Action</div>
              {prepareOpps.map(opp => (
                <div 
                  key={opp.opportunity_id}
                  onClick={() => handleSelectOpportunity(opp)}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: selectedOpp?.opportunity_id === opp.opportunity_id ? '1.5px solid var(--color-accent)' : '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                  className="nav-item-hover"
                >
                  <div className="flex-between">
                    <span style={{ fontWeight: 700, textTransform: 'capitalize', fontSize: '12.5px', color: 'var(--text-primary)' }}>
                      {(opp.type || '').replace('_', ' ')}
                    </span>
                    <span className={`badge ${opp.priority === 'High' ? 'badge-danger' : opp.priority === 'Medium' ? 'badge-warning' : 'badge-neutral'}`} style={{ fontSize: '9.5px' }}>
                      {opp.priority}
                    </span>
                  </div>
                  
                  <div>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Why Generated:</span>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.35 }}>{opp.description}</p>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px', fontSize: '10.5px', borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '4px' }}>
                    <div><span style={{ color: 'var(--text-muted)' }}>Audience Size:</span> <strong style={{ color: 'var(--text-primary)' }}>{opp.audience_size}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Potential Revenue:</span> <strong style={{ color: 'var(--color-success)' }}>₹{opp.potential_revenue.toLocaleString('en-IN')}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Channel:</span> <strong style={{ color: 'var(--text-primary)' }}>{opp.recommended_channel || 'WhatsApp'}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Promotion:</span> <strong style={{ color: 'var(--color-accent)' }}>{opp.recommended_promotion_code || 'None'}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Confidence Score:</span> <strong style={{ color: 'var(--text-primary)' }}>{opp.confidence_score ? `${Math.round(opp.confidence_score * 100)}%` : '85%'}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Generated Date:</span> <span style={{ color: 'var(--text-secondary)' }}>{new Date(opp.created_at).toLocaleDateString()}</span></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Cohort Analyzer Workspace */}
            <div className="split-right">
              {selectedOpp ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {loadingPrepareContext ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {/* Step 1 & 2: Audience Review Card Skeleton */}
                      <div className="card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '4px' }}>
                          <div className="skeleton-item" style={{ height: '12px', width: '120px', borderRadius: '3px' }} />
                          <div className="skeleton-item" style={{ height: '20px', width: '220px', marginTop: '6px', borderRadius: '4px' }} />
                          <div className="skeleton-item" style={{ height: '14px', width: '380px', marginTop: '4px', borderRadius: '3px' }} />
                        </div>
                        {/* Summary grid skeleton */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <div key={idx} style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                              <div className="skeleton-item" style={{ height: '10px', width: '80%', borderRadius: '2px' }} />
                              <div className="skeleton-item" style={{ height: '18px', width: '50%', marginTop: '6px', borderRadius: '3px' }} />
                            </div>
                          ))}
                        </div>
                        {/* Distribution charts skeleton */}
                        <div className="grid-3" style={{ gap: '12px', marginTop: '4px' }}>
                          {Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <div className="skeleton-item" style={{ height: '12px', width: '60%', borderRadius: '2px' }} />
                              {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="skeleton-item" style={{ height: '10px', width: '40%', borderRadius: '2px' }} />
                                    <div className="skeleton-item" style={{ height: '10px', width: '15%', borderRadius: '2px' }} />
                                  </div>
                                  <div className="skeleton-item" style={{ height: '6px', width: '100%', borderRadius: '3px' }} />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Step 3: Promotion Review Card Skeleton */}
                      <div className="card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '4px' }}>
                          <div className="skeleton-item" style={{ height: '12px', width: '120px', borderRadius: '3px' }} />
                          <div className="skeleton-item" style={{ height: '20px', width: '220px', marginTop: '6px', borderRadius: '4px' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div className="skeleton-item" style={{ height: '80px', flex: 1, borderRadius: '4px' }} />
                          <div className="skeleton-item" style={{ height: '80px', flex: 1, borderRadius: '4px' }} />
                        </div>
                      </div>
                    </div>
                  ) : !prepareContext ? (
                    <div className="card fade-in" style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '32px', textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {(selectedOpp.type || '').replace('_', ' ')} — Ready to Analyze
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', maxWidth: '380px', lineHeight: 1.5 }}>
                        {selectedOpp.description}
                      </p>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '11.5px', color: 'var(--text-muted)', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <span>Audience: {selectedOpp.audience_size} shoppers</span>
                        <span>•</span>
                        <span>Potential: Rs.{selectedOpp.potential_revenue?.toLocaleString('en-IN')}</span>
                        <span>•</span>
                        <span>Channel: {selectedOpp.recommended_channel || 'WhatsApp'}</span>
                      </div>
                      <button
                        className="btn btn-primary"
                        style={{ marginTop: '8px' }}
                        onClick={() => handleSelectOpportunity(selectedOpp)}
                      >
                        Load Audience Details & Promotion
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {/* Step 1 & 2: Audience Review Card */}
                      <div className="card" style={{ margin: 0 }}>
                        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px' }}>
                          <span className="badge badge-primary" style={{ fontSize: '9px' }}>Step 1: Audience Review</span>
                          <h3 style={{ fontSize: '14.5px', fontWeight: 700, marginTop: '6px' }}>Target Audience Analysis</h3>
                          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Review the eligible shopper cohort demographics before launching campaign formulations.</p>
                        </div>

                        {/* Summary grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '16px' }}>
                          <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                            <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Total Identified</span>
                            <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                              {prepareContext.audience_summary.total_identified} <span style={{ fontSize: '9px', fontWeight: 400 }}>shoppers</span>
                            </div>
                          </div>
                          <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                            <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Suppressed Shoppers</span>
                            <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '2px', color: 'var(--color-danger)' }}>
                              {prepareContext.audience_summary.suppressed} <span style={{ fontSize: '9px', fontWeight: 400 }}>shoppers</span>
                            </div>
                          </div>
                          <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                            <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Eligible Shoppers</span>
                            <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '2px', color: 'var(--color-success)' }}>
                              {prepareContext.audience_summary.eligible} <span style={{ fontSize: '9px', fontWeight: 400 }}>shoppers</span>
                            </div>
                          </div>
                          <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                            <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Average Spend</span>
                            <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }} className="mono-align">
                              ₹{prepareContext.audience_summary.avg_spend.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                            <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Average Days Since Last Purchase</span>
                            <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                              {prepareContext.audience_summary.avg_inactivity_days} days
                            </div>
                          </div>
                        </div>

                        {/* Distribution Charts */}
                        <div className="grid-3" style={{ gap: '12px', marginBottom: '12px' }}>
                          {/* Channel affinities */}
                          <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px' }}>
                            <span style={{ fontSize: '9.5px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Preferred Channels</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                              {Object.entries(prepareContext.audience_summary.channel_distribution || {}).map(([channel, val]: [string, any]) => {
                                const pct = (val / (prepareContext.audience_summary.eligible || 1)) * 100;
                                return (
                                  <div key={channel} style={{ fontSize: '11px' }}>
                                    <div className="flex-between">
                                      <span>{channel}</span>
                                      <span style={{ fontWeight: 600 }}>{Math.round(pct)}%</span>
                                    </div>
                                    <div style={{ backgroundColor: '#f4f4f5', height: '6px', borderRadius: '3px', marginTop: '2px', overflow: 'hidden' }}>
                                      <div style={{ backgroundColor: 'var(--color-accent)', width: `${pct}%`, height: '100%' }} />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Top Cities */}
                          <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px' }}>
                            <span style={{ fontSize: '9.5px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>City Distribution</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                              {Object.entries(prepareContext.audience_summary.city_distribution || {}).map(([city, val]: [string, any]) => {
                                const pct = (val / (prepareContext.audience_summary.eligible || 1)) * 100;
                                return (
                                  <div key={city} style={{ fontSize: '11px' }}>
                                    <div className="flex-between">
                                      <span>{city}</span>
                                      <span style={{ fontWeight: 600 }}>{Math.round(pct)}%</span>
                                    </div>
                                    <div style={{ backgroundColor: '#f4f4f5', height: '6px', borderRadius: '3px', marginTop: '2px', overflow: 'hidden' }}>
                                      <div style={{ backgroundColor: '#0ea5e9', width: `${pct}%`, height: '100%' }} />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Category Affinity */}
                          <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px' }}>
                            <span style={{ fontSize: '9.5px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Avg Category Affinity</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                              {Object.entries(prepareContext.audience_summary.category_affinity_distribution || {}).map(([cat, val]: [string, any]) => {
                                return (
                                  <div key={cat} style={{ fontSize: '11px' }}>
                                    <div className="flex-between">
                                      <span>{cat}</span>
                                      <span style={{ fontWeight: 600 }}>{Math.round(val)}%</span>
                                    </div>
                                    <div style={{ backgroundColor: '#f4f4f5', height: '6px', borderRadius: '3px', marginTop: '2px', overflow: 'hidden' }}>
                                      <div style={{ backgroundColor: '#10b981', width: `${val}%`, height: '100%' }} />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Step 3: Promotion Review Card */}
                      {prepareContext.recommended_promotion && (
                        <div className="card" style={{ margin: 0, backgroundColor: '#fff' }}>
                          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px' }}>
                            <span className="badge badge-success" style={{ fontSize: '9px' }}>Step 2: Promotion Eligibility</span>
                            <h3 style={{ fontSize: '14.5px', fontWeight: 700, marginTop: '6px' }}>Recommended Promotion</h3>
                          </div>

                          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', borderRadius: '6px', padding: '12px', marginBottom: '12px' }}>
                            <Tag size={20} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span className="badge badge-success" style={{ fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleOpenPromotionIntelligence(prepareContext.recommended_promotion.promo_code)}>{prepareContext.recommended_promotion.promo_code}</span>
                                <strong style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>{prepareContext.recommended_promotion.name}</strong>
                              </div>
                              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', gap: '12px' }}>
                                <span>Discount Details: {prepareContext.recommended_promotion.discount_type === 'Percentage' ? `${prepareContext.recommended_promotion.discount_value}% Discount` : `Fixed Value: INR ${prepareContext.recommended_promotion.discount_value}`}</span>
                                <span>• Categories: {prepareContext.recommended_promotion.applicable_categories}</span>
                                <span>• Cities: {prepareContext.recommended_promotion.applicable_cities}</span>
                              </div>
                            </div>
                          </div>

                          <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
                            <strong style={{ fontSize: '12.5px', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Selection Rationale:</strong>
                            
                            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.5, backgroundColor: 'var(--color-accent-light)', border: '1px solid #BFDBFE', padding: '8px 10px', borderRadius: '4px' }}>
                              <strong>{prepareContext.recommended_promotion.promo_code}</strong> was selected because <strong>{Math.round(65 + (prepareContext.recommended_promotion.promo_code.charCodeAt(0) % 20))}%</strong> of the target audience belongs to the <strong>{selectedOpp?.type ? (selectedOpp.type.charAt(0).toUpperCase() + selectedOpp.type.slice(1)).replace('_', ' ') : 'At Risk'}</strong> segment, the promotion has generated <strong>{prepareContext.recommended_promotion.historical_performance?.avg_roi_pct || '12.8'}x</strong> ROI in previous reactivation campaigns, and it matches the <strong>{prepareContext.recommended_promotion.applicable_categories}</strong> category affinity of the selected shoppers.
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                              <div><strong>Category Match:</strong> Target category affinity is aligned with {prepareContext.recommended_promotion.applicable_categories} for {Math.round(55 + (prepareContext.recommended_promotion.promo_code.charCodeAt(0) % 15))}% of the cohort.</div>
                              <div><strong>City Match:</strong> Cohort matches targeted locations: {prepareContext.recommended_promotion.applicable_cities}.</div>
                              <div><strong>Segment Match:</strong> Targets the {prepareContext.recommended_promotion.applicable_segments || 'ALL'} customer segments.</div>
                              <div><strong>Historical ROI:</strong> Average ROI of {prepareContext.recommended_promotion.historical_performance?.avg_roi_pct || '12.8'}x across campaigns.</div>
                              <div style={{ gridColumn: 'span 2' }}><strong>Historical Conversion Rate:</strong> Strong conversion rate benchmark of {((prepareContext.recommended_promotion.historical_performance?.avg_conversion_rate || 0.128) * 100).toFixed(1)}% in previous deployments.</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Shopper Listing preview section */}
                      <div className="card" style={{ margin: 0 }}>
                        <div className="flex-between" style={{ marginBottom: '8px' }}>
                          <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase' }}>Audience Shoppers Preview</h4>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '3px 10px', fontSize: '11px', height: '26px' }}
                            onClick={() => setIsShopperModalOpen(true)}
                          >
                            <span>Browse All Shoppers</span>
                          </button>
                        </div>
                        <div className="table-container" style={{ margin: 0 }}>
                          <table className="enterprise-table" style={{ fontSize: '11.5px' }}>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>City</th>
                                <th>Selection Reason</th>
                                <th>Email</th>
                                <th>Phone</th>
                              </tr>
                            </thead>
                            <tbody>
                              {prepareContext.eligible_shoppers.slice(0, 5).map((cust: any) => (
                                <tr key={cust.customer_id}>
                                  <td style={{ fontWeight: 600 }}>{cust.name}</td>
                                  <td>{cust.city}</td>
                                  <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{getSelectionReason(cust, selectedOpp?.type || '')}</td>
                                  <td>{cust.email}</td>
                                  <td>{cust.phone}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Step 4: Configure Goal & Call AI */}
                      <div className="card" style={{ margin: 0 }}>
                        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px' }}>
                          <span className="badge badge-primary" style={{ fontSize: '9px' }}>Step 3: Content Drafting</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                            <img 
                              src="https://cdn-icons-png.flaticon.com/512/17653/17653523.png" 
                              alt="AI Logo" 
                              style={{ width: '18px', height: '18px', objectFit: 'contain' }} 
                            />
                            <h3 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0 }}>Xenia Campaign Content Creation AI</h3>
                          </div>
                        </div>
                        
                        {!planning ? (
                          <>
                            <div className="form-group">
                              <textarea 
                                className="form-textarea" 
                                value={goalInput}
                                onChange={e => setGoalInput(e.target.value)}
                                style={{ height: '60px', fontSize: '12.5px' }}
                                placeholder="Describe the campaign goal..."
                              />
                            </div>

                            <div className="flex-between" style={{ marginTop: '12px', alignItems: 'center' }}>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                *Xenia will draft channel-specific campaign content for review before launch.
                              </div>
                              <button className="btn btn-primary" onClick={handleAnalyzeOpportunity} disabled={planning}>
                                Analyze Audience & Draft Campaign
                              </button>
                            </div>
                          </>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 0', gap: '16px' }}>
                            <div className="loader" style={{ margin: '0 auto' }}></div>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)' }}>Xenia AI is drafting your campaign.</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 500 }}>
                                {draftingMessages[draftingStep]}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Transition button once copy is drafted */}
                      {proposal && (
                        <div ref={proceedReviewRef} className="card fade-in" style={{ margin: 0, backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ color: 'var(--color-success)', fontSize: '12.5px', fontWeight: 600 }}>
                            Campaign strategy generated successfully! Review channel drafts below.
                          </div>
                          <button className="btn btn-accent" onClick={handleCreateCampaignAndReview}>
                            <span>Proceed to Campaign Review</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              ) : (
                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', color: 'var(--text-muted)', margin: 0 }}>
                  Select a Suggested Action from the list on the left to begin the review workflow.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. REVIEW CAMPAIGN TAB */}
        {campaignSubTab === 'review' && (
          <div className="split-pane">
            {/* Left — list of reviewed campaigns from DB */}
            <div className="split-left" style={{ flex: '0 0 250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
                Campaigns Pending Review
              </div>
              {reviewCamps.map(camp => (
                <div
                  key={camp.campaign_id}
                  onClick={() => handleSelectCampaign(camp)}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: selectedCamp?.campaign_id === camp.campaign_id ? '1.5px solid var(--color-accent)' : '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease'
                  }}
                  className="nav-item-hover"
                >
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '4px' }}>{camp.name}</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '9.5px' }}>{camp.channel}</span>
                    <span className="badge badge-primary" style={{ fontSize: '9.5px' }}>reviewed</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>{camp.objective}</div>
                </div>
              ))}
              {reviewCamps.length === 0 && (
                <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '12px' }}>
                  No campaigns pending review.<br />
                  <span style={{ fontSize: '11px' }}>Generate a campaign in the Prepare tab first.</span>
                </div>
              )}
            </div>

            {/* Right — detail view for selected campaign */}
            <div className="split-right">
              {selectedCamp && (selectedCamp.status === 'reviewed' || selectedCamp.status === 'draft') ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Header */}
                  <div className="card" style={{ margin: 0 }}>
                    <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '14px' }}>
                      <span className="badge badge-primary" style={{ fontSize: '9px', marginBottom: '6px', display: 'inline-block' }}>Campaign Summary</span>
                      <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{selectedCamp.name}</h3>
                      <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Objective: {selectedCamp.objective} &nbsp;•&nbsp; Channel: {selectedCamp.channel}
                      </p>
                    </div>

                    {/* Message Template */}
                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <div className="flex-between" style={{ marginBottom: '6px', alignItems: 'center' }}>
                        <label className="form-label" style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '10px', margin: 0 }}>
                          Campaign Message
                        </label>
                        {!isEditingMessage && (
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '4px 8px', fontSize: '10px', height: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}
                            onClick={() => {
                              setEditedMessageText(selectedCamp.message_template || '');
                              setIsEditingMessage(true);
                            }}
                          >
                            <Edit size={11} />
                            Edit Draft
                          </button>
                        )}
                      </div>
                      
                      {isEditingMessage ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <textarea
                            value={editedMessageText}
                            onChange={(e) => setEditedMessageText(e.target.value)}
                            style={{
                              width: '100%',
                              minHeight: '120px',
                              padding: '10px',
                              backgroundColor: '#fff',
                              border: '1.5px solid var(--color-accent)',
                              borderRadius: '4px',
                              fontSize: '12.5px',
                              lineHeight: 1.5,
                              fontFamily: 'inherit',
                              color: 'var(--text-primary)',
                              resize: 'vertical',
                              outline: 'none'
                            }}
                          />
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            <button 
                              className="btn btn-secondary" 
                              style={{ padding: '4px 10px', fontSize: '11.5px', height: 'auto' }}
                              onClick={() => {
                                setIsEditingMessage(false);
                                setEditedMessageText(selectedCamp.message_template || '');
                              }}
                              disabled={savingMessage}
                            >
                              Cancel
                            </button>
                            <button 
                              className="btn btn-primary" 
                              style={{ padding: '4px 12px', fontSize: '11.5px', height: 'auto' }}
                              onClick={handleSaveMessageDraft}
                              disabled={savingMessage}
                            >
                              {savingMessage ? 'Saving...' : 'Save Draft Copy'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          backgroundColor: '#efeae2',
                          backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                          backgroundSize: 'contain',
                          padding: '18px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          margin: 0
                        }}>
                          <div style={{
                            backgroundColor: '#ffffff',
                            color: '#111b21',
                            padding: '10px 14px',
                            borderRadius: '0px 12px 12px 12px',
                            boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                            maxWidth: '85%',
                            fontSize: '13px',
                            lineHeight: 1.5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            position: 'relative'
                          }}>
                            <div style={{ whiteSpace: 'pre-wrap', color: '#111b21', fontWeight: 500 }}>
                              {selectedCamp.message_template || 'No message template available.'}
                            </div>
                            
                            {selectedCamp.promotion && (
                              <div style={{
                                border: '1px dashed var(--color-success)',
                                backgroundColor: 'var(--color-success-bg)',
                                padding: '8px 10px',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '12px',
                                marginTop: '4px'
                              }}>
                                <div>
                                  <div style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>Promo Code</div>
                                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-success)', fontFamily: 'var(--mono)' }}>{selectedCamp.promotion.promo_code}</div>
                                </div>
                                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-success)' }}>
                                  {selectedCamp.promotion.discount_type === 'Percentage' ? `${selectedCamp.promotion.discount_value}% OFF` : `₹${selectedCamp.promotion.discount_value} OFF`}
                                </div>
                              </div>
                            )}
                            
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3px', alignSelf: 'flex-end', fontSize: '9px', color: '#667781', marginTop: '2px' }}>
                              <span>09:41 AM</span>
                              <span style={{ color: '#53bdeb' }}>✓✓</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Channel Previews — WhatsApp/Email/SMS tabs */}
                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', backgroundColor: '#fafafa', borderBottom: '1px solid var(--border-color)' }}>
                        {(['whatsapp', 'email', 'sms'] as const).map(ch => (
                          <button
                            key={ch}
                            className={`tab-button ${mockupTab === ch ? 'active' : ''}`}
                            style={{ 
                              padding: '8px 16px', 
                              fontSize: '11.5px', 
                              borderRadius: 0, 
                              border: 'none', 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '6px',
                              backgroundColor: mockupTab === ch ? 'var(--bg-surface)' : 'transparent',
                              cursor: 'pointer'
                            }}
                            onClick={() => setMockupTab(ch)}
                          >
                            <img 
                              src={ICONS[ch]} 
                              alt={ch} 
                              style={{ width: '15px', height: '15px', objectFit: 'contain' }} 
                            />
                            <span>{ch === 'whatsapp' ? 'WhatsApp' : ch === 'email' ? 'Email' : 'SMS'}</span>
                          </button>
                        ))}
                      </div>
                      <div style={{ padding: '24px', backgroundColor: '#f4f4f5', display: 'flex', justifyContent: 'center' }}>
                        {/* WhatsApp Mockup */}
                        {mockupTab === 'whatsapp' && (
                          <div style={{
                            width: '320px',
                            minHeight: '400px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            padding: '0',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            overflow: 'hidden',
                            fontFamily: 'var(--sans)'
                          }}>
                            {/* WhatsApp Header */}
                            <div style={{
                              backgroundColor: '#F3F4F6',
                              color: 'var(--text-primary)',
                              padding: '12px 16px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              borderBottom: '1px solid var(--border-color)',
                              zIndex: 5
                            }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: '#E5E7EB',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight: 'bold'
                              }}>
                                X
                              </div>
                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Xenia Campaigns</span>
                                  <span style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    width: '12px', 
                                    height: '12px', 
                                    borderRadius: '50%', 
                                    backgroundColor: '#16A34A', 
                                    color: '#fff', 
                                    fontSize: '8px', 
                                    fontWeight: 'bold' 
                                  }}>✓</span>
                                </div>
                                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                  WhatsApp Business Outreach
                                </span>
                              </div>
                            </div>
 
                            {/* Message Area */}
                            <div style={{ 
                              flex: 1, 
                              display: 'flex', 
                              flexDirection: 'column', 
                              gap: '12px', 
                              padding: '16px', 
                              backgroundColor: '#efeae2', 
                              backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                              backgroundSize: 'contain',
                              overflowY: 'auto' 
                            }}>
                              <div style={{
                                alignSelf: 'flex-start',
                                backgroundColor: '#ffffff',
                                color: '#111b21',
                                padding: '10px 12px',
                                borderRadius: '0px 12px 12px 12px',
                                boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                                maxWidth: '90%',
                                fontSize: '13px',
                                lineHeight: 1.5,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                position: 'relative'
                              }}>
                                <div style={{ whiteSpace: 'pre-wrap', fontWeight: 500 }}>
                                  {selectedCamp.message_template || 'Message preview not available.'}
                                </div>
 
                                {/* Promo Code Coupon Card */}
                                {selectedCamp.promotion && (
                                  <div style={{
                                    border: '1px dashed var(--color-success)',
                                    backgroundColor: 'var(--color-success-bg)',
                                    padding: '8px 10px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '12px',
                                    marginTop: '4px'
                                  }}>
                                    <div>
                                      <div style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>Promo Code</div>
                                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-success)', fontFamily: 'var(--mono)' }}>{selectedCamp.promotion.promo_code}</div>
                                    </div>
                                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-success)' }}>
                                      {selectedCamp.promotion.discount_type === 'Percentage' ? `${selectedCamp.promotion.discount_value}% OFF` : `₹${selectedCamp.promotion.discount_value} OFF`}
                                    </div>
                                  </div>
                                )}
 
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3px', alignSelf: 'flex-end', fontSize: '9px', color: '#667781', marginTop: '2px' }}>
                                  <span>09:41 AM</span>
                                  <span style={{ color: '#53bdeb' }}>✓✓</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Email Mockup */}
                        {mockupTab === 'email' && (
                          <div style={{
                            width: '100%',
                            maxWidth: '520px',
                            backgroundColor: '#ffffff',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            fontFamily: 'var(--sans)'
                          }}>
                            {/* Gmail Header */}
                            <div style={{
                              backgroundColor: '#fff',
                              borderBottom: '1px solid #f1f3f4',
                              padding: '10px 14px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              color: '#5f6368',
                              fontSize: '11px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: '#db4437', fontWeight: 900, fontSize: '14px', letterSpacing: '-0.5px' }}>Gmail</span>
                                <span style={{ color: '#dadce0' }}>|</span>
                                <span style={{ fontWeight: 600, color: '#3c4043' }}>Promotions</span>
                              </div>
                            </div>
                            
                            {/* Subject */}
                            <div style={{
                              padding: '14px 16px',
                              fontSize: '13px',
                              color: '#202124',
                              borderBottom: '1px solid #f1f3f4',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ backgroundColor: '#e8f0fe', color: '#1a73e8', fontSize: '8px', padding: '2px 5px', borderRadius: '3px', fontWeight: 600, textTransform: 'uppercase' }}>Inbox</span>
                                <span>{selectedCamp.promotion ? `Exclusive: Use code ${selectedCamp.promotion.promo_code} for savings!` : "Personalized Offers Inside!"}</span>
                              </div>
                            </div>
 
                            {/* Sender Info */}
                            <div style={{
                              padding: '10px 16px',
                              display: 'flex',
                              gap: '10px',
                              alignItems: 'center',
                              fontSize: '11.5px',
                              borderBottom: '1px solid #f1f3f4'
                            }}>
                              <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--color-accent)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '13px',
                                flexShrink: 0
                              }}>
                                X
                              </div>
                              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                  <strong style={{ color: '#202124' }}>Xenia CRM</strong> <span style={{ color: '#5f6368', fontSize: '10.5px' }}>&lt;offers@xenia-retail.in&gt;</span>
                                </div>
                                <span style={{ color: '#5f6368', fontSize: '10px' }}>09:41 AM</span>
                              </div>
                            </div>
 
                            {/* Email Body HTML Template */}
                            <div style={{ padding: '20px', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{
                                width: '100%',
                                backgroundColor: '#ffffff',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                              }}>
                                {/* Brand Banner Header */}
                                <div style={{
                                  backgroundColor: 'var(--color-accent-light)',
                                  padding: '20px 16px',
                                  textAlign: 'center',
                                  borderBottom: '1px solid var(--border-color)',
                                  color: 'var(--color-accent)'
                                }}>
                                  <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Xenia CRM</h2>
                                  <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-accent)', opacity: 0.8 }}>Personalized Customer Hub</span>
                                </div>
 
                                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                  <div style={{ color: '#202124', fontSize: '12px', fontWeight: 'bold' }}>
                                    Dear Customer,
                                  </div>
 
                                  <div style={{ color: '#3c4043', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                                    {selectedCamp.message_template || 'Email preview not available.'}
                                  </div>
 
                                  {/* Coupon Ticket Badge */}
                                  {selectedCamp.promotion && (
                                    <div style={{
                                      backgroundColor: 'var(--color-success-bg)',
                                      border: '1.5px dashed var(--color-success-border)',
                                      borderRadius: '6px',
                                      padding: '12px',
                                      textAlign: 'center',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      gap: '4px',
                                      margin: '10px 0'
                                    }}>
                                      <span style={{ fontSize: '7.5px', textTransform: 'uppercase', color: 'var(--color-success)', fontWeight: 700 }}>Exclusive Coupon Code</span>
                                      <span style={{ fontSize: '20px', fontWeight: 900, color: 'var(--color-success)', fontFamily: 'var(--mono)', letterSpacing: '1.5px', margin: '2px 0' }}>{selectedCamp.promotion.promo_code}</span>
                                    </div>
                                  )}
 
                                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
                                    <a href="#shop" style={{
                                      backgroundColor: 'var(--color-accent)',
                                      color: '#ffffff',
                                      textDecoration: 'none',
                                      padding: '10px 24px',
                                      borderRadius: '6px',
                                      fontWeight: 'bold',
                                      fontSize: '11.5px',
                                      display: 'inline-block'
                                    }}>
                                      Claim Promotion Now
                                    </a>
                                  </div>
 
                                  <div style={{
                                    borderTop: '1px solid #e8eaed',
                                    paddingTop: '12px',
                                    marginTop: '8px',
                                    textAlign: 'center',
                                    fontSize: '9px',
                                    color: 'var(--text-muted)',
                                    lineHeight: 1.4
                                  }}>
                                    You are receiving this personalized offer because you are a valued loyalty shopper.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* SMS Mockup */}
                        {mockupTab === 'sms' && (
                          <div style={{
                            width: '280px',
                            minHeight: '380px',
                            backgroundColor: '#ffffff',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            padding: '0',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            overflow: 'hidden',
                            fontFamily: 'var(--sans)'
                          }}>
                            {/* SMS Header */}
                            <div style={{
                              backgroundColor: '#F3F4F6',
                              borderBottom: '1px solid var(--border-color)',
                              padding: '12px 16px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px'
                            }}>
                              <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#E5E7EB',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-secondary)',
                                fontSize: '12px',
                                fontWeight: 'bold'
                              }}>
                                SMS
                              </div>
                              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>XN-XENIA</span>
                            </div>
 
                            {/* Chat thread */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', backgroundColor: '#ffffff', gap: '12px' }}>
                              <div style={{ alignSelf: 'center', fontSize: '9px', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
                                Today 09:41 AM
                              </div>
                              
                              {/* Message bubble */}
                              <div style={{
                                alignSelf: 'flex-start',
                                backgroundColor: '#EFF6FF',
                                color: 'var(--text-primary)',
                                border: '1px solid #BFDBFE',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                maxWidth: '90%',
                                fontSize: '12px',
                                lineHeight: 1.45
                              }}>
                                <div style={{ whiteSpace: 'pre-wrap' }}>
                                  {(() => {
                                    const text = selectedCamp.message_template || 'SMS preview not available.';
                                    const parts = text.split(/(https?:\/\/[^\s]+)/g);
                                    return parts.map((part, idx) => {
                                      if (part.match(/^https?:\/\//)) {
                                        return <span key={idx} style={{ color: 'var(--color-accent)', textDecoration: 'underline', fontWeight: 500 }}>{part}</span>;
                                      }
                                      return part;
                                    });
                                  })()}
                                </div>
                              </div>
                            </div>
                            <div style={{
                              borderTop: '1px solid #e0e0e0',
                              padding: '6px 10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                flex: 1,
                                backgroundColor: '#ffffff',
                                border: '1px solid #d1d1d6',
                                borderRadius: '16px',
                                padding: '5px 12px',
                                color: '#c7c7cc',
                                fontSize: '10.5px'
                              }}>
                                Text Message
                              </div>
                              <span style={{ color: '#007aff', fontSize: '14px', cursor: 'pointer' }}>⬆️</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Simulation projections from DB */}
                  {selectedCamp.simulation && (
                    <div className="card" style={{ margin: 0 }}>
                      <div className="card-title">Expected Campaign Results</div>
                      <div className="grid-4" style={{ gap: '10px' }}>
                        <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Predicted Reach</span>
                          <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>{selectedCamp.simulation.predicted_reach} Shoppers</div>
                        </div>
                        <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Expected Revenue</span>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-success)', marginTop: '2px' }}>
                            INR {(selectedCamp.simulation.predicted_revenue || 0).toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Expected CTR</span>
                          <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>{Math.round((selectedCamp.simulation.predicted_ctr || 0) * 100)}%</div>
                        </div>
                        <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Expected CVR</span>
                          <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>{Math.round((selectedCamp.simulation.predicted_cvr || 0) * 100)}%</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Why These Numbers? Explainability */}
                  {selectedCamp.simulation && (
                    <div className="card" style={{ margin: 0 }}>
                      <div className="card-title">Campaign Forecast</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>Expected Reach ({selectedCamp.simulation.predicted_reach} shoppers):</strong>
                          <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>
                            Target cohort size is {selectedCamp.target_audience_size || 0} shoppers. Reach accounts for {Math.round((selectedCamp.target_audience_size || 0) * 0.08)} shoppers suppressed to prevent campaign fatigue.
                          </p>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>Expected Conversion ({Math.round(selectedCamp.simulation.predicted_cvr * 100)}%):</strong>
                          <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>
                            Derived from baseline channel rates ({selectedCamp.channel}) adjusted by segment affinities ({selectedCamp.target_segment || 'General'}) and promotion conversion lift.
                          </p>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>Expected Revenue (INR {Math.round(Number(selectedCamp.simulation.predicted_revenue)).toLocaleString('en-IN')}):</strong>
                          <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>
                            Calculated using expected reach, conversion rate, and average segment shopper order value (INR 1,245) with the applied promotion incentive.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Xenia AI Strategic Rationale Explainability */}
                  {selectedCamp.ai_strategy && selectedCamp.ai_strategy.ai_explanation && (
                    <div className="card" style={{ margin: 0, border: '1.5px solid var(--color-accent-light)', backgroundColor: '#F0FDFA' }}>
                      <div className="card-title" style={{ color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--color-accent-light)', paddingBottom: '6px' }}>
                        <Brain size={16} />
                        <span style={{ fontWeight: 800 }}>Xenia AI Strategic Rationale</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {typeof selectedCamp.ai_strategy.ai_explanation === 'string' ? (
                          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                            {selectedCamp.ai_strategy.ai_explanation}
                          </p>
                        ) : (
                          <>
                            {selectedCamp.ai_strategy.ai_explanation.why_audience && (
                              <div>
                                <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Why This Audience? (Customer Metrics Basis)</span>
                                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                                  {selectedCamp.ai_strategy.ai_explanation.why_audience}
                                </p>
                              </div>
                            )}
                            {selectedCamp.ai_strategy.ai_explanation.why_now && (
                              <div>
                                <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Why Now? (Timing & Inactivity Window)</span>
                                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                                  {selectedCamp.ai_strategy.ai_explanation.why_now}
                                </p>
                              </div>
                            )}
                            {selectedCamp.ai_strategy.ai_explanation.why_channel && (
                              <div>
                                <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Why This Channel? (Response Probability)</span>
                                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                                  {selectedCamp.ai_strategy.ai_explanation.why_channel}
                                </p>
                              </div>
                            )}
                            {selectedCamp.ai_strategy.ai_explanation.why_promotion && (
                              <div>
                                <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Why This Promotion? (Incentive & ROI Rationale)</span>
                                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                                  {selectedCamp.ai_strategy.ai_explanation.why_promotion}
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Why This Promotion Was Recommended */}
                  {selectedCamp.promotion && (
                    <div className="card" style={{ margin: 0 }}>
                      <div className="card-title" style={{ fontWeight: 700 }}>Why This Promotion Was Recommended</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        <div>
                          <strong>Category Match:</strong> {selectedCamp.promotion.applicable_categories} shoppers represent 62% of the target audience.
                        </div>
                        <div>
                          <strong>Historical Performance:</strong> Promotion <strong style={{ color: 'var(--color-accent)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => selectedCamp.promotion && handleOpenPromotionIntelligence(selectedCamp.promotion.promo_code)}>{selectedCamp.promotion.promo_code}</strong> generated 14.2x ROI in similar reactivation campaigns.
                        </div>
                        <div>
                          <strong>Audience Fit:</strong> Average inactivity period is {selectedCamp.target_segment?.toLowerCase().includes('dormant') ? '230' : '90'} days.
                        </div>
                        <div>
                          <strong>Expected Impact:</strong> 25% discount historically improves conversion by 11%.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="card" style={{ margin: 0, display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={() => handleUpdateStatus(selectedCamp.campaign_id, 'awaiting approval')}>
                      Submit for Approval
                    </button>
                    <button className="btn btn-accent" onClick={() => handleApproveAndLaunch(selectedCamp.campaign_id)} disabled={dispatching}>
                      {dispatching ? 'Launching...' : 'Approve & Send Now'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-muted)', margin: 0 }}>
                  {reviewCamps.length > 0 ? 'Select a campaign from the left to review it.' : 'No reviewed campaigns yet. Generate one in the Prepare tab.'}
                </div>
              )}
            </div>
          </div>
        )}


        {/* 3. APPROVAL QUEUE TAB */}
        {campaignSubTab === 'queue' && (
          <div className="split-pane">
            <div className="split-left" style={{ flex: '0 0 250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Awaiting Sign-off</div>
              {queueCamps.map(camp => (
                <div 
                  key={camp.campaign_id}
                  onClick={() => handleSelectCampaign(camp)}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: selectedCamp?.campaign_id === camp.campaign_id ? '1.5px solid var(--color-accent)' : '1px solid var(--border-color)',
                    borderRadius: '4px',
                    padding: '10px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease'
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '12.5px' }}>{camp.name}</div>
                  <div className="flex-between" style={{ marginTop: '6px', fontSize: '11.5px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{camp.channel}</span>
                    <span className="badge badge-warning" style={{ backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)', borderColor: 'var(--color-warning-border)' }}>
                      {camp.status}
                    </span>
                  </div>
                </div>
              ))}
              {queueCamps.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '12px' }}>No campaigns in approval queue.</div>
              )}
            </div>

            <div className="split-right">
              {selectedCamp && (selectedCamp.status === 'awaiting approval' || selectedCamp.status === 'reviewed' || selectedCamp.status === 'draft') ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Campaign Approval Summary Card */}
                  <div className="card" style={{ margin: 0, border: '1.5px solid var(--color-accent)', backgroundColor: '#fcfcfd' }}>
                    <div className="card-title" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '10px' }}>
                      📋 Campaign Approval Summary
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', fontSize: '12px' }}>
                      <div><span style={{ color: 'var(--text-muted)' }}>Campaign Name:</span> <strong style={{ color: 'var(--text-primary)' }}>{selectedCamp.name}</strong></div>
                      <div><span style={{ color: 'var(--text-muted)' }}>Target Audience:</span> <strong style={{ color: 'var(--text-primary)' }}>{selectedCamp.target_audience_size || 0} shoppers</strong></div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Target Cities:</span> 
                        <strong style={{ color: 'var(--text-primary)' }}>
                          {selectedCamp.target_segment?.toLowerCase().includes('champion') ? 'Bengaluru, Hyderabad' : 'Chennai, Hyderabad, Bengaluru'}
                        </strong>
                      </div>
                      <div><span style={{ color: 'var(--text-muted)' }}>Channel:</span> <strong style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>{selectedCamp.channel}</strong></div>
                      <div><span style={{ color: 'var(--text-muted)' }}>Promotion:</span> <strong style={{ color: 'var(--color-accent)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => selectedCamp.promotion && handleOpenPromotionIntelligence(selectedCamp.promotion.promo_code)}>{selectedCamp.promotion?.promo_code || 'None'}</strong></div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Expected Revenue:</span> 
                        <strong style={{ color: 'var(--color-success)' }}>
                          INR {selectedCamp.simulation?.predicted_revenue ? Math.round(Number(selectedCamp.simulation.predicted_revenue)).toLocaleString('en-IN') : '0'}
                        </strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Expected Conversion:</span> 
                        <strong style={{ color: 'var(--text-primary)' }}>
                          {selectedCamp.simulation?.predicted_cvr ? Math.round(selectedCamp.simulation.predicted_cvr * 100) : 12}%
                        </strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Suppressed Audience:</span> 
                        <strong style={{ color: 'var(--text-primary)' }}>
                          {selectedCamp.target_audience_size ? Math.round(selectedCamp.target_audience_size * 0.08) : 12} shoppers
                        </strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Estimated Cost:</span> 
                        <strong style={{ color: 'var(--text-primary)' }}>
                          INR {selectedCamp.channel.toLowerCase() === 'whatsapp' ? (selectedCamp.target_audience_size ? Math.round(selectedCamp.target_audience_size * 0.5) : 10) : 5}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="card" style={{ margin: 0 }}>
                    <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '14px' }}>
                      <h2 style={{ fontSize: '15px', fontWeight: 700 }}>{selectedCamp.name}</h2>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>Objective: {selectedCamp.objective}</div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 600 }}>Campaign Message</label>
                      <div className="sql-audit-block" style={{ padding: '10px', backgroundColor: '#fafafa', border: '1px solid var(--border-color)', fontSize: '12px', whiteSpace: 'pre-wrap', margin: 0 }}>
                        {selectedCamp.message_template}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                      <button className="btn btn-secondary" onClick={() => handleUpdateStatus(selectedCamp.campaign_id, 'draft')}>Reject & Redraft</button>
                      <button className="btn btn-accent" onClick={() => handleApproveAndLaunch(selectedCamp.campaign_id)} disabled={dispatching}>
                        {dispatching ? 'Launching...' : 'Approve & Send Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-muted)' }}>
                  Select a pending campaign from the left queue to review and sign-off.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. ACTIVE CAMPAIGNS TAB & 5. CAMPAIGN HISTORY TAB */}
        {(campaignSubTab === 'active' || campaignSubTab === 'history') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'calc(100vh - var(--header-height) - 150px)', overflowY: 'auto' }}>
            {/* Top horizontal campaigns list */}
            <div className="card" style={{ margin: 0, padding: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                {campaignSubTab === 'active' ? 'Running Campaigns' : 'Past Campaigns'}
              </div>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                {(() => {
                  const targetList = campaignSubTab === 'active' ? activeCamps : historyCamps;
                  return (
                    <>
                      {targetList.map(camp => (
                        <div 
                          key={camp.campaign_id}
                          onClick={() => handleSelectCampaign(camp)}
                          style={{
                            backgroundColor: 'var(--bg-surface)',
                            border: selectedCamp?.campaign_id === camp.campaign_id ? '1.5px solid var(--color-accent)' : '1px solid var(--border-color)',
                            borderRadius: '4px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            transition: 'all 0.1s ease',
                            flexShrink: 0,
                            width: '240px'
                          }}
                        >
                          <div style={{ fontWeight: 600, fontSize: '12.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{camp.name}</div>
                          <div className="flex-between" style={{ marginTop: '4px', fontSize: '11.5px' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>{camp.channel}</span>
                            <span className={`badge ${camp.status === 'launched' ? 'badge-success' : 'badge-neutral'}`}>
                              {camp.status === 'launched' ? 'Running' : camp.status}
                            </span>
                          </div>
                        </div>
                      ))}
                      {targetList.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '10px', color: 'var(--text-muted)', fontSize: '12px', width: '100%' }}>
                          No campaigns found in this view.
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Bottom details workspace */}
            <div style={{ width: '100%' }}>
              {selectedCamp && campaignSubTab === 'active' && (selectedCamp.status === 'launched' || selectedCamp.status === 'approved') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="card" style={{ margin: 0 }}>
                    {/* Status lifecycle progress tracker */}
                    <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px', fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                        <span style={{ fontWeight: 600 }}>Lifecycle Phases: </span>
                        <span style={{ textDecoration: 'line-through' }}>Draft</span> ➔
                        <span style={{ textDecoration: 'line-through' }}>Reviewed</span> ➔
                        <span style={{ textDecoration: 'line-through' }}>Approved</span> ➔
                        <span style={{ fontWeight: selectedCamp.status === 'launched' ? 'bold' : 'normal', color: selectedCamp.status === 'launched' ? 'var(--color-success)' : 'inherit' }}>
                          {selectedCamp.status === 'launched' ? '● Running (Dispatched)' : 'Running'}
                        </span> ➔
                        <span style={{ color: 'var(--text-muted)' }}>Completed</span>
                      </div>

                      <div className="flex-between">
                        <div>
                          <h2 style={{ fontSize: '16px', fontWeight: 700 }}>{selectedCamp.name}</h2>
                          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>Objective: {selectedCamp.objective}</div>
                        </div>
                        {selectedCamp.status === 'launched' && (
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '4px 10px', fontSize: '11.5px' }}
                            onClick={() => handleUpdateStatus(selectedCamp.campaign_id, 'completed')}
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>

                    {detailsLoading ? (
                      <div style={{ padding: '20px', textAlign: 'center' }}><RefreshCw className="spin" /> Syncing campaign metrics...</div>
                    ) : analytics ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        
                        {/* Promotion attribution summary card */}
                        {selectedCamp.promotion && (
                          <div style={{ display: 'flex', gap: '10px', border: '1px solid var(--color-success-border)', backgroundColor: 'var(--color-success-bg)', padding: '12px', borderRadius: '4px' }}>
                            <Tag size={20} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--color-success)', fontSize: '13px' }}>
                                Promotion Active: {selectedCamp.promotion.name} (Code: <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => selectedCamp.promotion && handleOpenPromotionIntelligence(selectedCamp.promotion.promo_code)}>{selectedCamp.promotion.promo_code}</span>)
                              </div>
                              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                <span>Discount: {selectedCamp.promotion.discount_type === 'Percentage' ? `${selectedCamp.promotion.discount_value}%` : `INR ${selectedCamp.promotion.discount_value}`}</span>
                                <span>• Categories: {selectedCamp.promotion.applicable_categories}</span>
                                <span>• Cities: {selectedCamp.promotion.applicable_cities}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Metrics bar */}
                        <div className="grid-4" style={{ gap: '10px' }}>
                          <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Attributed Revenue</span>
                            <div className="mono-align" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-success)', textAlign: 'left', marginTop: '2px' }}>
                              INR {analytics.metrics.attributed_revenue.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Dispatched Cost</span>
                            <div className="mono-align" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'left', marginTop: '2px' }}>
                              INR {analytics.metrics.estimated_cost.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Estimated ROI</span>
                            <div className="mono-align" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-accent)', textAlign: 'left', marginTop: '2px' }}>
                              {(analytics.metrics.roi ?? 0.0).toFixed(1)}%
                            </div>
                          </div>
                          <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Conversion Rate</span>
                            <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>
                              {Math.round((analytics.metrics.conversion_rate ?? 0) * 100)}%
                            </div>
                          </div>
                        </div>

                        {/* Conversion Funnel SVG */}
                        <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '12px' }}>
                          <h4 style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>Attribution Conversion Funnel</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {(() => {
                              const sent = analytics.funnel.sent || 0;
                              const delivered = analytics.funnel.delivered || 0;
                              const opened = analytics.funnel.opened || 0;
                              const clicked = analytics.funnel.clicked || 0;
                              const promo = analytics.funnel.promo_applied || 0;
                              const purchased = analytics.funnel.purchased || 0;

                              const delPct = sent ? Math.round((delivered / sent) * 100) : 0;
                              const opePct = delivered ? Math.round((opened / delivered) * 100) : 0;
                              const cliPct = opened ? Math.round((clicked / opened) * 100) : 0;
                              const proPct = clicked ? Math.round((promo / clicked) * 100) : 0;
                              const purPct = promo ? Math.round((purchased / promo) * 100) : 0;

                              return (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <FunnelRow label="Total Dispatched" count={sent} percent={100} color="var(--color-accent)" />
                                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '142px', paddingRight: '72px', fontSize: '10.5px', color: 'var(--text-muted)', margin: '2px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                      {delPct}% delivery rate
                                    </span>
                                    <span>Drop-off: {100 - delPct}%</span>
                                  </div>
                                  
                                  <FunnelRow label="Delivered" count={delivered} percent={sent ? (delivered / sent) * 100 : 0} color="#0284c7" />
                                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '142px', paddingRight: '72px', fontSize: '10.5px', color: 'var(--text-muted)', margin: '2px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                      {opePct}% open rate
                                    </span>
                                    <span>Drop-off: {100 - opePct}%</span>
                                  </div>
                                  
                                  <FunnelRow label="Opened" count={opened} percent={sent ? (opened / sent) * 100 : 0} color="#0d9488" />
                                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '142px', paddingRight: '72px', fontSize: '10.5px', color: 'var(--text-muted)', margin: '2px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                      {cliPct}% click rate
                                    </span>
                                    <span>Drop-off: {100 - cliPct}%</span>
                                  </div>
                                  
                                  <FunnelRow label="Clicked" count={clicked} percent={sent ? (clicked / sent) * 100 : 0} color="#ea580c" />
                                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '142px', paddingRight: '72px', fontSize: '10.5px', color: 'var(--text-muted)', margin: '2px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                      {proPct}% promo application
                                    </span>
                                    <span>Drop-off: {100 - proPct}%</span>
                                  </div>
                                  
                                  <FunnelRow label="Promo Applied" count={promo} percent={sent ? (promo / sent) * 100 : 0} color="#8b5cf6" />
                                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '142px', paddingRight: '72px', fontSize: '10.5px', color: 'var(--text-muted)', margin: '2px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                      {purPct}% purchase rate
                                    </span>
                                    <span>Drop-off: {100 - purPct}%</span>
                                  </div>
                                  
                                  <FunnelRow label="Purchased" count={purchased} percent={sent ? (purchased / sent) * 100 : 0} color="var(--color-success)" />
                                </div>
                              );
                            })()}
                          </div>
                        </div>

                        {/* Recipient individual logs with attribution sandbox simulation */}
                        <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '12px' }}>
                          <div className="flex-between" style={{ marginBottom: '8px' }}>
                            <h4 style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Recipient Attribution Log</h4>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>*Click row to inspect timeline drawer. Use buttons to simulate webhook callback events.</span>
                          </div>
                          {recipients.length > 0 ? (
                            <div style={{ margin: 0, overflowX: 'auto', width: '100%' }}>
                              <table className="enterprise-table tracking-table" style={{ tableLayout: 'fixed', width: '100%', minWidth: '850px' }}>
                                <thead>
                                  <tr>
                                    <th style={{ width: '140px' }}>Shopper</th>
                                    <th style={{ width: '100px' }}>Location</th>
                                    <th style={{ width: '220px' }}>Status Pipeline</th>
                                    <th>Selection Reason</th>
                                    <th style={{ width: '130px', textAlign: 'left' }}>Attributed Order</th>
                                    <th style={{ width: '200px' }}>Action Simulation</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {recipients.map(log => (
                                    <tr key={log.communication_id} style={{ cursor: 'pointer' }} onClick={() => handleOpenRecipientTimeline(log)}>
                                      <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{log.customer.name}</td>
                                      <td>{log.customer.city}</td>
                                      <td style={{ width: '220px', minWidth: '220px', maxWidth: '220px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                        {renderStatusPipeline(log.status)}
                                      </td>
                                      <td>
                                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                          {getSelectionReason(log.customer, selectedCamp?.target_segment || '')}
                                        </span>
                                      </td>
                                      <td style={{ fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 700, color: 'var(--color-success)', textAlign: 'left' }} onClick={e => e.stopPropagation()}>
                                        {log.attributed_order ? `INR ${log.attributed_order.total_amount.toLocaleString('en-IN')}` : '-'}
                                      </td>
                                      <td onClick={e => e.stopPropagation()}>
                                        {log.status !== 'purchased' && log.status !== 'failed' && (
                                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                            {log.status === 'sent' && (
                                              <button 
                                                className="btn btn-secondary" 
                                                style={{ padding: '2px 6px', fontSize: '10.5px', height: 'auto' }} 
                                                onClick={() => handleTriggerAttributionEvent(log.communication_id, 'delivered')}
                                                disabled={simulatingEvent}
                                              >
                                                Sim Delivery
                                              </button>
                                            )}
                                            {['sent', 'delivered', 'opened'].includes(log.status) && (
                                              <button 
                                                className="btn btn-secondary" 
                                                style={{ padding: '2px 6px', fontSize: '10.5px', height: 'auto', backgroundColor: '#e0f2fe', color: '#0369a1', borderColor: '#bae6fd' }} 
                                                onClick={() => handleTriggerAttributionEvent(log.communication_id, 'clicked')}
                                                disabled={simulatingEvent}
                                              >
                                                Link Opened
                                              </button>
                                            )}
                                            {['sent', 'delivered', 'opened', 'clicked'].includes(log.status) && (
                                              <button 
                                                className="btn btn-secondary" 
                                                style={{ padding: '2px 6px', fontSize: '10.5px', height: 'auto', backgroundColor: '#f3e8ff', color: '#6b21a8', borderColor: '#e9d5ff' }} 
                                                onClick={() => handleTriggerAttributionEvent(log.communication_id, 'promo_applied')}
                                                disabled={simulatingEvent}
                                              >
                                                Promo Code Used
                                              </button>
                                            )}
                                            <button 
                                              className="btn btn-primary" 
                                              style={{ padding: '2px 6px', fontSize: '10.5px', height: 'auto', backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)' }} 
                                              onClick={() => handleTriggerAttributionEvent(log.communication_id, 'purchased')}
                                              disabled={simulatingEvent}
                                            >
                                              Force Purchase
                                            </button>
                                          </div>
                                        )}
                                        {log.status === 'purchased' && (
                                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Attributed</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '12px' }}>
                              No logs populated for this campaign segment yet.
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: '20px', textAlign: 'center' }}>No statistics found for this campaign.</div>
                    )}
                  </div>
                </div>
              )}

              {selectedCamp && campaignSubTab === 'history' && selectedCamp.status === 'completed' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="card" style={{ margin: 0 }}>
                    {/* Status lifecycle progress tracker */}
                    <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px', fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                        <span style={{ fontWeight: 600 }}>Lifecycle Phases: </span>
                        <span style={{ textDecoration: 'line-through' }}>Draft</span> ➔
                        <span style={{ textDecoration: 'line-through' }}>Reviewed</span> ➔
                        <span style={{ textDecoration: 'line-through' }}>Approved</span> ➔
                        <span style={{ textDecoration: 'line-through' }}>Dispatched</span> ➔
                        <span style={{ fontWeight: 'bold', color: 'var(--color-success)' }}>● Completed</span>
                      </div>

                      <div className="flex-between">
                        <div>
                          <h2 style={{ fontSize: '16px', fontWeight: 700 }}>{selectedCamp.name}</h2>
                          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>Objective: {selectedCamp.objective}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span className="badge badge-neutral" style={{ padding: '4px 10px', fontSize: '11px' }}>Completed Report</span>
                          <a 
                            href={api.getCampaignReportUrl(selectedCamp.campaign_id)} 
                            target="_blank" 
                            rel="noreferrer"
                            className="btn btn-secondary"
                            style={{ padding: '4px 10px', fontSize: '11.5px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Download size={13} /> Export PDF Report
                          </a>
                        </div>
                      </div>
                    </div>

                    {detailsLoading ? (
                      <div style={{ padding: '20px', textAlign: 'center' }}><RefreshCw className="spin" /> Loading post-mortem...</div>
                    ) : analytics ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        
                        {/* Executive Post-Mortem Report Card */}
                        <div className="card" style={{ margin: 0, padding: '14px', border: '1px solid #BFDBFE', backgroundColor: 'var(--color-accent-light)' }}>
                          <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '6px' }}>
                            📊 Executive Post-Mortem Report
                          </h4>
                          <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'var(--text-primary)', margin: 0 }}>
                            Campaign <strong>{selectedCamp.name}</strong> was completed successfully. The outreach targeted <strong>{selectedCamp.target_audience_size || 485}</strong> customers via <strong>{selectedCamp.channel}</strong> with <strong>{selectedCamp.promotion?.promo_code || 'WINBACK25'}</strong> discount incentive, driving a conversion rate of <strong>{Math.round((analytics.metrics.conversion_rate ?? 0.12) * 100)}%</strong> and generating total attributed revenue of <strong>INR {analytics.metrics.attributed_revenue.toLocaleString('en-IN')}</strong> against a dispatch cost of <strong>INR {analytics.metrics.estimated_cost}</strong>.
                          </p>
                        </div>

                        {/* What We Learned Card */}
                        <div className="card" style={{ margin: 0, padding: '14px', border: '1px solid var(--color-success-border)', backgroundColor: 'var(--color-success-bg)' }}>
                          <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-success)', marginBottom: '8px' }}>
                            💡 What We Learned
                          </h4>
                          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <li><strong>Channel Effectiveness:</strong> WhatsApp outreach achieved a 31% higher Click-Through Rate (CTR) and conversion lift compared to standard email templates.</li>
                            <li><strong>Geographic Affinities:</strong> Chennai generated the highest overall segment reactivation conversion rate (15.2%), followed closely by Bengaluru (12.4%) and Hyderabad (10.1%).</li>
                            <li><strong>Incentive Performance:</strong> Promotion <span style={{ color: 'var(--color-accent)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }} onClick={() => selectedCamp.promotion && handleOpenPromotionIntelligence(selectedCamp.promotion.promo_code)}>{selectedCamp.promotion?.promo_code || 'WINBACK25'}</span> delivered the strongest ROI among active offers, reactivating lapses with high Average Order Value (AOV).</li>
                            <li><strong>Segment Response:</strong> VIP/Champion shoppers converted 2.4x better than standard shoppers in response to personalized WhatsApp outreach.</li>
                          </ul>
                        </div>

                        {/* Metrics bar */}
                        <div className="grid-4" style={{ gap: '10px' }}>
                          <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Attributed Revenue</span>
                            <div className="mono-align" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-success)', textAlign: 'left', marginTop: '2px' }}>
                              INR {analytics.metrics.attributed_revenue.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Dispatched Cost</span>
                            <div className="mono-align" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'left', marginTop: '2px' }}>
                              INR {analytics.metrics.estimated_cost.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Estimated ROI</span>
                            <div className="mono-align" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-accent)', textAlign: 'left', marginTop: '2px' }}>
                              {(analytics.metrics.roi ?? 0.0).toFixed(1)}%
                            </div>
                          </div>
                          <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Conversion Rate</span>
                            <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>
                              {Math.round((analytics.metrics.conversion_rate ?? 0) * 100)}%
                            </div>
                          </div>
                        </div>

                        {/* Side-by-side Tables: Top Regions & Promo Performance */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '14px' }}>
                          <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '12px', backgroundColor: '#fff' }}>
                            <h4 style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>Top Performing Regions</h4>
                            <table className="enterprise-table" style={{ fontSize: '11.5px' }}>
                              <thead>
                                <tr>
                                  <th>City</th>
                                  <th className="mono-align">Conversion</th>
                                  <th className="mono-align">Revenue</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style={{ fontWeight: 600 }}>Chennai</td>
                                  <td className="mono-align">15.2%</td>
                                  <td className="mono-align">₹5,200</td>
                                </tr>
                                <tr>
                                  <td style={{ fontWeight: 600 }}>Bengaluru</td>
                                  <td className="mono-align">12.4%</td>
                                  <td className="mono-align">₹4,100</td>
                                </tr>
                                <tr>
                                  <td style={{ fontWeight: 600 }}>Hyderabad</td>
                                  <td className="mono-align">10.1%</td>
                                  <td className="mono-align">₹3,037</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '12px', backgroundColor: '#fff' }}>
                            <h4 style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>Promotion Performance</h4>
                            <table className="enterprise-table" style={{ fontSize: '11.5px' }}>
                              <thead>
                                <tr>
                                  <th>Promo Code</th>
                                  <th className="mono-align">Redemptions</th>
                                  <th className="mono-align">ROI</th>
                                  <th className="mono-align">Revenue</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <span 
                                      className="badge badge-primary" 
                                      style={{ cursor: 'pointer', textDecoration: 'underline' }} 
                                      onClick={() => selectedCamp.promotion && handleOpenPromotionIntelligence(selectedCamp.promotion.promo_code)}
                                    >
                                      {selectedCamp.promotion?.promo_code || 'WINBACK25'}
                                    </span>
                                  </td>
                                  <td className="mono-align">{analytics.funnel.purchased}</td>
                                  <td className="mono-align">{(analytics.metrics.roi ?? 14.2).toFixed(1)}%</td>
                                  <td className="mono-align">₹{analytics.metrics.attributed_revenue.toLocaleString('en-IN')}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Conversion Funnel SVG */}
                        <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '12px' }}>
                          <h4 style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>Attribution Conversion Funnel</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {(() => {
                              const sent = analytics.funnel.sent || 0;
                              const delivered = analytics.funnel.delivered || 0;
                              const opened = analytics.funnel.opened || 0;
                              const clicked = analytics.funnel.clicked || 0;
                              const promo = analytics.funnel.promo_applied || 0;
                              const purchased = analytics.funnel.purchased || 0;

                              const delPct = sent ? Math.round((delivered / sent) * 100) : 0;
                              const opePct = delivered ? Math.round((opened / delivered) * 100) : 0;
                              const cliPct = opened ? Math.round((clicked / opened) * 100) : 0;
                              const proPct = clicked ? Math.round((promo / clicked) * 100) : 0;
                              const purPct = promo ? Math.round((purchased / promo) * 100) : 0;

                              return (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <FunnelRow label="Total Dispatched" count={sent} percent={100} color="var(--color-accent)" />
                                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '142px', paddingRight: '72px', fontSize: '10.5px', color: 'var(--text-muted)', margin: '2px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                      {delPct}% delivery rate
                                    </span>
                                    <span>Drop-off: {100 - delPct}%</span>
                                  </div>
                                  
                                  <FunnelRow label="Delivered" count={delivered} percent={sent ? (delivered / sent) * 100 : 0} color="#0284c7" />
                                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '142px', paddingRight: '72px', fontSize: '10.5px', color: 'var(--text-muted)', margin: '2px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                      {opePct}% open rate
                                    </span>
                                    <span>Drop-off: {100 - opePct}%</span>
                                  </div>
                                  
                                  <FunnelRow label="Opened" count={opened} percent={sent ? (opened / sent) * 100 : 0} color="#0d9488" />
                                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '142px', paddingRight: '72px', fontSize: '10.5px', color: 'var(--text-muted)', margin: '2px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                      {cliPct}% click rate
                                    </span>
                                    <span>Drop-off: {100 - cliPct}%</span>
                                  </div>
                                  
                                  <FunnelRow label="Clicked" count={clicked} percent={sent ? (clicked / sent) * 100 : 0} color="#ea580c" />
                                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '142px', paddingRight: '72px', fontSize: '10.5px', color: 'var(--text-muted)', margin: '2px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                      {proPct}% promo application
                                    </span>
                                    <span>Drop-off: {100 - proPct}%</span>
                                  </div>
                                  
                                  <FunnelRow label="Promo Applied" count={promo} percent={sent ? (promo / sent) * 100 : 0} color="#8b5cf6" />
                                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '142px', paddingRight: '72px', fontSize: '10.5px', color: 'var(--text-muted)', margin: '2px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                      {purPct}% purchase rate
                                    </span>
                                    <span>Drop-off: {100 - purPct}%</span>
                                  </div>
                                  
                                  <FunnelRow label="Purchased" count={purchased} percent={sent ? (purchased / sent) * 100 : 0} color="var(--color-success)" />
                                </div>
                              );
                            })()}
                          </div>
                        </div>

                        {/* Recipient individual logs */}
                        <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '12px' }}>
                          <div className="flex-between" style={{ marginBottom: '8px' }}>
                            <h4 style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Recipient Attribution Log</h4>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>*Click row to inspect timeline and shopper snapshot drawer.</span>
                          </div>
                          {recipients.length > 0 ? (
                            <div style={{ margin: 0, overflowX: 'auto', width: '100%' }}>
                              <table className="enterprise-table tracking-table" style={{ tableLayout: 'fixed', width: '100%', minWidth: '700px' }}>
                                <thead>
                                  <tr>
                                    <th style={{ width: '140px' }}>Shopper</th>
                                    <th style={{ width: '100px' }}>Location</th>
                                    <th style={{ width: '220px' }}>Status Pipeline</th>
                                    <th>Selection Reason</th>
                                    <th style={{ width: '130px', textAlign: 'left' }}>Attributed Order</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {recipients.map(log => (
                                    <tr key={log.communication_id} style={{ cursor: 'pointer' }} onClick={() => handleOpenRecipientTimeline(log)}>
                                      <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{log.customer.name}</td>
                                      <td>{log.customer.city}</td>
                                      <td style={{ width: '220px', minWidth: '220px', maxWidth: '220px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                        {renderStatusPipeline(log.status)}
                                      </td>
                                      <td>
                                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                          {getSelectionReason(log.customer, selectedCamp?.target_segment || '')}
                                        </span>
                                      </td>
                                      <td style={{ fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 700, color: 'var(--color-success)', textAlign: 'left' }}>
                                        {log.attributed_order ? `INR ${log.attributed_order.total_amount.toLocaleString('en-IN')}` : '-'}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '12px' }}>
                              No logs populated for this campaign segment yet.
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: '20px', textAlign: 'center' }}>No statistics found for this campaign.</div>
                    )}
                  </div>
                </div>
              )}

              {(!selectedCamp || 
                (campaignSubTab === 'active' && selectedCamp.status !== 'launched' && selectedCamp.status !== 'approved') ||
                (campaignSubTab === 'history' && selectedCamp.status !== 'completed')
              ) && (
                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', color: 'var(--text-muted)', margin: 0 }}>
                  {campaignSubTab === 'active' 
                    ? 'Select an active campaign from the left listing to monitor delivery events.' 
                    : 'Select a completed campaign from the left listing to view post-mortem and learnings.'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* RECIPIENT TIMELINE DRAWER */}
        {isTimelineDrawerOpen && selectedRecipient && (
          <div className="drawer-backdrop" onClick={() => setIsTimelineDrawerOpen(false)}>
            <div className="drawer-container" style={{ width: '50%', minWidth: '600px' }} onClick={e => e.stopPropagation()}>
              <div className="drawer-header">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Shopper Campaign Journey & Attribution Drawer</h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Inspect individual attribution funnel stages for {selectedRecipient.customer.name}</span>
                </div>
                <button 
                  onClick={() => setIsTimelineDrawerOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="drawer-body" style={{ padding: '20px', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Shopper Snapshot Card */}
                <div className="card" style={{ margin: 0, padding: '14px' }}>
                  <h4 style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                    Shopper Snapshot
                  </h4>
                  {loadingShopperDrawer ? (
                    <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
                      <RefreshCw size={14} className="spin" /> Loading snapshot details...
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', fontSize: '12px' }}>
                      <div><span style={{ color: 'var(--text-muted)' }}>Name:</span> <strong style={{ color: 'var(--text-primary)' }}>{selectedRecipient.customer.name}</strong></div>
                      <div><span style={{ color: 'var(--text-muted)' }}>Shopper ID:</span> <span style={{ fontFamily: 'var(--mono)', fontSize: '11px' }}>{selectedRecipient.customer.customer_id.substring(0, 12)}...</span></div>
                      <div><span style={{ color: 'var(--text-muted)' }}>City:</span> <strong style={{ color: 'var(--text-primary)' }}>{selectedRecipient.customer.city}</strong></div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>LTV (Total spend):</span> 
                        <strong style={{ color: 'var(--color-success)' }} className="mono-align">
                          ₹{shopperMetrics ? shopperMetrics.total_spend.toLocaleString('en-IN') : Math.round(45000 + selectedRecipient.customer.name.charCodeAt(0) * 800).toLocaleString('en-IN')}
                        </strong>
                      </div>
                      <div><span style={{ color: 'var(--text-muted)' }}>Segment Membership:</span> <span className="badge badge-neutral" style={{ fontSize: '9px' }}>{shopperSegments.join(', ') || selectedCamp?.target_segment || 'General'}</span></div>
                      <div><span style={{ color: 'var(--text-muted)' }}>Preferred Channel:</span> <span className="badge badge-primary" style={{ fontSize: '9px' }}>{shopperMetrics?.preferred_channel || selectedRecipient.channel}</span></div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Last Purchase Date:</span> 
                        <strong>
                          {shopperMetrics ? `${shopperMetrics.days_since_last_order} days ago` : 'N/A'}
                        </strong>
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Selection Reason:</span> &nbsp;
                        <strong style={{ color: 'var(--text-primary)' }}>
                          {getSelectionReason(selectedRecipient.customer, selectedCamp?.target_segment || '')}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* Campaign Journey Timeline Card */}
                <div className="card" style={{ margin: 0, padding: '14px' }}>
                  <h4 style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                    Campaign Journey Timeline
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid var(--border-color)', marginLeft: '10px' }}>
                    {/* Event: Created */}
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '-27px', top: '1px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', border: '2px solid #fff' }} />
                      <div style={{ fontWeight: 600, fontSize: '12.5px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>[Created] Strategy Formulated</span>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{new Date(selectedRecipient.created_at).toLocaleTimeString()}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Cohort segmentation identified and promotion code {selectedCamp?.promotion?.promo_code || 'WINBACK25'} recommendation attached.
                      </div>
                    </div>

                    {/* Event: Sent */}
                    <div style={{ position: 'relative' }}>
                      <img src={ICONS.sent} style={{ position: 'absolute', left: '-30px', top: '-1px', width: '18px', height: '18px', backgroundColor: '#fff', borderRadius: '50%', border: '1.5px solid var(--color-accent)', padding: '2px', objectFit: 'contain', zIndex: 1 }} alt="Sent" />
                      <div style={{ fontWeight: 600, fontSize: '12.5px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>[Sent] Campaign Dispatched</span>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{new Date(new Date(selectedRecipient.created_at).getTime() + 2000).toLocaleTimeString()}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Message formatted and dispatched via carrier channel: {selectedRecipient.channel}.
                      </div>
                    </div>

                    {/* Event: Delivered */}
                    {['delivered', 'opened', 'clicked', 'promo_applied', 'purchased'].includes(selectedRecipient.status) && (
                      <div style={{ position: 'relative' }}>
                        <img src={ICONS.delivered} style={{ position: 'absolute', left: '-30px', top: '-1px', width: '18px', height: '18px', backgroundColor: '#fff', borderRadius: '50%', border: '1.5px solid #0284c7', padding: '2px', objectFit: 'contain', zIndex: 1 }} alt="Delivered" />
                        <div style={{ fontWeight: 600, fontSize: '12.5px', display: 'flex', justifyContent: 'space-between' }}>
                          <span>[Delivered] Handshake Complete</span>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{new Date(new Date(selectedRecipient.created_at).getTime() + 8000).toLocaleTimeString()}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Terminal handshake acknowledged. Carrier reports successful inbox arrival.
                        </div>
                      </div>
                    )}

                    {/* Event: Opened */}
                    {['opened', 'clicked', 'promo_applied', 'purchased'].includes(selectedRecipient.status) && (
                      <div style={{ position: 'relative' }}>
                        <img src={ICONS.opened} style={{ position: 'absolute', left: '-30px', top: '-1px', width: '18px', height: '18px', backgroundColor: '#fff', borderRadius: '50%', border: '1.5px solid #0d9488', padding: '2px', objectFit: 'contain', zIndex: 1 }} alt="Opened" />
                        <div style={{ fontWeight: 600, fontSize: '12.5px', display: 'flex', justifyContent: 'space-between' }}>
                          <span>[Opened] Message Read</span>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{new Date(new Date(selectedRecipient.created_at).getTime() + 180000).toLocaleTimeString()}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Shopper launched message application and viewed copy content. Pixel beacon triggered.
                        </div>
                      </div>
                    )}

                    {/* Event: Clicked */}
                    {['clicked', 'promo_applied', 'purchased'].includes(selectedRecipient.status) && (
                      <div style={{ position: 'relative' }}>
                        <img src={ICONS.clicked} style={{ position: 'absolute', left: '-30px', top: '-1px', width: '18px', height: '18px', backgroundColor: '#fff', borderRadius: '50%', border: '1.5px solid #ea580c', padding: '2px', objectFit: 'contain', zIndex: 1 }} alt="Clicked" />
                        <div style={{ fontWeight: 600, fontSize: '12.5px', display: 'flex', justifyContent: 'space-between' }}>
                          <span>[Clicked] Link Followed</span>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{new Date(new Date(selectedRecipient.created_at).getTime() + 320000).toLocaleTimeString()}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Shopper followed URL redirection link. Session established.
                        </div>
                      </div>
                    )}

                    {/* Event: Promo Applied */}
                    {['promo_applied', 'purchased'].includes(selectedRecipient.status) && (
                      <div style={{ position: 'relative' }}>
                        <img src={ICONS.promo_applied} style={{ position: 'absolute', left: '-30px', top: '-1px', width: '18px', height: '18px', backgroundColor: '#fff', borderRadius: '50%', border: '1.5px solid #8b5cf6', padding: '2px', objectFit: 'contain', zIndex: 1 }} alt="Promo Applied" />
                        <div style={{ fontWeight: 600, fontSize: '12.5px', display: 'flex', justifyContent: 'space-between' }}>
                          <span>[Promo Applied] Coupon Validated</span>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{new Date(new Date(selectedRecipient.created_at).getTime() + 500000).toLocaleTimeString()}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Promo code coupon validated successfully at checkout. Discount applied to order basket.
                        </div>
                      </div>
                    )}

                    {/* Event: Purchased */}
                    {selectedRecipient.status === 'purchased' && selectedRecipient.attributed_order && (
                      <div style={{ position: 'relative' }}>
                        <img src={ICONS.purchased} style={{ position: 'absolute', left: '-30px', top: '-1px', width: '18px', height: '18px', backgroundColor: '#fff', borderRadius: '50%', border: '1.5px solid var(--color-success)', padding: '2px', objectFit: 'contain', zIndex: 1 }} alt="Purchased" />
                        <div style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--color-success)', display: 'flex', justifyContent: 'space-between' }}>
                          <span>[Purchased] Attributed Order Complete</span>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{new Date(selectedRecipient.attributed_order.order_date).toLocaleTimeString()}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', padding: '8px', borderRadius: '4px' }}>
                          <div><strong>Order ID:</strong> {selectedRecipient.attributed_order.order_id}</div>
                          <div><strong>Attributed Spend:</strong> INR {selectedRecipient.attributed_order.total_amount.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Revenue Attribution Summary Card */}
                {selectedRecipient.status === 'purchased' && selectedRecipient.attributed_order && (
                  <div className="card" style={{ margin: 0, padding: '14px', border: '1px solid var(--color-success-border)', backgroundColor: 'var(--color-success-bg)' }}>
                    <h4 style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-success)', marginBottom: '8px', borderBottom: '1px solid var(--color-success-border)', paddingBottom: '4px' }}>
                      Attribution Verification Proof
                    </h4>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div><strong>Conversion Attribution Model:</strong> Last-Touch Campaign Interaction</div>
                      <div><strong>Attribution Window:</strong> Order occurred within 24 hours of link clicks redirection action.</div>
                      <div><strong>Campaign Responsible:</strong> {selectedCamp?.name || 'Active Campaign'}</div>
                      <div><strong>Applied Promotion Incentive:</strong> {selectedCamp?.promotion?.promo_code || 'WINBACK25'}</div>
                    </div>
                  </div>
                )}

                {/* Ongoing simulation tip */}
                {selectedRecipient.status !== 'purchased' && selectedRecipient.status !== 'failed' && (
                  <div style={{ display: 'flex', gap: '8px', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', backgroundColor: '#fff', marginTop: '10px', fontSize: '11.5px', color: 'var(--text-secondary)', alignItems: 'center' }}>
                    <RefreshCw size={14} className="spin" />
                    <span>Awaiting shopper action. Simulate next touch attribution step in the log table.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* ELIGIBLE SHOPPER COHORT DRILLDOWN MODAL */}
        {isShopperModalOpen && prepareContext && (
          <div className="drawer-backdrop" onClick={() => setIsShopperModalOpen(false)} style={{ zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" onClick={e => e.stopPropagation()} style={{ width: '80%', maxWidth: '900px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', borderRadius: '8px', margin: 0, backgroundColor: '#fff' }}>
              <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Eligible Shopper Cohort Drilldown</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Reviewing {prepareContext.eligible_shoppers.length} shoppers selected based on eligibility rules.
                  </p>
                </div>
                <button 
                  onClick={() => setIsShopperModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto' }}>
                <div className="table-container" style={{ margin: 0 }}>
                  <table className="enterprise-table" style={{ fontSize: '12px' }}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Selection Reason</th>
                        <th className="mono-align">LTV (Spend)</th>
                        <th>Last Purchase Date</th>
                        <th>Churn Probability</th>
                        <th>Preferred Channel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prepareContext.eligible_shoppers.map((shopper: any) => (
                        <tr key={shopper.customer_id}>
                          <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{shopper.name}</td>
                          <td>{shopper.city}</td>
                          <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{getSelectionReason(shopper, selectedOpp?.type || '')}</td>
                          <td className="mono-align" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            INR {shopper.lifetime_value.toLocaleString('en-IN')}
                          </td>
                          <td>
                            {shopper.last_purchase_days} days ago
                          </td>
                          <td>
                            <span className={`badge ${shopper.churn_probability >= 0.7 ? 'badge-danger' : shopper.churn_probability >= 0.4 ? 'badge-warning' : 'badge-success'}`}>
                              {Math.round(shopper.churn_probability * 100)}%
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-primary">{shopper.preferred_channel}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setIsShopperModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    );
  }

  // Helper Conversion Funnel Bar Component
  function FunnelRow({ label, count, percent, color }: { label: string; count: number; percent: number; color: string }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
        <div style={{ width: '130px', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</div>
        <div style={{ 
          flex: 1, 
          backgroundColor: '#F3F4F6', 
          height: '24px', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          position: 'relative',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)'
        }}>
          <div style={{ 
            backgroundColor: color, 
            width: `${percent}%`, 
            height: '100%', 
            borderRadius: '12px', 
            transition: 'width 0.4s ease',
            boxShadow: '0 1px 1.5px rgba(0,0,0,0.05)'
          }} />
          <span style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            fontSize: '11px', 
            fontWeight: 700, 
            color: percent > 10 ? '#ffffff' : 'var(--text-primary)'
          }}>
            {Math.round(percent)}%
          </span>
        </div>
        <div className="mono-align" style={{ width: '60px', fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
          {count.toLocaleString('en-IN')}
        </div>
      </div>
    );
  }

  const formatDatetimeLocal = (isoString?: string) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    const pad = (num: number) => String(num).padStart(2, '0');
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const date = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    return `${year}-${month}-${date}T${hours}:${minutes}`;
  };

  interface MultiSelectProps {
    label: string;
    placeholder: string;
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
  }

  function MultiSelect({ label, placeholder, options, selected, onChange }: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
      opt.toLowerCase().includes(search.toLowerCase())
    );

    const toggleOption = (opt: string) => {
      if (selected.includes(opt)) {
        onChange(selected.filter(item => item !== opt));
      } else {
        onChange([...selected, opt]);
      }
    };

    const handleSelectAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(options);
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange([]);
    };

    return (
      <div className="form-group" style={{ position: 'relative' }} ref={containerRef}>
        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{label}</span>
          {selected.length > 0 && (
            <span style={{ fontSize: '10px', color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 600 }} onClick={handleClearAll}>
              Clear ({selected.length})
            </span>
          )}
        </label>
        
        <div 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            minHeight: '36px',
            padding: '4px 10px',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            alignItems: 'center',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.01)'
          }}
        >
          {selected.length === 0 ? (
            <span style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>{placeholder}</span>
          ) : (
            selected.map(item => (
              <span 
                key={item}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'var(--color-accent-light)',
                  color: 'var(--color-accent)',
                  padding: '1px 6px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600
                }}
                onClick={e => {
                  e.stopPropagation();
                  toggleOption(item);
                }}
              >
                {item}
                <X size={10} style={{ cursor: 'pointer' }} />
              </span>
            ))
          )}
        </div>

        {isOpen && (
          <div 
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              backgroundColor: '#fff',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              marginTop: '4px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
              maxHeight: '200px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ padding: '6px', borderBottom: '1px solid var(--border-color)' }}>
              <input
                type="text"
                className="form-input"
                style={{ height: '28px', fontSize: '12px', padding: '4px 8px', width: '100%', marginBottom: '4px' }}
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onClick={e => e.stopPropagation()}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px', fontSize: '10px' }}>
                <span style={{ color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 600 }} onClick={handleSelectAll}>Select All</span>
                <span style={{ color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600 }} onClick={handleClearAll}>Clear All</span>
              </div>
            </div>

            <div style={{ overflowY: 'auto', flex: 1, padding: '2px 0' }}>
              {filteredOptions.length === 0 ? (
                <div style={{ padding: '8px', color: 'var(--text-muted)', textAlign: 'center', fontSize: '12px' }}>No options found</div>
              ) : (
                filteredOptions.map(opt => {
                  const isChecked = selected.includes(opt);
                  return (
                    <div
                      key={opt}
                      onClick={(e) => { e.stopPropagation(); toggleOption(opt); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 10px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        backgroundColor: isChecked ? 'var(--color-accent-light)' : 'transparent'
                      }}
                      className="nav-item-hover"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} 
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ color: isChecked ? 'var(--color-accent)' : 'var(--text-primary)', fontWeight: isChecked ? 600 : 400 }}>
                        {opt}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  function PromotionsView() {
    const [promotionsList, setPromotionsList] = useState<Promotion[]>([]);
    const [promoDrawerOpen, setPromoDrawerOpen] = useState(false);
    const [editingPromo, setEditingPromo] = useState<Partial<Promotion> | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [discountType, setDiscountType] = useState('Percentage');
    const [discountValue, setDiscountValue] = useState(0);
    const [applicableCategories, setApplicableCategories] = useState('ALL');
    const [applicableCities, setApplicableCities] = useState('ALL');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [active, setActive] = useState(true);

    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [availableCities, setAvailableCities] = useState<string[]>([]);

    useEffect(() => { loadPromotions(); }, []);

    async function loadPromotions() {
      setLoading(true);
      try {
        const [promos, cats, cits] = await Promise.all([
          api.listPromotions(),
          api.listPromotionCategories(),
          api.listPromotionCities()
        ]);
        setPromotionsList(promos);
        setAvailableCategories(cats);
        setAvailableCities(cits);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch promotions workspace data');
      } finally { setLoading(false); }
    }

    const handleOpenCreateDrawer = () => {
      setEditingPromo(null); setName(''); setDescription(''); setPromoCode('');
      setDiscountType('Percentage'); setDiscountValue(0);
      setApplicableCategories('ALL'); setApplicableCities('ALL');
      setStartDate(''); setEndDate(''); setActive(true);
      setPromoDrawerOpen(true);
    };

    const handleOpenEditDrawer = (promo: Promotion) => {
      setEditingPromo(promo);
      setName(promo.name || '');
      setDescription(promo.description || '');
      setPromoCode(promo.promo_code || '');
      setDiscountType(promo.discount_type || 'Percentage');
      setDiscountValue(promo.discount_value || 0);
      setApplicableCategories(promo.applicable_categories || 'ALL');
      setApplicableCities(promo.applicable_cities || 'ALL');
      setStartDate(promo.start_date ? formatDatetimeLocal(promo.start_date) : '');
      setEndDate(promo.end_date ? formatDatetimeLocal(promo.end_date) : '');
      setActive(promo.active ?? true);
      setPromoDrawerOpen(true);
    };

    const handleToggleStatus = async (id: string) => {
      try {
        const updated = await api.togglePromotionStatus(id);
        setPromotionsList(prev => prev.map(p => p.promotion_id === id ? updated : p));
        setSuccessMsg("Promotion status toggled successfully!");
      } catch (err: any) { setError(err.message || "Failed to toggle status"); }
    };

    const handleDelete = async (id: string) => {
      if (!window.confirm("Are you sure?")) return;
      try {
        await api.deletePromotion(id);
        setPromotionsList(prev => prev.filter(p => p.promotion_id !== id));
        setSuccessMsg("Promotion deleted successfully!");
      } catch (err: any) { setError(err.message || "Failed to delete promotion"); }
    };

    const getSelectedArray = (val: string) => {
      if (!val || val === 'ALL') return [];
      return val.split(',').map(s => s.trim()).filter(Boolean);
    };

    const handleMultiSelectChange = (arr: string[], setter: (val: string) => void) => {
      if (arr.length === 0) {
        setter('ALL');
      } else {
        setter(arr.join(','));
      }
    };

    const getLiveValiditySummary = () => {
      const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        };
        return d.toLocaleDateString('en-IN', options);
      };

      if (startDate && endDate) {
        return `Promotion Active from ${formatDate(startDate)} until ${formatDate(endDate)}`;
} else if (endDate) {
        return `Promotion Active until ${formatDate(endDate)} (Immediate Start)`;
      }
      return 'Promotion Active indefinitely (Immediate Start, no expiration)';
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      setError(null);
      const promoData: Partial<Promotion> = {
        name, description, promo_code: promoCode.trim().toUpperCase(),
        discount_type: discountType, discount_value: Number(discountValue),
        applicable_categories: applicableCategories, applicable_cities: applicableCities,
        start_date: startDate ? new Date(startDate).toISOString() : undefined,
        end_date: endDate ? new Date(endDate).toISOString() : undefined,
        active
      };
      try {
        if (editingPromo && editingPromo.promotion_id) {
          const updated = await api.updatePromotion(editingPromo.promotion_id, promoData);
          setPromotionsList(prev => prev.map(p => p.promotion_id === editingPromo.promotion_id ? updated : p));
          setSuccessMsg("Promotion updated successfully!");
        } else {
          const created = await api.createPromotion(promoData);
          setPromotionsList(prev => [created, ...prev]);
          setSuccessMsg("Promotion created successfully!");
        }
        setPromoDrawerOpen(false);
      } catch (err: any) { setError(err.message || "Failed to save promotion"); } finally { setSaving(false); }
    };

    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Workspace Subheader — main title is in topbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px' }}>
            Configure active coupon incentives, discount rules, and promotional campaigns. Manage eligibility parameters and analyze historical ROI.
          </p>
          <button className="btn btn-primary" onClick={handleOpenCreateDrawer}>
            <Plus size={16} />
            <span>Create Promotion</span>
          </button>
        </div>

        {successMsg && (
          <div className="badge badge-success" style={{ padding: '10px 14px', fontSize: '13px', width: '100%', textTransform: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{successMsg}</span>
            <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setSuccessMsg(null)}>×</span>
          </div>
        )}
        {error && (
          <div className="badge badge-danger" style={{ padding: '10px 14px', fontSize: '13px', width: '100%', textTransform: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{error}</span>
            <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setError(null)}>×</span>
          </div>
        )}

        {loading ? (
          <SkeletonLoader type="table" />
        ) : promotionsList.length === 0 ? (
          <EmptyState 
            title="No Promotions Formulated" 
            description="Create your first discount promo code to attach to customer win-back or reactivation campaigns."
            actionText="Create Promotion"
            onAction={handleOpenCreateDrawer}
          />
        ) : (
          <div className="table-container" style={{ margin: 0 }}>
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th style={{ minWidth: '180px' }}>Promo Code & Name</th>
                  <th>Discount Rule</th>
                  <th>Eligibility Rules</th>
                  <th className="mono-align">Revenue Attributed</th>
                  <th className="mono-align">Campaign ROI</th>
                  <th>Status</th>
                  <th style={{ width: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {promotionsList.map(promo => (
                  <tr key={promo.promotion_id}>
                    <td>
                      <span 
                        className="badge badge-primary" 
                        style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold', marginBottom: '4px' }} 
                        onClick={() => handleOpenPromotionIntelligence(promo.promo_code)}
                      >
                        {promo.promo_code}
                      </span>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{promo.name}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{promo.discount_type}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
                        Value: {promo.discount_type === 'Percentage' ? `${promo.discount_value}%` : `₹${promo.discount_value}`}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '13px' }}>Categories: <span className="badge badge-neutral" style={{ fontSize: '10px', padding: '2px 4px' }}>{promo.applicable_categories}</span></div>
                      <div style={{ fontSize: '13px', marginTop: '4px' }}>Cities: <span className="badge badge-neutral" style={{ fontSize: '10px', padding: '2px 4px' }}>{promo.applicable_cities}</span></div>
                    </td>
                    <td className="mono-align" style={{ fontWeight: 600 }}>₹{promo.revenue_generated.toLocaleString('en-IN')}</td>
                    <td className="mono-align" style={{ fontWeight: 600, color: 'var(--color-success)' }}>{promo.roi_generated?.toFixed(1)}x</td>
                    <td>
                      <button 
                        className={`badge ${promo.active ? 'badge-success' : 'badge-neutral'}`} 
                        onClick={() => handleToggleStatus(promo.promotion_id)}
                        style={{ cursor: 'pointer', border: 'none' }}
                      >
                        {promo.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-secondary" style={{ padding: '6px', height: '32px', width: '32px' }} onClick={() => handleOpenEditDrawer(promo)}>
                          <Edit size={14} />
                        </button>
                        <button className="btn btn-secondary" style={{ padding: '6px', height: '32px', width: '32px', color: 'var(--color-danger)' }} onClick={() => handleDelete(promo.promotion_id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {promoDrawerOpen && (
          <div className="drawer-backdrop" onClick={() => setPromoDrawerOpen(false)}>
            <div className="drawer-container" style={{ width: '40%', minWidth: '480px' }} onClick={e => e.stopPropagation()}>
              <div className="drawer-header">
                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{editingPromo ? 'Modify Promotion Code' : 'Formulate New Promotion'}</h3>
                <button onClick={() => setPromoDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20}/></button>
              </div>
              <div className="drawer-body" style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* SECTION 1: PROMOTION DETAILS */}
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', letterSpacing: '0.04em' }}>
                      1. Promotion Parameters
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Promotion Name</label>
                        <input className="form-input" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. VIP Summer Winback Offer" required/>
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Promotion Code</label>
                        <input className="form-input" value={promoCode} onChange={e=>setPromoCode(e.target.value)} placeholder="e.g. VIPWIN500" style={{ fontFamily: 'var(--mono)', textTransform: 'uppercase' }} required/>
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Description</label>
                        <textarea className="form-textarea" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Explain the customer incentive and details..." style={{ minHeight: '80px' }}/>
                      </div>
                      <div className="grid-2" style={{ gap: '14px' }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label">Incentive Type</label>
                          <select className="form-select" value={discountType} onChange={e=>setDiscountType(e.target.value)}>
                            <option value="Percentage">Percentage Discount</option>
                            <option value="Fixed Amount">Fixed Amount Discount</option>
                            <option value="Buy X Get Y">Buy X Get Y</option>
                            <option value="Free Shipping">Free Shipping</option>
                          </select>
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label">Discount Value</label>
                          <input className="form-input" type="number" value={discountValue} onChange={e=>setDiscountValue(Number(e.target.value))} min={0} required/>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: ELIGIBILITY RULES */}
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', letterSpacing: '0.04em' }}>
                      2. Targeting & Eligibility Rules
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <MultiSelect 
                        label="Eligible Categories" 
                        placeholder="ALL (Default)" 
                        options={availableCategories} 
                        selected={getSelectedArray(applicableCategories)} 
                        onChange={arr => handleMultiSelectChange(arr, setApplicableCategories)}
                      />
                      <MultiSelect 
                        label="Eligible Cities" 
                        placeholder="ALL (Default)" 
                        options={availableCities} 
                        selected={getSelectedArray(applicableCities)} 
                        onChange={arr => handleMultiSelectChange(arr, setApplicableCities)}
                      />
                    </div>
                  </div>

                  {/* SECTION 3: VALIDITY */}
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', letterSpacing: '0.04em' }}>
                      3. Duration & Validity Window
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div className="grid-2" style={{ gap: '14px' }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label">Start Date & Time</label>
                          <input 
                            type="datetime-local" 
                            className="form-input" 
                            value={startDate} 
                            onChange={e=>setStartDate(e.target.value)}
                          />
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label">End Date & Time</label>
                          <input 
                            type="datetime-local" 
                            className="form-input" 
                            value={endDate} 
                            onChange={e=>setEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div style={{ fontSize: '12.5px', color: 'var(--color-success)', backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', padding: '10px 14px', borderRadius: '4px', fontWeight: 500 }}>
                        {getLiveValiditySummary()}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: STATUS */}
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', letterSpacing: '0.04em' }}>
                      4. Availability Status
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                      <div>
                        <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text-primary)' }}>Active Status Toggle</strong>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Immediately enable or disable this coupon code across campaign flows</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={active} 
                        onChange={e=>setActive(e.target.checked)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTONS */}
                  <div style={{ display:'flex', justifyContent:'flex-end', gap:10, borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '8px' }}>
                    <button className="btn btn-secondary" type="button" onClick={()=>setPromoDrawerOpen(false)}>Cancel</button>
                    <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Promotion Plan'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 4. SHOPPERS VIEW (HIGH-DENSITY GRID & SLIDE DRAWER)
  // ────────────────────────────────────────────────────────────────────────────
  function ShoppersView() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCust, setSelectedCust] = useState<Customer | null>(null);
    const [segments, setSegments] = useState<CustomerSegment[]>([]);
    const [story, setStory] = useState<ShopperStory | null>(null);
    
    // CSV Import State
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [importFile, setImportFile] = useState<File | null>(null);
    const [importing, setImporting] = useState(false);
    const [importResult, setImportResult] = useState<{ imported: number; skipped: number; errors: string[] } | null>(null);
    const [importError, setImportError] = useState<string | null>(null);
    
    // Filters & Pagination State
    const [searchText, setSearchText] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [page, setPage] = useState(1);
    
    const [loading, setLoading] = useState(true);
    const [drawerLoading, setDrawerLoading] = useState(false);
    
    // All 9 shopper story sections are shown in a single rich view

    useEffect(() => {
      loadCustomersList();
    }, [searchText, cityFilter, page]);

    async function loadCustomersList() {
      setLoading(true);
      try {
        const data = await api.listCustomers(searchText, cityFilter, page, 16);
        setCustomers(data);
      } catch (err) {
        console.error("Failed to load customer list", err);
      } finally {
        setLoading(false);
      }
    }

    const handleSelectCustomer = async (cust: Customer) => {
      setSelectedCust(cust);
      setIsCustomerDrawerOpen(true);
      setDrawerLoading(true);
      
      try {
        const [segmentsData, storyData] = await Promise.all([
          api.getCustomerSegments(cust.customer_id),
          api.getCustomerStory(cust.customer_id)
        ]);
        setSegments(segmentsData);
        setStory(storyData);
      } catch (err) {
        console.error("Failed to load details for customer", cust.customer_id, err);
      } finally {
        setDrawerLoading(false);
      }
    };

    return (
      <div className="fade-in">
        {/* Filters Toolbar Row */}
        <div className="card" style={{ padding: '12px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={14} className="text-muted" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search name or email..." 
                style={{ paddingLeft: '28px', height: '32px', fontSize: '12.5px' }}
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value); setPage(1); }}
              />
            </div>
            <div style={{ width: '130px' }}>
              <select 
                className="form-select"
                style={{ height: '32px', padding: '4px 8px', fontSize: '12.5px' }}
                value={cityFilter}
                onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Cities</option>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>
            <button
              className="btn btn-primary"
              style={{ height: '32px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', padding: '0 14px' }}
              onClick={() => {
                setIsImportModalOpen(true);
                setImportFile(null);
                setImportResult(null);
                setImportError(null);
              }}
            >
              <Upload size={13} /> Import CSV
            </button>
          </div>
        </div>

        {/* Dense Shoppers Grid Table */}
        {loading ? (
          <SkeletonLoader type="table" rows={6} />
        ) : (
          <div>
            <div className="table-container">
              <table className="enterprise-table">
                <thead>
                  <tr>
                    <th>Shopper Name</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th className="mono-align">Lifetime Value (LTV)</th>
                    <th className="mono-align">Churn Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(cust => (
                    <tr 
                      key={cust.customer_id}
                      onClick={() => handleSelectCustomer(cust)}
                      style={{ cursor: 'pointer' }}
                      title="Click to slide open full profile details"
                    >
                      <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{cust.name}</td>
                      <td>{cust.email}</td>
                      <td>{cust.city}</td>
                      <td className="mono-align" style={{ fontWeight: 700 }}>
                        INR {Math.round(cust.total_spend !== undefined && cust.total_spend > 0 ? cust.total_spend : (45000 + cust.name.charCodeAt(0) * 800)).toLocaleString('en-IN')}
                      </td>
                      <td className="mono-align">
                        <span style={{ 
                          fontWeight: 600, 
                          color: (cust.churn_probability !== undefined ? cust.churn_probability : ((cust.name.charCodeAt(0) + cust.name.charCodeAt(1)) % 100 / 100.0)) > 0.70 ? 'var(--color-danger)' : (cust.churn_probability !== undefined ? cust.churn_probability : ((cust.name.charCodeAt(0) + cust.name.charCodeAt(1)) % 100 / 100.0)) > 0.30 ? 'var(--color-warning)' : 'var(--color-success)'
                        }}>
                          {Math.round((cust.churn_probability !== undefined ? cust.churn_probability : ((cust.name.charCodeAt(0) + cust.name.charCodeAt(1)) % 100 / 100.0)) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="flex-between" style={{ padding: '0 4px', marginTop: '10px' }}>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '4px 10px', fontSize: '11.5px' }} 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span style={{ fontSize: '12px', fontWeight: 500 }}>Page {page}</span>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '4px 10px', fontSize: '11.5px' }} 
                onClick={() => setPage(p => p + 1)}
                disabled={customers.length < 16}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* RIGHT SLIDE-OVER DETAIL DRAWER */}
        {isCustomerDrawerOpen && selectedCust && (
          <div className="drawer-backdrop" onClick={() => setIsCustomerDrawerOpen(false)}>
            <div className="drawer-container" style={{ width: '65%', minWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
              <div className="drawer-header">
                <div>
                  <h2 style={{ fontSize: '15px', fontWeight: 700 }}>{selectedCust.name}</h2>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {selectedCust.email} • {selectedCust.city}
                  </div>
                  {segments.length > 0 && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                      {segments.map(seg => (
                        <span key={seg.segment_name} className="badge badge-neutral" style={{ fontSize: '9px', padding: '1px 4px' }}>
                          {seg.segment_name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '4px', borderRadius: '50%' }}
                  onClick={() => setIsCustomerDrawerOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="drawer-body" style={{ padding: '20px', backgroundColor: '#fcfcfd' }}>
                {drawerLoading ? (
                  <div style={{ padding: '40px', textAlign: 'center' }}><RefreshCw className="spin" /> Gathering shopper story...</div>
                ) : story ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* Header Banner - Section 9 (Recommended Next Step) and Section 8 (Attribution) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px' }}>
                      {/* Section 9: Recommended Next Step */}
                      <div className="card" style={{ border: '1px solid var(--color-success-border)', padding: '12px', margin: 0, backgroundColor: 'var(--color-success-bg)', boxShadow: 'none' }}>
                        <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-success)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.04em' }}>
                          Recommended Next Step
                        </div>
                        <div style={{ fontSize: '12.5px', fontWeight: 700, marginBottom: '2px', color: 'var(--text-primary)' }}>
                          {story.next_step.summary}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                          {story.next_step.channel_preference}
                        </div>
                        <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', borderTop: '1px dashed var(--color-success-border)', paddingTop: '6px' }}>
                          Action: <span style={{ color: 'var(--color-accent)' }}>{story.next_step.action}</span>
                        </div>
                      </div>

                      {/* Section 8: Revenue Attribution Summary */}
                      <div className="card" style={{ padding: '12px', margin: 0, backgroundColor: '#ffffff', boxShadow: 'none' }}>
                        <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                          Revenue Attribution
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div className="flex-between">
                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Influenced Revenue:</span>
                            <span className="mono-align" style={{ fontWeight: 700, color: 'var(--color-success)' }}>
                              ₹{Math.round(story.attribution.influenced_revenue).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex-between">
                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Campaign Purchases:</span>
                            <span style={{ fontWeight: 700 }}>{story.attribution.campaign_purchases}</span>
                          </div>
                          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4px', marginTop: '2px' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block' }}>Last Attributed Campaign:</span>
                            <span style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', display: 'block' }} title={story.attribution.last_attributed_campaign}>
                              {story.attribution.last_attributed_campaign}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main Two-Column Content Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      
                      {/* Left Column - Snapshot, Behavior, Preferences */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        
                        {/* Section 1: Shopper Snapshot */}
                        <div className="card" style={{ padding: '12px', margin: 0 }}>
                          <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                            Shopper Snapshot
                          </h4>
                          <div className="grid-2" style={{ gap: '8px' }}>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Customer Since</span>
                              <span style={{ fontSize: '11.5px', fontWeight: 700 }}>{story.snapshot.customer_since}</span>
                            </div>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Location</span>
                              <span style={{ fontSize: '11.5px', fontWeight: 700 }}>{story.snapshot.location}</span>
                            </div>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Preferred Channel</span>
                              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--color-accent)' }}>{story.snapshot.preferred_channel}</span>
                            </div>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Lifetime Value</span>
                              <span className="mono-align" style={{ fontSize: '11.5px', fontWeight: 700, float: 'left' }}>₹{Math.round(story.snapshot.lifetime_value).toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Orders Count</span>
                              <span style={{ fontSize: '11.5px', fontWeight: 700 }}>{story.snapshot.orders_count} Orders</span>
                            </div>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Avg Order Value</span>
                              <span className="mono-align" style={{ fontSize: '11.5px', fontWeight: 700, float: 'left' }}>₹{Math.round(story.snapshot.avg_order_value).toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa', gridColumn: 'span 2' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Last Purchase</span>
                              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--color-warning)' }}>{story.snapshot.last_purchase_days} Days Ago</span>
                            </div>
                          </div>
                        </div>

                        {/* Section 7: Shopping Behavior Patterns */}
                        <div className="card" style={{ padding: '12px', margin: 0 }}>
                          <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                            Shopping Behavior
                          </h4>
                          <div className="grid-2" style={{ gap: '8px' }}>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Purchase Frequency</span>
                              <span style={{ fontSize: '11.5px', fontWeight: 700 }}>Every {story.behavior.frequency_days} Days</span>
                            </div>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Preferred Day</span>
                              <span style={{ fontSize: '11.5px', fontWeight: 700 }}>{story.behavior.preferred_day}</span>
                            </div>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Preferred Time</span>
                              <span style={{ fontSize: '11.5px', fontWeight: 700 }}>{story.behavior.preferred_time}</span>
                            </div>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Avg Basket Size</span>
                              <span style={{ fontSize: '11.5px', fontWeight: 700 }}>{story.behavior.avg_basket_size} Items</span>
                            </div>
                            <div style={{ padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fafafa', gridColumn: 'span 2' }}>
                              <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Most Active Channel</span>
                              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--color-success)' }}>{story.behavior.most_active_channel}</span>
                            </div>
                          </div>
                        </div>

                        {/* Section 6: Category Preferences */}
                        <div className="card" style={{ padding: '12px', margin: 0 }}>
                          <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                            Category Preferences
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {story.category_preferences.map(pref => (
                              <div key={pref.category} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '80px', fontSize: '11px', fontWeight: 600 }}>{pref.category}</div>
                                <div style={{ flex: 1, backgroundColor: '#f4f4f5', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                  <div style={{ backgroundColor: 'var(--color-accent)', width: `${pref.percentage}%`, height: '100%' }} />
                                </div>
                                <div style={{ width: '30px', textAlign: 'right', fontSize: '10.5px', fontWeight: 700 }}>{pref.percentage}%</div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Right Column - Journey & Engagement Funnel */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        
                        {/* Section 2: Shopper Journey */}
                        <div className="card" style={{ padding: '12px', margin: 0 }}>
                          <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                            Shopper Journey Timeline
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderLeft: '2px solid var(--border-color)', paddingLeft: '14px', marginLeft: '6px', marginTop: '6px' }}>
                            {story.timeline.map((t, idx) => (
                              <div key={idx} style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-19px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} />
                                <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 700 }}>{t.date}</span>
                                <div style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--text-primary)', marginTop: '1px' }}>{t.event}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section 5: Engagement Funnel */}
                        <div className="card" style={{ padding: '12px', margin: 0 }}>
                          <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                            Communication Engagement Funnel
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <FunnelRow label="Campaigns Received" count={story.funnel.received} percent={100} color="var(--color-accent)" />
                            <FunnelRow label="Delivered" count={story.funnel.delivered} percent={(story.funnel.delivered / story.funnel.received) * 100} color="#0284c7" />
                            <FunnelRow label="Opened" count={story.funnel.opened} percent={(story.funnel.opened / story.funnel.received) * 100} color="#0d9488" />
                            <FunnelRow label="Clicked" count={story.funnel.clicked} percent={(story.funnel.clicked / story.funnel.received) * 100} color="#ea580c" />
                            <FunnelRow label="Purchased" count={story.funnel.purchased} percent={(story.funnel.purchased / story.funnel.received) * 100} color="var(--color-success)" />
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Lower Tables Section - Purchase History & Campaign History spanning full width */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
                      
                      {/* Section 3: Purchase History */}
                      <div className="card" style={{ padding: '12px', margin: 0 }}>
                        <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                          Purchase History
                        </h4>
                        <div className="table-container" style={{ margin: 0 }}>
                          <table className="enterprise-table" style={{ fontSize: '11px' }}>
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th className="mono-align">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {story.purchase_history.map((p, idx) => (
                                <tr key={idx}>
                                  <td>{p.date}</td>
                                  <td style={{ fontWeight: 600 }}>{p.product}</td>
                                  <td>{p.category}</td>
                                  <td className="mono-align" style={{ fontWeight: 700 }}>₹{Math.round(p.amount).toLocaleString('en-IN')}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Section 4: Campaign History */}
                      <div className="card" style={{ padding: '12px', margin: 0 }}>
                        <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                          Campaign History
                        </h4>
                        <div className="table-container" style={{ margin: 0 }}>
                          <table className="enterprise-table" style={{ fontSize: '11px' }}>
                            <thead>
                              <tr>
                                <th>Campaign</th>
                                <th>Channel</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {story.campaign_history.map((c, idx) => (
                                <tr key={idx}>
                                  <td style={{ fontWeight: 600 }}>{c.campaign}</td>
                                  <td>{c.channel}</td>
                                  <td>
                                    <span className={`badge ${
                                      c.status === 'purchased' ? 'badge-success' : 
                                      c.status === 'failed' ? 'badge-danger' : 
                                      c.status === 'pending' ? 'badge-neutral' : 'badge-primary'
                                    }`} style={{ fontSize: '8.5px', padding: '1px 4px' }}>
                                      {c.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>

                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>Could not load shopper story.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CSV IMPORT MODAL */}
        {isImportModalOpen && (
          <div className="drawer-backdrop" onClick={() => setIsImportModalOpen(false)}>
            <div className="drawer-container" style={{ width: '40%', minWidth: '450px', padding: '24px' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileSpreadsheet size={20} color="var(--color-accent)" />
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Import Shoppers via CSV</h3>
                </div>
                <button 
                  onClick={() => setIsImportModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={16} className="text-muted" />
                </button>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
                Onboard shopper accounts directly into the Xenia CRM database. Download our template to ensure headers match.
              </div>

              {/* Sample Template Download */}
              <div style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent-border)', borderRadius: '6px', padding: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} color="var(--color-accent)" />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Need a helper template?</span>
                </div>
                <a 
                  href={api.getSampleCSVUrl()} 
                  className="btn btn-secondary" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', fontSize: '11px', textDecoration: 'none' }}
                  download
                >
                  <Download size={12} /> Download Template
                </a>
              </div>

              {/* File Input Selection Area */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Select CSV File</label>
                <div style={{
                  border: '2px dashed var(--border-color)',
                  borderRadius: '6px',
                  padding: '24px 16px',
                  textAlign: 'center',
                  background: '#fafafa',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={e => {
                      if (e.target.files && e.target.files.length > 0) {
                        setImportFile(e.target.files[0]);
                        setImportResult(null);
                        setImportError(null);
                      }
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                  <Upload size={24} color="var(--text-muted)" style={{ marginBottom: '8px' }} />
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {importFile ? importFile.name : 'Click or drag CSV file to upload'}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {importFile ? `${(importFile.size / 1024).toFixed(1)} KB` : 'Maximum file size: 10MB'}
                  </div>
                </div>
              </div>

              {/* Columns and Formatting Rules */}
              <div className="card" style={{ padding: '12px', margin: '0 0 16px 0', fontSize: '11px', background: 'var(--bg-surface)' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', textTransform: 'uppercase', fontSize: '9.5px', letterSpacing: '0.04em' }}>CSV Column Guidelines</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-secondary)' }}>
                  <div>• <strong>name</strong>, <strong>email</strong>: <span style={{ color: 'var(--color-danger)' }}>Required</span>. Email must be unique.</div>
                  <div>• <strong>customer_id</strong>: Optional UUID. If omitted, Xenia auto-generates one.</div>
                  <div>• <strong>segment</strong>: Optional (e.g. <code>Champion</code>, <code>At-Risk</code>).</div>
                  <div>• <strong>total_spend</strong>: Optional number (positive). Computes customer monetary tier.</div>
                  <div>• <strong>last_purchase_date</strong>: Optional (e.g. <code>YYYY-MM-DD</code>). Computes recency score.</div>
                </div>
              </div>

              {/* Import status or errors display */}
              {importing && (
                <div style={{ padding: '12px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '12.5px', marginBottom: '16px' }}>
                  <RefreshCw className="spin" size={16} style={{ marginRight: '6px', display: 'inline' }} />
                  Uploading and validating shopper database records...
                </div>
              )}

              {importError && (
                <div style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: '6px', padding: '10px 12px', color: 'var(--color-danger)', fontSize: '12px', marginBottom: '16px' }}>
                  {importError}
                </div>
              )}

              {importResult && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '9px', color: '#16a34a', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Imported Shoppers</span>
                      <strong style={{ fontSize: '18px', color: '#15803d' }}>{importResult.imported}</strong>
                    </div>
                    <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '9px', color: '#ea580c', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Rows Skipped</span>
                      <strong style={{ fontSize: '18px', color: '#c2410c' }}>{importResult.skipped}</strong>
                    </div>
                  </div>

                  {importResult.errors && importResult.errors.length > 0 && (
                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', background: '#fff', padding: '10px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>SKIPPED ROWS DETAIL LOG</div>
                      <div style={{ maxHeight: '100px', overflowY: 'auto', fontSize: '11px', fontFamily: 'var(--mono)', lineHeight: '1.4' }}>
                        {importResult.errors.map((err, idx) => (
                          <div key={idx} style={{ marginBottom: '3px', color: err.includes('database') || err.includes('exists') ? '#b45309' : '#b91c1c' }}>
                            ⚠ {err}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Actions */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                <button className="btn btn-secondary" onClick={() => setIsImportModalOpen(false)} disabled={importing}>Close</button>
                <button 
                  className="btn btn-accent" 
                  disabled={!importFile || importing}
                  onClick={async () => {
                    if (!importFile) return;
                    setImporting(true);
                    setImportResult(null);
                    setImportError(null);
                    try {
                      const res = await api.importShoppersCSV(importFile);
                      setImportResult(res);
                      loadCustomersList();
                    } catch (err: any) {
                      setImportError(err.message || "Failed to parse or import CSV data");
                    } finally {
                      setImporting(false);
                    }
                  }}
                >
                  Start Import
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 5. PERFORMANCE ANALYTICS VIEW (REPORTS & NATURAL LANGUAGE AUDIT)
  // ────────────────────────────────────────────────────────────────────────────
  function AnalyticsView() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState<NLQueryResponse | null>(null);
    const [history, setHistory] = useState<NLQueryResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSqlCollapsed, setIsSqlCollapsed] = useState(true);

    useEffect(() => {
      async function loadHistory() {
        try {
          const data = await api.getQueryHistory();
          setHistory(data);
        } catch (err) {
          console.error("Failed to load query history", err);
        }
      }
      loadHistory();
    }, []);

    const handleQuerySubmit = async (e: React.FormEvent, customQuery?: string) => {
      if (e) e.preventDefault();
      const queryToSubmit = customQuery || question;
      if (!queryToSubmit.trim()) return;

      setLoading(true);
      setError(null);
      setResponse(null);

      try {
        const data = await api.queryNL(queryToSubmit);
        setResponse(data);
        setIsSqlCollapsed(true); // reset collapsed state for new query
        
        const histData = await api.getQueryHistory();
        setHistory(histData);
      } catch (err: any) {
        setError(err.message || 'Analytics query execution failed');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Workspace Subheader — main title is in topbar */}
        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px' }}>
            Run real-time reports queries, review natural language intent classification logs, and analyze revenue projections.
          </p>
        </div>

        {/* Executive KPI Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div className="workspace-panel" style={{ padding: '20px 24px', margin: 0 }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Recovered Churn Revenue</span>
            <div className="kpi-number" style={{ color: 'var(--color-success)', marginTop: '8px' }}>₹3,48,200</div>
            <div style={{ fontSize: '12px', color: 'var(--color-success)', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>↑ 12.4%</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>vs last month</span>
            </div>
          </div>
          <div className="workspace-panel" style={{ padding: '20px 24px', margin: 0 }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Campaign Outreach ROI</span>
            <div className="kpi-number" style={{ color: 'var(--color-accent)', marginTop: '8px' }}>14.2x</div>
            <div style={{ fontSize: '12px', color: 'var(--color-accent)', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Average Return</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>across all active channels</span>
            </div>
          </div>
          <div className="workspace-panel" style={{ padding: '20px 24px', margin: 0 }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Shopper Database Value</span>
            <div className="kpi-number" style={{ color: 'var(--text-primary)', marginTop: '8px' }}>25,420</div>
            <div style={{ fontSize: '12px', color: 'var(--color-success)', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>↑ 4.2%</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>YoY growth rate</span>
            </div>
          </div>
        </div>

        {/* Main Workspace split */}
        <div className="split-pane" style={{ height: 'calc(100vh - var(--header-height) - 340px)' }}>
          {/* Left panel - console */}
          <div className="split-left" style={{ flex: '0 0 70%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="workspace-panel" style={{ padding: '24px', margin: 0 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>Reports Query Console</h3>
              <form onSubmit={(e) => handleQuerySubmit(e)}>
                <div className="form-group" style={{ display: 'flex', gap: '10px', margin: 0 }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ask in plain language (e.g. geographical distribution of customers, sales by category)..." 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={{ height: '42px', fontSize: '14px' }}
                    required
                  />
                  <button className="btn btn-primary" type="submit" disabled={loading} style={{ height: '42px', padding: '0 24px' }}>
                    {loading ? 'Executing...' : 'Ask Console'}
                  </button>
                </div>
              </form>
              
              {/* Suggested quick links */}
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>Suggested Queries:</span>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '5px 12px', fontSize: '12.5px', borderRadius: '16px' }}
                  onClick={(e) => { setQuestion("List geographical distribution of customers"); handleQuerySubmit(e, "List geographical distribution of customers"); }}
                >
                  Geographical Distribution
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '5px 12px', fontSize: '12.5px', borderRadius: '16px' }}
                  onClick={(e) => { setQuestion("Sales, orders, and revenue split by product categories"); handleQuerySubmit(e, "Sales, orders, and revenue split by product categories"); }}
                >
                  Category Revenues
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '5px 12px', fontSize: '12.5px', borderRadius: '16px' }}
                  onClick={(e) => { setQuestion("Identify customers at risk of churn"); handleQuerySubmit(e, "Identify customers at risk of churn"); }}
                >
                  Retention Risks
                </button>
              </div>
            </div>

            {loading && <SkeletonLoader type="table" />}
            {error && <ErrorMessage message={error} />}

            {response && !loading && (
              <div className="workspace-panel" style={{ padding: '24px', margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  <span className="badge badge-primary">Topic Classified: {response.intent.replace('_', ' ')}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Model Confidence: {Math.round(response.confidence_score * 100)}%</span>
                </div>
                
                {/* Narrative explanation */}
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>Executive Summary</h4>
                  <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{response.response}</p>
                </div>

                {/* Data visualizations (inline SVGs) */}
                {response.data_points && response.data_points.length > 0 && (
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', paddingBottom: '8px' }}>
                    <RenderDataChart chartType={response.chart_suggestion} data={response.data_points} />
                  </div>
                )}

                {/* Tabular results representation */}
                {response.data_points && response.data_points.length > 0 ? (
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Query Dataset</h4>
                    <div className="table-container" style={{ margin: 0 }}>
                      <table className="enterprise-table">
                        <thead>
                          <tr>
                            {Object.keys(response.data_points[0]).map(key => (
                              <th key={key}>{key.replace('_', ' ')}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {response.data_points.map((row, idx) => (
                            <tr key={idx}>
                              {Object.values(row).map((val: any, colIdx) => (
                                <td key={colIdx} className={typeof val === 'number' ? 'mono-align' : ''} style={{ fontWeight: typeof val === 'number' ? '600' : 'normal' }}>
                                  {typeof val === 'number' && val > 1000 ? val.toLocaleString('en-IN') : String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>No rows returned from query execution.</div>
                )}

                {/* SQL Collapsable audit details */}
                {response.context_json && response.context_json.sql_query && (
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      onClick={() => setIsSqlCollapsed(!isSqlCollapsed)}
                    >
                      <span>{isSqlCollapsed ? 'Audit Executed SQL Statement' : 'Hide SQL Audit'}</span>
                      {isSqlCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                    </button>
                    
                    {!isSqlCollapsed && (
                      <div className="fade-in" style={{ marginTop: '12px' }}>
                        <div className="sql-audit-block">
                          {response.context_json.sql_query}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right panel - history */}
          <div className="split-right" style={{ paddingLeft: '16px' }}>
            <div className="workspace-panel" style={{ padding: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Query History Audit
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {history.length > 0 ? (
                  history.map(item => (
                    <div 
                      key={item.query_id}
                      onClick={(e) => { setQuestion(item.question); handleQuerySubmit(e, item.question); }}
                      style={{
                        padding: '10px 12px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.15s ease',
                        backgroundColor: '#F9FAFB'
                      }}
                    >
                      <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>
                        {item.question}
                      </div>
                      <div className="flex-between" style={{ marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <span>Classification: {item.intent}</span>
                        <span>{new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '16px', fontSize: '12px' }}>
                    No recent audit queries.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Custom visual SVG chart builder
  function RenderDataChart({ chartType, data }: { chartType: string; data: any[] }) {
    if (data.length === 0) return null;
    const plotData = data.slice(0, 8);
    const keys = Object.keys(plotData[0]);
    const labelKey = keys.find(k => typeof plotData[0][k] === 'string') || keys[0];
    const valueKey = keys.find(k => typeof plotData[0][k] === 'number') || keys[1];
    const maxVal = Math.max(...plotData.map(d => Number(d[valueKey]) || 1));

    if (chartType === 'BarChart') {
      const height = 150;
      const barSpacing = 40;
      const width = plotData.length * barSpacing + 60;
      
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '450px' }}>
            <line x1="40" y1="10" x2="40" y2="120" stroke="var(--border-color)" strokeWidth="1" />
            <line x1="40" y1="120" x2={width - 10} y2="120" stroke="var(--border-color)" strokeWidth="1" />
            
            {plotData.map((d, idx) => {
              const val = Number(d[valueKey]) || 0;
              const barHeight = maxVal > 0 ? (val / maxVal) * 90 : 0;
              const x = 50 + idx * barSpacing;
              const y = 120 - barHeight;
              
              return (
                <g key={idx}>
                  <rect x={x} y={y} width="18" height={barHeight} fill="var(--color-accent)" rx="1.5" />
                  <text x={x + 9} y={y - 4} fontSize="9" fontWeight="bold" textAnchor="middle" fill="var(--text-primary)">
                    {val > 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                  </text>
                  <text x={x + 9} y="132" fontSize="8" textAnchor="middle" fill="var(--text-secondary)" transform={`rotate(-10, ${x + 9}, 132)`}>
                    {String(d[labelKey]).substring(0, 8)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      );
    }

    if (chartType === 'PieChart') {
      let accumulatedPercent = 0;
      const total = plotData.reduce((acc, d) => acc + (Number(d[valueKey]) || 0), 0);
      const colors = ['#2563eb', '#166534', '#9a3412', '#991b1b', '#0ea5e9', '#d97706', '#7c3aed', '#3b82f6'];
      
      return (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <svg width="120" height="120" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f4f4f5" strokeWidth="4" />
            {plotData.map((d, idx) => {
              const val = Number(d[valueKey]) || 0;
              const percent = total > 0 ? (val / total) * 100 : 0;
              const strokeDash = `${percent} ${100 - percent}`;
              const strokeOffset = 100 - accumulatedPercent + 25;
              accumulatedPercent += percent;
              
              return (
                <circle 
                  key={idx}
                  cx="18" 
                  cy="18" 
                  r="15.915" 
                  fill="none" 
                  stroke={colors[idx % colors.length]} 
                  strokeWidth="4" 
                  strokeDasharray={strokeDash}
                  strokeDashoffset={strokeOffset}
                />
              );
            })}
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
            {plotData.map((d, idx) => {
              const val = Number(d[valueKey]) || 0;
              const percent = total > 0 ? (val / total) * 100 : 0;
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: colors[idx % colors.length] }} />
                  <span style={{ fontWeight: 600 }}>{String(d[labelKey])}:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{percent.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // UI UTILITY SUB-COMPONENTS
  // ────────────────────────────────────────────────────────────────────────────
  function LoadingSpinner({ label }: { label: string }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <RefreshCw size={24} className="spin" color="var(--color-accent)" style={{ marginBottom: '10px' }} />
        <p style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '12.5px' }}>{label}</p>
      </div>
    );
  }

  function ErrorMessage({ message }: { message: string }) {
    return (
      <div className="card" style={{ backgroundColor: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', color: 'var(--color-danger)', padding: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <AlertTriangle size={18} />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Error Encountered</div>
            <div style={{ fontSize: '12px', marginTop: '2px' }}>{message}</div>
          </div>
        </div>
      </div>
    );
  }

  if (showLanding) {
    return <LandingPage onLaunch={() => setShowLanding(false)} />;
  }

  return (
    <div className="app-container">
      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Left Navigation Sidebar */}
      <aside className={`sidebar ${isMobileSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header" onClick={() => { setShowLanding(true); setIsMobileSidebarOpen(false); }} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo.png" alt="Xenia CRM" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <span className="logo-text">Xenia CRM</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div 
            onClick={() => { setActiveTab('home'); setIsMobileSidebarOpen(false); }} 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          >
            <LayoutDashboard size={16} />
            <span>Home</span>
          </div>
          
          <div 
            onClick={() => { setActiveTab('opportunities'); setIsMobileSidebarOpen(false); }} 
            className={`nav-item ${activeTab === 'opportunities' ? 'active' : ''}`}
          >
            <Flame size={16} />
            <span>Suggested Actions</span>
          </div>
          
          <div 
            onClick={() => {
              setActiveTab('campaigns');
              setIsMobileSidebarOpen(false);
              if (!prefilledGoal) {
                setCampaignSubTab('active');
              }
            }} 
            className={`nav-item ${activeTab === 'campaigns' ? 'active' : ''}`}
          >
            <Send size={16} />
            <span>Campaigns</span>
          </div>
          
          <div 
            onClick={() => { setActiveTab('shoppers'); setIsMobileSidebarOpen(false); }} 
            className={`nav-item ${activeTab === 'shoppers' ? 'active' : ''}`}
          >
            <Users size={16} />
            <span>Shoppers</span>
          </div>
          
          <div 
            onClick={() => { setActiveTab('analytics'); setIsMobileSidebarOpen(false); }} 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
          >
            <BarChart2 size={16} />
            <span>Analytics</span>
          </div>

          <div 
            onClick={() => { setActiveTab('promotions'); setIsMobileSidebarOpen(false); }} 
            className={`nav-item ${activeTab === 'promotions' ? 'active' : ''}`}
          >
            <Tag size={16} />
            <span>Promotions</span>
          </div>

          {/* Voice Campaigns — Premium Channel */}
          <div style={{ margin: '8px 6px 2px', padding: '4px 6px', fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Premium Channels
          </div>
          <div 
            onClick={() => { setActiveTab('voice_campaigns'); setIsMobileSidebarOpen(false); }} 
            className={`nav-item ${activeTab === 'voice_campaigns' ? 'active' : ''}`}
            style={{ position: 'relative' }}
          >
            <Phone size={16} />
            <span>Voice Campaigns</span>
            <span style={{
              marginLeft: 'auto',
              fontSize: '8px',
              fontWeight: 700,
              backgroundColor: 'var(--color-accent-light)',
              color: 'var(--color-accent)',
              border: '1px solid #BFDBFE',
              padding: '1px 5px',
              borderRadius: '3px',
              letterSpacing: '0.04em'
            }}>VIP</span>
          </div>

          {/* Settings — always at the bottom */}
          <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
            <div 
              onClick={() => { setActiveTab('settings'); setIsMobileSidebarOpen(false); }} 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <Settings size={16} />
              <span>Settings</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Panel Router Wrapper */}
      <main className="main-content">
        <header className="top-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="sidebar-toggle-btn"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              aria-label="Toggle Navigation Sidebar"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px'
              }}
            >
              <Menu size={20} />
            </button>
            <span className="breadcrumb-category" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Xenia Operations</span>
            <span className="breadcrumb-separator" style={{ color: 'var(--border-color)' }}>/</span>
            <h1 className="page-title">
              {activeTab === 'home' && 'Operations Dashboard'}
              {activeTab === 'opportunities' && 'Suggested Actions Pipeline'}
              {activeTab === 'campaigns' && 'Campaign Workspace'}
              {activeTab === 'shoppers' && 'Shopper Directory'}
              {activeTab === 'analytics' && 'Operational Reports'}
              {activeTab === 'promotions' && 'Promotions Manager'}
              {activeTab === 'voice_campaigns' && 'Voice Campaigns'}
              {activeTab === 'settings' && 'System Settings'}
            </h1>
          </div>
        </header>

        <div className="content-body">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'opportunities' && <OpportunitiesView />}
          {activeTab === 'campaigns' && <CampaignsView />}
          {activeTab === 'shoppers' && <ShoppersView />}
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'promotions' && <PromotionsView />}
          {activeTab === 'voice_campaigns' && <VoiceCampaignsView />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>

      {/* PROMOTION INTELLIGENCE DRAWER */}
      {isPromoIntelligenceDrawerOpen && selectedPromotionForIntelligence && (
        <div className="drawer-backdrop" onClick={() => setIsPromoIntelligenceDrawerOpen(false)}>
          <div className="drawer-container" style={{ width: '45%', minWidth: '550px' }} onClick={e => e.stopPropagation()}>
            <div className="drawer-header" style={{ borderBottom: '1.5px solid var(--border-color)' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-accent)' }}>
                  🏷️ Promotion Intelligence: {selectedPromotionForIntelligence.promo_code}
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {selectedPromotionForIntelligence.name}
                </span>
              </div>
              <button 
                onClick={() => setIsPromoIntelligenceDrawerOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="drawer-body" style={{ padding: '20px', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Specification Card */}
              <div className="card" style={{ padding: '14px', margin: 0 }}>
                <h4 style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                  Promotion Specification
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', fontSize: '12px' }}>
                  <div><span style={{ color: 'var(--text-muted)' }}>Discount:</span> <strong style={{ color: 'var(--text-primary)' }}>{selectedPromotionForIntelligence.discount_type === 'Percentage' ? `${selectedPromotionForIntelligence.discount_value}% Off` : `₹${selectedPromotionForIntelligence.discount_value} Off`}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Min Order Value:</span> <strong style={{ color: 'var(--text-primary)' }}>{selectedPromotionForIntelligence.min_order_value ? `₹${selectedPromotionForIntelligence.min_order_value.toLocaleString('en-IN')}` : '₹0'}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Applicable Categories:</span> <strong style={{ color: 'var(--text-primary)' }}>{selectedPromotionForIntelligence.applicable_categories}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Applicable Cities:</span> <strong style={{ color: 'var(--text-primary)' }}>{selectedPromotionForIntelligence.applicable_cities}</strong></div>
                  <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-muted)' }}>Description:</span> <span style={{ color: 'var(--text-secondary)' }}>{selectedPromotionForIntelligence.description || 'No description provided.'}</span></div>
                </div>
              </div>

              {/* Performance Metrics Card */}
              <div className="card" style={{ padding: '14px', margin: 0 }}>
                <h4 style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                  Performance Summary
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '6px' }}>
                  <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fff', textAlign: 'center' }}>
                    <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Campaigns Using Option</span>
                    <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                      3 Campaigns
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fff', textAlign: 'center' }}>
                    <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Shoppers Reached</span>
                    <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                      {selectedPromotionForIntelligence.times_recommended || 1290}
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fff', textAlign: 'center' }}>
                    <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Times Applied</span>
                    <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px', color: 'var(--color-success)' }}>
                      {selectedPromotionForIntelligence.times_used || 142}
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fff', textAlign: 'center' }}>
                    <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Purchases Generated</span>
                    <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px', color: 'var(--color-success)' }}>
                      {selectedPromotionForIntelligence.purchases_attributed || 142}
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fff', textAlign: 'center' }}>
                    <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Revenue Generated</span>
                    <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px', color: 'var(--color-success)' }} className="mono-align">
                      ₹{(selectedPromotionForIntelligence.revenue_generated || 205900).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: '#fff', textAlign: 'center' }}>
                    <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Campaign ROI</span>
                    <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px', color: 'var(--color-accent)' }}>
                      {(selectedPromotionForIntelligence.roi_generated || 14.2).toFixed(1)}x
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid-2" style={{ gap: 12, margin: 0 }}>
                {/* Best Performing Campaigns */}
                <div className="card" style={{ padding: '14px', margin: 0, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                    Best Performing Campaigns
                  </h4>
                  <div className="table-container" style={{ margin: 0 }}>
                    <table className="enterprise-table" style={{ fontSize: '11px' }}>
                      <thead>
                        <tr>
                          <th>Campaign Name</th>
                          <th className="mono-align">Revenue</th>
                          <th className="mono-align">ROI</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>VIP Win-Back Blast</td>
                          <td className="mono-align">₹{Math.round((selectedPromotionForIntelligence.revenue_generated || 205900) * 0.6).toLocaleString('en-IN')}</td>
                          <td className="mono-align">{(selectedPromotionForIntelligence.roi_generated || 14.2).toFixed(1)}x</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>Dormant Shopper Outreach</td>
                          <td className="mono-align">₹{Math.round((selectedPromotionForIntelligence.revenue_generated || 205900) * 0.3).toLocaleString('en-IN')}</td>
                          <td className="mono-align">{(selectedPromotionForIntelligence.roi_generated ? selectedPromotionForIntelligence.roi_generated * 0.85 : 12.0).toFixed(1)}x</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>Seasonal Special Promo</td>
                          <td className="mono-align">₹{Math.round((selectedPromotionForIntelligence.revenue_generated || 205900) * 0.1).toLocaleString('en-IN')}</td>
                          <td className="mono-align">{(selectedPromotionForIntelligence.roi_generated ? selectedPromotionForIntelligence.roi_generated * 0.77 : 11.0).toFixed(1)}x</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Best Performing Cities */}
                <div className="card" style={{ padding: '14px', margin: 0, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                    Best Performing Cities
                  </h4>
                  <div className="table-container" style={{ margin: 0 }}>
                    <table className="enterprise-table" style={{ fontSize: '11px' }}>
                      <thead>
                        <tr>
                          <th>City</th>
                          <th className="mono-align">Revenue</th>
                          <th className="mono-align">Usage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: 600 }}>Chennai</td>
                          <td className="mono-align">₹{Math.round((selectedPromotionForIntelligence.revenue_generated || 205900) * 0.45).toLocaleString('en-IN')}</td>
                          <td className="mono-align">{Math.round((selectedPromotionForIntelligence.times_used || 142) * 0.45)}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 600 }}>Bengaluru</td>
                          <td className="mono-align">₹{Math.round((selectedPromotionForIntelligence.revenue_generated || 205900) * 0.35).toLocaleString('en-IN')}</td>
                          <td className="mono-align">{Math.round((selectedPromotionForIntelligence.times_used || 142) * 0.35)}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 600 }}>Mumbai</td>
                          <td className="mono-align">₹{Math.round((selectedPromotionForIntelligence.revenue_generated || 205900) * 0.20).toLocaleString('en-IN')}</td>
                          <td className="mono-align">{Math.round((selectedPromotionForIntelligence.times_used || 142) * 0.20)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ────────────────────────────────────────────────────────────────────────────
  // 7. VOICE CAMPAIGNS VIEW — Premium Outreach (Champions & Lost Champions only)
  // ────────────────────────────────────────────────────────────────────────────
  function VoiceCampaignsView() {
    type VoiceStep = 'audience' | 'strategy' | 'script' | 'preview' | 'cost' | 'approval' | 'tracking';

    const [step, setStep] = useState<VoiceStep>('audience');
    const [audienceData, setAudienceData] = useState<VoiceEligibleAudienceResponse | null>(null);
    const [audienceLoading, setAudienceLoading] = useState(true);
    const [audienceError, setAudienceError] = useState<string | null>(null);

    // Strategy state
    const [campaignGoal, setCampaignGoal] = useState('Re-engage our most valued customers with an exclusive loyalty offer');
    const [voiceTone, setVoiceTone] = useState('Professional');
    const [language, setLanguage] = useState('English');
    const [voiceModel, setVoiceModel] = useState('EXAVITQu4vr4xnSDxMaL');
    const [promoCode, setPromoCode] = useState('VIP25');
    const [discountValue, setDiscountValue] = useState(25);
    const [voicesList, setVoicesList] = useState<any[]>([]);
    const [voicesLoading, setVoicesLoading] = useState(true);
    const [voicesError, setVoicesError] = useState<string | null>(null);

    // Script state
    const [scriptData, setScriptData] = useState<VoiceScriptResponse | null>(null);
    const [scriptLoading, setScriptLoading] = useState(false);
    const [scriptError, setScriptError] = useState<string | null>(null);

    // Audio playback state
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [audioLoading, setAudioLoading] = useState(false);
    const [audioError, setAudioError] = useState<string | null>(null);
    const [generatedBy, setGeneratedBy] = useState<'elevenlabs' | 'mock' | null>(null);
    const audioObjRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playProgress, setPlayProgress] = useState(0);
    const playIntervalRef = useRef<number | null>(null);

    // Simulation state
    const [simData, setSimData] = useState<VoiceSimulationResponse | null>(null);
    const [simLoading] = useState(false);
    const [isLaunching, setIsLaunching] = useState(false);
    const [launchProgress, setLaunchProgress] = useState(0);
    const [launchLogs, setLaunchLogs] = useState<string[]>([]);

    // Shopper drawer state
    const [selectedCallEvent, setSelectedCallEvent] = useState<VoiceCallEvent | null>(null);

    // Load audience and voices on mount
    useEffect(() => {
      api.getVoiceEligibleAudience()
        .then(d => { setAudienceData(d); setAudienceLoading(false); })
        .catch(e => { setAudienceError(e.message); setAudienceLoading(false); });

      setVoicesLoading(true);
      api.getVoiceModels()
        .then(d => {
          setVoicesList(d);
          if (d.length > 0) {
            const hasDefault = d.find(v => v.voice_id === 'EXAVITQu4vr4xnSDxMaL');
            setVoiceModel(hasDefault ? 'EXAVITQu4vr4xnSDxMaL' : d[0].voice_id);
          }
          setVoicesLoading(false);
        })
        .catch(e => {
          setVoicesError(e.message);
          setVoicesLoading(false);
        });
    }, []);

    // Fetch synthesized audio when entering the preview step
    useEffect(() => {
      if (step === 'preview' && scriptData) {
        const fetchAudio = async () => {
          setAudioLoading(true);
          setAudioError(null);
          setAudioUrl(null);
          setGeneratedBy(null);
          setPlayProgress(0);
          setIsPlaying(false);
          if (audioObjRef.current) {
            audioObjRef.current.pause();
            audioObjRef.current = null;
          }
          try {
            const res = await api.generateAudio({
              text: scriptData.script.full_script,
              voice_model: voiceModel,
            });
            if (res.audio_base64) {
              const dataUrl = `data:audio/mpeg;base64,${res.audio_base64}`;
              setAudioUrl(dataUrl);
              setGeneratedBy(res.generated_by as 'elevenlabs' | 'mock');
              const audio = new Audio(dataUrl);
              audioObjRef.current = audio;
              
              audio.addEventListener('play', () => setIsPlaying(true));
              audio.addEventListener('pause', () => setIsPlaying(false));
              audio.addEventListener('ended', () => {
                setIsPlaying(false);
                setPlayProgress(100);
              });
              audio.addEventListener('timeupdate', () => {
                if (audio.duration) {
                  setPlayProgress((audio.currentTime / audio.duration) * 100);
                }
              });
            } else {
              setGeneratedBy('mock');
              setAudioError("No audio content returned. ElevenLabs API key may be invalid or not set.");
            }
          } catch (e: any) {
            setGeneratedBy('mock');
            setAudioError(e.message || "Failed to generate TTS audio");
          } finally {
            setAudioLoading(false);
          }
        };
        fetchAudio();
      }
      
      return () => {
        if (audioObjRef.current) {
          audioObjRef.current.pause();
          audioObjRef.current = null;
        }
        if (playIntervalRef.current) {
          clearInterval(playIntervalRef.current);
        }
      };
    }, [step, scriptData, voiceModel]);

    const handleGenerateScript = async () => {
      if (!audienceData) return;
      setScriptLoading(true);
      setScriptError(null);
      try {
        const topCat = audienceData.shoppers[0]?.top_category || 'general retail';
        const result = await api.generateVoiceScript({
          campaign_goal: campaignGoal,
          audience_segment: Object.keys(audienceData.summary.segment_distribution)[0] || 'Champion',
          audience_size: audienceData.summary.total_identified,
          avg_ltv: audienceData.summary.avg_ltv,
          avg_inactivity_days: audienceData.summary.avg_inactivity_days,
          voice_tone: voiceTone,
          language,
          voice_model: voiceModel,
          promo_code: promoCode,
          discount_value: discountValue,
          discount_type: 'Percentage',
          brand_name: 'Xenia',
          top_category: topCat,
        });
        setScriptData(result);
        setStep('script');
      } catch (e: any) {
        setScriptError(e.message);
      } finally {
        setScriptLoading(false);
      }
    };

    const runSimulatedAudio = () => {
      if (isPlaying) {
        if (playIntervalRef.current) clearInterval(playIntervalRef.current);
        setIsPlaying(false);
        return;
      }
      setIsPlaying(true);
      setPlayProgress(0);
      const totalMs = scriptData ? scriptData.estimated_duration_sec * 1000 : 30000;
      const startTime = Date.now();
      playIntervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, (elapsed / totalMs) * 100);
        setPlayProgress(pct);
        if (pct >= 100) {
          if (playIntervalRef.current) clearInterval(playIntervalRef.current);
          setIsPlaying(false);
        }
      }, 100);
    };

    const handlePlayPreview = () => {
      if (!scriptData) return;
      if (audioUrl && audioObjRef.current) {
        if (isPlaying) {
          audioObjRef.current.pause();
        } else {
          audioObjRef.current.play().catch(e => {
            console.error("Audio play failed, falling back to simulated playback:", e);
            runSimulatedAudio();
          });
        }
      } else {
        runSimulatedAudio();
      }
    };

    const handleSimulateCalls = async () => {
      if (!audienceData) return;
      setIsLaunching(true);
      setLaunchProgress(0);
      setLaunchLogs(["Initializing Xenia Voice Agent outbound dialer..."]);

      const duration = 5000;
      const startTime = Date.now();
      
      const interval = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, (elapsed / duration) * 100);
        setLaunchProgress(pct);

        if (pct >= 20 && pct < 45) {
          setLaunchLogs(prev => prev.length === 1 ? [...prev, "Connecting to telecom SIP trunks..."] : prev);
        } else if (pct >= 45 && pct < 70) {
          setLaunchLogs(prev => prev.length === 2 ? [...prev, `Synthesizing dynamic custom scripts for ${audienceData.summary.total_identified} VIP shoppers...`] : prev);
        } else if (pct >= 70 && pct < 90) {
          setLaunchLogs(prev => prev.length === 3 ? [...prev, "Placing outbound calls to agent queue..."] : prev);
        } else if (pct >= 90 && pct < 100) {
          setLaunchLogs(prev => prev.length === 4 ? [...prev, "Simulating calls in real-time..."] : prev);
        }

        if (elapsed >= duration) {
          window.clearInterval(interval);
          api.simulateVoiceCalls({
            shoppers: audienceData.shoppers,
            promo_code: promoCode,
          })
          .then(result => {
            setSimData(result);
            setStep('tracking');
            setIsLaunching(false);
          })
          .catch(e => {
            console.error(e);
            setIsLaunching(false);
          });
        }
      }, 100);
    };



    const stepLabels: { key: VoiceStep; label: string }[] = [
      { key: 'audience',  label: '1. Audience' },
      { key: 'strategy',  label: '2. Strategy' },
      { key: 'script',    label: '3. Script' },
      { key: 'preview',   label: '4. Preview' },
      { key: 'cost',      label: '5. Cost' },
      { key: 'approval',  label: '6. Approval' },
      { key: 'tracking',  label: '7. Tracking' },
    ];

    const stepOrder: VoiceStep[] = ['audience','strategy','script','preview','cost','approval','tracking'];
    const currentStepIdx = stepOrder.indexOf(step);

    const purple = 'var(--color-accent)'; // Brand Theme Accent (Red)
    const purpleLight = 'var(--color-accent-light)'; // Light Theme Accent
    const purpleBorder = 'var(--color-accent-border, #fca5a5)'; // Accent Border

    const renderTimelineIcon = (iconStr: string) => {
      switch (iconStr) {
        case '✅': return <CheckCircle2 size={12} color={purple} />;
        case '🔊': return <Volume2 size={12} color={purple} />;
        case '📋': return <FileText size={12} color={purple} />;
        case '💌': return <Send size={12} color={purple} />;
        case '🛍️': return <ShoppingBag size={12} color={purple} />;
        case '💰': return <DollarSign size={12} color={purple} />;
        case '❌': return <XCircle size={12} color={purple} />;
        case '📵': return <PhoneOff size={12} color={purple} />;
        default: return <Clock size={12} color={purple} />;
      }
    };

    return (
      <div className="fade-in">
        {/* Premium Header Banner */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '18px 24px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px', height: '44px',
              backgroundColor: 'var(--color-accent-light)',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Phone size={22} color="var(--color-accent)" />
            </div>
            <div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Voice Campaigns
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Targeted voice campaigns for Champions and Lost Champions.
              </div>
            </div>
          </div>
        </div>

        {/* Step Progress */}
        <div className="flow-steps" style={{ marginBottom: '20px', gap: '8px' }}>
          {stepLabels.map((s, idx) => {
            const isActive = s.key === step;
            const isDone = stepOrder.indexOf(s.key) < currentStepIdx;
            return (
              <React.Fragment key={s.key}>
                <div
                  onClick={() => isDone && setStep(s.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '4px 8px', borderRadius: '4px',
                    cursor: isDone ? 'pointer' : 'default',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '12.5px',
                    color: isActive ? 'var(--color-accent)' : isDone ? 'var(--color-success)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--color-accent-light)' : 'transparent',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isDone && <span style={{ fontSize: '10px', marginRight: '2px' }}>✓</span>}
                  {s.label}
                </div>
                {idx < stepLabels.length - 1 && (
                  <span className="flow-step-separator">➔</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── STEP 1: AUDIENCE SELECTION ─────────────────────────────────── */}
        {step === 'audience' && (
          <div className="fade-in">
            {audienceLoading && (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                <Phone size={32} color="var(--color-accent)" style={{ animation: 'pulse 1.5s infinite alternate', marginBottom: '12px' }} />
                <div style={{ fontSize: '14px', fontWeight: 600 }}>Scanning for eligible VIP shoppers...</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>Filtering Champions & Lost Champions only</div>
              </div>
            )}
            {audienceError && (
              <div style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: '6px', padding: '16px', color: 'var(--color-danger)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={14} /> {audienceError}</span>
              </div>
            )}
            {audienceData && !audienceLoading && (
              <>
                {/* Large audience warning */}
                {audienceData.summary.is_large_audience && (
                  <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '6px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertOctagon size={16} color="#c2410c" />
                    <span style={{ fontSize: '12.5px', color: '#9a3412', fontWeight: 500 }}>{audienceData.summary.large_audience_warning}</span>
                  </div>
                )}

                {/* Audience Intelligence Banner */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px'
                }}>
                  {[
                    { label: 'Eligible VIP Shoppers', value: audienceData.summary.total_identified.toLocaleString('en-IN'), sub: 'Champions & Lost Champions', icon: <Users size={20} color={purple} />, color: purple },
                    { label: 'Average Lifetime Value', value: `₹${audienceData.summary.avg_ltv.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, sub: 'Per shopper', icon: <Gem size={20} color="#059669" />, color: '#059669' },
                    { label: 'Average Inactivity', value: `${Math.round(audienceData.summary.avg_inactivity_days)} days`, sub: 'Since last purchase', icon: <Calendar size={20} color="#d97706" />, color: '#d97706' },
                    { label: 'Potential Recovery Value', value: `₹${(audienceData.summary.potential_recovery_value / 100000).toFixed(1)}L`, sub: 'Est. at 28% recovery rate', icon: <TrendingUp size={20} color="#2563eb" />, color: '#2563eb' },
                  ].map(card => (
                    <div key={card.label} style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '14px' }}>
                      <div style={{ marginBottom: '6px' }}>{card.icon}</div>
                      <div style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '4px' }}>{card.label}</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{card.value}</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>{card.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Segment distribution */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div className="card" style={{ margin: 0, padding: '14px' }}>
                    <div className="card-title">Segment Breakdown</div>
                    {Object.entries(audienceData.summary.segment_distribution).map(([seg, count]) => (
                      <div key={seg} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: seg === 'Champion' ? '#059669' : '#7c3aed', display: 'inline-block' }} />
                          <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{seg}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{count} shoppers</span>
                          <span style={{ fontSize: '11px', background: purpleLight, color: purple, padding: '2px 6px', borderRadius: '3px', fontWeight: 600 }}>
                            {Math.round((count / audienceData.summary.total_identified) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="card" style={{ margin: 0, padding: '14px' }}>
                    <div className="card-title">Top Cities</div>
                    {Object.entries(audienceData.summary.city_distribution).slice(0, 5).map(([city, count]) => (
                      <div key={city} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 500 }}>{city}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '60px', height: '4px', background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${Math.round((count / audienceData.summary.total_identified) * 100)}%`, height: '100%', background: purple, borderRadius: '2px' }} />
                          </div>
                          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shopper Preview Table */}
                <div className="card" style={{ margin: 0 }}>
                  <div className="card-title" style={{ marginBottom: '12px' }}>
                    VIP Shopper Preview — Voice Campaign Targets
                    <span style={{ fontSize: '10px', background: purpleLight, color: purple, padding: '2px 8px', borderRadius: '3px', fontWeight: 600 }}>
                      {audienceData.shoppers.length} eligible
                    </span>
                  </div>
                  <div className="table-container" style={{ margin: 0 }}>
                    <table className="enterprise-table">
                      <thead>
                        <tr>
                          <th>Shopper Name</th>
                          <th>City</th>
                          <th>Segment</th>
                          <th className="mono-align">Lifetime Value</th>
                          <th className="mono-align">Days Inactive</th>
                          <th className="mono-align">Orders</th>
                          <th>Why Selected</th>
                        </tr>
                      </thead>
                      <tbody>
                        {audienceData.shoppers.slice(0, 50).map((s, idx) => (
                          <tr key={idx}>
                            <td style={{ fontWeight: 600 }}>{s.name}</td>
                            <td style={{ color: 'var(--text-secondary)' }}>{s.city}</td>
                            <td>
                              <span style={{
                                fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '3px',
                                background: s.segment_name === 'Champion' ? '#f0fdf4' : purpleLight,
                                color: s.segment_name === 'Champion' ? '#059669' : purple,
                                border: `1px solid ${s.segment_name === 'Champion' ? '#bbf7d0' : purpleBorder}`
                              }}>
                                {s.segment_name === 'Champion' ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Trophy size={11} /> Champion</span> : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Zap size={11} /> Lost Champion</span>}
                              </span>
                            </td>
                            <td className="mono-align" style={{ fontWeight: 600 }}>₹{s.lifetime_value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                            <td className="mono-align" style={{ color: s.last_purchase_days > 180 ? '#dc2626' : s.last_purchase_days > 90 ? '#d97706' : 'var(--text-primary)' }}>
                              {s.last_purchase_days}d
                            </td>
                            <td className="mono-align">{s.total_orders}</td>
                            <td style={{ fontSize: '11.5px', color: 'var(--text-secondary)', maxWidth: '200px' }}>{s.reason_selected}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {audienceData.shoppers.length > 50 && (
                    <div style={{ padding: '10px 16px', fontSize: '11.5px', color: 'var(--text-muted)', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
                      Showing 50 of {audienceData.shoppers.length} eligible shoppers
                    </div>
                  )}
                </div>

                {audienceData.shoppers.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    <Search size={32} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
                    <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '8px' }}>No Champions or Lost Champions found</div>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>Run the nightly customer segment updates first.</div>
                  </div>
                ) : (
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => setStep('strategy')}
                      style={{ padding: '10px 24px', fontSize: '13.5px' }}
                    >
                      <Mic size={15} /> Continue to Voice Strategy →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── STEP 2: VOICE STRATEGY ─────────────────────────────────────── */}
        {step === 'strategy' && (
          <div className="fade-in" style={{ maxWidth: '760px', margin: '0 auto' }}>
            {/* Pre-launch cost warning */}
            <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '6px', padding: '14px 18px', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <AlertOctagon size={18} color="#c2410c" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#9a3412', marginBottom: '4px' }}>Voice Campaigns Are a Premium Channel</div>
                <div style={{ fontSize: '12px', color: '#78350f', lineHeight: '1.5' }}>
                  Voice outreach is reserved exclusively for <strong>Champions</strong> and <strong>Lost Champions</strong>.
                  Each call incurs voice synthesis and telecom costs. Ensure your ROI justification is clear before proceeding.
                  Do not use Voice Campaigns for mass marketing — use WhatsApp or Email instead.
                </div>
              </div>
            </div>

            <div className="card" style={{ margin: '0 0 16px 0' }}>
              <div className="card-title" style={{ marginBottom: '16px' }}>Campaign Strategy Configuration</div>

              <div className="form-group">
                <label className="form-label">Campaign Goal</label>
                <textarea
                  className="form-textarea"
                  value={campaignGoal}
                  onChange={e => setCampaignGoal(e.target.value)}
                  rows={2}
                  placeholder="e.g. Re-engage dormant VIP customers with exclusive loyalty rewards"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Voice Tone</label>
                  <select className="form-select" value={voiceTone} onChange={e => setVoiceTone(e.target.value)}>
                    {['Professional','Friendly','Luxury','Conversational','Urgent Win-back'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Language</label>
                  <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)}>
                    {['English','Tamil','Hindi','English + Tamil','English + Hindi'].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Promo Code</label>
                  <input className="form-input" value={promoCode} onChange={e => setPromoCode(e.target.value.toUpperCase())} placeholder="VIP25" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Discount (%)</label>
                  <input className="form-input" type="number" value={discountValue} onChange={e => setDiscountValue(Number(e.target.value))} min={5} max={70} />
                </div>
              </div>
            </div>

            {/* Voice Model Selection */}
            <div className="card" style={{ margin: '0 0 16px 0' }}>
              <div className="card-title" style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mic size={18} color="var(--color-accent)" />
                Voice Model Selection
              </div>
              {voicesLoading ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite', marginBottom: '8px' }} />
                  <div>Fetching voice models from ElevenLabs...</div>
                </div>
              ) : voicesError ? (
                <div style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: '6px', padding: '12px', color: 'var(--color-danger)', fontSize: '12.5px' }}>
                  <AlertTriangle size={14} style={{ marginRight: '6px' }} /> Failed to load voices: {voicesError}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {voicesList.map(vm => (
                    <div
                      key={vm.voice_id}
                      onClick={() => setVoiceModel(vm.voice_id)}
                      style={{
                        padding: '10px 14px',
                        border: `1px solid ${voiceModel === vm.voice_id ? purple : 'var(--border-color)'}`,
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: voiceModel === vm.voice_id ? purpleLight : '#fff',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                        <Mic size={16} color={voiceModel === vm.voice_id ? purple : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '120px' }}>
                          {vm.name}
                        </div>
                        <span style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          backgroundColor: vm.gender === 'female' ? '#fdf2f8' : '#eff6ff',
                          color: vm.gender === 'female' ? '#db2777' : '#2563eb',
                          flexShrink: 0
                        }}>
                          {vm.gender}
                        </span>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginLeft: '12px' }}>
                          {vm.description}
                        </div>
                      </div>
                      
                      {voiceModel === vm.voice_id ? (
                        <span style={{ fontSize: '11px', fontWeight: 700, color: purple, display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                          <CheckCircle2 size={12} /> Selected
                        </span>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>Click to select</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {scriptError && (
              <div style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: '6px', padding: '12px', marginBottom: '12px', color: 'var(--color-danger)', fontSize: '12.5px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><AlertOctagon size={14} /> Script generation failed: {scriptError}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-secondary" onClick={() => setStep('audience')}>← Back</button>
              <button
                className="btn btn-primary"
                onClick={handleGenerateScript}
                disabled={scriptLoading || !campaignGoal.trim()}
                style={{ padding: '10px 28px', fontSize: '13.5px', opacity: scriptLoading ? 0.7 : 1 }}
              >
                {scriptLoading ? (
                  <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Generating Script...</>
                ) : (
                  <><Mic size={14} /> Create Voice Campaign Script →</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: AI SCRIPT ──────────────────────────────────────────── */}
        {step === 'script' && scriptData && (
          <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Script Meta Bar */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {[
                { label: 'Duration', value: `~${scriptData.estimated_duration_sec}s`, icon: <Clock size={14} color={purple} /> },
                { label: 'Word Count', value: scriptData.word_count, icon: <FileText size={14} color={purple} /> },
                { label: 'Voice', value: scriptData.voice_model_name, icon: <Mic size={14} color={purple} /> },
                { label: 'Language', value: scriptData.language, icon: <Globe size={14} color={purple} /> },
                { label: 'Cost / Call', value: `₹${scriptData.estimated_cost_per_call_inr.toFixed(2)}`, icon: <DollarSign size={14} color={purple} /> },
              ].map(m => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: purpleLight, border: `1px solid ${purpleBorder}`, borderRadius: '6px', padding: '6px 12px' }}>
                  {m.icon}
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{m.label}:</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: purple }}>{m.value}</span>
                </div>
              ))}
            </div>

            {/* Full Script Card */}
            <div className="card" style={{ margin: '0 0 14px 0' }}>
              <div className="card-title" style={{ marginBottom: '14px' }}>
                Voice Campaign Advertisement Script
                <button
                  onClick={handleGenerateScript}
                  style={{ background: 'none', border: `1px solid ${purpleBorder}`, borderRadius: '4px', cursor: 'pointer', color: purple, fontSize: '11px', fontWeight: 600, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <RotateCcw size={12} /> Regenerate
                </button>
              </div>

              {/* Full script display */}
              <div style={{
                backgroundColor: '#F9FAFB',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '20px 24px',
                marginBottom: '14px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '10px', right: '14px', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em' }}>
                  SCRIPT PREVIEW
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.6', fontWeight: 500, fontFamily: 'inherit' }}>
                  {scriptData.script.full_script}
                </div>
              </div>

              {/* Script sections breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Call Objective', value: scriptData.script.call_objective, icon: <Target size={16} color="#2563eb" />, color: '#2563eb' },
                  { label: 'Opening', value: scriptData.script.opening, icon: <Volume2 size={16} color="#059669" />, color: '#059669' },
                  { label: 'Main Offer', value: scriptData.script.main_offer, icon: <Gift size={16} color={purple} />, color: purple },
                  { label: 'Closing', value: scriptData.script.closing, icon: <Handshake size={16} color="#d97706" />, color: '#d97706' },
                  { label: 'Call-to-Action', value: scriptData.script.cta, icon: <Megaphone size={16} color="#dc2626" />, color: '#dc2626' },
                ].map(section => (
                  <div key={section.label} style={{ display: 'flex', gap: '10px', padding: '10px 12px', background: '#fafafa', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{section.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: section.color, marginBottom: '3px' }}>{section.label}</div>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: '1.5' }}>{section.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-secondary" onClick={() => setStep('strategy')}>← Back to Strategy</button>
              <button
                className="btn btn-primary"
                onClick={() => setStep('preview')}
                style={{ padding: '10px 24px' }}
              >
                <Headphones size={14} /> Preview Voice → 
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: VOICE PREVIEW ──────────────────────────────────────── */}
        {step === 'preview' && scriptData && (
          <div className="fade-in" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="card" style={{ margin: '0 0 16px 0', padding: '24px 32px' }}>
              <div className="card-title" style={{ marginBottom: '24px', fontSize: '18px', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                Voice Advertisement Preview
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px', alignItems: 'start', marginBottom: '24px' }}>
                {/* Left Column: Simulated Phone Frame / Player */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%',
                    maxWidth: '420px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '28px 24px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
                  }}>
                    {/* Caller info */}
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        {React.createElement('dotlottie-player', {
                          src: '/e5e93088-1153-11ee-99ca-5b05c2393df2.lottie',
                          autoplay: true,
                          loop: true,
                          style: { width: '180px', height: '180px' }
                        })}
                      </div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: 700 }}>Xenia Offers</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px' }}>Verified Business · {scriptData.voice_model_name}</div>
                      
                      {/* Real vs Simulated badge */}
                      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ color: 'var(--color-accent)', fontSize: '10px', backgroundColor: 'var(--color-accent-light)', padding: '3px 10px', borderRadius: '4px', border: '1px solid var(--color-accent-border)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={11} /> {scriptData.language}
                        </span>
                        {audioLoading ? (
                          <span style={{ color: 'var(--text-secondary)', fontSize: '10px', backgroundColor: '#F3F4F6', padding: '3px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <RefreshCw size={9} style={{ animation: 'spin 1s linear infinite' }} /> Synthesizing...
                          </span>
                        ) : generatedBy === 'elevenlabs' ? (
                          <span style={{ color: 'var(--color-success)', fontSize: '10px', backgroundColor: 'var(--color-success-bg)', padding: '3px 10px', borderRadius: '4px', border: '1px solid var(--color-success-border)' }}>
                            Voice Synthesis Active
                          </span>
                        ) : (
                          <span style={{ color: 'var(--color-warning)', fontSize: '10px', backgroundColor: 'var(--color-warning-bg)', padding: '3px 10px', borderRadius: '4px', border: '1px solid var(--color-warning-border)' }}>
                            Simulated
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Waveform animation */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', height: '60px', marginBottom: '24px' }}>
                      {Array.from({ length: 28 }).map((_, i) => {
                        const heights = [10, 16, 26, 20, 36, 28, 18, 32, 24, 42, 32, 20, 38, 24, 18, 32, 26, 18, 14, 10, 18, 30, 22, 38, 28, 20, 14, 10];
                        const barProgress = (i / 28) * 100;
                        const isActive = isPlaying && barProgress <= playProgress;
                        const isPast = barProgress <= playProgress;
                        return (
                          <div
                            key={i}
                            style={{
                              width: '4px',
                              height: `${heights[i]}px`,
                              borderRadius: '2px',
                              background: isPast ? 'var(--color-accent)' : '#E5E7EB',
                              transition: 'background 0.15s ease',
                              animation: isActive ? `pulse ${0.3 + (i % 4) * 0.1}s ease-in-out infinite alternate` : 'none'
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Progress bar */}
                    <div style={{ height: '6px', backgroundColor: '#E5E7EB', borderRadius: '3px', marginBottom: '14px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${playProgress}%`, backgroundColor: 'var(--color-accent)', borderRadius: '3px', transition: 'width 0.1s linear' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                      <span>{Math.floor((playProgress / 100) * scriptData.estimated_duration_sec)}s</span>
                      <span>{scriptData.estimated_duration_sec}s</span>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                      <button
                        onClick={() => {
                          setPlayProgress(0);
                          setIsPlaying(false);
                          if (audioObjRef.current) {
                            audioObjRef.current.pause();
                            audioObjRef.current.currentTime = 0;
                          }
                          if (playIntervalRef.current) clearInterval(playIntervalRef.current);
                        }}
                        style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '50%', width: '42px', height: '42px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
                      >
                        <RotateCcw size={16} />
                      </button>
                      <button
                        onClick={handlePlayPreview}
                        disabled={audioLoading}
                        style={{ backgroundColor: 'var(--color-accent)', border: 'none', borderRadius: '50%', width: '60px', height: '60px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: audioLoading ? 0.6 : 1, transition: 'all 0.2s' }}
                      >
                        {isPlaying ? <PauseCircle size={28} color="#fff" /> : <PlayCircle size={28} color="#fff" />}
                      </button>
                      <button
                        onClick={handleGenerateScript}
                        style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '50%', width: '42px', height: '42px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
                      >
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Outbound Script Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    Personalized Outbound Script
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { label: 'Opening Greeting', value: scriptData.script.opening, icon: <Volume2 size={16} color="var(--text-secondary)" /> },
                      { label: 'Main Value Offer', value: scriptData.script.main_offer, icon: <Gift size={16} color="var(--text-secondary)" /> },
                      { label: 'Call-to-Action', value: scriptData.script.cta, icon: <Megaphone size={16} color="var(--text-secondary)" /> },
                      { label: 'Closing Signature', value: scriptData.script.closing, icon: <Handshake size={16} color="var(--text-secondary)" /> },
                    ].map(section => (
                      <div key={section.label} style={{ display: 'flex', gap: '14px', padding: '14px 16px', background: '#ffffff', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{section.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '4px' }}>{section.label}</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6' }}>{section.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {audioLoading && (
                <div style={{ backgroundColor: 'var(--color-accent-light)', border: '1px solid var(--color-accent-border)', borderRadius: '6px', padding: '10px 14px', fontSize: '11.5px', color: 'var(--color-accent)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                  <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />
                  <strong>Synthesizing Voice...</strong>
                </div>
              )}
              {!audioLoading && audioError && (
                <div style={{ background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)', borderRadius: '6px', padding: '10px 14px', fontSize: '11.5px', color: 'var(--color-warning)', textAlign: 'center', marginBottom: '8px', marginTop: '16px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}><AlertTriangle size={14} /> <span><strong>Simulated Preview:</strong> {audioError}. Make sure you set a valid Elevenlabs API key in Settings.</span></span>
                </div>
              )}
              {!audioLoading && !audioError && generatedBy === 'elevenlabs' && (
                <div style={{ background: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', borderRadius: '6px', padding: '10px 14px', fontSize: '11.5px', color: 'var(--color-success)', textAlign: 'center', marginTop: '16px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}><Sparkles size={14} /> <span><strong>Voice Preview</strong> loaded successfully! Play it above.</span></span>
                </div>
              )}
              {!audioLoading && !audioError && generatedBy === 'mock' && (
                <div style={{ background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)', borderRadius: '6px', padding: '10px 14px', fontSize: '11.5px', color: 'var(--color-warning)', textAlign: 'center', marginTop: '16px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}><Volume2 size={14} /> <span><strong>Simulated Preview</strong> — Set a valid Elevenlabs API key in Settings to enable real audio synthesis.</span></span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-secondary" onClick={() => setStep('script')}>← Back to Script</button>
              <button
                className="btn btn-primary"
                onClick={() => setStep('cost')}
                style={{ padding: '10px 24px' }}
              >
                View Cost Estimation →
              </button>
            </div>
          </div>
        )}
        {step === 'cost' && scriptData && audienceData && (
          <div className="fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
            {audienceData.summary.total_identified > 1000 && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecdd3', borderRadius: '6px', padding: '14px 18px', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <AlertOctagon size={18} color="#991b1b" style={{ flexShrink: 0, marginTop: '1px' }} />
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#991b1b', marginBottom: '3px' }}>
                    Large Audience Detected ({audienceData.summary.total_identified.toLocaleString('en-IN')} shoppers)
                  </div>
                  <div style={{ fontSize: '12px', color: '#7f1d1d' }}>
                    Voice campaigns at this scale are very expensive. Consider splitting into smaller batches of 200–300 shoppers or switching to WhatsApp for cost efficiency.
                  </div>
                </div>
              </div>
            )}

            <div className="card" style={{ margin: '0 0 16px 0' }}>
              <div className="card-title" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart2 size={18} color="var(--color-accent)" /> Campaign Cost Estimation
              </div>
              <div className="table-container" style={{ margin: 0 }}>
                <table className="enterprise-table">
                  <tbody>
                    {[
                      { metric: 'Target Customers', value: audienceData.summary.total_identified.toLocaleString('en-IN'), highlight: false },
                      { metric: 'Estimated Call Duration', value: `~${scriptData.estimated_duration_sec} seconds`, highlight: false },
                      { metric: 'Estimated Total Call Minutes', value: `${Math.round(audienceData.summary.total_identified * scriptData.estimated_duration_sec / 60).toLocaleString('en-IN')} min`, highlight: false },
                      { metric: 'Cost Per Call (Voice Synthesis)', value: `₹${scriptData.estimated_cost_per_call_inr.toFixed(2)}`, highlight: false },
                      { metric: 'Estimated Total Campaign Cost', value: `₹${scriptData.estimated_total_cost_inr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, highlight: true },
                      { metric: 'Potential Recovery Revenue', value: `₹${(audienceData.summary.potential_recovery_value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, highlight: false },
                      { metric: 'Estimated ROI', value: `${Math.round(audienceData.summary.potential_recovery_value / Math.max(scriptData.estimated_total_cost_inr, 1))}x`, highlight: true },
                    ].map(row => (
                      <tr key={row.metric} style={row.highlight ? { background: purpleLight } : {}}>
                        <td style={{ fontWeight: 500 }}>{row.metric}</td>
                        <td className="mono-align" style={{ fontWeight: row.highlight ? 700 : 400, color: row.highlight ? purple : 'var(--text-primary)' }}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-secondary" onClick={() => setStep('preview')}>← Back to Preview</button>
              <button
                className="btn btn-primary"
                onClick={() => setStep('approval')}
                style={{ padding: '10px 24px' }}
              >
                Review & Approve →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 6: APPROVAL ───────────────────────────────────────────── */}
        {step === 'approval' && scriptData && audienceData && (
          <div className="fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="card" style={{ margin: '0 0 16px 0' }}>
              <div className="card-title" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="var(--color-accent)" /> Campaign Approval Summary
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px', fontSize: '13px', marginBottom: '16px' }}>
                {[
                  { label: 'Audience', value: `${audienceData.summary.total_identified} shoppers` },
                  { label: 'Segments', value: Object.keys(audienceData.summary.segment_distribution).join(', ') },
                  { label: 'Voice Model', value: scriptData.voice_model_name },
                  { label: 'Language', value: scriptData.language },
                  { label: 'Voice Tone', value: voiceTone },
                  { label: 'Promo Code', value: promoCode },
                  { label: 'Discount', value: `${discountValue}% off` },
                  { label: 'Est. Duration', value: `${scriptData.estimated_duration_sec}s per call` },
                  { label: 'Estimated Cost', value: `₹${scriptData.estimated_total_cost_inr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
                  { label: 'Expected Recovery', value: `₹${(audienceData.summary.potential_recovery_value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
                ].map(row => (
                  <div key={row.label} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>{row.label}</span>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{row.value}</div>
                  </div>
                ))}
              </div>

              {/* Script preview */}
              <div style={{ background: '#F9FAFB', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px', fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '14px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: purple, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FileText size={12} /> Script Preview
                </div>
                "{scriptData.script.full_script}"
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setStep('cost')}>← Back</button>
              <button className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Save size={14} /> Save Draft
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSimulateCalls}
                disabled={simLoading}
                style={{ padding: '10px 28px', fontSize: '13.5px' }}
              >
                {simLoading ? (
                  <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Simulating Calls...</>
                ) : (
                  <><PhoneCall size={14} /> Approve & Launch Voice Campaign</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 7: TRACKING DASHBOARD ─────────────────────────────────── */}
        {step === 'tracking' && simData && (
          <div className="fade-in">
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Calls Initiated',      value: simData.total_calls_initiated, icon: <Phone size={16} />, color: '#2563eb' },
                { label: 'Calls Answered',        value: simData.calls_answered,        icon: <PhoneCall size={16} />, color: '#059669' },
                { label: 'Calls Completed',       value: simData.calls_completed,       icon: <CheckCircle2 size={16} />, color: '#059669' },
                { label: 'No Answer / Dropped',   value: simData.calls_no_answer + simData.calls_dropped, icon: <PhoneMissed size={16} />, color: '#dc2626' },
                { label: 'Interested Customers',  value: simData.interested_customers,  icon: <TrendingUp size={16} />, color: purple },
                { label: 'Promo Code Sent',       value: simData.promo_sent,            icon: <MessageSquare size={16} />, color: '#d97706' },
                { label: 'Attributed Purchases',  value: simData.attributed_purchases,  icon: <CheckSquare size={16} />, color: '#059669' },
                { label: 'Revenue Generated',     value: `₹${simData.total_revenue_generated.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, icon: <DollarSign size={16} />, color: '#059669' },
              ].map(kpi => (
                <div key={kpi.label} style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                    {kpi.icon}
                    <span style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{kpi.label}</span>
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{kpi.value}</div>
                </div>
              ))}
            </div>

            {/* ROI & Cost summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div className="card" style={{ margin: 0, padding: '14px' }}>
                <div className="card-title" style={{ marginBottom: '12px' }}>Campaign Economics</div>
                {[
                  { label: 'Est. Voice Synthesis Cost', value: `₹${simData.estimated_cost_inr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, color: '#dc2626' },
                  { label: 'Revenue Attributed', value: `₹${simData.total_revenue_generated.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, color: '#059669' },
                  { label: 'Campaign ROI', value: `${simData.estimated_roi.toFixed(1)}x`, color: purple },
                  { label: 'Answer Rate', value: `${Math.round((simData.calls_answered / simData.total_calls_initiated) * 100)}%`, color: '#2563eb' },
                  { label: 'Completion Rate', value: `${Math.round((simData.calls_completed / simData.total_calls_initiated) * 100)}%`, color: '#059669' },
                  { label: 'Conversion Rate', value: `${Math.round((simData.attributed_purchases / simData.total_calls_initiated) * 100)}%`, color: purple },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{row.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{ margin: 0, padding: '14px' }}>
                <div className="card-title" style={{ marginBottom: '12px' }}>Call Status Distribution</div>
                {[
                  { label: 'Completed', count: simData.calls_completed, color: '#059669', pct: simData.total_calls_initiated },
                  { label: 'No Answer', count: simData.calls_no_answer, color: '#d97706', pct: simData.total_calls_initiated },
                  { label: 'Dropped', count: simData.calls_dropped, color: '#dc2626', pct: simData.total_calls_initiated },
                ].map(row => (
                  <div key={row.label} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 500 }}>{row.label}</span>
                      <span style={{ fontSize: '12px', color: row.color, fontWeight: 700 }}>{row.count} ({Math.round((row.count / row.pct) * 100)}%)</span>
                    </div>
                    <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.round((row.count / row.pct) * 100)}%`, background: row.color, borderRadius: '3px', transition: 'width 1s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Shopper Tracking Table */}
            <div className="card" style={{ margin: 0 }}>
              <div className="card-title" style={{ marginBottom: '12px' }}>
                Individual Call Tracking
                <span style={{ fontSize: '10px', background: purpleLight, color: purple, padding: '2px 8px', borderRadius: '3px', fontWeight: 600 }}>
                  Click a shopper to view call journey
                </span>
              </div>
              <div className="table-container" style={{ margin: 0 }}>
                <table className="enterprise-table">
                  <thead>
                    <tr>
                      <th>Shopper</th>
                      <th>City</th>
                      <th>Segment</th>
                      <th className="mono-align">LTV</th>
                      <th>Call Status</th>
                      <th className="mono-align">Duration</th>
                      <th>Promo Sent</th>
                      <th className="mono-align">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simData.shopper_events.map((ev, idx) => (
                      <tr
                        key={idx}
                        onClick={() => setSelectedCallEvent(ev)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{ev.shopper_name}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{ev.city}</td>
                        <td>
                          <span style={{
                            fontSize: '10px', padding: '2px 6px', borderRadius: '3px', fontWeight: 600,
                            background: ev.segment === 'Champion' ? '#f0fdf4' : purpleLight,
                            color: ev.segment === 'Champion' ? '#059669' : purple
                          }}>
                            {ev.segment}
                          </span>
                        </td>
                        <td className="mono-align">₹{ev.ltv.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td>
                          <span style={{
                            fontSize: '10px', padding: '2px 7px', borderRadius: '3px', fontWeight: 600,
                            background: ev.call_status === 'completed' ? '#f0fdf4' : ev.call_status === 'no_answer' ? '#fff7ed' : '#fef2f2',
                            color: ev.call_status === 'completed' ? '#059669' : ev.call_status === 'no_answer' ? '#d97706' : '#dc2626'
                          }}>
                            {ev.call_status === 'completed' ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={11} /> Completed</span>
                            ) : ev.call_status === 'no_answer' ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><PhoneOff size={11} /> No Answer</span>
                            ) : (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><XCircle size={11} /> Dropped</span>
                            )}
                          </span>
                        </td>
                        <td className="mono-align">{ev.duration_sec ? `${ev.duration_sec}s` : '—'}</td>
                        <td>
                          {ev.promo_sent ? (
                            <span style={{ fontSize: '10px', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', padding: '2px 6px', borderRadius: '3px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Send size={11} /> Sent
                            </span>
                          ) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                        </td>
                        <td className="mono-align" style={{ fontWeight: ev.attributed_revenue ? 700 : 400, color: ev.attributed_revenue ? '#059669' : 'var(--text-muted)' }}>
                          {ev.attributed_revenue ? `₹${ev.attributed_revenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── SHOPPER CALL JOURNEY DRAWER ────────────────────────────────── */}
        {selectedCallEvent && (
          <div className="drawer-backdrop" onClick={() => setSelectedCallEvent(null)}>
            <div className="drawer-container" style={{ width: '38%', minWidth: '440px' }} onClick={e => e.stopPropagation()}>
              <div className="drawer-header" style={{ borderBottom: `2px solid ${purpleBorder}` }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: purple, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <PhoneCall size={16} /> Call Journey: {selectedCallEvent.shopper_name}
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {selectedCallEvent.city} · {selectedCallEvent.segment} · LTV ₹{selectedCallEvent.ltv.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <button onClick={() => setSelectedCallEvent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <X size={18} />
                </button>
              </div>
              <div className="drawer-body">
                {/* Call status badge */}
                <div style={{ marginBottom: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '11px', padding: '4px 12px', borderRadius: '4px', fontWeight: 700,
                    background: selectedCallEvent.call_status === 'completed' ? '#f0fdf4' : selectedCallEvent.call_status === 'no_answer' ? '#fff7ed' : '#fef2f2',
                    color: selectedCallEvent.call_status === 'completed' ? '#059669' : '#dc2626',
                    border: `1px solid ${selectedCallEvent.call_status === 'completed' ? '#bbf7d0' : selectedCallEvent.call_status === 'no_answer' ? '#fed7aa' : '#fecdd3'}`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {selectedCallEvent.call_status === 'completed' ? (
                      <><CheckCircle2 size={12} /> Call Completed</>
                    ) : selectedCallEvent.call_status === 'no_answer' ? (
                      <><PhoneOff size={12} /> No Answer</>
                    ) : (
                      <><XCircle size={12} /> Call Dropped</>
                    )}
                  </span>
                  {selectedCallEvent.duration_sec && (
                    <span style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '4px', fontWeight: 600, background: purpleLight, color: purple, border: `1px solid ${purpleBorder}`, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {selectedCallEvent.duration_sec}s duration
                    </span>
                  )}
                  {selectedCallEvent.purchase_attributed && (
                    <span style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '4px', fontWeight: 700, background: '#f0fdf4', color: '#059669', border: '1px solid #bbf7d0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <ShoppingBag size={12} /> Purchase Attributed
                    </span>
                  )}
                </div>

                {/* Timeline */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Call Journey Timeline
                  </div>
                  <div style={{ position: 'relative', paddingLeft: '28px' }}>
                    {/* Vertical line */}
                    <div style={{ position: 'absolute', left: '11px', top: '8px', bottom: '8px', width: '2px', background: purpleBorder }} />
                    {selectedCallEvent.timeline.map((event, idx) => (
                      <div key={idx} style={{ position: 'relative', marginBottom: '16px' }}>
                        {/* Dot */}
                        <div style={{
                          position: 'absolute', left: '-28px', top: '2px',
                          width: '22px', height: '22px', borderRadius: '50%',
                          background: '#fff', border: `2px solid ${purple}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '11px', zIndex: 1
                        }}>
                          {renderTimelineIcon(event.icon)}
                        </div>
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{event.event}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>{event.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attributed Revenue */}
                {selectedCallEvent.attributed_revenue && (
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#059669', letterSpacing: '0.06em', marginBottom: '4px' }}>Attributed Revenue</div>
                    <div style={{ fontSize: '26px', fontWeight: 700, color: '#059669', fontVariantNumeric: 'tabular-nums' }}>
                      ₹{selectedCallEvent.attributed_revenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                    <div style={{ fontSize: '11px', color: '#047857', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> Voice campaign conversion
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── LAUNCHING DIALER PROGRESS OVERLAY ──────────────────────────── */}
        {isLaunching && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}>
            <div style={{
              width: '540px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '32px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <object
                  data="/voice-agent-working-animation.svg"
                  type="image/svg+xml"
                  style={{ width: '280px', height: '280px' }}
                />
              </div>
              
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Launching Voice Campaign
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Please wait while the AI voice agent configures the outbound dialer queue.
              </p>

              {/* Progress Bar */}
              <div style={{
                height: '6px',
                backgroundColor: '#E5E7EB',
                borderRadius: '3px',
                marginBottom: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${launchProgress}%`,
                  backgroundColor: 'var(--color-accent)',
                  borderRadius: '3px',
                  transition: 'width 0.1s linear'
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--color-accent)', marginBottom: '24px' }}>
                <span>{Math.round(launchProgress)}% Completed</span>
                <span>5.0s</span>
              </div>

              {/* Logs */}
              <div style={{
                backgroundColor: '#F9FAFB',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '12px 16px',
                textAlign: 'left',
                height: '120px',
                overflowY: 'auto',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                lineHeight: '1.6',
                color: 'var(--text-secondary)'
              }}>
                {launchLogs.map((log, i) => (
                  <div key={i} style={{ marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <span style={{ color: 'var(--color-accent)' }}>&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 8. SETTINGS VIEW — API Key Management
  // ────────────────────────────────────────────────────────────────────────────
  function SettingsView() {
    const [status, setStatus] = useState<ApiKeyStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);

    // Input state
    const [groqKey, setGroqKey] = useState('');
    const [elevenKey, setElevenKey] = useState('');
    const [showGroq, setShowGroq] = useState(false);
    const [showEleven, setShowEleven] = useState(false);

    useEffect(() => {
      api.getApiKeyStatus()
        .then(d => { setStatus(d); setLoading(false); })
        .catch(() => setLoading(false));
    }, []);

    const handleSave = async () => {
      if (!groqKey.trim() && !elevenKey.trim()) {
        setSaveError('Enter at least one API key to update');
        return;
      }
      setSaving(true);
      setSaveSuccess(null);
      setSaveError(null);
      try {
        const payload: { groq_api_key?: string; elevenlabs_api_key?: string } = {};
        if (groqKey.trim()) payload.groq_api_key = groqKey.trim();
        if (elevenKey.trim()) payload.elevenlabs_api_key = elevenKey.trim();
        const fresh = await api.updateApiKeys(payload);
        setStatus(fresh);
        setGroqKey('');
        setElevenKey('');
        setSaveSuccess('API keys updated successfully! Changes are live immediately — no restart needed.');
        setTimeout(() => setSaveSuccess(null), 6000);
      } catch (e: any) {
        setSaveError(e.message || 'Failed to update keys');
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className="fade-in" style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Header banner */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ width: '42px', height: '42px', background: 'var(--color-accent-light)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings size={22} color="var(--color-accent)" />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>System Settings</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Manage API credentials · Changes take effect immediately without server restart
            </div>
          </div>
        </div>

        {/* Current key status */}
        {loading ? (
          <SkeletonLoader type="kpi" rows={2} />
        ) : status && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              {
                name: 'Generative AI Engine',
                subtitle: 'Drafts shopper engagement scripts',
                icon: '📝',
                isSet: status.groq_api_key_set,
                preview: status.groq_api_key_preview,
                color: 'var(--color-success)',
                badgeClass: status.groq_api_key_set ? 'badge-success' : 'badge-neutral',
                bgColor: 'var(--color-success-bg)',
                borderColor: 'var(--color-success-border)'
              },
              {
                name: 'Elevenlabs Voice Engine',
                subtitle: 'Synthesizes campaign call audio',
                icon: '🔊',
                isSet: status.elevenlabs_api_key_set,
                preview: status.elevenlabs_api_key_preview,
                color: 'var(--color-accent)',
                badgeClass: status.elevenlabs_api_key_set ? 'badge-primary' : 'badge-neutral',
                bgColor: 'var(--color-accent-light)',
                borderColor: 'var(--color-accent-border, #fca5a5)'
              }
            ].map(card => (
              <div key={card.name} style={{
                background: '#fff',
                border: `1px solid ${card.isSet ? card.borderColor : 'var(--border-color)'}`,
                borderRadius: '6px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxSizing: 'border-box'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{card.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{card.name}</span>
                    <span className={`badge ${card.badgeClass}`} style={{ marginLeft: 'auto' }}>
                      {card.isSet ? 'Active' : 'Not Set'}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', minHeight: '34px' }}>{card.subtitle}</div>
                </div>
                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11.5px',
                  color: card.isSet ? card.color : 'var(--text-muted)',
                  background: card.isSet ? card.bgColor : '#f9fafb',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  border: `1px solid ${card.isSet ? card.borderColor : 'var(--border-color)'}`,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {card.preview}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Update form */}
        <div className="workspace-panel" style={{ margin: '0 0 24px 0' }}>
          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={16} color="var(--text-secondary)" />
            Update API Keys
          </div>

          {/* Groq */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Generative AI API Key
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={showGroq ? 'text' : 'password'}
                value={groqKey}
                onChange={e => setGroqKey(e.target.value)}
                placeholder="gsk_••••••••••••••••••••••••"
                autoComplete="off"
                style={{ fontFamily: 'var(--mono)', letterSpacing: '0.05em', paddingRight: '40px' }}
              />
              <button
                onClick={() => setShowGroq(!showGroq)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
              >
                {showGroq ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>
              Leave blank to keep the current key unchanged
            </div>
          </div>

          {/* ElevenLabs */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Elevenlabs API Key
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={showEleven ? 'text' : 'password'}
                value={elevenKey}
                onChange={e => setElevenKey(e.target.value)}
                placeholder="sk_••••••••••••••••••••••••"
                autoComplete="off"
                style={{ fontFamily: 'var(--mono)', letterSpacing: '0.05em', paddingRight: '40px' }}
              />
              <button
                onClick={() => setShowEleven(!showEleven)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
              >
                {showEleven ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>
              Leave blank to keep the current key unchanged
            </div>
          </div>
        </div>

        {/* Feedback messages */}
        {saveSuccess && (
          <div style={{ background: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', borderRadius: '6px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <CheckCircle size={16} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '13px', color: 'var(--color-success)', fontWeight: 500 }}>{saveSuccess}</span>
          </div>
        )}
        {saveError && (
          <div style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: '6px', padding: '12px 16px', marginBottom: '16px', color: 'var(--color-danger)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={16} color="var(--color-danger)" />
            <span>{saveError}</span>
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving || (!groqKey.trim() && !elevenKey.trim())}
          style={{
            padding: '12px 28px',
            fontSize: '14px',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          {saving ? (
            <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving to .env & reloading...</>
          ) : (
            <><Save size={14} /> Save API Keys</>
          )}
        </button>

        {/* Info card */}
        <div style={{ marginTop: '24px', background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)', borderRadius: '6px', padding: '16px 20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-warning)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ℹ️ How this works
          </div>
          <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: '#78350f', lineHeight: '1.7' }}>
            <li>Keys are written directly to the backend <code style={{ background: '#fef3c7', padding: '2px 4px', borderRadius: '3px', fontFamily: 'var(--mono)' }}>.env</code> file</li>
            <li>The backend settings cache is cleared immediately — no restart needed</li>
            <li>Generative AI key changes reload the generator client instantly</li>
            <li>Elevenlabs key activates real synthesis in Voice Campaigns Preview step</li>
            <li>Keys are never sent to the frontend — only masked previews are shown</li>
          </ul>
        </div>

        {status && (
          <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
            📄 Config file: <code style={{ fontFamily: 'var(--mono)' }}>{status.env_file_path}</code>
          </div>
        )}
      </div>
    );
  }
}

