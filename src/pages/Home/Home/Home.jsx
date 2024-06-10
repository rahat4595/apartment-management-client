import { useState, useEffect } from "react";
import 'animate.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../../node_modules/swiper/swiper-bundle.min.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Aos from "aos";
import 'aos/dist/aos.css'
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Banner from "../Banner/Banner";

const Home = () => {
    
    const axiosPublic = useAxiosPublic();
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

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
            <div className="max-w-7xl mx-auto mt-10 px-4 animate__animated animate__bounceIn">
                <h2 className="text-4xl font-bold text-center">Explore Apartments</h2>
                <p className="text-center text-lg my-10 px-5 lg:px-52">
                Discover your ideal apartment and find inspiration for your next move. Explore a variety of apartments and get inspired to elevate your living experience.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 animate__animated animate__slideInLeft">
                <Banner />
            </div>

            <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 bg-gray-100 rounded-lg">
                <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center mb-10">About the Building</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Introduction and History</h3>
                        <p className="text-lg text-gray-500 mb-6">
                            Our building, established in 1995, stands as a landmark in the downtown area. Designed by renowned architect Mark Rober, it features a blend of modern and classical architectural elements.
                        </p>
                        <img src="https://i.ibb.co/dB8TJQr/pexels-nicolae-casir-56591-205078.jpg  " alt="Building History" className="w-full h-auto rounded-lg shadow-lg mb-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Architectural Details</h3>
                        <p className="text-lg text-gray-500 mb-6">
                            The building showcases a sleek glass façade, high ceilings, and a grand lobby adorned with marble finishes. Each unit is designed with large windows, providing ample natural light and stunning views.
                        </p>
                        <img src="https://i.ibb.co/MSwMNNS/pexels-wdnet-565324.jpg" alt="Architectural Details" className="w-full h-auto rounded-lg shadow-lg mb-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Building Features and Amenities</h3>
                        <p className="text-lg text-gray-500 mb-6">
                            Residents enjoy access to a state-of-the-art fitness center, rooftop garden, swimming pool, and a secure underground parking garage.Where they can keep there car without any worries 
                        </p>
                        <img src="https://i.ibb.co/Dk6th9Q/pexels-minan1398-1006087.jpg" alt="Building Features" className="w-full h-auto rounded-lg shadow-lg mb-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainability and Environmental Features</h3>
                        <p className="text-lg text-gray-500 mb-6">
                            Our building is LEED certified, incorporating energy-efficient systems, water-saving fixtures, and green building materials to minimize its environmental impact.
                        </p>
                        <img src="https://i.ibb.co/Mnp8SyN/pexels-liene-ratniece-570596-1329510-1.jpg" alt="Sustainability Features" className="w-full h-auto rounded-lg shadow-lg mb-6" />
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 ">
                <div className="animate__animated animate__zoomIn">
                <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center mb-10">Available Coupons</h2>
                <p className="text-center text-lg my-10 px-5 lg:px-52">
                    Get the coupons now before they expire and get your desired discount on our apartments.
                </p>
                </div>
                <div className="flex justify-center" data-aos="zoom-in">
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

            <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 bg-gray-100 rounded-lg">
                <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center mb-10">Our Location</h2>
                <div className="lg:flex lg:items-center lg:justify-center">
                    <div className="lg:w-1/2">
                        <MapContainer center={[23.6780, 90.8281]} zoom={13} scrollWheelZoom={false} className="w-full h-96 rounded-lg shadow-lg">
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[23.6780, 90.8281]}>
                                <Popup>
                                    Homna Upazila, Cumilla, Bangladesh
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <div className="lg:w-1/2 lg:pl-10 mt-10 lg:mt-0">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Location & Directions</h3>
                        <p className="mt-2 text-base text-gray-500">
                            Our apartment is located in Homna Upazila, Cumilla, offering convenient access to major attractions and amenities. To reach us:
                        </p>
                        <ul className="mt-4 list-disc list-inside text-gray-500">
                            <li>By Car: Easy access via main highways with ample parking available.</li>
                            <li>By Public Transport: Multiple bus and subway lines stop nearby.</li>
                            <li>By Foot: Located within walking distance of popular shopping and dining areas.</li>
                        </ul>
                        <p className="mt-4 text-base text-gray-500">
                            For detailed directions or any assistance, feel free to contact our support team.
                        </p>
                    </div>
                </div>
            </section>

           
        </div>
    );
};

export default Home;
