
import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import PsychologistsPage from './pages/PsychologistsPage';
import AccountPage from './pages/AccountPage';
import SettingsDetailPage from './pages/SettingsDetailPage';
import AcademyPage from './pages/AcademyPage';
import PersonalInfoPage from './pages/account/PersonalInfoPage';
import NotificationsPage from './pages/account/NotificationsPage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import DateOfBirthPage from './pages/DateOfBirthPage';
import ProfilePicturePage from './pages/ProfilePicturePage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import { UserProvider, useUser } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import SettingsPage from './pages/SettingsPage';
import ProfessionalDetailsPage from './pages/ProfessionalDetailsPage';
import WorkoutsPage from './pages/WorkoutsPage';
import GroupClassesPage from './pages/GroupClassesPage';
import GroupClassDetailPage from './pages/GroupClassDetailPage';
import RecipesPage from './pages/RecipesPage';
import ArticlesPage from './pages/ArticlesPage';
import CuriositiesPage from './pages/CuriositiesPage';
import PodcastCategoryPage from './pages/PodcastCategoryPage';
import CreatePage from './pages/CreatePage';

const ProtectedLayout: React.FC = () => {
    const { user } = useUser();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

const PublicLayout: React.FC = () => {
    const { user } = useUser();
    if (user) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};


const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes that redirect if logged in */}
        <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/date-of-birth" element={<DateOfBirthPage />} />
            <Route path="/profile-picture" element={<ProfilePicturePage />} />
        </Route>

        {/* Truly public routes */}
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/curiosities" element={<CuriositiesPage />} />
            <Route path="/group-classes" element={<GroupClassesPage />} />
            <Route path="/group-class/:id" element={<GroupClassDetailPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/psychologists" element={<PsychologistsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/detail/:type/:id" element={<DetailPage />} />
            <Route path="/podcasts/:categoryId" element={<PodcastCategoryPage />} />
            <Route path="/account/personal-info" element={<PersonalInfoPage />} />
            <Route path="/account/notifications" element={<NotificationsPage />} />
            <Route path="/account/integrations" element={<SettingsDetailPage title="Integrações" />} />
            <Route path="/account/privacy" element={<SettingsDetailPage title="Privacidade e Dados" />} />
            <Route path="/account/support" element={<SettingsDetailPage title="Ajuda e Suporte" />} />
            <Route path="/account/invite" element={<SettingsDetailPage title="Convidar Amigos" />} />
            <Route path="/account/about" element={<SettingsDetailPage title="Sobre o Synapse" />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/professional-details/:id" element={<ProfessionalDetailsPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const Layout: React.FC = () => {
    const location = useLocation();
    const showNav = !['/login', '/create-account', '/date-of-birth', '/profile-picture'].includes(location.pathname);

    return (
        <div className="w-full h-screen flex bg-slate-100 dark:bg-slate-950">
            {showNav && <SideNav />}
            <div className="flex-1 flex justify-center min-w-0">
                <div className="w-full max-w-2xl bg-white dark:bg-slate-900 md:border-x border-slate-200 dark:border-slate-800 flex flex-col h-screen">
                     <main className="flex-grow overflow-y-auto relative no-scrollbar">
                       <AnimatedRoutes />
                   </main>
                   {showNav && <BottomNav />}
                </div>
            </div>
        </div>
    );
};

const AppContent: React.FC = () => {
    const { isLoading } = useUser();

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return <Layout />;
};


function App(): React.ReactNode {
  return (
    <div className="min-h-screen font-sans bg-slate-100 dark:bg-slate-950">
        <HashRouter>
            <ThemeProvider>
                <UserProvider>
                    <AppContent />
                </UserProvider>
            </ThemeProvider>
        </HashRouter>
    </div>
  );
}

export default App;
