import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface IState {
    contact: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { contact: [] }
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:5000/contacts`).then(data => {
            this.setState({ contact: data.data })
        })
    }
    public deleteContact(id: number) {
        axios.delete(`http://localhost:5000/contacts/${id}`).then(data => {
            const index = this.state.contact.findIndex(contact => contact.id === id);
            this.state.contact.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const contacts = this.state.contact;
        return (
            <div>
                {contacts.length === 0 && (
                    <div className="text-center">
                        <h2>No contact found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Lastname</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts && contacts.map(contact =>
                                    <tr key={contact.id}>
                                        <td>{contact.first_name}</td>
                                        <td>{contact.last_name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.address}</td>
                                        <td>{contact.description}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${contact.id}`} className="btn btn-sm btn-outline-secondary">Edit Contact </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteContact(contact.id)}>Delete Contact</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}