import type { AuditData, RiskLevel, IconType, ColorType } from '../types/audit.types';

const VALID_RISKS: RiskLevel[] = ['low', 'medium', 'high'];
const VALID_ICONS: IconType[] = ['FileText', 'ShoppingCart', 'Shield', 'AlertCircle', 'Cookie'];
const VALID_COLORS: ColorType[] = ['blue', 'peach', 'mint', 'lilac', 'rose', 'orange'];

export function validateAuditData(data: any): data is AuditData {
  const errors: string[] = [];

  // Vérifier que data est un objet
  if (!data || typeof data !== 'object') {
    errors.push('Les données doivent être un objet');
    console.error('❌ Validation échouée:', errors);
    return false;
  }

  // Vérifier siteUrl
  if (typeof data.siteUrl !== 'string' || data.siteUrl.trim() === '') {
    errors.push('siteUrl doit être une chaîne non vide');
  }

  // Vérifier auditDate
  if (typeof data.auditDate !== 'string' || data.auditDate.trim() === '') {
    errors.push('auditDate doit être une chaîne non vide');
  } else {
    // Vérifier le format de date ISO
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(data.auditDate)) {
      errors.push('auditDate doit être au format YYYY-MM-DD');
    }
  }

  // Vérifier legalRisks
  if (!data.legalRisks || typeof data.legalRisks !== 'object') {
    errors.push('legalRisks doit être un objet');
  } else {
    const riskTypes = ['fine', 'imprisonment', 'seoLoss'];

    for (const riskType of riskTypes) {
      if (!data.legalRisks[riskType]) {
        errors.push(`legalRisks.${riskType} est manquant`);
        continue;
      }

      const risk = data.legalRisks[riskType];

      if (typeof risk.value !== 'string' || risk.value.trim() === '') {
        errors.push(`legalRisks.${riskType}.value doit être une chaîne non vide`);
      }

      if (typeof risk.description !== 'string' || risk.description.trim() === '') {
        errors.push(`legalRisks.${riskType}.description doit être une chaîne non vide`);
      }
    }
  }

  // Vérifier categories
  if (!data.categories || typeof data.categories !== 'object') {
    errors.push('categories doit être un objet');
  } else {
    const requiredCategories = ['mentionsLegales', 'cgv', 'donneesPersonnelles', 'psnc'];

    for (const category of requiredCategories) {
      if (!data.categories[category]) {
        errors.push(`Catégorie ${category} manquante`);
        continue;
      }

      const cat = data.categories[category];

      // Vérifier score
      if (typeof cat.score !== 'number' || cat.score < 0 || cat.score > 5) {
        errors.push(`${category}.score doit être un nombre entre 0 et 5`);
      }

      // Vérifier risk
      if (!VALID_RISKS.includes(cat.risk)) {
        errors.push(`${category}.risk doit être 'low', 'medium' ou 'high'`);
      }

      // Vérifier description
      if (typeof cat.description !== 'string' || cat.description.trim() === '') {
        errors.push(`${category}.description doit être une chaîne non vide`);
      }

      // Vérifier details
      if (!cat.details || typeof cat.details !== 'object') {
        errors.push(`${category}.details doit être un objet`);
      } else {
        // Vérifier constats
        if (!Array.isArray(cat.details.constats)) {
          errors.push(`${category}.details.constats doit être un tableau`);
        } else if (cat.details.constats.length === 0) {
          errors.push(`${category}.details.constats ne peut pas être vide`);
        } else {
          cat.details.constats.forEach((constat: any, idx: number) => {
            if (typeof constat !== 'string' || constat.trim() === '') {
              errors.push(`${category}.details.constats[${idx}] doit être une chaîne non vide`);
            }
          });
        }

        // Vérifier explanation
        if (typeof cat.details.explanation !== 'string' || cat.details.explanation.trim() === '') {
          errors.push(`${category}.details.explanation doit être une chaîne non vide`);
        }
      }
    }
  }

  // Vérifier roadmap
  if (!Array.isArray(data.roadmap)) {
    errors.push('roadmap doit être un tableau');
  } else {
    if (data.roadmap.length === 0) {
      errors.push('roadmap ne peut pas être vide');
    }

    data.roadmap.forEach((step: any, index: number) => {
      if (typeof step.title !== 'string' || step.title.trim() === '') {
        errors.push(`roadmap[${index}].title doit être une chaîne non vide`);
      }

      if (!VALID_ICONS.includes(step.icon)) {
        errors.push(`roadmap[${index}].icon doit être un des: ${VALID_ICONS.join(', ')}`);
      }

      if (!VALID_COLORS.includes(step.color)) {
        errors.push(`roadmap[${index}].color doit être un des: ${VALID_COLORS.join(', ')}`);
      }

      // Vérifier recommendations
      if (!Array.isArray(step.recommendations)) {
        errors.push(`roadmap[${index}].recommendations doit être un tableau`);
      } else if (step.recommendations.length === 0) {
        errors.push(`roadmap[${index}].recommendations ne peut pas être vide`);
      } else {
        step.recommendations.forEach((rec: any, recIdx: number) => {
          if (typeof rec !== 'string' || rec.trim() === '') {
            errors.push(`roadmap[${index}].recommendations[${recIdx}] doit être une chaîne non vide`);
          }
        });
      }
    });
  }

  // Afficher les erreurs en console pour debug
  if (errors.length > 0) {
    console.error('❌ Validation échouée:');
    errors.forEach(err => console.error(`  - ${err}`));
    return false;
  }

  console.log('✅ Validation des données réussie');
  return true;
}
