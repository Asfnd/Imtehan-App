'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

interface YearStats {
  year: string;
  total_questions: number;
  mcq_count: number;
  true_false_count: number;
}

export default function CSSGSAPage() {
  const [yearStats, setYearStats] = useState<YearStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDecade, setSelectedDecade] = useState<string>('all');
  const supabase = createClient();

  useEffect(() => {
    fetchYearStats();
  }, []);

  const fetchYearStats = async () => {
    try {
      const { data, error } = await supabase
        .from('css_gsa_year_stats')
        .select('*')
        .order('year', { ascending: false });

      if (error) throw error;
      setYearStats(data || []);
    } catch (error) {
      console.error('Error fetching year stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const decades = [
    { label: 'All Years', value: 'all' },
    { label: '2020s', value: '2020' },
    { label: '2010s', value: '2010' },
    { label: '2000s', value: '2000' },
    { label: '1990s', value: '1990' },
    { label: '1980s', value: '1980' },
    { label: '1970s', value: '1970' },
  ];

  const filteredYears = selectedDecade === 'all'
    ? yearStats
    : yearStats.filter(y => y.year.startsWith(selectedDecade.slice(0, 3)));

  const totalQuestions = yearStats.reduce((sum, y) => sum + y.total_questions, 0);
  const totalMCQ = yearStats.reduce((sum, y) => sum + y.mcq_count, 0);
  const totalTF = yearStats.reduce((sum, y) => sum + y.true_false_count, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CSS GSA MCQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="font-semibold text-xl">Imtehan</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  CSS General Science & Ability
                </h1>
                <p className="mt-1 text-gray-600 text-sm">
                  Past Paper MCQs (1973-2025) • {totalQuestions} Questions
                </p>
              </div>
            </div>
            <Link
              href="/css"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              ← Back to CSS
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Questions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalQuestions}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Multiple Choice</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalMCQ}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">True/False</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalTF}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Decade Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Decade</h2>
          <div className="flex flex-wrap gap-3">
            {decades.map((decade) => (
              <button
                key={decade.value}
                onClick={() => setSelectedDecade(decade.value)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  selectedDecade === decade.value
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {decade.label}
              </button>
            ))}
          </div>
        </div>

        {/* Year Grid */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Select Year to Practice
          </h2>

          {filteredYears.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No years found for this decade</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredYears.map((yearStat) => (
                <Link
                  key={yearStat.year}
                  href={`/css/css-gsa/practice/${yearStat.year}`}
                  className="group relative bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-200"
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600 group-hover:text-indigo-700">
                      {yearStat.year}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {yearStat.total_questions} Questions
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        {yearStat.mcq_count} MCQ
                      </span>
                      {yearStat.true_false_count > 0 && (
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {yearStat.true_false_count} T/F
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/css/css-gsa/practice/all"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">All Years Practice</h3>
                <p className="mt-2 text-purple-100">Mix of all years</p>
              </div>
              <svg className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
          </Link>

          <Link
            href="/css/css-gsa/practice/2024"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Latest Year</h3>
                <p className="mt-2 text-blue-100">2024 Questions</p>
              </div>
              <svg className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
