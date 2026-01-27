import { getCategoryIcon, NAV_ITEMS, userOptions } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../services/redux/store";
import { clearStorage } from "../../utils/localstorage.utils";
import { logout as logoutAction } from '../../services/redux/slices/auth.slice';
import { Link, useLocation } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/redux/apis/games";
import { User as UserIcon } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: Props) {
  const user = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { data: categories = [] } = useGetCategoriesQuery();

  const logout = () => {
    dispatch(logoutAction())
    clearStorage();
  }

  return (
    <>
      {/* Overlay (mobile only) */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <aside
        className={`
          fixed top-16 left-0 z-40
          h-[calc(100vh-4rem)]
          w-64 lg:w-60
          bg-primary border-r border-border
          transform transition-all duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <nav className="h-full p-3 space-y-2 overflow-y-auto custom-scrollbar">
          <div>
            <h3 className="pl-4 mb-2 hidden lg:block text-gray-light text-xs font-semibold tracking-wider">
              MENU
            </h3>
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.href} to={item.href} onClick={onClose}>
                  <div className={`flex items-center pr-3 pl-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden hover:bg-white/5 ${isActive ? "bg-white/10 text-[var(--secondary)]" : "text-muted-foreground hover:text-foreground"}`}>
                    <item.icon
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? "text-[var(--secondary)]" : "text-white/70"
                      }`}
                    />
                    <span
                      className={`ml-3 font-medium tracking-wide text-sm`}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-border mt-4 pt-4 lg:border-0 lg:mt-0 lg:pt-0">
            <h3 className="pl-4 mb-2 hidden lg:block text-gray-light text-xs font-semibold tracking-wider">
              CATEGORIES
            </h3>
            {categories.map((item) => {
              const Icon = getCategoryIcon(item.title);
              const isCatActive = location.pathname === `/category/${item.id}`;
              return (
                <Link key={item.id} to={`/category/${item.id}`} onClick={onClose}>
                  <div className={`flex items-center pr-3 pl-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden hover:bg-white/5 ${isCatActive ? "bg-white/10 text-[var(--secondary)]" : "text-muted-foreground hover:text-foreground"}`}>
                    <Icon className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isCatActive ? "text-[var(--secondary)]" : "text-white/70"}`} />
                    <span className="ml-3 font-medium tracking-wide text-sm">
                      {item.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {user.accessToken ? (
            <div className="border-t border-border mt-4 pt-4 lg:border-0 lg:mt-0 lg:pt-0">
              <h3 className="pl-4 mb-2 hidden lg:block text-gray-light text-xs font-semibold tracking-wider uppercase">
                User Options
              </h3>
              {userOptions.map((item) => {
                const isItemActive = location.pathname === item.path;
                return (
                  <Link key={item.title} to={item.path || "#"} onClick={item.title === "Log Out" ? logout : onClose}>
                    <div className={`flex items-center pr-3 pl-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden hover:bg-white/5 ${isItemActive ? "bg-white/10 text-[var(--secondary)]" : "text-muted-foreground hover:text-foreground"}`}>
                      <item.Icon className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isItemActive ? "text-[var(--secondary)]" : "text-white/70"}`} />
                      <span className="ml-3 font-medium tracking-wide text-sm">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="border-t border-border mt-4 pt-4 lg:border-0 lg:mt-0 lg:pt-0">
              <h3 className="pl-4 mb-2 hidden lg:block text-gray-light text-xs font-semibold tracking-wider uppercase">
                Account
              </h3>
              <Link to="/login" onClick={onClose}>
                <div className={`flex items-center pr-3 pl-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden hover:bg-white/5 ${location.pathname === "/login" ? "bg-white/10 text-[var(--secondary)]" : "text-muted-foreground hover:text-foreground"}`}>
                  <UserIcon className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${location.pathname === "/login" ? "text-[var(--secondary)]" : "text-white/70"}`} />
                  <span className="ml-3 font-medium tracking-wide text-sm">Login / Sign Up</span>
                </div>
              </Link>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
