
import React, { Suspense } from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import Home from './components/Home'; 

import Footer from './Footer';
import FilterList from './components/FilterList'
import 'react-loading-skeleton/dist/skeleton.css'
import './Fonts.css'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorBoundary'
const Signup = React.lazy(() => import('./components/Signup'));
const Phonecat = React.lazy(() => import('./components/Phonecat'));
const Category = React.lazy(() => import('./components/Category'));
const PhoneNoti = React.lazy(() => import('./components/PhoneNoti'));
const Login = React.lazy(() => import('./components/Login'));
const Profile = React.lazy(() => import('./components/Profile'));
const ConfessionCreate = React.lazy(() => import('./components/ConfessionCreate'));
const Post = React.lazy(() => import('./components/Post'));


function App() {
  const isAuthenticated = !!localStorage.getItem("token");


  return (
    <div className="App">
      <Navbar/>

      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {
          window.location.href='/'
    }}>

          <Suspense fallback={<LoadingComment/>}>
        <Routes>

      <Route exact  path="/"  element={<Home />} />
      <Route exact  path="/:id"  element={<FilterList />} />
      <Route  path="/signup"  element={isAuthenticated?<Home />:<Signup/>} />
      <Route   path="/post/:id"   element={<Post />} />
      <Route  path="/login"  element={isAuthenticated?<Home />:<Login/>} />
      <Route  path="/create" element={isAuthenticated?<ConfessionCreate />:<Signup/>} />
      <Route   path="/profile" element={isAuthenticated?<Profile />:<Login/>} />
      <Route  path="/phonecategory"  element={<Phonecat />} />
      <Route  path="/notifications"  element={<PhoneNoti />} />
      <Route  path="/category/:id"  element={<Category />} />
    </Routes>
      </Suspense>
      </ErrorBoundary>

    <script src="/build/client.entry.js" />
    <Footer/>


    </div>
  );
}

export default App;
function LoadingComment(){
  return(
      <div className="spinner-center    fixheight"  >
      <Spinner animation="border" role="status" style={{    position: 'absolute',top: '50%',left: '50%'}} size='lg' >
      <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>

  )
}
