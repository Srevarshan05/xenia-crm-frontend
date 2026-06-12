const API_BASE_URL = "http://localhost:8000";

export interface Customer {
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  join_date: string;
}

export interface CustomerMetrics {
  customer_id: string;
  r_score: number;
  f_score: number;
  m_score: number;
  value_score: number;
  churn_score: number;
  churn_probability: number;
  engagement_score: number;
  preferred_channel: string;
  top_category: string;
  category_affinity_json: Record<string, number>;
  total_orders: number;
  total_spend: number;
  avg_order_value: number;
  days_since_last_order: number;
}

export interface CustomerInsights {
  customer_id: string;
  ai_persona: string;
  persona_description: string;
  summary: string;
  risks: string[];
  recommendations: string[];
  confidence_score: number;
  last_updated: string;
}

export interface CustomerSegment {
  customer_id: string;
  segment_name: string;
  assigned_at: string;
}

export interface Opportunity {
  opportunity_id: string;
  type: string;
  description: string;
  audience_size: number;
  segment_filter: Record<string, any>;
  customer_ids_sample: string[];
  potential_revenue: number;
  priority: string;
  ai_explanation: string | null;
  ai_action_plan: string | null;
  confidence_score: number | null;
  status: string;
  created_at: string;
  recommended_channel?: string | null;
  recommended_promotion_code?: string | null;
}

export interface Promotion {
  promotion_id: string;
  name: string;
  description?: string;
  promo_code: string;
  discount_type: string; // Percentage, Fixed Amount, Free Shipping, etc.
  discount_value: number;
  max_discount_cap?: number;
  applicable_categories: string;
  applicable_cities: string;
  applicable_segments?: string;
  start_date?: string;
  end_date?: string;
  max_usage_limit?: number;
  per_shopper_limit?: number;
  max_budget?: number;
  min_order_value?: number;
  active: boolean;
  priority?: string;
  allow_xenia_recommendations?: boolean;
  times_used: number;
  times_recommended: number;
  purchases_attributed: number;
  revenue_generated: number;
  roi_generated: number;
}

export interface Campaign {
  campaign_id: string;
  name: string;
  objective: string;
  promotion_id: string | null;
  channel: string;
  status: string; // draft | reviewed | awaiting approval | approved | running | completed
  message_template: string | null;
  message_variants: string[] | null;
  target_segment: string | null;
  target_audience_size: number | null;
  created_at: string;
  launched_at: string | null;
  completed_at: string | null;
  
  promotion?: Promotion | null;
  simulation?: CampaignSimulation | null;
  metrics?: CampaignMetrics | null;
}

export interface CampaignSimulation {
  predicted_reach: number;
  predicted_ctr: number;
  predicted_cvr: number;
  predicted_revenue: number;
  confidence_score: number;
  risk_factors: string[];
  ai_narrative: string;
}

export interface CampaignMetrics {
  total_sent: number;
  total_delivered: number;
  total_opened: number;
  total_clicked: number;
  total_purchased: number;
  total_failed: number;
  attributed_revenue: number;
  estimated_cost: number;
  roi?: number | null;
  conversion_rate?: number | null;
  last_updated: string;
}

export interface CampaignAnalyticsResponse {
  campaign_id: string;
  name: string;
  funnel: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    promo_applied: number;
    purchased: number;
    failed: number;
  };
  metrics: {
    attributed_revenue: number;
    estimated_cost: number;
    roi: number;
    conversion_rate: number;
  };
}

export interface RecipientLog {
  communication_id: string;
  customer: {
    customer_id: string;
    name: string;
    email: string;
    city: string;
    lifetime_value?: number;
    last_purchase_days?: number;
    churn_probability?: number;
    preferred_channel?: string;
    top_category?: string;
    total_orders?: number;
  };
  channel: string;
  status: string;
  created_at: string;
  attributed_order: {
    order_id: string;
    total_amount: number;
    order_date: string;
  } | null;
}

