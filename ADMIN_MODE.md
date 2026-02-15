# Mode Admin - Documentation

## Activation du mode admin

Pour activer le mode admin, ajoutez le paramètre `admin=true` à l'URL de la page :

```
https://votre-site.com?admin=true
```

Ou si vous avez déjà d'autres paramètres :

```
https://votre-site.com?id=123&admin=true
```

## Utilisation dans les composants

### Méthode 1 : Utiliser le composant `<AdminOnly>`

La façon la plus simple d'afficher du contenu uniquement en mode admin est d'utiliser le composant `<AdminOnly>` :

```tsx
import { AdminOnly } from './components/AdminOnly';

function MyComponent() {
  return (
    <div>
      <h1>Contenu visible par tous</h1>

      <AdminOnly>
        <div className="bg-yellow-100 p-4 rounded">
          <h2>Section visible uniquement en mode admin</h2>
          <p>Ce contenu n'apparaît que si admin=true dans l'URL</p>
        </div>
      </AdminOnly>
    </div>
  );
}
```

### Méthode 2 : Utiliser le hook `useAdmin()`

Pour un contrôle plus fin, vous pouvez utiliser directement le hook :

```tsx
import { useAdmin } from '../contexts/AdminContext';

function MyComponent() {
  const isAdminMode = useAdmin();

  return (
    <div>
      <h1>Contenu visible par tous</h1>

      {isAdminMode && (
        <div className="bg-yellow-100 p-4 rounded">
          <h2>Section visible uniquement en mode admin</h2>
          <p>Ce contenu n'apparaît que si admin=true dans l'URL</p>
        </div>
      )}

      {/* Ou pour modifier le comportement d'un composant */}
      <button className={isAdminMode ? 'bg-blue-600' : 'bg-gray-600'}>
        {isAdminMode ? 'Mode Admin Actif' : 'Mode Normal'}
      </button>
    </div>
  );
}
```

## Indicateur visuel

Un badge "Mode Admin" s'affiche automatiquement en haut à droite de la page quand le mode admin est activé. Cela permet de confirmer visuellement que le mode admin fonctionne.

## Exemples d'utilisation

### Ajouter une section cachée dans App.tsx

```tsx
import { AdminOnly } from './components/AdminOnly';

function App() {
  return (
    <div>
      {/* Contenu normal visible par tous */}
      <GlobalScoreSection />

      {/* Section visible uniquement en mode admin */}
      <AdminOnly>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Statistiques détaillées (Admin)</h2>
          <p>Informations techniques ou statistiques réservées aux administrateurs</p>
        </div>
      </AdminOnly>

      {/* Suite du contenu normal */}
      <ThematicAnalysisSection />
    </div>
  );
}
```

## Architecture technique

Le système de mode admin repose sur :

1. **Hook `useAdminMode`** (`src/hooks/useAdminMode.ts`) : Détecte le paramètre URL `admin=true`
2. **Context `AdminContext`** (`src/contexts/AdminContext.tsx`) : Partage l'état admin dans toute l'application
3. **Composant `AdminOnly`** (`src/components/AdminOnly.tsx`) : Wrapper pour afficher du contenu conditionnel
4. **Composant `AdminBadge`** (`src/components/AdminBadge.tsx`) : Indicateur visuel du mode admin

L'`AdminProvider` est intégré dans `src/main.tsx` et entoure toute l'application.
