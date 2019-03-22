import React, { Component } from 'react';
import './App.css';

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
import GridElementExample from './grid-elements/gridElementExample';

// Registering the grid-element rendering classes
// Registro de las clases de representación del elemento de la cuadrícula
//Cada Elemento que se muestra 

GridElementExample.register("exampleRender", GridElementExample);
GridElementExample.register("exampleRender", GridElementExample);
GridElementExample.register("exampleRender", GridElementExample);
GridElementExample.register("exampleRender", GridElementExample);



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
    };
    
    let layoutMap = { i: '0', x: 0, y: 0, w: 4, h: 3};
    subscriberGrid.addSubscriberGridItem( "exampleRender", layoutMap, subscriptionMap);
    layoutMap = { i: '1', x: 4, y: 0, w: 3, h: 9};
    subscriberGrid.addSubscriberGridItem( "exampleRender", layoutMap, subscriptionMap );
    layoutMap = { i: '2', x: 0, y: 3, w: 2, h: 6};
    subscriberGrid.addSubscriberGridItem( "exampleRender", layoutMap, subscriptionMap );
    layoutMap = { i: '3', x: 7, y: 0, w: 3, h: 7};
    subscriberGrid.addSubscriberGridItem( "exampleRender", layoutMap, subscriptionMap );

    layoutMap = { i: '4', x: 10, y: 0, w: 5, h: 5};
    subscriberGrid.addSubscriberGridItem( "exampleRender", layoutMap, subscriptionMap );
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
