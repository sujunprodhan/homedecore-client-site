import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, signInGoogle, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

 const handleRegister = async (data) => {
   const profileImage = data.image?.[0];

   try {
     // 1️⃣ Firebase user create
     const result = await createUser(data.email, data.password);
     const user = result.user;

     // 2️⃣ Upload image to imgbb
     const formData = new FormData();
     formData.append('image', profileImage);

     const imageApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_API}`;

     const imageRes = await axios.post(imageApi, formData);
     const photoURL = imageRes.data.data.url;

     await updateUserProfile({
       displayName: data.name,
       photoURL,
     });
     const userInfo = {
       name: data.name,
       email: data.email,
       photoURL,
     };

     await axios.post('http://localhost:3000/users', userInfo);

     toast.success('Registration successful!');
     navigate('/login');
   } catch (error) {
     console.error(error);
     toast.error(error.message);
   }
 };


  const handleSignInGoogle = async () => {
    try {
      const result = await signInGoogle();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      await axios.post('http://localhost:3000/users', userInfo);

      toast.success('Logged in with Google!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 mt-2 mb-8">
          Join <span className="text-[#E92C8F] font-semibold">Home Decore</span> today
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E92C8F]"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Profile Image</label>
            <input
              {...register('image', { required: 'Image is required' })}
              type="file"
              accept="image/*"
              className="w-full"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E92C8F]"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message:
                      'Password must include uppercase, lowercase, number & special character',
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E92C8F]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#E92C8F]"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#E92C8F] text-white font-semibold rounded-lg hover:bg-[#d92381] transition"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleSignInGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 border rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <span className="text-[#E92C8F] cursor-pointer ml-1">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
