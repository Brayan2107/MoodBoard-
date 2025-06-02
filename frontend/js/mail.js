function envoyerRappel() {
    fetch('/rappelle-mail', { method: 'POST' })
      .then(async res => {
        const data = await res.json();
        const code = res.status;
  
        if (code === 200) {
          showToast(data.message, 'success'); 
        } else if (code === 207) {
          showToast(data.message, 'warning'); 
        } else {
          showToast(data.message || 'Erreur inconnue', 'danger'); 
        }
      })
      .catch(err => {
        console.error(err);
        showToast('Erreur lors de l’envoi des rappels', 'danger');
      });
  }
  
function envoyerMailHumeurUtilisateur() {
    fetch('/mail-humeur-user', {
        method: 'POST'
    })
    .then(async res => {
        const data = await res.json();
        if (res.status === 200) {
            showToast(data.message, 'success');
        } else {
            showToast(data.message || 'Erreur envoi mail', 'danger');
        }
    })
    .catch(err => {
        console.error(err);
        showToast('Erreur serveur lors de l’envoi du mail', 'danger');
    });
}

  function showToast(message, type = 'primary') {
    const toastEl = document.getElementById('toastStatus');
    const toastMessage = document.getElementById('toastMessage');
  
    toastMessage.textContent = message;
  
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
  
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
  