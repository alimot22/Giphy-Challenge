import React,{Component} from 'react';
import axios from 'axios';
import Loader from './Loader.js';


class GifDetail extends Component{
  constructor(props){
    super(props)
    this.state = {
      url:'',
      id:'',
      nextUrl:'',
      prevUrl:'',
      dataFlag:false,
      prevID:null,
      nextID:null
    }
  }
  render(){
    var pc,nc;
    if (this.state.prevID){
      pc = 'gifBox float-left'
    }
    else{
        pc = 'hidden';
    }
    if (this.state.nextID) {
        nc= 'gifBox float-right'
    }
     else{
       nc = 'hidden'
     }
     if (!this.state.dataFlag) return <Loader />
    return(
      <div>
          <div className="modalContent">
            <div className="gifBox">
              <img src={this.state.url}/>
            </div>
            <div className="prevNext">
              <div className={pc} onClick={this.prevClicked.bind(this)} >
                <img src={this.state.prevUrl} />
              </div>
              <div className={nc} onClick={() => this.nextClicked(this)}>
                <img src={this.state.nexUrl} />
              </div>
            </div>
          </div>
      </div>
    )
  }

  componentWillReceiveProps(){
    this.getDetail()
  }
  componentDidMount(){
    this.getDetail(this.props.id)
  }

  nextClicked(){
    this.setState({dataFlag:false})

    this.getDetail(this.state.nextID)
  }
  prevClicked(){
    this.setState({dataFlag:false})

    this.getDetail(this.state.prevID)

  }

  getDetail(v){
    for (var i = 0; i < this.props.data.length; i++) {
      if(this.props.data[i].id == v){
        if(this.props.data[i-1]){
          this.setState({prevID:this.props.data[i-1].id})
          this.setState({prevUrl:this.props.data[i-1].images.fixed_width_downsampled.url})
        }
        if(this.props.data[i+1]){
            this.setState({nextID:this.props.data[i+1].id})
            this.setState({nexUrl:this.props.data[i+1].images.fixed_width_downsampled.url})
        }
      }
    }
    axios.get('http://api.giphy.com/v1/gifs/'+v+'?api_key=tGq3KPkuYKZCfZUSkrr2OK18Kqa42nGQ')
    .then(res => {
          return (
            this.setState({url:res.data.data.images.downsized_large.url}),
            this.setState({dataFlag:true})
          )

    })



  }
}


export default GifDetail
