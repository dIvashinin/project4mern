import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

type LoginCredentials = {
    email: string;
    password: string;
};
type User = {
    userName: string;
    email: string;
    userImage?: string;
}
type LoginResponse = {
    msg: string;
    user: User;
    token: string;
};
// type TokenType = string;

function Login() {

const [loginCredentials, setLoginCredentials] = useState<LoginCredentials | null>(null);

const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
console.log('e.target.name :>> ', e.target.name);
setLoginCredentials({...loginCredentials as LoginCredentials, [e.target.name]:e.target.value,});
};

const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();
console.log('loginCredentials :>> ', loginCredentials);

//here fetch code from postman login request

//why don't i have headers?

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("email", loginCredentials!.email);
urlencoded.append("password", loginCredentials!.password);

const requestOptions = {
  method: 'POST',
  body: urlencoded,
};
try {
    const response = await fetch("http://localhost:5001/api/users/login", requestOptions);
    if (response.ok) {
        const result:LoginResponse = await response.json();
        // console.log('result :>> ', result.user.userName);
        console.log('result :>> ', result);
        const token = result.token;
        // we need a place to store token - either Local Storage or Cookies
        if (token) {
            localStorage.setItem("token", token);
        }
    }
// built-in type of Error
} catch (err) {
    const error = err as Error;
   console.log('error :>> ', error.message); 
}
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
