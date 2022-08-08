import React from 'react'
import {useState, useContext, useRef, useEffect} from 'react'
import {SocialMediaAppContext} from '../helpers/Contexts'
import UserName from './UserName.jsx'
import Password from './Password.jsx'
import '../App.css'
import  { getLocalStorageData, storeInLocalStorage}  from '../helpers/LocalStorageUtility'
import RightPanel from './RightPanel'
import LeftPanel from './LeftPanel'
import images from '../helpers/images'

/**
 * @Dashboard Component :
 *  - Called from : App.jsx
 *  - Displays : LeftPanel, CentralPanel and the RightPanel
 *  - LeftPanel : Facilitates various navigation options
 *  - Central Panel : Creation of new Tweet, Display of all tweets
 *  - Right Panel : Search, News feed
 * 
 */
const Dashboard =  () => {

   const { appState, setAppState,  currentUserName, setCurrentUserName}
   = useContext(SocialMediaAppContext);

   const [feedsList, setFeedsList  ] = 
         useState ( getShuffledLocaleStorageData('allFeeds') ); // List of all feeds
   const [currentFeed, setCurrentFeed  ] = useState ([]); // Current active feed
   const [isEditing, setIsEditing] = useState(false); // Boolean indicating a feed being updated
   const [changeId, setChangeId] = useState(-1); // Id of feed being edited
   const [logout, setLogout] = useState(false); // state variable indicating logout 
   const inputFeed = useRef(null) // Tweet textarea reference with useRef

 
   /**
   * function getShuffledLocaleStorageData
   * Retrieve Feeds List from local Storage and shuffles it
   * @param {string} key - The local storage key
   * @return Shuffled Feeds List from localStorage
   */
   function getShuffledLocaleStorageData(key) {
       const tmpfeedsList = getLocalStorageData('allFeeds') ;
       shuffle(tmpfeedsList);
       console.log ('Dashboard : Fn(getShuffledLocaleStorageData) : feedsList',tmpfeedsList)

       return tmpfeedsList;

   }

   /**
   * function shuffle
   * Random Shuffle of the passed array 
   * @param {array} - array of objects
   * @return Shuffled array
   */
   function shuffle(array) {
      let i = array.length;
      while (i--) {
      const ri = Math.floor(Math.random() * i);
      [array[i], array[ri]] = [array[ri], array[i]];
    }
      return array;
    }

   /**
   * function currentFeedTextFn
   * Update state variable currentFeed with tweet text
   * @param {event} 
   * @return 
   */
   function currentFeedTextFn (event) {
       setCurrentFeed(event.target.value);
       console.log('Dashboard : Fn(currentFeedTextFn) : Current Feed Text : ', currentFeed)

   }

   /**
   * function saveFeedFn
   * Save the current tweet feed into the feeds list
   * Called on New Feed as well as Edit of exisitng feed
   * @param {event} 
   * @return 
   */
   function saveFeedFn (event) {
       console.log('Dashboard: Fn(saveFeedFn) : Entered');

       let maxID = -1;

       if (currentFeed === "") {
           setIsEditing(false);
           return;
       }
       if (!isEditing) {
            console.log('Dashboard: Fn(saveFeedFn) : isEdit = false');

            feedsList.forEach ( (element, index ) =>  {
                if (element.postID >= maxID) {
                    maxID=element.postID;
                }
            });

            let postid = maxID +1;
            const contents = currentFeed;
            const image = images[Math.floor(Math.random() * 10)];
            const postAuthor = currentUserName;
            const createdOn = Math.floor(Date.now() / 1000);
            const updatedOn = "";
            const newFeed = { postID : postid,
                              contents : contents ,
                              image : image, 
                              postAuthor : postAuthor,
                              createdOn : createdOn, 
                              updatedOn : updatedOn
                            } ;           
            console.log('Dashboard: Fn(saveFeedFn) : NewFeed : ', newFeed);
            if ( feedsList !== null ) {
                setFeedsList([newFeed,...feedsList]);
            } else {
                setFeedsList([newFeed]);
            }           
            setCurrentFeed("");
            inputFeed.current.value = "";            
       } else {
                // We are editing a feed here...
                setChangeId(-1);
                // Update the updatedOn field
                feedsList.forEach ( (element, index ) =>  {
                    if (element.postID === changeId) {
                        element.contents = currentFeed;
                        element.updatedOn = Math.floor(Date.now() / 1000);              
                    }
                });
                inputFeed.current.value = "";            
                console.log('Dashboard: Fn(saveFeedFn) : feedList ',feedsList )
                setIsEditing(false);
       }
       
}

/**
* function handleEdit
* When Edit on a feed is selected by the user, copy the current feed text
* into the Tweet box and then updated the feed into the feeds list
* @param {number} id of the feed being edited
* @return 
*/
function handleEdit (id) {
    console.log('Dashboard: Fn(handleEdit) : Entered ');

    setIsEditing(true);
    inputFeed.current.focus();
    console.log('Dashboard: Fn(handleEdit) : id', id);
    setChangeId(id);
    feedsList.forEach ( (element, index ) =>  {
        if (element.postID === id) {
            inputFeed.current.value = element.contents;            
        }
    });
}

/**
* function handleDelete
* Delete the selected feed
* @param {id} id of the feed being edited
* @return 
*/
function handleDelete (id){
    console.log('Dashboard: Fn(handleDelete) : Entered ');

    const tmpfeedsList = feedsList.filter ((feed) => feed.postID !== id);
    setFeedsList(tmpfeedsList);

}

/**
* function convertDate
* convert seconds into date and time
* @param {number} date and time in seconds
* @return 
*/
function convertDate (secs) {
    if( secs !== "") {
        var d = (new Date(secs* 1000) + '').split(' ');
        d[2] = d[2] + ',';
        let d1 = d[4].split(':');
        let dTime = [d1[0] , d1[1]].join(':');
        console.log([dTime, d[1], d[2], d[3]].join(' '));
        return [dTime, d[1], d[2], d[3]].join(' ');
    }
}

/**
* function logoutFn
* Handle logout. Set the states and go to the '/' endpoint
* @param {} 
* @return 
*/
function logoutFn () {
    console.log('Dashboard: Fn(logoutFn) : Entered ');

    setLogout(true);
    setAppState('login');
    window.location.href = '/';
}

/**
* function useEffect
* Save the feeds list into localstorage with key 'feedslist'
* Called on New Feed as well as Edit of exisitng feed
* @param {} 
* @return 
*/
useEffect (() => {
        console.log('Dashboard: Fn(useEffect) : Entered : FeedList', feedsList);

        storeInLocalStorage('allFeeds', feedsList)
        
}, [feedsList]);



    return (

         <div className="main">
            {console.log('Dashboard : Rendering')}
            
            {/* Call LeftPanel Component */}
            <LeftPanel currentUserName={currentUserName} logoutFn={logoutFn} />

            {/* CentralPanel */}

            <div className="centerPanel">
              <div className="tweetarea">
                <div className="home"> Home </div> <br/>

                <div className="Tweet"> 
                   <div className="TweetText">
                        <button>{currentUserName[0].toUpperCase()} </button>
                        <textarea                            
                           ref={inputFeed}
                           className="textarea"
                           type="text" 
                           placeholder="What's hapenning?"
                           onChange={currentFeedTextFn}
                        />
                   </div >
                        
                   <div>
                        {!isEditing
                           ?<button onClick={saveFeedFn}> Tweet </button>
                           :<button className="updateTweet" 
                              onClick={saveFeedFn}> Update Tweet
                            </button>                
                        }   
                   </div>                   
                </div>
              </div>

            <div className = "feed">
                    {feedsList.map((feed)=> {
                        return (
                            <div className="feedChild">
                                <p className="author" style={{color:"skyblue"}}> 
                                <b> {feed.postAuthor}</b> @{feed.postAuthor} </p>
                                <p className="content"> {feed.contents} </p>
                                <p className="image"> <img src={feed.image} /> </p>
                                <div className="timestamp">
                                <p className="content"> Created : 
                                   {convertDate(feed.createdOn) } 
                                </p>
                                {feed.updatedOn!=="" 
                                    ?<p className="content"> Updated :
                                      {convertDate(feed.updatedOn) } 
                                    </p>
                                    :null
                                }
                                </div>

                                {(feed.postAuthor === currentUserName) 
                                    ? <p className="edit">
                                        <button  onClick={()=>handleEdit(feed.postID)}>
                                          <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button onClick={()=> handleDelete(feed.postID)}>
                                           <i class="fa-solid fa-trash-can"></i>
                                        </button> 
                                      </p>
                                    :null
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
           
            {/* Call RightPanel Component */}
            <RightPanel />    
        </div>      
    )
}

export default Dashboard