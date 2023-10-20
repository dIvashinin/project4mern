// import React from 'react';
import {useRouteError, Link} from "react-router-dom";

function ErrorPage() {
const error = useRouteError ();
console.log('error :>> ', error);
  return (
    <>
    <h2>well errors happen. sorry it's nothing to see here...</h2>
    <Link to={"/"} >go back</Link>
    </>
  )
}

export default ErrorPage