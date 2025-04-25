import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MoviesCast() {
    const { movieId } = useParams()
    const [cast, setCast] = useState(null);

    useEffect(() => {
        async function fetchSingleMovie() {
            const response = await axios.get(
                `https://api.artic.edu/api/v1/artworks/${movieId}`
            );
            setCast(response.data.data.classification_titles)          
        }

        fetchSingleMovie();
    }, [movieId])


    return (
      <>
      <div>
        {cast && Object.entries(cast).length > 0 ? (
            <ul>
                { Object.entries(cast).map(([key, title]) => (
                <li key={key}>
                    {title}
                </li>
                ))}
            </ul>)
            : <h3>Класифікацій немає</h3>} 

      </div>    
      </>
    )
  }
  
export default MoviesCast