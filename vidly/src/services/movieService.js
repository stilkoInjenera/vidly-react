import axios from "axios";
import { getGenres } from "./genreService";

const genres = await getGenres();

const moviesAPI = "http://localhost:3900/api/movies";

export async function getMovies() {
    const { data: movies } = await axios.get(moviesAPI);
    return movies;
}

export async function deleteMovie(movie) {
    try {
        await axios.delete(`${moviesAPI}/${movie._id}`);
    } catch (e) {
        if (e.response && e.response.status === 404) return "404: Not Found";
        else return "Unexpected Error Occured";
    }
}

export async function saveMovie(movie) {
    const movieR = reformatMovie(movie);
    try {
        await axios.post(`${moviesAPI}`, movieR);
    } catch (e) {
        if (e.response && e.response.status === 404) return "404: Not Found";
        else return "Unexpected Error Occured";
    }
}


function reformatMovie(movie) {
    const movieR = { ...movie };
    delete movieR._id;
    movieR.genreId = genres.find((g) => g.name === movie.genre)._id;
    delete movieR.genre;
    movieR.title = movieR.name;
    delete movieR.name;
    movieR.dailyRentalRate = parseInt(movieR.dailyRentalRate);
    movieR.numberInStock = parseInt(movieR.numberInStock);
    console.log(movieR);
    return movieR;
}
// export async function likeMovie(movie) {
//     console.log(movie, movie._id);
//     try {
//         await axios.put(`${moviesAPI}/${movie._id}`, movie);
//     } catch (e) {
//         if (e.response && e.response.status === 404) return "404: Not Found";
//         else return "Unexpected Error Occured";
//     }
// }
