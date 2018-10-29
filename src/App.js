import React, { Component } from 'react';
import ComboEps from './componentes/comboEps.js';
import ComboLocal from './componentes/comboLocal.js';
import ComboPeriodo from './componentes/comboPeriodo.js';
import ComboMes from './componentes/comboMes.js';
import ComboTipo from './componentes/comboTipo.js';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            hostname : "", //HAY QUE AÑADIR UN HOSTNAME PARA QUE FUNCIONE LA APLICACION WEB
            eps : "",
            filtrar : "3",
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
        this.handleChangeDataSaldo = this.handleChangeDataSaldo.bind(this);
        this.botonEnviar = this.botonEnviar.bind(this);
        this.formatNumber = this.formatNumber.bind(this);
        this.roundNumber = this.roundNumber.bind(this);
        this.limpiarAlerta = this.limpiarAlerta.bind(this);
        this.handleChangeFiltrar = this.handleChangeFiltrar.bind(this);
        this.ordenarTableData = this.ordenarTableData.bind(this);
    }

    handleChangeFiltrar(){
        if(this.state.filtrar === "1"){
            this.setState({
                filtrar : "2"
            });
		}else{
            if(this.state.filtrar === "2"){
                this.setState({
                    filtrar : "3"
                });
    		}else{
                this.setState({
                    filtrar : "1"
                });
            }
        }
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
        this.setState({
            alerta : ""
        })
    }

    fetchData(eps,local,periodo,mes){
        var tipoString = "";
        if (this.state.tipo === "1") {
            tipoString = "saldos/getSaldos"; //CAMBIAR
        }

        this.setState({
            isTableLoaded : false
        });
        const data = {
            id_eps : parseInt(eps,10),
            id_local : parseInt(local,10),
            periodo : periodo+mes
        }
        fetch(this.state.hostname+"/otass-rest/MainController/"+tipoString, {
            method : 'POST',
            headers : {
                accept : '*/*',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
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
            this.fetchData(this.state.eps,this.state.local,this.state.periodo,this.state.mes);
        }else{
            this.setState({
                alerta : "Faltan campos por seleccionar.",
                isTableLoaded : false
            });
        }
    }

    vaciarTodo(){
        this.setState({
            eps : "",
            epsNombre : "",
            local : "",
            periodo : "",
            mes : ""
        });
    }

    vaciarPeriodo(){
        this.setState({
            periodo : "",
            mes : ""
        });
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
        this.setState({
            local : event.target.value,
            periodo : "",
            alerta : ""
        });
    }

    handleChangePeriodo(event){
        this.setState({
            periodo : event.target.value,
            alerta : ""
        });
    }

    handleChangeMes(event){
        this.setState({
            mes : event.target.value,
            alerta : ""
        });
    }

    handleChangeTipo(event){
        this.setState({
            tipo : event.target.value,
            alerta : ""
        });
    }

    handleChangeDataSaldo(data){
        this.setState({
            dataSaldo : data
        });
    }

    handleChangeEpsNombre(nombre){
        this.setState({
            epsNombre : nombre
        })
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
                                    <a href="http://www.otass.gob.pe/">
                                        <img className="logo-otass" alt="Enlace página OTASS"src={require("./LOGO_VECTOR.png")}/>
                                    </a>
                                </div>
                                <div className="col-3">
                                    <div>
    	                               <a className="fa fa-facebook" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Sunass.Regulador/">{null}</a>
                                       <a className="fa fa-twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/sunassperu">{null}</a>
                                       <a className="fa fa-youtube" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/sunassdelperu">{null}</a>
                                       <a className="fa fa-instagram" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/sunass.peru//">{null}</a>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="row  centrado">
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-10">
                                            <ComboEps eps={this.state.eps}
                                            onChange={this.handleChangeEps} onChange2={this.handleChangeEpsNombre} vaciarTodo={this.vaciarTodo} hostname={this.state.hostname} filtrar={this.state.filtrar}/>
                                        </div>
                                        <div className="col-2">
                                            {this.state.filtrar==="3" ?
                                                (<button className="botonCheck-neutro" onClick={this.handleChangeFiltrar}><b>Todas</b></button>):(
                                                    this.state.filtrar==="1"?
                                                        (<button className="botonCheck-activo" onClick={this.handleChangeFiltrar}><b>✔ Si</b></button>):(<button className="botonCheck" onClick={this.handleChangeFiltrar}><b>✖ No</b></button>)
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
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

                {(this.state.isTableLoaded && listado.length !==0 && this.state.tipoReal === "1")?
                    (null):(null)
                }
                
            </div>
        );
    }
}

export default App;
