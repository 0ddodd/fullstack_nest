import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { SignedOut, RedirectToSignIn, SignedIn, ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.tsx';
import HomePage from './pages/HomePage.tsx';
import '@mantine/core/styles.css';

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
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </ClerkProvider>
  );
};


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  
  root.render(
    <MantineProvider>
      <Router>
        <RouterComponent />
      </Router>
    </MantineProvider>
  );
} else {
  console.error('루트 요소를 찾을 수 없습니다.');
}
