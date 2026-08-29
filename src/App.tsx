import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Footer from './components/Footer'
import SiteHeader from './components/SiteHeader'
import FigJamCursor from './components/figjam/FigJamCursor'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'

const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const Resume = lazy(() => import('./pages/Resume'))
const CaseStudyTemplate = lazy(() => import('./pages/CaseStudyTemplate'))

function AppRoutes() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/#about-bento" replace />} />
          <Route path="/projects" element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Projects />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Contact />
            </Suspense>
          } />
          <Route path="/resume" element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Resume />
            </Suspense>
          } />
          <Route path="/work/case-study-template" element={<Navigate to="/work/porvenix" replace />} />
          <Route path="/work/:slug" element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <CaseStudyTemplate />
            </Suspense>
          } />
        </Routes>
      </main>
      {!isHome && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <div className="app-shell min-h-screen text-slate-900">
      <FigJamCursor />
      <ScrollToTop />
      <SiteHeader />
      <AppRoutes />
    </div>
  )
}
