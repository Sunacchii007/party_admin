import { NavLink } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
 
  {
    path: "/users",
    name: "Clients List",
    icon: <FaUser />,
  },
  {
    path: "/Orders",
    name: "Orders",
    icon:<BsPersonCircle />,
  },
  {
    path: "/pets",
    name: "Pets",
    icon:<MdOutlinePets />,
  },
  {
  path: "/product",
  name: "Product",
  icon:<MdOutlineProductionQuantityLimits />,
},
{
  path: "/donation",
  name: "Donations",
  icon:<BiSolidDonateHeart />,
},
 
  {
    path: "/",
    name: "LogOut",
    icon: <CgLogOut />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 100,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: 100 ,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Admin
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
