import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface SideNavbarWrapperProps {
  $leftPos: number; // transient prop
  $topPos: number; // transient prop
}

const SideNavbarWrapper = styled.div<SideNavbarWrapperProps>`
  width: 200px;
  position: absolute;
  transition: all 0.8s;
  top: ${({ $topPos }) => $topPos}px;
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
        let positionY = window.scrollY;
        let maxHeight = document.documentElement.scrollHeight - 360; // 초기값 + 임의 footer 높이
        let sideBarHeight = sideBarRef.current.offsetHeight;
        let maxScroll = maxHeight - sideBarHeight;

        if (positionY < 150) {
          setTopPosition(160);
        } else if (positionY > 150 && positionY < maxScroll) {
          let targetPos = positionY + 50;
          setTopPosition(targetPos);
        } else {
          setTopPosition(maxScroll + 50);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <SideNavbarWrapper
      ref={sideBarRef}
      $topPos={topPosition}
      $leftPos={leftPos}
    >
      {children}
    </SideNavbarWrapper>
  );
};

export default SidebarWrapper;
