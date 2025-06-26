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
                            <p>{singleProduct.price}</p>
                            <p>{singleProduct.dose}</p>
                            <p>{singleProduct.total}</p>
                            <p>{singleProduct.quantity}</p>
                            <p>{singleProduct.strain}</p>
                            <p>{singleProduct.potency}</p>
                            <p>{singleProduct.flavor}</p>
                            <p className='description'>{singleProduct.description}</p>
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
                        <ReviewForm/>
                    ) : (
                        <p>Please log in to submit a review.</p>
                    )}
                    </div>
                </div>
            </>
    )
}

export default SingleProduct