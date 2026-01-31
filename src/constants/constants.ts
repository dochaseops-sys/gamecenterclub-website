import { lazy } from "react";
import { Home as HomeIcon, TrendingUp, Circle, RotateCcw, Zap, Puzzle, CarFront, Trophy, Gamepad, Brain, User, Power, UserRound } from "lucide-react";

// Lazy load all page components for better performance
const AddGame = lazy(() => import("../pages/AddGame/AddGame.page"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"));
const Game = lazy(() => import("../pages/Game/Game.page"));
const Home = lazy(() => import("../pages/Home/Home.page"));
const Login = lazy(() => import("../pages/Login/Login.page"));
const OTPVerification = lazy(() => import("../pages/OTPVerificatiom/OTPVerification"));
const ResetPassword = lazy(() => import("../pages/ResetPassword/ResetPassword"));
const Signup = lazy(() => import("../pages/Signup/Signup.page"));
const SearchPage = lazy(() => import("../pages/Search/Search.page"));
const CategoryPage = lazy(() => import("../pages/Category/Category.page"));
const Profile = lazy(() => import("../pages/Profile/Profile.page"));
const RecentGames = lazy(() => import("../pages/RecentGames/RecentGames.page"));


export const commonRoutes = [
  {
    path: '/',
    element: Home
  },
  {
    path: '/game/:id',
    element: Game
  },
  {
    path: '/search',
    element: SearchPage
  },
  {
    path: '/category/:id',
    element: CategoryPage
  }
]

export const protectedRoutes = [
  {
    path: '/add-game',
    element: AddGame
  },
  {
    path: '/profile',
    element: Profile
  },
  {
    path: '/recently-played',
    element: RecentGames
  }
]

export const authRoutes = [
  {
    path: '/login',
    element: Login
  },
  {
    path: '/signup',
    element: Signup
  },
  {
    path: '/forgot-password',
    element: ForgotPassword
  },
  {
    path: '/otp-verification',
    element: OTPVerification
  },
  {
    path: '/reset-password',
    element: ResetPassword
  }
]

// export const GAMES = [
//   {
//     title: 'God Of War',
//     rating: 4.5,
//     plays: '2.5M'
//   },
//   {
//     title: 'Ghost Of Tshushima',
//     rating: 4.5,
//     plays: '2.5M'
//   },
//   {
//     title: 'Red Dead Redemption',
//     rating: 4.5,
//     plays: '2.5M'
//   },
//   {
//     title: 'Far Cry',
//     rating: 4.5,
//     plays: '2.5M'
//   },
//   {
//     title: 'Call Of Duty',
//     rating: 4.5,
//     plays: '2.5M'
//   },
//   {
//     title: 'Battlefield 6',
//     rating: 4.5,
//     plays: '2.5M'
//   },
//   {
//     title: 'God Hand',
//     rating: 4.5,
//     plays: '2.5M'
//   },
//   {
//     title: 'Forza',
//     rating: 4.5,
//     plays: '2.5M'
//   },
//   {
//     title: 'Forza',
//     rating: 4.5,
//     plays: '2.5M'
//   }
// ];

type GOOGLE_AUTH_KEYS =
  | "client_id"
  | "client_secret"
  | "endpoint"
  | "redirect_uri"
  | "scopes";

export const oauth_google: Record<GOOGLE_AUTH_KEYS, string> = {
  client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
  client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || "",
  endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  redirect_uri: import.meta.env.VITE_GOOGLE_CLIENT_REDIRECT_URI || "",
  scopes: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
}

export const CATEGORY_ICONS: Record<string, any> = {
  Action: Zap,
  Puzzle: Puzzle,
  Racing: CarFront,
  Sports: Trophy,
  Arcade: Gamepad,
  Strategy: Brain,
};

export const getCategoryIcon = (title: string) => {
  return CATEGORY_ICONS[title] || Gamepad;
};

export const userOptions = [
  {
    Icon: RotateCcw,
    title: "Recently Played",
    path: "/recently-played"
  },
  {
    Icon: User,
    title: 'Add Game',
    path: '/add-game'
  },
  {
    Icon: User,
    title: 'Profile',
    path: '/profile'
  },
  {
    Icon: Power,
    title: 'Log Out',
    path: '/'
  }
];

export const NAV_ITEMS = [
  { icon: HomeIcon, label: "Home", href: "/" },
  { icon: Circle, label: "New Games", href: "/new-games" },
  { icon: TrendingUp, label: "Trending", href: "/trending" },
  { icon: UserRound, label: "Most Engaging", href: "/most-engaging" },
];

