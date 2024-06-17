import React,{useState} from 'react';
import Form from "./Form";
import PropTypes from 'prop-types';
import logo from "../assets/logo-trans.png";

const HomePage = ({handleLogin}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("SIGN UP");
    const [error,setError] = useState('');
    const [success,setSuccess]=useState(null);
    const handleSubmit = async(e) => {
        e.preventDefault();
        //if user is registering
        if (type === "SIGN UP"){
            try{
                const response = await fetch("http://localhost:8000/api/auth/register",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                },
    
                body:JSON.stringify({
                    username,
                    email,
                    password
                }),
            });
            const data = await response.json();
            console.log(data);
            if (response.status ===200 || response.status === 201){
                setType("SIGN IN");
                setSuccess(true)
            }
            else{
                setSuccess(false);
                setError(data.message);
            }
            }catch(err){
                console.log(err);
            }
        }
    
    
        //Login
        else if (type === "SIGN IN"){
            try{
                const response = await fetch("http://localhost:8000/api/auth/login",{
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password
                    }),
                });
                const data = await response.json();
                if (response.status ===200 || response.status === 201){
                    handleLogin(data.token)
                }
            }catch(err){
                console.log(err);
            }
        }
    }
  
  return (
    <div className='flex flex-col sm:flex-row h-screen'>

      <div className='sm:w-2/5 bg-white flex items-center justify-center'>
      <div className='w-full p-4'>
            { !success && type === "SIGN UP" && (
                    <div className='text-center text-bold text-primary'>
                        {error}
                    </div>
                )
                }
                <div className='px-32 py-10'>
                <Form setEmail={setEmail} setUsername={setUsername} setPassword={setPassword} setType={setType} type={type} handleSubmit={handleSubmit}/>
                </div>
        </div>
      </div>
      <div className='sm:w-3/5 flex'>
        <div className='bg-light flex items-center justify-center'>
          <img src={logo} className='w-3/4 h-auto'/>
        </div>
      </div>
    </div>
  );
};
    HomePage.propTypes={
        handleLogin:PropTypes.func.isRequired,
    };
    export default HomePage;
