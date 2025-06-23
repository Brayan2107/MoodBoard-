document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("humeursForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const mood = parseInt(document.getElementById("userHumeur").value);
        const user = sessionStorage.getItem('username'); // récupéré depuis sessionStorage
        const date = new Date().toISOString().split('T')[0]; // format AAAA-MM-JJ
        console.log(user);
        console.log(mood);
        if (!mood || !user) {
            alert("Merci de sélectionner une humeur et d’être connecté.");
            return;
        }

        fetch("/post-humeur", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user, date, mood })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert("✅ " + data.message);
            } else {
                alert("⚠️ Une erreur est survenue.");
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi :", error);
            alert("❌ Erreur lors de l’envoi de l’humeur.");
        });
    });
});
