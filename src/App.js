import "./App.css";
import app from "./firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState("");
  const [error, setError]= useState('')
  const [password, setPassword] = useState("");

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  const handleNameBlur= (event)=>{
    setName(event.target.value)
  }

  const handleRegisteredChange=event=>{
    setRegistered(event.target.checked)
  }

 
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
     
      event.stopPropagation();
      return;
    }
   
    if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
      setError('Password should contain one special character')
      return;
    }
    
    

    setValidated(true);
    setError('')
    if(registered){
      signInWithEmailAndPassword(auth, email, password)
      .then((result)=>{
        const user = result.user
        console.log(user)
      })
      .catch((error)=>{
        console.error(error)
      })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setEmail('')
        setPassword('')
        verifyEmail()
        setUserName()

        console.log(user);
      })
      .catch((error) => {
        setError(error.message)
        console.error(error);
      });
    }
    event.preventDefault();
    // console.log('working', email, password)
  };

   const verifyEmail= ()=>{
  sendEmailVerification(auth.currentUser)
   .then(()=>{
    console.log('Email verification  sent')
   })
   }

   const setUserName=()=>{
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(()=>{
      console.log('updating name')
    })
    .catch((error)=>{
      console.log(error)
    })
   }
   const handleForgetPassword=()=>{
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      console.log('Reset Password email sent')
    })
     console.log('working')
   }
  return (
    <div className="App">
      <div className="registration w-50 mx-auto mt-3">
        <h1 className="text-primary">Please {registered? 'Log In': 'Register'}!!</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              onBlur={handleNameBlur}
              type="text"
              placeholder="Your Name"
              required
            />

          </Form.Group>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Register" />
          </Form.Group>
          <h5 className="text-danger">{error}</h5>
         
          <Button onClick={handleForgetPassword} variant="link">Forget Password</Button>
          <br />
          <Button  variant="primary" type="submit">
            {registered? 'Log In': 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
