export type RiskLevel = 'low' | 'medium' | 'high';

export type IconType = 'FileText' | 'ShoppingCart' | 'Shield' | 'AlertCircle' | 'Cookie';

export type ColorType = 'blue' | 'peach' | 'mint' | 'lilac' | 'rose' | 'orange';

export interface CategoryDetails {
  constats: string[];
  explanation: string;
}

export interface CategoryData {
  score: number;
  risk: RiskLevel;
  description: string;
  details: CategoryDetails;
}

export interface RoadmapStep {
  title: string;
  icon: IconType;
  color: ColorType;
  recommendations: string[];
}

export interface LegalRisk {
  value: string;
  description: string;
}

export interface LegalRisks {
  fine: LegalRisk;
  imprisonment: LegalRisk;
  seoLoss: LegalRisk;
}

export interface AuditData {
  siteUrl: string;
  auditDate: string;
  legalRisks: LegalRisks;
  categories: {
    mentionsLegales: CategoryData;
    cgv: CategoryData;
    donneesPersonnelles: CategoryData;
    psnc: CategoryData;
  };
  roadmap: RoadmapStep[];
}

export interface OfferFeature {
  text: string;
  included: boolean;
}

export interface OfferData {
  title: string;
  subtitle: string;
  price: string;
  color: 'mint' | 'blue' | 'orange' | 'gray';
  popular?: boolean;
  features: OfferFeature[];
}
