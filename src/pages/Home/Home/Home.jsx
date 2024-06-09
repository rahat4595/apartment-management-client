import useCart from "../../../hooks/useCart";
import Banner from "../Banner/Banner";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../../node_modules/swiper/swiper-bundle.min.css';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Swal from "sweetalert2";

const Home = () => {
    const [apart] = useCart();
    const axiosPublic = useAxiosPublic();
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        // Fetch coupons from the server
        axiosPublic.get('/coupons')
            .then(res => {
                setCoupons(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [axiosPublic]);

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Copied!',
                    text: `Coupon code ${code} has been copied to clipboard.`,
                    timer: 1500,
                    showConfirmButton: false
                });
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to copy the coupon code.',
                    timer: 1500,
                    showConfirmButton: false
                });
            });
    };

    return (
        <div>
            <div className="max-w-7xl mx-auto mt-10 px-4">
                <h2 className="text-4xl font-bold text-center">Explore Apartments: {apart.length}</h2>
                <p className="text-center text-lg mt-10 px-5 lg:px-52">
                    Explore your favourite arts and crafts categories and get yourself a inspiration to go beyond about artisticts
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <Banner />
            </div>

            <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About the Building</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Discover Our Building
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Learn about the rich history, unique architecture, and exceptional amenities of our building.
                    </p>
                </div>
                <div className="mt-10">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                        <div className="mb-10 lg:mb-0">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Introduction and History</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Our building, established in 1995, stands as a landmark in the downtown area. Designed by renowned architect Jane Doe, it features a blend of modern and classical architectural elements.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Architectural Details</h3>
                            <p className="mt-2 text-base text-gray-500">
                                The building showcases a sleek glass façade, high ceilings, and a grand lobby adorned with marble finishes. Each unit is designed with large windows, providing ample natural light and stunning views.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 lg:grid lg:grid-cols-2 lg:gap-8">
                        <div className="mb-10 lg:mb-0">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Building Features and Amenities</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Residents enjoy access to a state-of-the-art fitness center, rooftop garden, swimming pool, and a secure underground parking garage.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Sustainability and Environmental Features</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Our building is LEED certified, incorporating energy-efficient systems, water-saving fixtures, and green building materials to minimize its environmental impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8">
                <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center mb-10">Available Coupons</h2>
                <div className="flex justify-center">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        navigation
                        
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        loop={true}
                    >
                        {coupons.map(coupon => (
                            <SwiperSlide key={coupon._id} className="flex justify-center">
                                <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs text-center">
                                    <h3 className="text-lg font-bold text-[#ff5a3c]">{coupon.code}</h3>
                                    <p className="text-gray-700 mt-2">{coupon.description}</p>
                                    <p className="text-gray-900 mt-4 font-semibold">{coupon.discount}% Off</p>
                                    <button onClick={() => handleCopyCode(coupon.code)} className="text-xl font-semibold px-4 py-2 bg-[#ff5a3c] text-white rounded-md mt-10 relative overflow-hidden group">
                                    <span className="absolute inset-0 bg-black transition-all duration-500 ease-out transform scale-x-0 origin-center group-hover:scale-x-100"></span>
                                    <span className="relative z-10">Copy Coupon</span>
                                </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </div>
    );
};

export default Home;
