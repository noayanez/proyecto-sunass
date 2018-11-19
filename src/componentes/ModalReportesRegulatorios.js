import React, { Component } from 'react';

class ModalReportesRegulatorios extends Component { // AUN EN DESARROLLO

    constructor(props){
        super(props);
        this.state = {
            show : props.show,
            selectedOption : "a1",
            lista1 : [
                "Anexo 5: Costos y gastos",
                "Anexo 2: Facturación e ingresos",
                "Anexo 5: Costos y gastos",
                "Anexo 2: Activo fijo",
                "Anexo 3: Reporte de sanciones",
                "Anexo 4: Reporte de inversiones",
                "Anexo 6: Financiamiento"
            ],
            lista2 : [
                "Resumen de cuentas",
                "Consistencia de ingresos y egresos",
                "Análisis de variación de existencias",
                "Cuentas sin movimientos"
            ],
            lista3 : [
                "Por cuenta contable",
                "Por cuenta contable comparativo",
                "Saldos de transferencias",
                "Saldos de inversiones",
                "Variables de gestión"
            ],
            lista4 : [
                "Reporte ET-1: Variables de gestión",
                "Reporte ET-2: Servicios y procesos",
                "Reporte ET-3: Anexo 5 Anualizado",
                "Reporte ET-4: Cuentas contables anualizado",
                "Reporte ET-5: Centros de costos anualizado"
            ]
        }
        this.cerrarModal = this.cerrarModal.bind(this);
        this.handleChangeOpcion = this.handleChangeOpcion.bind(this);
    }

    handleChangeOpcion(event){
        this.setState({ selectedOption : event.target.value })
    }

    cerrarModal(){
        this.props.vaciarModal();
    }

    crearOpciones(lista,etiqueta){
        const objs = [];
        for(var i in lista){
            objs.push(
                <div className="row">
                    <div className="col-1"><input type="radio" value={""+etiqueta+i} onClick={this.handleChangeOpcion} checked={this.state.selectedOption === (""+etiqueta+i)} /></div>
                    <div className="col-11">{lista[i]}</div>
                </div>
            );
        }
        return objs;
    }

    render(){
        return(
            <div className="modal-rr" style={{"overflow":"scroll"}}>
                <div className="modal-dialog tam50">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"><b>Seleccione el tipo de reporte:</b></h4>
                            <button className="close" onClick={this.cerrarModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <h5><b>Reportes regulatorios</b></h5>
                                        {this.crearOpciones(this.state.lista1,"a")}
                                        <br/>
                                        <h5><b>Reportes de validacion</b></h5>
                                        {this.crearOpciones(this.state.lista2,"b")}
                                    </div>
                                    <div className="col-6">
                                        <h5><b>Reportes de acompañamiento</b></h5>
                                        {this.crearOpciones(this.state.lista3,"c")}
                                        <br/>
                                        <h5><b>Reportes para estudios tarifarios</b></h5>
                                        {this.crearOpciones(this.state.lista4,"d")}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-9"></div>
                                    <div className="col-3">
                                        <div className="row">
                                            <div className="col-6">
                                                <button onClick={this.cerrarModal} className="btn btn-secondary">Cancelar</button>
                                            </div>
                                            <div className="col-6">
                                                <button onClick={this.cerrarModal} className="btn btn-primary">Generar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalReportesRegulatorios;
