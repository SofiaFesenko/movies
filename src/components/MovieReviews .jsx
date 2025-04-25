import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MoviesReviews() {

    const { movieId } = useParams()
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        async function fetchSingleMovie() {
            const response = await axios.get(
                `https://api.artic.edu/api/v1/artworks/${movieId}`
            );
            setReviews(response.data.data)
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
           ) : <h3>{reviews.description}</h3>)}     
        </div>     
      </>
    )
  }
  
export default MoviesReviews