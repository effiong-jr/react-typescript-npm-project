import { useState } from 'react'
import { useActions } from './hooks/useActions'
import { useTypedSelector } from './hooks/useTypeSelector'

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('')

  const { searchRepositories } = useActions()

  const { loading, error, data } = useTypedSelector(
    (state) => state.repositories
  )

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    searchRepositories(term)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!loading && !error && data.map((name) => <div key={name}>{name}</div>)}
    </div>
  )
}

export default RepositoriesList
