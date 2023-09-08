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
import { useEffect, useState } from "react";
import { hideEverything } from "./state/ui";
import ChatPage from "./pages/Chat";
import useResponsive from "./hooks/useResponsive";
function App() {
  const dispatch = useDispatch();
  const isAuthenticated = Boolean(
    useSelector((state: ReduxState) => state.user.token)
  );
  const width = useResponsive();
  const [chatElement, setChatElement] = useState(<MainWrapper/>);

  useEffect(() => {
    if (width >= 768) {
      if (isAuthenticated) {
        setChatElement(<MainWrapper/>);
      } else {
        setChatElement(<Navigate to="/" />);
      }
    } else {
      if (isAuthenticated) {
        setChatElement(<ChatPage/>)
      } else {
        setChatElement(<Navigate to="/" />);
      }
    }
    
  }, [width, isAuthenticated]);

  const router = createBrowserRouter([
    { index: true, element: <LoginPage /> },
    { path: "/sign-up", element: <SignupPage /> },
    {
      path: "/home",
      element: isAuthenticated ? <MainWrapper /> : <Navigate to="/" />,
      children: [{ index: true, element: <MainPage /> }],
    },
    {
      path: "/:chat",
      element: chatElement,
      children: width >= 768 ? [{index: true, element: <ChatPage/>}] : []
    },
  ]);

  useEffect(() => {
    dispatch(hideEverything());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
