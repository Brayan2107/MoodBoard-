# 🧠 MoodBoard+

## 📝 Contexte

Dans un environnement de travail, il est essentiel de rester à l’écoute de l’équipe.  
**MoodBoard+** est une application qui permet à chaque membre d’exprimer son humeur du jour — stressé, détendu, en colère, joyeux — de manière simple, rapide et éventuellement anonyme.

## 🎯 Objectif

Offrir une plateforme intuitive pour :
- Partager son humeur quotidienne en un clic (via un emoji ou une couleur)
- Suivre l’ambiance générale de l’équipe grâce à un affichage global
- Visualiser l’historique des émotions (hebdomadaire)
- Protéger la vie privée de chacun via l’option d’anonymat

---

## 🚀 Fonctionnalités principales

- ✅ Sélection d’une humeur via emoji ou couleur
- ✅ Ajout facultatif de commentaire
- ✅ Affichage synthétique pour l’équipe (graphiques, résumé)
- ✅ Historique des humeurs par jour/semaine
- ✅ Paramètre d’anonymat activable
- ✅ Notification après envoi de l’humeur
- ✅ Rappel automatique si l’humeur du jour n’a pas été postée

---

## 👥 Rôles de l’équipe

| Membre          | Rôle                                     |
|-----------------|------------------------------------------|
| Alice           | Développement back-end & sécurité        |
| Bob             | Développement front-end & UX             |
| Charlie         | Base de données & gestion des modèles    |

---

## 🧱 Stack technique

- **Node.js** avec **Express.js** (API)
- **MongoDB** avec **Mongoose** (base de données)
- **JWT** & **bcrypt** (authentification sécurisée)
- **Frontend** : HTML/CSS/JS ou React (à définir)
- **GitHub + Jira** pour le suivi de projet

---



## 📌 Consignes de développement

- Une **branche par fonctionnalité** (`feature/login`, `feature/mood-history`, etc.)
- Les noms de commits doivent inclure une référence Jira (ex: `MOOD-12 - Ajout du modèle User`)
- Toute **Pull Request** doit être relue et validée par un autre membre
- Utiliser `.env` pour stocker les variables sensibles
- Respecter la structure du projet (`src/`, `models/`, `routes/`, etc.)

---

## 📎 Liens utiles

- 📌 [Tableau Jira – MoodBoard+](https://eliottmaillard2509.atlassian.net/jira/software/projects/SCRUM/list).

---

## 💡 Remarques

- Les emojis doivent être cliquables et accessibles
- Le design doit être épuré, clair et mobile-friendly
---

## 📝 Marche à suivre pour utiliser ton projet

### ✅ Prérequis
Avant de commencer, la personne doit avoir :
- [Node.js installé](https://nodejs.org/) (inclut npm)

### ✅ 1. Télécharger / cloner le projet

Si le projet est sur GitHub :
```bash
git clone <url-du-repo>
```

Sinon :  
- Télécharger le ZIP  
- Extraire dans un dossier, par exemple : `moodboard/`

### ✅ 2. Ouvrir un terminal dans le dossier principal du projet

```bash
cd moodboard
```

### ✅ 3. Installer les dépendances du projet principal (devDependencies comme concurrently)

```bash
npm install
```

### ✅ 4. Installer les dépendances du backend (express, etc.)

```bash
cd backend
npm install
```
> Très important : le backend a son propre `package.json`, donc il faut aussi faire `npm install` dedans.

### ✅ 5. Revenir au dossier principal

```bash
cd ..
```

### ✅ 6. Lancer le projet

```bash
npm start
```

### ✅ 7. Accéder au projet dans le navigateur

- Ouvrir : [http://localhost:3000](http://localhost:3000) → Page d’accueil (`index.html`)
- Tester une route backend : [http://localhost:3000/hello](http://localhost:3000/hello)

---

## 🔥 Résumé des commandes à exécuter

```bash
cd moodboard
npm install
cd backend
npm install
cd ..
npm start
```

---
## 🛠️ Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-org/moodboard-plus.git

# 2. Se placer dans le projet
cd moodboard-plus

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur
npm start
```

> ⚠️ Assurez-vous d'avoir MongoDB installé localement ou accessible à distance.

---

## 📝 Ce que la personne doit installer

- Node.js (inclut npm)  
*C’est tout ! Le reste (express, concurrently...) sera installé automatiquement avec `npm install`.*
