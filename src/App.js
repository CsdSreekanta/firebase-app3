import "./App.css";
import app from "./firebase.init";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailBlur= (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordBlur= (event)=>{
    setPassword(event.target.value)

  }
const handleSubmit=(event)=>{
  createUserWithEmailAndPassword(auth, email, password)
  .then((result)=>{
    const user = result.user;
    console.log(user)
  })
  .catch((error)=>{
    console.error(error)
  })
  event.preventDefault();
  // console.log('working', email, password)
}

 
  return (
    <div className="App">
      <div className="registration w-50 mx-auto mt-3">
        <h1 className="text-primary">Please Register!!</h1>
      <Form  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
    </div>
  );
}

export default App;
