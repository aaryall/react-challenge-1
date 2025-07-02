import React from 'react'

const Inputdisplay = ({input}) => {
//    if(text.length > 6){
//       text = String(text).substring(0,5)+'...';
//     } 
console.log('Key ',input);
  return (
    <div>
      {input.value.length > 6? String(input.value).substring(0,5)+'...' : input.value}
    </div>
  )
}

export default Inputdisplay
