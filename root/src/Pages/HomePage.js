import React,{useEffect,useState} from 'react'
import Navbar from '../units/NavigationBar'
import Footer from '../units/Footer'
import Card from '../units/Card'
import Carousel from '../units/Carousel'

export default function HomePage() {

    return (
        <div >
            <div><Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner" id ='carousel'>
                        
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?sandwich" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?fruitbowl" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?bread" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    
                </div></div>
                <div><Footer /></div>
        </div>
    )
}
