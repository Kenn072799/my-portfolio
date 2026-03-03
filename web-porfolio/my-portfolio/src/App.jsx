import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import RecentProjectPage from "./pages/RecentProjectPage";
import RecentCertificatePage from "./pages/RecentCertificatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="recent-project" element={<RecentProjectPage />} />
          <Route
            path="recent-certification"
            element={<RecentCertificatePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
