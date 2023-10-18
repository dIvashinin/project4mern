import React from "react";

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <div>
        <form className='input-form' action="">
          <input
            type="text"
            name="email"
            id="email"
            // onChange={handleRegisterInput}
          />
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="password"
            id="password"
            //    onChange={handleRegisterInput}
          />
          <label htmlFor="password">password</label>
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
