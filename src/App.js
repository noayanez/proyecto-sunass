import React, { Component } from 'react';
import ComboEps from './componentes/comboEps.js';
import ComboLocal from './componentes/comboLocal.js';
import ComboPeriodo from './componentes/comboPeriodo.js';
import ComboMes from './componentes/comboMes.js';
import ComboTipo from './componentes/comboTipo.js';
import ModalReportesRegulatorios from './componentes/ModalReportesRegulatorios.js';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            hostname : "http://179.43.88.86:8080", //HAY QUE AÑADIR UN HOSTNAME PARA QUE FUNCIONE LA APLICACION WEB
            eps : "",
            epsNombre : "",
            local : "",
            periodo : "",
            mes : "",
            tipo : "",
            tipoReal : "",
            dataSaldo : [],
            alerta : "",
            fechaActual : "",
            fechaActualGuion : "",
            isEpsLoaded : false,
            isLocalLoaded : false,
            isPeriodoLoaded : false,
            isTableLoaded : false,
            tableData : []
        };
        this.handleChangeEps = this.handleChangeEps.bind(this);
        this.vaciarTodo = this.vaciarTodo.bind(this);
        this.vaciarPeriodo = this.vaciarPeriodo.bind(this);
        this.handleChangeEpsNombre = this.handleChangeEpsNombre.bind(this);
        this.handleChangeLocal = this.handleChangeLocal.bind(this);
        this.handleChangePeriodo = this.handleChangePeriodo.bind(this);
        this.handleChangeMes = this.handleChangeMes.bind(this);
        this.handleChangeTipo = this.handleChangeTipo.bind(this);
        this.vaciarTipoReal = this.vaciarTipoReal.bind(this);
        this.handleChangeDataSaldo = this.handleChangeDataSaldo.bind(this);
        this.botonEnviar = this.botonEnviar.bind(this);
        this.formatNumber = this.formatNumber.bind(this);
        this.roundNumber = this.roundNumber.bind(this);
        this.limpiarAlerta = this.limpiarAlerta.bind(this);
        this.ordenarTableData = this.ordenarTableData.bind(this);
    }

    ordenarTableData(result){
        var arrayaux = [];
        if(this.state.tipo ==="1"){
            for(var i in result){
                arrayaux.push({
                    "cuenta":(result[i].cuenta),
                    "desc_cuenta":(result[i].desc_cuenta),
                    "saldo_anterior":(this.formatNumber(result[i].saldo_anterior)),
                    "ingresos":(this.formatNumber(result[i].ingresos)),
                    "egresos":(this.formatNumber(result[i].egresos)),
                    "saldo_final":(this.formatNumber(result[i].saldo_final))
                });
            }
            this.setState({
                tableData : arrayaux
            });
        }
    }

    limpiarAlerta(){
        this.setState({ alerta : "" })
    }

    fetchData(eps,local,periodo,mes){
        var stringRuta = "";
        if(this.state.tipo==="1"){
            stringRuta="variables/getVariables";
        }
        if(this.state.tipo==="2"){
            stringRuta="indicadores/getIndicadores";
        }
        this.setState({
            isTableLoaded : false
        });
        fetch(this.state.hostname+"/APISunass/MainController/"+stringRuta+"/?id_eps="+eps+"&id_local="+local+"&periodo="+periodo+mes)
        .then((response) =>{
            return response.json()
        })
        .then((result) => {
            console.log(result);
            if(result.length === 0){
                this.setState({
                    alerta : "No hay datos de la consulta."
                });
            }else{
                this.ordenarTableData(result);
            }
            this.setState({
                dataSaldo : result
            });
        });
        this.setState({
            tipoReal : this.state.tipo
        });
        this.setState({
            isTableLoaded : true
        });
    }

    botonEnviar(eps,local,periodo,mes){
        this.setState({
            tipoReal : "",
            dataSaldo : []
        });
        var f = new Date();
        if((f.getMonth() +1) < 10){
            if(f.getDate() < 10){
                this.setState({
                    fechaActual : "0" + f.getDate() + "/0" + (f.getMonth() +1) + "/" + f.getFullYear(),
                    fechaActualGuion : "0" + f.getDate() + "-0" + (f.getMonth() +1) + "-" + f.getFullYear()
                });
            }else{
                this.setState({
                    fechaActual : f.getDate() + "/0" + (f.getMonth() +1) + "/" + f.getFullYear(),
                    fechaActualGuion : f.getDate() + "-0" + (f.getMonth() +1) + "-" + f.getFullYear()
                });
            }
        }else{
            if(f.getDate() < 10){
                this.setState({
                    fechaActual : "0" + f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(),
                    fechaActualGuion : "0" + f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear()
                });
            }else{
                this.setState({
                    fechaActual : f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(),
                    fechaActualGuion : f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear()
                });
            }
        }
        if(this.state.eps !== "" && this.state.local !== "" && this.state.periodo !== "" && this.state.mes !== "" && this.state.tipo !== ""){
            if(this.state.tipo !== "3"){                                                                    //BORRAR DESPUES
                this.fetchData(this.state.eps,this.state.local,this.state.periodo,this.state.mes);
            }else{                                                                                          //BORRAR DESPUES
                this.setState({ tipoReal : "3"});                                                              //BORRAR DESPUES
            }                                                                                               //BORRAR DESPUES
        }else{
            this.setState({
                alerta : "Faltan campos por seleccionar.",
                isTableLoaded : false
            });
        }
    }

    handleChangeEps(event){
        this.setState({
            isLocalLoaded : false,
            isPeriodoLoaded : false,
            eps : event.target.value,
            local : "",
            periodo : "",
            alerta : ""
        });
    }

    handleChangeLocal(event){
        this.setState({ local : event.target.value, periodo : "", alerta : "" });
    }

    handleChangePeriodo(event){
        this.setState({ periodo : event.target.value, alerta : "" });
    }

    handleChangeMes(event){
        this.setState({ mes : event.target.value, alerta : "" });
    }

    handleChangeTipo(event){
        this.setState({ tipo : event.target.value, alerta : "" });
    }

    handleChangeDataSaldo(data){
        this.setState({ dataSaldo : data });
    }

    handleChangeEpsNombre(nombre){
        this.setState({ epsNombre : nombre })
    }

    vaciarTodo(){
        this.setState({ eps : "", epsNombre : "", local : "", periodo : "", mes : "" });
    }

    vaciarPeriodo(){
        this.setState({ periodo : "", mes : "" });
    }

    vaciarTipoReal(){
        this.setState({ tipoReal : "" })
    }

    roundNumber(num, scale = 2) {
        if(!("" + num).includes("e")) {
            return +(Math.round(num + "e+" + scale)  + "e-" + scale);
        } else {
            var arr = ("" + num).split("e");
            var sig = ""
            if(+arr[1] + scale > 0) {
                sig = "+";
            }
            return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
        }
    }

    formatNumber(num,simbol=""){
        var separador= ",";
        var sepDecimal= '.';
        num = this.roundNumber(num,2);
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? (
            splitStr[1].length === 1? (sepDecimal + splitStr[1] + "0") : (sepDecimal + splitStr[1])
        ) : ('');
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + separador + '$2');
        }
        if(splitRight===""){
            splitRight = ".00";
        }
        return simbol + splitLeft + splitRight;
    }

    render() {
        const listado = this.state.dataSaldo;
        console.log(listado);
        return (
            <div className="App">
                <br/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8 formulario">
                            <br/>
                            <div className="row celda-otass  centrado">
                                <div className="col-3"></div>
                                <div className="col-6">
                                    <a href="https://www.sunass.gob.pe/">
                                        <img className="logo-sunass" alt="Enlace página SUNASS"src={require("./LOGO_VECTOR.png")}/>
                                    </a>
                                </div>
                                <div className="col-3">
                                    <div>
    	                               <a className="fa fa-facebook" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Sunass.Regulador/">{null}</a>
                                       <a className="fa fa-twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/sunassperu">{null}</a>
                                       <a className="fa fa-youtube" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/sunassdelperu">{null}</a>
                                       <a className="fa fa-instagram" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/sunass.peru/">{null}</a>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="row  centrado">
                                <div className="col-6">
                                    <ComboEps eps={this.state.eps}
                                    onChange={this.handleChangeEps} onChange2={this.handleChangeEpsNombre} vaciarTodo={this.vaciarTodo} hostname={this.state.hostname}/>
                                </div>
                                <div className="col-6">
                                    <ComboLocal eps={this.state.eps} local={this.state.local}
                                    onChange={this.handleChangeLocal} hostname={this.state.hostname}/>
                                </div>
                            </div>
                            <div className="row centrado">
                                <div className="col-4">
                                    <ComboTipo eps={this.state.eps} local={this.state.local} periodo={this.state.periodo} tipo={this.state.tipo}
                                        onChange={this.handleChangeTipo} handleChangeDataSaldo={this.handleChangeDataSaldo} />
                                </div>
                                <div className="col-4">
                                    <ComboPeriodo eps={this.state.eps} local={this.state.local} periodo={this.state.periodo} tipo={this.state.tipo}
                                    onChange={this.handleChangePeriodo} vaciarPeriodo={this.vaciarPeriodo} hostname={this.state.hostname}/>
                                </div>
                                <div className="col-4">
                                    <ComboMes mes={this.state.mes}
                                    onChange={this.handleChangeMes}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 centrado">
                                    <button className="btn-enviar" onClick={this.botonEnviar}>Consultar</button>
                                </div>
                            </div>
                            <br/>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>

                <br/>
                {this.state.alerta!==""?
                    (<div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <div className="alert alert-primary alert-dismissible fade show" role="alert">
                                {this.state.alerta}
                                <button onClick={this.limpiarAlerta} type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>):(null)
                }

                {(this.state.isTableLoaded && listado.length !==0 && (this.state.tipoReal === "1" || this.state.tipoReal !== "2"))?
                    (
                        <div className="contenido-tabla">
                            <div className="row centrado">
                                <div className="col-12">
                                    <p><b>Moneda : PEN Soles</b></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-8">
                                    <table className="table table-hover table-light" id="tabla-principal">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Fecha de registro</th>
                                                <th>Codigo</th>
                                                <th>Detalle</th>
                                                <th style={{"textAlign":"right"}}>Valor</th>
                                                <th style={{"textAlign":"center"}}>Simbolo</th>
                                            </tr>
                                        </thead>
                                        <tbody>{listado.map((dynamicData, i) =>
                                            <tr key={i}>
                                                <td>{dynamicData.fecultact}</td>
                                                {this.state.tipoReal==="1"?
                                                    (<td>{dynamicData.codvar}</td>):(<td>{dynamicData.codind}</td>)
                                                }
                                                {this.state.tipoReal==="1"?
                                                    (<td>{dynamicData.desvar}</td>):(<td>{dynamicData.desind}</td>)
                                                }
                                                <td align="right">{this.formatNumber(dynamicData.valor)}</td>
                                                {this.state.tipoReal==="1"?
                                                    (<td style={{"textAlign":"center"}}>{dynamicData.simvar}</td>):(<td style={{"textAlign":"center"}}>{dynamicData.simind}</td>)
                                                }
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-2"></div>
                            </div>
                        </div>
                    ):(null)
                }

                {this.state.tipoReal === "3"?
                    (
                        <div className="modal-rr">
                            <div className="modal-dialog tam50">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading"><h5><b>Reportes Regulatorios</b></h5></div>
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                Anexo 5: Costos y gastos
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionDefault" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionDefault" className="label-default"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Anexo 2: Facturación e ingresos
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionPrimary" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionPrimary" className="label-primary"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Anexo 2: Activo fijo
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionSuccess" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionSuccess" className="label-success"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Anexo 3: Reporte de sanciones
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionInfo" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionInfo" className="label-info"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Anexo 4: Reporte de inversiones
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionInfo" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionInfo" className="label-info"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Anexo 6: Financiamiento
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionWarning" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionWarning" className="label-warning"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Anexo 6: Costos de producción
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionDanger" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionDanger" className="label-danger"></label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <br/>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading"><h5><b>Reportes de validación</b></h5></div>
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                Resumen de cuentas
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionDefault" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionDefault" className="label-default"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Consistencia de ingresos y egresos
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionPrimary" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionPrimary" className="label-primary"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Análisis de variación de existencias
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionSuccess" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionSuccess" className="label-success"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Cuentas sin movimientos
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionInfo" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionInfo" className="label-info"></label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading"><h5><b>Reportes de Acompañamiento</b></h5></div>
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                Por cuenta contable
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionDefault" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionDefault" className="label-default"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Por cuenta contable comparativo
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionPrimary" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionPrimary" className="label-primary"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Saldos de transferencias
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionSuccess" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionSuccess" className="label-success"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Saldos de inversiones
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionInfo" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionInfo" className="label-info"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Variables de gestión
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionWarning" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionWarning" className="label-warning"></label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <br/>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading"><h5><b>Reportes para estudios tarifarios</b></h5></div>
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                Reporte ET-1: Variables de gestión
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionDefault" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionDefault" className="label-default"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Reporte ET-2: Servicios y procesos
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionPrimary" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionPrimary" className="label-primary"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Reporte ET-3: Anexo 5 Anualizado
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionSuccess" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionSuccess" className="label-success"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Reporte ET-4: Cuentas contables anualizado
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionInfo" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionInfo" className="label-info"></label>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Reporte ET-5: Centros de costos anualizado
                                                                <div className="material-switch pull-right">
                                                                    <input id="someSwitchOptionWarning" name="someSwitchOption001" type="checkbox"/>
                                                                    <label for="someSwitchOptionWarning" className="label-warning"></label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
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
                                                            <button onClick={this.vaciarTipoReal} className="btn btn-secondary">Cancelar</button>
                                                        </div>
                                                        <div className="col-6">
                                                            <button onClick={this.vaciarTipoReal} className="btn btn-primary">Generar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ):(null)
                }

            </div>
        );
    }
}

export default App;
