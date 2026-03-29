import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import AuthLogin from './pages/AuthLogin';
import OnboardingAndLanding from './pages/OnboardingAndLanding';
import ResumeUpload from './pages/ResumeUpload';
import Loading from './pages/Loading';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';
import DashboardEmptyAnalysisHistory from './pages/DashboardEmtpyAnalysisHistory';
import MockInterview from './pages/MockInterview';
import Profile from './pages/Profile';

const STORAGE_KEYS = {
  auth: 'careerlens.authenticated',
  onboarding: 'careerlens.onboardingComplete',
  hasAnalysisHistory: 'careerlens.hasAnalysisHistory',
  darkMode: 'careerlens.darkMode',
};

function readBool(key, fallback = false) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return raw === 'true';
  } catch {
    return fallback;
  }
}

function ProtectedRoute({ isAllowed, redirectTo, children }) {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children;
}

function AuthPage({ isAuthenticated, onboardingComplete, onAuthSuccess }) {
  if (isAuthenticated) {
    return <Navigate to={onboardingComplete ? '/landing' : '/onboarding'} replace />;
  }
  return <AuthLogin onAuthSuccess={onAuthSuccess} />;
}

function DashboardPage({
  hasAnalysisHistory,
  onOpenProfile,
  onOpenResumeAnalysis,
  onOpenMockInterview,
  onOpenLanding,
  isDarkMode,
  onToggleTheme,
}) {
  if (hasAnalysisHistory) {
    return (
      <Dashboard
        onOpenProfile={onOpenProfile}
        onOpenResumeAnalysis={onOpenResumeAnalysis}
        onOpenMockInterview={onOpenMockInterview}
        onOpenLanding={onOpenLanding}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />
    );
  }
  return (
    <DashboardEmptyAnalysisHistory
      onOpenProfile={onOpenProfile}
      onOpenResumeAnalysis={onOpenResumeAnalysis}
      onOpenMockInterview={onOpenMockInterview}
      onOpenLanding={onOpenLanding}
      isDarkMode={isDarkMode}
      onToggleTheme={onToggleTheme}
    />
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(() => readBool(STORAGE_KEYS.auth, false));
  const [onboardingComplete, setOnboardingComplete] = useState(() =>
    readBool(STORAGE_KEYS.onboarding, false),
  );
  const [hasAnalysisHistory, setHasAnalysisHistory] = useState(() =>
    readBool(STORAGE_KEYS.hasAnalysisHistory, false),
  );
  const [isDarkMode, setIsDarkMode] = useState(() => readBool(STORAGE_KEYS.darkMode, true));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.auth, String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.onboarding, String(onboardingComplete));
  }, [onboardingComplete]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.hasAnalysisHistory, String(hasAnalysisHistory));
  }, [hasAnalysisHistory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.darkMode, String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const baseColor = isDarkMode ? '#0C0A09' : '#F6F4EE';
    document.documentElement.style.backgroundColor = baseColor;
    document.body.style.backgroundColor = baseColor;
  }, [isDarkMode]);

  const handlers = useMemo(
    () => ({
      openDashboard: () => navigate('/dashboard'),
      openProfile: () => navigate('/profile'),
      openMockInterview: () => navigate('/mock-interview'),
      openResumeUpload: () => navigate('/resume-upload'),
      openLanding: () => navigate('/landing'),
      openLoading: () => navigate('/loading'),
      openResults: () => navigate('/results'),
      openAuth: () => navigate('/auth'),
    }),
    [navigate],
  );

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    navigate(onboardingComplete ? '/landing' : '/onboarding');
  };

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
    navigate('/landing');
  };

  const handleLoadingComplete = () => {
    setHasAnalysisHistory(true);
    handlers.openResults();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setOnboardingComplete(false);
    setHasAnalysisHistory(false);
    handlers.openAuth();
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthPage
            isAuthenticated={isAuthenticated}
            onboardingComplete={onboardingComplete}
            onAuthSuccess={handleAuthSuccess}
          />
        }
      />

      <Route
        path="/auth"
        element={
          <AuthPage
            isAuthenticated={isAuthenticated}
            onboardingComplete={onboardingComplete}
            onAuthSuccess={handleAuthSuccess}
          />
        }
      />

      <Route
        path="/onboarding"
        element={
          <ProtectedRoute isAllowed={isAuthenticated} redirectTo="/auth">
            {onboardingComplete ? (
              <Navigate to="/landing" replace />
            ) : (
              <OnboardingAndLanding
                startOnboarding
                onOnboardingComplete={handleOnboardingComplete}
                onOpenLanding={handlers.openLanding}
                onOpenDashboard={handlers.openDashboard}
                onOpenProfile={handlers.openProfile}
                onOpenMockInterview={handlers.openMockInterview}
                onOpenResumeAnalysis={handlers.openResumeUpload}
                isDarkMode={isDarkMode}
                onToggleTheme={toggleDarkMode}
              />
            )}
          </ProtectedRoute>
        }
      />

      <Route
        path="/landing"
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && onboardingComplete}
            redirectTo={isAuthenticated ? '/onboarding' : '/auth'}
          >
            <OnboardingAndLanding
              startOnboarding={false}
              onOnboardingComplete={handleOnboardingComplete}
              onOpenLanding={handlers.openLanding}
              onOpenDashboard={handlers.openDashboard}
              onOpenProfile={handlers.openProfile}
              onOpenMockInterview={handlers.openMockInterview}
              onOpenResumeAnalysis={handlers.openResumeUpload}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-upload"
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && onboardingComplete}
            redirectTo={isAuthenticated ? '/onboarding' : '/auth'}
          >
            <ResumeUpload
              onLaunchAnalysis={handlers.openLoading}
              onReturnToLanding={handlers.openLanding}
              onOpenDashboard={handlers.openDashboard}
              onOpenProfile={handlers.openProfile}
              onOpenMockInterview={handlers.openMockInterview}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/loading"
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && onboardingComplete}
            redirectTo={isAuthenticated ? '/onboarding' : '/auth'}
          >
            <Loading
              onComplete={handleLoadingComplete}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && onboardingComplete}
            redirectTo={isAuthenticated ? '/onboarding' : '/auth'}
          >
            <Results
              onOpenDashboard={handlers.openDashboard}
              onOpenResumeAnalysis={handlers.openResumeUpload}
              onOpenMockInterview={handlers.openMockInterview}
              onOpenProfile={handlers.openProfile}
              onOpenLanding={handlers.openLanding}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && onboardingComplete}
            redirectTo={isAuthenticated ? '/onboarding' : '/auth'}
          >
            <DashboardPage
              hasAnalysisHistory={hasAnalysisHistory}
              onOpenProfile={handlers.openProfile}
              onOpenResumeAnalysis={handlers.openResumeUpload}
              onOpenMockInterview={handlers.openMockInterview}
              onOpenLanding={handlers.openLanding}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && onboardingComplete}
            redirectTo={isAuthenticated ? '/onboarding' : '/auth'}
          >
            <Profile
              onBackToDashboard={handlers.openDashboard}
              onLogout={handleLogout}
              onOpenResumeAnalysis={handlers.openResumeUpload}
              onOpenMockInterview={handlers.openMockInterview}
              onOpenLanding={handlers.openLanding}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mock-interview"
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && onboardingComplete}
            redirectTo={isAuthenticated ? '/onboarding' : '/auth'}
          >
            <MockInterview
              onOpenDashboard={handlers.openDashboard}
              onOpenResumeAnalysis={handlers.openResumeUpload}
              onOpenProfile={handlers.openProfile}
              onOpenLanding={handlers.openLanding}
              onReturnToLanding={handlers.openLanding}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AppRoutes />;
}
