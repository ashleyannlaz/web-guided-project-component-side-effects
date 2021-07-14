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
    const listener = evt => {//dirty thing, 
      console.log(`random number ${(Math.random())}`)
    }
    document.addEventListener('click',listener)
    // memory leak after you close the see details it will keep returning a number

    return () => { //cleanup
      document.removeEventListener('click', listener)
    }
// why would we want event listeners in react? to communicate with universe outside of the react application

  },[])
  // 👉 TASK 6 - Create a side effect 🥵 that runs after every render.

  useEffect(() => {
    console.log(`runs after the first render and evertime after`)
    return () => {
      console.log(`clean up after the effect of previous`)
    }
  })

  //to run after every render take out the []

  // 👉 TASK 7 - Create a side effect 📲 that runs when a particular variable changes:
  // Whenever props.friendId updates we should trigger a fetch for details of the friend.
  // The URL should end up looking like `http://localhost:4000/friends/1?api_key=xyz`
  // On success, shove the details of the friend in `details` slice of state
useEffect(() => {
  //this runs after first render, and then after every render caused by a change in friendID
  axios.get(`${BASE_URL}/friends/${friendId}?api_key=${API_KEY}`)
  .then(res => {
    setDetails(res.data)
  })
  .catch (err => {
    debugger
  })
},[friendId])

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
