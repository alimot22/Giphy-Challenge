import React,{Component} from 'react';
import './App.css';
import GifyList from './components/GifyList.js';
import Navbar,{Refresh} from './components/Navbar.js';

class App extends Component{

  constructor(props){
    super(props)
    this.state={
      refresh:false
    }

   }
   handleRefreh(refValue) {
        this.setState({refresh: refValue});
    }
  render(){
    return(
      <div>
        <Navbar refresh={this.handleRefreh.bind(this)}/>
          <div className="container text-center">
            <GifyList refresh={this.state.refresh}/>
          </div>
      </div>
    )
  }

}




export default App
