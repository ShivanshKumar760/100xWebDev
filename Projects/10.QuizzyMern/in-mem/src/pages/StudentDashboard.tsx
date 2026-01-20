import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen } from 'lucide-react';

interface Quiz {
  id: number;
  title: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
}

export default function StudentDashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleAnswer = (answerIndex: number) => {
    setAnswers([...answers, answerIndex]);
    if (currentQuiz && currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!currentQuiz) return 0;
    return answers.reduce((score, answer, index) => {
      return score + (answer === currentQuiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Student Dashboard</h1>

        {!currentQuiz && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{quiz.title}</h3>
                <p className="text-gray-600 mb-4">
                  {quiz.questions.length} questions
                </p>
                <button
                  onClick={() => startQuiz(quiz)}
                  className="flex items-center gap-2 w-full justify-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  <BookOpen className="w-5 h-5" />
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        )}

        {currentQuiz && !showResults && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <div className="mb-4 text-gray-600">
              Question {currentQuestion + 1} of {currentQuiz.questions.length}
            </div>
            <h2 className="text-xl font-semibold mb-6">
              {currentQuiz.questions[currentQuestion].question}
            </h2>
            <div className="space-y-4">
              {currentQuiz.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 rounded border hover:bg-gray-50"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {showResults && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
            <p className="text-xl mb-6">
              Your score: {calculateScore()} out of {currentQuiz.questions.length}
            </p>
            <button
              onClick={() => setCurrentQuiz(null)}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              Back to Quizzes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}