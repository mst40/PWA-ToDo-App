import './App.css'

export  const App = () => {

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <input type='text' value="" onChange={e => e.preventDefault()} />
        <input type='submit' value={'ADD'} onSubmit={e => e.preventDefault()} />
      </form>
    </>
  )
}
