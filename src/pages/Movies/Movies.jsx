import fetchMovies from "../../API/fetchMovies";
import { useState, useEffect} from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import css from './Movies.module.css';

const Movies = (fetchMovieByQuery) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('query') ?? "";
    const [movies, setMovies] = useState();
    const [queryString, setQueryString] = useState();
    const endpoint = `/search/movie`;
    const searchQuery = `&query=${queryParam}`;
    const location = useLocation();

    useEffect(() => {
        const inputValue = document.querySelector('.queryInput');
        if (inputValue && queryString) {
            inputValue.value = queryString;
        }
    }, [queryString]);

    const updateQueryString = (evt) => {
        if (evt.target.value === '') {
            setSearchParams({});
            setQueryString('');
        } else {
            setSearchParams({ query: evt.target.value });
            setQueryString(evt.target.value);
        }
    };

    useEffect(() => {
        if (queryParam === "") return;
            async function fetchMovieByQuery() {
                try {
                    const response = await fetchMovies(endpoint, searchQuery);
                    setMovies(response.results);
                }
                catch (error) {
                    console.error(error.message);
                }
            };
            fetchMovieByQuery();
    }, [queryParam, endpoint, searchQuery]);
     const handleSubmit = (evt) => {
         evt.preventDefault();
     };
    return (
        <div className={css.container}>
            <form
                onSubmit={handleSubmit}
                className="queryForm"
            >
                <input
                    onChange={updateQueryString}
                    type="text"
                    name="searchQueryForm"
                    className="queryInput"
                />
                <button>Search</button>
            </form>
            {movies && (
                <ul>
                    {movies.map((i) => (
                        <li key={i.id}>
                            <Link to={`/movies/${i.id}`} state={{ from: location }}> {i.original_title}</Link>  
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

Movies.propTypes = {
    id: PropTypes.string
};
export default Movies;