interface ApplicationCardProps {
  company: string
  position: string
  status: string
  onDelete: () => void 
}

function ApplicationCard(props: ApplicationCardProps) {
  return (
    <article>
      <h3>{props.company}</h3>
      <p>Pozisyon: {props.position}</p>
      <p>Durum: {props.status}</p>

      <button type="button" onClick={props.onDelete}>
  Başvuruyu sil
</button>
    </article>

  )
}

export default ApplicationCard