import { Send, X } from "lucide-react";
import { Spinner } from "./ui/spinner";

export default function ReviewModal({
    isOpen,
    onClose,
    onSubmit,
    review,
    setReview,
    loading
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md relative">
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-black"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-4">Leave a Review</h2>

                <textarea
                    placeholder="Leave a review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows="5"
                    className="w-full shadow-md p-4 rounded-lg border"
                ></textarea>

                <button
                    onClick={onSubmit}
                    className="mt-4 w-full bg-black text-white py-2 rounded-lg flex justify-center items-center gap-2 font-semibold"
                >
                   {loading?<span
                    className="flex gap-2 justify-center items-center text-gray-100">
                        Submitting review ... <Spinner/></span>:<span className="flex gap-2 justify-center items-center">Submit <Send size={16} /></span>}
                </button>
            </div>
        </div>
    );
}
