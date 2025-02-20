import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/MESSIU-logo2.png";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { postDataSign } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
const Login = () => {
  const context = useContext(MyContext);

  const [isShowPassword, setIsShowPassWord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const onChangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };
  const signIn = (e) => {
    e.preventDefault();
    if (formFields.email === "") {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Email can not be blank!",
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
    setIsLoading(true);

    postDataSign("/api/user/sign-in", formFields).then((res) => {
      try {
        console.log(res);

        if (res.error !== true) {
          localStorage.setItem("token", res.token);
          const user = {
            userId: res.user.id,
            name: res.user?.name,
            email: res.user?.email,
          };
          localStorage.setItem("user", JSON.stringify(user));

          context.setAlertBox({
            open: true,
            error: false,
            msg: "User Login Successfully",
          });
          setTimeout(() => {
            // history("/dashboard");
            window.location.href = "/";

            setIsLoading(true);
          }, 2000);
        } else {
          setIsLoading(false);
          context.setAlertBox({
            open: true,
            error: true,
            msg: res.msg,
          });
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    context.setIsHideSidebar(true);
  }, []);
  return (
    <>
      <section className="section signInPage full">
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
            <form className="mt-3" onSubmit={signIn}>
              <h2 className="mb-4">Sign In</h2>
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Email"
                  type="email"
                  name="email"
                  onChange={onChangeInput}
                  variant="standard"
                  className="w-100"
                />
              </div>

              <div className="form-group position-relative">
                <TextField
                  id="standard-basic"
                  label="Password"
                  type={isShowPassword !== true ? "password" : "text"}
                  name="password"
                  onChange={onChangeInput}
                  variant="standard"
                  className="w-100"
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

              <Link to="/" className="border-effect cursor txt">
                Forgot Password?
              </Link>

              <div className="d-flex align-items-center mt-3 mb-3">
                <Button className="btn-blue col btn-lg btn-big" type="submit">Sign In</Button>

                <Link to="/">
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
              <p className="txt">
                Not Registered? &nbsp;
                <Link className="border-effect" to="/sign-up">
                  Sign Up
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

export default Login;
