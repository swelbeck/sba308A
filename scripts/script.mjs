// script.mjs
// -------------- Imports --------------
// import axios from "axios";
import * as Cards from "./cards.mjs";
import * as Api from "./api.mjs";

// -------------- Grabbing elements from the DOM --------------
const genreSelect = document.getElementById("genreSelect");
const searchForm = document.getElementById("search-form");
const subHeading = document.querySelector("h2");

async function genreDropdown() {
  try {
    let defaultOption = document.createElement("option");
    defaultOption.value = "Default";
    defaultOption.textContent = "--select a genre here--";
    genreSelect.appendChild(defaultOption);

    const genreData = await Api.getMovieGenresList();
    // console.log(genreData);
    genreData.genres.forEach((genre) => {
      let genreOptions = document.createElement("option");
      genreOptions.value = genre.id;
      genreOptions.textContent = genre.name;
      genreSelect.appendChild(genreOptions);
    });

    // Selecting the first option
    genreSelect.selectedIndex = 0;
    await loadHomePage();
  } catch (err) {
    console.error(err);
    // console.error("Promise rejected");
  }
}
genreDropdown();

// Genre Select
genreSelect.addEventListener("change", genreSelection);

async function genreSelection(event) {
  Cards.clear();

  const genreId = event.target.value;
  const genreName = event.target.selectedOptions[0].textContent;
  console.log(genreId);
  console.log(event.target.selectedOptions[0].textContent);
  try {
    if (genreId == "Default") {
      await loadHomePage();
      subHeading.textContent = "Popular Movies!";
    }else{
    const genreResults = await Api.getMoviesByGenre(genreId);
    const resultsDetail = genreResults.results;
    // console.log(resultsDetail);
    renderCards(resultsDetail);
    subHeading.textContent = `${genreName} Films!`;}
  } catch (err) {
    console.error(err);
  }
}

// Movie Search
searchForm.addEventListener("submit", handleSearch);

async function handleSearch(event) {
  Cards.clear();
  event.preventDefault();
  const query = document.getElementById("movie-search").value;
  // console.log(query);
  try {
    if (query) {
      const movies = await Api.getMovies(query);
      const queryResults = movies.results;
      // console.log(queryResults);
      renderCards(queryResults);
      // subHeading.textContent = "Popular Movies!";
    }
  } catch (err) {
    console.log(err);
  }
}

// Default Home Page load

async function loadHomePage() {
  try {
    const popMovies = await Api.getPopularMovies();
    const popResults = popMovies.results;
    renderCards(popResults);
  } catch (error) {
    console.error(error);
  }
}
// loadHomePage();

// Helper functions
function renderCards(movieDetail) {
  const posterUrl = `https://image.tmdb.org/t/p/original/`;
  try {
    movieDetail.forEach((movie) => {
      if (movie.poster_path) {
        const cardItem = Cards.createCardItem(
          posterUrl + movie.poster_path,
          `${movie.title}`,
          movie.title,
          movie.overview
        );
        // Append the new card item
        Cards.appendCards(cardItem);
      } else {
        console.warn(`No image found for: ${movie.title}, id: ${movie.id}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
