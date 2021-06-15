import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import {
    Link
  } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button"

const Home = () => {
    let components = [];
    let topics = ["Know Your Numbers", "Dates and Times", "People", "Places", "Terms, Creeds, Mottos", "Potpourri"]
    for (let index = 0; index < topics.length; index++) {
        var path = "/" + topics[index]
        components.push(
            <div className="topic-container">
                {/* <Image src="https://logodix.com/logo/1610537.png" alt={topics[index]} className="topic-image"/> */}
                <div className="topic-image" id={topics[index].split(" ")[0]}>
                {/* <Button className="middle" onClick = {() => this.handleTopicSelect(topics[index])}>{topics[index]}</Button> */}
                {/* <Link className="middle" to={path}>{topics[index]}</Link> */}
                <Button className="middle" as={Link} to={path}>{topics[index]}</Button>
                </div>
            </div>
        )   
    }
    return (
       
       
                <div>
                    <Jumbotron className = "jumbo">
                        <h1>Welcome, {firebase.auth().currentUser.displayName.split(" ")[0]}</h1>
                        <h4>Choose a Quiz Topic Below!</h4>
                    </Jumbotron>
                    <div id="Choose-Topics">

                        <div className="topics-wrapper">
                            {components}
                        </div>
                        

                    </div>
                </div>
            )
}

export default Home;