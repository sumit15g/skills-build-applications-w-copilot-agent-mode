import { useCollection } from '../useCollection.js'

function Users() {
  const { items: users, status } = useCollection('/api/users/')

  if (status === 'loading') return <p className="status">Loading users...</p>
  if (status === 'error') return <p className="status status-error">Unable to load users.</p>
  if (users.length === 0) return <p className="status">No users found.</p>

  return <section>
    <header className="page-heading"><div><span className="eyebrow">Community</span><h1>Athletes</h1></div><strong>{users.length} active</strong></header>
    <div className="table-responsive">
      <table className="table align-middle">
        <thead><tr><th>Name</th><th>Username</th><th>Email</th></tr></thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id ?? user.id}>
              <td>{[user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(' ') || 'Not provided'}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
}

export default Users