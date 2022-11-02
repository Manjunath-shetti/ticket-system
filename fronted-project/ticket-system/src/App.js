import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import UserFunction from './Functions/User/User';
import DepartmentFunction from './Functions/Department/Department';
import ProjectFunction from './Functions/Project/Project';
import TicketFunction from './Functions/Ticket/Ticket';

function App() {


  useEffect(() => {
    TicketFunction.deleteTicket(8).then((response) => {
      if (response.status) {
        console.log(response);
      } else {
        console.log('failed to login the user');
      }
    });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
