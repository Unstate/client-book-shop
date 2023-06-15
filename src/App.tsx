import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.css'
import AppRoute from './components/AppRoute'

function App() {

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppRoute></AppRoute>
      </BrowserRouter>
    </div>
  )
}

export default App
