import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Layout,
  FullPageWrapper,
  Hero,
  About,
  Jobs,
  Featured,
  Projects,
  Contact,
} from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const ANCHORS = [
  'fp-home',
  'fp-about',
  'fp-jobs',
  'fp-projects',
  'fp-other-projects',
  'fp-contact',
];

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <FullPageWrapper anchors={ANCHORS}>
        <Hero />
        <About />
        <Jobs />
        <Featured />
        <Projects />
        <Contact />
      </FullPageWrapper>
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
