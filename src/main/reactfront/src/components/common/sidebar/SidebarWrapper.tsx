import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface SideNavbarWrapperProps {
  $leftPos: number; // transient prop
  $top: number; // transient prop
}

const SideNavbarWrapper = styled.div<SideNavbarWrapperProps>`
  width: 200px;
  position: absolute;
  transition: all 0.8s;
  top: ${({ $top }) => $top}px;
  left: ${({ $leftPos }) => $leftPos}px;
`;

interface SidebarWrapperProps {
  children: React.ReactNode;
  leftPos?: number;
}

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({
  children,
  leftPos = 130, // 기본값 설정
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
  }, []);

  return (
    <SideNavbarWrapper ref={sideBarRef} $top={topPosition} $leftPos={leftPos}>
      {children}
    </SideNavbarWrapper>
  );
};

export default SidebarWrapper;
