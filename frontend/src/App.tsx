import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/Login";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/Signup";
import { useSelector, useDispatch } from "react-redux/";
import { ReduxState } from "./interfaces/redux";
import MainWrapper from "./components/Wrappers/MainWrapper";
import { useEffect } from "react";
import { hideEverything } from "./state/ui";
function App() {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(hideEverything());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
