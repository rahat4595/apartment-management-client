import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAnnounc = () => {
    const { register, handleSubmit,reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {

        console.log(data)

        const announcItem = {
            title: data.title,
            announcment: data.announcment,
        }
        const announcRes = await axiosSecure.post('/announcment', announcItem);
        console.log(announcRes.data)
        if(announcRes.data.insertedId){
            // show success popup
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Announcement is made.`,
                showConfirmButton: false,
                timer: 2000
              });
        }
    }
    return (
        <div>
            <h2 className="text-4xl">Make an Announcement</h2>

            <div className="max-w-7xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Title</span>

                        </div>
                        <input type="text"
                            {...register('title', {required: true})}
                            required
                            placeholder="Title"
                            className="input input-bordered w-full " />

                    </label>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Announcment</span>
                           
                        </div>
                        <textarea 
                        {...register('announcment', {required: true})}
                        className="textarea textarea-bordered h-24"
                         placeholder="Announcment"></textarea>
                        
                    </label>


                    <button className="text-xl font-semibold px-5 py-2 bg-[#ff5a3c] text-white rounded-md mt-10 relative overflow-hidden group">
                                    <span className="absolute inset-0 bg-black transition-all duration-300 ease-out transform scale-x-0 origin-center group-hover:scale-x-100"></span>
                                    <span className="relative z-10">Submit</span>
                                </button>
                </form>
            </div>
        </div>
    );
};

export default MakeAnnounc;