const nodemailer = require('nodemailer');

exports.sendMail = async (req, res) => {
    try {
        const { name, email, message, objet } = req.body;

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Adresse e-mail invalide' });
        }
        if (!isValidName(name)) {
            return res.status(400).json({ message: 'Le nom est invalide' });
        }
        if (!isValidMessage(message)) {
            return res.status(400).json({ message: 'Le message est trop long ou vide' });
        }
        if (!isValidObjet(objet)) {
            return res.status(400).json({ message: "L'objet est invalide" });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hugo.macdasil@gmail.com',
                pass: 'tpag dybp upgt qpti' // ⚠️ Ne pas laisser ce mot de passe dans un projet public ! Utiliser un .env en production 
            }
        });

        const mailOptions = {
            from: 'hugo.macdasil@gmail.com',
            to: email,
            subject: objet,
            text: `Bonjour ${name},\n\n${message}\n\nNous vous répondrons rapidement.\n\nCordialement,\nMoodBoard`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé :', info.response);
        return res.status(200).json({ message: 'E-mail envoyé avec succès ' });

    } catch (error) {
        console.error('Erreur lors de l’envoi du mail :', error);
        return res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail", error });
    }
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidName = (name) => name && name.trim() !== '';
const isValidMessage = (message) => message && message.length < 300;
const isValidObjet = (objet) => objet && objet.length < 100;
