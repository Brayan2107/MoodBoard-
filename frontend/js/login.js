document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('inputUser1').value;
  const password = document.getElementById('inputPassword1').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Connexion réussie !');
      window.location.href = 'index.html';
      sessionStorage.setItem('userId', data.user._id);
      sessionStorage.setItem('username', data.user.name);
    } else {
      alert('Erreur : ' + data.message);
    }
  } catch (error) {
    alert('Erreur de connexion au serveur');
    console.error(error);
  }
});
