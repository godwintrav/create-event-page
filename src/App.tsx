import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Event from './pages/event'
import LiveEvent from './pages/live-event'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Event />} />
        <Route path="/events/:id" element={<LiveEvent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
