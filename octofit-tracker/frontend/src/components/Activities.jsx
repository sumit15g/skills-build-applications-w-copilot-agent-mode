import { useCollection } from '../useCollection.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const { items: activities, status } = useCollection(activitiesEndpoint)

  if (status === 'loading') return <p className="status">Loading activities...</p>
  if (status === 'error') return <p className="status status-error">Unable to load activities.</p>

  return <section>
    <header className="page-heading"><div><span className="eyebrow">Recent movement</span><h1>Activities</h1></div><strong>{activities.length} logged</strong></header>
    {activities.length === 0 ? <p className="status">No activities found.</p> : <div className="table-responsive"><table className="table align-middle">
      <thead><tr><th>Athlete</th><th>Activity</th><th>Duration</th><th>Intensity</th><th>Date</th></tr></thead>
      <tbody>{activities.map((activity) => <tr key={activity._id ?? activity.id}>
        <td>{activity.userId?.username ?? 'Unknown'}</td><td className="text-capitalize">{activity.type?.replace('-', ' ')}</td><td>{activity.duration} min</td>
        <td><span className={`intensity intensity-${activity.intensity}`}>{activity.intensity}</span></td><td>{new Date(activity.date).toLocaleDateString()}</td>
      </tr>)}</tbody>
    </table></div>}
  </section>
}

export default Activities