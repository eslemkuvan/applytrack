import './App.css'

import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import Navigation from './components/Navigation'
import DashboardPage from './pages/DashboardPage'
import ApplicationsPage from './pages/ApplicationsPage'
import type { Application } from './types/Application'

const initialApplications: Application[] = [
  {
    id: 1,
    company: 'Ardıç Teknoloji',
    position: 'Frontend Developer Intern',
    status: 'Başvuruldu',
  },
  {
    id: 2,
    company: 'Paynion',
    position: 'Software Developer Intern',
    status: 'Değerlendiriliyor',
  },
  {
    id: 3,
    company: 'Makrops',
    position: 'Long-Term Intern',
    status: 'Mülakat',
  },
  {
    id: 4,
    company: 'i2i Systems',
    position: 'Long-Term Intern',
    status: 'Tamamlandı',
  },
]

function getInitialApplications(): Application[] {
  const savedApplications = localStorage.getItem(
    'applytrack-applications',
  )

  if (!savedApplications) {
    return initialApplications
  }

  try {
    return JSON.parse(savedApplications) as Application[]
  } catch {
    return initialApplications
  }
}

function App() {
  const [applications, setApplications] =
    useState<Application[]>(getInitialApplications)

  useEffect(() => {
    localStorage.setItem(
      'applytrack-applications',
      JSON.stringify(applications),
    )
  }, [applications])

  return (
    <>
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <main className="app-container">
              <DashboardPage applications={applications} />
            </main>
          }
        />

        <Route
          path="/applications"
          element={
            <ApplicationsPage
              applications={applications}
              onApplicationsChange={setApplications}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App