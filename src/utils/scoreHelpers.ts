/**
 * Fonctions utilitaires pour le calcul des scores et des couleurs
 */

export interface ScoreColorClasses {
  bg: string;
  fg: string;
  progress: string;
  emoji: string;
}

/**
 * Retourne les classes CSS et l'emoji selon le score (0-100)
 */
export function getScoreColorClasses(score: number): ScoreColorClasses {
  if (score <= 25) {
    return {
      bg: 'bg-risk-high',
      fg: 'text-risk-highForeground',
      progress: 'bg-risk-highForeground',
      emoji: '🔴',
    };
  }
  if (score <= 50) {
    return {
      bg: 'bg-risk-medium',
      fg: 'text-risk-mediumForeground',
      progress: 'bg-risk-mediumForeground',
      emoji: '🟠',
    };
  }
  if (score <= 75) {
    return {
      bg: 'bg-pastel-orange',
      fg: 'text-pastel-orangeForeground',
      progress: 'bg-pastel-orangeForeground',
      emoji: '🟡',
    };
  }
  return {
    bg: 'bg-risk-low',
    fg: 'text-risk-lowForeground',
    progress: 'bg-risk-lowForeground',
    emoji: '🟢',
  };
}

/**
 * Retourne les thématiques applicables selon les activités cochées
 */
export function getApplicableThematics(activities: string[]): Set<string> {
  const applicable = new Set<string>(['Clauses générales du contrat']); // Toujours applicable

  const activityLower = activities.map(a => a.toLowerCase());

  if (activityLower.some(a => a.includes('création') || a.includes('refonte'))) {
    applicable.add('Création / Refonte');
  }
  if (activityLower.some(a => a.includes('maintenance'))) {
    applicable.add('Maintenance');
  }
  if (activityLower.some(a => a.includes('hébergement'))) {
    applicable.add('Hébergement');
  }
  if (activityLower.some(a => a.includes('cm') || a.includes('community'))) {
    applicable.add('Community Management');
  }
  if (activityLower.some(a => a.includes('seo') || a.includes('référencement'))) {
    applicable.add('SEO');
  }
  if (activityLower.some(a => a.includes('sea') || a.includes('publicité'))) {
    applicable.add('SEA');
  }

  return applicable;
}

/**
 * Mapping nom thématique → clé dans l'object scores de Supabase
 */
export function getThematicScoreKey(thematic: string): keyof {
  clauses_generales: number | null;
  creation_refonte: number | null;
  maintenance: number | null;
  hebergement: number | null;
  community_management: number | null;
  seo: number | null;
  sea: number | null;
} | null {
  const mapping: Record<string, string> = {
    'Clauses générales du contrat': 'clauses_generales',
    'Création / Refonte': 'creation_refonte',
    'Maintenance': 'maintenance',
    'Hébergement': 'hebergement',
    'Community Management': 'community_management',
    'SEO': 'seo',
    'SEA': 'sea',
  };

  return (mapping[thematic] as any) || null;
}
