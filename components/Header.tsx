import { MenuInfo, Style } from '@libs/const';
import { Wrapper } from '@styles/common';
import Link from 'next/link';
import styled from 'styled-components';
import Logo from './Logo';
import { IoIosArrowDown } from 'react-icons/io';
import { FiMenu } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';

const LogoBox = styled.div``;

interface MenuProps {
  cnt: boolean;
}

const Menu = styled.a<MenuProps>`
  display: flex;
  align-items: center;
  font-size: 15px;
  gap: 5px;
  color: ${(props) => props.theme.textColor};

  & > svg {
    color: #a0a0a0;
  }

  @media only screen and (max-width: ${Style.mobileWidth}) {
    background-color: ${(props) =>
      props.cnt ? props.theme.accent1Color : '#f2f1f1'};
    width: 100%;
    color: ${(props) =>
      props.cnt ? '#ffffff' : props.theme.textColor} !important;
    height: ${`${Style.mobileMenuHeight}px`};
    padding: 0 20px;

    svg {
      display: none;
    }
  }
`;

const MobileBtn = styled.button`
  display: none;
  font-size: 25px;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: ${Style.mobileWidth}) {
    display: flex;
  }
`;

interface SHeaderProps {
  active: boolean;
}

const SHeader = styled.header<SHeaderProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${`${Style.headerHeight}px`};
  z-index: 9999;
  box-shadow: ${(props) =>
    props.active ? '' : '0 0 10px -3px rgba(0, 0, 0, 0.5)'};
  background-color: ${(props) => (props.active ? 'transparent' : '#ffffff')};
  transition: background-color 0.1s ease-in-out;

  ${Menu} {
    color: ${(props) => (props.active ? '#ffffff' : props.theme.textColor)};
    & > svg {
      color: ${(props) => (props.active ? '#ffffff' : '#a0a0a0')};
    }
  }

  ${MobileBtn} {
    color: ${(props) => (props.active ? '#ffffff' : props.theme.textColor)};
  }

  &:hover {
    background: none;
    background-color: #ffffff;
    box-shadow: 0 0 10px -3px rgba(0, 0, 0, 0.5);
    ${LogoBox} img {
      filter: none;
    }

    ${Menu} {
      color: ${(props) => props.theme.textColor};

      & > svg {
        color: #a0a0a0;
      }
    }

    ${MobileBtn} {
      color: ${(props) => props.theme.textColor};
    }
  }
`;

const SWrapper = styled(Wrapper)`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

interface GnbBoxProps {
  menuOn: boolean;
  menuHeight: string;
}

const GnbBox = styled.div<GnbBoxProps>`
  display: flex;
  gap: 45px;
  font-family: 'Poppins', sans-serif;
  height: 100%;

  @media only screen and (max-width: ${Style.mobileWidth}) {
    position: absolute;
    top: ${`${Style.headerHeight}px`};
    left: 0;
    width: 100%;
    flex-direction: column;
    gap: 0;
    overflow: hidden;
    height: initial;
    border: ${(props) => (props.menuOn ? '1px solid #d7d7d7' : 'none')};
    border-left: none;
    border-right: none;
    max-height: ${(props) => (props.menuOn ? props.menuHeight : '0px')};
    transition: max-height 0.2s ease-in-out;
  }
`;

interface MenuListProps {
  isLast: boolean;
  menuHeight: string;
}

const MenuList = styled.ul<MenuListProps>`
  position: absolute;
  display: none;
  top: ${`${Style.headerHeight}px`};
  left: ${(props) => (props.isLast ? '0%' : '50%')};
  transform: translate(-50%);
  background-color: ${(props) => props.theme.bgColor};
  white-space: nowrap;
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 0.4);
  border-top: 3px solid ${(props) => props.theme.accent1Color};
  font-size: 15px;
  a {
    display: block;
    padding: 10px 30px;

    &:hover {
      background-color: ${(props) => props.theme.accent1Color};
      color: #ffffff;
    }
  }

  @media only screen and (max-width: ${Style.mobileWidth}) {
    display: block;
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    border: none;
    background-color: #ffffff;
    overflow: hidden;
    max-height: ${(props) => props.menuHeight};
    transition: max-height 0.2s ease-in-out;

    a {
      padding: 0 30px;
      height: ${`${Style.mobileLowerMenuHeight}px`};
      display: flex;
      align-items: center;
      font-size: 14px;
      &:hover {
        background-color: #ffffff;
        color: ${(props) => props.theme.accent1Color};
      }

      &::before {
        content: '-';
        margin-right: 5px;
      }
    }

    li:not(:last-child) {
      border-bottom: 1px solid #d7d7d7;
    }
  }
`;

