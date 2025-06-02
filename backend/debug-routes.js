const express = require('express');
const app = express();
const path = require('path');

console.log('🔍 Test de chargement des routes...');

try {
  const mainRoutes = require('./routes/main'); // ne pas modifier cette ligne
  app.use('/', mainRoutes);
  console.log('✅ Toutes les routes ont été chargées sans erreur.');
} catch (err) {
  console.error('❌ Erreur dans le chargement des routes :');
  console.error(err.stack);
}
