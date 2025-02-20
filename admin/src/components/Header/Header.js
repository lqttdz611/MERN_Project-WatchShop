import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Logo from "../../assets/MESSIU-logo2.png";
import LogoDark from "../../assets/MESSIU-darklogo.png";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import SearchBox from "../SearchBox";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { IoReorderThree } from "react-icons/io5";
import { RiExpandLeftLine } from "react-icons/ri";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { MyContext } from "../../App";
import AvatarUser from "../userAvatarImg";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [isOpenNoti, setIsOpenNoti] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openMyNoti = Boolean(isOpenNoti);

  const context = useContext(MyContext);

  const handleOpenMyAccDrop = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleOpenNotiDrop = () => {
    setIsOpenNoti(true);
  };
  const handleCloseNotiDrop = () => {
    setIsOpenNoti(false);
  };
  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center w-100">
          {/* Logo Wrapper */}
          <div className="col-sm-2 part1">
            <Link to={"/"}>
              {context.themeMode === true ? (
                <img src={Logo} alt="logo" className="logo"></img>
              ) : (
                <img src={LogoDark} alt="logo" className="logo"></img>
              )}
            </Link>
          </div>

          <div className="col-sm-3 d-flex align-items-center part2 res-hide">
            <Button
              className="rounded-circle mr-3"
              onClick={() => {
                context.setIsToggleSidebar(!context.isToggleSidebar);
              }}
            >
              {context.isToggleSidebar === false ? (
                <RiExpandLeftLine />
              ) : (
                <IoReorderThree />
              )}
            </Button>

            <SearchBox />
          </div>

          <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
            <Button
              className="rounded-circle mr-3"
              onClick={() => {
                context.setThemeMode(!context.themeMode);
              }}
            >
              <MdOutlineLightMode />
            </Button>
            <div className="dropdownWrapper position-relative">
              <Button
                onClick={handleOpenNotiDrop}
                className="rounded-circle mr-3"
              >
                <IoMdNotificationsOutline />
              </Button>
              <Menu
                anchorEl={isOpenNoti}
                className="notifications dropdown_list"
                id="notifications-menu"
                open={openMyNoti}
                onClose={handleCloseNotiDrop}
                onClick={handleCloseNotiDrop}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 0,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <div className="head pl-3 pb-1">
                  <h4>Orders (12)</h4>
                </div>
                <Divider />
                <div className="scroll">
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <div className="d-flex">
                      <div>
                        <AvatarUser image="https://pbs.twimg.com/media/FoUoGo3XsAMEPFr?format=jpg&name=4096x4096"/>
                      </div>

                      <div className="dropdownInfo">
                        <h4>
                          <span>
                            <b>Cristiano</b>added to his favorite list{" "}
                            <b>Leather belt steve madden</b>
                          </span>
                        </h4>

                        <p className="text-sky mb-0">few second ago</p>
                      </div>
                    </div>
                    {/* <PersonAdd fontSize="small" /> */}
                  </MenuItem>

                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <div className="d-flex">
                      <div>
                        <AvatarUser/>
                      </div>

                      <div className="dropdownInfo">
                        <h4>
                          <span>
                            <b>Cristiano</b>added to his favorite list{" "}
                            <b>Leather belt steve madden</b>
                          </span>
                        </h4>

                        <p className="text-sky mb-0">few second ago</p>
                      </div>
                    </div>
                    {/* <PersonAdd fontSize="small" /> */}
                  </MenuItem>

                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <div className="d-flex">
                      <div>
                        <AvatarUser/>
                      </div>

                      <div className="dropdownInfo">
                        <h4>
                          <span>
                            <b>Cristiano</b>added to his favorite list{" "}
                            <b>Leather belt steve madden</b>
                          </span>
                        </h4>

                        <p className="text-sky mb-0">few second ago</p>
                      </div>
                    </div>
                    {/* <PersonAdd fontSize="small" /> */}
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <div className="d-flex">
                      <div>
                        <AvatarUser/>
                      </div>

                      <div className="dropdownInfo">
                        <h4>
                          <span>
                            <b>Cristiano</b>added to his favorite list{" "}
                            <b>Leather belt steve madden</b>
                          </span>
                        </h4>

                        <p className="text-sky mb-0">few second ago</p>
                      </div>
                    </div>
                    {/* <PersonAdd fontSize="small" /> */}
                  </MenuItem>
                </div>

                <div className="pl-3 pr-3 w-100 pt-2 pb-1">
                  <Button className=" btn-blue w-100">
                    View all notifications
                  </Button>
                </div>
              </Menu>
            </div>

            {context.isLogin !== true ? (
              <Button className="btn-blue">Login</Button>
            ) : (
              <div className="myAccWrapper mr-4">
                <Button
                  onClick={handleOpenMyAccDrop}
                  className="myAcc d-flex align-items-center"
                >
                  <div className="userImg">
                    <span className="rounded-circle">
                      <img
                        src="https://pbs.twimg.com/media/FoUoGo3XsAMEPFr?format=jpg&name=4096x4096"
                        alt="avt user"
                      ></img>
                    </span>
                  </div>
                  <div className="userInfo res-hide">
                    <h4>Cris Tinh</h4>
                    <p className="mb-0">@lqttdz</p>
                  </div>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMyAcc}
                  onClose={handleCloseMyAccDrop}
                  onClick={handleCloseMyAccDrop}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 0,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Reset Password
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
