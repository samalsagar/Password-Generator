import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);

  const [numberAllowed, setNumberAllowed] = useState(false);

  const [charsAllowed, setCharsAllowed] = useState(false);

  const [password, setPassword] = useState("");

  //useRef Hook 
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=> {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) {
      str+= "1234567890";
    }
    if(charsAllowed){
      str+="~!@#$%^&*{}[]/|()";
    }

    for (let index = 1; index <= length; index++) {
       let char = Math.floor(Math.random() * str.length + 1);
       pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charsAllowed, setPassword])

  const copyClipBoard = useCallback(()=> {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(()=> passwordGenerator(), [length, numberAllowed, charsAllowed, passwordGenerator])
  return (
    <>

      <div className='w-full max-w-lg mx-auto text-white bg-gray-700 p-4 my-8 rounded-md'>
        <div>Password Generator</div>
        <div className='flex justify-center rounded mt-2'>
          <input type="text"
            className='outline-none rounded-s-md text-orange-600 px-3 py-1 w-full cursor-pointer'
            placeholder='Password'
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyClipBoard}
          className='outline-none rounded-e-md text-white px-3 py-1 bg-blue-600'>Copy</button>
        </div>

        <div className='flex mt-2 gap-x-3 '>
          <div className='flex text-orange-600'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>setLength(e.target.value)}
            />
            <label htmlFor="" className='text-orange-700'>Length: {length}</label>
          </div>
          <div>
            <input 
            type="checkbox"
            defaultChecked = {numberAllowed}
            onChange={()=> {
              setNumberAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="" className='text-orange-700'>Add Numbers</label>
          </div>
          <div>
            <input type="checkbox" 
            defaultChecked = {charsAllowed}
              onChange={()=> {
                setCharsAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="" className='text-orange-700'>Add Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
