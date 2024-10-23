"use client";
import React, { useEffect, useState } from "react";
import style from "./sidebar.module.css";
import Image from "next/image";
import { SidBarLogo } from "@/src/Utils/images";
import {
  ic_AdminSettings,
  ic_Dashboard,
  ic_icon_container,
  ic_icon_SideBarTogal,
  ic_NevDropDown,
  ic_Profile,
  ic_Settings,
  ic_tax_pro_forma,
} from "@/src/Utils/svg";
import Heading3Fonts from "@/src/Typography/text/Heading3Fonts";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsedSidBar, setIsCollapsedSidBar] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const togalDropdown = () => {
    setIsCollapsed(!isCollapsed);
  };
  const togalSidBar = () => {
    setIsCollapsedSidBar(!isCollapsedSidBar);
  };
  const data1 = [
    {
      name: "Profile",
    },
    // {
    //     name: "Favorite",
    // },
    {
      name: "Logout",
    },
  ];
  const handleProfileDropDownClick = async (a) => {
    if (["Profile"].includes(a.name)) {
      router.push("/profile");
      setIsCollapsed(false);
    } else if (["Favorite"].includes(a.name)) {
      router.push("/profile");
      setIsCollapsed(false);
    } else if (["Logout"].includes(a.name)) {
      localStorage.clear();
      router.push("/login");
      setIsCollapsed(false);
      window.location.reload();
    }
  };

  const SidBarData = [
    {
      name: "Manage Plans",
      svg: ic_AdminSettings.icon(),
      pathName: "/manageplans",
    },

    {
      name: "Admin Settings",
      svg: ic_Settings.icon(),
      pathName: "/adminsettings",
    },
  ];

  const OnclickSideBar = (name, index) => {
    setActiveIndex(index);
    router.push(`${name}`);
    if (window.innerWidth <= 1320) {
      togalSidBar();
    }
  };
  const OnclickSideBarDashboard = () => {
    if (window.innerWidth <= 1320) {
      togalSidBar();
    }
    router.push(`/dashboard`);
  };

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("adminData");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
    }
  }, []);
  const currentUser = userData[0];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1430) {
        setIsCollapsedSidBar(true);
      } else {
        setIsCollapsedSidBar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={style.ContentSidbarMain}>
        <div
          className={
            !isCollapsedSidBar
              ? window.innerWidth <= 1430
                ? style.SidbarMainDivResponshiv
                : style.SidbarMainDiv
              : window.innerWidth <= 1430
              ? style.SidbarMainDivAfterTogalResponshiv
              : style.SidbarMainDivAfterTogal
          }
        >
          <div className={style.SideBarLogo}>
            <Image
              src={SidBarLogo}
              className={style.logoimg}
              alt="logo1"
              property="true"
            />

            <div
              className={style.TogalSidebarIcon44}
              onClick={() => togalSidBar()}
            >
              {ic_icon_SideBarTogal.icon()}
            </div>
          </div>
          <div className={style.SideBarContentDiv}>
            <div
              className={
                pathname.startsWith("/dashboard")
                  ? style.MainDivForSidebarTabActiv
                  : style.MainDivForSidebarTabDashboard
              }
              onClick={() => OnclickSideBarDashboard()}
            >
              <div className={style.SubMainDIvActivClass}>
                <span className={style.SidBarSvg}>{ic_Dashboard.icon()}</span>
                <Heading3Fonts
                  className={style.MainTabTextActiv}
                  text={"Dashboard"}
                />
              </div>
              <div className={style.NumberOfNewCostomer}>7</div>
            </div>
            {SidBarData.map((i, j) => (
              <div
                key={j}
                className={
                  pathname.startsWith(i.pathName)
                    ? style.MainDivForSidebarTabActivet
                    : style.MainDivForSidebarTab
                }
                onClick={() => OnclickSideBar(i.pathName)}
              >
                <span className={style.SidBarSvg}>{i.svg}</span>
                <Heading3Fonts text={i.name} />
              </div>
            ))}
          </div>
        </div>

        <div className={style.MainDivForNevBarAndContent}>
          <div className={style.NavBarSubMain}>
            <div
              className={style.TogalSidebarIcon}
              onClick={() => togalSidBar()}
            >
              {ic_icon_container.icon()}
            </div>
            <div className={style.NevProfileMainDiv}>
              <div className={style.NavProIconAndText}>
                <div className={style.NavProfileImg}></div>
                <Heading3Fonts
                  className={style.NameTextNevBar}
                  onClick={() => togalDropdown()}
                  text={currentUser ? currentUser.name : "Guest"}
                />
              </div>
              <div
                className={
                  !isCollapsed
                    ? style.SubMainNevDropDownIcon
                    : style.SubMainNevDropDownIconRotet
                }
                onClick={() => togalDropdown()}
              >
                {ic_NevDropDown.icon()}
              </div>

              <div
                className={
                  isCollapsed
                    ? style.MaiDivForDropdwon
                    : style.MaiDivForDropdwonHide
                }
              >
                {data1.map((i, j) => (
                  <div
                    key={j}
                    className={style.DropValue}
                    onClick={() => handleProfileDropDownClick(i)}
                  >
                    {i.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={style.MainDivCildran}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
