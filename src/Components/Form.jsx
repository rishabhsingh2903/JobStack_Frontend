import React from 'react';
import PropTypes from 'prop-types';


const Form = ({setEmail,setPassword,setType,setUsername,type,handleSubmit}) => {

  const toggleType = () => {
    setType((prevType) => (prevType === "SIGN UP" ? "SIGN IN" : "SIGN UP"));
  };

  return (
    <form className='w-full'>

      <h2 className='block text-primary text-xl font-bold mb-2 text-center'>{type}</h2>
        {type === "SIGN UP" && (
            <div className="mb-6">
            <label className="block text-secondary text-sm font-bold mb-2" htmlFor="username">
                Username
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                // value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            </div>
        )}
      <div className="mb-6">
        <label className="block text-secondary text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type='email'
        //   value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>

      <div className="mb-6">
        <label className="block text-secondary text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
        //   value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>

      {/* <div className="mb-6">
        <a
          className="inline-block align-baseline font-bold text-sm text-primary hover:text-secondary"
          href="#"
        >
          Forgot Password?
        </a>
      </div> */}
      <div className="flex items-center justify-between">
        <button
          className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={toggleType}
        >
          {type === "SIGN UP" ? "SIGN IN" : "SIGN UP"}
        </button>
        <button
          className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-10"
          type="submit"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>

      </div>
    </form>
  )
};
Form.propTypes = {
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    handleSubmit:PropTypes.func.isRequired,
  };

export default Form;
