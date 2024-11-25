import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";

import MovieList from "../components/MovieList";

function MoviesPage() {

  const inputRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("query")
  const location = useLocation()
 

  function getinput(e) {
    e.preventDefault()
    setSearchParams({query: inputRef.current.value})

  }

  const [movie, setMovie] = useState(null);

    useEffect(() => {

      if (!query) return

      async function fetchSingleMovie() {
          const response = await axios.get(
              `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=ce1bdf60c90c5aff209d38216d693f24&language=uk-UKR`
          );
          setMovie(response.data.results)        
      }

      fetchSingleMovie();
    }, [query]);
  

    return (
      <>
        <form action="" onSubmit={getinput}>
          <input type="text" ref={inputRef} defaultValue={query}/>
          <button type="submit" >шукати</button>
        </form>

        <MovieList movie={movie} location={location}/>
      </>
    )
}

export default MoviesPage