import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//displays statistics from App file when user clicks 'View Statistics'
//Statistics include average, highest, and lowest scores across all user's attempts
class ViewStatistics extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
    }
  
    render(){
        return (
            <>
              <Button variant="info" onClick={() => {this.setState({show: true})}}>
                View Statistics
              </Button>
        
              <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                <Modal.Header closeButton>
                  <Modal.Title>Statistics</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Highest Score: {this.props.highScore}</h5>
                    </div>
                    <div>
                        <h5>Lowest Score: {this.props.lowestScore}</h5>
                    </div>
                    <div>
                        <h5>Average Score: {this.props.average}</h5>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => {this.setState({show: false})}}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }
    
  }
  
  export default ViewStatistics;