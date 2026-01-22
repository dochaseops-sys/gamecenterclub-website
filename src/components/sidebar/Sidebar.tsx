import { getCategoryIcon, NAV_ITEMS, userOptions } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../services/redux/store";
import { clearStorage } from "../../utils/localstorage.utils";
import { logout as logoutAction } from '../../services/redux/slices/auth.slice';
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/redux/apis/games";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: Props) {
  const user = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { data: categories = [] } = useGetCategoriesQuery();

  const logout = () => {
    dispatch(logoutAction())
    clearStorage();
  }

  return <>
    {/* Overlay (mobile only) */}
    <div
      onClick={onClose}
      className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    />

    <aside
      className={`
          fixed top-16 left-0 z-40
          h-[calc(100vh-4rem)]
          w-64 lg:w-60
          bg-primary border-r border-border
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
    >
      <nav className="h-full p-3 space-y-2 overflow-y-auto">
        {/* Your existing sidebar JSX goes here unchanged */}

        <div>
          {NAV_ITEMS.map((item) => {
            const isActive = window.location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <div
                  className="flex items-center pr-3 pl-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                  <item.icon
                    className=
                    {`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110text-primary ${isActive && "text-[var(--secondary)]"}`}
                  />
                  <span className={`ml-3 font-medium tracking-wide text-sm ${isActive && "text-[var(--secondary)]"}`}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-0 border-border">
          {categories.map((item) => {
            const Icon = getCategoryIcon(item.title);
            return (
              <Link key={item.title} to={'#'}>
                <div
                  className="flex items-center pr-3 pl-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                  <Icon
                    className=
                    {`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110text-primary`}
                  />
                  <span className={`ml-3 font-medium tracking-wide text-sm`}>
                    {item.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {user.accessToken && <div className="border-t border-border">
          {userOptions.map((item) => {
            return (
              <Link key={item.title} to={item.path || '#'}>
                <div
                  className="flex items-center pr-3 pl-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden text-muted-foreground hover:text-foreground hover:bg-white/5"
                  onClick={item.title === 'Log Out' ? logout : () => { }}
                >
                  <item.Icon
                    className=
                    {`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110text-primary`}
                  />
                  <span className={`ml-3 font-medium tracking-wide text-sm`}>
                    {item.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>}

        {/* afssss */}
      </nav>
    </aside>
  </>

  return (
    <aside className="w-20 mt-16 lg:w-60 float-start bg-card border-border z-40 flex flex-col transition-all duration-300">
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto border-r border-border">
        <div>
          <h3 className="pl-4 mb-2 hidden lg:block text-gray-light text-xs font-semibold">MENU</h3>
          {NAV_ITEMS.map((item) => {
            const isActive = window.location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <div
                  className="flex items-center pr-3 pl-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                  <item.icon
                    className=
                    {`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110text-primary ${isActive && "text-[var(--secondary)]"}`}
                  />
                  <span className={`hidden lg:block ml-3 font-medium tracking-wide text-sm ${isActive && "text-[var(--secondary)]"}`}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="border-t lg:border-0 border-border">
          <h3 className="pl-4 my-3 hidden lg:block text-gray-light text-xs font-semibold">
            CATEGORIES
          </h3>
          {categories.map((item) => {
            const Icon = getCategoryIcon(item.title);
            return (
              <Link key={item.title} to={'#'}>
                <div
                  className="flex items-center pr-3 pl-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                  <Icon
                    className=
                    {`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110text-primary`}
                  />
                  <span className={`hidden lg:block ml-3 font-medium tracking-wide text-sm`}>
                    {item.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {user.accessToken && <div className="border-t lg:border-0 border-border">
          <h3 className="pl-4 my-3 hidden lg:block text-gray-light text-xs font-semibold">
            USER OPTIONS
          </h3>
          {userOptions.map((item) => {
            return (
              <Link key={item.title} to={item.path || '#'}>
                <div
                  className="flex items-center pr-3 pl-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden text-muted-foreground hover:text-foreground hover:bg-white/5"
                  onClick={item.title === 'Log Out' ? logout : () => { }}
                >
                  <item.Icon
                    className=
                    {`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110text-primary`}
                  />
                  <span className={`hidden lg:block ml-3 font-medium tracking-wide text-sm`}>
                    {item.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>}
      </nav>
    </aside>
  );
}
