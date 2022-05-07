import { Style } from '@libs/const';
import Link from 'next/link';
import { Ref, useEffect, useRef, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import styled from 'styled-components';
import TechnologyCard from './TechnologyCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media only screen and (max-width: 750px) {
    overflow: hidden;
    padding: 0;
  }
`;

const AnimationBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  @media only screen and (max-width: 750px) {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    touch-action: pan-x;

    cursor: grab;

    display: flex;
    width: 100%;
    position: relative;
    gap: 0px;
  }
`;

const PageBtnBox = styled.div`
  display: none;
  margin-top: 30px;
  gap: 7px;
  align-items: center;

  @media only screen and (max-width: 750px) {
    display: flex;
  }
`;

const PageBtn = styled.div`
  width: 6px;
  height: 6px;
  background-color: #b0b0b0;
  border-radius: 100%;

  &.current {
    background-color: ${(props) => props.theme.accent1Color};
    width: 9px;
    height: 9px;
  }
`;

const MoreBtnBox = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  a {
    border-radius: 100px;
    padding: 12px 40px;
    background-color: ${(props) => props.theme.accent1Color};
    color: #ffffff;
    font-size: 23px;
    font-family: 'Poppins', sans-serif;
    display: flex;
    align-items: center;

    svg {
      position: relative;
      left: 10px;
    }
  }

  @media only screen and (max-width: 1100px) {
    display: flex;
  }

  @media only screen and (max-width: ${Style.mobileWidth}) {
    a {
      font-size: 18px;
    }
  }
