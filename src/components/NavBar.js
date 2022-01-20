import React from "react";
import { Nav } from "react-bootstrap";
import SignUpModal from "./SignUpModal";

import authStore from "../store/authStore";
import { observer } from "mobx-react";

function Navbar() {
  return (
    <Nav className="justify-content-end" bg="light" expand="lg">
      <p>hello {authStore.user ? authStore.user.username : ""}</p>
      {authStore.user ? (
        <button value="logout" onClick={authStore.signout}>
          Log Out
        </button>
      ) : (
        <SignUpModal />
      )}
    </Nav>
  );
}

export default observer(Navbar);
