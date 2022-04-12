import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useLogout from '../../hooks/useLogout';
import Analysis from '../svgs/Analysis';
import Bell from '../svgs/Bell';
import Friends from '../svgs/Friends';
import HallOfFame from '../svgs/HallOfFame';
import Timer from '../svgs/Timer';
import User from '../svgs/User';
import crossIcon from './images_layout/cross_icon.svg';

const HeaderNav = styled.div`
  z-index: 999;
  div#navBarWrapper {
    position: absolute;
    @media screen and (max-width: 450px) {
      left: -100%;
      top: 0%;
    }
    transition: all 0.5s ease;
    padding-left: 28px;
    padding-top: 25px;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(17px);
    box-shadow: -9px -4px 10px 2px rgba(0, 0, 0, 0.15);
    border-radius: 0 40px 40px 0px;
    #crossIcon {
      transform: translate(37vw, 1vh);
      @media screen and (min-width: 450px) {
        display: none;
      }
    }
    ul {
      list-style: none;
      padding: 20px;
      padding: 0;
      margin-top: 40px;
      li {
        margin-bottom: 3px;
        display: flex;
        align-items: center;
        svg.menu-icon {
          width: 17px;
          height: auto;
        }
        a,
        p {
          padding: 4px 17px;
          border-radius: 25px;
          text-decoration: none;
          color: #3928b1;
          font-family: Helvetica;
          font-size: 18px;
          svg {
            margin-right: 11px;
          }
          svg#logOutPlaceHolder {
            visibility: hidden;
          }
          @media screen and (min-width: 450px) {
            &:hover {
              background-color: #f34506;
              color: white;
              svg g path {
                fill: white;
              }
            }
          }
        }
        &:last-child {
          p {
            color: #f34506;
            font-weight: bold;
            cursor: pointer;
            margin-left: 20px;
            @media screen and (min-width: 450px) {
              display: none;
              &: hover {
                color: white;
              }
            }
          }
        }
      }
      /* Page indicator: only with desktop view */
      @media screen and (min-width: 450px) {
        a.${(props) => props.selectedPage} {
          background-color: #f34506;
          border-radius: 25px;
          color: white;
          svg g path {
            fill: white;
          }
        }
      }
      @media screen and (min-width: 450px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        height: 500px;
      }
    }

    @media screen and (min-width: 450px) {
      position: absolute;
      left: 0;
      top: 20vh;
      border-radius: 0;
      background-color: white;
      padding-left: 57px;
      box-shadow: none;
      padding: 10px;
      flex-direction: column;
      justify-content: center;
      ul {
        display: flex;
        li {
          margin-bottom: 35px;
        }
      }
    }
  }

  @media screen and (max-width: 799px) {
    #navBarWrapper {
      left: -100%;
      width: 60%;
      height: 100vh;
    }

    #mobile-links {
      display: flex;
    }
  }

  @media screen and (min-width: 800px) {
    #navBarWrapper {
      display: block;
      width: 20%;
    }
    width: 20%;

    #mobile-links {
      display: none !important;
    }
  }
`;

const closeMobileSideBar = () => {
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const sidebar = document.getElementById('navBarWrapper');
  sidebar.style.left = '-100%';
  hamburgerIcon.style.display = 'block';
};

const Sidebar = (props) => {
  const { logout } = useLogout();

  return (
    <HeaderNav selectedPage={props.selectedPage}>
      <div id="navBarWrapper">
        <img src={crossIcon} id="crossIcon" alt="cross icon" onClick={closeMobileSideBar} />
        <ul>
          <li>
            <Link to="/home" className="timer">
              <Timer width="18" height="17" />
              Timer
            </Link>
          </li>
          <li>
            <Link to="/stats" className="stats">
              <Analysis width="18" height="17" />
              My Stats
            </Link>
          </li>
          <li>
            <Link to="/friends" className="friends">
              <Friends width="18" height="17" />
              Friends
            </Link>
          </li>
          <li>
            <Link to="/hallOfFame" className="hallOfFame">
              <HallOfFame width="18" height="17" />
              Hall of Fame
            </Link>
          </li>
          <li id="mobile-links">
            <Link id="notification" to="/notifications">
              <Bell width="18" height="17" size={3} />
              Notifications
            </Link>
          </li>

          <li id="mobile-links">
            <Link to="/profile" className="hallOfFame">
              <User width="18" height="17" size={3} />
              Profile
            </Link>
          </li>

          {/* <li id="mobile-links">
            <p style={{ color: '#f34506', cursor: 'pointer' }} onClick={logout}>
              Log Out
            </p>
          </li> */}

          <li>
            <p onClick={logout}>Log Out</p>
          </li>
        </ul>
      </div>
    </HeaderNav>
  );
};

export default React.memo(Sidebar);
