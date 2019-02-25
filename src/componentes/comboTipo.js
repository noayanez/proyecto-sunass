import React, { Component } from 'react';

class ComboTipo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenBody: props.tokenBody
        }
    }

    render(){
        return(
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text label-titulo" htmlFor="select-periodo">Tipo</label>
                </div>
                <select className="custom-select" id="select-periodo" value={this.props.tipo} onChange={this.props.onChange}>
                    <option key={0} value="" disabled>Seleccione tipo</option>
                    { (this.props.tokenBody !== undefined && (this.props.tokenBody.tipo === 0 || this.props.tokenBody.tipo === 1 || this.props.tokenBody.tipo === 2))?
                        (
                            <option value="1">Variables</option>
                        ):(null)
                    }
                    { (this.props.tokenBody !== undefined && (this.props.tokenBody.tipo === 0 || this.props.tokenBody.tipo === 1 || this.props.tokenBody.tipo === 2))?
                        (
                            <option value="2">Indicadores</option>
                        ):(null)
                    }
                    { (this.props.tokenBody !== undefined && (this.props.tokenBody.tipo === 0 || this.props.tokenBody.tipo === 2))?
                        (
                            <option value="3">Reporte regulatorio</option>
                        ):(null)
                    }
                </select>
            </div>
        )
    }
}

export default ComboTipo;
