import { Link } from 'react-router'
interface ApplicationCardProps {
   applicationId: number
  company: string
  position: string
  status: string
  applicationDate: string
  onDelete: () => void
  onEdit: () => void

}

function ApplicationCard(props: ApplicationCardProps ) {
  const formattedApplicationDate = props.applicationDate
    ? new Intl.DateTimeFormat('tr-TR').format(
        new Date(`${props.applicationDate}T00:00:00`),
      )
    : 'Belirtilmedi'

  return (
    <article className="application-card">
      <div className="card-content">
        <span className="status-badge">{props.status}</span>
        <h3>{props.company}</h3>
        <p>{props.position}</p>
        <p>Başvuru tarihi: {formattedApplicationDate}</p>
      </div>
      
      <Link
  className="edit-button"
  to={`/applications/${props.applicationId}`}
>
  Detay
</Link>

      <div className="card-actions">
        <button
          className="edit-button"
          type="button"
          onClick={props.onEdit}
        >
          Düzenle
        </button>

        <button
          className="delete-button"
          type="button"
          onClick={props.onDelete}
        >
          Sil
        </button>
      </div>
    </article>
  )
}

export default ApplicationCard