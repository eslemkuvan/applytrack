import './App.css'

import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import Navigation from './components/Navigation'
import DashboardPage from './pages/DashboardPage'
import ApplicationsPage from './pages/ApplicationsPage'
import type { Application } from './types/Application'
import ApplicationDetailPage from './pages/ApplicationDetailPage'

const initialApplications: Application[] = [
  {
    id: 1,
    company: 'Ardıç Teknoloji',
    position: 'Frontend Developer Intern',
    status: 'Başvuruldu',
    applicationDate: '2026-08-24',
  },
  {
    id: 2,
    company: 'Paynion',
    position: 'Software Developer Intern',
    status: 'Değerlendiriliyor',
    applicationDate: '2026-08-24',
  },
  {
    id: 3,
    company: 'Makrops',
    position: 'Long-Term Intern',
    status: 'Mülakat',
    applicationDate: '2026-08-24',
  },
  {
    id: 4,
    company: 'i2i Systems',
    position: 'Long-Term Intern',
    status: 'Tamamlandı',
    applicationDate: '2026-08-24',
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
  const parsedApplications = JSON.parse(
    savedApplications,
  ) as SavedApplication[]

  return parsedApplications.map((application) => ({
    ...application,
    applicationDate: application.applicationDate ?? '',
  }))
} catch {
  return initialApplications
}
}
type SavedApplication = Omit<Application, 'applicationDate'> & {
  applicationDate?: string
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

  <Route
    path="/applications/:id"
    element={
      <ApplicationDetailPage
        applications={applications}
      />
    }
  />
</Routes>
    </>
  )
}

export default App