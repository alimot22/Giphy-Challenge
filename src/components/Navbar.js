import React,{Component} from 'react';
import FontAwesome from 'react-fontawesome';
import GifyList from './GifyList.js';
class Navbar extends Component{

  render(){
    return(
      <div className="Navbar">
          <div className="container">
              <FontAwesome name='globe' /> GIPHLAR
              <span className="float-right refreshBtn" onClick={this.refresh.bind(this)}>
                <FontAwesome name="refresh" />
              </span>
          </div>
      </div>
    )
  }
  refresh(){
    this.props.refresh(true);
  }

}


export default Navbar
