import React, { Component } from 'react';
import ComboEps from './componentes/comboEps.js';
import ComboLocal from './componentes/comboLocal.js';
import ComboPeriodo from './componentes/comboPeriodo.js';
import ComboMes from './componentes/comboMes.js';
import ComboTipo from './componentes/comboTipo.js';
import ModalReportesRegulatorios from './componentes/ModalReportesRegulatorios.js';
import ModalVariables from './componentes/ModalVariables.js';
import Chart from './componentes/chart.js'
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            codigos : [],
            leyenda : [],
            codigosAceptados : [],
            tipoConsulta : "tabla",
            acumulado : false,
            empezarConsulta : false,
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
            isEpsLoaded : false,
            isLocalLoaded : false,
            isPeriodoLoaded : false,
            isTableLoaded : false,
            isGraficoLoaded :false,
            tableData : [],
            filtrar : false,
            opcionReporte : "",
            chartData : [], //usado para dar datos al FusionChart (cuadro)
            titulo: 'AQUI VA EL TITULO', //usado para el titulo del cuadro
            grafico : 'column2d', //usado para el tipo de grafico del cuadro
            colores : "", //usado para el tipo de color del cuadro/grafico
            grad : "0", //usado para el gradiente del cuadro
            prefijo : "", //usado para el prefijo del cuadro
            modalbool : false,
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
        this.vaciarModal = this.vaciarModal.bind(this);
        this.vaciarTipo = this.vaciarTipo.bind(this);
        this.handleChangeDataSaldo = this.handleChangeDataSaldo.bind(this);
        this.botonEnviar = this.botonEnviar.bind(this);
        this.formatNumber = this.formatNumber.bind(this);
        this.roundNumber = this.roundNumber.bind(this);
        this.limpiarAlerta = this.limpiarAlerta.bind(this);
        this.handleChangeFiltrar = this.handleChangeFiltrar.bind(this);
        this.handleChangeCodigosAceptados = this.handleChangeCodigosAceptados.bind(this);
        this.handleChangeLeyenda = this.handleChangeLeyenda.bind(this);
        this.handleChangeTipoConsulta = this.handleChangeTipoConsulta.bind(this);
        this.handleChangeAcumulado = this.handleChangeAcumulado.bind(this);
        this.handleChangeEmpezarConsulta = this.handleChangeEmpezarConsulta.bind(this);
        this.handleChangeTipoGrafico = this.handleChangeTipoGrafico.bind(this);
        this.fetchConsulta = this.fetchConsulta.bind(this);
        this.cambiarAlerta = this.cambiarAlerta.bind(this);
        this.cambioGrad = this.cambioGrad.bind(this);
    }

    limpiarAlerta(){
        this.setState({ alerta : "" })
    }

    cambiarAlerta(alerta){
        this.setState({ alerta : alerta })
    }

    cambioGrad(event){
        this.setState({ grad : event.target.value })
    }

    handleChangeTipoGrafico(event){
        this.setState({ grafico : event.target.value })
    }

    fetchCodigos(eps,local,periodo,mes){
        var param1 = "";
        var param2 = "";
        if(this.state.tipo==="1"){
            param1 = "variables";
            param2 = "Variables"
        }else{
            param1 = "indicadores";
            param2 = "Indicadores";
        }
        fetch(this.state.hostname+"/APISunass/MainController/"+param1+"/getCodigos"+param2+"?id_eps="+eps+"&periodo="+periodo+mes)//AÑADIR LOCALIDAD CAUNDO NOS AVISEN
        .then((response) =>{
            return response.json()
        })
        .then((result) => {
            if(result.length === 0){
                this.setState({
                    alert : "No hay CODIGOS para la consulta."
                });
            }
            this.setState({
                codigos : result
            });
        });
    }

    prepararDataGrafico(result){
        var obj = [];
        var titaux = "";
        if(this.state.tipo === "1"){
            titaux = "CONSULTA DE VARIABLES DE "+this.state.epsNombre;
        }
        if(this.state.tipo === "2"){
            titaux = "CONSULTA DE INDICADORES DE "+this.state.epsNombre;
        }
        for(var i in result){
            obj.push({
                "label": result[i].codvar,
                "value": result[i].valor
            })
        }
        console.log(result);
        this.setState({
            chartData : obj,
            prefijo : result[i].simvar,
            titulo : titaux
        })

    }

    fetchConsulta(){
        this.setState({
            empezarConsulta : false,
            isTableLoaded : false,
            isGraficoLoaded : false,
            chartData : []
        })
        var aux1 = "";
        var aux2 = "";
        if (this.state.tipo === "1") {
            aux1 = "variables";
            aux2 = "Variables";
        }
        if (this.state.tipo === "2") {
            aux1 = "indicadores";
            aux2 = "Indicadores";
        }
        const data = {
            eps : parseInt(this.state.eps,10),
			localidad : parseInt(this.state.local,10),
			periodo : this.state.periodo+this.state.mes,
			acumulado : this.state.acumulado,
			codigos : this.state.codigosAceptados
        }
        console.log(JSON.stringify(data));
        fetch(this.state.hostname+"/APISunass/MainController/"+aux1+"/get"+aux2,{
            method : 'POST',
            headers : {
                'Accept' : '*/*',
                'Content-Type' : 'application/json; charset=UTF-8'
            },
            body : JSON.stringify(data)
        })
        .then((response) =>{
            console.log("response: ");
            console.log(response);
            return response.json();
        })
        .then((result) => {
            console.log("entro 2");
            console.log(result);
            if(result.length === 0){
                this.setState({ alerta : "No hay datos de la consulta." });
            }
            this.setState({
                dataSaldo : result
            });
            if(this.state.tipoConsulta === "tabla"){
                this.setState({
                    isTableLoaded : true
                })
            }
            if(this.state.tipoConsulta === "grafico"){
                this.prepararDataGrafico(result);
                this.setState({
                    isGraficoLoaded : true
                })
            }
        });
    }

    botonEnviar(eps,local,periodo,mes){
        this.setState({
            tipoReal : "",
            dataSaldo : []
        });
        if(this.state.eps !== "" && this.state.local !== "" && this.state.periodo !== "" && this.state.mes !== "" && this.state.tipo !== ""){
            if(this.state.tipo === "1"){
                this.fetchCodigos(this.state.eps,this.state.local,this.state.periodo,this.state.mes);
                this.setState({
                    tipoReal : "1",
                    modalbool : true
                });
            }else{
                if(this.state.tipo === "2"){
                    this.fetchCodigos(this.state.eps,this.state.local,this.state.periodo,this.state.mes);
                    this.setState({
                        tipoReal : "2",
                        modalbool : true
                    });
                }else{
                    this.setState({
                        tipoReal : "3",
                        modalbool : true
                    });
                }
            }
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

    handleChangeEmpezarConsulta(valor){
        this.setState({ empezarConsulta : valor })
    }

    handleChangeLocal(event){
        this.setState({ local : event.target.value, periodo : "", alerta : "" });
    }

    handleChangeCodigosAceptados(c){
        this.setState({ codigosAceptados : c });
    }

    handleChangeLeyenda(c){
        this.setState({ leyenda : c });
    }

    handleChangeTipoConsulta(tipo){
        this.setState({ tipoConsulta : tipo });
    }

    handleChangeAcumulado(a){
        this.setState({ acumulado : a });
    }

    handleChangeFiltrar(event){
        this.setState({ filtrar : !this.state.filtrar}  );
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

    vaciarModal(){
        this.setState({ modalbool : false })
    }

    vaciarTipo(){
        this.setState({ tipo : "" })
    }

    parsearPeriodo(cadper){
        var cadenaux = "";
        if(cadper.length === 6){
            cadenaux = cadenaux+cadper[4]+cadper[5]+"/";
            cadenaux = cadenaux+cadper[0]+cadper[1]+cadper[2]+cadper[3];
        }else{
            cadenaux = cadenaux+cadper[6]+cadper[7]+"/";
            cadenaux = cadenaux+cadper[4]+cadper[5]+"/";
            cadenaux = cadenaux+cadper[0]+cadper[1]+cadper[2]+cadper[3];
        }
        return cadenaux;
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
        const leyenda = this.state.leyenda;
        console.log("LEYENDA.............");
        console.log(leyenda);
        if(this.state.empezarConsulta===true && this.state.codigosAceptados.length !== 0){
            this.fetchConsulta();
        }

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
                                        <img className="logo-sunass" alt="Enlace página SUNASS" target="_blank" src={require("./LOGO_VECTOR.png")}/>
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
                            <div className="row centrado">
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
                                    <div className="row">
                                        <div className="col-12">
                                            <ComboTipo eps={this.state.eps} local={this.state.local} periodo={this.state.periodo} tipo={this.state.tipo}
                                                onChange={this.handleChangeTipo} handleChangeDataSaldo={this.handleChangeDataSaldo} />
                                        </div>
                                    </div>
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
                                    <button className="btn-enviar" onClick={this.botonEnviar}>Enviar</button>
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

                {(this.state.isGraficoLoaded && this.state.tipoConsulta ==="grafico" && this.state.chartData.length !== 0) ? //CAMBIAR A LOS DATOS DE LA TABLA
                    (<div className="row">
                        <div className="col-1"></div>
                        <div className="col-8">
                            <Chart
                                chartData={this.state.chartData}
                                grafico={this.state.grafico}
                                legendPosition="bottom"
                                titulo={this.state.titulo}
                                paleta={this.state.colores}
                                grad={this.state.grad}
                                prefijo={this.state.prefijo}
                            />
                        </div>
                        <div className="col-2">
                            {this.state.leyenda.length !== 0 ?
                                (<table className="table table-hover table-light" id="tabla-principal">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Codigo</th>
                                            <th>Descripcion</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.state.leyenda.map((dynamicData, i) =>
                                        <tr key={i}>
                                            <td>{dynamicData.codigo}</td>
                                            <td>{dynamicData.descripcion}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>):(null)
                            }
                        </div>
                        <div className="col-1"></div>
                    </div>):(null)
                }

                {(this.state.isTableLoaded && this.state.tipoConsulta ==="tabla")?
                    (
                        <div className="contenido-tabla">
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
                                                <th style={{"textAlign":"center"}}>Unidad</th>
                                            </tr>
                                        </thead>
                                        <tbody>{listado.map((dynamicData, i) =>
                                            <tr key={i}>
                                                <td>{this.parsearPeriodo(dynamicData.fecultact)}</td>
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

                {this.state.tipoReal === "1" && this.state.modalbool?
                    (<ModalVariables vaciarModal={this.vaciarModal} leyendar={this.handleChangeLeyenda} cambiarCodigos={this.handleChangeCodigosAceptados} cambiarAcumulado={this.handleChangeAcumulado} gradiente={this.state.grad} cambioGrad={this.cambioGrad}
                        tipoGrafico={this.state.grafico} handleChangeTipoGrafico={this.handleChangeTipoGrafico} cambiarTipoConsulta={this.handleChangeTipoConsulta} fetch={this.fetchConsulta} cambiarEmpezarConsulta={this.handleChangeEmpezarConsulta}
                        eps={this.state.eps} local={this.state.local} periodo={this.state.periodo+this.state.mes} codigos={this.state.codigos} acumulado={this.state.acumulado} tipoConsulta={this.state.tipoConsulta} cambiarAlerta={this.cambiarAlerta}/>):(null)
                }

                {this.state.tipoReal === "2" && this.state.modalbool?
                    (<ModalVariables vaciarModal={this.vaciarModal} leyendar={this.handleChangeLeyenda} cambiarCodigos={this.handleChangeCodigosAceptados} cambiarAcumulado={this.handleChangeAcumulado} gradiente={this.state.grad} cambioGrad={this.cambioGrad}
                        tipoGrafico={this.state.grafico} handleChangeTipoGrafico={this.handleChangeTipoGrafico} cambiarTipoConsulta={this.handleChangeTipoConsulta} fetch={this.fetchConsulta} cambiarEmpezarConsulta={this.handleChangeEmpezarConsulta}
                        eps={this.state.eps} local={this.state.local} periodo={this.state.periodo+this.state.mes} codigos={this.state.codigos} acumulado={this.state.acumulado} tipoConsulta={this.state.tipoConsulta} cambiarAlerta={this.cambiarAlerta}/>):(null)
                }

                {this.state.tipoReal === "3" && this.state.modalbool?
                    (<ModalReportesRegulatorios vaciarModal={this.vaciarModal} opcionReporte={this.state.opcionReporte}/>):(null)
                }

            </div>
        );
    }
}

export default App;
