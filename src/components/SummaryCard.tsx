interface SummaryCardProps {
  title: string
  value: number
}

function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <article className="summary-card">
      <p>{title}</p>
      <strong>{value}</strong>
    </article>
  )
}

export default SummaryCard