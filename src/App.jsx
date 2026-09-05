import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Details from './pages/Details.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<Details />} />
    </>
  ),
  {
    basename: '/movie-app', 
  }
);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
