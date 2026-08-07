document.addEventListener("click", function(e) {
    if (e.target.classList.contains("game-card")) {
        let gameId = e.target.dataset.id;

        if (!isLoggedIn) {
            alert("Silahkan login terlebih dahulu untuk melihat detail game.");
            window.location = "login.php";
            return;
        }

        window.location = "detail.php?id=" + gameId;
    }
});
