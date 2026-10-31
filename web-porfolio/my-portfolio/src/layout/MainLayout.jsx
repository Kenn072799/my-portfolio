import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Chatbot = lazy(() => import('../components/chatbot/Chatbot'));
export default function MainLayout() {
  return <><Outlet /><Suspense fallback={null}><Chatbot /></Suspense></>;
}
