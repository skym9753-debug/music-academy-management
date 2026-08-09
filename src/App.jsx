import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Routes>
      {/* 메인 경로(/) 접속 시 로그인 페이지 표시 */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;