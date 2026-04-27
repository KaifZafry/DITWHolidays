
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import $ from 'jquery';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Services from './components/Services';

import Rail from './components/Rail';

import Transfer from './components/Transfer';
import { Suspense, lazy } from 'react';
import ScrollToTop from './components/ScrollToTop';
import AdminDashboard, { AdminHome } from './admin/AdminDashboard';
import AddPackage from './admin/AddPackage';
import AllPackages from './admin/AllPackages';
import EditPackage from './admin/EditPackage';
import AdminAuthProvider from './admin/AdminAuthProvider';
import RequireAdmin from './admin/RequireAdmin';
import AdminLogin from './admin/AdminLogin';
const About = lazy(() => import('./components/About'));
const Packages = lazy(() => import('./components/Packages'));
const PackageDetails = lazy(() => import('./components/PackageDetails'));
const Contact = lazy(() => import('./components/Contact'));

if (typeof window !== 'undefined') {
  window.$ = window.$ ?? $;
  window.jQuery = window.jQuery ?? $;
}

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin' || location.pathname.startsWith('/admin/');

  return (
    <>
      {!isAdminRoute && <Header />}
      <ScrollToTop />
      <Suspense fallback={<div className="d-flex justify-content-center align-items-center vh-100 fs-5 fw-semibold text-primary">Loading...</div>}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/package" element={<Packages />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/rail" element={<Rail />} />
      
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>}>
          <Route index element={<AdminHome />} />
          <Route path="add-package" element={<AddPackage />} />
          <Route path="packages" element={<AllPackages />} />
          <Route path="edit/:id" element={<EditPackage />} />
        </Route>
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}

    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <AppShell />
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App
