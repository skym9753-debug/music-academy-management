import { Link } from "react-router-dom";
import logo from '../../assets/유스뮤직 로고.png';

function LoginForm() {
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
          <input
            type="password"
            placeholder="영문, 숫자 8자리 이상"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
          />
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