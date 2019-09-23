import React from "react";
import QS from "query-string";
import BoxRegister from "./views/boxes/registerBox";
import Fire from "../fire/auth";
import Modal from "react-modal";
export default class SuccessUserRegister extends React.Component{
  constructor() {
    super();
    this.state = {
      username : "",
      sendEmail : false,
      modaltrue : false,
      modalfalse : false,
      modaltrueValue : "",
      modaltrueNote : "",
      modalfalseValue : "",
      modalfalseNote : "",
      modalReturnedTrue : false,
      modalReturnedFalse : false,
      modalReturnedTrueValue : "",
      modalReturnedTrueNote : "",
      modalReturnedFalseValue : "",
      modalReturnedFalseNote : ""
    }
    this.closeAlert = this.closeAlert.bind(this);
    this.resendEmailVerification = this.resendEmailVerification.bind(this);
    this.successfull = this.successfull.bind(this);
  }
  componentDidMount = () => {
    var ClaveString = QS.parse(this.props.location.search);
    if(!ClaveString.id) return window.location.assign("/");
    var user = Fire.currentUser;
    this.setState({
      username : user.displayName
    })
    if(user.emailVerified) return;
    if(this.state.sendEmail) return;
    user.sendEmailVerification().then(() =>{
      this.setState({
        modaltrue : true,
        modalfalse : false,
        modalReturnedTrue : false,
        modalReturnedFalse : false,
        modaltrueValue : "Correo enviado",
        modaltrueNote : "Puede que tengas que revisar la bandeja de span"
      });
    }).catch(() =>{
      this.setState({
        modalfalse : true,
        modaltrue : false,
        modalReturnedTrue : false,
        modalReturnedFalse : false,
        modalfalseValue : "Correo no enviado",
        modalfalseNote : "Demasiados correos enviados a su cuenta"
      });
    })
  }
  closeAlert = (e) => this.setState({modalfalse : false, modaltrue : false, modalReturnedTrue : false, modalReturnedFalse : false});
  resendEmailVerification(){
    var user = Fire.currentUser;
    console.log(`IMAGEN URL: ${user.photoURL}`);
    !user.emailVerified && user.sendEmailVerification().then(()=>{
      console.log("Correo reEnviado")
      return this.setState({
        modalReturnedTrue : true,
        modalReturnedFalse : false,
        modalfalse : false,
        modaltrue : false,
        modalReturnedTrueValue : "Correo reenviado",
        modalReturnedTrueNote : "si no aparece revisa la bandeja de span"
      });
    }).catch((error) =>{
      console.log("Correo no reEnviado")
      return this.setState({
        modalReturnedFalse : true,
        modalReturnedTrue : false,
        modalfalse : false,
        modaltrue : false,
        modalReturnedFalseValue : "Correo no reenviado",
        modalReturnedFalseNote : "demasiados correos ya enviados."
      });
    });
  };
  successfull(){
    console.log("Successfull");
    return window.location.replace("/");
  };
  render(){
    var ClaveString = QS.parse(this.props.location.search);
    console.log(ClaveString);
    return(
      <div style={{background : "white !important",position: "absolute",height: "100vh",width: "100%"}} className="flx ccN">
        <div className="diBlk">
        <Modal isOpen={this.state.modaltrue} className="modalScreen" overlayClassName="overlayModalScreen">
              <div>
                <p>{this.state.modaltrueValue}</p>
                <strong>{this.state.modaltrueNote}</strong>
              </div>
              <button onClick={this.closeAlert}>
                <ion-icon style={{ color : "white"}} name="ios-checkmark-circle"></ion-icon>
              </button>
          </Modal>
          <Modal isOpen={this.state.modalReturnedTrue} className="modalScreen" overlayClassName="overlayModalScreen">
              <div>
                <p>{this.state.modalReturnedTrueValue}</p>
                <strong>{this.state.modalReturnedTrueNote}</strong>  
              </div>
              <button onClick={this.closeAlert}>
                <ion-icon style={{ color : "white"}} name="ios-checkmark-circle"></ion-icon>
              </button>
          </Modal>
          {/**FALSES POP-UPS */}
          <Modal isOpen={this.state.modalReturnedFalse} className="modalScreenDanger" overlayClassName="overlayModalScreen">
              <div>
                <p>{this.state.modalReturnedFalseValue}</p>
                <strong>{this.state.modalReturnedFalseNote}</strong>  
              </div>
              <button onClick={this.closeAlert}>
                <ion-icon style={{ color : "red"}} name="ios-close-circle"></ion-icon>
              </button>
          </Modal>
          <Modal isOpen={this.state.modalfalse} className="modalScreenDanger" overlayClassName="overlayModalScreen">
              <div>
                <p>{this.state.modalfalseValue}</p>
                <strong>{this.state.modalfalseNote}</strong>
              </div>
              <button onClick={this.closeAlert}>
                <ion-icon style={{ color : "red"}} name="ios-close-circle"></ion-icon>
              </button>
          </Modal>
          <BoxRegister username={this.state.username && this.state.username} resendEmailVerification={this.resendEmailVerification} success={this.successfull} time={ClaveString.time} id={ClaveString.id}/>
        </div>
      </div>
    )
  }
}
