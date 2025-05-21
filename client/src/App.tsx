import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react';
const SignIn = lazy(() => import('./pages/SignIn'));
const Home = lazy(() => import('./pages/Home'));

const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/sign-in" element={
          <Suspense fallback={<div>loading...</div>} >
           <SignIn />
          </Suspense>
        } />
        <Route path="/home" element={
          <Suspense fallback={<div>loading...</div>} >
           <Home />
          </Suspense>
        } />
      </Routes>
    </Router>
    );
};

export default App;