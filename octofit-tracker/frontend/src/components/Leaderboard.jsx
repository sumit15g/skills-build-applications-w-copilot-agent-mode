import { useCollection } from '../useCollection.js'

function Leaderboard() {
  const { items: leaders, status } = useCollection('/api/leaderboard/')

  if (status === 'loading') return <p className="status">Loading leaderboard...</p>
  if (status === 'error') return <p className="status status-error">Unable to load leaderboard.</p>

  return <section>
    <header className="page-heading"><div><span className="eyebrow">Season standings</span><h1>Leaderboard</h1></div><strong>{leaders.length} ranked</strong></header>
    {leaders.length === 0 ? <p className="status">No rankings found.</p> : <div className="table-responsive"><table className="table align-middle">
      <thead><tr><th>Rank</th><th>Athlete</th><th>Team</th><th>Points</th><th>Activities</th></tr></thead>
      <tbody>{leaders.map((entry) => <tr key={entry._id ?? entry.id}>
        <td><span className="rank">{entry.rank}</span></td><td>{entry.userId?.username ?? 'Unknown'}</td><td>{entry.teamId?.name ?? 'Independent'}</td><td className="metric">{entry.totalPoints?.toLocaleString()}</td><td>{entry.activitiesCount}</td>
      </tr>)}</tbody>
    </table></div>}
  </section>
}

export default Leaderboard