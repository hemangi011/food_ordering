import React,{useEffect,useState} from 'react'
import Navbar from '../units/NavigationBar'
import Footer from '../units/Footer'
import Card from '../units/Card'
import Carousel from '../units/Carousel'

export default function HomePage() {

    const[search,setSearch] = useState('');
    const [foodCat,setFoodCat] = useState([]);  //array to store food categories
    const [foodItem, setfoodItem] = useState([]);   

    const loadData = async()=>{
        let response = await fetch("http://localhost:5000/api/foodData",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            }
        });
        response = await  response.json();
        setfoodItem(response[0]);
        setFoodCat(response[1]);
    }
    useEffect(() => {
            loadData()
    },[])
    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id ='carousel'>
                <div className="carousel-caption" style={{zIndex:"10"}}>
                        <div className="d-flex justify-center ">
                            <input className="form-control me-2" type="search" placeholder="Search Food Item" aria-label="Search" value ={search} onChange={(e)=>{setSearch(e.target.value)}} />
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit" >Search</button> */}
                        </div>
                    </div>
                    
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
            <div className='container'>
                {
                    foodCat !== []
                    ?foodCat.map((data)=>{
                        return(
                        <div className='row mb-3'>
                            <div key={data.id} className='="fs=-3 m-3'>
                            {data.CategoryName}
                            </div>
                            <hr/>
                            {foodItem !== []
                            ? 
                            foodItem.filter((item)=>(item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                            .map(filterItems=>{
                                return(
                                    <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                                        <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                                    </div>
                                )
                            }
                        ):<div>No such Data Found</div>}
                            </div>)
                        
                    })
                    : ""
                }
            
            </div>
            <div><Footer /></div>
        </div>
    )
}
