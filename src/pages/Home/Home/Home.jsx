import useCart from "../../../hooks/useCart";
import Banner from "../Banner/Banner";

const Home = () => {
    const [apart] = useCart();
    return (
        <div>
        
        <div className="max-w-7xl mx-auto mt-10">
             
                    <h2 className="text-4xl font-bold text-center ">Explore Apartments:{apart.length}</h2>
                    <p className="text-center text-lg mt-10 px-5 lg:px-52">Explore your favourite arts and crafts categories and get yourself a inspiration to go beyond about artisticts</p>
      
            </div>

           <div className="max-w-7xl mx-auto">
           <Banner></Banner>
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
                        <div>
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
                        <div>
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
        </div>
    );
};

export default Home;