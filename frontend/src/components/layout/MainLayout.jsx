import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar.jsx";
import Footer from "./Footer.jsx";
import ChatWidget from "../common/ChatWidget.jsx";
import ErrorBoundary from "../common/ErrorBoundary.jsx";

// Navbar and Footer are intentionally not implemented yet — those are
// Phase 2 and Phase 10. This shell just establishes the page skeleton.
function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ErrorBoundary>
        <ChatWidget />
      </ErrorBoundary>
    </>
  );
}

export default MainLayout;
