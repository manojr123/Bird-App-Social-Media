import react, {useContext, useEffect } from 'react'    
import {SocialMediaAppContext} from './Contexts'
import images from '../helpers/images'
    
    
function getLocalStorageData (key) {
    
        const localStorageValue =  localStorage.getItem(key);
        console.log('Fn(getLocalStorageData) : Entered ', localStorageValue)
        console.log('Fn(getLocalStorageData) : key :', key)
        let tmpfeed = null;

        if (key === 'allFeeds') {
            const today = Math.floor(Date.now() / 1000);
            const img = images[Math.floor(Math.random() * 10)];

            tmpfeed = {
                postID : 1,
                contents : 'JavaScript is the programming language of the Web.',
                postAuthor : 'admin',
                createdOn : today,
                updatedOn : "",
                image : img
            };
        } else if (key === 'allUsers')  {
            tmpfeed = {
                username : 'admin12',
                password : 'Aol123',
            };
        }
        

            if ( (localStorageValue === null) || (localStorageValue === 'undefined' ) ) {
                return [tmpfeed];
            } else {
                const parsedValue = JSON.parse(localStorageValue);
                console.log('Fn(getLocalStorageData) : parsedValue',parsedValue );
                if (parsedValue.length===0) {
                    parsedValue.push (tmpfeed);
                }
                return parsedValue          
            }  
        
}

function storeInLocalStorage(key, data) {
            localStorage.setItem(key, JSON.stringify(data ));          
            console.log('Fn(storeInLocalStorage) : data :', data)
            console.log('Fn(storeInLocalStorage) : key :', key)
            
}

export {getLocalStorageData, storeInLocalStorage}