import { useState, useEffect     } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import  fetchMovies  from '../API/fetchMovies';

const endpoint = "/trending/movie/week";

const Home = () => {
    const [trendMovies, setTrendMovies] = useState([]);
    const location = useLocation();
    useEffect(() => {

        async function fetchMoviesData() {
            try {
                const response = await fetchMovies(endpoint, "");
                setTrendMovies(response.results);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchMoviesData();
    }, []);
    return (
        <main>
            <h1>Trending today</h1>
            <ul>
                {trendMovies.map((i) => (
                    <li key={i.id}>
                        <NavLink to={`/movies/${i.id}`} state={{ from: location }}>{i.title}</NavLink>
                    </li>
                ))}
            </ul>
        </main>
    )
};

Home.propTypes = {
    id: PropTypes.string.isRequired
};
export default Home;