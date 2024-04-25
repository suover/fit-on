import React, { useEffect, useState } from 'react';

import ToTopBtn from '../../styles/common/TopBtn';

const TopBtn = () => {
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  const scrollToTop = (): void => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const showTopBtn = (): void => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', showTopBtn);
    return () => {
      window.removeEventListener('scroll', showTopBtn);
    };
  }, []);

  return (
    <ToTopBtn onClick={scrollToTop} $isShow={showTopBtn}>
      TOP
    </ToTopBtn>
  );
};

export default TopBtn;
