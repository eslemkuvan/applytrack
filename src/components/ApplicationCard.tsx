interface ApplicationCardProps {
  company: string
  position: string
  status: string
  onDelete: () => void 
  onEdit: () => void
}

function ApplicationCard(props: ApplicationCardProps) {
 return (
  <article className="application-card">
    <div className="card-content">
      <span className="status-badge">{props.status}</span>
      <h3>{props.company}</h3>
      <p>{props.position}</p>
    </div>

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