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
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

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