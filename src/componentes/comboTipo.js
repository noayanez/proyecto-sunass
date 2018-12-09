import React, { Component } from 'react';

class ComboTipo extends Component {

    render(){
        return(
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text label-titulo" htmlFor="select-periodo">Tipo</label>
                </div>
                <select className="custom-select" id="select-periodo" value={this.props.tipo} onChange={this.props.onChange}>
                    <option key={0} value="" disabled>Seleccione tipo</option>
                    <option value="1">Variables</option>
                    <option value="2">Indicadores</option>
                    <option value="3">Reporte regulatorio</option>
                </select>
            </div>
        )
    }
}

export default ComboTipo;
