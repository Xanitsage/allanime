import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2 bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-neon transition-all"
      aria-label="Toggle dark/light mode"
    >
      {theme === 'dark' ? '🌙' : '🌞'}
    </button>
  );
}
