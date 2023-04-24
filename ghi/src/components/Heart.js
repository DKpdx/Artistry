import React, { useState, useContext} from "react"
import HeartContext from "../state/HeartContext"
import heartempty from '../assets/heartempty.png';

const Heart = () => {
  const [heart, setHeart] = useState('')
  const {state} = (HeartContext)
  const {dispatch} = useContext(HeartContext)

  const like = () => dispatch({type: "LIKE"})
  const unlike = () => console.log('unlike')
  const changeHeart = (e) => setHeart(e.target.value)
  const handleHeartClick = (e) => {
    e.preventDefault();
    console.log("Heart Clicked");
  }

  return (
    <div>
      <div className="flex items-center space-x-1">
        <button onClick={handleHeartClick}>
            <img src={heartempty} alt='heart' />
          </button>
      </div>
    </div>
  )
}
export default Heart
