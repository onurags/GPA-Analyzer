import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaUniversity, FaGithub, FaQuestionCircle } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import ReactConfetti from 'react-confetti';
import { Dialog } from '@headlessui/react';

interface SemesterInput {
  value: string;
  error: string;
}

const App: React.FC = () => {
  const [semesters, setSemesters] = useState<SemesterInput[]>(
    Array(8).fill({ value: '', error: '' })
  );
  const [result, setResult] = useState<{ cgpa: number; percentage: number } | null>(null);
  const [activeYears, setActiveYears] = useState<number>(8);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateInput = (value: string): string => {
    if (!value) return '';
    const num = parseFloat(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (num < 0 || num > 10) return 'SGPA must be between 0 and 10';
    return '';
  };

  const handleInputChange = (index: number, value: string) => {
    const newSemesters = [...semesters];
    const error = validateInput(value);
    newSemesters[index] = { value, error };
    setSemesters(newSemesters);
  };

  const calculateResults = () => {
    const validSemesters = semesters
      .slice(0, activeYears)
      .filter(sem => sem.value && !sem.error);

    if (validSemesters.length === 0) {
      alert('Please enter at least one valid SGPA value');
      return;
    }

    const totalSGPA = validSemesters.reduce(
      (sum, sem) => sum + parseFloat(sem.value),
      0
    );
    const cgpa = totalSGPA / validSemesters.length;
    const percentage = cgpa * 8.8;

    setResult({ cgpa, percentage });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const resetForm = () => {
    setSemesters(Array(8).fill({ value: '', error: '' }));
    setResult(null);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden">
      {showConfetti && <ReactConfetti width={windowSize.width} height={windowSize.height} />}
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/40"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-orange-500 blur-lg opacity-50"></div>
              <FaUniversity className="text-6xl text-orange-500 relative z-10" />
            </motion.div>
            <div className="relative">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-transparent bg-clip-text relative z-10">
                SPPU CGPA Calculator
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 blur-xl opacity-20"></div>
            </div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Calculate your CGPA and percentage according to SPPU rules with our advanced calculator
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/20 relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Semester Selection</h2>
            <button
              onClick={() => setIsHelpOpen(true)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaQuestionCircle className="text-xl" />
            </button>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">
              Calculate up to:
            </label>
            <div className="flex flex-wrap gap-3">
              {[2, 4, 6, 8].map((year) => (
                <motion.button
                  key={year}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveYears(year)}
                  className={`px-6 py-3 rounded-lg ${
                    activeYears === year
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  } transition-all duration-200 shadow-lg`}
                >
                  {year} Semesters
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {semesters.slice(0, activeYears).map((semester, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <label className="block text-sm font-medium mb-2">
                  Semester {index + 1} SGPA
                </label>
                <input
                  type="number"
                  value={semester.value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    semester.error
                      ? 'ring-2 ring-red-500'
                      : 'focus:ring-orange-500 group-hover:bg-white/20'
                  }`}
                  placeholder="Enter SGPA"
                  step="0.01"
                  min="0"
                  max="10"
                />
                <AnimatePresence>
                  {semester.error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute text-xs text-red-400 mt-1"
                    >
                      {semester.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculateResults}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <FaCalculator className="text-xl" />
              Calculate
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetForm}
              className="flex-1 bg-gray-700/50 text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600/50 transition-all shadow-lg"
            >
              <IoMdRefresh className="text-xl" />
              Reset
            </motion.button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 p-8 bg-white/10 rounded-lg text-center border border-white/20"
              >
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                  Your Results
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-lg shadow-xl border border-white/10"
                  >
                    <p className="text-sm text-gray-300 mb-2">CGPA</p>
                    <p className="text-4xl font-bold text-orange-500">
                      {result.cgpa.toFixed(2)}
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-lg shadow-xl border border-white/10"
                  >
                    <p className="text-sm text-gray-300 mb-2">Percentage</p>
                    <p className="text-4xl font-bold text-pink-500">
                      {result.percentage.toFixed(2)}%
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <footer className="mt-8 text-center text-gray-400">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <FaGithub className="text-xl" />
            View on GitHub
          </motion.a>
        </footer>
      </div>

      <Dialog
        open={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg rounded-xl bg-gray-900 p-6 shadow-xl border border-white/20">
            <Dialog.Title className="text-lg font-medium text-white mb-4">
              How to Calculate CGPA
            </Dialog.Title>
            <div className="text-gray-300 space-y-4">
              <p>1. Enter your SGPA for each semester (0-10)</p>
              <p>2. Select the number of semesters you want to calculate</p>
              <p>3. Click Calculate to see your CGPA and percentage</p>
              <p className="text-sm text-gray-400">
                Note: SPPU uses a multiplication factor of 8.8 to convert CGPA to percentage
              </p>
            </div>
            <button
              onClick={() => setIsHelpOpen(false)}
              className="mt-6 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Got it!
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default App;