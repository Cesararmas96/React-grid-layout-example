import React from "react";
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { observer } from "mobx-react";
import { subscriberGrid } from "../framework/models/subscriberGrid";


/* 
    Component for all user invoked actions in this demo, like adding listeners and so on...
*/
@observer class InvokerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /*
                To handle subscriptions in a implementation: 
                subscribeToChannel() is part of the framework just like unsubscribe(), these are the only methods needed.
                What has to be implemented here on the implementing side is the map to keep track of the subscriptions (if we wan to be able to unsubscribe).
            */
            // subscriptions: new Map(),
            // running: false,
            // locked: false,
            // changedByUser: 0,
            // showInfoSidebar: false,
        }
    }

 
    onLockAllClick = (event) => {

        for (var i = 0; i < subscriberGrid.count; i++) {
            let layoutMap = subscriberGrid.getGridItemLayout(i);
            this.state.locked ? layoutMap.set('static', false) : layoutMap.set('static', true);
            subscriberGrid.setGridItemLayout(i, layoutMap);
        }
        this.setState({
            locked: !this.state.locked
        })
    }
    render() {

        return (
            <React.Fragment>
                <Toolbar style={{ backgroundColor: 'whitesmoke' }}>
                    <div className="p-toolbar-group-left">           
                        <Button
                            icon={this.state.locked ? "pi pi-unlock" : "pi pi-lock"}
                            size="tiny"
                            label={this.state.locked ? 'Unlock all!' : 'Lock all!'}
                            className="p-button-rounded p-button-secondary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onLockAllClick} />
                    </div>                    
                </Toolbar>              
            </React.Fragment>
        )
    }
}

export default InvokerComponent;