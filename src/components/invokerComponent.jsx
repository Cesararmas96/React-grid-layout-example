import React from "react";
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { observer } from "mobx-react";
import { subscriberGrid } from "../framework/models/subscriberGrid";
import { randomString, randomInt } from "../common/utils";
import { subscribeToChannel, unSubscribe } from "../framework/message-relay/psSubscriber";
import { Sidebar } from 'primereact/sidebar';
import { InfoComponent } from './infoComponent';

@observer class InvokerComponent extends React.Component {


    /*
    To handle subscriptions: 
    subscribeToChannel() is part of the framework just like unsubscribe(), these are the only methods needed.
    What has to be implemented here on the implementing side is the map to keep track of the subscriptions (if we wan to be able to unsubscribe).
    */
    constructor(props) {
        super(props);
        this.state = {
            subscriptions: new Map(),
            running: false,
            locked: false,
            changedByUser: 0,
            showInfoSidebar: false,
        }
    }

    addSubscription(index) {
        // we only publish on 4 channels thus we reduce the component index mod 4 to get channel index
        this.state.subscriptions.set(index, subscribeToChannel(index, (index % 4)));
    }

    removeSubscription(index) {
        unSubscribe(this.state.subscriptions.get(index));
        this.state.subscriptions.delete(index);
    }

    onStartClick = (event) => {
        subscriberGrid.tasks.forEach(element => {
            this.state.running ? this.removeSubscription(element.layoutIndex) : this.addSubscription(element.layoutIndex);
        });
        this.setState(
            { running: !this.state.running }
        )
    };

    onAddClick = (event) => {
        /* Adding a 'randomly' styled task */

        let index = (subscriberGrid.count).toString();

        let renderClass = "colorRender";
        let renderWidth = 4;
        let renderHeight = 3;
        switch (randomInt(0, 2)) {
            case 1:
                renderClass = "gaugeRender";
                renderWidth = 3;
                renderHeight = 7;
                break;
            case 2:
                renderClass = "chartRender";
                renderWidth = 4;
                renderHeight = 8;
                break;
            default:
        }

        let subscriptionMap = {
            int: 0,
            rgb: '{"rgbH": 20,"rgbL":120}',
            percent: 50,
            series: '[0,0,0,0,0,0,0,0,0,0]'
        };
        let layoutMap = { i: index, x: randomInt(5, 15), y: randomInt(5, 10), w: renderWidth, h: renderHeight };

        subscriberGrid.addSubscriberGridItem(`${index} - ${randomString(6)}`, renderClass, layoutMap, subscriptionMap);
        // check if subscription shall be added
        if (this.state.running) this.addSubscription(index);
    };

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

    onChangeClick = (event) => {

        let componentIndex = randomInt(0, subscriberGrid.count - 1);
        let layoutMap = subscriberGrid.getGridItemLayout(componentIndex);
        let propToChange = "x";
        switch (randomInt(1, 3)) {
            case 1:
                propToChange = "h"
                break;
            case 2:
                propToChange = "w"
                break;
            default: // do nothing, use default prop value
        }
        let coord = layoutMap.get(propToChange);
        let change = randomInt(1, 3);
        if (propToChange === "h") // we never set height less than 8
            coord > 10 ? coord -= change : coord += change;
        else
            coord > 7 ? coord -= change : coord += change;

        layoutMap.set(propToChange, coord);  // impose a random change to a random coordinate
        subscriberGrid.setGridItemLayout(componentIndex, layoutMap);
        
        // count how many times such user invoked change has been done
        this.setState({
            changedByUser: this.state.changedByUser + 1
        })
    }

    onShowInfoClick = (event) => {
        this.setState({
            showInfoSidebar: true,
        })

    }


    render() {

        return (
            <React.Fragment>
                <Toolbar style={{ backgroundColor: 'whitesmoke' }}>
                    <div className="p-toolbar-group-left">
                        <Button
                            icon={this.state.running ? "pi pi-minus" : "pi pi-check"}
                            size="tiny"
                            label={this.state.running ? 'Stop' : 'Start'}
                            className="p-button-rounded p-button-primary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onStartClick} />
                        <Button
                            icon="pi pi-clone"
                            size="tiny"
                            disabled={subscriberGrid.count > 7}
                            label="Add element!"
                            className="p-button-rounded p-button-secondary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onAddClick} />
                        <Button
                            icon="pi pi-refresh"
                            size="tiny"
                            disabled={this.state.changedByUser > 3} // we only allow a this four times since it makes the components really ugly after a while...
                            label="Change element!"
                            className="p-button-rounded p-button-secondary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onChangeClick} />
                        <Button
                            icon={this.state.locked ? "pi pi-unlock" : "pi pi-lock"}
                            size="tiny"
                            label={this.state.locked ? 'Unlock all!' : 'Lock all!'}
                            className="p-button-rounded p-button-secondary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onLockAllClick} />
                    </div>
                    <div className="p-toolbar-group-right">
                        <Button
                            icon="pi pi-question"
                            size="tiny"
                            label="What's this anyway?"
                            className="p-button-rounded p-button-primary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onShowInfoClick} />
                    </div>
                </Toolbar>

                <Sidebar visible={this.state.showInfoSidebar} position="right" style={{width:'50em'}} onHide={(e) => this.setState({ showInfoSidebar: false })}>
                    <InfoComponent/>
                </Sidebar>

            </React.Fragment>
        )
    }
}

export default InvokerComponent;