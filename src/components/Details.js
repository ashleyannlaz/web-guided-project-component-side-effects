import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  // 👉 TASK 4 - Create a side effect 🥇 that runs only after first render.

  useEffect(() => {
    //when component is first rendered
    console.log(`Effect Only after first render dom surgery`)

    return () => { 
      // after component is removed from the dom 
      console.log(`Clean up after component is removed from dom`)
    }
    fetchFriends()
  }, [])

  // 👉 TASK 5 - Create a side effect 👻 that runs only after first render
  // and puts a 'click' event handler on document.
  // See what happens if we don't clean up.

  useEffect (() => {
    const listener = evt => {//dirty thing
      console.log(`Here is a random number ${Math.random()}`)
    }
    document.addEventListener('click',listener)
    // memory leak after you close the see details it will keep returning a number

    return () => { //cleanup
      document.removeEventListener('click', listener)
    }
// why would we want event listeners in react? to communicate with universe outside of the react application

  },[])
  // 👉 TASK 6 - Create a side effect 🥵 that runs after every render.

  // 👉 TASK 7 - Create a side effect 📲 that runs when a particular variable changes:
  // Whenever props.friendId updates we should trigger a fetch for details of the friend.
  // The URL should end up looking like `http://localhost:4000/friends/1?api_key=xyz`
  // On success, shove the details of the friend in `details` slice of state

  return (
    <div className='container'>
      <h2>Details (of friend with id {friendId}):</h2>
      {
        details &&
        <>
          <p>{details.name} is {details.age}</p>
          <p>email is {details.email}</p>
          {name} likes:
          <ul>
            {details.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
          </ul>
        </>
      }
      <button onClick={close}>Close</button>
    </div>
  )
}
