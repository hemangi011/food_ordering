import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const dispatchCartAction = createContext();
export const CartProvider = ({children}) => {
    const reducer = (state,action)=>{
        switch(action.type){
            case "ADD":
                return[...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}];
                case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr

                default:
                    console.log("Error");
        }

    }
  // State for the cart. 
  const [state,dispatch] = useReducer(reducer,[])
  return(
    <dispatchCartAction.Provider value={dispatch}><CartStateContext.Provider value = {state}>{children}</CartStateContext.Provider></dispatchCartAction.Provider>
  )
}
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = ()=>useContext(dispatchCartAction);