export interface RecipientLogsResponse {
  recipients: RecipientLog[];
  total_count: number;
  page: number;
  limit: number;
}

export interface DailyBrief {
  headline: string;
  summary: string;
  opportunities_count: number;
  at_risk_count: number;
  recoverable_revenue: number;
  full_content: {
    kpi_overview?: string;
    opportunities_breakdown?: string;
    fatigue_and_safety_alert?: string;
    recommended_actions?: string[];
  };
  confidence_score: number;
}

export interface NLQueryResponse {
  query_id: string;
  question: string;
  intent: string;
  response: string;
  data_points: any[];
  chart_suggestion: string;
  confidence_score: number;
  created_at: string;
  context_json: {
    sql_query: string;
    error: string | null;
  };
}

export interface ShopperStory {
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  snapshot: {
    customer_since: string;
    location: string;
    preferred_channel: string;
    lifetime_value: number;
    orders_count: number;
    avg_order_value: number;
    last_purchase_days: number;
  };
  timeline: { date: string; event: string }[];
  purchase_history: { date: string; product: string; category: string; amount: number }[];
  campaign_history: { campaign: string; channel: string; status: string }[];
  funnel: {
    received: number;
    delivered: number;
    opened: number;
    clicked: number;
    purchased: number;
  };
  category_preferences: { category: string; percentage: number }[];
  behavior: {
    frequency_days: number;
    preferred_day: string;
    preferred_time: string;
    avg_basket_size: number;
    most_active_channel: string;
  };
  attribution: {
    influenced_revenue: number;
    campaign_purchases: number;
    last_attributed_campaign: string;
  };
  next_step: {
    summary: string;
    channel_preference: string;
    action: string;
  };
}

export interface PromotionPreview {
  promotion_id: string;
  name: string;
  promo_code: string;
  discount_percentage: number;
  min_order_value?: number;
  discount_type?: string;
  discount_value?: number;
  applicable_categories?: string;
  start_date?: string;
  end_date?: string;
}

export interface CampaignStrategyExplanation {
  why_audience: string;
  why_now: string;
  why_channel: string;
  why_promotion: string;
}

export interface AudienceSummary {
  total_identified: number;
  suppressed: number;
  eligible: number;
  avg_spend: number;
  avg_inactivity_days: number;
  city_distribution: Record<string, number>;
  channel_distribution: Record<string, number>;
  category_affinity_distribution: Record<string, number>;
}

export interface ShopperPreview {
  customer_id: string;
  name: string;
  city: string;
  email: string;
  phone: string;
  lifetime_value: number;
  last_purchase_days: number;
  churn_probability: number;
  preferred_channel: string;
  top_category?: string;
  total_orders?: number;
}

export interface PromotionRecommendation {
  promotion_id: string;
  name: string;
  promo_code: string;
  discount_type: string;
  discount_value: number;
  applicable_categories: string;
  applicable_cities: string;
  applicable_segments?: string;
  min_order_value?: number;
  start_date?: string;
  end_date?: string;
  rationale: string[];
}

export interface PrepareContextResponse {
  audience_summary: AudienceSummary;
  recommended_promotion?: PromotionRecommendation;
  eligible_shoppers: ShopperPreview[];
}

export interface GoalPlannerResponse {
  goal: string;
  parsed_filters: Record<string, any>;
  campaign_name: string;
  target_segment: string;
  channel: string;
  message_template: string;
  message_variants: string[];
  recommended_promotion?: PromotionPreview;
  simulation: CampaignSimulation;
  confidence_score: number;
  ai_explanation: CampaignStrategyExplanation;
  audience_summary: AudienceSummary;
  eligible_shoppers: ShopperPreview[];
  
  whatsapp_template: string;
  whatsapp_variants: string[];
  email_subject: string;
  email_subject_variants: string[];
  email_template: string;
  email_variants: string[];
  sms_template: string;
  sms_variants: string[];
}


