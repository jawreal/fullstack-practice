import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import { AuthProvider } from './hooks/useAuthProvider';
import PageFallback from './components/PageFallback';
const SignIn = lazy(() => import('./pages/SignIn'));
const Home = lazy(() => import('./pages/Home'));

const App = () => {
  return (
    <Router>
     <AuthProvider> 
      <Routes> 
        <Route path="/sign-in" element={
          <Suspense fallback={<PageFallback />} >
           <SignIn />
          </Suspense>
        } />
        <Route path="/home" element={
          <Suspense fallback={<PageFallback />} >
           <Home />
          </Suspense>
        } />
      </Routes>
     </AuthProvider> 
    </Router>
    );
};

export default App;