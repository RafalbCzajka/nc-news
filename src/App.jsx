import './App.css'
import {BrowserRouter, Route, Routes} from "react-router"
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ArticleListView from './components/ArticleListView'

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Sidebar/>
    <Routes>
      <Route path="/" element={<ArticleListView/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
