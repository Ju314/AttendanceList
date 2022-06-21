import { useState, useEffect } from 'react'
import './style.css'
import { Card } from '../../components/Card' /* export default Card */

function home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: '', avatar: ''})

  function handleClick(){
    // clear input value
    document.getElementById('input').value = '';
  };

  function handleAddStudent(){
    const newStudent ={
      name : studentName,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }

    setStudents(prevState => [...prevState, newStudent]);
  }

  /* Don't work async useEffect */  
  useEffect(() => {
    //async
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/Ju314');
      const data = await response.json();
      //console.log('Object => ', data)
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }    
    
    fetchData();

    /*
    fetch('https://api.github.com/users/Ju314')
    .then( Response => Response.json())
    .then(data => {
      //console.log(data)
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
    */

  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Attendance list</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Photo ApiGithub" />
        </div>
      </header>
      <input id='input' type="text" 
      placeholder='Enter a name'
      onChange={e => setStudentName(e.target.value)}
      />
      <button 
      type="button"
      onClick={handleAddStudent}
      >Add</button>
      <button id='clear' onClick={handleClick}>Clear</button>
    { 
      students.map(student => (        
        <Card 
          key= {student.time}
          name={student.name} 
          time={student.time} 
        />
        )      
      ) 
    }
    </div>

  )
}

export default home
