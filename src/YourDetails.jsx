import { User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const YourDetails = () => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-row'>
            <SideBar />
            <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-6">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                        User Profile
                    </h1>

                    {/* Name Display */}
                    <div className="flex items-center space-x-3 mb-5 p-3 bg-gray-50 rounded-lg">
                        <User className="h-5 w-5 text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{localStorage.getItem("userFullName")}</p>
                        </div>
                    </div>

                    {/* Email Display */}
                    <div className="flex items-center space-x-3 mb-5 p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{localStorage.getItem("userEmail")}</p>
                        </div>
                    </div>

                    {/* Password Display */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Lock className="h-5 w-5 text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">Password</p>
                            <p className="font-mono">{localStorage.getItem("userPassword")}</p>
                        </div>
                    </div>
                    <div>
                        <button className="border border-slate-500 w-full bg-blue-500 rounded-md py-1 hover:text-slate-900 hover:bg-blue-600 my-2"
                            onClick={() => navigate("/home")}>
                            Go to Home &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YourDetails;