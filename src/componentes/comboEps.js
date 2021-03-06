import React, { Component } from 'react';

class ComboEps extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataEps : []
        }
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(event){
        this.props.onChange(event);
        for(var i in this.state.dataEps){
            if(parseInt(event.target.value,10) === this.state.dataEps[i].codeps){
                this.props.onChange2(this.state.dataEps[i].deneps);
            }
        }
    }

    componentDidMount(){
        this.fetchDataEps();
    }

    fetchDataEps(){
        fetch(this.props.hostname+"/APISunass/MainController/getEps")
        .then((response) =>{
            //console.log(response); //SE MUESTRA LOS EPS QUE FETCHEAMOS
            if(response.status === 404){
                return [];
            }else{
                return response.json();
            }
        })
        .then((result) => {
            console.log(result);
            this.setState({
                dataEps : result
            });
        })
    }

    crearOpcionesEps(){
        const objs = [];
        for(var i in this.state.dataEps){
                objs.push(<option key={i+1} value={this.state.dataEps[i].codeps}>{this.state.dataEps[i].deneps}</option>)
        }
        return objs;
    }

    render(){
        return(
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text label-titulo" htmlFor="select-eps">Eps</label>
                </div>
                <select className="custom-select" id="select-eps" value={this.props.eps} onChange={this.onSelect}>
                    <option key={0} value={""} disabled>Seleccione empresa</option>
                    {this.crearOpcionesEps()}
                </select>
            </div>
        )
    }
}

export default ComboEps;
