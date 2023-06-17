// index.js
const apiKey = "1d67cb07";

//................................................................
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const movieList = document.getElementById("movie-list");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const searchTerm = searchInput.value.trim(); // Get the search term and remove leading/trailing whitespace

  if (searchTerm !== "") {
    fetchMovieData(searchTerm);
  }
});

// ........................................................................

async function fetchMovieData(searchTerm) {
  const apiAllMoviesUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${encodeURIComponent(
    searchTerm
  )}`;

  try {
    const response = await fetch(apiAllMoviesUrl);
    const data = await response.json();

    if (data.Response === "True") {
      const filteredMovies = filterMoviesByTitle(data.Search, searchTerm);
      displayMovieResults(filteredMovies);
    } else {
      displayErrorMessage(data.Error);
    }
  } catch (error) {
    displayErrorMessage("An error occurred while fetching data.");
  }
}

function filterMoviesByTitle(movies, searchTerm) {
  const filteredMovies = movies.filter((movie) => {
    const title = movie.Title.toLowerCase();
    const search = searchTerm.toLowerCase();
    return title.includes(search);
  });

  return filteredMovies;
}

// ...

function displayMovieResults(movies) {
  movieList.innerHTML = ""; // Clear previous search results

  movies.forEach((movie) => {
    // new card
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    // each card class
    const eachMovieItemClass = "movie-item-class-" + movie.imdbID;
    movieItem.classList.add(eachMovieItemClass);

    // card contents
    movieItem.innerHTML = `
    <img src="${movie.Poster}" style="height: auto;" alt="${movie.Title}">
    <h2 style="color:#e5e5e5">
        <strong style="color:#ef233c">Title:</strong>
        ${movie.Title}</h2>
        <p style="color:#e5e5e5" ><strong style="color:#ef233c">Year:</strong>${movie.Year}</p>
        <button class="read-more-button" style="color:#ef233c" data-id="${movie.imdbID}">View details</button>
        <div class="additional-info" style="display: none;"></div>
      `;
    movieList.appendChild(movieItem);
  });

  // Add event listener to each "Read More" button
  const readMoreButtons = document.querySelectorAll(".read-more-button");
  readMoreButtons.forEach((button) => {
    button.addEventListener("click", showAdditionalInfo);
  });
}

async function showAdditionalInfo(event) {
  const button = event.target;
  const movieId = button.getAttribute("data-id");
  const additionalInfo = button.parentNode.querySelector(".additional-info");

  if (additionalInfo.style.display === "none") {
    try {
      const apiMovieUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

      const response = await fetch(apiMovieUrl);
      const data = await response.json();

      if (data.Response === "True") {
        const { Plot, Genre, Actors } = data;

        additionalInfo.innerHTML = `
            <div style="text-align: left">
            
                <p style="font-size: 20px;color:#e5e5e5"> 
                <strong style="color:#ef233c">Plot:</strong>
                 ${Plot}</p>
                <p style="font-size: 20px;color:#e5e5e5"> 
                <strong style="color:#ef233c">Genre:</strong>
                 ${Genre}</p>
                <p style="font-size: 20px;color:#e5e5e5">
                 <strong style="color:#ef233c">Actors:</strong >
                  ${Actors}</p>
            </div>
          `;

        additionalInfo.style.display = "block";
        button.textContent = "Go Back";
      } else {
        displayErrorMessage(data.Error);
      }
    } catch (error) {
      displayErrorMessage("An error occurred while fetching movie data.");
    }
  } else {
    additionalInfo.style.display = "none";
    button.textContent = "View details";
  }
}

function displayErrorMessage(message) {
  movieList.innerHTML = `<p class="error-message">${message}</p>`;
}
