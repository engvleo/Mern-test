import React from 'react';
import './App.css'
import './App.css';
import { useState, useEffect } from 'react';
import { BsTrash } from "react-icons/bs";

import axios from "axios";

function App() {
  const [name, setname] = useState('');
  const [age, setage] = useState(0);
  const [listoffriends, setlistoffriends] = useState([]);
 
  const updateFriend=(id)=>{
    const newAge=prompt("Enter new age: ");
    axios.put('https://mern-test2-620.herokuapp.com/update',{newAge:newAge,id:id,}).then(()=>{
      setlistoffriends(listoffriends.map((val)=>{
        return val._id==id?{_id:id,name:name,age:newAge}:val
      }))
    })
  }
  const deletFriend=(id)=>{
    axios.delete(`https://mern-test2-620.herokuapp.com/delete/${id}`)
  }
  const sub = () => {
    axios.post('https://mern-test2-620.herokuapp.com/add', { name: name, age: age }).then(result => setlistoffriends([...listoffriends,{name:name,age:age}]) )
      .catch(error => console.log(error));
  }
  useEffect(() => {
    axios.get('https://mern-test2-620.herokuapp.com/view').then(response =>setlistoffriends(response.data))
      .catch(error => console.log(error))
  });

  return (
    <div>
      <div className='input-sec'>
        <h1>اصدقاء جيم</h1>
        <input type='text' name='name' placeholder='write your name' onChange={(e) => setname(e.target.value)}></input>
        <input type='number' name='age' placeholder='write your age' onChange={(e) => setage(e.target.value)}></input>
        <button onClick={sub}>Send Data</button>
      </div>
      <div className='view-sec'>
        <ul>
          {listoffriends.map(val => {
            return (<div className='pop'><li>
              <div>Name: {val.name}</div>
              <div>Age: {val.age}</div>
              </li>
               <button id='update-btn' onClick={()=>{updateFriend(val._id)}}>Update</button>  
               <button onClick={()=>{deletFriend(val._id)}}><BsTrash /></button>  
                      </div>     

              )
          })}
        </ul>
      </div>
    </div>

  )
}

export default App;
