import AyButton from "@/components/myUi/AyButton";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="h-screen w-full bg-black flex select-none">
      <div className="relative m-auto w-[320px] bg-white/80 backdrop-filter shadow-xl backdrop-blur-lg rounded-xl h-[40%] p-5  flex flex-col justify-between">
        <div className="absolute w-96 h-96 bg-[#5f08b1]/10 blur-md shadow-[#5f08b1]/5 shadow-lg  -z-50 rounded-full -top-[160px] -right-[160px]" />

        <div className="flex items-center justify-between w-full">
          {/* <Logo /> */}
          <img src="/img/logo/Logo_black.svg" alt="" width={100} />
          <p>Admin</p>
        </div>
        <form action="">
          <Input type="email" className="mb-5" placeholder="Email" />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className=""
              placeholder="Password"
            />
            <Icon
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              icon={
                !showPassword
                  ? "fluent:eye-off-16-regular"
                  : "fluent:eye-24-regular"
              }
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
            />
          </div>

          <AyButton
            title="LOGIN"
            sx={{
              mt: "3rem",
              width: "100%",
            }}
          />
        </form>
      </div>
    </div>
  );
}
