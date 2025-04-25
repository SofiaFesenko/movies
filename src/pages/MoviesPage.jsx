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
              `https://api.artic.edu/api/v1/artworks/search?q=${query}`
          );          
          setMovie(response.data.data)        
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