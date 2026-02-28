import { getScoreColorClasses } from '../../utils/scoreHelpers';

interface GlobalScoreSectionProps {
  score: number;
  level: string;
  verdict: string;
}

export function GlobalScoreSection({ score, level, verdict }: GlobalScoreSectionProps) {
  const colors = getScoreColorClasses(score);

  // Déterminer le style de fond et bordure selon le score
  const getBorderAndBgClasses = () => {
    if (score <= 25) {
      return 'border-2 border-risk-high/40 bg-risk-high/15';
    } else if (score <= 50) {
      return 'border-2 border-risk-medium/40 bg-risk-medium/15';
    } else if (score <= 75) {
      return 'border-2 border-pastel-orange/40 bg-pastel-orange/15';
    } else {
      return 'border-2 border-risk-low/40 bg-risk-low/15';
    }
  };

  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: '0s' }}>
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`card-pastel p-8 md:p-12 text-center ${getBorderAndBgClasses()}`}>
          {/* Score avec pastille */}
      <div className="flex flex-col items-center gap-6 mb-6">
        {/* Emoji pastille */}
        <div className={`${colors.bg} rounded-full w-20 h-20 flex items-center justify-center text-4xl`}>
          {colors.emoji}
        </div>

        {/* Score en grand */}
        <div className="flex items-baseline gap-2">
          <span className={`text-6xl md:text-7xl font-bold ${colors.fg}`}>
            {score}
          </span>
          <span className={`text-3xl md:text-4xl ${colors.fg}`}>%</span>
        </div>

        {/* Badge niveau */}
        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${colors.bg} ${colors.fg}`}>
          {level}
        </span>
      </div>

          {/* Phrase verdict */}
          <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl mx-auto">
            {verdict}
          </p>
        </div>
      </div>
    </section>
  );
}
