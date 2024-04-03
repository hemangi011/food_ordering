import React, { useEffect, useState } from 'react'
import Footer from '../units/Footer';
import Navbar from '../units/NavigationBar';


export default function MyOrder() {

    const [orderData, setorderData] = useState("")
    

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        try {
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const responseData = await response.json();
            setorderData(responseData.orderData); // Assuming responseData has orderData field
        } catch (error) {
            console.error('Error fetching orders:', error);
        }

    }

    useEffect(() => {
        fetchMyOrder()
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData && orderData.order_data && orderData.order_data.length > 0 ? orderData.order_data.map((order, orderIndex) => {
                        return (
                            <div key={orderIndex}>
                                <div className='m-auto mt-5'>
                                    {order[1]} {/* Display the order date */}
                                    <hr />
                                </div>
                                {order[0] && order[0].length > 0 && order[0].map((arrayData, arrayIndex) => {
                                    return (
                                        <div key={arrayIndex} className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{arrayData.qty}</span>
                                                        <span className='m-1'>{arrayData.size}</span>
                                                        <span className='m-1'>{order[1]}</span> {/* Display the order date */}
                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                            ₹{arrayData.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </div>
    )
}
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}