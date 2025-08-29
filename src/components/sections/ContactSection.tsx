// src/components/sections/ContactSection.tsx
'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Check, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="min-h-screen relative py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-2 mb-5 md:mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent font-orbitron uppercase tracking-wide">
          Neural Connect
        </h2>
        {/* Subtitle */}
        <div className="text-center mb-24">
          <p className="text-medium-gray text-center text-lg">
            Ready to build the future with AI? {" "}
            <span className="text-neon-orange underline cursor-pointer font-orbitron animate-pulse">
              Let&apos;s connect!
            </span>
          </p>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 text-off-white hover:text-neon-orange transition-all duration-300 p-3 rounded-lg glassmorphism hover:border-neon-orange/50 border border-transparent">
            <span className="text-neon-orange p-2 rounded-full bg-neon-orange/10">
              <Phone className="w-5 h-5" />
            </span>
            <span className="font-medium">{contactInfo.phone}</span>
          </a>
          
          <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 text-off-white hover:text-cyber-cyan transition-all duration-300 p-3 rounded-lg glassmorphism hover:border-cyber-cyan/50 border border-transparent">
            <span className="text-cyber-cyan p-2 rounded-full bg-cyber-cyan/10">
              <Mail className="w-5 h-5" />
            </span>
            <span className="font-medium">{contactInfo.email}</span>
          </a>
          
          <a href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.location)}`} className="flex items-center gap-4 text-off-white hover:text-neon-purple transition-all duration-300 p-3 rounded-lg glassmorphism hover:border-neon-purple/50 border border-transparent">
            <span className="text-neon-purple p-2 rounded-full bg-neon-purple/10">
              <MapPin className="w-5 h-5" />
            </span>
            <span className="font-medium">{contactInfo.location}</span>
          </a>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-neon-orange via-neon-purple to-cyber-cyan rounded animate-gradient-x" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="relative w-full p-4 bg-charcoal rounded text-off-white focus:outline-none focus:ring-2 focus:ring-neon-orange/50 placeholder-medium-gray font-medium"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-cyber-cyan via-neon-purple to-hot-pink rounded animate-gradient-x" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="relative w-full p-4 bg-charcoal rounded text-off-white focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 placeholder-medium-gray font-medium"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Subject Input */}
          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-hot-pink via-neon-orange to-lime-green rounded animate-gradient-x" />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="relative w-full p-4 bg-charcoal rounded text-off-white focus:outline-none focus:ring-2 focus:ring-hot-pink/50 placeholder-medium-gray font-medium"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Message Input */}
          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-neon-purple via-cyber-cyan to-neon-orange rounded animate-gradient-x" />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="relative w-full p-4 bg-charcoal rounded text-off-white focus:outline-none focus:ring-2 focus:ring-neon-purple/50 min-h-[150px] resize-none placeholder-medium-gray font-medium"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Error message */}
          {submitError && (
            <div className="text-hot-pink text-center font-medium bg-hot-pink/10 p-3 rounded-lg border border-hot-pink/30">{submitError}</div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="relative bg-gradient-to-r from-neon-orange to-neon-purple text-white px-8 py-4 rounded-lg font-bold font-orbitron tracking-wide
              transition-all duration-500 transform flex items-center gap-3
              disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{
                scale: 1.08,
                boxShadow: "0 15px 35px rgba(6, 182, 212, 0.4)",
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <span className="relative z-10">
                {isSubmitting ? (
                  <>
                    <Loader className="w-6 h-6 animate-spin inline mr-2" />
                    NEURAL PROCESSING...
                  </>
                ) : showSuccess ? (
                  <>
                    <Check className="w-6 h-6 inline mr-2" />
                    TRANSMISSION COMPLETE!
                  </>
                ) : (
                  'INITIATE NEURAL LINK'
                )}
              </span>
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;