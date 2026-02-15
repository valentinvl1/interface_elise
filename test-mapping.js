import { createClient } from '@supabase/supabase-js';
import { mapSupabaseToAuditData } from './src/utils/mapSupabaseData.ts';
import { validateAuditData } from './src/utils/validateAuditData.ts';

const SUPABASE_URL = 'https://fgrpfrcifwdiwdhkqlys.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Rawj-KiyYtIMpWyt9t8p9Q_PO-EFE0m';

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function testMapping() {
  console.log('🔍 Test du mapping et de la validation...\n');

  try {
    const auditId = '2c477210-bc44-4aa0-8ed1-f97303a8ebaa';

    const { data: supabaseData, error } = await supabase
      .from('audits_web_contract')
      .select('*')
      .eq('id', auditId)
      .single();

    if (error) {
      console.error('❌ Erreur Supabase:', error);
      return;
    }

    console.log('✅ Données récupérées depuis Supabase\n');

    console.log('🔄 Mapping des données...');
    const mappedData = mapSupabaseToAuditData(supabaseData);
    console.log('✅ Données mappées:\n', JSON.stringify(mappedData, null, 2));

    console.log('\n✔️ Validation des données...');
    const isValid = validateAuditData(mappedData);

    if (isValid) {
      console.log('✅ Validation réussie !');
    } else {
      console.log('❌ Validation échouée');
    }
  } catch (err) {
    console.error('💥 Erreur:', err);
  }
}

testMapping();
