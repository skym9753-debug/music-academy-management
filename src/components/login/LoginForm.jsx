import { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/유스뮤직 로고.png';

// 눈 아이콘 (보이기)
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.274-4.057 5.065-7 9.542-7 4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

// 사선 입력된 눈 아이콘 (숨기기)
const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);

function LoginForm() {
  // 비밀번호 보이기/숨기기 상태
  const [showPw, setShowPw] = useState(false);

  return (
    <>
      <h2 className="text-5xl font-bold text-center text-[#154894] font-['MallangW'] p-4">Youth Music</h2>

      <form className="w-full max-w-xs mx-4 p-6 bg-white rounded-xl shadow-md space-y-4">

        {/* 프로그램 간략 소개 / 회원가입 */}
        <div className="flex items-center justify-center gap-7">
          {/* 로고 이미지 */}
          <img src={logo} alt="유스뮤직 로고" className="w-14 h-14 object-contain" />

          <div>
            <label className="block text-lg font-bold text-gray-600">
              수강생 및 레슨 일지를
            </label>
            <label className="block text-lg font-bold text-gray-600">
              손 쉽게 관리해보세요 :)
            </label>
          </div>
        </div>


        {/* 널찍한 점선 구분선 (8px Dash / 16px Gap) */}
        <div className="w-full h-[1px] bg-[repeating-linear-gradient(90deg,#d1d5db,#d1d5db_8px,transparent_8px,transparent_16px)]" />

        {/* 로그인 정보 입력창 */}
        <div className="mt-2">
          <label className="block text-md font-medium text-gray-700 mb-1">
            아이디
          </label>
          <input
            type="text"
            placeholder="영문, 숫자 4~12자"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
          />
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="영문, 숫자 8자리 이상"
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
            />
            <button
              type="button"
              onClick={() => setShowPw((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition select-none cursor-pointer"
              aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보이기"}
            >
              {showPw ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-3 py-2 bg-[#154894] hover:bg-[#1853ab] text-white font-semibold rounded-lg transition cursor-pointer"
        >
          로 그 인
        </button>

        {/* 아이디 찾기 / 비밀번호 찾기 / 회원가입 영역 */}
        {/* Link to="" : 주소창에 표시되는 글자 */}
        <div className="flex justify-center items-center gap-2 text-sm text-gray-500 font-medium pt-2">
          <Link to="/find-id" className="hover:text-gray-800 transition cursor-pointer">아이디 찾기</Link>
          <span className="text-gray-300">|</span>
          <Link to="/find-pw" className="hover:text-gray-800 transition cursor-pointer">비밀번호 찾기</Link>
          <span className="text-gray-300">|</span>
          <Link to="/signup" className="hover:text-gray-800 font-semibold text-[#154894] transition cursor-pointer">회원가입</Link>
        </div>


      </form>
    </>
  );
}

export default LoginForm;