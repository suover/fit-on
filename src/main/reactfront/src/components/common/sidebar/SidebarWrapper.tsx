import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SideNavbarWrapper = styled.div`
  width: 200px;
  position: absolute;
  left: 130px;
  transition: all 0.8s;
`;

const SidebarWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const sideBarRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState<number>(160);

  useEffect(() => {
    const handleScroll = () => {
      if (sideBarRef.current) {
        const positionY = window.scrollY;
        if (positionY > 150) {
          const targetPosition = positionY + 50;
          setTopPosition(targetPosition);
        } else {
          setTopPosition(160);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [topPosition]);

  return (
    <SideNavbarWrapper ref={sideBarRef} style={{ top: `${topPosition}px` }}>
      {children}
    </SideNavbarWrapper>
  );
};

export default SidebarWrapper;
