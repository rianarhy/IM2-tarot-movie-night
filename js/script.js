fetch("cards.json")
  .then(response => response.json())
  .then(data => {

    const button = document.getElementById("ClickMeButton");
    const output = document.getElementById("output");

    button.addEventListener("click", async () => {

      const randomIndex = Math.floor(Math.random() * data.cards.length);
      const card = data.cards[randomIndex];

      const imdbId = card["#IMDB_ID"];

      try {

        // IMDB API
        const response = await fetch(
          `https://imdb.iamidiotareyoutoo.com/search?q=${imdbId}`
        );

        const result = await response.json();
        const movie = result?.description?.[0] || result;

        const title = movie["#TITLE"];
        const year = movie["#YEAR"];
        const actors = movie["#ACTORS"];
        const url = movie["#IMDB_URL"];

        // Bildpfad
        const imagePath = card.image;

        // Bild prüfen
        const img = new Image();

        img.onload = () => {

          // Wenn Bild existiert
          output.innerHTML = `
              <div>
                <img src="${imagePath}" alt="${card.name}" class="card-image">
              </div>

              <div class="card-info">
                <h2 class="movie-title-card">Your Card:</h2>
                <h2 class="title">${card.name}</h2>
                <p class="text">${card.meaning_up}</p>
              

                

                <h2 class="movie-title-card">Your Movie:</h2>
                <p class="title">${title}</p>
                <p class="text">${year}, ${actors}</p>

                <p>
                  <a class="imdb-button" href="${url}" target="_blank">More Info</a>
                </p>
              </div>
          `;

           // SCROLL ZUR KARTE HINZUFÜGEN
            requestAnimationFrame(() => {

              const y =
                output.getBoundingClientRect().top
                + window.pageYOffset;

              const offset = 100;

              smoothScrollTo(y - offset, 2200); /* evt position anpassen wenn responsive machen */

  });
          
        };

        img.onerror = () => {

          // Falls Bild fehlt
          console.log("no image yet");

          output.innerHTML = `
            <div>
                <img src="${imagePath}" alt="${card.name}" class="card-image">
              </div>

              <div class="card-info">
                <h2 class="movie-title-card">Your Card:</h2>
                <h2 class="title">${card.name}</h2>
                <p class="text">${card.meaning_up}</p>
              

                

                <h2 class="movie-title-card">Your Movie:</h2>
                <p class="title">${title}</p>
                <p class="text">${year}, ${actors}</p>

                <p>
                  <a class="imdb-button" href="${url}" target="_blank">More Info</a>
                </p>
              </div>
          `;
           // SCROLL ZUR KARTE HINZUFÜGEN
            requestAnimationFrame(() => {

              const y =
                output.getBoundingClientRect().top
                + window.pageYOffset;

              const offset = 100;

              smoothScrollTo(y - offset, 2200); /* evt position anpassen wenn responsive machen */
  });
        };

        // Bild laden starten
        img.src = imagePath;

      } catch (error) {

        output.innerHTML = `
          <p class="text">Fehler beim Laden der Filmdaten.</p>
        `;

        console.error(error);
      }

    });

  });


/* Filmstrip scrollen */
  const filmstripTrack = document.querySelector(".filmstrip-track");
const firstFilmstrip = filmstripTrack.querySelector("img");

let latestScrollY = window.scrollY;
let ticking = false;

function updateFilmstrip() {
    const speed = 2; // kleiner = langsamer, grösser = schneller
    const loopHeight = firstFilmstrip.offsetHeight;

    const moveY = (latestScrollY * speed) % loopHeight;

    filmstripTrack.style.transform = `translate3d(0, -${moveY}px, 0)`;

    ticking = false;
}

window.addEventListener("scroll", () => {
    latestScrollY = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(updateFilmstrip);
        ticking = true;
    }
});

window.addEventListener("resize", updateFilmstrip);
window.addEventListener("load", updateFilmstrip);







/* scroll into view  */
function smoothScrollTo(targetY, duration = 500) {

  const startY = window.scrollY;

  const difference = targetY - startY;

  const startTime = performance.now();

  function step(currentTime) {

    const progress =
      Math.min((currentTime - startTime) / duration, 1);

    // Easing
    const ease =
      1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, startY + difference * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }

  }

  requestAnimationFrame(step);

}



