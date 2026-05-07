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
            <img src="${imagePath}" alt="${card.name}" class="card-image">

            <h2 class="title">${card.name}</h2>
            <p class="text">${card.meaning_up}</p>

            <hr>

            <h2 class="title">Your Movie</h2>
            <p class="title">${title}</p>
            <p class="text">${year}, ${actors}</p>

            <p class="title">
              <a href="${url}" target="_blank">More Info</a>
            </p>
          `;
        };

        img.onerror = () => {

          // Falls Bild fehlt
          console.log("no image yet");

          output.innerHTML = `
            <h2 class="title">${card.name}</h2>
            <p class="text">${card.meaning_up}</p>

            <p class="text"> no image yet</p>

            <hr>

            <h2 class="title">Your Movie</h2>
            <p class="title">${title}</p>
            <p class="text">${year}, ${actors}</p>

            <p class="title">
              <a href="${url}" target="_blank">More Info</a>
            </p>
          `;
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