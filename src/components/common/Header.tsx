'use client';

import React from 'react';
import { Github, Linkedin, Mail, Download, BookOpen } from 'lucide-react';

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
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/LasaK97"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-3 rounded-full hover:bg-primary-accent/20 text-medium-gray hover:text-primary-accent transition-all duration-300 transform hover:scale-110"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/lasantha-kulasooriya/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-3 rounded-full hover:bg-secondary-accent/20 text-medium-gray hover:text-secondary-accent transition-all duration-300 transform hover:scale-110"
          >
            <Linkedin size={20} />
          </a>
          {/* You'll update this with your Medium URL */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-3 rounded-full hover:bg-tertiary-accent/20 text-medium-gray hover:text-tertiary-accent transition-all duration-300 transform hover:scale-110"
          >
            <BookOpen size={20} />
          </a>
        </div>

        {/* Resume Button and Contact Button */}
        <div className="flex items-center space-x-4">
          {/* Resume Button */}
          <button
            onClick={handleDownloadResume}
            className="bg-white/10 backdrop-blur-md border border-primary-accent/30 shadow-lg px-4 py-2 sm:px-6 sm:py-3 rounded-lg 
            hover:bg-primary-accent/20 text-off-white hover:text-primary-accent
            transition-all duration-300 transform hover:scale-105
            flex items-center gap-2 font-medium"
          >
            <Download size={18} />
            <span className="sm:inline hidden">Resume</span>
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            className="bg-white/10 backdrop-blur-md border border-secondary-accent/30 shadow-lg px-4 py-2 sm:px-6 sm:py-3 rounded-lg 
            hover:bg-secondary-accent/20 text-off-white hover:text-secondary-accent
            transition-all duration-300 transform hover:scale-105
            flex items-center gap-2 font-medium"
          >
            <Mail size={18} />
            <span className="sm:inline hidden">Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
};