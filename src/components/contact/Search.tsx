import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';


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
class SearchContact extends React.Component<RouteComponentProps<any>, IFormState> {
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
}
export default withRouter(SearchContact)