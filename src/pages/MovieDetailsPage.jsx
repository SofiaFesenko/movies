import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom"

import css from './MovieDetailsPage.module.css'

function MovieDetailsPage() {
    const { movieId } = useParams()
    const [movie, setMovie] = useState(null);
    const [pict, setPict] = useState(null);
    const location = useLocation()

    const locationRef = useRef(location.state?.from ?? "/movies")

    useEffect(() => {
        async function fetchSingleMovie() {
            const response = await axios.get(
                `https://api.artic.edu/api/v1/artworks/${movieId}`
            );
            
            setMovie(response.data.data)
        }

        fetchSingleMovie();
    }, [movieId]);

    useEffect(() => {
        async function getMoviePictureId() {
            const response = await axios.get(
                `https://api.artic.edu/api/v1/artworks/${movieId}?fields=id,title,image_id`
            );
            setPict(response.data.data.image_id)
        }

        getMoviePictureId();
    }, [movieId]);

    if (movie == null) {
        return <p>почекайте</p>
    }

    if (pict == null) {
        return <p>щось пішло не так, спробуйте інший запрос</p>
    }

    
    const moviePicture = pict ? `https://www.artic.edu/iiif/2/${pict}/full/843,/0/default.jpg` : ""

    return (
      <>
        <Link to={locationRef.current}>повернутися</Link>
        <div className={css.block}>
            <img src={moviePicture} alt="raewfar" />  
            <div>
                <h3>{movie.title}</h3>
                <span>Творець: {movie.artist_display}</span>
                <h5>Опис</h5>
                <p>{movie.thumbnail.alt_text}</p>
                <p>{movie.description}</p>
                
            </div>  
        </div>
        <div>
            <p>Додаткова інформація</p>
            <ul>
                <li><Link to="cast">Класифікація</Link></li>
            </ul>
        </div>
        <div><Outlet/></div>
           
      </>
    )
  }
  
export default MovieDetailsPage
