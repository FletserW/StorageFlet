/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 rounded-md shadow-md focus:outline-none"
    >
      {darkMode ? <Sun size={24} color="gray" /> : <Moon size={24} color="gray" />}
    </button>
  );
};

export default DarkModeToggle;
