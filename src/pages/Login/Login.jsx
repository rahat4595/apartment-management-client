import { useContext, useState } from "react";
import { AuthContext } from "../../providers/Context";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast } from 'react-toastify';



const Login = () => {


    const { signIn, signInWithGoogle,  } = useContext(AuthContext);

    
    const [loginError, setLoginError] = useState('');

    const location = useLocation();

    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    const handleLogin = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const email = form.get('email')
        const password = form.get('password')
        console.log(email, password);

        setLoginError('')

        // login existing user
        signIn(email, password)
            .then(result => {
                console.log(result.user)
                toast.success('Logged in Successfully!')
                // Reset form field after login
                e.target.reset();

                // After login go to clicked state otherwish go to home page
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                setLoginError('Please check your Email or Password again')
            })

    }

    
    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                toast.success('Logged in Successfully!')
                // After Google login go to clicked state otherwish go to home page
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
            })

           
    }

    //   github login
    // const handleGithubLogin = () => {
    //     githubLogin()
    //         .then(result => {
    //             console.log(result.user);
    //             toast.success('Logged in Successfully!')
    //             //  Go to Home page after github Login
    //             navigate(location?.state ? location.state : '/');
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // }


    return (
        <section className="flex flex-col md:flex-row justify-center md:space-x-24 items-center my-2 mx-5  md:mx-0 md:my-14">
           
            <div className="lg:w-1/3 md:w-80 hidden md:block lg:block w-72 max-w-sm text-center md:mt-9">
                <img src="https://i.ibb.co/44WLfYh/mobile-login-concept-illustration-114360-83.jpg" alt="" />
            </div>
            <div className="md:w-1/3 max-w-sm text-center md:mt-9">
                <div>
                    <i><h1 className="lg:text-3xl text-2xl text-red-800 font-bold md:mb-4 mb-2 lg:mb-6">Please Login Now!</h1></i>
                    <label className="mr-1 text-xl lg:text-2xl font-bold lg:font-semibold">Sign in with</label>

                    <button className="lg:mx-4 mx-2 h-8 w-8 rounded-full">
                        <FcGoogle onClick={handleGoogleLogin} size={30} className="flex -mb-1 justify-center items-center w-full" /></button>

                    <button className="lg:mx-4 mx-2 h-8 w-8 rounded-full">
                        <FaGithub  size={30} className="flex -mb-1 justify-center items-center w-full" /></button>
                </div>

                <div className="my-8 flex text-center border-b-2 border-dashed border-y-2 border-slate-300">
                    <p className="mx-auto text-2xl font-semibold text-black"><i>Or</i></p>
                </div>
                <form onSubmit={handleLogin}>
                    <input className="text-lg font-semibold w-full px-4 py-2 border border-gray-400 rounded" type="email" name="email" placeholder="Email Address" required />

                    <div className="relative mt-4">
                        <input className="text-lg font-semibold w-full px-4 py-2 border border-gray-400 rounded" type='password' name="password" placeholder="Password" />

                        
                    </div>

                    <div className="md:mt-5 mt-6 flex gap-2 items-center justify-between font-semibold">
                        <p className="flex text-slate-900">
                            <input className="mr-2" type="checkbox" />
                            <span className="text-base md:text-sm lg:text-lg">Remember Me</span>
                        </p>
                        <a className="text-blue-600 lg:text-lg text-base hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
                    </div>

                    {
                        loginError && <p className='lg:text-xl text-lg font-bold text-center lg:pt-6 pt-4 lg:pb-2 text-red-600'>{loginError}</p>
                    }
                    <div className="text-center">
                        <input className="mt-4 bg-blue-600 hover:bg-blue-700 px-2 py-1 lg:px-4 lg:py-2 text-white rounded text-lg font-semibold" type="submit" name="submit" value="Login to your account" />
                    </div>
                </form>

                <div className="mt-4 mb-4 font-semibold lg:text-xl text-base text-slate-800 text-center"><i>Don&apos;t have an account?</i>{" "}
                    <a className="text-blue-600 hover:underline hover:underline-offset-4" href="/signin">Sign Up</a>
                </div>
            </div>
        </section>
    );
};

export default Login;