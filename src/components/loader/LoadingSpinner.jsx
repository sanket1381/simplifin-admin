import React from "react";
const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] h-fit my-auto bg-opacity-30 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#5337FF]"></div>
        </div>
    );
};
export default LoadingSpinner;
