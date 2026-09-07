import SummaryCard from '../components/SummaryCard'
import type { Application } from '../types/Application'

interface DashboardPageProps {
  applications: Application[]
}

function DashboardPage({
  applications,
}: DashboardPageProps) {
  const appliedCount = applications.filter(
    (application) => application.status === 'Başvuruldu',
  ).length

  const interviewCount = applications.filter(
    (application) => application.status === 'Mülakat',
  ).length

  const offerCount = applications.filter(
    (application) => application.status === 'Teklif',
  ).length

  return (
    <>
      <header className="app-header">
        <p className="eyebrow">KARİYER TAKİP PANELİ</p>
        <h1>ApplyTrack</h1>
        <p>Staj ve iş başvurularını tek yerde takip et.</p>
      </header>

      <section
        className="summary-grid"
        aria-label="Başvuru özeti"
      >
        <SummaryCard
          title="Toplam Başvuru"
          value={applications.length}
        />

        <SummaryCard
          title="Başvuruldu"
          value={appliedCount}
        />

        <SummaryCard
          title="Mülakat"
          value={interviewCount}
        />

        <SummaryCard
          title="Teklif"
          value={offerCount}
        />
      </section>
    </>
  )
}

export default DashboardPage