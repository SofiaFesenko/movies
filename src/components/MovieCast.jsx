import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MoviesCast() {
    const { movieId } = useParams()
    const [cast, setCast] = useState(null);

    useEffect(() => {
        async function fetchSingleMovie() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=ce1bdf60c90c5aff209d38216d693f24&language=uk-UKR`
            );
            setCast(response.data.cast)          
        }

        fetchSingleMovie();
    }, [movieId])


    return (
      <>
      <div>
        {Array.isArray(cast) && cast.length > 0 && (
            <ul>
                { cast.map((person) => (
                <li key={person.id}>
                    <img src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`} alt="cast" />
                    <p>{person.name}</p>
                    <p>Персонаж: {person.character}</p>
                </li>
                ))}
            </ul>
        )}
      </div>    
      </>
    )
  }
  
export default MoviesCast