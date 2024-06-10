
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useApart = () => {
    // const [apartments, setApartments] = useState([]);
    const axiosPublic = useAxiosPublic();

    
    const {refetch, data: apartment=[]} = useQuery({
        queryKey:['apart'],
        queryFn: async() =>{
            const res = await axiosPublic.get(`/apartment`)
            return res.data
        }
    });
    return [apartment, refetch]

};

export default useApart;








// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";


// const useApart = () => {
//     // const [apartment, setApartment] = useState([]);


//     const axiosPublic = useAxiosPublic();
//     // useEffect(() => {
//     //     fetch('https://building-management-server-one.vercel.app/apartment')
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