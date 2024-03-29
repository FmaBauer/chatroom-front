import logo from './images/square-logo.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Menu from './menu'
import Chat from './pages/chat'
const avatorUrl = 'https://png.pngtree.com/png-vector/20190115/ourmid/pngtree-cartoon-avatar-lovely-portrait-png-image_338646.jpg'

function PlaceHolder() {
  return <div className="block-wrapper"><div>Coming soon..</div></div>
}

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <img src={logo} />
          <span>Gradual Community</span>
        </div>
        <div className="avator">
          <img src={avatorUrl} />
        </div>
      </header>
      <div className="app-body">
        <Menu />
        <div className="main">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/forum" element={<PlaceHolder />} />
            <Route path="/matches" element={<PlaceHolder />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
