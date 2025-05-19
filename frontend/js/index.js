document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("humeursForm");
    
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const humeur = document.getElementById("userHumeur").value;
        if (!humeur || humeur == "") {
        alert("Merci de sélectionner une humeur.");
        return;
        }
        
        fetch("/humeur", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ humeur }),
        })
        .then(response => {
            if (response.ok) {
                alert("Merci de participer, votre humeur a été envoyée.");
            } else {
                alert("Erreur lors de l'enregistrement de l'humeur.");
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi :", error);
        });
    });
});
