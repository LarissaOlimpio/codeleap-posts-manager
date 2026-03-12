import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "@tanstack/react-router";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const { username, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="relative top-0 z-20 flex h-20 items-center justify-between bg-[#7695EC] p-6">
      <h1 className="text-[22px] font-bold text-white">CodeLeap Network</h1>

      <div className="flex items-center gap-4">
        <span className="hidden font-medium text-white sm:inline">
          Welcome, {username}!
        </span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm font-bold text-white transition-colors hover:text-red-200"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  );
}
