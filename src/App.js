import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  /*const [values,setValues] = useState({
    firstName:'',
    lastName:'',
    email:''
  });*/

  const[body,setBody] = useState();
  const[title,setTitle] = useState();
  const[posts,setPosts] = useState();
  const [submitted,setSubmitted] = useState(false);
  const [showsuccess,setShowsuccess] = useState(false);
  /*const updateFirstnamechange = (e) => {
    setValues((values) => ({
      ...values,
      firstName:e.target.value
    }));
  }
  const updateLastnamechange = (e) => {
    setValues((values) => ({
      ...values,
      lastName:e.target.value
    }));
  }
  const updateEmailchange = (e) => {
    setValues((values) => ({
      ...values,
      email:e.target.value
    }));
  }*/
  const handleSubmit = (e) =>{
   console.log('I am submittd')
    setSubmitted(true);
    setShowsuccess(true);
    addData(body,title)
    e.preventDefault();
    
  }

  const addData = async (body,title) => {

    await fetch('https://jsonplaceholder.typicode.com/posts',{
      method:'POST',
      body: JSON.stringify({
        title:title,
        body:body,
        userId:Math.random().toString(36).slice(2)
      }),
      headers:{
        'Content-type':'application/json'
      }
    })
    .then((responses) => responses.json())
    .then((data) => {
      setPosts((posts) => [data,posts]);
      setTitle('');
      setBody('');
      console.log('Check for Post',posts);
    })
    .catch((err) => {
      console.log(err.message);
    })

  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>Form Project</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input className="form-field" type='text' placeholder='Enter First Name' onChange = {(e) =>setBody(e.target.value)} value={body}/><br/>
          <label>Body</label>
          <input  className="form-field" type='text' placeholder='Enter Last Name' onChange={(e) =>setTitle(e.target.value)}  value={title}/><br/>

          <button >Submit</button>
          {showsuccess && <div className="success-message">Success! Thank you for registering</div>}
        </form>
      </header>
    </div>
  );
}

export default App;
