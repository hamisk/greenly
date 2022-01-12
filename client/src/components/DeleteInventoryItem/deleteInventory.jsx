// import React, { Component } from 'react'
// import "./AddNewActivity.scss"

// export default class AddNewActivity extends Component {
//     state = {display: "none"};
//     onDeleteHandler = () => {
//         this.setState({display: "flex"});
//     };
//     onCloseHandler = () => {
//         this.setState({display: "none"});
//     };
//     onConfirmHandler = () => {
//         this.props.handler(this.props.id);
//         this.setState({display: "none"});
//     }

//     render() {
//         return (
//             <>
//             <button className="inventory-card__delete" type="button" onClick={this.onDeleteHandler}></button>

//             <div className="popup" style={{display: this.state.display}}>
//                 <div className="popup__inner">
//                     <div className="popup__title">Delete {this.props.name} inventory item?</div>
//                     <p className="popup__detail">Please confirm that you’d like to delete {this.props.name} from the inventory list. You won’t be able to undo this action. </p>
//                     <div className="popup__buttons">
//                         <button className="popup__cancel" onClick={this.onCloseHandler}>Cancel</button>
//                         <button className="popup__delete" onClick={this.onConfirmHandler}>Delete</button>
//                     </div>
//                     <button className="popup__close" onClick={this.onCloseHandler}></button>
//                 </div>
//             </div>
//             </>
//         )
//     }
// }
