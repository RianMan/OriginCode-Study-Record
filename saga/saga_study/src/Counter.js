import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/action';

const btnStyle = {
    margin: 20
}

const textStyle = {
    color: '#334443',
    fontSize: 30,
    fontWeight: 800,
} 
 
class Counter extends Component {

    handleClick = () => {
        this.props.add();
    }

    handleAsyncClick = () => {
        this.props.asyncAdd();
    }

    render(){
        return <div style={{margin:"0 auto",width:300}}>
            <p style={textStyle}>{this.props.number}</p>
            <button style={btnStyle} onClick={this.handleClick}>添加+1</button>
            <button style={btnStyle} onClick={this.handleAsyncClick}>过一秒以后添加+1</button>
        </div>
    }

}

export default connect(
    state => {
        return {
            number: state.number
        }
    },
    {
        add: actions.add,
        asyncAdd: actions.asyncAdd,
    },
)(Counter);