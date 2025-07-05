import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  BookOpen,
  Brain,
  Keyboard,
  Eye,
  Heart,
} from "lucide-react";
import logo from "./assets/logo-dark.png"; // Assuming you have a logo.svg file

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      section: "Logical Thinking",
      icon: <Brain className="w-5 h-5" />,
      question:
        "إذا كان لديك 3 صناديق: الأول يحتوي على 2 تفاحة، الثاني 3 تفاحات، والثالث 5 تفاحات، كم عدد التفاحات إذا جمعت الصندوقين الأول والثالث؟",
      type: "multiple",
      options: ["5", "7", "8", "10"],
      correct: 1,
      points: 1,
      dir: "rtl",
    },
    {
      id: 2,
      section: "Logical Thinking",
      icon: <Brain className="w-5 h-5" />,
      question: "If it's 2:00 PM now, what time will it be after 2 hours?",
      type: "multiple",
      options: ["4:00 PM", "3:00 PM", "5:00 PM", "6:00 PM"],
      correct: 0,
      points: 1,
      dir: "ltr",
    },
    {
      id: 3,
      section: "Logical Thinking",
      icon: <Brain className="w-5 h-5" />,
      question:
        "Ahmed is taller than Mohamed, and Mohamed is taller than Karim. Who is the shortest?",
      type: "multiple",
      options: ["Mohamed", "Karim", "Ahmed", "No one"],
      correct: 1,
      points: 1,
      dir: "ltr",
    },
    {
      id: 4,
      section: "Logical Thinking",
      icon: <Brain className="w-5 h-5" />,
      question: "What comes next in this sequence (التسلسل)? 5, 10, 15, ...",
      type: "multiple",
      options: ["25", "30", "0", "10"],
      correct: 2,
      points: 1,
      dir: "ltr",
    },
    {
      id: 5,
      section: "Logical Thinking",
      icon: <Brain className="w-5 h-5" />,
      question:
        "You are told: 'Turn on the computer, then open Notepad, then type your name.' What is the first step?",
      type: "multiple",
      options: [
        "Open Notepad",
        "Type your name",
        "Turn on the computer",
        "Print the name",
      ],
      correct: 2,
      points: 1,
      dir: "ltr",
    },
    {
      id: 6,
      section: "Logical Thinking",
      icon: <Brain className="w-5 h-5" />,
      question:
        "أحمد يريد أن يصنع كوب شاي. هذه هي الخطوات التي كتبها:\n1. ضع الشاي والسكر في الكوب\n2. اسكب الماء في الكوب\n3. غلِّ الماء\n4. حرّك المكونات جيدًا\n5. اترك الشاي قليلاً ثم اشربه\nهل هناك خطأ في الترتيب؟ إذا كان هناك خطأ، اكتب الترتيب المنطقي.",
      type: "text",
      correct: 1,
      points: 1,
      dir: "rtl",
    },
    {
      id: 7,
      section: "Logical Thinking",
      icon: <Brain className="w-5 h-5" />,
      question: "Look at the pattern: 🔵🔴🔵🔴🔵?. What comes next?",
      type: "multiple",
      options: ["🔵", "🔴", "🟢", "⚫"],
      correct: 1,
      points: 1,
      dir: "ltr",
    },

    // Section 2
    {
      id: 8,
      section: "Reading Comprehension (Arabic)",
      icon: <BookOpen className="w-5 h-5" />,
      question:
        "اقرأ الجملة ثم اختر المعنى الصحيح: 'البرمجة هي إعطاء تعليمات للحاسوب.' ما معنى 'تعليمات'؟",
      type: "multiple",
      options: ["أوامر", "اختيارات", "صور", "ألعاب"],
      correct: 0,
      points: 1,
      dir: "rtl",
    },
    {
      id: 9,
      section: "Reading Comprehension (Arabic)",
      icon: <BookOpen className="w-5 h-5" />,
      question: "أي الجمل التالية تُستخدم عند بدء تشغيل الكمبيوتر؟",
      type: "multiple",
      options: [
        "أغلق الجهاز",
        "اضغط على زر التشغيل",
        "حمّل برنامج",
        "طفي الجهاز",
      ],
      correct: 1,
      points: 1,
      dir: "rtl",
    },

    // Section 3
    {
      id: 10,
      section: "Writing",
      icon: <Keyboard className="w-5 h-5" />,
      question: "اكتب جملة واحدة باللغة العربية عن جهاز الكمبيوتر.",
      type: "text",
      placeholder: "مثال: الحاسوب جهاز مفيد للتعلم",
      points: 1,
      dir: "rtl",
    },
    {
      id: 11,
      section: "Writing",
      icon: <Keyboard className="w-5 h-5" />,
      question: "Write one sentence in English about programming  .",
      type: "text",
      placeholder: "Example: i love programming.",
      points: 1,
      dir: "ltr",
    },
    {
      id: 12,
      section: "Writing",
      icon: <Keyboard className="w-5 h-5" />,
      question: "Write this English sentence: print('Hello World')",
      type: "text",
      points: 1,
      dir: "ltr",
    },
    {
      id: 13,
      section: "Writing",
      icon: <Keyboard className="w-5 h-5" />,
      question:
        "Write this English sentence: name = input('Enter your name: ')",
      type: "text",
      points: 1,
      dir: "ltr",
    },

    // Section 4
    {
      id: 14,
      section: "Computer Literacy",
      icon: <Eye className="w-5 h-5" />,
      question: "ما الجهاز الذي تستخدمه للكتابه علي الكمبيوتر ؟",
      type: "multiple",
      options: ["Monitor", "Keyboard", "Mouse", "Speaker"],
      correct: 1,
      points: 1,
      dir: "rtl",
    },
    {
      id: 15,
      section: "Computer Literacy",
      icon: <Eye className="w-5 h-5" />,
      question: "What is the calculator app(اله حاسبة) used for?",
      type: "multiple",
      options: [
        "Drawing",
        "Listening to music",
        "Doing math",
        "Watching videos",
      ],
      correct: 2,
      points: 1,
      dir: "ltr",
    },
    {
      id: 16,
      section: "Computer Literacy",
      icon: <Eye className="w-5 h-5" />,
      question: "اي اختيار يعتبر نظام تشغيل للكمبيوتر ؟",
      type: "multiple",
      options: ["Facebook", "Windows", "YouTube", "WhatsApp"],
      correct: 1,
      points: 1,
      dir: "rtl",
    },

    // Section 5
    {
      id: 17,
      section: "Attention & Motivation",
      icon: <Heart className="w-5 h-5" />,
      question:
        "Do you enjoy solving puzzles or organizing steps to solve problems?",
      type: "multiple",
      options: ["Yes", "No"],
      correct: 0,
      points: 1,
      dir: "ltr",
    },
    {
      id: 18,
      section: "Attention & Motivation",
      icon: <Heart className="w-5 h-5" />,
      question:
        "Can you stay focused on a computer screen for 30 minutes without distraction(تشتت)?",
      type: "multiple",
      options: ["Yes", "No"],
      correct: 0,
      points: 1,
      dir: "ltr",
    },
    {
      id: 19,
      section: "Attention & Motivation",
      icon: <Heart className="w-5 h-5" />,
      question: "Are you curious to know how games or apps work?",
      type: "multiple",
      options: ["Yes", "No"],
      correct: 0,
      points: 1,
      dir: "ltr",
    },
    {
      id: 20,
      section: "Computer Literacy",
      icon: <Eye className="w-5 h-5" />,
      question: "ما فائدة الفأرة (Mouse) في استخدام الكمبيوتر؟",
      type: "multiple",
      options: [
        "كتابة النصوص",
        "تحريك المؤشر واختيار العناصر",
        "تشغيل الصوت",
        "عرض الفيديوهات",
      ],
      correct: 1,
      points: 1,
      dir: "rtl",
    },
  ];

  // Timer effect
  useEffect(() => {
    if (testStarted && !testCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !testCompleted) {
      handleSubmitTest();
    }
  }, [timeLeft, testStarted, testCompleted]);

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // save answer selection in answers state
  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  //get next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  //get previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Calculate score based on answers
  // Each question has a correct value, and we check if the answer is equal this value
  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (question.type === "multiple") {
        if (userAnswer === question.correct) {
          totalScore += question.points;
        }
      } else if (question.type === "text") {
        // For text questions, give points if there's any meaningful answer
        if (userAnswer && userAnswer.trim().length > 0) {
          totalScore += question.points;
        }
      }
    });
    return totalScore;
  };

  // Handle test submission
  const handleSubmitTest = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setTestCompleted(true);
  };

  const startTest = () => {
    setTestStarted(true);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(30 * 60);
    setTestStarted(false);
    setTestCompleted(false);
    setScore(0);
  };

  // If the test hasn't started yet, show the overview component
  if (!testStarted) {
    return <Overview startTest={startTest} />;
  }

  // If the test is completed, show the result component
  if (testCompleted) {
    const passed = score >= 14;
    return (
      <TestCompleted passed={passed} score={score} restartTest={restartTest} />
    );
  }

  // Render the test component
  return (
    <Test
      questions={questions}
      currentQuestion={currentQuestion}
      answers={answers}
      timeLeft={timeLeft}
      handleAnswer={handleAnswer}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      handleSubmitTest={handleSubmitTest}
      formatTime={formatTime}
    />
  );
};

