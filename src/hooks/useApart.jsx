import { useState, useEffect } from "react";

const useApart = () => {
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        
        const fetchApartments = async () => {
            const response = await fetch("http://localhost:5000/apartment"); 
            const data = await response.json();
            setApartments(data);
        };

        fetchApartments();
    }, []);

    return apartments;
};

export default useApart;








// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";


// const useApart = () => {
//     // const [apartment, setApartment] = useState([]);


//     const axiosPublic = useAxiosPublic();
//     // useEffect(() => {
//     //     fetch('http://localhost:5000/apartment')
//     //         .then(res => res.json())
//     //         .then(data => {
//     //             setApartment(data);
//     //             setLoading(false);
//     //         });
//     // }, [])

//     const {data: apartment = [], isPending: loading, refetch} = useQuery({
//         queryKey: ['apartment'], 
//         queryFn: async() =>{
//             const res = await axiosPublic.get('/apartment');
//             return res.data;
//         }
//     })

//     return [apartment, loading, refetch]
// };

// export default useApart;