import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Navigation from './components/Navigation'

const HomePage = lazy(() => import('./pages/HomePage'))
const MoviesPage = lazy(() => import('./pages/MoviesPage'))
const MovieDetalsPage = lazy(() => import('./pages/MovieDetailsPage'))
const MovieReviews = lazy(() => import('./components/MovieReviews '))
const MovieCast = lazy(() => import('./components/MovieCast'))

function App() {


  return (
    <>
    <Navigation/>
    <main>
      <Suspense fallback={<div>Почекайте...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetalsPage />} >
            <Route path="cast" element={<MovieCast/>}/>
            <Route path="reviews" element={<MovieReviews/>}/>
          </Route>
        </Routes>
      </Suspense>
      
    </main>
    
    </>
  )
}

export default App
