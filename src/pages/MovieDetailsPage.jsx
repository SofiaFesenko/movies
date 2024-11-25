import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom"

import css from './MovieDetailsPage.module.css'

function MovieDetailsPage() {
    const { movieId } = useParams()
    const [movie, setMovie] = useState(null);
    const location = useLocation()

    const locationRef = useRef(location.state?.from ?? "/movies")

    useEffect(() => {
        async function fetchSingleMovie() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=ce1bdf60c90c5aff209d38216d693f24&language=uk-UKR`
            );
            setMovie(response.data)
        }

        fetchSingleMovie();
    }, [movieId]);

    if (movie == null) {
        return <p>почекайте</p>
    }

    const moviePicture = `https://image.tmdb.org/t/p/w400/${movie.poster_path}`

    return (
      <>
        <Link to={locationRef.current}>повернутися</Link>
        <div className={css.block}>
            <img src={moviePicture} alt="raewfar" />  
            <div>
                <h3>{movie.title}</h3>
                <span>Оцінка користувача: {movie.vote_average}</span>
                <h5>Огляд</h5>
                <p>{movie.overview}</p>
                <h5>Жанри</h5>
                {movie.genres.map((genre) => {
                    return <span>{genre.name} </span>
                })}
                
            </div>  
        </div>
        <div>
            <p>Додаткова інформація</p>
            <ul>
                <li><Link to="cast">Команда</Link></li>
                <li><Link to="reviews">Відгуки</Link></li>
            </ul>
        </div>
        <div><Outlet/></div>
           
      </>
    )
  }
  
export default MovieDetailsPage
