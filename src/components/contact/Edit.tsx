import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: number,
    contact: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditContact extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            contact: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/contacts/${this.state.id}`).then(data => {
            this.setState({ contact: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/contacts/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }

    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }
    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.contact &&
                    <div>
                        < h1 > Contact List Management App</h1>
                        <p> Built with React.js and TypeScript </p>

                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Edit Contact </h2>
                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Contact's details has been edited successfully </div>
                                )}
                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="first_name"> First Name </label>
                                        <input type="text" id="first_name" defaultValue={this.state.contact.first_name} onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter contact's first name" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="last_name"> Last Name </label>
                                        <input type="text" id="last_name" defaultValue={this.state.contact.last_name} onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter contact's last name" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="email"> Email </label>
                                        <input type="email" id="email" defaultValue={this.state.contact.email} onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter contact's email address" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="phone"> Phone </label>
                                        <input type="text" id="phone" defaultValue={this.state.contact.phone} onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter contact's phone number" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="address"> Address </label>
                                        <input type="text" id="address" defaultValue={this.state.contact.address} onChange={(e) => this.handleInputChanges(e)} name="address" className="form-control" placeholder="Enter contact's address" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="description"> Description </label>
                                        <input type="text" id="description" defaultValue={this.state.contact.description} onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
                                    </div>
                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Contact </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default withRouter(EditContact)