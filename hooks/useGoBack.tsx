
import * as ReactRouterDOM from 'react-router-dom';
import { useCallback } from 'react';

/**
 * A custom hook to provide a robust "go back" navigation.
 * If there's a previous page in the session history, it navigates back.
 * Otherwise, it navigates to a fallback route (defaults to '/').
 * This prevents the user from exiting the app unexpectedly when clicking a back button
 * on a page they landed on directly.
 */
export const useGoBack = (fallbackPath: string = '/') => {
    const navigate = ReactRouterDOM.useNavigate();
    const location = ReactRouterDOM.useLocation();

    const goBack = useCallback(() => {
        // The 'default' key is assigned to the first entry in the history stack.
        // If we are on the first page, location.key will be 'default'.
        if (location.key !== 'default') {
            navigate(-1);
        } else {
            navigate(fallbackPath, { replace: true });
        }
    }, [location.key, navigate, fallbackPath]);

    return goBack;
};
