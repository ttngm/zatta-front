import { Redirect } from 'react-router-dom';
import React from "react";

function AuthenticatedGuard({children}) {
  let auth = true; // TODO ログイン済みチェック

  return auth ? <>{children}</> : <Redirect to={{
    pathname: '/login',
  }} />;
};

export default AuthenticatedGuard;