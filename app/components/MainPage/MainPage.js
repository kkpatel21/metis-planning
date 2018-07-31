import React, { Component } from 'react';
import { connect } from 'react-redux';


let MainPage = ({handleRegister}) => {
  return (

    <div>
      <div style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
        }}>
        <input type="text" placeholder="Email"></input> <br />
        <input type="text" placeholder="First name"></input> <br />
        <input type="text" placeholder="Last name"></input> <br />
        <input type="password" placeholder="Password"></input> <br />
        <input type="password" placeholder="Repeat password"></input><br />
        <div style={{fontFamily:'Lucida, sans-serif', fontSize:"30px", padding: 10, color: "white"}}>
          <button
            type="button"
            style={{
            width: "50px",
            height: "50px",
            fontSize: "18px",
            borderRadius: "25px",
            border: 'none',
            fontSize: "30x",
            color: "white",
            backgroundColor: "#095997",
            backgroundColor: "#c6b8ce",
            float: "right"
          }}
          onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>


      <div style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
        }}>
      <input type="text" placeholder="Email"></input> <br />
      <input type="text" placeholder="First name"></input> <br />
      <input type="text" placeholder="Last name"></input> <br />
      <input type="password" placeholder="Password"></input> <br />
      <input type="password" placeholder="Repeat password"></input><br />
      <div style={{fontFamily:'Lucida, sans-serif', fontSize:"30px", padding: 10, color: "white"}}>
        <button
          type="button"
          style={{
          width: "50px",
          height: "50px",
          fontSize: "18px",
          borderRadius: "25px",
          border: 'none',
          fontSize: "30x",
          color: "white",
          backgroundColor: "#095997",
          backgroundColor: "#c6b8ce",
          float: "right"
        }}
        onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
    </div>
  )
}


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to Metis, Event Planning 101, Something To Be Planned</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default MainPage;
