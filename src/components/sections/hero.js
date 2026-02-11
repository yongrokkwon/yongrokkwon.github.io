import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { useLanguage } from '../../contexts/LanguageContext';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h2 {
    background: linear-gradient(90deg, var(--green), var(--blue));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  @keyframes pulse {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgba(100, 255, 218, 0.4);
    }
    50% {
      box-shadow: 0 0 15px 5px rgba(100, 255, 218, 0.2);
    }
  }

  .hero-cta {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 50px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    animation: pulse 2s ease-in-out infinite;

    &:hover {
      box-shadow: 0 0 25px rgba(100, 255, 218, 0.5);
      transform: none;
      animation: none;
    }
  }

  .lang-toggle {
    ${({ theme }) => theme.mixins.bigButton};
    cursor: pointer;
    background-color: transparent;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { language, setLanguage, t, isHeroVisible } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  const one = <h1>{t('hero.greeting')}</h1>;
  const two = <h2 className="big-heading">{t('hero.name')}</h2>;
  const three = <h3 className="medium-heading">{t('hero.subtitle')}</h3>;
  const four = (
    <>
      <p>
        <a href="https://tada.global/" target="_blank" rel="noreferrer">
          {t('hero.description.tada')}
        </a>
        ,{' '}
        <a
          href="https://play.google.com/store/apps/details?id=com.tagless"
          target="_blank"
          rel="noreferrer">
          {t('hero.description.tagless')}
        </a>
        ,{' '}
        <a
          href="https://play.google.com/store/apps/details?id=kr.go.smes.app"
          target="_blank"
          rel="noreferrer">
          {t('hero.description.watta')}
        </a>
        {t('hero.description.suffix')}
      </p>
    </>
  );
  const five = (
    <div className="hero-cta">
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
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
