import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
const  AuthRoute = ({component :Component, authenticated, ...rest})=>  (
   <Route
   {...rest}
   render= {(props) => authenticated ===false ? <Redirect to='/login'/> : <Component {...props}/>}/>
    )
const mapStateToProps =(state)=>({
authenticated: state.user.authenticated
});
AuthRoute.protoTypes={user: PropTypes.object.isRequired};
export default connect(mapStateToProps)(AuthRoute) ;