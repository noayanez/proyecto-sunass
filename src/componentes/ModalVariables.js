import React, { Component } from 'react';

class ModalVariables extends Component { // AUN EN DESARROLLO

    constructor(props){
        super(props);
        this.state = {
            listaCodigos : props.codigos,
            codigos : [],
            alertaux : "",
            acumulado : props.acumulado,
            tipoConsulta : props.tipoConsulta,
            tipoGrafico : "column2d",
            grad : "0",
            todos : false
        }
        this.cerrarModal = this.cerrarModal.bind(this);
        this.handleChangeOpcion = this.handleChangeOpcion.bind(this);
        this.handleChangeAcumulado = this.handleChangeAcumulado.bind(this);
        this.handleChangeTipoConsulta = this.handleChangeTipoConsulta.bind(this);
        this.handleChangeTipoGrafico = this.handleChangeTipoGrafico.bind(this);
        this.editCodigos = this.editCodigos.bind(this);
        this.marcarTodos = this.marcarTodos.bind(this);
        this.enviarDatos = this.enviarDatos.bind(this);
    }

    componentDidUpdate(){
        if(this.state.listaCodigos !== this.props.codigos){
            this.setState({ listaCodigos : this.props.codigos });
            this.crearCodigosSeleccionados();
        }
    }

    handleChangeOpcion(event){
        this.setState({ selectedOption : event.target.value })
    }

    handleChangeTipoGrafico(event){
        this.setState({ tipoGrafico : event.target.value })
    }

    handleChangeTipoConsulta(event){
        this.setState({ tipoConsulta : event.target.value })
    }

    handleChangeAcumulado(event){
        this.setState({ acumulado : !this.state.acumulado })
    }

    cerrarModal(){
        this.props.vaciarModal();
    }

    editCodigos(event){
        var obj = [];
        for(var i in this.state.codigos){
            if(this.state.codigos[i][0]===event.target.value){
                obj.push([this.state.codigos[i][0],!this.state.codigos[i][1]])
            }else{
                obj.push([this.state.codigos[i][0],this.state.codigos[i][1]])
            }
        }
        var flagtrue = true;
        var flagfalse = true;
        for(var i in obj){
            if(obj[i][1]===false){
                flagtrue = false;
            }else{
                flagfalse = false
            }
        }
        if(flagtrue==false && flagfalse==false){
            this.setState({
                todos : false
            });
        }else{
            if(flagtrue==true && flagfalse==false){
                this.setState({
                    todos : true
                });
            }else{
                this.setState({
                    todos : false
                });
            }
        }
        this.setState({
            codigos : obj
        })
    }

    crearCodigosSeleccionados(){
        var obj = [];
        for(var i in this.props.codigos){
            obj.push([this.props.codigos[i][0],false]);
        }
        this.setState({
            codigos : obj
        })
    }

    enviarDatos(){
        var codaux = [];
        for(var i in this.state.codigos){
            if(this.state.codigos[i][1]===true){
                codaux.push(this.state.codigos[i][0]);
            }
        }
        this.props.cambiarCodigos(codaux);
        this.props.cambiarAcumulado(this.state.acumulado);
        this.props.cambiarTipoConsulta(this.state.tipoConsulta);
        this.props.cambiarEmpezarConsulta(true);
        this.props.vaciarModal();
    }

    crearOpciones1(){
        const objs = [];
        for(var i in this.state.codigos){
            if(i<this.state.codigos.length/3){
                objs.push(
                    <div key={i*5} className="row">
                        <div key={i*6+1} className="col-2"></div>
                        <div key={i*6+1} className="col-1">
                            <label className="customcheck">
                                <input key={i*6+2} type="checkbox" value={this.state.codigos[i][0]} onChange={this.editCodigos} checked={this.state.codigos[i][1]} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div key={i*6+3} className="col-6"><h5>{this.state.codigos[i][0]}</h5></div>
                        <div key={i*6+4} className="col-3"></div>
                    </div>
                );
            }
        }
        return objs;
    }

    crearOpciones2(){
        const objs = [];
        for(var i in this.state.codigos){
            if(this.state.codigos.length/3<=i && i<(this.state.codigos.length/3)*2){
                objs.push(
                    <div key={i*6} className="row">
                        <div key={i*6+1} className="col-2"></div>
                        <div key={i*6+2} className="col-1">
                            <label className="customcheck">
                                <input key={i*6+3} type="checkbox" value={this.state.codigos[i][0]} onChange={this.editCodigos} checked={this.state.codigos[i][1]} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div key={i*6+4} className="col-6"><h5>{this.state.codigos[i][0]}</h5></div>
                        <div key={i*6+5} className="col-3"></div>
                    </div>
                );
            }
        }
        return objs;
    }

