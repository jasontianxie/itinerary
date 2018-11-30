import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

class FullPageCover extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            display:false,
            component:null
        }
    }
    myRef:any = React.createRef();
    open(component:any){
        this.setState({display:true,component})
      }
    close(e:any){
        if(e.target === this.myRef.current){
            this.setState({display:false})
        }
      }
    render(){
        const {display} = this.state;
        return (
            <div styleName={`${display?'show':'hidden'} coverLayer`} ref={this.myRef} onClick={(e)=>this.close(e)}>
                {this.state.component}
            </div>
        );
    }
}

let div = document.createElement('div');
document.body.appendChild(div);
 
const Cover = ReactDOM.render(React.createElement(
    FullPageCover
),div);
 
 
 
export default Cover;