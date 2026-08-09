import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        id: '',      // 아이디
        pw: '',
        confirmPw: '',
    });

    // 전화번호 자동 하이픈(-) 함수
    const formatPhoneNumber = (value) => {
        const rawNum = value.replace(/[^0-9]/g, '');
        if (rawNum.length <= 3) return rawNum;
        if (rawNum.length <= 7) return `${rawNum.slice(0, 3)}-${rawNum.slice(3)}`;
        return `${rawNum.slice(0, 3)}-${rawNum.slice(3, 7)}-${rawNum.slice(7, 11)}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            setFormData((prev) => ({ ...prev, [name]: formatPhoneNumber(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.pw !== formData.confirmPw) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
    };

    return (
        <>
            <h2 className="text-4xl font-bold text-center text-[#154894] font-['MallangW'] p-2">Youth Music</h2>

            <form onSubmit={handleSubmit} className="w-full max-w-xs mx-4 p-5 bg-white rounded-xl shadow-md space-y-3">
                <h2 className="text-2xl font-bold text-center text-[#154894] font-['KimWildGag'] mb-2">회원가입</h2>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">이름</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="홍길동"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">전화번호</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={13}
                        placeholder="전화번호 입력(숫자만 입력)"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">이메일</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">아이디</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="영문, 숫자 4~12자"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">비밀번호</label>
                    <input
                        type="password"
                        name="pw"
                        value={formData.pw}
                        onChange={handleChange}
                        placeholder="영문, 숫자 조합 8자 이상"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">비밀번호 확인</label>
                    <input
                        type="password"
                        name="confirmPw"
                        value={formData.confirmPw}
                        onChange={handleChange}
                        placeholder="비밀번호 재입력"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-3 py-2 bg-[#154894] hover:bg-[#1853ab] text-white font-semibold rounded-lg transition text-sm"
                >
                    가입하기
                </button>

                <div className="flex justify-center text-sm text-gray-500 pt-1">
                    <span>이미 계정이 있으신가요?</span>
                    <Link to="/" className="ml-2 font-semibold text-[#154894] hover:underline">
                        로그인
                    </Link>
                </div>
            </form>
        </>
    );
}

export default SignupForm;