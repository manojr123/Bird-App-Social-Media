import React from 'react'
import {useState, useContext, useRef} from 'react'
import {SocialMediaAppContext} from '../helpers/Contexts'

const Password = (props) => {

   const { appState, setAppState,usersList,setUsersList,currentUserName, setCurrentUserName, currentPasswd, setCurrentPasswd}
   = useContext(SocialMediaAppContext);

    const { isValidPassword, mode, setPasswordValid }= props;
   const passwordInput = useRef(null) // Input password reference with useRef

    function validatePassword (event) {
        setCurrentPasswd(passwordInput.current.value)
        console.log('Password : fn(validatePassword) : passwordInput',passwordInput.current.value)

 /*       const strongPassword = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/;
        let valid = false;

        console.log('Password : Fn(validatePassword) : Entered');
        console.log('Password : Fn(validatePassword) : currentPasswd',currentPasswd);
        if ( strongPassword.test(passwordInput.current.value)) {
            valid=true;
            setPasswordValid(true)
        } else {
            valid=false;
            setPasswordValid(false);
        }    

        console.log('Password : Fn(validatePassword) : valid',valid);
        if (valid) {
            const newUser = {'username': currentUserName,'password' : passwordInput.current.value};
            if (usersList !== null ) {
                setUsersList( [...usersList , newUser ] );
                setAppState('login')
            } else {
                setUsersList( [ newUser ] );
                setAppState('login')
            }
        }
*/


        isValidPassword(valid);





    }

    return (
        <div>
                { console.log('Password : Rendering ') }

                <label> Password </label>
                <input  ref={passwordInput} type="password" />
                <button onClick={() => validatePassword(event) } > 
                { (mode === 'register') ? 'Register' : 'Login' }
                </button>
        </div>

    )
}

export default Password











/*

                <input  ref={passwordInput} type="password" onChange={(event)=>setCurrentPasswd(event.target.value) }/>

*/

