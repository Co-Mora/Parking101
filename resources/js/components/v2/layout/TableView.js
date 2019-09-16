
import React, {Component, useState} from 'react';

export default class TableView extends Component {

    render(props) {

        const [staticHeader, setStaticHeader] = useState([]);
        const [errorMessage, setErrorMessage] = useState("No data available.");


        return (
            <div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                {staticHeader.map(data => (
                                    <th>{data}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="gradeX">
                                {staticHeader.map(data => (
                                    <td className="center">{data}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <div className="alert alert-warning col-sm-12 m-b-xs" role="alert">{errorMessage}</div>
                </div>
            </div>
        )
    }
}
