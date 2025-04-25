import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";


function HomePage() {

    const [movies, setMovies] = useState(null);
    useEffect(() => {
        async function fetchMovies() {
            const response = await axios.get(
                "https://api.artic.edu/api/v1/artworks"
            );
            
            setMovies(response.data.data)
        }

        fetchMovies();
      }, []);    

    return (
      <>
        <h1>Популярні картини</h1>
        <MovieList movie={movies}/>
      </>
    )
}
  
export default HomePage