import React,{Component} from 'react';
import Loader from './Loader.js';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GifDetail from './GifDetail.js';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

const customStyles = {
  content : {
    background: 'linear-gradient(to bottom, rgba(230,248,207,1) 0%, rgba(204,227,254,1) 100%)'
  }
};
class GifyList extends Component{
  constructor(props) {
  super(props);
    this.state = {
      data:[],
      offset:1,
      dataFlag:false,
      modalIsOpen: false,
      selectedId:''
    }
    this.openModal = this.openModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
  }
  openModal(v) {
    this.setState({modalIsOpen: true});
    this.setState({selectedId:v})
}
    closeModal() {
      this.setState({modalIsOpen: false});
    }

  componentDidMount(){
  this.renderGifs();
  Modal.setAppElement('body');

  }
  componentWillReceiveProps(PrevProps){
    if (PrevProps) {
      this.setState({offset:1})
      this.setState({dataFlag:false})
      this.setState({data:[]})
      this.renderGifs()
    }
  }


  render(){
    var _this = this;
    window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        var offset = _this.state.offset + 15;
          _this.setState({offset:offset})
          _this.renderGifs()
        }
    }
    if (!this.state.dataFlag) return <Loader />
    return(
      <div>
        <br/><br/><br/>
        {this.showGif()}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <GifDetail id={this.state.selectedId} data={this.state.data}/>
          <div className="text-center">
            <button onClick={this.closeModal} className="closeBtn">
              <FontAwesome name="times" size="2x"/>
            </button>
          </div>
        </Modal>
      </div>
    )
  }

  showGif(){
    var _this = this;
    return this.state.data.map((gif,index)=>{
        return (
          <div key={index} className="gifBox" onClick={() => this.openModal(gif.id)} id={gif.id}>
          <LazyLoadImage
              src={gif.images.fixed_width_downsampled.url}
              height={gif.images.fixed_width_downsampled.height}
              width={gif.images.fixed_width_downsampled.width}
              effect="blur"/>
          </div>
        );
    },this)
  }
  renderGifs(){
      axios.get('http://api.giphy.com/v1/gifs/search?q='+Math.floor(Math.random() * 25) + 1+'&api_key=tGq3KPkuYKZCfZUSkrr2OK18Kqa42nGQ&limit=15&offset='+this.state.offset)
      .then(res => {
        var joined = this.state.data.concat(res.data.data);
         this.setState({data:joined});
         this.setState({dataFlag:true})
      })

  }

}


export default GifyList
