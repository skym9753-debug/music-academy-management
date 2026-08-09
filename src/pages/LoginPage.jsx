import Header from '../components/common/Header';
import LoginForm from '../components/login/LoginForm';

function LoginPage() {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center">
            {/* <Header /> */}
            <LoginForm /> {/* 로그인 박스 조각 불러오기 */}
        </div>
    );
}

export default LoginPage;