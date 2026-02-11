import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

import PropTypes from 'prop-types';

const AnimatedCta = ({ isHeroVisible, type }) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  if (type === 'hero') {
    return (
      <>
        <AnimatePresence>
          {isHeroVisible && (
            <motion.div layoutId="hero-contact">
              <a
                className="email-link"
                href="mailto:yongrok.kwon@gmail.com"
                target="_blank"
                rel="noreferrer">
                {t('hero.contact')}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isHeroVisible && (
            <motion.div layoutId="lang-toggle">
              <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle language">
                {language === 'ko' ? 'EN' : 'KO'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // nav
  return (
    <>
      <AnimatePresence>
        {!isHeroVisible && (
          <motion.div layoutId="hero-contact">
            <a
              className="nav-contact"
              href="mailto:yongrok.kwon@gmail.com"
              target="_blank"
              rel="noopener noreferrer">
              {t('hero.contact')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isHeroVisible && (
          <motion.div layoutId="lang-toggle">
            <button
              className="nav-lang-toggle"
              onClick={toggleLanguage}
              aria-label="Toggle language">
              {language === 'ko' ? 'EN' : 'KO'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

AnimatedCta.propTypes = {
  isHeroVisible: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default AnimatedCta;
