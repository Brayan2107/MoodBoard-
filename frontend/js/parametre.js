window.addEventListener('DOMContentLoaded', () => {
    const userId = '68342fe4e4f16a5f3d9c4a91';
  
    // 1. Récupérer les données utilisateur
    async function loadUser() {
      try {
        const res = await fetch(`http://localhost:3000/api/controller/get-user/${userId}`);
        if (!res.ok) throw new Error('Erreur lors du chargement');
        const user = await res.json();
  
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
      } catch (err) {
        console.error(err);
        alert('Impossible de charger les données utilisateur');
      }
    }
  
    // 2. Mise à jour des infos (nom + email)
    document.getElementById('userForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const updatedData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
      };
  
      try {
        const res = await fetch(`http://localhost:3000/api/controller/put-user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        });
  
        if (!res.ok) throw new Error('Erreur lors de la mise à jour');
        const updatedUser = await res.json();
        alert('Modifications enregistrées !');
        console.log(updatedUser);
      } catch (err) {
        console.error(err);
        alert('Échec de la mise à jour');
      }
    });
  
    // 3. Mise à jour du mot de passe
    document.getElementById('passwordForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const oldPassword = document.getElementById('oldPassword').value;
      const newPassword = document.getElementById('newPassword').value;
  
      try {
        const res = await fetch(`http://localhost:3000/api/controller/change-password/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ oldPassword, newPassword })
        });
  
        const result = await res.json();
  
        if (!res.ok) throw new Error(result.message);
  
        alert('Mot de passe mis à jour avec succès');
      } catch (err) {
        alert('Erreur : ' + err.message);
      }
    });
  
    // Chargement initial des infos
    loadUser();
  });
  