// index.js

// ...

// Define constants
const apiKey = "1d67cb07";

// Get DOM elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const movieList = document.getElementById("movie-list");

// Attach form submission event listener
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the search term from the input field
  // and remove leading/trailing whitespace
  const searchTerm = searchInput.value.trim();

  // Perform a movie search if the search term is not empty
  if (searchTerm !== "") {
    fetchMovieData(searchTerm);
  }
});

// ...
