// api.mjs
// -------------- Imports --------------
// import axios from "axios";

// -------------- API information --------------
const apiKey = "a033e140831df183efc1df7cc9e60d21";
export const bearerToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDMzZTE0MDgzMWRmMTgzZWZjMWRmN2NjOWU2MGQyMSIsIm5iZiI6MTcyODE1OTUxNS40NjgxNDgsInN1YiI6IjVmYTVjZDFlMjE2MjFkMDA0MGY1MGQ4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bAtlpl92S4efx4_J_uxLP9lbhke4o9atyyUPJwbN-Q";
const moviesUrl = `https://api.themoviedb.org/3/search/movie?query=`;

// API call for search function - search by movie name
export async function getMovies(query) {
  try {
    const response = await axios.get(moviesUrl + query, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    console.error("Promise rejected");
  }
}
// getMovies();

// Genre ID List - this is used for the dropdown 
export async function getMovieGenresList() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    console.error("Promise rejected");
  }
}
// getMovieGenresList();

// API call for home page - list of popular movies
export async function getPopularMovies() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    // console.log(response.data.results);
    return response.data;
  } catch (err) {
    console.error(err);
    console.error("Promise rejected");
  }
}

// getPopularMovies();

// API call for dropdown function - get movie list by genre
export async function getMoviesByGenre(genreId) {
  // console.log(`Fetching movies for genreId: ${genreId}`); 
  try {
    const genreQuery = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=${genreId}`;
    const results = await axios.get(genreQuery, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    // console.log(results.data);
    return results.data;
  } catch (err) {
    console.error(err);
    console.error("Promise rejected");
  }
}

// getMoviesByGenre();
