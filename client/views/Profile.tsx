import React, { useState } from 'react'

type User = {
    userName: string;
    email: string;
    userImage: string;
};


function Profile() {
    const [user, setUser] = useState<User | null>(null);
    
    
    const getProfile = async () => {
    //in header which is not visible to user, we put sensible info
    //token is stored in local storage
    // so we go there and take it
    const token = localStorage.getItem("token");
    if (!token) {
        alert ("you need to login first");
        return;
        //either warn user or redirect to login
    }
    // if(token) {
    
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

        try {
            const response = await fetch("http://localhost:5001/api/users/profile", requestOptions);
      
            if (response.ok) {
              const result = await response.json();
              console.log('result :>> ', result);
      
              // Update the state with the received user data
              setUser(result.user); // Assuming the user data is in the "user" property of the response
            } else {
              // Handle the case where the response is not okay (e.g., unauthorized)
              console.error('Error:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
        
        
        // fetch("http://localhost:5001/api/users/profile", requestOptions)
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.error('Error:', error));
        
        //    setUser(req.user);
    
    
    
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
    

  return (
    <div>
        <h2>
            {/* {user? user.userName: " " } */}
         Profile</h2>
<h2>hi {user?.userName}! good to see you</h2>
        <button onClick={getProfile}>get profile</button>
        <div>
        {user && <img className='image-user-profile' src={user.userImage} style={{width: "100px"}}/>}
        <h2>{user?.userName}</h2>
        </div>
        
        </div>
  );
  }

export default Profile;