import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleProduct } from "../api/index.js";
import Reviews from "./reviews/reviews.jsx";
import ReviewForm from "./reviews/reviewForm.jsx";

const SingleProduct = ({ singleProduct, setSingleProduct }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const getProductDetailsApi = async() => {
            const response = await getSingleProduct(id);
            setSingleProduct(response);
        }
        getProductDetailsApi();
    }, []);

    return (
        <>
                <div className='product-details-container'>
                    <div key={singleProduct.id}>
                        <h2>{singleProduct.title}</h2>
                            <img 
                                className="single-product-img"
                                src={singleProduct.image_url} 
                            />
                            <p>Quantity: {singleProduct.quantity}</p>
                            <p>Price: ${singleProduct.price}</p>
                            <p>Dose: {singleProduct.dose}</p>
                            <p>Total: {singleProduct.total}</p>
                            <p>Strain: {singleProduct.strain}</p>
                            <p>Potency: {singleProduct.potency}</p>
                            <p>Flavor: {singleProduct.flavor}</p>
                            <p className='description'>Description: {singleProduct.description}</p>
                            <button 
                                className='back-button'
                                onClick={() => navigate(-1)}>
                                Return to Product List
                            </button>
                    </div>
                    
                    <div>
                        <Reviews />
                    </div>

                    <div>
                    {token ? (
                        <ReviewForm productId={id}/>
                    ) : (
                        <p>Please log in to submit a review.</p>
                    )}
                    </div>
                </div>
            </>
    )
}

export default SingleProduct