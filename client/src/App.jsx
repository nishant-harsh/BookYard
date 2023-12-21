import { Route, Routes } from "react-router-dom";

import PrivateRoutes from "@/components/PrivateRoutes";
import ProtectedRoutes from "@/components/ProtectedRoutes";

import { MainLayout } from "./layouts/mainLayout";
import { AuthLayout } from "./layouts/authLayout";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Books from "./pages/Books";
import BookLibrary from "./pages/BookLibrary";
import NotFound from "./pages/NotFound";
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import BookShelf from "./pages/BookShelf";
import SearchBooks from "./pages/SearchBooks";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* private routes */}
        <Route path="/" exact element={<PrivateRoutes />}>
          <Route element={<MainLayout />}>
            <Route index element={<BookLibrary />} />
            <Route path="bookshelf" element={<BookShelf />} />
            <Route path="search" element={<SearchBooks />} />
            <Route
              path="/books"
              element={
                <ProtectedRoutes>
                  <Books />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/reservations"
              element={
                <ProtectedRoutes>
                  <Reservations />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/users-detail"
              element={
                <ProtectedRoutes>
                  <Users />
                </ProtectedRoutes>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
