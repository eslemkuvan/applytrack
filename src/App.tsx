import './App.css'

import ApplicationCard from './components/ApplicationCard'

import { useEffect, useState, type FormEvent } from 'react'

interface Application {
  id: number
  company: string
  position: string
  status: string
}
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
 const [company, setCompany] = useState('')
 const [position, setPosition] = useState('')
const [status, setStatus] = useState('Başvuruldu')
const [searchTerm, setSearchTerm] = useState('')
const [statusFilter, setStatusFilter] = useState('Tümü')

useEffect(() => {
  localStorage.setItem(
    'applytrack-applications',
    JSON.stringify(applications),
  )
}, [applications])

function handleAddApplication(event: FormEvent<HTMLFormElement>) {
 event.preventDefault()

    if (company.trim() === '' || position.trim() === '') {
    return
  } 
  const newApplication = {
    id: Date.now(),
    company: company.trim(),
    position: position.trim(),
    status: 'Başvuruldu',
  }

  setApplications([...applications, newApplication])
  setCompany (' ')
  setPosition('')
  setStatus('Başvuruldu')
}
function handleDeleteApplication(id: number) {
  const updatedApplications = applications.filter(
    (application) => application.id !== id,
  )

  setApplications(updatedApplications)
} 

const normalizedSearchTerm = searchTerm
  .trim()
  .toLocaleLowerCase('tr-TR')

const filteredApplications = applications.filter((application) => {
  const searchableText =
    `${application.company} ${application.position}`.toLocaleLowerCase('tr-TR')

  const matchesSearch = searchableText.includes(normalizedSearchTerm)

  const matchesStatus =
    statusFilter === 'Tümü' || application.status === statusFilter

  return matchesSearch && matchesStatus
})







   return (
    <main>
      <h1>ApplyTrack</h1>
      <p>Staj ve iş başvurularını tek yerde takip et.</p>

      <h2>Toplam Başvuru: {applications.length}</h2>
       
       

       <form onSubmit={handleAddApplication}>
  <div>
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

  <div>
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

  <div>
    <label htmlFor="status">Başvuru durumu</label>

    <select
      id="status"
      value={status}
      onChange={(event) => setStatus(event.target.value)}
    >
      <option value="Başvuruldu">Başvuruldu</option>
      <option value="Değerlendiriliyor">Değerlendiriliyor</option>
      <option value="Mülakat">Mülakat</option>
      <option value="Teklif">Teklif</option>
      <option value="Olumsuz">Olumsuz</option>
    </select>
  </div>


  <button type="submit">Başvuruyu ekle</button>
</form>

<div>
  <label htmlFor="search">Başvurularda ara</label>

  <input
    id="search"
    type="search"
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    placeholder="Şirket veya pozisyon ara"
  />
</div>

<div>
  <label htmlFor="status-filter">Duruma göre filtrele</label>

  <select
    id="status-filter"
    value={statusFilter}
    onChange={(event) => setStatusFilter(event.target.value)}
  >
    <option value="Tümü">Tümü</option>
    <option value="Başvuruldu">Başvuruldu</option>
    <option value="Değerlendiriliyor">Değerlendiriliyor</option>
    <option value="Mülakat">Mülakat</option>
    <option value="Teklif">Teklif</option>
    <option value="Olumsuz">Olumsuz</option>
  </select>
</div>

      
<section>
  {filteredApplications.length === 0 ? (
    <p>Aramanıza uygun başvuru bulunamadı.</p>
  ) : (
    filteredApplications.map((application) => (
      <ApplicationCard
        key={application.id}
        company={application.company}
        position={application.position}
        status={application.status}
        onDelete={() => handleDeleteApplication(application.id)}
      />
    ))
  )}
</section>
     

      
    </main>
  )
}

export default App