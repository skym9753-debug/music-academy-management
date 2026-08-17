import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// 눈 아이콘(=보이기)
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.274-4.057 5.065-7 9.542-7 4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

// 사선 입력된 눈 아이콘(=숨기기)
const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);

function SignupForm() {
    const [step, setStep] = useState(1);
    const [isCustomSubject, setIsCustomSubject] = useState(false); // 레슨 과목 > 직접 기재 선택 여부
    const [isSubjectOpen, setIsSubjectOpen] = useState(false); // 과목 드롭다운 열림 여부
    const dropdownRef = useRef(null); // 드롭다운 외부 클릭 감지용 Ref

    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);

    const [isIdChecked, setIsIdChecked] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        id: '',
        pw: '',
        confirmPw: '',
        categories: [], // 복수 선택 배열 ['취미', '전공', '단체']
        subject: '', // 레슨 과목
    });

    const idRegex = /^[a-zA-Z0-9]{4,12}$/;
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    // 드롭다운 외부 영역 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsSubjectOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

        if (name === 'id') {
            setIsIdChecked(false);
        }

        if (name === 'phone') {
            setFormData((prev) => ({ ...prev, [name]: formatPhoneNumber(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // 아이디 중복 체크
    const handleCheckDuplicateId = () => {
        if (!formData.id) {
            alert('아이디를 입력해 주세요.');
            return;
        }
        if (!idRegex.test(formData.id)) {
            alert('아이디는 영문, 숫자 조합 4~12자로 입력해 주세요.');
            return;
        }

        alert('사용 가능한 아이디입니다.');
        setIsIdChecked(true);
    };

    // 1단계 유효성 검사 분리
    const validateStep1 = () => {
        if (!formData.name || !formData.phone || !formData.email || !formData.id || !formData.pw) {
            alert('모든 필수 항목을 입력해 주세요.');
            return false;
        }
        if (!idRegex.test(formData.id)) {
            alert('아이디 형식이 올바르지 않습니다. (영문, 숫자 4~12자)');
            return false;
        }
        if (!isIdChecked) {
            alert('아이디 중복확인을 진행해 주세요.');
            return false;
        }
        if (!pwRegex.test(formData.pw)) {
            alert('비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.');
            return false;
        }
        if (formData.pw !== formData.confirmPw) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
        return true;
    };

    // 1단계에서 2단계로 이동
    const handleNext = (e) => {
        if (e) e.preventDefault();
        if (validateStep1()) {
            setStep(2);
        }
    };

    // 최종 회원가입 제출 (Step 1에서 Enter 입력 대응)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Step 1 상태에서 Enter를 눌렀을 때는 2단계 이동 동작
        if (step === 1) {
            handleNext();
            return;
        }

        if (formData.categories.length === 0) {
            alert('레슨 구분을 최소 하나 이상 선택해 주세요.');
            return;
        }
        if (!formData.subject.trim()) {
            alert('레슨 과목을 선택하거나 입력해 주세요.');
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
                        {/* 이름 */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">이름</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                maxLength={10}
                                placeholder="홍길동 (최대 10자)"
                                className="w-full px-3 py-[4.5px] text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                            />
                        </div>

                        {/* 전화번호 */}
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

                        {/* 이메일 */}
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

                        {/* 아이디 */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">아이디</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    maxLength={12}
                                    placeholder="영문, 숫자 4~12자"
                                    className="w-full px-3 py-[4.5px] text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                                />
                                <button
                                    type="button"
                                    onClick={handleCheckDuplicateId}
                                    className="shrink-0 px-2.5 py-1 text-xs bg-gray-100 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                                >
                                    중복확인
                                </button>
                            </div>
                        </div>

                        {/* 비밀번호 */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">비밀번호</label>
                            <div className="relative">
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    name="pw"
                                    value={formData.pw}
                                    onChange={handleChange}
                                    placeholder="영문, 숫자 조합 8자 이상"
                                    className="w-full px-3 py-[4.5px] pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw((prev) => !prev)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition select-none cursor-pointer"
                                    aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보이기"}
                                >
                                    {showPw ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            {formData.pw && !pwRegex.test(formData.pw) && (
                                <p className="text-[11px] text-rose-500 mt-1">영문과 숫자를 포함해 8자 이상 입력하세요.</p>
                            )}
                        </div>

                        {/* 비밀번호 확인 */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">비밀번호 확인</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPw ? 'text' : 'password'}
                                    name="confirmPw"
                                    value={formData.confirmPw}
                                    onChange={handleChange}
                                    placeholder="비밀번호 재입력"
                                    className="w-full px-3 py-[4.5px] pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPw((prev) => !prev)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition select-none cursor-pointer"
                                    aria-label={showConfirmPw ? "비밀번호 숨기기" : "비밀번호 보이기"}
                                >
                                    {showConfirmPw ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            {formData.confirmPw && (
                                formData.pw === formData.confirmPw ? (
                                    <p className="text-[11px] text-emerald-600 mt-1">비밀번호가 일치합니다.</p>
                                ) : (
                                    <p className="text-[11px] text-rose-500 mt-1">비밀번호가 일치하지 않습니다.</p>
                                )
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="w-full mt-2 py-2 bg-[#154894] hover:bg-[#1853ab] text-white font-semibold rounded-lg transition text-sm cursor-pointer"
                        >
                            다음 단계 »
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
                                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 cursor-pointer'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">레슨 과목</label>

                            {/* 레슨 과목 커스텀 드롭다운 */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsSubjectOpen((prev) => !prev)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894] bg-white text-gray-700 cursor-pointer text-left flex items-center justify-between"
                                >
                                    <span className={!isCustomSubject && !formData.subject ? 'text-gray-400' : 'text-gray-700'}>
                                        {isCustomSubject
                                            ? '직접 기재'
                                            : formData.subject || '레슨 과목 선택'}
                                    </span>

                                    <span className="text-gray-600 text-base">
                                        {isSubjectOpen ? '⏶' : '⏷'}
                                    </span>
                                </button>

                                {/* 드롭다운 목록 */}
                                {isSubjectOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                                        {['피아노', '보컬', '드럼', '기타', '베이스'].map((subject) => (
                                            <button
                                                key={subject}
                                                type="button"
                                                onClick={() => {
                                                    setIsCustomSubject(false);
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        subject: subject,
                                                    }));
                                                    setIsSubjectOpen(false);
                                                }}
                                                className="w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 cursor-pointer"
                                            >
                                                {subject}
                                            </button>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsCustomSubject(true);
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    subject: '',
                                                }));
                                                setIsSubjectOpen(false);
                                            }}
                                            className="w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 cursor-pointer"
                                        >
                                            직접 기재 (2개 이상인 경우 ➞ 예시: 피아노/보컬)
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* '직접 기재' 선택 시 활성화되는 텍스트 입력창 */}
                            {isCustomSubject && (
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="과목명을 입력하세요"
                                    className="w-full mt-2 px-3 py-[8.5px] text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154894]"
                                />
                            )}
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-1/3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition text-sm cursor-pointer"
                            >
                                « 이전
                            </button>
                            <button
                                type="submit"
                                className="w-2/3 py-2 bg-[#154894] hover:bg-[#1853ab] text-white font-semibold rounded-lg transition text-sm cursor-pointer"
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

            {step === 2 && (
                <p className="text-sm text-[#ff2483] text-center mt-3 font-medium">
                    ※가입하기 ➞ 관리자의 승인을 받은 후, 로그인이 가능합니다.
                </p>
            )}
        </>
    );
}

export default SignupForm;