import React, { ChangeEvent, FormEvent, useState } from 'react';

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
formdata.append("userImage", selectedFile);

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
  return (
    <div>
        <h2>Register</h2>
        <div>
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