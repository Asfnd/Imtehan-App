'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string | null;
  option_d: string | null;
  correct_answer: string;
  question_type: string;
  year: string;
}

export default function YearPracticePage() {
  const params = useParams();
  const router = useRouter();
  const year = params.year as string;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    fetchQuestions();
  }, [year]);

  const fetchQuestions = async () => {
    try {
      // Select only required columns to reduce egress significantly
      const columns = 'id, question, option_a, option_b, option_c, option_d, correct_answer, question_type, year'

      if (year === 'random') {
        // OPTIMIZED: Limit to 100 questions max instead of 1000 (90% reduction)
        const { data, error } = await supabase
          .from('css_gsa_mcqs')
          .select(columns)
          .limit(100)

        if (error) throw error;

        // Shuffle and take 20
        const shuffled = (data || []).sort(() => Math.random() - 0.5).slice(0, 20);
        setQuestions(shuffled);
      } else if (year === 'recent') {
        // OPTIMIZED: Limit to 150 questions max for recent years instead of fetching all
        const { data, error } = await supabase
          .from('css_gsa_mcqs')
          .select(columns)
          .gte('year', '2020')
          .lte('year', '2025')
          .limit(150)

        if (error) throw error;

        // Shuffle
        const shuffled = (data || []).sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
      } else {
        // OPTIMIZED: Limit to 100 for specific year mode
        const { data, error } = await supabase
          .from('css_gsa_mcqs')
          .select(columns)
          .eq('year', year)
          .limit(100)

        if (error) throw error;
        setQuestions(data || []);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return; // Already answered
    
    const currentQuestion = questions[currentIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    
    // Set selected answer and show result immediately
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Update answers record
    setAnswers({
      ...answers,
      [currentIndex]: answer
    });
    
    // Update score if correct
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Auto-advance to next question after 1.5 seconds
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers({});
    setQuizComplete(false);
    fetchQuestions(); // Reshuffle if random
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <p className="text-xl text-gray-700">No questions found for {year}</p>
          <Link
            href="/css/css-gsa"
            className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to CSS GSA
          </Link>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
              percentage >= 80 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <span className={`text-4xl font-bold ${
                percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {percentage}%
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-xl text-gray-600 mb-8">
              You scored {score} out of {questions.length}
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Correct</p>
                <p className="text-2xl font-bold text-green-600">{score}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Wrong</p>
                <p className="text-2xl font-bold text-red-600">{questions.length - score}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-blue-600">{questions.length}</p>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              >
                Try Again
              </button>
              <Link
                href="/css/css-gsa"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                Back to CSS GSA
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const options = ['A', 'B', 'C', 'D'].filter(opt => 
    currentQuestion[`option_${opt.toLowerCase()}` as keyof Question]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                CSS GSA {year === 'random' ? 'Random Practice' : year === 'recent' ? 'Recent Years' : year}
              </h1>
              <p className="text-sm text-gray-600">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Score</p>
              <p className="text-2xl font-bold text-indigo-600">{score}/{currentIndex + (showResult ? 1 : 0)}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              currentQuestion.question_type === 'true_false'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {currentQuestion.question_type === 'true_false' ? 'True/False' : 'Multiple Choice'}
            </span>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {options.map((option) => {
              const optionText = currentQuestion[`option_${option.toLowerCase()}` as keyof Question] as string;
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correct_answer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showWrong
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
                      showCorrect
                        ? 'bg-green-500 text-white'
                        : showWrong
                        ? 'bg-red-500 text-white'
                        : isSelected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {option}
                    </span>
                    <span className="flex-1 text-gray-900">{optionText}</span>
                    {showCorrect && (
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {showWrong && (
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/css/css-gsa"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition"
          >
            Exit Quiz
          </Link>
          
          {showResult && (
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition"
            >
              {currentIndex < questions.length - 1 ? 'Skip to Next →' : 'Finish Quiz'}
            </button>
          )}
          
          {!showResult && (
            <div className="flex-1 px-6 py-3 text-center text-gray-500 font-medium">
              Select an answer to continue
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
