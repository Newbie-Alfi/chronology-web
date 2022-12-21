import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loader } from "../components/common/Loader/Loader";
import { PATH } from "./constants";
import { AboutPage } from "./pages/About";

const PresentationPage = lazy(() => import("./pages/Presentation"));
const ProjectListPage = lazy(() => import("./pages/Projects"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const SignInPage = lazy(() => import("./pages/SignIn"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader style={{ height: "100vh" }} />}>
        <Routes>
          <Route path={PATH.ABOUT} element={<AboutPage />}></Route>
          <Route path={PATH.PROJECTS}>
            <Route
              path={PATH.CHRONOLOGY}
              element={<PresentationPage />}
            ></Route>
            <Route index element={<ProjectListPage />} />
          </Route>
          <Route path={PATH.SIGN_IN} element={<SignInPage />}></Route>
          <Route path={PATH.SIGN_UP} element={<SignUpPage />}></Route>
          <Route path={PATH.NOT_FOUND} element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
