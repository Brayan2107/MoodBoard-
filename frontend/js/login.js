document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('inputUser1').value;
    const password = document.getElementById('inputPassword1').value;

    try {
        const response = await fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Connexion réussie !');
            // Redirection vers la page d'accueil ou dashboard
            window.location.href = 'index.html';
        } else {
            alert('Erreur : ' + data.message);
        }
    } catch (error) {
        alert('Erreur de connexion au serveur');
        console.error(error);
    }
});
