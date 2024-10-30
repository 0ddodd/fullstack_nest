import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import '@mantine/core/style.css';
import { MantineProvider } from '@mantine/core';
import { SignedOut, RedirectToSignIn, SignedIn, ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.tsx';
import HomePage from './pages/HomePage.tsx';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const RouterComponent = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      // navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<RootLayout/>}/>
        <Route 
          index
          element = {
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }></Route>
      </Routes>
    </ClerkProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <Router>
        <RouterComponent />
      </Router>
    </MantineProvider>
  </StrictMode>,
);

export default RouterComponent;