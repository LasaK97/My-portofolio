// src/components/sections/ContactSection.tsx
'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Check, Loader } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const contactInfo = {
    phone: '+94 70 535 6893',
    email: 'lkulasooriya97@gmail.com',
    location: 'Colombo, Sri Lanka'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }
      
      // Show success indicator
      setShowSuccess(true);
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Hide success indicator after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to send email');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen relative py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-5 mb-5 md:mb-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent font-orbitron uppercase tracking-wide">
          CONTACT
        </h2>
        {/* Subtitle */}
        <div className="text-center mb-8">
          <p className="text-gray-400 text-center mb-8">
            Solving complex problems with AI & data. {" "}
            <span className="text-cyan-400 underline cursor-pointer font-orbitron">
              Let&apos;s connect!
            </span>
          </p>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors">
            <span className="text-cyan-400">
              <Phone className="w-4 h-4" />
            </span>
            <span>{contactInfo.phone}</span>
          </a>
          
          <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors">
            <span className="text-cyan-400">
              <Mail className="w-4 h-4" />
            </span>
            <span>{contactInfo.email}</span>
          </a>
          
          <a href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.location)}`} className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors">
            <span className="text-cyan-400">
              <MapPin className="w-4 h-4" />
            </span>
            <span>{contactInfo.location}</span>
          </a>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded exp-gradient-rotate" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="relative w-full p-3 bg-[#0f172a] rounded text-gray-300 focus:outline-none"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded exp-gradient-rotate" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="relative w-full p-3 bg-[#0f172a] rounded text-gray-300 focus:outline-none"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Subject Input */}
          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded exp-gradient-rotate" />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="relative w-full p-3 bg-[#0f172a] rounded text-gray-300 focus:outline-none"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Message Input */}
          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded exp-gradient-rotate" />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="relative w-full p-3 bg-[#0f172a] rounded text-gray-300 focus:outline-none min-h-[150px] resize-none"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Error message */}
          {submitError && (
            <div className="text-red-500 text-center">{submitError}</div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2 rounded-lg 
              hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 
              shadow-lg hover:shadow-purple-500/50 flex items-center gap-2 animate-gradient-x"
            >
              {isSubmitting ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : showSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  Sent!
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;