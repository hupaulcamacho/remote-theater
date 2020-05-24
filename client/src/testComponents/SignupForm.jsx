import React from 'react';


const SignupForm = ({
  name,
  password,
  handleChange,
  signupUser,
  email
}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    signupUser()
  }

  return (
    <div className='form-container'>
      <h1> Sign-Up </h1>
      <form onSubmit={handleSubmit}>
        <input
          className='signup-input'
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={handleChange}
        /><br/>
        <input
          className='signup-input'
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={handleChange}
        /><br/>
        <input
          className='signup-input'
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={handleChange}
        /><br/>
        <input className='button1' type="submit" value="Sign Up" />
      </form>
    </div>
  )
}

export default SignupForm;