import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import PokemonPage from './pages/PokemonPage';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Navigation/>} >
            <Route index element={<Home/>} ></Route>
            <Route path='pokemon/:id' element={<PokemonPage/>} ></Route>
            <Route path='search' element={<SearchPage/>}></Route>
        </Route>

        <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}

export default AppRouter