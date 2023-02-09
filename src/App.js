import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticleList from "./components/articles/ArticleList";
import "./App.css";
import ArticlePage from "./components/articles/ArticlePage";
import Error from "./components/Error";
import { UserContextProvider } from "./context/usercontext";
import Topics from "./components/topics/Topics";
import TopicArticle from "./components/topics/TopicArticle";
import Users from "./components/users/Users";
import Posts from "./components/posts/Posts";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:article_id" element={<ArticlePage />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:slug" element={<TopicArticle />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
