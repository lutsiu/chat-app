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
import { useEffect, useMemo,  } from "react"; // Changed from useState to useMemo
import { hideEverything,  } from "./state/ui";
import ChatPage from "./pages/Chat";
import useResponsive from "./hooks/useResponsive";
import { SocketProvider } from "./context/SocketContext";

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: ReduxState) => Boolean(state.user.token)
  );
  

  const width = useResponsive();

  // Memoize chatElement
  const chatElement = useMemo(() => {
    if (width >= 768) {
      return isAuthenticated ? <MainWrapper /> : <Navigate to="/" />;
    } else {
      return isAuthenticated ? <ChatPage /> : <Navigate to="/" />;
    }
  }, [width, isAuthenticated]);

  // Memoize the router
  const router = useMemo(() => {
    return createBrowserRouter([
      { index: true, element: <LoginPage /> },
      { path: "/sign-up", element: <SignupPage /> },
      {
        path: "/home",
        element: isAuthenticated ? <MainWrapper /> : <Navigate to="/" />,
        children: [{ index: true, element: <MainPage /> }],
      },
      {
        path: "/:userName",
        element: isAuthenticated ? chatElement : <Navigate to="/"/>,
        children: width >= 768 ? [{ index: true, element: <ChatPage /> }] : [],
      
      },
    ]);
  }, [isAuthenticated, chatElement, width]);

  useEffect(() => {
    dispatch(hideEverything());
  }, [dispatch]);

  
  return (
    <SocketProvider serverUrl="http://localhost:3000">
      <RouterProvider router={router} />
    </SocketProvider>
  );
}

export default App;