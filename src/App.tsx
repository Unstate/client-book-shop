import { BrowserRouter } from 'react-router-dom'
import classes from './App.module.css'
import AppRoute from './components/AppRoute'

function App() {

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <AppRoute></AppRoute>
      </BrowserRouter>
    </div>
  )
}

export default App
