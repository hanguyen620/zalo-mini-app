import React, { useEffect, useState } from "react";
import { FaSearch, FaMusic, FaEllipsisH } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "zmp-ui";
import BottomNavigation from "zmp-ui/bottom-navigation";
import "../css/app.scss";

const navItems = [
  {
    path: "/music",
    label: "Music",
    icon: <FaMusic />,
  },
  {
    path: "/search",
    label: "Search",
    icon: <FaSearch />,
  },
  {
    path: "/infor",
    label: "Infor",
    icon: <FaEllipsisH />,
  },
];

export default function NavFooter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/music");

  useEffect(() => {
    navigate(activeTab, {
      animate: false,
    });
  }, [activeTab]);
  useEffect(() => {
    if (navItems.find((item) => item.path === location.pathname)) {
      setActiveTab(location.pathname);
      // setNavigationBarLeftButton('none').then();
    }
  }, [location]);

  return (
    <>
      {/* <h1>Hello World</h1> */}
      <BottomNavigation
        id="bottom-nav"
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
      >
        {navItems.map(({ path, label, icon }) => (
          <BottomNavigation.Item key={path} label={label} icon={icon} />
        ))}
      </BottomNavigation>
    </>
  );
}
