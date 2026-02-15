import { AlertCircle } from 'lucide-react';

interface ErrorScreenProps {
  message: string;
}

export function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card-pastel p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-risk-high flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-risk-highForeground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Erreur de chargement
        </h1>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {message}
        </p>
        <div className="bg-muted/50 rounded-2xl p-4 text-sm text-muted-foreground text-left">
          <p className="font-semibold mb-2">Que faire ?</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Vérifiez que vous utilisez le lien complet reçu par email</li>
            <li>Assurez-vous que l'URL n'a pas été tronquée</li>
            <li>Contactez le support si le problème persiste</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
