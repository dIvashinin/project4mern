import React, { useState } from 'react'

type User = {
    userName: string;
    email: string;
    userImage: string;
};

const getProfile = async () => {
//in header which is not visible to user, we put sensible info
//token is stored in local storage
// so we go there and take it
const token = localStorage.getItem("token");
if (!token) {
    alert ("you need to login first");
    //either warn user or redirect to login
}
if(token) {

    //send request
    // const myHeaders = new Headers();
    // myHeaders.append(
        
    //     "Authorization",
        //careful with syntax!
    //  `Bearer ${token}`);
   
   
     const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };
    
    fetch("http://localhost:5001/api/users/profile", requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    



    // const requestOptions = {
    //     'Content-Type': 'application/json',
    //     method: 'GET',
    //     // redirect: 'follow'
    //   };
      
    //   try {
    //     const response = await fetch("http://localhost:5001/api/users/profile", 
    //     requestOptions);
    //     if (response.ok) {
    //        const result = await response.json();
    //        console.log('result :>> ', result);
    //     }
    //   } 
    //   catch (error) {
        
    //   }
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error));
 }
};

function Profile() {
    const [user, setUser] = useState<User | null>(null)

  return (
    <div>
        <h2>Profile</h2>
        <button onClick={getProfile}>get profile</button>
        
        </div>
  );
}

export default Profile;