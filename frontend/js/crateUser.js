document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('inputUser1').value;
    const email = document.getElementById('inputUser2').value;
    const password = document.getElementById('inputPassword1').value;

    try {
        const response = await fetch('api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Utilisateur créé avec succès !');
            // Redirection possible après création
            window.location.href = 'login.html';
        } else {
            alert('Erreur : ' + data.message);
        }
    } catch (error) {
        alert('Erreur de connexion au serveur');
        console.error(error);
    }
});
