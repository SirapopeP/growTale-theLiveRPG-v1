'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    // Avoid SSR/client mismatch by not rendering icon/title until mounted
    return (
      <button aria-label="Toggle theme" className="btn btn-ghost btn-sm smooth-transform focus-ring interactive" onClick={toggleTheme} />
    );
  }
  return (
    <button
      aria-label="Toggle theme"
      className="btn btn-ghost btn-sm smooth-transform focus-ring interactive"
      onClick={toggleTheme}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};


