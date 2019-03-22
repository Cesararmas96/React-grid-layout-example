import GridElementSuper from "../framework/elements/gridElementSuper"
import React from "react";

export default class GridElementExample extends GridElementSuper{
	static renderElement(i) {
    return <div key={i} style={{
            backgroundColor: `steelblue`,
            borderRadius: '8px',
            borderWidth: '3px',
            borderColor: 'LightGray',
            borderStyle: 'solid'
             }}>
           </div>;
    }
}