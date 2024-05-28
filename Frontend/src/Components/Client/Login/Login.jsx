import React , {useEffect , useState} from "react";
import Logo from "../../../Assets/Logo.svg";
import "./Login.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Login = ({onLoginSuccess}) => {
    const [formState , setFormState] = useState("signIn");
    const [userId , setUserId] = useState("");
    const [password , setPassword] = useState("");
    const [errorMessage , setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage("");
  
      try {
        const response = await axios.post('http://13.51.36.205:8000/login', {
          email: userId,
          password: password,
        });
        console.log(response);
        if (response.status === 201) {
          // Call the onLoginSuccess function and pass the user data
          onLoginSuccess(response.data.user);
          // Navigate to the desired page after successful login
          navigate('/products'); // Adjust this route as needed
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message || 'Invalid Credentials');
        } else {
          console.error('Error:', error);
          setErrorMessage('An error occurred. Please try again.');
        }
      }
    };
   
  
return (
    <div className="Container-Login">
         <div className="Logo-Login">
            <div className="Image-Login">
                <img src={Logo} alt="Logo"/>
            </div>
            <div className="Message-Login">Welcome Back Log In!</div>
         </div>
         <div className="Form-Login">
            <form className="Input-Login">
                <input 
                type="text"
                placeholder="UserID/ Mobile Number/ Email"
                value={userId}
                onChange={(e)=>setUserId(e.target.value)}
                required
                 />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required/>
                <div className="Forgot-Password">
                  <p>Forgot Password</p>
                </div>
                <button type="submit" className="Dark" onClick={handleSubmit} >
                    Log In
                </button>
            </form>
            {errorMessage && <div className="Error-Message">{errorMessage}</div>}
         </div>
         <div className="Para-Login">
          <div className="Para-New-Account">
            Create a New Account?
            <div className="Para-Signup">
              Signup
            </div>
          </div>
          
        </div>
        
    </div>
)
};

export default Login;
