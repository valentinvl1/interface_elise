import type { AuditData, CategoryData, RiskLevel } from '../types/audit.types';
import type { SupabaseAuditData } from '../types/supabase.types';

/**
 * Détermine le niveau de risque en fonction du score
 */
function getScoreRiskLevel(score: number | null): RiskLevel {
  if (score === null) return 'high';
  if (score >= 75) return 'low';
  if (score >= 50) return 'medium';
  return 'high';
}

/**
 * Transforme les données Supabase en format AuditData utilisé par l'application
 */
export function mapSupabaseToAuditData(data: SupabaseAuditData): AuditData {
  // Extraire les constats d'une chaîne de texte avec des sauts de ligne
  const parseConstats = (constatsText: string): string[] => {
    if (!constatsText || constatsText.includes('non cochée') || constatsText.includes('non évalués')) {
      return ['Activité non évaluée dans l\'audit'];
    }
    return constatsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  };

  // Déterminer les activités présentes
  const hasCreation = data.activities.some(a => a.toLowerCase().includes('création') || a.toLowerCase().includes('refonte'));
  const hasMaintenance = data.activities.some(a => a.toLowerCase().includes('maintenance'));
  const hasHosting = data.activities.some(a => a.toLowerCase().includes('hébergement'));

  // Créer les catégories à partir des données Supabase
  const mentionsLegales: CategoryData = {
    score: data.general_score_percent / 20, // Convertir de 0-100 à 0-5
    risk: getScoreRiskLevel(data.general_score_percent),
    description: data.thematic_summary.find(t => t.thematique.includes('Clauses générales') || t.thematique.includes('générales'))?.texte ||
                 data.verdict_phrase,
    details: {
      constats: parseConstats(data.general_constats),
      explanation: data.general_recommendations || 'Aucune recommandation spécifique'
    }
  };

  const cgv: CategoryData = {
    score: hasCreation && data.creation_score_percent !== null ? data.creation_score_percent / 20 : 0,
    risk: getScoreRiskLevel(data.creation_score_percent),
    description: data.thematic_summary.find(t => t.thematique.includes('Création') || t.thematique.includes('Refonte'))?.texte ||
                 (hasCreation ? 'Analyse des conditions de création et refonte' : 'Activité non présente dans votre contrat'),
    details: {
      constats: parseConstats(data.creation_constats),
      explanation: data.creation_recommendations || (hasCreation ? 'Aucune recommandation spécifique' : 'Non applicable')
    }
  };

  const donneesPersonnelles: CategoryData = {
    score: hasMaintenance && data.maintenance_score_percent !== null ? data.maintenance_score_percent / 20 : 0,
    risk: getScoreRiskLevel(data.maintenance_score_percent),
    description: data.thematic_summary.find(t => t.thematique.includes('Maintenance'))?.texte ||
                 (hasMaintenance ? 'Analyse de la maintenance et du support' : 'Activité non présente dans votre contrat'),
    details: {
      constats: parseConstats(data.maintenance_constats),
      explanation: data.maintenance_recommendations || (hasMaintenance ? 'Aucune recommandation spécifique' : 'Non applicable')
    }
  };

  const psnc: CategoryData = {
    score: hasHosting && data.hosting_score_percent !== null ? data.hosting_score_percent / 20 : 0,
    risk: getScoreRiskLevel(data.hosting_score_percent),
    description: data.thematic_summary.find(t => t.thematique.includes('Hébergement'))?.texte ||
                 (hasHosting ? 'Analyse des conditions d\'hébergement' : 'Activité non présente dans votre contrat'),
    details: {
      constats: parseConstats(data.hosting_constats),
      explanation: data.hosting_recommendations || (hasHosting ? 'Aucune recommandation spécifique' : 'Non applicable')
    }
  };

  // Créer la roadmap à partir des recommandations prioritaires
  const roadmap = data.priority_recommendations.map((recommendation, index) => {
    const icons = ['FileText', 'ShoppingCart', 'Shield', 'AlertCircle', 'Cookie'] as const;
    const colors = ['blue', 'peach', 'mint', 'lilac', 'rose'] as const;

    // Extraire le numéro de priorité du texte si présent
    const priorityMatch = recommendation.match(/^Priorité\s+(\d+)\s*:\s*/i);
    const title = priorityMatch ? `Priorité ${priorityMatch[1]}` : `Étape ${index + 1}`;
    const cleanRecommendation = recommendation.replace(/^Priorité\s+\d+\s*:\s*/i, '');

    return {
      title,
      icon: icons[index % icons.length],
      color: colors[index % colors.length],
      recommendations: [cleanRecommendation]
    };
  });

  // Extraire les risques juridiques des faiblesses majeures
  const findWeaknessContaining = (keywords: string[]) =>
    data.major_weaknesses.find(w => keywords.some(keyword => w.toLowerCase().includes(keyword.toLowerCase())));

  const legalRisks = {
    fine: {
      value: 'Risque élevé',
      description: findWeaknessContaining(['responsabilité', 'plafond', 'financier', 'engagement']) ||
                   data.major_weaknesses[0] ||
                   'Absence de limitation de responsabilité'
    },
    imprisonment: {
      value: 'Non-conformité',
      description: findWeaknessContaining(['RGPD', 'DPA', 'données', 'CNIL']) ||
                   data.major_weaknesses[1] ||
                   'Risques liés à la protection des données'
    },
    seoLoss: {
      value: data.level_label,
      description: findWeaknessContaining(['obligation', 'résultat', 'moyens']) ||
                   data.major_weaknesses[2] ||
                   data.verdict_phrase
    }
  };

  return {
    siteUrl: data.company_name || data.audit_page_url || 'Audit de contrat',
    auditDate: data.audit_date,
    legalRisks,
    categories: {
      mentionsLegales,
      cgv,
      donneesPersonnelles,
      psnc
    },
    roadmap
  };
}
