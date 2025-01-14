import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { SignedOut, RedirectToSignIn, SignedIn, ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.tsx';
import '@mantine/core/styles.css';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient.ts';

const HomePage = lazy(() => import('./pages/HomePage.tsx'));
const CreateServerModal = lazy(() => import('./components/modals/CreateServerModal.tsx'));

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
                <Suspense fallback={<div>Loading...</div>}>
                  <CreateServerModal />
                  <HomePage />
                </Suspense>
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
    <ApolloProvider client={client}>
      <MantineProvider>
        <Router>
          <RouterComponent />
        </Router>
      </MantineProvider>
    </ApolloProvider>
  );
} else {
  console.error('루트 요소를 찾을 수 없습니다.');
}
