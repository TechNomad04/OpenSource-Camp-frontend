import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PageGuard from './components/PageGuard';
import { usePageTracking } from './hooks/usePageTracking';
import Login from './pages/Login';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Page6 from './pages/Page6';
import Page7 from './pages/Page7';
import './App.css';

function AppRoutes() {
  const location = useLocation();
  
  // Track page views automatically
  usePageTracking();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        
        {/* Learning Pages - Sequential */}
        <Route
          path="/page/1"
          element={
            <ProtectedRoute>
              <PageGuard pageNumber={1}>
                <Page1 />
              </PageGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/page/2"
          element={
            <ProtectedRoute>
              <PageGuard pageNumber={2}>
                <Page2 />
              </PageGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/page/3"
          element={
            <ProtectedRoute>
              <PageGuard pageNumber={3}>
                <Page3 />
              </PageGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/page/4"
          element={
            <ProtectedRoute>
              <PageGuard pageNumber={4}>
                <Page4 />
              </PageGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/page/5"
          element={
            <ProtectedRoute>
              <PageGuard pageNumber={5}>
                <Page5 />
              </PageGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/page/6"
          element={
            <ProtectedRoute>
              <PageGuard pageNumber={6}>
                <Page6 />
              </PageGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/page/7"
          element={
            <ProtectedRoute>
              <PageGuard pageNumber={7}>
                <Page7 />
              </PageGuard>
            </ProtectedRoute>
          }
        />
        {/* Default route - redirect to first page */}
        <Route path="/" element={<Navigate to="/page/1" replace />} />
        <Route path="*" element={<Navigate to="/page/1" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
