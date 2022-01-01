import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    axios.get('/api/values')
      .then(response => {
        console.log('response', response);
        setLists(response.data);
      })
  }, [])

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post('/api/value', {value: value})
      .then(res => {
        if (res.data.success) {
          console.log('res', res);
          setLists([...lists, res.data]);
          setValue("");
        } else {
          alert("값을 저장하는데 실패하였습니다.");
        }
      })
  }

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists && lists.map((list, index) => (
            <li key={index}>{list.value}</li>
          ))}

          <form className="example" onSubmit={(e) => {submitHandler(e)}}>
            <input type="text" placeholder="입력해주세요" onChange={(e) => changeHandler(e)} value={value} />
            <button type="submit">확인</button>
          </form>
        </div> 
      </header>
    </div>
  );
}

export default App;
