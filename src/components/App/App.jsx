import { Route, Routes } from "react-router-dom";
import { lazy } from 'react';
import Layout from '../Layout/Layout';
import { Navigate } from "react-router-dom";

const MovieDetails = lazy(() =>
  import('../../pages/MovieDetails/MovieDetails'));
const Movies = lazy(() =>
  import('../../pages/Movies/Movies'));
const Home = lazy(() =>
  import('../../pages/Home'));
const Cast = lazy(() =>
  import('../Cast/Cast'));
const Reviews = lazy(() =>
  import('../Reviews/Reviews'));
  
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
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Route>
    </Routes>
  );
};