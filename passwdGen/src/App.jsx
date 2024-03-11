import { useState,useCallback,useEffect,useRef } from "react"
 

function App() {
 
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");
  const passwordRef = useRef(null);

  let passwordGenerator = useCallback(()=>{

    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let num="0123456789"
    let specialChar="!@#$%^&*-+[]<>/?|_="

    if(numberAllowed)
    {
      const randomNumIndex = Math.floor(Math.random() * 10);
      //expand available character set to include nums
      str += num;
      //ensure atleaset one num
      pass+= num.charAt(randomNumIndex);
    } 

    if(charAllowed)
    {
      const randomCharIndex = Math.floor(Math.random * 10);
      //expand available character set to include special chars
      str += specialChar;
      //ensure atleaset one num
      pass+= num.charAt(randomCharIndex);
    } 
      

    console.log(str);
    for(let i=0;i<length;i++)
    {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    //lastly shuffle the final value
    pass = pass.split('').sort(() => 0.5 - Math.random()).join('')
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword]);

  const copyPassToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])
 

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator]);

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
  
      <h1 className="text-4xl text-center text-white my-4">
      Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder="password" readOnly ref={passwordRef}/>
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
         onClick={copyPassToClipBoard}>
          copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
              <input type="range" min={6} max={100} value={length} className="cursor-pointer"
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label> Length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"
              onChange={()=>{
                setNumberAllowed((prev)=>!prev);
              }}
              />
              <label> Numbers </label>
          </div>

          <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={charAllowed} id="characterInput"
              onChange={()=>{
                setCharAllowed((prev)=>!prev);
              }}
              />
              <label> Characters </label>
          </div>

      </div>
    </div>

   
      
    </>
  )
}

export default App
