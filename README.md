# 📋 Audit Juridique NumElise

Une application web one-page moderne pour afficher les résultats d'audits juridiques automatisés de sites internet. Design "legal design" avec une interface douce, pastel et rassurante.

## 🎨 Aperçu

Cette application affiche de manière visuelle et interactive les résultats d'un audit juridique comprenant:
- Vue d'ensemble avec spider chart
- Analyse détaillée par catégorie (Mentions légales, CGV, RGPD, PSNC)
- Avertissements sur les risques juridiques
- Roadmap de mise en conformité personnalisée
- Section d'offres commerciales

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ installé
- Un gestionnaire de paquets (npm, yarn, pnpm ou bun)

### Installation

```bash
# Cloner le projet (ou se placer dans le dossier)
cd numelise_check

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`

## 📦 Stack technique

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS avec système de design personnalisé
- **Charts**: Recharts pour le spider chart
- **Icons**: Lucide React
- **Police**: Inter (Google Fonts)

## 🔧 Structure des données

### Format JSON

Les données d'audit sont passées via le query parameter `data` encodé en base64. Voici la structure attendue:

```typescript
interface AuditData {
  siteUrl: string;           // "www.example.com"
  auditDate: string;         // "2025-11-30" (ISO 8601)
  categories: {
    mentionsLegales: CategoryData;
    cgv: CategoryData;
    donneesPersonnelles: CategoryData;
    psnc: CategoryData;
  };
  roadmap: RoadmapStep[];
}

interface CategoryData {
  score: number;             // 0-5
  risk: 'low' | 'medium' | 'high';
  description: string;
}

interface RoadmapStep {
  title: string;
  icon: 'FileText' | 'ShoppingCart' | 'Shield' | 'AlertCircle' | 'Cookie';
  color: 'blue' | 'peach' | 'mint' | 'lilac' | 'rose' | 'orange';
}
```

### Exemple complet

Voir le fichier `examples/audit-data-example.json` pour un exemple annoté avec tous les champs.

## 🛠️ Utilisation du script helper

### Encoder un JSON en URL

```bash
node scripts/encode-decode-helper.js encode examples/audit-data-example.json
```

Sortie:
```
✅ Encodage réussi!

📋 URL locale pour développement:
http://localhost:5173/?data=eyJzaXRlVXJsIjoid3d3LmV4YW1wbGUuY29tIi...

📋 Paramètre pour N8N:
data=eyJzaXRlVXJsIjoid3d3LmV4YW1wbGUuY29tIi...
```

### Décoder une URL

```bash
node scripts/encode-decode-helper.js decode "?data=eyJzaXRlVXJsIjoid3d3LmV4YW1wbGUuY29tIi..."
```

Sortie: le JSON décodé formaté

## 🔗 Intégration N8N

### Workflow N8N

1. **Analyser le site** avec vos outils d'audit
2. **Construire l'objet JSON** selon la structure ci-dessus
3. **Encoder en base64** le JSON:
   ```javascript
   // Dans N8N (node Code)
   const jsonData = JSON.stringify({
     siteUrl: "www.example.com",
     auditDate: "2025-11-30",
     categories: { /* ... */ },
     roadmap: [ /* ... */ ]
   });

   const base64Data = Buffer.from(jsonData).toString('base64');
   return { data: base64Data };
   ```
4. **Générer l'URL finale**:
   ```
   https://votre-app.vercel.app/?data={{$node["Code"].json["data"]}}
   ```
5. **Envoyer l'URL au client** par email

### Validation des données

L'application effectue une validation stricte des données:
- Tous les champs requis doivent être présents
- Les scores doivent être entre 0 et 5
- Les niveaux de risque: `low`, `medium` ou `high`
- Les icônes et couleurs doivent correspondre aux valeurs autorisées

En cas de données invalides, un message d'erreur clair est affiché à l'utilisateur.

## 📐 Design System

### Couleurs pastel

- **Blue** (`--pastel-blue`): Mentions légales, header
- **Peach** (`--pastel-peach`): CGV
- **Mint** (`--pastel-mint`): RGPD, succès
- **Lilac** (`--pastel-lilac`): PSNC
- **Rose** (`--pastel-rose`): Roadmap cookies
- **Orange** (`--pastel-orange`): Offre premium

