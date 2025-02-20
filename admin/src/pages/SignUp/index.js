import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/MESSIU-logo2.png";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { postDataSign } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
const SignUp = () => {
  const context = useContext(MyContext);
  const [isShowPassword, setIsShowPassWord] = useState(false);
  const [isShowRePassword, setIsShowRePassWord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isAdmin: true,
  });

  const history = useNavigate();
  const onChangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };
  const signUp = (e) => {
    e.preventDefault();
    try {
      if (formFields.name === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Name can not be blank!",
        });
        return false;
      }

      if (formFields.email === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "email can not be blank!",
        });
        return false;
      }
      if (formFields.phone === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Phone can not be blank!",
        });
        return false;
      }

      if (formFields.password === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Password can not be blank!",
        });
        return false;
      }

      if (formFields.confirmPassword === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Confirm password can not be blank!",
        });
        return false;
      }

      if (formFields.confirmPassword !== formFields.password) {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Password not match",
        });
        return false;
      }

      setIsLoading(true);

      postDataSign("/api/user/sign-up", formFields).then((res) => {
        console.log(res);
        if (res.error !== true) {
          context.setAlertBox({
            open: true,
            error: false,
            msg: "Register Successfully",
          });
          setTimeout(() => {
            setIsLoading(true);

            history("/login");
          }, 2000);
        } else {
          setIsLoading(false);
          context.setAlertBox({
            open: true,
            error: true,
            msg: res.msg,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    context.setIsHideSidebar(true);
  }, []);
  return (
    <>
      <section className="section signInPage signUpPage">
        <div className="shape-bottom">
          {" "}
          <svg
            fill="#fff"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 1921 819.8"
          >
            {" "}
            <path
              class="st0"
              d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
            ></path>{" "}
          </svg>
        </div>
        <div className="container">
          <div className="box card p-3 shadow border-0">
            <div className="text-center">
              <img alt="Logo of website" src={Logo}></img>
            </div>
            <form className="mt-3" onSubmit={signUp}>
              <h2 className="mb-4">Sign Up</h2>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      id="standard-basic"
                      label="Name"
                      type="name"
                      variant="standard"
                      autoFocus
                      className="w-100"
                      name="name"
                      onChange={onChangeInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      id="standard-basic"
                      label="Phone No."
                      type="phone"
                      variant="standard"
                      className="w-100"
                      name="phone"
                      onChange={onChangeInput}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Email"
                  type="email"
                  variant="standard"
                  className="w-100"
                  name="email"
                  onChange={onChangeInput}
                />
              </div>

              <div className="form-group position-relative">
                <TextField
                  id="standard-basic"
                  label="Password"
                  type={isShowPassword !== true ? "password" : "text"}
                  variant="standard"
                  className="w-100"
                  name="password"
                  onChange={onChangeInput}
                />
                <span
                  className="toggleShowPassword"
                  onClick={() => {
                    isShowPassword === false
                      ? setIsShowPassWord(true)
                      : setIsShowPassWord(false);
                  }}
                >
                  {isShowPassword !== true ? (
                    <HiMiniEyeSlash />
                  ) : (
                    <IoEyeSharp />
                  )}
                </span>
              </div>

              <div className="form-group position-relative">
                <TextField
                  id="standard-basic"
                  label="Repeat Password"
                  type={isShowRePassword !== true ? "password" : "text"}
                  variant="standard"
                  className="w-100"
                  name="confirmPassword"
                  onChange={onChangeInput}
                />
                <span
                  className="toggleShowPassword"
                  onClick={() => {
                    isShowRePassword === false
                      ? setIsShowRePassWord(true)
                      : setIsShowRePassWord(false);
                  }}
                >
                  {isShowRePassword !== true ? (
                    <HiMiniEyeSlash />
                  ) : (
                    <IoEyeSharp />
                  )}
                </span>
              </div>
              <div className="d-flex align-items-center mt-4 mb-3">
                <div className="row w-100">
                  <div className="col-md-6">
                    <Button className="btn-blue w-100 btn-lg btn-big" type="submit">
                      Sign Up
                    </Button>
                  </div>
                  <div className="col-md-6 pr-0">
                    <Link to="/" className="d-block w-100">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          context.setIsHideSidebar(false);
                        }}
                        className="btn-lg btn-big col ml-3"
                      >
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <p className="txt">
                Already Have an Account? &nbsp;
                <Link className="border-effect" to="/login">
                  Sign In
                </Link>
              </p>
              <h6 class="mt-4 text-center font-weight-bold">
                Or continue with social account
              </h6>
              <Button variant="outlined" className="loginWithGoogle mt-2">
                <FcGoogle />
                &nbsp;Sign Up With Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
