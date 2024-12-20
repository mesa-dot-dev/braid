import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import './app.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRouter } from './lib/router';
import { hc, queryClient } from './lib/clients';
import { userStore } from './data/user';
import { Provider } from 'jotai';

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log('All env variables:', import.meta.env);

const router = createRouter(queryClient);

const App = () => {
  return <RouterProvider router={router} context={{ queryClient, hc }} />;
};

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={userStore}>
          <ClerkProvider
            publishableKey={CLERK_KEY}
            routerReplace={(to: string) => router.navigate({ to, replace: true })}
            routerPush={(to: string) => router.navigate({ to, replace: false })}
            afterSignOutUrl="/sign-in"
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
          >
            <App />
          </ClerkProvider>
        </Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>
  );
}
