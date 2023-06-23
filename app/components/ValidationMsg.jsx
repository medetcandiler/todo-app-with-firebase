import React from 'react'

function ValidationMsg() {
  const style = {
    error: `text-center text-red-600 my-1`
  }
  
  return (
    <div className={style.error}>
      <h3>Please enter a valid todo</h3>
    </div>
  )
}

export default ValidationMsg
