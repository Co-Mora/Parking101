import React, { Component, useState } from 'react';

import TableView from '../layout/TableView';

export default class CarParkTenant extends Component {


    render() {
        const [carPark, setCarPark] = useState("Bea Test");

        return (
            <div>
                {carPark}
                <input onChange={event => setCarPark(event.target.value)}/>
                <TableView />
            </div>
        )
    }
}
