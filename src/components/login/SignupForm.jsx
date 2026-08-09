import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignupForm() {
    const [step, setStep] = useState(1);
    const [isCustomSubject, setIsCustomSubject] = useState(false); // 직접기재 선택 여부
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        id: '',
        pw: '',
        confirmPw: '',
        categories: [], // 복수 선택 배열 ['취미', '전공', '단체']
        subject: '',    // 수강 과목
    });

    // 수강 구분 토글(선택/해제) 함수
    const handleCategoryToggle = (item) => {
        setFormData((prev) => {
            const exists = prev.categories.includes(item);
            const updated = exists
                ? prev.categories.filter((c) => c !== item)
                : [...prev.categories, item];
            return { ...prev, categories: updated };
        });
    };

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

    // 수강 과목 드롭다운 선택 처리
    const handleSubjectSelect = (e) => {
        const value = e.target.value;
        if (value === '직접기재') {
            setIsCustomSubject(true);
            setFormData((prev) => ({ ...prev, subject: '' }));
        } else {
            setIsCustomSubject(false);
            setFormData((prev) => ({ ...prev, subject: value }));
        }
    };

    // 1단계 유효성 검사 및 2단계 이동
    const handleNext = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.email || !formData.id || !formData.pw) {
            alert('모든 필수 항목을 입력해 주세요.');
            return;
        }
        if (formData.pw !== formData.confirmPw) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        setStep(2);
    };

    // 최종 회원가입 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.categories.length === 0) {
            alert('수강 구분을 최소 하나 이상 선택해 주세요.');
            return;
        }
        if (!formData.subject.trim()) {
            alert('수강 과목을 선택하거나 입력해 주세요.');
            return;
        }
        console.log('최종 회원가입 데이터:', formData);
        alert('회원가입이 완료되었습니다!');
    };

    return (
        <>
            <h2 className="text-4xl font-bold text-center text-[#154894] font-['MallangW'] p-2">Youth Music</h2>

            <form onSubmit={handleSubmit} className="w-full max-w-xs mx-4 p-5 bg-white rounded-xl shadow-md space-y-3">
                <h2 className="text-xl font-bold text-center text-[#154894] font-['KimWildGag'] mb-2">
                    회원가입 ({step}/2)
                </h2>

                {/* 1단계: 계정 기본 정보 */}
                {step === 1 && (
                    <>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">이름</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="홍길동"
                                className="w-full px-3 py-[4.5px] text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
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
                                className="w-full px-3 py-[4.5px] text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
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
                                className="w-full px-3 py-[4.5px] text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
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
                                className="w-full px-3 py-[4.5px] text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
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
                                className="w-full px-3 py-[4.5px] text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
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
                                className="w-full px-3 py-[4.5px] text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="w-full mt-2 py-2 bg-[#154894] hover:bg-[#1853ab] text-white font-semibold rounded-lg transition text-sm"
                        >
                            다음 단계
                        </button>
                    </>
                )}

                {/* 2단계: 추가 수강 정보 */}
                {step === 2 && (
                    <>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                레슨 구분 <span className="text-gray-400 font-normal">(중복 가능)</span>
                            </label>
                            {/* 3개 한 줄 그리드 배치 */}
                            <div className="grid grid-cols-3 gap-2">
                                {['취미', '전공', '단체'].map((cat) => {
                                    const isSelected = formData.categories.includes(cat);
                                    return (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => handleCategoryToggle(cat)}
                                            className={`py-2 text-xs font-semibold rounded-lg border transition ${isSelected
                                                ? 'bg-[#154894] text-white border-[#154894]'
                                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">수강 과목</label>
                            <select
                                onChange={handleSubjectSelect}
                                defaultValue=""
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894] bg-white text-gray-700"
                            >
                                <option value="" disabled>레슨 과목 선택</option>
                                <option value="피아노">피아노</option>
                                <option value="보컬">보컬</option>
                                <option value="드럼">드럼</option>
                                <option value="기타">기타</option>
                                <option value="베이스">베이스</option>
                                <option value="직접기재">직접 기재 (2개 이상인 경우, 작성해주세요)</option>
                            </select>

                            {/* '직접기재' 선택 시 활성화되는 텍스트 입력창 */}
                            {isCustomSubject && (
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="과목명을 입력하세요"
                                    className="w-full mt-2 px-3 py-[4.5px] text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                                />
                            )}
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-1/3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition text-sm"
                            >
                                이전
                            </button>
                            <button
                                type="submit"
                                className="w-2/3 py-2 bg-[#154894] hover:bg-[#1853ab] text-white font-semibold rounded-lg transition text-sm"
                            >
                                가입하기
                            </button>
                        </div>
                    </>
                )}

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