//overview component before start test itself
function Overview({ startTest }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          {/* <Brain className="w-16 h-16 text-indigo-600 mx-auto mb-4" /> */}
          <div className="logo  w-fit mx-auto ">
            <img src={logo} alt="codeJourny logo" className="w-32 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Programming Course Placement Test
          </h1>
          <p className="text-gray-600">For students aged 11-13 years</p>
        </div>

        <div className="bg-indigo-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-indigo-800 mb-4">
            Test Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>20 Questions Total</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>30 Minutes Time Limit</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Passing Score: 14/20</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-600" />
              <span>Multiple Choice & Writing</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Test Sections:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <Brain className="w-5 h-5 text-indigo-600 mb-1" />
              Logical Thinking (5 questions)
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <BookOpen className="w-5 h-5 text-purple-600 mb-1" />
              Reading Comprehension (5 questions)
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <Keyboard className="w-5 h-5 text-green-600 mb-1" />
              Writing Skills (4 questions)
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <Eye className="w-5 h-5 text-blue-600 mb-1" />
              Computer Literacy (3 questions)
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 sm:col-span-2">
              <Heart className="w-5 h-5 text-red-600 mb-1" />
              Attention & Motivation (3 questions)
            </div>
          </div>
        </div>

        <button
          onClick={startTest}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}

