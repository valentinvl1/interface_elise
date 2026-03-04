import { useAuditData } from '../hooks/useAuditData';
import { ErrorScreen } from '../components/ErrorScreen';
import { AuditPageHeader } from '../components/new-audit/AuditPageHeader';
import { GlobalScoreSection } from '../components/new-audit/GlobalScoreSection';
import { ThematicAnalysisSection } from '../components/new-audit/ThematicAnalysisSection';
import { MajorWeaknessesSection } from '../components/new-audit/MajorWeaknessesSection';
import { PriorityRecommendationsSection } from '../components/new-audit/PriorityRecommendationsSection';
import { CallToActionSection } from '../components/new-audit/CallToActionSection';
import { DocumentExtractSection } from '../components/new-audit/DocumentExtractSection';
import { AdminBadge } from '../components/AdminBadge';
import { AdminOnly } from '../components/AdminOnly';
import { useAdmin } from '../contexts/AdminContext';
import { Footer } from '../components/Footer';

export function AuditDetailPage() {
  const { supabaseData, error, loading } = useAuditData();
  const isAdminMode = useAdmin();

  // Afficher un écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg text-muted-foreground">Chargement de votre diagnostic...</p>
        </div>
      </div>
    );
  }

  // Si erreur ou pas de data, afficher l'écran d'erreur
  if (error || !supabaseData) {
    return <ErrorScreen message={error || "URL invalide"} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminBadge />
      <div className={`py-12 ${isAdminMode ? 'pt-20' : ''}`}>
        {/* En-tête de la page */}
        <AuditPageHeader
          companyName={supabaseData.company_name}
          auditDate={supabaseData.audit_date}
          usesAi={supabaseData.uses_ai}
          hasReferenceDocument={supabaseData.has_reference_document}
        />

        {/* Bloc 1 : Score global + verdict */}
        <GlobalScoreSection
          score={supabaseData.global_score_percent}
          level={supabaseData.level_label}
          verdict={supabaseData.verdict_phrase}
        />

        {/* Bloc 2 & 3 fusionnés : Analyse par thématique */}
        <ThematicAnalysisSection
          scores={supabaseData.scores}
          summaries={supabaseData.thematic_summary}
          detailedData={{
            general_constats: supabaseData.general_constats,
            general_recommendations: supabaseData.general_recommendations,
            creation_constats: supabaseData.creation_constats,
            creation_recommendations: supabaseData.creation_recommendations,
            maintenance_constats: supabaseData.maintenance_constats,
            maintenance_recommendations: supabaseData.maintenance_recommendations,
            hosting_constats: supabaseData.hosting_constats,
            hosting_recommendations: supabaseData.hosting_recommendations,
            cm_constats: supabaseData.cm_constats,
            cm_recommendations: supabaseData.cm_recommendations,
            seo_constats: supabaseData.seo_constats,
            seo_recommendations: supabaseData.seo_recommendations,
            sea_constats: supabaseData.sea_constats,
            sea_recommendations: supabaseData.sea_recommendations,
          }}
          sectionVisibility={{
            section_creation: supabaseData.section_creation,
            section_maintenance: supabaseData.section_maintenance,
            section_hebergement: supabaseData.section_hebergement,
            section_cm: supabaseData.section_cm,
            section_seo: supabaseData.section_seo,
            section_sea: supabaseData.section_sea,
          }}
        />

        {/* Bloc 4 : Faiblesses majeures (conditionnel) */}
        {supabaseData.major_weaknesses && supabaseData.major_weaknesses.length > 0 && (
          <MajorWeaknessesSection weaknesses={supabaseData.major_weaknesses} />
        )}

        {/* Bloc 5 : Recommandations prioritaires (conditionnel) */}
        {supabaseData.priority_recommendations && supabaseData.priority_recommendations.length > 0 && (
          <PriorityRecommendationsSection recommendations={supabaseData.priority_recommendations} />
        )}

        {/* Bloc 6 : Call to action - masqué en mode admin */}
        {!isAdminMode && <CallToActionSection />}

        {/* Section Document extrait - visible uniquement en mode admin */}
        <AdminOnly>
          <DocumentExtractSection documentExtract={supabaseData.document_extractandanonymous} />
        </AdminOnly>
      </div>

      {/* Footer avec mentions légales et politique de confidentialité */}
      <Footer />
    </div>
  );
}
