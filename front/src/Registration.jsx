import React from 'react'

const Registration = () => {
    const alerting = ()=>{
        fetch('http://localhost:8080/alert')
                    .then((response)=>response.json())
                    .then((data)=>{
                        console.log(JSON.stringify(data.message))
                    })
                    .catch((error)=>{
                      alert(error)
                    })
    }

  return (
  <>
    
<h1>Signup</h1>

<button onClick={alerting}>Btn</button>
    </>
  )
}

export default Registration