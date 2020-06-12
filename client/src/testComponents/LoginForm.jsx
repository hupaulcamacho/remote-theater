import React from 'react';

const LoginForm = ({
  email,
  password,
  handleChange,
  loginUser
}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser()
  }

  return (
    <div className='form-container'>
      <h1> Log-In </h1>
      <form onSubmit={handleSubmit}>

        <input
          className='login-input'
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={handleChange}
        /><br/>

        <input
          className='login-input'
          type="password"
          name="password"
          value={password}
          placeholder="••••••••"
          onChange={handleChange}
        /><br/>
        <input className='button1' type="submit" value="Log In" />
      </form>
    </div>
  )
}

export default LoginForm;