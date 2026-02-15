#!/usr/bin/env node

/**
 * Script helper pour encoder/décoder les données d'audit en base64
 *
 * Usage:
 *   Encoder: node scripts/encode-decode-helper.js encode examples/audit-data-example.json
 *   Décoder: node scripts/encode-decode-helper.js decode "?data=eyJzaXRl..."
 */

const fs = require('fs');

const command = process.argv[2];
const input = process.argv[3];

if (!command || !input) {
  console.log('❌ Usage:');
  console.log('  Encoder: node scripts/encode-decode-helper.js encode <fichier.json>');
  console.log('  Décoder: node scripts/encode-decode-helper.js decode "<url-avec-param-data>"');
  process.exit(1);
}

if (command === 'encode') {
  try {
    // Lire le fichier JSON
    const json = fs.readFileSync(input, 'utf8');

    // Parser pour vérifier la validité (et supprimer les commentaires)
    const parsed = JSON.parse(json);

    // Supprimer les propriétés de commentaire
    const cleanData = JSON.parse(JSON.stringify(parsed, (key, value) => {
      return key.startsWith('_comment') ? undefined : value;
    }));

    // Re-stringifier sans commentaires
    const cleanJson = JSON.stringify(cleanData);

    // Encoder en base64 avec UTF-8 explicite
    const base64 = Buffer.from(cleanJson, 'utf8').toString('base64');

    console.log('\n✅ Encodage réussi!\n');
    console.log('📋 URL locale pour développement:');
    console.log(`http://localhost:5173/?data=${base64}\n`);
    console.log('📋 Paramètre pour N8N:');
    console.log(`data=${base64}\n`);
    console.log('📏 Longueur de l\'URL:', `http://localhost:5173/?data=${base64}`.length, 'caractères\n');
  } catch (error) {
    console.error('❌ Erreur lors de l\'encodage:', error.message);
    process.exit(1);
  }
} else if (command === 'decode') {
  try {
    // Extraire le paramètre data de l'URL
    const match = input.match(/data=([^&]+)/);

    if (!match) {
      console.error('❌ Paramètre "data" non trouvé dans l\'URL');
      process.exit(1);
    }

    // Décoder le base64
    const decoded = Buffer.from(match[1], 'base64').toString('utf8');

    // Parser le JSON
    const parsed = JSON.parse(decoded);

    console.log('\n✅ Décodage réussi!\n');
    console.log(JSON.stringify(parsed, null, 2));
    console.log('');
  } catch (error) {
    console.error('❌ Erreur lors du décodage:', error.message);
    process.exit(1);
  }
} else {
  console.error('❌ Commande inconnue. Utilisez "encode" ou "decode"');
  process.exit(1);
}
