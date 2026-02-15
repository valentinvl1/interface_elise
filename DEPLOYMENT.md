# Guide de déploiement sur Railway

Ce guide vous explique comment déployer l'application d'audit juridique NumElise sur Railway.

## Prérequis

- Un compte [Railway](https://railway.app/)
- Un projet Supabase avec :
  - L'URL du projet
  - La clé publique (anon key)
- Le code source du projet sur GitHub (recommandé) ou en local

## Étape 1 : Installation des dépendances (en local)

```bash
npm install
```

## Étape 2 : Configuration des variables d'environnement en local

1. Copiez le fichier `.env.example` en `.env` :
   ```bash
   cp .env.example .env
   ```

2. Éditez le fichier `.env` et remplissez les valeurs :
   ```env
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre_cle_publique_ici
   ```

3. Testez en local :
   ```bash
   npm run dev
   ```

## Étape 3 : Déploiement sur Railway

### Option A : Déploiement depuis GitHub (Recommandé)

1. **Poussez votre code sur GitHub** (si ce n'est pas déjà fait) :
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

2. **Créez un nouveau projet sur Railway** :
   - Allez sur [railway.app](https://railway.app/)
   - Cliquez sur "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Autorisez Railway à accéder à votre dépôt GitHub
   - Sélectionnez le dépôt de ce projet

3. **Railway détectera automatiquement** :
   - Node.js comme environnement
   - Le fichier `nixpacks.toml` pour la configuration
   - Les commandes de build et de start

### Option B : Déploiement en ligne de commande

1. **Installez le CLI Railway** :
   ```bash
   npm install -g @railway/cli
   ```

2. **Authentifiez-vous** :
   ```bash
   railway login
   ```

3. **Initialisez le projet** :
   ```bash
   railway init
   ```

4. **Déployez** :
   ```bash
   railway up
   ```

## Étape 4 : Configuration des variables d'environnement sur Railway

**IMPORTANT** : Les variables d'environnement doivent être configurées sur Railway pour des raisons de sécurité. Ne jamais les commiter dans le code.

1. Dans le dashboard Railway de votre projet, allez dans l'onglet **"Variables"**

2. Ajoutez les variables suivantes :

   | Nom de la variable | Valeur |
   |-------------------|--------|
   | `VITE_SUPABASE_URL` | `https://votre-projet.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `votre_cle_publique_supabase` |

3. Railway redéploiera automatiquement l'application avec les nouvelles variables

## Étape 5 : Vérification du déploiement

1. Railway vous fournira une URL de production (ex: `https://votre-app.up.railway.app`)

2. Testez les URLs suivantes :
   - **Page d'audit** : `https://votre-app.up.railway.app/?id=ID_AUDIT`
   - **Page admin (liste)** : `https://votre-app.up.railway.app/?page=all`
   - **Mode admin** : `https://votre-app.up.railway.app/?id=ID_AUDIT&admin=true`

## Étape 6 : Configuration d'un domaine personnalisé (Optionnel)

1. Dans le dashboard Railway, allez dans l'onglet **"Settings"**
2. Section **"Domains"**
3. Cliquez sur **"Generate Domain"** pour un sous-domaine Railway gratuit
4. Ou ajoutez votre propre domaine personnalisé

## Structure des fichiers de déploiement

- **`.env.example`** : Template des variables d'environnement
- **`.env`** : Variables d'environnement locales (ignoré par git)
- **`nixpacks.toml`** : Configuration Railway pour le build et le démarrage
- **`package.json`** : Inclut le script `start` pour la production

## Commandes utiles

### Développement local
```bash
npm run dev        # Lancer le serveur de développement
npm run build      # Compiler le projet
npm run preview    # Prévisualiser le build de production
```

### Production (Railway)
```bash
npm run build      # Build automatique par Railway
npm run start      # Démarrage automatique par Railway
```

## Dépannage

### Erreur : "Les variables d'environnement doivent être définies"
- Vérifiez que vous avez bien ajouté `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans les variables Railway

### Le build échoue
- Vérifiez les logs dans Railway
- Assurez-vous que `package.json` est à jour
- Vérifiez que toutes les dépendances sont installées

### L'application ne démarre pas
- Vérifiez que le port est bien configuré avec la variable `$PORT` (géré automatiquement par Railway)
- Consultez les logs dans le dashboard Railway

## Sécurité

⚠️ **IMPORTANT** :
- Ne jamais commiter le fichier `.env` dans git
- Ne jamais exposer vos clés Supabase dans le code
- Toujours utiliser les variables d'environnement Railway pour les secrets
- La clé `VITE_SUPABASE_ANON_KEY` est une clé publique, elle sera visible dans le code compilé (c'est normal pour Supabase)

## Support

Pour toute question sur le déploiement, consultez :
- [Documentation Railway](https://docs.railway.app/)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Vite](https://vitejs.dev/guide/)
