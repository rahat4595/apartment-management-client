import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../../assets/home/49.jpg';
import img2 from '../../../assets/home/46.jpg';
import img3 from '../../../assets/home/45.jpg';
import img4 from '../../../assets/home/pexels-pixabay-276724 (1).jpg';
import img5 from '../../../assets/home/47.jpg';
import img6 from '../../../assets/home/48.jpg';

const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src={img1} />
            </div>
            <div>
                <img src={img2} />
            </div>
            <div>
                <img src={img3} />
            </div>
            <div>
                <img src={img4} />
            </div>
            <div>
                <img src={img5} />
            </div>
            <div>
                <img src={img6} />
            </div>
        </Carousel>
    );
};

export default Banner;