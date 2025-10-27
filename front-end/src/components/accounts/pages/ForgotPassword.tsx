import { ComponentType } from 'react';

const ForgotPassword = () => {
  return (
    <div className='login-container'>
      <label htmlFor="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required />

      <button type="submit">Submit</button>
    </div>
  )
}

export default ForgotPassword as ComponentType;

