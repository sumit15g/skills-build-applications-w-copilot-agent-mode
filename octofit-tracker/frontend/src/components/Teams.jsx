import { useCollection } from '../useCollection.js'

function Teams() {
  const { items: teams, status } = useCollection('teams')

  if (status === 'loading') return <p className="status">Loading teams...</p>
  if (status === 'error') return <p className="status status-error">Unable to load teams.</p>

  return <section>
    <header className="page-heading"><div><span className="eyebrow">Train together</span><h1>Teams</h1></div><strong>{teams.length} squads</strong></header>
    {teams.length === 0 ? <p className="status">No teams found.</p> : <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id ?? team.id}>
      <div className="team-mark">{team.name?.slice(0, 2).toUpperCase()}</div><div><h2>{team.name}</h2><p>{team.description || 'Focused on moving further, together.'}</p></div>
      <dl><div><dt>Captain</dt><dd>{team.leader?.username ?? 'Unassigned'}</dd></div><div><dt>Members</dt><dd>{team.members?.length ?? 0}</dd></div></dl>
    </article>)}</div>}
  </section>
}

export default Teams