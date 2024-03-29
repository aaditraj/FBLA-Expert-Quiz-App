//we are using firebase cloud firestore database
import React from "react";
// import react-router from "react-router-dom"
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

//Login page and function for getting the question data from the database
import LoginPage from "./components/Login/Login"
import Home from "./components/Home/Home"
import Quiz from "./components/Quiz/Quiz.js"
import Feedback from "./components/Feedback/Feedback.js"
import Footer from "./components/Footer"

//styling components from React Bootstrap
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image"

import fblaLogo from "./assets/fbla-logo.png"
import cafblaLogo from "./assets/cafbla-logo.png"
import hhsfblaLogo from "./assets/hhsfbla-logo.jpg"


//features for the results page: generating report, and viewing statistics
import ViewStatistics from "./components/Quiz/Report/Statistics"
import Leaderboard from "./components/Leaderboard/Leaderboard"

//main class that is being loaded into the HTML
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      login_error: false,
      create_error: false,
      create_error_message: null,
      name: null,
      userData: null,
      allDataFetched: false,
      userDataFetched:false
    }

  }
  
 

  componentDidMount(){
    firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        this.getUserData()

        this.setState({
          logged_in: true
        })
       
      } else {
        this.setState({
          logged_in : false,
          written: false,
          login_error: false,
          create_error: false,
        })
      }
    })
  }
  
  getUserData = async () => {
    var firebaseApp = firebase.apps[0]
    this.db = firebaseApp.firestore()
    this.allUserData = await this.db.collection("UserData").get()
    this.setState({
      allDataFetched: true
    })
    // this.allUserData = this.db.collection("UserData")
    this.readUserRef = this.db.collection("UserData").where(
      "Email", "==", firebase.auth().currentUser.email)
    await this.readUserRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
            userData: doc.data(),
            userDataFetched: true
        })
      })
    })
  }

  updateUserData = async (newUserData) => {
      this.setState({
          userData: newUserData
      })
      this.allUserData = await this.db.collection("UserData").get()
      this.setState({
        allDataFetched: true
      })
  }
  
 
  //below three functions use firebase auth for login
  //authenticating existing account 
  handleLogin = (email, password) => {
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(() => {
      this.setState({login_error: false})
      this.forceUpdate()
      this.setState({login_error: true})
      this.forceUpdate()
    })
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser){
        this.getUserData()
        window.scrollTo(0, 0)
        
        this.setState({
            name: firebase.auth().currentUser.displayName,
            logged_in: true,
        })
      }
    })
  }

  handleLogout = () => {
    const auth = firebase.auth();
    auth.signOut();
    // this.setState({userData:null, userDataFetched:false})
    window.location.reload(true)
  }

  //creating new account & writing new user info into database
  handleCreate = (firstName, lastName, email, password) => {
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch((e) =>{ 
      this.setState({create_error: false})
      this.forceUpdate()
      this.setState({
        create_error: true,
        create_error_message: e.message
      })})
      this.forceUpdate()
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        this.setState({
          name: firstName + " " + lastName,
          create_error: false
        })
       
        if (!(this.state.written) && !(this.state.create_error)){
            this.db = firebase.apps[0].firestore()
            this.writeUserRef = this.db.collection("UserData").doc()
            this.writeUserRef.set({
                Name: firstName + " " + lastName,
                Email: email,
                Scores: [],
                Highest_Score: null,
                Lowest_Score: null,
                Average: null
            }).then( () => {
                this.getUserData()
                window.scrollTo(0, 0)
                this.setState({
                  logged_in: true,
                  written: true
                })
                firebaseUser.updateProfile({
                  displayName: firstName + " " + lastName
                })
            })
        }
      }
    }) 
  }

  

  render = () => {
    if (!this.state.logged_in){
      return (
          //rendering Login component from another file, uses passed props to reference
          <>
            <LoginPage id="loginpage" onLogin = {this.handleLogin} onCreate = {this.handleCreate}
            error = {this.state.login_error} create_error = {this.state.create_error}
              create_error_message = {this.state.create_error_message}
            />
            <Footer/>          
          </>
      )
    } else {
      let components = [];
      let topics = ["Know Your Numbers", "Dates and Times", "People", "Places", "Terms, Creeds, Mottos", "Potpourri"]
        for (let index = 0; index < topics.length; index++) {
          let path= "/" + topics[index]
          components.push(
            <Route key={topics[index]} path={path}>
                <Quiz selected={topics[index]} 
                onUserDataChange = {(newUserData) => this.updateUserData(newUserData)}/>
            </Route>
          )
        }
        return(
          <>
                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/leaderboard">Leaderboard</Link></li>
                                <li><Link to="/feedback">Feedback</Link></li>
                                <li>
                                <ViewStatistics
                                itemFormat = "navItem" data={this.state.userData} fetched={this.state.userDataFetched}
                                /> 
                                </li>
                                <li><Button onClick={this.handleLogout} className="user-option hidden-option" variant="link">Logout</Button></li>
                                <Dropdown className = "logout">
                                    <Dropdown.Toggle variant="dark">
                                        {this.state.name === null ? firebase.auth().currentUser.displayName : this.state.name}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey={'logout'}
                                        onSelect = {this.handleLogout}
                                        key = {'logout'}>Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>

                                </Dropdown>
                            </ul>
                        </nav>
                        <Switch>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                            <Route path="/leaderboard">
                                    <Leaderboard fetched={this.state.allDataFetched}
                                    data = {this.allUserData}/>     
                            </Route>
                            <Route path="/feedback">
                                <Feedback/>
                            </Route>

                            {components}
                        </Switch>

                    </div>
                </Router>
                <Footer/>
            </>
        )
    }
    }
}

export default App;
