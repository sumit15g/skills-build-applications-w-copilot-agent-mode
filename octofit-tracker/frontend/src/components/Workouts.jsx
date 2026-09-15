import { useCollection } from '../useCollection.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const { items: workouts, status } = useCollection(workoutsEndpoint)

  if (status === 'loading') return <p className="status">Loading workouts...</p>
  if (status === 'error') return <p className="status status-error">Unable to load workouts.</p>

  return <section>
    <header className="page-heading"><div><span className="eyebrow">Training library</span><h1>Workouts</h1></div><strong>{workouts.length} plans</strong></header>
    {workouts.length === 0 ? <p className="status">No workouts found.</p> : <div className="table-responsive"><table className="table align-middle">
      <thead><tr><th>Workout</th><th>Athlete</th><th>Level</th><th>Duration</th><th>Exercises</th></tr></thead>
      <tbody>{workouts.map((workout) => <tr key={workout._id ?? workout.id}>
        <td><strong>{workout.name}</strong><small>{workout.description}</small></td><td>{workout.userId?.username ?? 'Unassigned'}</td><td className="text-capitalize">{workout.difficulty}</td><td>{workout.duration} min</td><td>{workout.exercises?.length ?? 0}</td>
      </tr>)}</tbody>
    </table></div>}
  </section>
}

export default Workouts