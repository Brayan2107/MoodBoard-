const nodemailer = require('nodemailer');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidName = (name) => name && name.trim() !== '';
const isValidMessage = (message) => message && message.length < 300;
const isValidObjet = (objet) => objet && objet.length < 100;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hugo.macdasil@gmail.com',
        pass: 'tpag dybp upgt qpti' // ⚠️ À déplacer dans .env plus tard
    }
});

async function envoyerMailSimple(name, email, message, objet) {
    try {
        if (!isValidEmail(email)) return false;
        if (!isValidName(name)) return false;
        if (!isValidMessage(message)) return false;
        if (!isValidObjet(objet)) return false;
        const mailOptions = {
            from: 'hugo.macdasil@gmail.com',
            to: email,
            subject: objet,
            text: `Bonjour ${name},\n\n${message}\n\nCordialement,\nMoodBoard`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Mail envoyé à ${email} : ${info.response}`);
        return true;
    } catch (error) {
        console.error(`❌ Échec de l’envoi à ${email} :`, error);
        return false;
    }
}


exports.sendMail = async (req, res) => {
    try {
        const { name, email, message, objet } = req.body;

        if (!isValidEmail(email)) return res.status(400).json({ message: 'Adresse e-mail invalide' });
        if (!isValidName(name)) return res.status(400).json({ message: 'Le nom est invalide' });
        if (!isValidMessage(message)) return res.status(400).json({ message: 'Le message est trop long ou vide' });
        if (!isValidObjet(objet)) return res.status(400).json({ message: "L'objet est invalide" });

        const success = await envoyerMailSimple(name, email, message, objet);
        if (success) {
            return res.status(200).json({ message: 'E-mail envoyé avec succès ✅' });
        } else {
            return res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail ❌" });
        }

    } catch (error) {
        console.error('❌ Erreur interne :', error);
        return res.status(500).json({ message: "Erreur serveur", error });
    }
};

exports.sendRappelleEmail = async (req, res) => {
    const utilisateurs = [
        { nom: 'Juan', email: 'guzmanfjd@s2.rpn.ch' },
        { nom: 'Brayan', email: 'Brayan.deAraujoMota@rpn.ch' },
        { nom: 'Eliott', email: 'Eliott.Maillard@rpn.ch' }
    ];

    const objet = "📝 Petit rappel humeur du jour";
    const message = `C’est l’heure de faire un petit point sur ton humeur ! 😊

Prends 30 secondes pour noter comment tu te sens aujourd’hui dans l’application MoodBoard.

Cela t’aidera à mieux te connaître et à suivre ton bien-être.`;

    let total = utilisateurs.length;
    let réussis = 0;
    let échoués = 0;

    for (const user of utilisateurs) {
        const success = await envoyerMailSimple(user.nom, user.email, message, objet);
        if (success) {
            réussis++;
        } else {
            échoués++;
        }
    }

    if (échoués === 0) {
        return res.status(200).json({ message: `✅ Tous les ${total} mails ont été envoyés avec succès.` });
    } else if (réussis === 0) {
        return res.status(500).json({ message: `❌ Aucun mail n'a pu être envoyé.` });
    } else {
        return res.status(207).json({ message: `⚠️ ${réussis} mail(s) envoyés, ${échoués} échoué(s).` });
    }
};

