import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Event from './pages/event'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Event />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
