import React, { useState } from 'react';

const RepoFormPage: React.FC = () => {
  const [repoName, setRepoName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (repoName.trim()) {
      console.log('Repository Name Submitted:', repoName);
      setSubmitted(true);
      // You can add further logic here (e.g., API call)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-2xl shadow-xl border border-slate-100 transition-all hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center tracking-tight">
          Create New Repository
        </h1>

        {submitted ? (
          <div className="text-center p-6 bg-emerald-50 rounded-xl border border-emerald-100 animate-in fade-in zoom-in duration-300">
            <div className="text-emerald-500 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-emerald-800 font-semibold">Repository "{repoName}" initialized!</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              Add another repository
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="repoName" className="block text-sm font-semibold text-slate-700 mb-2">
                Repository Name
              </label>
              <input
                id="repoName"
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="my-awesome-project"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 bg-slate-50 hover:bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/10 active:scale-[0.98] transition-all duration-200"
            >
              Create Repository
            </button>
          </form>
        )}
      </div>

      <p className="mt-8 text-slate-500 text-sm">
        AutoClaimFix Repository Management System v1.0
      </p>
    </div>
  );
};

export default RepoFormPage;
