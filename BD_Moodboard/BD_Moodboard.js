// Créer la base de données "BD_Moodboard"
use BD_Moodboard // Cette commande crée la base de données si elle n'existe pas déjà

// Créer les collections "utilisateurs" et "humeurs"
db.createCollection('utilisateurs') 
db.createCollection('humeurs')

// Vérifier que les collections ont bien été créées
show collections