import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import RoutesPath from "./RoutesPath";

function App() {


  // useEffect(() => {
  //   TicketFunction.deleteTicket(8).then((response) => {
  //     if (response.status) {
  //       console.log(response);
  //     } else {
  //       console.log('failed to login the user');
  //     }
  //   });
  // }, []);


  return (
    <RoutesPath />
  )
}

export default App;
