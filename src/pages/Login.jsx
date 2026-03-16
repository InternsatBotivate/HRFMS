import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, User, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbzF-ERpUfrb0figpapH5q5-J1KRAnBHt-OaXYrN9Cw4wzwaacKhUPwGgtCIWfxw2Ruz9g/exec?sheet=USER&action=fetch';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    try {
      const res = await fetch(SHEET_API_URL);
      const json = await res.json();

      if (!json.success) {
        toast.error('Error fetching data');
        return;
      }

      const rows = json.data;
      const headers = rows[0];
      const users = rows.slice(1).map(row => {
        let obj = {};
        headers.forEach((h, i) => obj[h] = row[i]);
        return obj;
      });

      const matchedUser = users.find(
        (u) => u.Username === username && u.Password === password
      );
      if (matchedUser) {
        toast.success('Login successful!');
        localStorage.setItem('user', JSON.stringify(matchedUser));
        setSubmitting(false);
        navigate('/', { replace: true });  // Add replace: true to prevent going back to login
      } else {
        toast.error('Invalid credentials');
        setSubmitting(false);
      }

    } catch (err) {
      console.error(err);
      toast.error('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-indigo-200 rounded-full blur-[120px] opacity-30"></div>
      <div className="absolute bottom-[10%] right-[5%] w-64 h-64 bg-purple-200 rounded-full blur-[120px] opacity-30"></div>

      <div className="max-w-md w-full relative group">
        {/* Subtle Card Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <div className="relative bg-white p-8 rounded-2xl shadow-2xl space-y-8 overflow-hidden">
          {/* Top Colorful Accent Strip */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          <div className="text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-gradient-to-br from-indigo-50 to-white rounded-xl flex items-center justify-center shadow-inner">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                HR FMS
              </span>
            </h2>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Human Resource Management
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="username" className="text-sm font-medium text-gray-700 ml-1">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                    <User className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium sm:text-sm bg-gray-50/30"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="password" title="Password" className="text-sm font-medium text-gray-700 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                    <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium sm:text-sm bg-gray-50/30"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-100 transform active:scale-[0.98] ${submitting ? 'opacity-90 cursor-not-allowed' : ''
                  }`}
                disabled={submitting}
              >
                {submitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span className="flex items-center">
                    Sign in
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;