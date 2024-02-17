import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import AdminLayout from './pages/admin/AdminLayout';
import Admin from './pages/admin/screens/Admin';
import Comments from './pages/admin/screens/comments/Comments';
import NewPosts from './pages/admin/screens/posts/NewPosts';
import ManagePosts from './pages/admin/screens/posts/ManagePosts';
import EditPost from './pages/admin/screens/posts/EditPost';
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategories from "./pages/admin/screens/categories/EditCategories";
import Users from "./pages/admin/screens/users/Users";


function App() {
  return (
    <div className='App font-opensans'>
       <Routes>
          <Route index path='/' element={<HomePage />} />
          <Route  path='/blog/:slug' element={<ArticleDetailPage />} />
          <Route  path='/register' element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminLayout />}> 
            <Route index element={<Admin />} />
            <Route path='comments' element={<Comments />} />
            <Route path='posts/new' element={<NewPosts />} />
            <Route path='posts/manage' element={<ManagePosts />} />
            <Route path="posts/manage/edit/:slug" element={<EditPost />} />
            <Route path="categories/manage" element={<Categories />} />
            <Route
              path="categories/manage/edit/:slug"
              element={<EditCategories />}
            />
            <Route path="users/manage" element={<Users />} />

          </Route>
       </Routes>
    </div>
  );
}

export default App;
