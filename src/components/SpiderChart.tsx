import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import type { AuditData, RiskLevel } from '../types/audit.types';

interface SpiderChartProps {
  categories: AuditData['categories'];
}

const getRiskBadgeClass = (risk: RiskLevel): string => {
  switch (risk) {
    case 'low':
      return 'badge-risk-low';
    case 'medium':
      return 'badge-risk-medium';
    case 'high':
      return 'badge-risk-high';
    default:
      return 'badge-risk-medium';
  }
};

const getRiskLabel = (risk: RiskLevel): string => {
  switch (risk) {
    case 'low':
      return 'Risque faible';
    case 'medium':
      return 'Risque modéré';
    case 'high':
      return 'Risque élevé';
    default:
      return 'Risque modéré';
  }
};

export function SpiderChart({ categories }: SpiderChartProps) {
  // Préparer les données pour le radar chart
  const chartData = [
    {
      category: 'Mentions légales',
      score: categories.mentionsLegales.score,
      fullMark: 5,
    },
    {
      category: 'CGV',
      score: categories.cgv.score,
      fullMark: 5,
    },
    {
      category: 'Données personnelles',
      score: categories.donneesPersonnelles.score,
      fullMark: 5,
    },
    {
      category: 'PSNC',
      score: categories.psnc.score,
      fullMark: 5,
    },
  ];

  const scoresList = [
    { name: 'Mentions légales', score: categories.mentionsLegales.score, risk: categories.mentionsLegales.risk },
    { name: 'CGV', score: categories.cgv.score, risk: categories.cgv.risk },
    { name: 'Données personnelles', score: categories.donneesPersonnelles.score, risk: categories.donneesPersonnelles.risk },
    { name: 'Allégations trompeuses', score: categories.psnc.score, risk: categories.psnc.risk },
  ];

  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 className="text-3xl font-bold text-center mb-8">
        Vue d'ensemble de votre conformité
      </h2>

      <div className="card-pastel p-8 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Spider Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="hsl(var(--border))" strokeWidth={1.5} />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(var(--pastel-mint-foreground))"
                  fill="hsl(var(--pastel-mint))"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Liste des scores */}
          <div className="space-y-4">
            {scoresList.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-background/50 p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground mb-1">{item.name}</p>
                  <span className={getRiskBadgeClass(item.risk)}>
                    {getRiskLabel(item.risk)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">
                    {item.score} <span className="text-sm text-muted-foreground">/ 5</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
