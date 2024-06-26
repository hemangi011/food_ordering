import React, { useRef, useState, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
import { useNavigate } from 'react-router-dom'

export default function Card(props) {
    let data = useCart();
    let navigate = useNavigate();
    let dispatch = useDispatchCart();
    let options = props.options;
    let cost_choice = Object.keys(options);
    let foodItem = props.item;

    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const handleAddtoCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;

                break;
            }
        }
        console.log(food)
        console.log(new Date())
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    }
    const handleClick = () => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
    }
    const handleQty = (e) => {
        setQty(e.target.value);
    }
    const handleOptions = (e) => {
        setSize(e.target.value);
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>

            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title" style={{ color: "black" }}>{props.foodName}</h5>
                        <div className='container w-100'>
                            <select className='m-2 h-150 bg-primary rounded' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            {/* <select className='m-2 h-100 bg-primary rounded' onChange={(e) => setSize(e.target.value)}>
                                {cost_choice.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select> */}
                            <select className="m-2 h-100 w-20 bg-primary text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
                                {cost_choice.map((i) => {
                                    return <option key={i} value={i}>{i}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice}/-
                            </div>
                            <hr>

                            </hr>
                            <button className={'btn btn-primary justify-center ms-2'} onClick={handleAddtoCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
