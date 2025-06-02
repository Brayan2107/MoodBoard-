exports.getAllUserHummeur = (req, res) => {
    const mood = {
        hugo: [
          { date: '2025-05-13', mood: 3 },
          { date: '2025-05-14', mood: 4 },
          { date: '2025-05-15', mood: 5 },
          { date: '2025-05-16', mood: 4 },
          { date: '2025-05-17', mood: 3 },
          { date: '2025-05-18', mood: 2 },
          { date: '2025-05-19', mood: 3 },
        ],
        alice: [
          { date: '2025-05-13', mood: 2 },
          { date: '2025-05-14', mood: 3 },
          { date: '2025-05-15', mood: 3 },
          { date: '2025-05-16', mood: 4 },
          { date: '2025-05-17', mood: 3 },
          { date: '2025-05-18', mood: 4 },
          { date: '2025-05-19', mood: 5 },
        ],
        bob: [
          { date: '2025-05-13', mood: 4 },
          { date: '2025-05-14', mood: 4 },
          { date: '2025-05-15', mood: 3 },
          { date: '2025-05-16', mood: 2 },
          { date: '2025-05-17', mood: 2 },
          { date: '2025-05-18', mood: 3 },
          { date: '2025-05-19', mood: 4 },
        ],
        bob2: [
            { date: '2025-05-13', mood: 4 },
            { date: '2025-05-14', mood: 4 },
            { date: '2025-05-15', mood: 3 },
            { date: '2025-05-16', mood: 2 },
            { date: '2025-05-17', mood: 2 },
            { date: '2025-05-18', mood: 3 },
            { date: '2025-05-19', mood: 4 },
          ]
      };
res.send(mood);
};
const Humeur = require('../models/humeur');
exports.postHumeur = async (req, res) => {
  console.log("Données reçues dans la requête :", req.body);
  const { humeur } = req.body;

  if (!humeur || humeur == "") {
  return res.status(400).json({ error: "Aucune humeur reçue" });
  }

  try {
  const nouvelleHumeur = new Humeur({ humeur });
  await nouvelleHumeur.save();

  console.log("Humeur sauvegardée :", humeur);
  res.status(200).json({ message: "Humeur enregistrée avec succès" });
  } catch (error) {
  console.error("Erreur MongoDB :", error);
  res.status(500).json({ error: "Erreur serveur" });
  }
};