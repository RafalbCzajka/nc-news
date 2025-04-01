import './App.css'
import {BrowserRouter, Route, Routes} from "react-router"
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ArticleList from './components/ArticleList'

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Sidebar/>
    <Routes>
      <Route path="/" element={<ArticleList/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
