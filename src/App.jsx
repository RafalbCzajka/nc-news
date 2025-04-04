import './App.css'
import { BrowserRouter, Route, Routes} from "react-router"
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ArticleListView from './components/ArticleListView'
import SingleArticleView from './components/SingleArticleView'
import NotFoundPage from './components/NotFoundPage'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
        <Routes>
          <Route path="/" element={<ArticleListView />} />
          <Route path="/articles/:article_id" element={<SingleArticleView />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
