// src/components/common/Header.tsx
'use client';

import React from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

export const Header = () => {
  const handleDownloadResume = () => {
    // Create an anchor element
    const link = document.createElement('a');
    link.href = '/resume/Lasantha_Kulasooriya_Resume.pdf';
    link.setAttribute('download', 'Lasantha_Kulasooriya_Resume.pdf'); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/LasaK97"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-500 transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/lasantha-kulasooriya/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-500 transition-colors"
          >
            <Linkedin size={24} />
          </a>
        </div>

        {/* Resume Button and Contact Button */}
        <div className="flex items-center space-x-4">
          {/* Resume Button */}
          <button
            onClick={handleDownloadResume}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2 rounded-lg 
            hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 
            shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 animate-gradient-x font-roboto"
          >
            <Download size={18} />
            Get my Resume
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2 rounded-lg 
            hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 
            shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 animate-gradient-x font-roboto"
          >
            <Mail size={18} />
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  );
};