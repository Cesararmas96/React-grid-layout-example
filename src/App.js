import React, { Component } from 'react';
import './App.css';

// Algunas implementaciones de elementos de cuadrícula utilizan echarts, lo importamos en toda la aplicación
// some grid element implementations use echarts, we import it application wide
// import echarts from 'echarts';
// prime reaccion css para hacer bonitos botones y cosas en la demo
// prime react css for making beautiful buttons and stuff in the demo
// Barra de arriba para la configuracion del grid
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Importando el 'framework' que estamos demo (esto eventualmente se convertirá en un módulo de nodo)
// Importing he 'framework' that we are demoing (this will eventually become a node module)
import SubscriberGridLayout from './framework/components/grid';
import './framework/message-relay/psSubscriber';
import {subscriberGrid} from './framework/models/subscriberGrid';

// La demostración actual o 'implementación'
// The actual demo or 'implementation'
// import ConsumerComponent from './components/consumerComponent';
import InvokerComponent from './components/invokerComponent';
import GridElementColor from './grid-elements/gridElementColor';
import GridElementGauge from './grid-elements/gridElementGauge';
import GridElementChart from './grid-elements/gridElementChart';

// This is tha guy that actually publishes data to the demo
// Este es el tipo que realmente publica datos para la demostración.
import './worker/psWorkerRelayPublisher';

// Registering the grid-element rendering classes
// Registro de las clases de representación del elemento de la cuadrícula
GridElementColor.register("colorRender", GridElementColor);
GridElementGauge.register("gaugeRender", GridElementGauge);
GridElementChart.register("chartRender", GridElementChart);
/*
   TODO: Para los elementos construidos en echart (calibre y gráfico) podemos usar echarts construidos en un marco de estilo styiling
   Podemos migrar los estilos aquí y hacer que estén disponibles en todo el mundo, verlos ...
*/
/*
  TODO: For the elements built on echart (gauge and chart) we can use echarts built in styiling framework
  We can migrate the styles to here and make them available applciation wide, look into it...
*/
// echarts.registerTheme('gauge_theme', {
//     //backgroundColor: 'gray', //'#f4cccc',
//     //color: 'red'
// });


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <InvokerComponent />
        </header>
        <MainComponent />
      </div>
    );
  }
}

class MainComponent extends Component{
  componentWillMount(){
    let subscriptionMap = { // Initial values of the subscription map. All renderClasses uses the same format. 
      rgb:'{"rgbH": 20,"rgbL":200}', 
      percent: 50,
      series: '[0,0,0,0,0,0,0,0,0,0]'
    };
    let layoutMap = { i: '0', x: 0, y: 0, w: 4, h: 3};
    subscriberGrid.addSubscriberGridItem( "colorRender", layoutMap, subscriptionMap);
    layoutMap = { i: '1', x: 4, y: 0, w: 3, h: 9};
    subscriberGrid.addSubscriberGridItem( "chartRender", layoutMap, subscriptionMap );
    layoutMap = { i: '2', x: 0, y: 3, w: 2, h: 6};
    subscriberGrid.addSubscriberGridItem( "gaugeRender", layoutMap, subscriptionMap );
    layoutMap = { i: '3', x: 7, y: 0, w: 3, h: 7};
    subscriberGrid.addSubscriberGridItem( "gaugeRender", layoutMap, subscriptionMap );
  }

  render() {
    return (
      <div>
        <SubscriberGridLayout
          compactType="vertical" // default : none
          breakpoint="lg" // default : 'lg' = 12 columns
          rowHeight={30} // default : 30
          gridStyle={{ backgroundColor: 'LightSteelBlue' }}
        />
      </div>
    );
  }
}

export default App;
