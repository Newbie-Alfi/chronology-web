import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { PATH } from "./constants";
import { NotFoundPage } from "./NotFound";
import { SignInPage } from "./SignIn";
import { SignUpPage } from "./SignUp";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.APP} element={<App />}></Route>
        <Route path={PATH.SIGN_IN} element={<SignInPage />}></Route>
        <Route path={PATH.SIGN_UP} element={<SignUpPage />}></Route>
        <Route path={PATH.NOT_FOUND} element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
