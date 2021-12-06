import React, { Component } from 'react'
import "./LoginModal.scss"

export default class LoginModal extends Component {
    state = {display: "none"};
    onDeleteHandler = () => {
        this.setState({display: "flex"});
    };
    onCloseHandler = () => {
        this.setState({display: "none"});
    };
    onConfirmHandler = () => {
        this.props.handler(this.props.id);
        this.setState({display: "none"});
    }

    render() {
        return (
            <>
            <button className="login" type="button" onClick={this.onDeleteHandler}>login</button>

            <div className="popup" style={{display: this.state.display}}>
                <div className="popup__inner">
                    <div className="popup__title">login </div>
                    <p className="popup__detail">login detail</p>
                    <div className="popup__buttons">
                        <button className="popup__cancel" onClick={this.onCloseHandler}>cancel</button>
                        <button className="popup__delete" onClick={this.onConfirmHandler}>login</button>
                    </div>
                    <button className="popup__close" onClick={this.onCloseHandler}></button>
                </div>
            </div>
            </>
        )
    }
}
