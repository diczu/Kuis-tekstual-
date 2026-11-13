import { useState, useRef } from 'react';
import { quizzes, Quiz, Question } from './data/quizzes.ts';
import { 
  Check, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Sparkles,
  Trophy,
  BarChart3,
  ChevronRight
} from 'lucide-react';

interface ScoreRecord {
  correct: number;
  wrong: number;
  completed: boolean;
}

type AnswerState = Record<number, any>;

export default function App() {
  const [view, setView] = useState<'menu' | 'quiz' | 'summary' | 'total'>('menu');
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [scores, setScores] = useState<Record<number, ScoreRecord>>({
    1: { correct: 0, wrong: 0, completed: false },
    2: { correct: 0, wrong: 0, completed: false },
    3: { correct: 0, wrong: 0, completed: false }
  });
  const [userAnswers, setUserAnswers] = useState<AnswerState>({});
  const questionPanelRef = useRef<HTMLDivElement>(null);

  const currentQuiz: Quiz = quizzes[currentQuizIndex];
  const currentQuestion: Question | undefined = currentQuiz?.questions[currentQuestionIndex];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (questionPanelRef.current) {
      questionPanelRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartQuiz = (index: number) => {
    setCurrentQuizIndex(index);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setView('quiz');
    window.scrollTo({ top: 0 });

    setScores(prev => ({
      ...prev,
      [quizzes[index].id]: { correct: 0, wrong: 0, completed: false }
    }));
  };

  const handleAnswerSelect = (val: string, type: string, subId: string | null = null) => {
    const currentAns = userAnswers[currentQuestionIndex];

    if (type === 'pg') {
      setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: val }));
    } else if (type === 'pg-kompleks') {
      let newAns: string[] = Array.isArray(currentAns) ? [...currentAns] : [];
      if (newAns.includes(val)) {
        newAns = newAns.filter(item => item !== val);
      } else {
        newAns.push(val);
      }
      setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: newAns }));
    } else if (type === 'sesuai-tidak' && subId) {
      const newAns = (currentAns && typeof currentAns === 'object') ? { ...currentAns } : {};
      newAns[subId] = val;
      setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: newAns }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      scrollToTop();
    } else {
      // Calculate scores
      let correctCount = 0;
      let wrongCount = 0;

      currentQuiz.questions.forEach((q, idx) => {
        const ans = userAnswers[idx];
        let isCorrect = false;

        if (q.type === 'pg') {
          isCorrect = ans === q.correct;
        } else if (q.type === 'pg-kompleks') {
          const ansArr: string[] = Array.isArray(ans) ? ans : [];
          const correctArr = q.correct as string[];
          isCorrect = ansArr.length === correctArr.length && ansArr.every(v => correctArr.includes(v));
        } else if (q.type === 'sesuai-tidak') {
          const ansObj = (ans && typeof ans === 'object') ? ans : {};
          const correctObj = q.correct as Record<string, string>;
          let allRight = true;
          for (const key in correctObj) {
            if (ansObj[key] !== correctObj[key]) allRight = false;
          }
          if (Object.keys(ansObj).length < Object.keys(correctObj).length) allRight = false;
          isCorrect = allRight;
        }

        if (isCorrect) correctCount++;
        else wrongCount++;
      });

      setScores(prev => ({
        ...prev,
        [currentQuiz.id]: { correct: correctCount, wrong: wrongCount, completed: true }
      }));
      setView('summary');
      window.scrollTo({ top: 0 });
    }
  };

  const isAnswerComplete = (): boolean => {
    if (!currentQuestion) return false;
    const ans = userAnswers[currentQuestionIndex];
    if (ans === undefined || ans === null) return false;
    if (currentQuestion.type === 'pg') return typeof ans === 'string' && ans.length > 0;
    if (currentQuestion.type === 'pg-kompleks') return Array.isArray(ans) && ans.length > 0;
    if (currentQuestion.type === 'sesuai-tidak') {
      return typeof ans === 'object' && Object.keys(ans).length === currentQuestion.options.length;
    }
    return false;
  };

  const getThemeStyles = (theme: 'teal' | 'orange' | 'brown') => {
    switch (theme) {
      case 'teal':
        return {
          bg: 'bg-[#17838E]',
          bgHover: 'hover:bg-[#126b74]',
          lightBg: 'bg-[#17838E]/10',
          border: 'border-[#17838E]',
          text: 'text-[#17838E]',
          headerBorder: 'border-[#80DDE6]',
          badge: 'bg-[#17838E]',
          btn: 'bg-[#17838E] text-white hover:bg-[#126b74]',
        };
      case 'orange':
        return {
          bg: 'bg-[#FCA441]',
          bgHover: 'hover:bg-[#e6902e]',
          lightBg: 'bg-[#FCA441]/10',
          border: 'border-[#FCA441]',
          text: 'text-[#FCA441]',
          headerBorder: 'border-[#FCD195]',
          badge: 'bg-[#FCA441]',
          btn: 'bg-[#FCA441] text-white hover:bg-[#e6902e]',
        };
      case 'brown':
        return {
          bg: 'bg-[#985C19]',
          bgHover: 'hover:bg-[#7e4b14]',
          lightBg: 'bg-[#985C19]/10',
          border: 'border-[#985C19]',
          text: 'text-[#985C19]',
          headerBorder: 'border-[#F9BE73]',
          badge: 'bg-[#985C19]',
          btn: 'bg-[#985C19] text-white hover:bg-[#7e4b14]',
        };
    }
  };

  // --- RENDERERS ---

  const renderMenu = () => {
    const allCompleted = Object.values(scores).every(s => s.completed);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-5xl w-full py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#17838E]/10 text-[#0A3C42] text-sm font-semibold mb-4 border border-[#80DDE6]/40">
              <BookOpen className="w-4 h-4 text-[#17838E]" />
              Bahasa Indonesia • Kelas 9
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0A3C42] tracking-tight mb-4">
              Kuis Pemahaman Tekstual
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Uji pemahaman membaca, interpretasi makna kosakata, identifikasi informasi tersurat, serta alur dan bagan cerita.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quizzes.map((q, idx) => {
              const score = scores[q.id];
              const isDone = score.completed;
              const themeStyle = getThemeStyles(q.theme);

              return (
                <div
                  key={q.id}
                  onClick={() => handleStartQuiz(idx)}
                  className={`glass-panel rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border-2 ${
                    isDone ? `${themeStyle.border} shadow-lg bg-white` : 'border-gray-200/80 shadow-md hover:border-gray-300'
                  }`}
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white mb-6 shadow-md ${themeStyle.bg}`}>
                    {q.id}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight min-h-[56px] flex items-center justify-center">
                    {q.title}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-500 font-medium mb-6">
                    <HelpCircle className="w-4 h-4" />
                    <span>{q.questions.length} Soal Interaktif</span>
                  </div>

                  {isDone ? (
                    <div className="w-full bg-gray-50/90 rounded-2xl p-4 mt-auto border border-gray-100">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Hasil Terakhir</p>
                      <div className="flex justify-center items-center gap-6">
                        <div className="flex items-center text-emerald-600 font-extrabold text-lg">
                          <CheckCircle2 className="w-5 h-5 mr-1.5 text-emerald-500" />
                          <span>{score.correct} Benar</span>
                        </div>
                        <div className="flex items-center text-rose-500 font-extrabold text-lg">
                          <XCircle className="w-5 h-5 mr-1.5 text-rose-500" />
                          <span>{score.wrong} Salah</span>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-400 font-medium">Klik untuk mengulang kuis</div>
                    </div>
                  ) : (
                    <button
                      className={`mt-auto w-full py-3.5 px-6 rounded-2xl font-bold shadow-md transition-all duration-200 flex items-center justify-center gap-2 ${themeStyle.btn}`}
                    >
                      <span>Mulai Kuis</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Overall Button */}
          {allCompleted && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setView('total')}
                className="bg-[#0A3C42] hover:bg-[#072a2e] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
              >
                <Trophy className="w-6 h-6 text-[#FCA441]" />
                <span>Lihat Total Skor Keseluruhan</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderQuestionContent = () => {
    if (!currentQuestion) return null;
    const themeStyle = getThemeStyles(currentQuiz.theme);

    if (currentQuestion.type === 'pg') {
      return (
        <div className="space-y-4">
          {currentQuestion.options.map(opt => {
            const isSelected = userAnswers[currentQuestionIndex] === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleAnswerSelect(opt.id, 'pg')}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center cursor-pointer ${
                  isSelected
                    ? `${themeStyle.lightBg} ${themeStyle.border} shadow-sm ring-1 ring-offset-1`
                    : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-base mr-4 transition-colors ${
                    isSelected ? `${themeStyle.bg} text-white shadow` : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {opt.id}
                </div>
                <span className={`text-lg leading-relaxed ${isSelected ? `${themeStyle.text} font-semibold` : 'text-gray-700'}`}>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      );
    }

    if (currentQuestion.type === 'pg-kompleks') {
      const currentSelected: string[] = Array.isArray(userAnswers[currentQuestionIndex])
        ? userAnswers[currentQuestionIndex]
        : [];

      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#FCA441] bg-[#FCA441]/10 px-4 py-2 rounded-xl w-fit">
            <Sparkles className="w-4 h-4" />
            <span>Pilihan ganda kompleks: Pilih semua jawaban yang benar (lebih dari satu)</span>
          </div>

          {currentQuestion.options.map(opt => {
            const isSelected = currentSelected.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleAnswerSelect(opt.id, 'pg-kompleks')}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center cursor-pointer ${
                  isSelected
                    ? `${themeStyle.lightBg} ${themeStyle.border} shadow-sm ring-1 ring-offset-1`
                    : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center border-2 mr-4 transition-all ${
                    isSelected ? `${themeStyle.border} ${themeStyle.bg} text-white shadow` : 'border-gray-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-5 h-5 text-white stroke-[3]" />}
                </div>
                <span className={`text-lg leading-relaxed ${isSelected ? `${themeStyle.text} font-semibold` : 'text-gray-700'}`}>
                  <strong className="mr-2 text-gray-900">{opt.id}.</strong>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      );
    }

    if (currentQuestion.type === 'sesuai-tidak') {
      const ansObj = (userAnswers[currentQuestionIndex] && typeof userAnswers[currentQuestionIndex] === 'object')
        ? userAnswers[currentQuestionIndex]
        : {};

      return (
        <>
          {/* Mobile stacked cards (no horizontal scroll needed) */}
          <div className="space-y-3 sm:hidden">
            {currentQuestion.options.map((opt) => {
              const ans = ansObj[opt.id];
              const isSesuai = ans === 'Sesuai';
              const isTidak = ans === 'Tidak Sesuai';

              return (
                <div key={opt.id} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
                  <p className="text-gray-800 font-medium text-base leading-relaxed mb-3">
                    {opt.text}
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleAnswerSelect('Sesuai', 'sesuai-tidak', opt.id)}
                      className={`px-3 py-2.5 rounded-xl border-2 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isSesuai
                          ? `${themeStyle.bg} text-white ${themeStyle.border} shadow-md`
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Sesuai</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswerSelect('Tidak Sesuai', 'sesuai-tidak', opt.id)}
                      className={`px-3 py-2.5 rounded-xl border-2 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isTidak
                          ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <X className="w-4 h-4 stroke-[3]" />
                      <span>Tidak Sesuai</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tablet/Desktop table */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 sm:p-5 font-bold text-gray-800 text-sm sm:text-base w-3/5">Pernyataan Teks</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-gray-800 text-sm sm:text-base w-1/5">Sesuai</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-gray-800 text-sm sm:text-base w-1/5">Tidak Sesuai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentQuestion.options.map((opt, i) => {
                  const ans = ansObj[opt.id];
                  const isSesuai = ans === 'Sesuai';
                  const isTidak = ans === 'Tidak Sesuai';

                  return (
                    <tr key={opt.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="p-4 sm:p-5 text-gray-800 font-medium text-base leading-relaxed">
                        {opt.text}
                      </td>
                      <td className="p-4 sm:p-5 text-center align-middle">
                        <button
                          type="button"
                          onClick={() => handleAnswerSelect('Sesuai', 'sesuai-tidak', opt.id)}
                          className={`px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 mx-auto ${
                            isSesuai
                              ? `${themeStyle.bg} text-white ${themeStyle.border} shadow-md`
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Sesuai</span>
                        </button>
                      </td>
                      <td className="p-4 sm:p-5 text-center align-middle">
                        <button
                          type="button"
                          onClick={() => handleAnswerSelect('Tidak Sesuai', 'sesuai-tidak', opt.id)}
                          className={`px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 mx-auto ${
                            isTidak
                              ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                          }`}
                        >
                          <X className="w-4 h-4 stroke-[3]" />
                          <span>Tidak Sesuai</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    return null;
  };

  const renderQuiz = () => {
    if (!currentQuestion) return null;
    const themeStyle = getThemeStyles(currentQuiz.theme);
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    const canProceed = isAnswerComplete();

    return (
      <div className="min-h-screen flex flex-col md:h-screen md:overflow-hidden bg-gray-50">
        {/* Sticky Top Header & Progress Bar */}
        <div className="sticky top-0 z-20 shrink-0 bg-white shadow-sm">
          <header className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-3.5 flex justify-between items-center gap-2">
            <button
              type="button"
              onClick={() => setView('menu')}
              className="text-gray-600 hover:text-gray-900 font-semibold flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-gray-100 transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Daftar Kuis</span>
            </button>

            <div className="text-sm sm:text-lg font-bold text-gray-800 flex items-center min-w-0">
              <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white mr-2.5 sm:mr-3 font-black text-xs sm:text-sm shadow-sm shrink-0 ${themeStyle.bg}`}>
                {currentQuiz.id}
              </span>
              <span className="truncate hidden sm:inline">{currentQuiz.title}</span>
              <span className="mx-2 text-gray-300 hidden sm:inline">•</span>
              <span className="text-gray-600 sm:text-gray-500 font-semibold sm:font-medium text-sm sm:text-base whitespace-nowrap">
                Soal {currentQuestionIndex + 1} / {currentQuiz.questions.length}
              </span>
            </div>

            <div className="flex justify-end shrink-0">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                {Math.round(progress)}%
              </span>
            </div>
          </header>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-gray-200">
            <div
              className={`h-full transition-all duration-300 ${themeStyle.bg}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Content Area: Single unified page scroll on mobile, split-screen on desktop (md+) */}
        <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
          {/* Reading Text */}
          <div className="w-full md:w-1/2 lg:w-5/12 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-5 sm:p-6 md:p-10 md:overflow-y-auto">
            <div className="max-w-xl mx-auto">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Bahan Bacaan</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-5 pb-4 border-b-2 leading-tight ${themeStyle.text} ${themeStyle.headerBorder}`}>
                {currentQuiz.textTitle}
              </h3>
              <div className="text-gray-700 text-reading space-y-4 font-normal">
                {currentQuiz.textBody.map((paragraph, i) => (
                  <p key={i} className="text-justify leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Question and Answers */}
          <div
            ref={questionPanelRef}
            className="w-full md:w-1/2 lg:w-7/12 p-5 sm:p-6 md:p-10 md:overflow-y-auto flex flex-col bg-gray-50"
          >
            <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-700">
                  Pertanyaan #{currentQuestionIndex + 1}
                </span>
                <span className="text-xs text-gray-400">
                  {currentQuestion.type === 'pg' ? 'Pilihan Ganda' : currentQuestion.type === 'pg-kompleks' ? 'Pilihan Ganda Kompleks' : 'Tabel Pernyataan'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 leading-snug">
                {currentQuestion.question}
              </h2>

              <div className="flex-1">
                {renderQuestionContent()}
              </div>

              {/* Actions Footer */}
              <div className="mt-8 sm:mt-10 pt-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="text-sm text-gray-400 italic text-center sm:text-left">
                  {!canProceed && '*Harap jawab pertanyaan di atas untuk lanjut'}
                </span>
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  disabled={!canProceed}
                  className={`w-full sm:w-auto justify-center px-8 py-3.5 rounded-xl font-bold text-base shadow-lg transition-all duration-200 flex items-center gap-2 ${
                    canProceed
                      ? `${themeStyle.btn} cursor-pointer`
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>
                    {currentQuestionIndex < currentQuiz.questions.length - 1
                      ? 'Lanjut ke Soal Berikutnya'
                      : 'Selesaikan Kuis'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    const score = scores[currentQuiz.id];
    const total = currentQuiz.questions.length;
    const percentage = Math.round((score.correct / total) * 100);
    const themeStyle = getThemeStyles(currentQuiz.theme);

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100/70 relative z-10">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden text-center my-8 border border-gray-100">
          <div className={`py-10 px-6 text-white ${themeStyle.bg}`}>
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
              Hasil Evaluasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">Kuis Selesai!</h2>
            <p className="text-xl opacity-90 font-medium">{currentQuiz.title}</p>
          </div>

          <div className="p-8 sm:p-12">
            {/* Circular Gauge */}
            <div className="relative inline-flex items-center justify-center mb-8">
              <svg className="w-44 h-44 transform -rotate-90">
                <circle cx="88" cy="88" r="76" fill="transparent" stroke="#E5E7EB" strokeWidth="14" />
                <circle
                  cx="88"
                  cy="88"
                  r="76"
                  fill="transparent"
                  stroke={percentage >= 80 ? '#10B981' : percentage >= 60 ? '#F59E0B' : '#EF4444'}
                  strokeWidth="14"
                  strokeDasharray="477.5"
                  strokeDashoffset={477.5 - (percentage / 100) * 477.5}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl font-black text-gray-800">{percentage}%</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-1">Skor Kuis</span>
              </div>
            </div>

            {/* Score Stats */}
            <div className="grid grid-cols-2 gap-4 mb-10 max-w-md mx-auto">
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 mb-1">{score.correct}</div>
                <div className="text-emerald-800 font-bold flex items-center gap-1 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Jawaban Benar</span>
                </div>
              </div>
              <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100 flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-black text-rose-500 mb-1">{score.wrong}</div>
                <div className="text-rose-800 font-bold flex items-center gap-1 text-sm">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>Jawaban Salah</span>
                </div>
              </div>
            </div>

            {/* Review Section */}
            <div className="mt-12 text-left border-t-2 border-gray-100 pt-10">
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-1.5 h-8 rounded-full ${themeStyle.bg}`} />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Review Jawaban & Pembahasan</h3>
                  <p className="text-sm text-gray-500">Pelajari analisis dan alasan setiap jawaban yang benar berdasarkan teks</p>
                </div>
              </div>

              <div className="space-y-6">
                {currentQuiz.questions.map((q, idx) => {
                  const ans = userAnswers[idx];
                  let isCorrect = false;

                  if (q.type === 'pg') {
                    isCorrect = ans === q.correct;
                  } else if (q.type === 'pg-kompleks') {
                    const ansArr: string[] = Array.isArray(ans) ? ans : [];
                    const correctArr = q.correct as string[];
                    isCorrect = ansArr.length === correctArr.length && ansArr.every(v => correctArr.includes(v));
                  } else if (q.type === 'sesuai-tidak') {
                    const ansObj = (ans && typeof ans === 'object') ? ans : {};
                    const correctObj = q.correct as Record<string, string>;
                    let allRight = true;
                    for (const key in correctObj) {
                      if (ansObj[key] !== correctObj[key]) allRight = false;
                    }
                    if (Object.keys(ansObj).length < Object.keys(correctObj).length) allRight = false;
                    isCorrect = allRight;
                  }

                  return (
                    <div
                      key={idx}
                      className={`p-6 sm:p-7 rounded-2xl border-2 transition-all shadow-sm ${
                        isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          {isCorrect ? (
                            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mr-3 shadow-sm">
                              <Check className="w-5 h-5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center mr-3 shadow-sm">
                              <X className="w-5 h-5 stroke-[3]" />
                            </div>
                          )}
                          <span className={`text-lg font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                            Soal {idx + 1} • {isCorrect ? 'Benar' : 'Salah'}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-900 font-semibold text-base sm:text-lg mb-4 leading-relaxed">
                        {q.question}
                      </p>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 text-gray-700 text-sm sm:text-base leading-relaxed shadow-xs">
                        <span className="font-bold text-gray-900 mb-2 inline-flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-[#17838E]" />
                          Pembahasan Lengkap:
                        </span>
                        <p className="text-gray-600 mt-1">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <button
                type="button"
                onClick={() => setView('menu')}
                className="flex-1 py-4 px-6 rounded-2xl font-bold text-base text-white bg-[#0A3C42] hover:bg-[#072a2e] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Kembali ke Menu Utama</span>
              </button>
              <button
                type="button"
                onClick={() => handleStartQuiz(currentQuizIndex)}
                className="flex-1 py-4 px-6 rounded-2xl font-bold text-base text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Ulangi Kuis Ini</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTotalSummary = () => {
    const totalQ = quizzes.reduce((acc, q) => acc + q.questions.length, 0);
    const totalCorrect = Object.values(scores).reduce((acc, curr) => acc + curr.correct, 0);
    const totalWrong = Object.values(scores).reduce((acc, curr) => acc + curr.wrong, 0);
    const overallPerc = Math.round((totalCorrect / totalQ) * 100);

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0A3C42] text-white relative z-10">
        <div className="max-w-3xl w-full bg-white text-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 text-center border border-white/20">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500 shadow-inner">
            <Trophy className="w-10 h-10 text-[#FCA441]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0A3C42] mb-3">Luar Biasa! 🎉</h2>
          <p className="text-lg text-gray-600 font-medium mb-10">
            Kamu telah menyelesaikan semua 3 seri kuis Pemahaman Tekstual!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-black text-[#FCA441] mb-1">{overallPerc}%</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Skor Akumulasi</div>
            </div>
            <div className="h-20 w-px bg-gray-200 hidden sm:block" />
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-emerald-500 mb-1">{totalCorrect}</div>
                <div className="text-gray-500 font-semibold text-sm">Total Benar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-rose-500 mb-1">{totalWrong}</div>
                <div className="text-gray-500 font-semibold text-sm">Total Salah</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
            {quizzes.map(q => {
              const themeStyle = getThemeStyles(q.theme);
              return (
                <div key={q.id} className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded text-white ${themeStyle.bg}`}>
                      Kuis {q.id}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">{q.questions.length} Soal</span>
                  </div>
                  <div className="font-bold text-gray-800 text-sm mb-3 line-clamp-1">{q.title}</div>
                  <div className="flex justify-between text-xs font-bold pt-2 border-t border-gray-200">
                    <span className="text-emerald-600">{scores[q.id].correct} Benar</span>
                    <span className="text-rose-500">{scores[q.id].wrong} Salah</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setView('menu')}
            className="bg-[#17838E] hover:bg-[#126b74] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative font-sans antialiased selection:bg-[#17838E]/20 selection:text-[#0A3C42]">
      {/* Decorative background grid pattern */}
      <div className="bg-pattern" />

      {view === 'menu' && renderMenu()}
      {view === 'quiz' && renderQuiz()}
      {view === 'summary' && renderSummary()}
      {view === 'total' && renderTotalSummary()}
    </div>
  );
}
