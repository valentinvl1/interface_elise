import { createClient } from '@supabase/supabase-js';

// Configuration Supabase depuis les variables d'environnement
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vérification que les variables d'environnement sont définies
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Les variables d\'environnement VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY doivent être définies. ' +
    'Veuillez créer un fichier .env à la racine du projet avec ces variables.'
  );
}

// Création du client Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
