import React, { ChangeEvent, FormEvent, useState } from "react";

type loginCredentials = {
    email: string;
    psssword: string;
};


function Login() {

const [loginCredentials, setLoginCredentials] = useState<loginCredentials | null>(null);

const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
console.log('e.target.name :>> ', e.target.name);
setLoginCredentials({...loginCredentials as loginCredentials, [e.target.name]:e.target.value,});
};

const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();
console.log('loginCredentials :>> ', loginCredentials);
};

  return (
    <div>
      <h2>Login</h2>
      <div>
        <form className='input-form' onSubmit={handleSubmitLogin}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email..."
            onChange={handleLoginInput}
          />
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password..."
               onChange={handleLoginInput}
          />
          <label htmlFor="password">password</label>
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
