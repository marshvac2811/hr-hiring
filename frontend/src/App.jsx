import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import JobsList from './pages/JobsList';
import JobDetail from './pages/JobDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminPipeline from './pages/AdminPipeline';

export default function App() {
  return (
    <BrowserRouter>
      <div className="topbar">
        <div className="topbar-inner">
          <Link className="brand" to="/">HR Hiring</Link>
          <div className="nav-links">
            <Link to="/">Openings</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<JobsList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/jobs/:id" element={<AdminPipeline />} />
      </Routes>
    </BrowserRouter>
  );
}
