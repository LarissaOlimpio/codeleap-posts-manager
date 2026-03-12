import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useUserStore } from "../store/useUserStore";

export const Route = createFileRoute("/login")({
  component: SignupComponent,
});

function SignupComponent() {
  const [inputValue, setInputValue] = useState("");
  const isButtonDisabled = inputValue.trim().length === 0;
  const setUserName = useUserStore((state) => state.setUserName);
  const navigate = useNavigate();

  const handleEnter = () => {
    if (inputValue.trim()) {
      setUserName(inputValue.trim());
      navigate({ to: "/" });
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#DDDDDD] font-sans">
      <div className="w-full max-w-125 rounded-2xl border border-[#CCCCCC] bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-[22px] font-bold text-black">
          Welcome to CodeLeap network!
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-[16px] text-black">
            Please enter your username
          </label>
          <input
            id="username"
            type="text"
            placeholder="John doe"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded-lg border border-[#777777] px-3 py-2 placeholder:text-[#CCCCCC] focus:border-black focus:outline-none"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            disabled={isButtonDisabled}
            onClick={handleEnter}
            className={`h-8 w-27.75 rounded-md text-[16px] font-bold text-white transition-all ${
              isButtonDisabled
                ? "cursor-not-allowed bg-[#ced8f7]"
                : "bg-[#7695EC] hover:bg-[#5a78d1] active:bg-[#4a65b8]"
            }`}
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
}
