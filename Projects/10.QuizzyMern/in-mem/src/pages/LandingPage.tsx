import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, School } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl font-bold mb-4">Welcome to QuizMaster</h1>
          <p className="text-xl">The ultimate platform for interactive learning and assessment</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div 
            onClick={() => navigate('/login?role=student')}
            className="bg-white rounded-lg p-8 text-center cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex justify-center mb-4">
              <GraduationCap className="w-16 h-16 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Student</h2>
            <p className="text-gray-600">Take quizzes and track your progress</p>
          </div>

          <div 
            onClick={() => navigate('/login?role=teacher')}
            className="bg-white rounded-lg p-8 text-center cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex justify-center mb-4">
              <School className="w-16 h-16 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Teacher</h2>
            <p className="text-gray-600">Create and manage quizzes</p>
          </div>
        </div>

        <div className="mt-16 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Why Choose QuizMaster?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h4 className="font-bold mb-2">Easy to Use</h4>
              <p>Intuitive interface for both teachers and students</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h4 className="font-bold mb-2">Real-time Results</h4>
              <p>Instant feedback and performance tracking</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h4 className="font-bold mb-2">Flexible</h4>
              <p>Create various types of quizzes and assessments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}