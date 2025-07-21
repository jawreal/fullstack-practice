import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import { AuthProvider } from './hooks/useAuthProvider';
import PageFallback from './components/PageFallback';
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Home = lazy(() => import('./pages/Home'));
const Chat = lazy(() => import('./pages/Chat'));
const Chatbot = lazy(() => import('./pages/Chatbot'));
const SendFile = lazy(() => import('./pages/SendFile'));
const Browse = lazy(() => import('./pages/Browse'));

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
        <Route path="/sign-up" element={
          <Suspense fallback={<PageFallback />} >
           <SignUp />
          </Suspense>
        } /> 
        <Route path="/home" element={
          <Suspense fallback={<PageFallback />} >
           <Home />
          </Suspense>
        } />
        <Route path="/chat" element={
          <Suspense fallback={<PageFallback />} >
           <Chat />
          </Suspense>
        } />
        <Route path="/chatbot" element={
          <Suspense fallback={<PageFallback />} >
           <Chatbot />
          </Suspense>
        } />
        <Route path="/send-file" element={
          <Suspense fallback={<PageFallback />} >
           <SendFile />
          </Suspense>
        } />
        <Route path="/browse" element={
          <Suspense fallback={<AuthProvider />} >
           <Browse />
          </Suspense>
        } />
      </Routes>
     </AuthProvider> 
    </Router>
    );
};

export default App;