import fetchMovies from "../../API/fetchMovies";
import { useState, useEffect} from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import css from './Movies.module.css';

const Movies = (fetchMovieByQuery) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('query') ?? "";
    const [movies, setMovies] = useState();
    const endpoint = `/search/movie`;
    const searchQuery = `&query=${queryParam}`

    const updateQueryString = evt => {
        if (evt.target.value === "") { return setSearchParams({}) };
        setSearchParams({ query: evt.target.value })
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
    }, [queryParam]);
    // const handleSubmit = (evt) => {
    //     evt.preventDefault();
    //     const form = evt.currentTarget;
    //    setSearchParams({ query: evt.target.value });
    //     form.reset();
    // };
    return (
        <div className={css.container}>
            <form
                //onSubmit={handleSubmit}
                action="">
                <input
                    onChange={updateQueryString}
                    type="text" />
            </form>
            {movies && (
                <ul>
                    {movies.map((i) => (
                        <li key={i.id}>
                            <NavLink to={`/movies/${i.id}`}> {i.original_title}</NavLink>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default Movies;