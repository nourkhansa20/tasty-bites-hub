import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CustomButton from "./CustomButton";

const LogoutButton = ({style}) => {
  const { logout } = useAuth0();

  return (
    <CustomButton onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} label={'Log Out'} style={style} />
  );
};

export default LogoutButton;