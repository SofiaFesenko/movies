import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MoviesReviews() {

    const { movieId } = useParams()
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        async function fetchSingleMovie() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=ce1bdf60c90c5aff209d38216d693f24&language=uk-UKR`
            );
            setReviews(response.data.results)
        }

        fetchSingleMovie();
    }, [movieId])


    return (
      <>
        <div>
           {Array.isArray(reviews) && (reviews.length > 0 ? (
            <ul>
                {reviews.map((review) => (
                <li key={review.id}>
                    <h5>{review.author}</h5>
                    <p>{review.content}</p>
                </li>
                ))}
            </ul>
           ) : <h3>Немає відгуків</h3>)}     
        </div>     
      </>
    )
  }
  
export default MoviesReviews