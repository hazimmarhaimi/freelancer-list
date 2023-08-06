import React, {Fragment, useState} from 'react';
import axios from 'axios';

function Registration() {
const [username, setUserName] = useState('');
const [email, setEmail] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');

const handleUsernameChange = (value) => {
    setUserName(value);
}
const handleEmailChange = (value) => {
    setEmail(value);
}
const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
}

const handleSave = () => {
    const data = {
        Username: username,
        Email: email,
        PhoneNumber: phoneNumber,

    };
    const url = '';
    axios
    .post(url, data).then((result) =>{
        alert(result.data);
    })
    .catch((error) => { 
        alert(error);
    })

}
   return(

        <Fragment>
            <div>Registration</div>
            <label>Username</label>
            <input type="text" id='txtUsername' placeholder='Enter Username' onChange={(e) => handleUsernameChange(e.target.value)} ></input><br></br>
            <label>Email</label>
            <input type="text" id='txtEmail' placeholder='Enter email address' onChange={(e) => handleEmailChange(e.target.value)}></input><br></br>
            <label>Phone Number</label>
            <input type="text" id='txtPhoneNumber' placeholder='Enter phone number' onChange={(e) => handlePhoneNumberChange(e.target.value)}></input><br></br>
            <button onClick={() => handleSave}>Register</button>
        </Fragment>
        
   ) 
}

export default Registration;