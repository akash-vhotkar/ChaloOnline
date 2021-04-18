import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export default function Privateroute(props) {
    const { user } = useSelector(state => state.AuthReducer);
    return user ? (
        <Route path={props.path} to={props.to} exact={props.exact} component={props.component} />
    ) : (
        <Redirect to="/" />
    )
}
