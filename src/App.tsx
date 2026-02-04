import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { authRoutes, commonRoutes, protectedRoutes } from './constants/constants';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './services/redux/store';
import NotFound from './pages/NotFound/not-found';
import { Suspense, lazy, useEffect } from 'react';
import { getItemFromStorage } from './utils/localstorage.utils';
import { login } from './services/redux/slices/auth.slice';
import type { User } from './types/user.types';

const GoogleLogin = lazy(() => import('./pages/GoogleLogin/GoogleLogin'));

// Loading component for Suspense fallback
const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-48 bg-muted rounded-md" />
        <div className="h-10 w-64 bg-muted rounded-full" />
      </div>

      {/* Hero Banner Skeleton */}
      <div className="h-64 w-full bg-muted rounded-2xl mb-10" />

      {/* Category Pills Skeleton */}
      <div className="flex gap-3 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 bg-muted rounded-full"
          />
        ))}
      </div>

      {/* Game Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-muted rounded-xl p-4 space-y-3"
          >
            <div className="h-36 bg-muted-foreground/20 rounded-lg" />
            <div className="h-4 w-3/4 bg-muted-foreground/20 rounded" />
            <div className="h-4 w-1/2 bg-muted-foreground/20 rounded" />
          </div>
        ))}
      </div>

      {/* Optional Loading Text */}
    </div>
  );
};


export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

const Navigator = () => {
  const user = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch()

  useEffect(() => {
    getLoggedInUser()
  }, [])

  const getLoggedInUser = () => {
    const user = getItemFromStorage<User | null>("user");
    if (user) {
      dispatch(login(user))
    }
  }

  return <Router>
    <div className="app-container">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {
            (commonRoutes.concat(authRoutes)).map((r) => {
              return <Route key={r.path} path={r.path} element={<r.element />} />
            })
          }

          {
            user.accessToken && protectedRoutes.map((r) => {
              return <Route key={r.path} path={r.path} element={<r.element />} />
            })
          }
          <Route path={'/auth/google/google-callback/oauth/login'} element={<GoogleLogin />} />

          <Route path='*' element={<NotFound />} />

        </Routes>
      </Suspense>
    </div>
  </Router>
}