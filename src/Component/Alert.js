import React from 'react'

const Alert = (props) => {
    console.log(props)
    return (
        <div>
<div className="alert alert-danger" role="alert">
  {props.errorMsg}
</div>
</div>
    )
}

export default Alert
