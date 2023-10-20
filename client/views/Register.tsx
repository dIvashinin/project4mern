import { ChangeEvent, FormEvent, useState } from 'react';

type UserImage = {
    userImage: string
}

interface User extends UserImage {
    userName: string;
    email: string;
    password: string;
    // userImage: string;
}


function Register() {

    const [selectedFile, setSelectedFile] = useState<File | String>("");
    const [newUser, setNewUser] = useState<User>({
        userName: "",
        email: "",
        password: "",
        userImage: "", 
    });

const handleFileInput = (e:ChangeEvent<HTMLInputElement>) => {
console.log('e :>> ', e);
//we need to satisfy typescript:
setSelectedFile(e.target.files?.[0] || "");
};
    const handleFileSubmit = async (e:FormEvent<HTMLFormElement>) => {
// to prevent refresh
e.preventDefault();
// then we use postman, send request, go to code snippet and copy JSFetch
const formdata = new FormData();
formdata.append("userImage", selectedFile as File);

const requestOptions = {
  method: 'POST',
  body: formdata,
//   redirect: 'follow'
};

try {
    const response = await fetch("http://localhost:5001/api/users/imageUpload", requestOptions);
    const result = await response.json();
    console.log('result :>> ', result);
    //here we get the URL for the user profile pic
    setNewUser({...newUser, userImage:result.userImage})
} catch (error) {
    console.log('error :>> ', error);
}
    };

const handleRegisterInput = (e:ChangeEvent<HTMLInputElement>) => {
//trick here. now we see what field we are using, so it saves us lines of code
console.log('e.target.name :>> ', e.target.name);
//now this is gonna be dynamic - it takes the field we are typing in inside [e.target.name]
    setNewUser({...newUser,[e.target.name]:e.target.value })
};

const handleSubmitRegister = async (e:FormEvent<HTMLFormElement>) => {
e.preventDefault();
//here we copy our fetch function from postman
const urlencoded = new URLSearchParams();
urlencoded.append("userName", newUser.userName);
urlencoded.append("email", newUser.email);
urlencoded.append("password", newUser.password);
urlencoded.append("userImage", newUser.userImage ? newUser.userImage : "https://i.pinimg.com/474x/13/0f/96/130f9601ce0b948996e13bc2b1d88a66.jpg");

const requestOptions = {
  method: 'POST',
  body: urlencoded,
  
};

try {
    const response = await fetch("http://localhost:5001/api/users/register", requestOptions);
    const result = await response.json();
    console.log('result :>> ', result);
} catch (error) {
   console.log('error :>> ', error); 
}
};


  return (
    <div>
        <h2>Register</h2>
        <div>
            <div>
                <form className='input-form' onSubmit={handleSubmitRegister}>
                   <input type="text" name="userName" id="userName" placeholder='user name...' onChange={handleRegisterInput}/>
                   <label htmlFor="userName">user name</label>
                   <input type="text" name="email" id="email" placeholder='email...' onChange={handleRegisterInput}/>
                   <label htmlFor="email">email</label>
                   <input type="password" name="password" id="password" placeholder='password...' onChange={handleRegisterInput}/>
                   <label htmlFor="password">password</label>
                    <button type='submit'>register</button>
                </form>
            </div>



            {/* first we do trick with e function and copy what type is this event */}
            {/* then we change into our function name... */}
            {/* <form onSubmit={(e)=>}> */}
            <form onSubmit={handleFileSubmit}>
                <input type="file" name="file" id="file" onChange={handleFileInput} />
                <button type='submit'>upload image</button>
            </form>
        </div>
        {/* some condition */}
        {newUser.userImage && (
        <div>
            <img src={newUser.userImage} alt="user-avatar-picture" />
           </div>)}
    </div>
  );
}

export default Register;