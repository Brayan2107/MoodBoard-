const Humeur = require('../models/humeur');
exports.getAllUserHummeur = async (req, res) => {
  try {
    const humeurs = await Humeur.find(); // ou `.find({ user: ... })` pour filtrer

    const result = {};

    humeurs.forEach(entry => {
      if (!result[entry.user]) {
        result[entry.user] = [];
      }

      result[entry.user].push({
        date: entry.date,
        mood: entry.mood
      });
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la récupération des humeurs :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};



exports.postHumeur = async (req, res) => {
  const { user, date, mood } = req.body;

  if (!user || !date || !mood) {
    return res.status(400).json({ error: "Données incomplètes" });
  }

  try {
    const nouvelleHumeur = new Humeur({ user, date, mood });
    await nouvelleHumeur.save();

    console.log("Humeur enregistrée :", nouvelleHumeur);
    res.status(200).json({ message: "Humeur enregistrée avec succès" });
  } catch (error) {
    console.error("Erreur MongoDB :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};