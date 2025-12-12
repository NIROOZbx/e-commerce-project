import {useEffect, useState } from "react";
import star from "../assets/star.png";


export default function AddressModal({
    show,
    addresses,
    onClose,
    onSelect,
    defaultAddressID
}) {


       const [currentSelected, setCurrentSelected] = useState(defaultAddressID);

       

    useEffect(() => {
        setCurrentSelected(defaultAddressID);
    }, [defaultAddressID]);


    if (!show) return null;


    return (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white w-[800px] max-w-[90%] p-6 rounded-xl shadow-xl relative">

                <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>

                {/* Address List - no scroll, full size */}
                <div className="space-y-4">
                    {addresses.map(addr => (
                        <div
                            key={addr.id}
                            onClick={() => setCurrentSelected(addr.id)}
                            className="border p-4 rounded-lg cursor-pointer hover:bg-gray-100"
                        >
                            <div className="flex items-start gap-2 justify-between w-full">

                                <div className="flex items-start gap-2">
                                    <input type="radio" 
                                    name="address" className="mt-1" checked={currentSelected === addr.id} 
                                    onChange={() =>setCurrentSelected(addr.id)} 
                                    />

                                    <div>
                                        <p className="font-semibold capitalize">{addr.name}</p>
                                        <p className="text-sm text-gray-600">{addr.phone}</p>
                                        <p className="text-sm text-gray-600">
                                            {addr.street_address}, {addr.city}, {addr.state} {addr.zip_code}
                                        </p>
                                    </div>
                                </div>

                                {/* ⭐ Move icon to the end */}
                                {addr.is_default && (
                                    <img className="w-6 h-6" src={star} />
                                )}

                            </div>
                        </div>
                    ))}
                </div>

                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                    onClick={onClose}
                >
                    ❌
                </button>
                <div className="pt-10 flex justify-end">
                    <button className="px-4 py-1 text-sm font-bold text-white bg-black rounded-md "
                    onClick={() => {
                            const selectedAddr = addresses.find(a => a.id === currentSelected);
                            onSelect(selectedAddr); 
                            onClose();
                        }}
                    >SELECT</button>
                </div>
            </div>
        </div>
    );

}
