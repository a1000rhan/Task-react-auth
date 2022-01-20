import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import authStore from "../store/authStore";

function SignUpModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    // to do : stop page from refreshing
    event.preventDefault();

    // call a function to sign up
    event.target.value === "signUp"
      ? authStore.signUp(user)
      : authStore.signIn(user);

    setIsOpen(false);
  };

  return (
    <>
      <Button className="delete" onClick={() => setIsOpen(true)}>
        User
      </Button>
      <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input name="username" type="text" onChange={handleChange} />
            <div>
              <label>Password</label>
              <input name="password" type="password" onChange={handleChange} />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" value="signUp" onClick={handleSubmit}>
            Sign up
          </Button>
          <Button variant="primary" value="signIn" onClick={handleSubmit}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default SignUpModal;