`;

const LOOP_TIME = 4;
const T_DURATION = 0.25;

const getTranslateStyle = (width: any, transition: any) => {
  return `
    transform: translate3d(-${width}px, 0, 0);
    transition: ${transition ? `${T_DURATION}s` : '0s'};
  `;
};

const Technology = ({ technology }: any) => {
  const $animationView = useRef<any>();
  const $animationBox = useRef<any>();
  const $animationCircle = useRef<any>();

  useEffect(() => {
    const ITEM_COUNT = technology.length + 4;
    let interval = undefined as any;
    let cnt = 2;
    let timeout = undefined as any;
    let touchAble = true;
    let touchstart = false;
    let mouseX = undefined as any;
    let touchStartCurrentX = undefined as any;
    let prevX = undefined as any;
    let mouseDirection = undefined as any;

    const getCurrentX = () => {
      const animationViewX = $animationView.current.getBoundingClientRect().x;
      const animationBoxX = $animationBox.current.getBoundingClientRect().x;

      return animationBoxX - animationViewX;
    };

    const getWidth = () => {
      return $animationView.current.clientWidth;
    };

    const setAnimationCircle = (current: any) => {
      if ($animationCircle.current) {
        const circles = $animationCircle.current.children;

        for (let i = 0; i < circles.length; i++) {
          if (i === current) {
            if (!circles[i].classList.contains('current')) {
              circles[i].classList.add('current');
            }
          } else {
            if (circles[i].classList.contains('current')) {
              circles[i].classList.remove('current');
            }
          }
        }
      }
    };

    const setAnimation = () => {
      interval = setInterval(() => {
        try {
          const width = getWidth();
          cnt++;
          if (cnt >= ITEM_COUNT - 1) {
            cnt = 2;
            $animationBox.current.style = getTranslateStyle(width * cnt, false);
            setTimeout(() => {
              cnt++;
              $animationBox.current.style = getTranslateStyle(
                width * cnt,
                true
              );
            }, 1);
          } else {
            $animationBox.current.style = getTranslateStyle(width * cnt, true);
          }

          let circleIdx = cnt - 2;
          circleIdx = circleIdx === 0 ? 1 : circleIdx;
          circleIdx = circleIdx === technology.length ? 0 : circleIdx;
          setAnimationCircle(circleIdx);
        } catch (e) {
          clearInterval(interval);
        }
      }, LOOP_TIME * 1000);
    };

    const handleTouchStart = (event: any) => {
      event.preventDefault();
      if (touchAble) {
        touchstart = true;
        mouseX = event.clientX;
        prevX = mouseX;
        touchStartCurrentX = getCurrentX();

        if (cnt === technology.length + 2) {
          const width = getWidth();
          cnt = 2;
          $animationBox.current.style = getTranslateStyle(width * cnt, false);
        }
        $animationBox.current.style = `transform: translate3d(${getCurrentX()}px, 0, 0);`;

        clearTimeout(timeout);
        clearInterval(interval);
      }
    };

    const handleTouchEnd = (event: any) => {
      event.preventDefault();
      if (touchstart) {
        touchstart = false;
        touchAble = false;
        const width = getWidth();
        if (mouseDirection === 1) {
          cnt++;
          $animationBox.current.style = getTranslateStyle(width * cnt, true);
          timeout = setTimeout(() => {
            if ($animationBox.current) {
              if (cnt >= ITEM_COUNT - 2) {
                cnt = ITEM_COUNT - cnt;
                $animationBox.current.style = getTranslateStyle(
                  width * cnt,
                  false
                );
              }
              setAnimation();
              touchAble = true;
            }
          }, T_DURATION * 1000);
          let circleIdx = cnt - 2;
          circleIdx = circleIdx >= technology.length ? 0 : circleIdx;
          setAnimationCircle(circleIdx);
        } else if (mouseDirection === 0) {
          cnt--;
          $animationBox.current.style = getTranslateStyle(width * cnt, true);
          timeout = setTimeout(() => {
            if ($animationBox.current) {
              if (cnt <= 1) {
                cnt = ITEM_COUNT - cnt - 2;
                $animationBox.current.style = getTranslateStyle(
                  width * cnt,
                  false
                );
              }
              setAnimation();
              touchAble = true;
            }
          }, T_DURATION * 1000);
          let circleIdx = cnt - 2;
          circleIdx = circleIdx === -1 ? technology.length - 1 : circleIdx;
          setAnimationCircle(circleIdx);
        }

        timeout = setTimeout(() => {
          mouseDirection = null;
        }, 1);
      }
    };

    const handleSlide = (event: any) => {
      event.preventDefault();
      if (touchstart) {
        const currentMouseX = event.clientX;

        if (currentMouseX) {
          if (currentMouseX - prevX <= 0) {
            mouseDirection = 1; // 왼쪽
          } else {
            mouseDirection = 0; // 오른쪽
          }

          const gap = mouseX - currentMouseX;
          $animationBox.current.style = `transform: translate3d(${
            touchStartCurrentX - gap
          }px, 0, 0);`;

          prevX = currentMouseX;
        }
      }
    };

    const handleClick = (event: any) => {
      if (mouseDirection === 1 || mouseDirection === 0) {
        event.preventDefault();
      }
    };

    const addEvent = () => {
      $animationBox.current.addEventListener('pointerdown', handleTouchStart);
      $animationBox.current.addEventListener('pointerup', handleTouchEnd);
      $animationBox.current.addEventListener('pointerleave', handleTouchEnd);
      $animationBox.current.addEventListener('pointermove', handleSlide);
      $animationBox.current.addEventListener('touchmove', handleSlide);
      $animationBox.current.addEventListener('click', handleClick);
    };

    const removeEvent = () => {
      $animationBox.current.removeEventListener(
        'pointerdown',
        handleTouchStart
      );
      $animationBox.current.removeEventListener('pointerup', handleTouchEnd);
      $animationBox.current.removeEventListener('pointerleave', handleTouchEnd);
      $animationBox.current.removeEventListener('pointermove', handleSlide);
      $animationBox.current.removeEventListener('touchmove', handleSlide);
      $animationBox.current.removeEventListener('click', handleClick);
    };

    const resize = () => {
      if (
        $animationView.current &&
        $animationBox.current &&
        $animationCircle.current
      ) {
        clearInterval(interval);
        removeEvent();

        if (window.innerWidth < 750) {
          addEvent();
          $animationBox.current.style = getTranslateStyle(
            getWidth() * cnt,
            false
          );
          setAnimation();

          if (cnt === technology.length + 2) {
            setAnimationCircle(0);
          } else {
            setAnimationCircle(cnt - 2);
          }
        } else {
          cnt = 2;
          $animationBox.current.style = '';
        }
      }
    };

    resize();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [$animationBox, $animationView]);

  return (
    <Container ref={$animationView}>
      <AnimationBox ref={$animationBox}>
        <TechnologyCard isClone data={technology[technology.length - 2]} />
        <TechnologyCard isClone data={technology[technology.length - 1]} />
        {technology.map((data: any, i: number) => (
          <TechnologyCard key={`techcard${i}`} data={data} />
        ))}
        <TechnologyCard isClone data={technology[0]} />
        <TechnologyCard isClone data={technology[1]} />
      </AnimationBox>
      <PageBtnBox ref={$animationCircle}>
        {technology.map((_: any, i: number) => (
          <PageBtn key={`circle${i}`} />
        ))}
      </PageBtnBox>
      <MoreBtnBox>
        <Link href="/business/our-purpose">
          <a>
            <span>GO</span>
            <BsArrowRight />
          </a>
        </Link>
      </MoreBtnBox>
    </Container>
  );
};

export default Technology;
