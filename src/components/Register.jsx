import React from 'react'
import {useState, useContext, useEffect, useRef} from 'react'
import {SocialMediaAppContext} from '../helpers/Contexts'
import UserName from './UserName.jsx'
import Password from './Password.jsx'
import { getLocalStorageData, storeInLocalStorage} from '../helpers/LocalStorageUtility'



const Register = () => {

   const { appState, setAppState, usersList,setUsersList, currentUserName, 
   setCurrentUserName, currentPasswd, setCurrentPasswd} = useContext(SocialMediaAppContext);
    

    const usernameInput = useRef(null) // Input username reference with useRef
    const passwordInput = useRef(null) // Input password reference with useRef


    const validateRegistration = () => {

        console.log('Register : Fn(validateRegistration) : Entered');
        console.log('Register : Fn(validateRegistration) : username',usernameInput.current.value );

       console.log('Register : Fn(validateRegistration) : password',passwordInput.current.value );

        if (validateRegisterUsername() )
        {
            if ( validateRegisterPassword() ){
                setValidLogin(true);
                setAppState('dashboard');
                storeInLocalStorage('loggedin', currentUserName);            

            } 
            
        } 
    }

    const validateRegisterUsername = () => {

        console.log('Register : Fn(validateRegisterUsername) : Entered');


        let valid = false;
        let username = usernameInput.current.value;
        let password = passwordInput.current.value;

        const alphanumeric = /^[\p{sc=Latn}\p{Nd}]*$/u;

        console.log('Register : Fn(isValidUserName) : Entered');

        if ( alphanumeric.test(username)) {
            valid=true;
        } else {
            valid=false;
            alert('User Name Invalid ! Only Alphanumeric allowed... !')
        }    

        //If Existing username then disallow registration
        usersList.forEach((user)=> {
            if ( user.username === username) {
                console.log('Register : sValidUserName : Duplicate ')
                valid=false;
                alert('User Name already exists ! Pls try another username... ')
            }
        })

        console.log('Register : Fn(isValidUserName) : valid',valid);

        return valid;
    }

const validateRegisterPassword = () => {
    
    let username = usernameInput.current.value;
    let password = passwordInput.current.value;
    let valid=false;

    const strongPassword = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/;

        console.log('Register : Fn(validateRegisterPassword) : Entered');

        if ( strongPassword.test(password)) {
            valid=true;
        } else {
            valid=false;
            alert('Password weak - Include one lowercase letter, one uppercase letter, one digit and total 6 characters !')

        }    

        console.log('Register : Fn(validateRegisterPassword) : valid',valid);
        if (valid) {
            if (usersList !== null ) {
                const newUser = {'username': username,'password' : password};
                setUsersList( [...usersList , newUser ] );
                setAppState('login')
            } else {
                setUsersList( [ newUser ] );
                setAppState('login')
            }
        }

        return valid;
    }
    
    useEffect(()=>{
            // Store UserName and Password in local Storage
            console.log('Register: Fn(useEffect) : usersList:' , usersList);
            storeInLocalStorage('allUsers', usersList );

    },[usersList]);


    return (


        <div className="RegisterFullPg">
            { console.log('Register : Rendering ') }

            <div className="LoginImage"> <img src="Bird_FrontPage.jpg" /> </div>
            <div className='register'>
                <i className="fab fa-twitter" style={{fontSize:"40px", color:"skyblue"}}></i>
                <h1 style={{fontSize:"60px"}}> Happening now! </h1>
                <h1 style={{fontSize:"30px",color : "skyblue"}}> Join Bird today. </h1> <br/> <br/>
                <div >
                  <label className="label"> User Name  </label>
                  <input ref={usernameInput} type="text" placeholder="Name" />
                </div> <br/>
                <div>
                  <label className="label"> Password     </label>
                  <input  ref={passwordInput} type="password" />
                </div> <br/>
                <div> 
                  <button onClick={()=>validateRegistration()} className="LoginButton" > Register </button>
                </div>


            </div>]
        </div>
    )

}

export default Register