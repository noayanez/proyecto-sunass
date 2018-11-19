import React, {Component} from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import ReactFC from 'react-fusioncharts';

Charts(FusionCharts);
OceanTheme(FusionCharts);



class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData : props.chartData,
            type : props.grafico,
            width: '100%',
            height: '600',
            dataFormat: 'json',
            dataSource: {
                chart: {
                    "bgColor" : "#F4F4F4",
                    "bgAlpha" : "100",
                    "labelFontColor" : "#000000",
                    "rotateValues": "0",
                    "placeValuesInside": "0",
                    "valueFontColor": "#000000",
                    "valueFontSize": "15",
                    "labelFontSize": "15",
                    "formatNumberScale" : "0",
                    "palettecolors": props.paleta,
                    "baseFont": "Arial",
                    "baseFontSize": "16",
                    caption: props.titulo,
                    captionFontSize: "24",
                    numberPrefix: props.prefijo,
                    "subcaptionFontSize": "24",
                    "subcaptionFontBold": "0",
                    "subcaptionFont": "Arial",
                    theme: 'ocean',
                    "exportEnabled": "1",
                    "usePlotGradientColor": props.grad,
                    "plotGradientColor":"#ffffff"
                },
                data:
                    props.chartData,

            },
        };
        this.handleChangeTipo = this.handleChangeTipo.bind(this);
    }

    handleChangeTipo(tipo){
        this.setState({
            type : tipo
        });
    }


    static defaultProps = {
        displayTitle : true,
        textTitle : "Titulo",
        displayLegend : true,
        legendPosition : 'right'
    }



    render(){
        return (
          <div id="grafEst">
              <ReactFC {...this.state} />
          </div>
        )
    }
}

export default Chart;
