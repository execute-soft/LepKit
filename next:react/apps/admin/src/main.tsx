import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useAuth } from '@/features/auth/store/auth';

const installUnauthorizedSessionHandler = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.addEventListener("execute:auth:unauthorized", () => {
    const currentPath = `${window.location.pathname}${window.location.search}`;
    useAuth.getState().logout();

    if (window.location.pathname !== "/") {
      const nextUrl = `/?reason=session_expired&next=${encodeURIComponent(currentPath)}`;
      window.location.replace(nextUrl);
    }
  });
};

installUnauthorizedSessionHandler();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
