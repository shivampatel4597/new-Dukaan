import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Hoc(Component) {

    function ComponentWithRouterProp(props){
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router= {{navigate, params}} />

    }
  return ComponentWithRouterProp
  
  
}

export default Hoc