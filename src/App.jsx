import React,{useState, useRef, useEffect} from 'react'
import Inputdisplay from './Inputdisplay';
const App = () => {
  const [inputText, setInputText] = useState([]);
  const [anyTextPresent, setAnyTextPresent] = useState(false);
  const [popup, setpopup] = useState(false);
  
  const [clickedID, setClickedID ] = useState(false);
  const inputRef = useRef();
  const popupRef = useRef();
//   useEffect(()=>{
//     const handleClickEvent = (event) =>{
//       if(popupRef.current && !popupRef.current.contains(event.target)){
//         setpopup(false);
//       }
//     }
//        if(popup){
//         document.addEventListener('mousedown', handleClickEvent);
//        }

// },[popup])
useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setpopup(false);
        console.log('popup false');
      }
      // console.log('Event target element ',event.target);
      // console.log('Pop Ref current ',popupRef.current);
      // console.log('contains : ',!popupRef.current.contains(event.target));
      
    };
    console.log('Inside useEffect ');

    // if (popup) {
      
    // }
    document.addEventListener('mousedown', handleClickOutside);
      console.log('Event added ');

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popup]);

  const handleEnterPress = (e) =>{
    if(e.key === 'Enter'){
     
    let text = e.target.value;
    const newEntry = {
      id: Date.now() + Math.random(), // Or use uuidv4()
      value: text,
    };

    
    // console.log('on Enter ', text);
    setInputText((prev)=>{
      const updated = [...prev,newEntry];
      if(updated.length > 0){
          setAnyTextPresent(true);
      }
      return updated;
    });
    inputRef.current.value = '';
    console.log('Input ',inputText);
    }
  }
  // const handleUserChange = (e)=>{
  //     console.log(e.target.values);
  // }
  const handleOnClick = (e,id)=>{
   console.log('ID mil gyi bhai ',id);
   setClickedID(id);
    setpopup(true);
  }
  return (
    <div className='app' >
      <div className='body'>
        <input ref={inputRef} className='input'  onKeyDown={(e)=>handleEnterPress(e)}/>
       {
        anyTextPresent && inputText.map((input)=>(
          <>
          <div key={input.id} onClick={(e)=>handleOnClick(e,input.id)}>
            <Inputdisplay   input={input}/>
          </div>
          </>
        ))
       }
      </div>
      {popup &&  <div className='popup' >
          <div className='popup-body' ref={popupRef}>
            {
               (() => {
                   const matched = inputText.find((obj) => obj.id === clickedID);
                    return matched && matched.value 
               })()
            }
          </div>
            

      </div>}
      
    </div>
  )
}

export default App
