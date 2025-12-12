

export default function CancelModal({ isOpen, onClose, onConfirm, reason, setReason }) {
    if (!isOpen) return null;

    const reasons = [
        "Ordered by mistake",
        "Found a better price",
        "Delivery is too late",
        "Changed my mind",
        "Want to update size / address",
        "Other"
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px]  bg-opacity-40 z-50 px-4">
            <div className="bg-white w-full max-w-md sm:max-w-lg p-6 rounded-xl shadow-xl">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
                    Why do you want to cancel this order?
                </h2>

                <div className="space-y-3">
                    {reasons.map((r, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer text-sm sm:text-base">
                            <input
                                type="radio"
                                name="reason"
                                value={r}
                                checked={reason === r}
                                onChange={(e) => setReason(e.target.value)}
                                className="cursor-pointer"
                            />
                            <span className="text-gray-700">{r}</span>
                        </label>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-3 py-2 font-semibold text-sm rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100 w-full sm:w-auto"
                    >
                        Close
                    </button>

                    <button
                        disabled={!reason}
                        onClick={onConfirm}
                        className={`px-3 py-2 rounded-lg text-white font-semibold text-sm w-full sm:w-auto
                            ${reason ? "bg-black hover:bg-gray-700" : "bg-gray-300 cursor-not-allowed"}`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
