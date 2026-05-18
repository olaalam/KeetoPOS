import { Navigate, HashRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import LoginPage from '@/components/Login';
import DashboardPage from '@/pages/Dashboard/Dashboard';
import CashierPage from '@/pages/CashierPage';
import PutMoney from '@/pages/PutMoney';
import ShiftPage from '@/pages/ShiftPage';

/**
 * ProtectedRoute component blocks access to pages for unauthenticated users.
 */
export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * PublicRoute component blocks authenticated users from accessing login page again.
 */
export const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/cashier" replace />;
  }

  return children;
};

/**
 * AppRouter handles the navigation system of the application.
 */
export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cashier"
          element={
            <ProtectedRoute>
              <CashierPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/open-shift"
          element={
            <ProtectedRoute>
              <ShiftPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/put-money"
          element={
            <ProtectedRoute>
              <PutMoney />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/cashier" replace />} />
      </Routes>
    </HashRouter>
  );
};
