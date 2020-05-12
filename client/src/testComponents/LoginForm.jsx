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
      <h2> Log-In </h2>
      <form onSubmit={handleSubmit}>
        <i class="fas fa-user"></i>{"  "}
        <input
          className='login-input'
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={handleChange}
        /><br/>
        <i class="fas fa-lock"></i>{"  "}
        <input
          className='login-input'
          type="password"
          name="password"
          value={password}
          placeholder="••••••••"
          onChange={handleChange}
        /><br/>
        <input className='button1' type="submit" value="log-in" />
      </form>
    </div>
  )
}

export default LoginForm;