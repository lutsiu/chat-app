import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/Login";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/Signup";
import { useSelector } from "react-redux/";
import { ReduxState } from "./interfaces/redux";
import MainWrapper from "./components/Wrappers/MainWrapper";
function App() {
  const isAuthenticated = Boolean(
    useSelector((state: ReduxState) => state.user.token)
  );
  const router = createBrowserRouter([
    { index: true, element: <LoginPage /> },
    { path: "/sign-up", element: <SignupPage /> },
    {
      path: "/home",
      element: isAuthenticated ? <MainWrapper/> : <Navigate to="/" />,
      children: [
        {index: true, element: <MainPage/>}
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
