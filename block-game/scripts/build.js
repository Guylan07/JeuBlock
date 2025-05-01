const fs = require('fs');
const path = require('path');

// Créer le dossier scripts s'il n'existe pas
const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// S'assurer que le dossier public existe
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Création du fichier _redirects s'il n'existe pas
const redirectsPath = path.join(publicDir, '_redirects');
if (!fs.existsSync(redirectsPath)) {
  fs.writeFileSync(redirectsPath, '/* /index.html 200');
  console.log('Fichier _redirects créé');
}

console.log('Script de préparation pour Vercel exécuté avec succès');