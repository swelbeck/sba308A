// script.mjs
// -------------- Imports --------------
// import axios from "axios";
import * as Cards from "./cards.mjs";
import { bearerToken, getMovies, getMovieGenres } from "./api.mjs";
// import { createCardItem, appendCards } from "./cards.mjs";

// -------------- Grabbing elements from the DOM --------------
const genreSelect = document.getElementById("genreSelect");
const searchForm = document.getElementById("search-form");

async function genreDropdown() {
  try {
    const genreData = await getMovieGenres();

    console.log(genreData);

    genreData.genres.forEach((genre) => {
      let genreOptions = document.createElement("option");
      genreOptions.value = genre.id;
      genreOptions.textContent = genre.name;
      genreSelect.appendChild(genreOptions);
    });

    // Selecting the first genre
    // genreSelect.selectedIndex = 0;
    // await genreSelection({ target: genreSelect });
  } catch (err) {
    console.error(err);
    // console.error("Promise rejected");
  }
}
genreDropdown();

genreSelect.addEventListener("change", genreSelection);

async function genreSelection(event) {
  const genreId = event.target.value;
  console.log(genreId);
  try {
    const genreQuery = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=${genreId}`;
    const genreResults = await axios.get(genreQuery, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    const resultsDetail = genreResults.data.results;
    console.log(resultsDetail);
    const posterUrl = `https://image.tmdb.org/t/p/original/`;
    resultsDetail.forEach((movie) => {
      if (movie.poster_path) {
        const cardItem = Cards.createCardItem(
          posterUrl + movie.poster_path,
          `${movie.title}`
        );
        // Append the new card item
        Cards.appendCards(cardItem);
      } else {
        console.warn(`No image found for breed: ${movie.title}`);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

searchForm.addEventListener("submit", handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  const query = document.getElementById("movie-search").value;
  if (query) {
    const movies = await getMovies(query);
    renderMovieCards(movies);
  }
}
