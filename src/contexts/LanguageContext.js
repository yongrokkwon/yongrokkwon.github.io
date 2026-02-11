import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ko from '../locales/ko.json';
import en from '../locales/en.json';

const translations = { ko, en };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('ko');
  const [isHeroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang');
      if (saved && (saved === 'ko' || saved === 'en')) {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = useCallback(lang => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  }, []);

  const t = useCallback(
    key => {
      const value = translations[language]?.[key];
      if (!value) {
        console.warn(`Missing translation: ${key} for language: ${language}`);
        return translations['ko']?.[key] || key;
      }
      return value;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHeroVisible, setHeroVisible }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
