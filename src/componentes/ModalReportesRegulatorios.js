import React, { Component } from 'react';

class ModalReportesRegulatorios extends Component { // AUN EN DESARROLLO

    constructor(props){
        super(props);
        this.state = {
            show : props.show
        }
        this.cerrarModal = this.cerrarModal.bind(this);
    }

    cerrarModal(){
        this.props.handleClose();
    }
    componentDidMount(){
        console.log(document.getElementById("modal-rr").style.display);
    }

    render(){
        return(
            <div id="modal-rr" className="modal-rr">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.cerrarModal} className="btn btn-secondary">Close</button>
                            <button onClick={this.cerrarModal} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalReportesRegulatorios;
