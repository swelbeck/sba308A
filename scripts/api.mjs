// api.mjs
// -------------- Imports --------------
// import axios from "axios";
import {} from "./script.mjs"
// -------------- API information --------------
const apiKey = "a033e140831df183efc1df7cc9e60d21";
export const bearerToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDMzZTE0MDgzMWRmMTgzZWZjMWRmN2NjOWU2MGQyMSIsIm5iZiI6MTcyODE1OTUxNS40NjgxNDgsInN1YiI6IjVmYTVjZDFlMjE2MjFkMDA0MGY1MGQ4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bAtlpl92S4efx4_J_uxLP9lbhke4o9atyyUPJwbN-Q";
const moviesUrl = `https://api.themoviedb.org/3/search/movie?query=`;

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

export async function getMovieGenres() {
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
// getMovieGenres();



