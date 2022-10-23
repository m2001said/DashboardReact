import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

// make a component of Button in nav
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

//Navbar
const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext();

  // to get the width of any entire Screen
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();
    // you should remove eventListener after you get your information
    return () => window.removeEventListener("resize", handleResize);
    //i need to make it initially when the site is open and not [screenSize] because it will be done every time screen change
  }, []);

  // after i know the width please check it and don't open Menu in small screens
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
    // of course the change will be in every screenSize
  }, [screenSize]);

  //
  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      {/* ---------- Menu button --------- */}
      <NavButton
        title="Menu"
        customFunc={() =>
          setActiveMenu((prevStatus) => setActiveMenu(!prevStatus))
        }
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      {/* ----------  buttons in right --------- */}
      <div className="flex">
        {/* ---------- Cart button --------- */}
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        />

        {/* ---------- Chat button --------- */}
        <NavButton
          title="Chat"
          customFunc={() => handleClick("chat")}
          color={currentColor}
          dotColor="#03C9D7"
          icon={<BsChatLeft />}
        />

        {/* ---------- notification button --------- */}
        <NavButton
          title="Notifications"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          dotColor="#03C9D7"
          icon={<RiNotification3Line />}
        />

        {/* profile button */}
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg "
            onClick={() => handleClick("userProfile")}
          >
            <img
              src={avatar}
              alt="img of user"
              className="rounded-full w-8 h-8 "
            />
            <p>
              <span className="text-gray-400 text-14 ">Hi,</span>{" "}
              <span className="text-gray-400 text-14 ">Mohamed</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14 " />
          </div>
        </TooltipComponent>

        {/* if you click on any of these buttons plz open it */}
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
