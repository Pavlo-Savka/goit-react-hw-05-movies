import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import fetchMovies from "../../API/fetchMovies";
import { useState, useEffect, useRef } from "react";
import { Suspense } from 'react';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movieDetails, setmovieDetails] = useState([]);
    const endpoint = `/movie/${id}`;
    const location = useLocation();
    const backLinkHref = useRef(location.state?.from ?? "/");

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await fetchMovies(endpoint, "");
                setmovieDetails(response);
            }
            catch (error) {
                console.error(error.message);
            }
        };
        fetchMovieDetails();
    }, [id, endpoint]);
    return (
        <main>
            <div className={css.container}>
                <Link className={css.link} to={backLinkHref.current}>Go back</Link>
                <div className={css.details}>
                    <img src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} alt="" />
                    <div className={css.description}>
                        <h2>{movieDetails.original_title} ({new Date(movieDetails.release_date).getFullYear()})</h2>
                        <p>User score: {Math.round(movieDetails.vote_average * 10)}%</p>
                        <h3>Overview</h3>
                        <p>{movieDetails.overview}</p>
                        <h3>Genres</h3>
                        <p>{movieDetails.genres?.map((i) => i.name).join(', ')}</p>
                    </div>
                </div>
            </div>
            <div className={css.container}>
                <h4>Additional information</h4>
                <ul>
                    <li><Link to={`cast`} state={{ from: backLinkHref }}>Cast</Link></li>
                    <li><Link to={`reviews`} state={{ from: backLinkHref }}>Reviews</Link></li>
                </ul>
                <Suspense fallback={< div > Loadind...  </div >}>
                    <Outlet />
                </Suspense >
            </div>
        </main>
    )
};

export default MovieDetails;