const Gnb = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;

  @media only screen and (min-width: ${Style.mobileWidth}) {
    &:hover {
      ${Menu} {
        color: ${(props) => props.theme.accent1Color};
      }
      ${MenuList} {
        display: block;
      }
    }
  }

  @media only screen and (max-width: ${Style.mobileWidth}) {
    flex-direction: column;
    &:not(:first-child) > a {
      border-top: 1px solid #d7d7d7;
    }
  }
`;

interface HeaderProps {
  isHome: boolean;
}

interface ICntOnMenu {
  index: number;
  lowerCount: number;
}

export default function Header({ isHome }: HeaderProps) {
  const [scrollTop, setScrollTop] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOn, setMenuOn] = useState(false);
  const [cntOnMenu, setCntOnMenu] = useState<ICntOnMenu | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    };
    const handleResize = () => {
      if (document.body.clientWidth <= Style.mobileWidthNum) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setMenuOn(false);
        setCntOnMenu(undefined);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [setScrollTop]);

  const toggleMenuOn = () => {
    setMenuOn((prev) => !prev);
    setCntOnMenu(undefined);
  };

  const onMenuClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number,
    lowerCount: number
  ) => {
    if (isMobile && lowerCount > 0) {
      event.preventDefault();
      if (cntOnMenu && cntOnMenu.index === index) {
        setCntOnMenu(undefined);
      } else {
        setCntOnMenu({
          index,
          lowerCount,
        });
      }
    }
  };

  const onLinkClick = () => {
    setCntOnMenu(undefined);
    setMenuOn(false);
  };

  return (
    <SHeader active={isHome && scrollTop && !menuOn}>
      <SWrapper>
        <LogoBox>
          <Logo
            size={150}
            filter={
              isHome && scrollTop && !menuOn
                ? 'grayscale(100%) contrast(500%)'
                : ''
            }
          />
        </LogoBox>
        <GnbBox
          menuOn={isMobile && menuOn}
          menuHeight={`${
            Style.mobileMenuHeight * MenuInfo.length +
            (cntOnMenu ? cntOnMenu.lowerCount * Style.mobileLowerMenuHeight : 0)
          }px`}
        >
          {MenuInfo.map((menu, i) => (
            <Gnb key={`gnb${menu.name}`}>
              <Link href={menu.path}>
                <Menu
                  cnt={i === cntOnMenu?.index}
                  onClick={(event) =>
                    onMenuClick(event, i, menu.lower ? menu.lower.length : 0)
                  }
                >
                  <span>{menu.name}</span>
                  {menu.lower && <IoIosArrowDown />}
                </Menu>
              </Link>
              {menu.lower && (
                <MenuList
                  menuHeight={
                    cntOnMenu?.index === i
                      ? `${
                          cntOnMenu.lowerCount * Style.mobileLowerMenuHeight
                        }px`
                      : '0px'
                  }
                  isLast={MenuInfo.length - 1 === i}
                >
                  {menu.lower.map((lowerMenu) => (
                    <li key={`lower${lowerMenu.name}`}>
                      <Link href={lowerMenu.path}>
                        <a onClick={onLinkClick}>{lowerMenu.name}</a>
                      </Link>
                    </li>
                  ))}
                </MenuList>
              )}
            </Gnb>
          ))}
        </GnbBox>
        <MobileBtn onClick={toggleMenuOn}>
          <FiMenu />
        </MobileBtn>
      </SWrapper>
    </SHeader>
  );
}
