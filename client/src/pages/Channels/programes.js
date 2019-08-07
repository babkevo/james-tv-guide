import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Programes = props => (
    <tr>

        <td>{props.programe.programe_category}</td>
        <td>{props.programe.programe}</td>
        <td>{props.programe.programe_description}</td>
        <td>
            <Link to={"/tvList/" + props.programe._id} className="btn btn-primary">Details</Link>
        </td>
    </tr>
);

class ListofProgrames extends Component {
    constructor(props) {
        super(props);
        this.state = { programe: [] };
    }

    componentDidMount() {
        console.log("/api/tvlist/alltv");
        axios
            .get("/api/tvlist/alltv")
            .then(response => {
                this.setState({ programe: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    ProgramesList() {
        return this.state.programe.map(function(currentprograme, i) {
            return <Programes programe={currentprograme} key={i} />;
        });
    }

    render() {
        return (
            <div>


                <h3>programe list</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Programe</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>{this.ProgramesList()}</tbody>
                </table>
            </div>
        );
    }
}
export default ListofProgrames;

