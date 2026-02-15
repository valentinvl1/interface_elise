// Types correspondant à la structure de la base de données Supabase

export interface SupabaseAuditData {
  id: string;
  audit_date: string;
  audit_page_url: string | null;
  full_name: string;
  company_name: string;
  email: string;
  activities: string[];
  uses_ai: boolean;
  has_reference_document: boolean;
  global_score_percent: number;
  level_label: string;
  verdict_phrase: string;
  scores: {
    clauses_generales: number | null;
    creation_refonte: number | null;
    maintenance: number | null;
    hebergement: number | null;
    community_management: number | null;
    seo: number | null;
    sea: number | null;
  };
  thematic_summary: ThematicSummary[];
  major_weaknesses: string[];
  priority_recommendations: string[];
  created_at: string;
  url_document_uplaoded: string;
  general_score_percent: number;
  general_constats: string;
  general_recommendations: string;
  creation_score_percent: number | null;
  creation_constats: string;
  creation_recommendations: string;
  maintenance_score_percent: number | null;
  maintenance_constats: string;
  maintenance_recommendations: string;
  hosting_score_percent: number | null;
  hosting_constats: string;
  hosting_recommendations: string;
  cm_score_percent: number | null;
  cm_constats: string;
  cm_recommendations: string;
  seo_score_percent: number | null;
  seo_constats: string;
  seo_recommendations: string;
  sea_score_percent: number | null;
  sea_constats: string;
  sea_recommendations: string;
  document_extractandanonymous: string;
}

export interface ThematicSummary {
  thematique: string;
  score: number;
  texte: string;
}
