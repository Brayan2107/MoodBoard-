const Humeur = require('../models/Humeur');

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
