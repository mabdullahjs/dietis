import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../app/Context";
import Logo from "../assets/images/logo.svg";
import { type ContextType } from "../types/contextType";

interface Props {
  children: React.ReactNode
  headerMenuShow: boolean
}

const Header: React.FC<Props> = (props: Props) => {
  const { mainMenu, mainMenuHandler } = useContext(MyContext) as ContextType;

  const navigate = useNavigate()
  //logout func
  const logoutFunc = ()=>{
    localStorage.removeItem('token');
    navigate('/')
  }

  const headerMenus = [
    {
      id: 1,
      name: "Residents"
    },
    {
      id: 2,
      name: "Teams"
    },
    {
      id: 3,
      name: "Employees"
    }
  ];

  const menus = [
    {
      id: 1,
      name: "Schedule",
      href: "/schedule",
      sub: [
        {
          id: 1,
          name: "Schedule",
          href: "/schedule"
        }
      ]
    },
    {
      id: 2,
      name: "Protocols",
      href: "/protocols",
      sub: [
        {
          id: 1,
          name: "Infochannel",
          href: "/protocols/infochannel"
        }
      ]
    },
    {
      id: 3,
      name: "Settings",
      href: "/settings",
      sub: [
        { id: 1, name: "Process", href: "/settings/process" },
        { id: 2, name: "Registration", href: "/settings/registration" }
      ]
    }
  ];

  const [state, setState] = useState<any>({});
  const [subMenuShow, setSubMenuShow] = useState<boolean>(true);

  const location = window.location.pathname;

  const sidebMenuHandler = (value: any): any => {
    setState(value);
  };

  const subMenuShowHandler = (): any => {
    setSubMenuShow(!subMenuShow);
  };

  useEffect(() => {
    menus.forEach((menu) => {
      if (menu.sub.length) {
        menu.sub.forEach((su) => {
          if (location.includes(su.href)) {
            setState(menu);
          }
        });
      } else {
        setState(menu);
      }
    });
  }, []);

  return (
    <div>
      <div className="header container">
        <div className="header-logo-bar" >
          <div>
            <Link to="/">
              <img src={Logo} alt={Logo} className="header-logo" />
            </Link>
          </div>
          <div className="header-bar" onClick={subMenuShowHandler}>
            {subMenuShow
              ? (
                <i className="fa-solid fa-bars"></i>
              )
              : (
                <i className="fa-solid fa-xmark"></i>
              )}
          </div>
        </div>
        {props.headerMenuShow && (
          <div className="header-menu">
            {headerMenus.map((el) => (
              <p
                key={el.id}
                className={
                  mainMenu === el.name
                    ? "header-menu-item header-menu-item__active"
                    : "header-menu-item"
                }
                onClick={() => mainMenuHandler(el.name)}
              >
                {el.name}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="header-sidebar-content">
        <div
          className={`header-sidebar ${subMenuShow ? "header-logic-show" : "header-logic-block"
            }`}
        >
          {menus.map((menu) => (
            <div className="container" key={menu.id}>
              <Link to={menu.sub.length > 0 ? menu.sub[0].href : "/"}>
                <p
                  className={
                    state.id === menu.id
                      ? `header-sidebar-item header-sidebar-main-item`
                      : `header-sidebar-item`
                  }
                  onClick={() => sidebMenuHandler(menu)}
                >
                  {menu.name}
                </p>
              </Link>
              {menu.sub.map((sub) => {
                return (
                  state.id === menu.id && (
                    <Link to={sub.href} key={sub.id}>
                      {location.includes(sub.href)
                        ? (
                          <p className="header-sidebar-item-active">
                            <p className="header-sidebar-item__sub-active"></p>
                            <p className="header-sidebar-item header-sidebar-item__sub">
                              {sub.name}
                            </p>
                          </p>
                        )
                        : (
                          <p className="header-sidebar-item-active">
                            <p className="header-sidebar-item__sub-dactive"></p>
                            <p className="header-sidebar-item">{sub.name}</p>
                          </p>
                        )}
                    </Link>
                  )
                );
              })}
            </div>
          ))}
              <p onClick={logoutFunc} className="header-sidebar-item" style={{marginLeft:'2rem'}}>
                Logout
              </p>
        </div>
        <div className="header-children">{props.children}</div>
      </div>
    </div>
  );
};

export default Header;
