import AyButton from "@/components/myUi/AyButton";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Cookie from "js-cookie";
import {  isAuthOtp } from "@/middlewares/IsAuthenticated";
import VerifyOtp from "./Verify_Otp";
import axios from "axios";
import { ADMIN_SEND_OTP } from "@/types/urlPath";
import { makeToast, makeToastError } from "@/utils/toaster";
import MyBackBtn from "@/components/myUi/myBackBtn";

export default function LoginPage() {
  const verifyOtp = isAuthOtp();
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example authentication logic
    // if (email === "admin@ayb.com" && password === "123") {
    //   Cookie.set(
    //     "us_b2b_admin_otp", // Cookie name
    //     JSON.stringify({ username: email }), // Cookie value
    //     { expires: 1, sameSite: "strict" } // Cookie expires in 1 day
    //   );
    //   navigate("/dashboard")
    // } else {
    //   alert("Invalid email or password.");
    // }
    try {
      setLoading(true);
      const { data, status } = await axios.post(ADMIN_SEND_OTP, {
        email,
        password,
      });

      if (status === 200) {
        localStorage.setItem("otp-timer", "60"); 
        localStorage.removeItem("otp-finished"); 
        if (data.success) {
          Cookie.set(
            "us_b2b_admin_otp", // Cookie name
            JSON.stringify({ mobile: data.mobile,email: email }), // Cookie value
            { expires: 0.5, sameSite: "strict" } // Cookie expires in 1 day
          );
          // for 12 hr 0.5, 
          // for 1 hr 1 / 24, 
          makeToast(`${data.message}`);
          localStorage.setItem("otp-timer", "60");
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      if (error.response?.data) {
        makeToastError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full flex select-none"
      style={{
        backgroundImage: 'url("/img/bg/bg-admin04.jpg")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`relative m-auto w-[320px] bg-white/60 backdrop-filter overflow-hidden shadow-xl backdrop-blur-lg rounded-xl h-[40%] p-5 flex flex-col ${
          verifyOtp ? "" : "justify-between"
        } `}
      >
        <div className="absolute w-96 h-96 bg-[#5f08b1]/15 blur-md shadow-[#5f08b1]/20 shadow-lg -z-50 rounded-full -top-[160px] -right-[160px]" />

        <div className="flex items-center justify-between w-full">
          {verifyOtp && (
            <div className="">
              <MyBackBtn 
              clickEvent={
                ()=>{
                  Cookie.remove("us_b2b_admin_otp");
                  localStorage.setItem("otp-timer", "0"); // Save new timer in localStorage
                  localStorage.removeItem("otp-finished"); 
                  window.location.reload();
                }
              }
              />
            </div>
          )}
          <img src="/img/logo/Logo_black.svg" alt="Admin Logo" width={100} />
          <p>Admin</p>
        </div>
        {verifyOtp ? (
          <>
            <VerifyOtp />
          </>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-5"
              placeholder="Email"
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=""
                placeholder="Password"
                required
              />
              <Icon
                onClick={() => setShowPassword(!showPassword)}
                icon={
                  !showPassword
                    ? "fluent:eye-off-16-regular"
                    : "fluent:eye-24-regular"
                }
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
              />
            </div>

            <AyButton
              loading={loading}
              title="LOGIN"
              type="submit" // Ensures the button submits the form
              sx={{
                mt: "3rem",
                width: "100%",
              }}
            />
          </form>
        )}
      </div>
    </div>
  );
}
