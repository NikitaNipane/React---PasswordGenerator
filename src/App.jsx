import { useState , useCallback ,useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [Length, setLength] = useState(8)
  const [NumberAllowed , setNumberallowed] =useState(false)
  const [CharAllowed , setCharallowed] =useState(false)
  const [Password , setPassword] = useState("")

  const PasswordRef = useRef(null)

  const PasswordGenerator = useCallback (() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (NumberAllowed) str += "0123456789"
    if (CharAllowed) str+= "@#$&*"

    for (let i =1;i<=Length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char);

      setPassword (pass)
    }
 
  }, [Length,NumberAllowed,CharAllowed,setPassword])

  const copyPasswordtoClipboard =useCallback(() => {
    PasswordRef.current?.select();
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(() => {
    PasswordGenerator()
  }, [Length,NumberAllowed,CharAllowed,PasswordGenerator]
)

  

  return (
    <>
     
     <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-8 my-5 text-orange-400 bg-gray-800'> 
     <h2 className='text-4xl text-center text-white pb-5'>Pasword Generator</h2>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type="text"
        value={Password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={PasswordRef}/>
        <button 
        onClick={copyPasswordtoClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-4'>
        <div className='flex items-center gap-x-1 '>
          <input type="range" 
          min={6}
          max={100}
          value={Length}
          className='cursor-pointer'
          onChange={(e) => {
            setLength(e.target.value)
          }} />
          <label>Length :{Length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked={NumberAllowed} 
           id='numberInput'
           onChange={() => {
            setNumberallowed((prev) => !prev);
           }}
           />
           <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
           type="checkbox"
           defaultChecked={CharAllowed}
           id="characterInput"
           onChange={() => {
            setCharallowed((prev) =>!prev)
           }}
           />
           <label htmlFor='charInput'>Characters</label>
        </div>
      </div>
      </div>
     
    </>
  )
}

export default App
