import React from 'react';

export const ForgotPassword = () => {
  return (
    <div className='login-container'>
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required />

      <button type="submit">Submit</button>
    </div>
  )
}
