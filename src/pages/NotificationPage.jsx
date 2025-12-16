import { BadgeCheckIcon, BellRingIcon, Mail, MailOpen } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { api } from "../api/api";
import { Badge } from "@/components/ui/badge";
import { AuthContext } from "@/context/AuthenticationContext";
import { toast } from "sonner";
import CheckOutPage from "./CheckOutPage";
import { NotificationContext } from "@/context/NotificationContext";

function NotificatonPage() {
    const { notification, getNotifications } = useContext(NotificationContext);
    const hasUnread = notification?.some(n => !n.is_read);



    const { role } = useContext(AuthContext)


    async function markAllAsRead() {

        try {

            await api.patch("/api/notifications/read-all")
            toast.success("Notification readed ")
            getNotifications()


        } catch (error) {



        }

    }

    async function MarkAsRead(notifID) {

        try {

            await api.patch(`/api/notifications/${notifID}/read`)
            toast.success("Marked as read");
            getNotifications();

        } catch (error) {



        }


    }


    return (
        <>
            <Navbar />

            <div className="mt-24 px-4 sm:px-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-gray-800">
                        Your Notifications
                        <BellRingIcon size={26} className="text-gray-700" />
                    </h2>

                    <Badge
                        onClick={hasUnread ? markAllAsRead : undefined}
                        variant="secondary"
                        className={`text-white dark:bg-black py-1 flex gap-2
    ${hasUnread ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                    >
                        Mark all as read <BadgeCheckIcon size={14} />
                    </Badge>
                </div>

                {/* Notification List */}
                <div className="mt-4 flex flex-col gap-4">
                    {notification.map((notifs) => (
                        <div
                            key={notifs.id}
                            className={`w-full px-5 py-4 sm:px-8 sm:py-5 rounded-3xl flex flex-col gap-2 notif-cont 
            group border border-gray-200 
            ${notifs.is_read ? "bg-gray-50" : "bg-white"}`}
                        >
                            {/* Title */}
                            <p className="text-lg sm:text-xl font-bold flex gap-2 items-center">
                                {notifs.is_read ? (
                                    <MailOpen size={20} strokeWidth={2.5} />
                                ) : (
                                    <Mail size={20} strokeWidth={2.5} />
                                )}
                                {notifs.title}
                            </p>

                            {/* Message */}
                            <p className="text-base sm:text-md text-gray-600">
                                {notifs.message}
                            </p>

                            {/* Date */}
                            <p className="text-xs sm:text-sm text-gray-500">
                                {new Date(notifs.date).toLocaleString()}
                            </p>

                            {/* Button */}
                            {!notifs.is_read ? (
                                <button
                                    onClick={() => MarkAsRead(notifs.id)}
                                    className="self-start mt-2 px-4 py-1 bg-black text-white rounded-md text-sm 
              font-medium transition-all hover:bg-gray-800 active:scale-95"
                                >
                                    Mark as Read
                                </button>
                            ) : (
                                <span className="self-start mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium flex items-center gap-1">
                                    <BadgeCheckIcon size={14} /> Read
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}

export default NotificatonPage;