// Result component after test completion
function TestCompleted({ passed, score, restartTest }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          {passed ? (
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Test Completed!
          </h1>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div
            className="text-4xl font-bold mb-2"
            style={{ color: passed ? "#16a34a" : "#dc2626" }}
          >
            {score}/20
          </div>
          <p className="text-gray-600 mb-4">
            {passed
              ? "Congratulations! You passed the test."
              : "You need 14 or more points to pass."}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="h-4 rounded-full transition-all duration-500"
              style={{
                width: `${(score / 20) * 100}%`,
                backgroundColor: passed ? "#16a34a" : "#dc2626",
              }}
            ></div>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              {passed
                ? "Ready for Programming Course"
                : "Need More Preparation"}
            </p>
            {!passed && (
              <p className="text-red-600">
                Consider reviewing logical thinking and computer basics before
                retaking the test.
              </p>
            )}
          </div>
        </div>

        <button
          onClick={restartTest}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Take Test Again
        </button>
      </div>
    </div>
  );
}

// the test component
function Test({
  questions,
  currentQuestion,
  answers,
  timeLeft,
  handleAnswer,
  handleNext,
  handlePrevious,
  handleSubmitTest,
  formatTime,
}) {
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            {/* <div className="flex items-center gap-2">
              {currentQ.icon}
              <span className="text-sm font-medium text-gray-600">
                {currentQ.section}
              </span>
            </div> */}
            <div className="logo  w-fit ">
              <img src={logo} alt="codeJourny logo" className="w-24" />
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <pre
            className="text-xl font-semibold text-gray-800 mb-6 whitespace-pre-wrap break-words "
            dir={currentQ.dir}
          >
            {currentQ.question}
          </pre>

          {currentQ.type === "multiple" ? (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${currentQ.id}`}
                    value={index}
                    checked={answers[currentQ.id] === index}
                    onChange={() => handleAnswer(currentQ.id, index)}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows="4"
              placeholder={currentQ.placeholder}
              value={answers[currentQ.id] || ""}
              onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
              dir={currentQ.dir}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="text-sm text-gray-600">
              {Object.keys(answers).length} of {questions.length} answered
            </div>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
