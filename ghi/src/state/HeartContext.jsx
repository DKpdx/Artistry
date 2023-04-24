import React, {createContext, useContext, useReducer} from "react";
import heartempty from "../assets/heartempty.png";

const emptyHeart = heartempty;

let initialState = {
  heart: emptyHeart
}

const HeartContext = createContext()

const HeartContextProvider = (props) => {
  const reducer = (state, action) => {
    switch(action.type) {
      case "LIKE":
        return{...state, heart: state.heart}
      default:
        return state
    }
  }

const [state, dispatch] = useReducer(reducer, initialState)

return (
  <HeartContext.Provider value={{state, dispatch}}>
    {props.children}
  </HeartContext.Provider>
)

}
export {HeartContextProvider}
export default HeartContext
