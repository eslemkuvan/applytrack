import { Link, useParams } from 'react-router'
import type { Application } from '../types/Application'

interface ApplicationDetailPageProps {
  applications: Application[]
}

function ApplicationDetailPage({
  applications,
}: ApplicationDetailPageProps) {
  const { id } = useParams()

  const application = applications.find(
    (currentApplication) =>
      currentApplication.id === Number(id),
  )

  if (!application) {
    return (
      <main className="app-container">
        <section className="panel">
          <p className="eyebrow">KAYIT BULUNAMADI</p>
          <h1>Başvuru bulunamadı</h1>

          <p>
            Aradığınız başvuru silinmiş veya mevcut olmayabilir.
          </p>

          <Link
            className="secondary-button"
            to="/applications"
          >
            Başvurulara dön
          </Link>
        </section>
      </main>
    )
  }

  const formattedDate = application.applicationDate
    ? new Intl.DateTimeFormat('tr-TR').format(
        new Date(`${application.applicationDate}T00:00:00`),
      )
    : 'Belirtilmedi'

  return (
    <main className="app-container">
      <header className="app-header">
        <p className="eyebrow">BAŞVURU DETAYI</p>
        <h1>{application.company}</h1>
        <p>{application.position}</p>
      </header>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">BAŞVURU BİLGİLERİ</p>
            <h2>Başvuru özeti</h2>
          </div>

          <span className="status-badge">
            {application.status}
          </span>
        </div>

        <p>
          <strong>Şirket:</strong> {application.company}
        </p>

        <p>
          <strong>Pozisyon:</strong> {application.position}
        </p>

        <p>
          <strong>Başvuru tarihi:</strong> {formattedDate}
        </p>

        <Link
          className="secondary-button"
          to="/applications"
        >
          Başvurulara dön
        </Link>
      </section>
    </main>
  )
}

export default ApplicationDetailPage