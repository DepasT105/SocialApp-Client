import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_ERRORS,
  LOADING_UI,
   LOADING_USER,
  CLEAR_ERRORS
} from "../types";
import axios from 'axios';
export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/login", userData)
    .then(result => {
      const FBIdToken = `Bearer ${result.data.token}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      axios.defaults.headers.common["Authorization"] = FBIdToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS,
    payload: err.response.data });
    });
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/signup", newUserData)
    .then(result => {
      const FBIdToken = `Bearer ${result.data.token}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      axios.defaults.headers.common["Authorization"] = FBIdToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS,
    payload: err.response.data.errors });

    });
};

export const logoutUser = () =>(dispatch) =>{
localStorage.removeItem('FBIdToken');
delete  axios.defaults.headers.common["Authorization"];
dispatch({type:SET_UNAUTHENTICATED});
}

export const getUserData = () => dispatch => {
dispatch({type:LOADING_USER});
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const uploadImage =(formData) => dispatch =>{
dispatch({type:LOADING_USER});
axios.post('/user/image',formData).then(res=>{
  dispatch(getUserData());
  window.location.reload();
}).catch(err=>{
  console.log(err);
});
};

export const editUserDetails =(userDetails) =>(dispatch) =>{
dispatch({type: LOADING_USER});
axios.post('/user', userDetails).then(() =>{
  dispatch(getUserData());
}).catch(err=>{
  console.log(err);
});
};
