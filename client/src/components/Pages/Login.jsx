import { GithubFilled, GoogleCircleFilled } from "@ant-design/icons";
import "./Login.css";
import Navbar from "../Sections/Navbar";
const Login = () => {
  return (
    <>
    <Navbar></Navbar>
      <div className="main-wrapper">
        <h1 className="welcome-text">
          <span className="welcome-text-dodgerblue">Hola,</span>
          <br />
          Welcome to <br /> <span>Animebliss </span>
        </h1>

        <div className="login-container">
          <h2>Sign in</h2>
          <span style={{ color: "#78909C" }}>
            Please sign in to your account.
          </span>

          <form className="login-form" action="/loginreq" method="POST">
            <label htmlFor="">Email *</label>
            <input
              className="input input-email"
              placeholder="Your email address"
              type="text"
            />
            <label htmlFor="">Password *</label>
            <input
              className="input input-password"
              placeholder="Your password"
              type="text"
            />
            <div className="extras">
              <div>
                <input type="checkbox" />
                <span>Remember me</span>
              </div>

              <a href="/forgotpass">Forgot your password?</a>
            </div>

            <button>Sign In</button>
          </form>

          <button>
            <GoogleCircleFilled /> Sign In
          </button>
          <button>
            <GithubFilled /> Sign In
          </button>
          <div className="signupprompt">
            <span>Dont't have a account?</span>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
