import axios from 'axios';

const key = 'a911aa07e81ec5a2dc7dd039825bfe81';
const baseURL = 'https://api.themoviedb.org/3';

async function fetchMovies(endpoint, searchQuery) {
    const response = await axios.get(`${baseURL}${endpoint}?api_key=${key}${searchQuery}`)
        .then((response) => response.data)
        .catch((error) => (error));
    
    return response;
}
export default fetchMovies ;