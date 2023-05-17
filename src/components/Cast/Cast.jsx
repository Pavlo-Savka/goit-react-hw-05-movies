import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import fetchMovies from "../../API/fetchMovies";
import { useState, useEffect } from "react";
import css from './Cast.module.css';

const Cast = () => {
    const { id } = useParams();
    const [movieCast, setMovieCast] = useState([]);
    const endpoint = `/movie/${id}/credits`;
    useEffect(() => {
        async function fetchCast() {
            try {
                const response = await fetchMovies(endpoint, "");
                setMovieCast(response.cast);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchCast();
    }, [id, endpoint]);
    return (
        <div>
            {movieCast.length === 0 ? <p>No information</p> :
                (<ul>
                    {movieCast.map((i) =>
                        <li key={i.id}>
                            <img className={css.imgCast} src={`https://image.tmdb.org/t/p/w200${i.profile_path}`} alt="" />
                            <p>{i.name}</p>
                            <p>Character: {i.character}</p>
                        </li>)}

                </ul>
                )}
        </div>
    )
};

Cast.propTypes = {
    id: PropTypes.string.isRequired
};
export default Cast;