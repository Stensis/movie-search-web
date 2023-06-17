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

// Fetch movie data from the OMDB API
async function fetchMovieData(searchTerm) {
    // Construct the API URL with the search term
    const apiAllMoviesUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${encodeURIComponent(
      searchTerm
    )}`;
  
    try {
      // Make the API request
      const response = await fetch(apiAllMoviesUrl);
      const data = await response.json();
  
      // Check if the response is successful
      if (data.Response === "True") {
        // Filter the movies based on the search term
        const filteredMovies = filterMoviesByTitle(data.Search, searchTerm);
  
        // Display the filtered movie results
        displayMovieResults(filteredMovies);
      } else {
        // Display an error message if the response is not successful
        displayErrorMessage(data.Error);
      }
    } catch (error) {
      // Display an error message if an error occurs during the API request
      displayErrorMessage("An error occurred while fetching data.");
    }
  }
  
  // ...
  