### Niveaux de risque

- **Low** (`--risk-low`): Vert pastel
- **Medium** (`--risk-medium`): Orange pastel
- **High** (`--risk-high`): Rouge pastel

### Classes utilitaires personnalisées

- `.card-pastel`: Card avec glassmorphism
- `.badge-risk-{level}`: Badges de risque
- `.progress-bar`: Barre de progression arrondie
- `.shadow-soft`: Ombre douce
- `.hover-scale`: Effet hover scale
- `.animate-fade-in`: Animation d'entrée

## 🚀 Déploiement sur Vercel

### Via Git

1. Pusher le code sur GitHub/GitLab/Bitbucket
2. Connecter le repository sur Vercel
3. Vercel détectera automatiquement Vite et déploiera

### Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Déployer en production
vercel --prod
```

### Configuration

Aucune configuration spéciale n'est requise. Vercel détecte automatiquement:
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## 📱 Responsive Design

L'application est entièrement responsive:
- **Mobile** (< 768px): Layout en colonne
- **Tablet** (768px - 1024px): Grid 2 colonnes pour les cards
- **Desktop** (> 1024px): Layout complet

## 🧪 Tests

### Test manuel avec exemple

1. Lancer le dev server: `npm run dev`
2. Générer une URL de test:
   ```bash
   node scripts/encode-decode-helper.js encode examples/audit-data-example.json
   ```
3. Copier l'URL générée et l'ouvrir dans le navigateur
4. Vérifier que tous les composants s'affichent correctement

### Test d'erreur

Ouvrir `http://localhost:5173` sans paramètre `data` pour voir l'écran d'erreur.

## 📂 Structure du projet

```
numelise_check/
├── examples/
│   └── audit-data-example.json    # Exemple de données avec commentaires
├── scripts/
│   └── encode-decode-helper.js    # Script d'encodage/décodage
├── src/
│   ├── components/                # Composants React
│   │   ├── AuditHeader.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── ErrorScreen.tsx
│   │   ├── LegalDisclaimer.tsx
│   │   ├── OfferCard.tsx
│   │   ├── OffersSection.tsx
│   │   ├── Roadmap.tsx
│   │   ├── RiskWarning.tsx
│   │   └── SpiderChart.tsx
│   ├── hooks/
│   │   └── useAuditData.ts       # Hook de parsing des données
│   ├── types/
│   │   └── audit.types.ts        # Types TypeScript
│   ├── utils/
│   │   ├── parseAuditData.ts     # Parser query param
│   │   └── validateAuditData.ts  # Validation stricte
│   ├── App.tsx                    # Composant principal
│   ├── index.css                  # Design system
│   └── main.tsx                   # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🔐 Sécurité et limitations

### Limitations d'URL

- Longueur maximale d'URL: ~2000 caractères (support navigateur)
- Les URLs générées font généralement 1500-2000 caractères
- Compatible avec tous les navigateurs modernes

### Sécurité

⚠️ **Important**: L'encodage base64 **n'est pas du chiffrement**!
- Ne jamais passer de données sensibles (emails, mots de passe, infos bancaires)
- Les données sont visibles en clair dans l'URL une fois décodées
- OK pour des informations publiques (scores d'audit, descriptions)

### SEO

- Page non indexable par les moteurs de recherche (contenu dynamique via JS)
- Parfait pour usage via liens directs/emails
- Si SEO nécessaire, envisager une solution avec backend

## 🆘 Support

### Problèmes courants

**URL trop longue**
- Réduire la longueur des descriptions
- Limiter le nombre d'étapes de roadmap
- Considérer une solution avec backend + short links

**Validation échouée**
- Vérifier les types de données (nombres, strings)
- Vérifier les enums (risk, icon, color)
- Utiliser le script de décodage pour inspecter les données

**Erreur de build**
- Nettoyer: `rm -rf node_modules dist && npm install`
- Vérifier la version de Node.js (>= 18)

## 📄 Licence

Propriétaire - NumElise

---

**Développé avec ❤️ pour NumElise**