    crearOpciones3(){
        const objs = [];
        for(var i in this.state.codigos){
            if((this.state.codigos.length/3)*2<=i && i<this.state.codigos.length){
                objs.push(
                    <div key={i*5} className="row">
                        <div key={i*6+1} className="col-2"></div>
                        <div key={i*6+1} className="col-1" onChange={this.editCodigos}>
                            <label className="customcheck">
                                <input key={i*6+2} type="checkbox" value={this.state.codigos[i][0]} onChange={this.editCodigos} checked={this.state.codigos[i][1]} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div key={i*6+3} className="col-6"><h5>{this.state.codigos[i][0]}</h5></div>
                        <div key={i*6+4} className="col-3"></div>
                    </div>
                );
            }
        }
        return objs;
    }

    marcarTodos(){
        if(this.state.todos===false){
            var obj = [];
            for(var i in this.state.codigos){
                obj.push([this.state.codigos[i][0],true]);
            }
            this.setState({
                codigos : obj,
                todos : true
            });
        }else{
            var obj = [];
            for(var i in this.state.codigos){
                obj.push([this.state.codigos[i][0],false]);
            }
            this.setState({
                codigos : obj,
                todos : false
            });
        }
    }

    render(){
        return(
            <div className="modal-rr" style={{"overflow":"scroll"}}>
                <div className="modal-dialog tam60">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"><b>Opciones para la consulta de variables:</b></h4>
                            <button className="close" onClick={this.cerrarModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text label-titulo" htmlFor="select-acum">Acumulado</label>
                                            </div>
                                            <select className="custom-select" id="select-acum" value={this.state.acumulado} onChange={this.handleChangeAcumulado}>
                                                <option key={1} value={true}>Acumulado</option>
                                                <option key={2} value={false}>No acumulado</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text label-titulo" htmlFor="select-tipoc">Consulta</label>
                                            </div>
                                            <select className="custom-select" id="select-tipoc" value={this.state.tipoConsulta} onChange={this.handleChangeTipoConsulta}>
                                                <option key={1} value={"tabla"}>Tabla</option>
                                                <option key={2} value={"grafico"}>Gráfico</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {this.state.tipoConsulta==="grafico"?
                                    (
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <label className="input-group-text label-titulo" htmlFor="select-acum">Tipo de grafico</label>
                                                    </div>
                                                    <select className="custom-select" id="select-grad" value={this.props.tipoGrafico} onChange={this.props.handleChangeTipoGrafico}>
                                                        <option value="line">LINEA</option>
                                                        <option value="area2d">AREA 2D</option>
                                                        <option value="column2d">BARRAS 2D</option>
                                                        <option value="column3d">BARRAS 3D</option>
                                                        <option value="pie2d">PIE 2D</option>
                                                        <option value="pie3d">PIE 3D</option>
                                                        <option value="doughnut2d">DONUT 2D</option>
                                                        <option value="doughnut2d">DONUT 3D</option>
                                                        <option value="pareto2d">PARETO 2D</option>
                                                        <option value="pareto3d">PARETO 3D</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <label className="input-group-text label-titulo" htmlFor="select-tipoc">Gradiente</label>
                                                    </div>
                                                    <select className="custom-select" id="select-tipoc" value={this.props.gradiente} onChange={this.props.cambioGrad}>
                                                        <option value={"0"}>Solido</option>
                                                        <option value={"1"}>Desvanecido</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ):(null)
                                }
                                <div className="row">
                                    <div className="col-3">
                                        <h5><b>Codigos:</b></h5>
                                    </div>
                                    <div className="col-9"></div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="row">
                                            <div className="col-2"></div>
                                            <div className="col-1">
                                                <label className="customcheck">
                                                    <input type="checkbox" onChange={this.marcarTodos} checked={this.state.todos} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="col-6"><h5>Todos</h5></div>
                                            <div className="col-3"></div>
                                        </div>
                                    </div>
                                    <div className="col-8"></div>
                                </div>
                                <br/>
                                <div className="row centrado">
                                    <div className="col-4">
                                        {this.crearOpciones1()}
                                    </div>
                                    <div className="col-4">
                                        {this.crearOpciones2()}
                                    </div>
                                    <div className="col-4">
                                        {this.crearOpciones3()}
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
                                                <button onClick={this.enviarDatos} className="btn btn-primary">Generar</button>
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

export default ModalVariables;
