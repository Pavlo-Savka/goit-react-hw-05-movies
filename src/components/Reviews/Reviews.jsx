import { useParams } from "react-router-dom";
import fetchMovies from "../../API/fetchMovies";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import css from './Reviews.module.css';


const Reviews = () => {
    const { id } = useParams();
    const [movieReviews, setMovieReviews] = useState([]);
    const endpoint = `/movie/${id}/reviews`;
    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetchMovies(endpoint, '');
                setMovieReviews(response.results);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchReviews();
    }, [id, endpoint]);
    return (
        <div>
            {movieReviews.length === 0 ? <p>Not reviews</p> :
                (<ul>
                    {movieReviews.map((i) =>
                        <li key={i.id}>
                            <p className={css.name}>Author: {i.author}</p>
                            <p>{i.content}</p>
                        </li>)}
                </ul>
                )}
        </div>
    )
};

Reviews.propTypes = {
    id: PropTypes.string.isRequired
};
export default Reviews;