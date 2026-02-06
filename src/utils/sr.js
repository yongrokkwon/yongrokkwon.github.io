// ScrollReveal 비활성화 (fullpage.js 사용으로 인해)
// 기존 코드: import ScrollReveal from 'scrollreveal';

// fullpage.js를 사용하므로 ScrollReveal 비활성화
// 모든 sr.reveal() 호출을 무시하기 위한 no-op 객체
const sr = {
  reveal: () => {},
  clean: () => {},
  destroy: () => {},
  sync: () => {},
};

export default sr;