export const api = {
  // Daily Briefing
  getLatestBriefing: async (): Promise<DailyBrief> => {
    const res = await fetch(`${API_BASE_URL}/api/briefing/latest`);
    if (!res.ok) throw new Error("Failed to load briefing");
    return res.json();
  },

  // Opportunities
  listOpportunities: async (): Promise<Opportunity[]> => {
    const res = await fetch(`${API_BASE_URL}/api/opportunities`);
    if (!res.ok) throw new Error("Failed to load opportunities");
    const data = await res.json();
    return data.map((item: any) => ({
      ...item,
      type: item.suggested_action_type || item.type || item.internal_type || ""
    }));
  },
  
  getOpportunity: async (id: string): Promise<Opportunity> => {
    const res = await fetch(`${API_BASE_URL}/api/opportunities/${id}`);
    if (!res.ok) throw new Error("Failed to load opportunity details");
    const item = await res.json();
    return {
      ...item,
      type: item.suggested_action_type || item.type || item.internal_type || ""
    };
  },

  // Customers
  listCustomers: async (search?: string, city?: string, page = 1, limit = 20): Promise<Customer[]> => {
    let url = `${API_BASE_URL}/api/customers?page=${page}&limit=${limit}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (city) url += `&city=${encodeURIComponent(city)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load customers");
    return res.json();
  },

  listSegments: async (): Promise<{ segment_name: string; customer_count: number }[]> => {
    const res = await fetch(`${API_BASE_URL}/api/customers/segments`);
    if (!res.ok) throw new Error("Failed to load customer segments");
    return res.json();
  },

  getCustomer: async (id: string): Promise<Customer> => {
    const res = await fetch(`${API_BASE_URL}/api/customers/${id}`);
    if (!res.ok) throw new Error("Failed to load customer details");
    return res.json();
  },

  getCustomerMetrics: async (id: string): Promise<CustomerMetrics> => {
    const res = await fetch(`${API_BASE_URL}/api/customers/${id}/metrics`);
    if (!res.ok) throw new Error("Failed to load customer metrics");
    return res.json();
  },

  getCustomerInsights: async (id: string): Promise<CustomerInsights> => {
    const res = await fetch(`${API_BASE_URL}/api/customers/${id}/insights`);
    if (!res.ok) throw new Error("Failed to load customer shopper persona");
    return res.json();
  },

  getCustomerSegments: async (id: string): Promise<CustomerSegment[]> => {
    const res = await fetch(`${API_BASE_URL}/api/customers/${id}/segments`);
    if (!res.ok) throw new Error("Failed to load customer segment assignments");
    return res.json();
  },

  getCustomerStory: async (id: string): Promise<ShopperStory> => {
    const res = await fetch(`${API_BASE_URL}/api/customers/${id}/story`);
    if (!res.ok) throw new Error("Failed to load shopper story details");
    return res.json();
  },


  // Campaigns
  listCampaigns: async (status?: string): Promise<Campaign[]> => {
    let url = `${API_BASE_URL}/api/campaigns`;
    if (status) url += `?status=${status}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load campaigns");
    return res.json();
  },

  getCampaign: async (id: string): Promise<Campaign> => {
    const res = await fetch(`${API_BASE_URL}/api/campaigns/${id}`);
    if (!res.ok) throw new Error("Failed to load campaign");
    return res.json();
  },

  getCampaignAnalytics: async (id: string): Promise<CampaignAnalyticsResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/campaigns/${id}/analytics`);
    if (!res.ok) throw new Error("Failed to load campaign analytics");
    return res.json();
  },

  getCampaignRecipients: async (id: string, page = 1, limit = 50): Promise<RecipientLogsResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/campaigns/${id}/recipients?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to load campaign recipient logs");
    return res.json();
  },

  launchCampaign: async (id: string): Promise<Campaign> => {
    const res = await fetch(`${API_BASE_URL}/api/campaigns/${id}/launch`, {
      method: "POST",
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Failed to launch campaign");
    }
    return res.json();
  },

  simulateCampaign: async (id: string): Promise<Campaign> => {
    const res = await fetch(`${API_BASE_URL}/api/campaigns/${id}/simulate`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to run campaign simulation");
    return res.json();
  },

  updateCampaignStatus: async (id: string, status: string): Promise<Campaign> => {
    const res = await fetch(`${API_BASE_URL}/api/campaigns/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update campaign status");
    return res.json();
  },

  updateCampaign: async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
    const res = await fetch(`${API_BASE_URL}/api/campaigns/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campaign),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Failed to update campaign details");
    }
    return res.json();
  },

  // Planner
  getPrepareContext: async (opportunityId: string): Promise<PrepareContextResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/planner/prepare-context?opportunity_id=${opportunityId}`);
    if (!res.ok) throw new Error("Failed to load prepare context");
    return res.json();
  },

  generateCampaignProposal: async (goal: string): Promise<GoalPlannerResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/planner/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal }),
    });
    if (!res.ok) throw new Error("Failed to generate campaign proposal");
    return res.json();
  },

  // Analytics
  queryNL: async (question: string): Promise<NLQueryResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/analytics/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    if (!res.ok) throw new Error("Analytics query failed");
    return res.json();
  },

  getQueryHistory: async (): Promise<NLQueryResponse[]> => {
    const res = await fetch(`${API_BASE_URL}/api/analytics/history`);
    if (!res.ok) throw new Error("Failed to load query history");
    return res.json();
  },

  // Sandbox simulation event helper
  simulateWebhookDelivery: async (commId: string, eventType: string): Promise<any> => {
    const res = await fetch(`${API_BASE_URL}/api/webhook/delivery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        communication_id: commId,
        event_type: eventType,
      }),
    });
    if (!res.ok) throw new Error("Failed to trigger webhook simulation");
    return res.json();
  },

  // Promotions CRUD
  listPromotions: async (): Promise<Promotion[]> => {
    const res = await fetch(`${API_BASE_URL}/api/promotions`);
    if (!res.ok) throw new Error("Failed to load promotions");
    return res.json();
  },

  createPromotion: async (promo: Partial<Promotion>): Promise<Promotion> => {
    const res = await fetch(`${API_BASE_URL}/api/promotions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(promo)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Failed to create promotion");
    }
    return res.json();
  },

  getPromotion: async (id: string): Promise<Promotion> => {
    const res = await fetch(`${API_BASE_URL}/api/promotions/${id}`);
    if (!res.ok) throw new Error("Failed to get promotion details");
    return res.json();
  },

  updatePromotion: async (id: string, promo: Partial<Promotion>): Promise<Promotion> => {
    const res = await fetch(`${API_BASE_URL}/api/promotions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(promo)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Failed to update promotion");
    }
    return res.json();
  },

  deletePromotion: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/api/promotions/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Failed to delete promotion");
  },

  togglePromotionStatus: async (id: string): Promise<Promotion> => {
    const res = await fetch(`${API_BASE_URL}/api/promotions/${id}/status`, {
      method: "PATCH"
    });
    if (!res.ok) throw new Error("Failed to toggle promotion status");
    return res.json();
  },

  listPromotionCategories: async (): Promise<string[]> => {
    const res = await fetch(`${API_BASE_URL}/api/promotions/categories`);
    if (!res.ok) throw new Error("Failed to load promotion categories");
    return res.json();
  },

  listPromotionCities: async (): Promise<string[]> => {
    const res = await fetch(`${API_BASE_URL}/api/promotions/cities`);
    if (!res.ok) throw new Error("Failed to load promotion cities");
    return res.json();
  },

  listPromotionSegments: async (): Promise<string[]> => {
    const res = await fetch(`${API_BASE_URL}/api/promotions/segments`);
    if (!res.ok) throw new Error("Failed to load promotion segments");
    return res.json();
  },
};
