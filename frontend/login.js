document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("inputUser1").value;
        const password = document.getElementById("inputPassword1").value;

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/index.html";
            } else {
                alert("Login échoué");
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi :", error);
        });
    });
});
