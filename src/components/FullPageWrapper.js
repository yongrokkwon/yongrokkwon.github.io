import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

// SSR 호환성: 클라이언트에서만 fullpage 로드
const FullPageWrapper = ({ children, anchors }) => {
  const [FullpageComponent, setFullpageComponent] = React.useState(null);
  const [error, setError] = React.useState(null);
  const { setHeroVisible } = useLanguage();

  React.useEffect(() => {
    // SSR에서는 실행되지 않음
    import('@fullpage/react-fullpage')
      .then(module => {
        setFullpageComponent(() => module.default);
      })
      .catch(err => {
        console.error('[FullPageWrapper] Failed to load fullpage.js:', err);
        setError(err);
      });
  }, []);

  const handleLeave = (origin, destination) => {
    setHeroVisible(destination.index === 0);
  };

  // 에러 발생 시
  if (error) {
    return <StyledFallback>{children}</StyledFallback>;
  }

  // SSR 또는 로딩 중: 기본 레이아웃으로 렌더링
  if (!FullpageComponent) {
    return <StyledFallback>{children}</StyledFallback>;
  }

  return (
    <FullpageComponent
      licenseKey={'gplv3-license'}
      scrollingSpeed={700}
      anchors={anchors}
      navigation={true}
      navigationPosition={'right'}
      scrollOverflow={true}
      verticalCentered={true}
      css3={true}
      easing={'ease-out'}
      easingcss3={'ease-out'}
      fixedElements={'#nav-header, .side-element'}
      credits={{ enabled: false }}
      onLeave={handleLeave}
      // 반응형: 768px 이하에서 fullpage 비활성화
      responsiveWidth={768}
      render={() => (
        <div id="fullpage-wrapper">
          {React.Children.map(children, (child, index) => (
            <div className="section" key={index}>
              <div className="section-content">{child}</div>
            </div>
          ))}
        </div>
      )}
    />
  );
};

const StyledFallback = styled.div`
  display: flex;
  flex-direction: column;
`;

FullPageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  anchors: PropTypes.arrayOf(PropTypes.string),
};

FullPageWrapper.defaultProps = {
  anchors: ['fp-home', 'fp-about', 'fp-jobs', 'fp-projects', 'fp-other-projects', 'fp-contact'],
};

export default FullPageWrapper;
