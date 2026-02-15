import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fgrpfrcifwdiwdhkqlys.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Rawj-KiyYtIMpWyt9t8p9Q_PO-EFE0m';

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function testConnection() {
  console.log('🔍 Test de connexion à Supabase...');
  console.log('URL:', SUPABASE_URL);
  console.log('Clé API:', SUPABASE_PUBLISHABLE_KEY.substring(0, 20) + '...');

  try {
    const auditId = '2c477210-bc44-4aa0-8ed1-f97303a8ebaa';
    console.log('\n📡 Récupération de l\'audit avec ID:', auditId);

    const { data, error } = await supabase
      .from('audits_web_contract')
      .select('*')
      .eq('id', auditId)
      .single();

    if (error) {
      console.error('❌ Erreur Supabase:', error);
      console.error('Code:', error.code);
      console.error('Message:', error.message);
      console.error('Details:', error.details);
      console.error('Hint:', error.hint);
    } else {
      console.log('✅ Données récupérées avec succès !');
      console.log('📦 Données:', JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('💥 Erreur catch:', err);
  }
}

testConnection();
