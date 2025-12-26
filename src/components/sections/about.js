import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Kotlin',
    'Swift',
    'Flutter',
    'Spring Boot',
    'K8s',
    'Next.js',
    'Node.js',
    'Vibe Coding',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              중학생 때 스크래치로 처음 프로그래밍을 접했고, 고등학생 때는 언리얼과 유니티로 게임을
              만들며 친구들에게 자랑하는 재미에 빠졌습니다. 두더지 잡기, 아이스 하키 — 지금 보면
              조잡하지만, 그때의 설렘은 아직도 기억납니다.
            </p>

            <p>
              어느 순간 게임보다 <strong>항상 손에 들고 다니는 앱</strong>에 더 끌렸습니다. 학교
              정보를 나무위키처럼 정리한 앱을 만들면서 안드로이드 개발에 입문했고, 그게 지금까지
              이어졌습니다.
            </p>

            <p>
              <a href="https://tada.global/" target="_blank" rel="noreferrer">
                TADA
              </a>
              (100만+)에서 Android를,{' '}
              <a
                href="https://play.google.com/store/apps/details?id=com.tagless"
                target="_blank"
                rel="noreferrer">
                Tagless Pay
              </a>
              (10만+)에서 BLE 기반 Android를, 디하이소프트에서 Android, iOS, Flutter를 개발하며
              다양한 플랫폼과 규모를 경험했습니다. 병무청 프로젝트에서는 여비 자동 산정 시스템과
              진료 정보 연동 시스템을 설계 및 구축하며 복잡한 요구사항을 해결했습니다. 이 과정에서
              모바일을 넘어 시스템 전체를 바라보는 시야를 갖게 되었습니다.
            </p>

            <p>
              현재는 스타트업을 공동창업하여 <strong>웹, 백엔드, 인프라 전반</strong>을 직접
              설계하고 있습니다. 모바일 개발자로 시작했지만, 이제는 시스템 아키텍트로 제품 전체를
              설계합니다. AI를 적극 활용하는 <strong>Vibe Coding</strong>으로 1인 개발의 한계를
              넘어서고 있습니다.
            </p>

            <p>최근 주로 사용하는 기술들입니다:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
