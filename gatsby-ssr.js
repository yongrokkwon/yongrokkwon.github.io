/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react';
import { LanguageProvider } from './src/contexts/LanguageContext';

export const wrapRootElement = ({ element }) => <LanguageProvider>{element}</LanguageProvider>;
