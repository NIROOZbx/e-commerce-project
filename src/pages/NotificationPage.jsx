import { BellRingIcon, Mail, MailOpen } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthenticationContext";

function NotificatonPage() {
  const [notification, setNotifications] = useState([]);
  const { currentUserData } = useContext(AuthContext);
  const [hoveredId, setHoveredId] = useState(null);

  const currentUserNotifications=notification.filter(notifs=>notifs.userId===currentUserData.id).sort((a, b) => new Date(b.date) - new Date(a.date))
  // This line sorts the notifications by date, making the newest appear first.

    

    
console.log(currentUserNotifications);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        let { data: res } = await api.get(`/notifications`);
        setNotifications(res);
      } catch (e) {
        console.log("Error in getting data");
      }
    };
    getNotifications()
  }, []);


  return (
    <>
      <Navbar notification={notification}/>
      <div className="mt-25 px-10">
        <h1 data-aos="fade-up" className="flex items-center gap-3 mb-8 text-3xl font-bold text-gray-800">
          Your Notifications <BellRingIcon data-aos="fade-up" className="w-8 h-8 text-gray-700 hover:animate-sway" />
        </h1>

        <div>
            {currentUserNotifications.map(notifs=>(
            <div data-aos="fade-up" key={notifs.id} className="px-8 py-5 rounded-3xl flex flex-col gap-2 notif-cont mt-4 group"
             onMouseOver={() => setHoveredId(notifs.id)}
             onMouseOut={() => setHoveredId(null)}> 

            <p className="text-xl font-bold flex gap-2 items-center" >
            {hoveredId === notifs.id ? (
        <Mail size={20} strokeWidth={2.5} />
      ) : (
        <MailOpen size={20} strokeWidth={2.5} />
      )}{notifs.header}</p>
            <p className="text-md  text-gray-600">{notifs.message}</p>
            <p className="text-sm text-gray-500">{new Date(notifs.date).toLocaleString()}</p>

            </div>
        ))} 
        </div>
      </div>
    </>
  );
}

export default NotificatonPage;
