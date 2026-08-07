document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("gameContainer");

    fetch("games_api.php")
        .then(res => res.json())
        .then(games => {
            games.forEach(game => {

                let genresList = game.genres.join(", ");

                let card = `
      <div class="col-md-4 my-4 game-card" id="${game.id}">
        <div class="card shadow-sm h-100 w-100">
          <img src="${game.image}" class="card-img-top" alt="${game.title}">
          <div class="card-body d-flex flex-column">
            <div><b>${genresList}</b></div>
            <h5 class="card-title">${game.title}</h5>
            <div class="mt-auto">
              <a class="btn btn-custom btn-block detail-link" href="game-detail.php?id=${game.id}">Lihat Detail</a>
            </div>
          </div>
        </div>
      </div>
    `;

                container.insertAdjacentHTML("beforeend", card);
            });
        })
        .catch(err => console.error("Load game error:", err));
});
