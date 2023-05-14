import {  Route, Routes } from "react-router-dom";
import MovieDetails from "../MovieDetails/MovieDetails";
import Movies from '../Movies/Movies';
import Home from "../../pages/Home";
import Layout from '../Layout/Layout';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

// const endpointSaerch = "/search/search-movies";
// const endpointGetDetails = "/movies/get-movie-details";
// const endpointGetCredits = "/movies/get-movie-credits";
// const endpointGetReviews = "/movies/get-movie-reviews";
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:id" element={<MovieDetails />} >
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
    </Routes>
  );
};