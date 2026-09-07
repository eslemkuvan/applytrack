import { useState, type FormEvent } from 'react'
import ApplicationCard from '../components/ApplicationCard'
import type { Application } from '../types/Application'

interface ApplicationsPageProps {
  applications: Application[]
  onApplicationsChange: (applications: Application[]) => void
}

function ApplicationsPage({
  applications,
  onApplicationsChange,
}: ApplicationsPageProps) {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('Başvuruldu')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tümü')
  const [editingId, setEditingId] = useState<number | null>(null)

  function resetForm() {
    setCompany('')
    setPosition('')
    setStatus('Başvuruldu')
    setEditingId(null)
  }

  function handleSubmitApplication(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const trimmedCompany = company.trim()
    const trimmedPosition = position.trim()

    if (trimmedCompany === '' || trimmedPosition === '') {
      return
    }

    if (editingId !== null) {
      const updatedApplications = applications.map((application) =>
        application.id === editingId
          ? {
              ...application,
              company: trimmedCompany,
              position: trimmedPosition,
              status,
            }
          : application,
      )

      onApplicationsChange(updatedApplications)
    } else {
      const newApplication: Application = {
        id: Date.now(),
        company: trimmedCompany,
        position: trimmedPosition,
        status,
      }

      onApplicationsChange([...applications, newApplication])
    }

    resetForm()
  }

  function handleEditApplication(application: Application) {
    setEditingId(application.id)
    setCompany(application.company)
    setPosition(application.position)
    setStatus(application.status)
  }

  function handleDeleteApplication(id: number) {
    const updatedApplications = applications.filter(
      (application) => application.id !== id,
    )

    onApplicationsChange(updatedApplications)
  }

  const normalizedSearchTerm = searchTerm
    .trim()
    .toLocaleLowerCase('tr-TR')

  const filteredApplications = applications.filter((application) => {
    const searchableText =
      `${application.company} ${application.position}`.toLocaleLowerCase(
        'tr-TR',
      )

    const matchesSearch =
      searchableText.includes(normalizedSearchTerm)

    const matchesStatus =
      statusFilter === 'Tümü' ||
      application.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <main className="app-container">
      <header className="app-header">
        <p className="eyebrow">BAŞVURU YÖNETİMİ</p>
        <h1>Başvurular</h1>
        <p>İş ve staj başvurularını buradan yönet.</p>
      </header>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">BAŞVURU FORMU</p>

            <h2>
              {editingId !== null
                ? 'Başvuruyu düzenle'
                : 'Yeni başvuru ekle'}
            </h2>
          </div>
        </div>

        <form
          className="application-form"
          onSubmit={handleSubmitApplication}
        >
          <div className="form-group">
            <label htmlFor="company">Şirket adı</label>

            <input
              id="company"
              type="text"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="Örneğin: Turkcell"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Pozisyon</label>

            <input
              id="position"
              type="text"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
              placeholder="Örneğin: Frontend Developer Intern"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Başvuru durumu</label>

            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="Başvuruldu">Başvuruldu</option>
              <option value="Değerlendiriliyor">
                Değerlendiriliyor
              </option>
              <option value="Mülakat">Mülakat</option>
              <option value="Teklif">Teklif</option>
              <option value="Olumsuz">Olumsuz</option>
              <option value="Tamamlandı">Tamamlandı</option>
            </select>
          </div>

          <div className="form-actions">
            <button className="primary-button" type="submit">
              {editingId !== null
                ? 'Değişiklikleri kaydet'
                : 'Başvuruyu ekle'}
            </button>

            {editingId !== null && (
              <button
                className="secondary-button"
                type="button"
                onClick={resetForm}
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">BAŞVURU LİSTESİ</p>
            <h2>Başvurularım</h2>
          </div>

          <span>
            {filteredApplications.length} kayıt gösteriliyor
          </span>
        </div>

        <div className="filters-grid">
          <div className="form-group">
            <label htmlFor="search">Başvurularda ara</label>

            <input
              id="search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Şirket veya pozisyon ara"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status-filter">
              Duruma göre filtrele
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="Tümü">Tümü</option>
              <option value="Başvuruldu">Başvuruldu</option>
              <option value="Değerlendiriliyor">
                Değerlendiriliyor
              </option>
              <option value="Mülakat">Mülakat</option>
              <option value="Teklif">Teklif</option>
              <option value="Olumsuz">Olumsuz</option>
              <option value="Tamamlandı">Tamamlandı</option>
            </select>
          </div>
        </div>
      </section>

      <section
        className="application-grid"
        aria-label="Başvuru listesi"
      >
        {filteredApplications.length === 0 ? (
          <p className="empty-message">
            Aramanıza uygun başvuru bulunamadı.
          </p>
        ) : (
          filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              company={application.company}
              position={application.position}
              status={application.status}
              onEdit={() => handleEditApplication(application)}
              onDelete={() =>
                handleDeleteApplication(application.id)
              }
            />
          ))
        )}
      </section>
    </main>
  )
}

export default ApplicationsPage