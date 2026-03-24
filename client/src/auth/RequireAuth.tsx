import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ScreenLoader } from '@/components/loaders';

import { useAuthContext } from './useAuthContext';

const RequireAuth = () => {
  const { auth, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <ScreenLoader />;
  }
  if (!auth) {
    // Save last attempted URL to redirect after login
    localStorage.setItem("lastPath", location.pathname);

    return (
      <Navigate
        to="/auth/classic/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};

export { RequireAuth };
