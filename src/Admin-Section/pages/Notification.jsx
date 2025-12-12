import { Send, SendIcon, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";


function Notification() {
  const [allUser, setAllUser] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedUserid, setSelectedUserid] = useState([]);
  const [loading,setLoading]=useState(false)


  useEffect(() => {
    async function getAllUsers() {
      let { data } = await api.get("/admin/users");
      setAllUser(data.data);
    
    }

    getAllUsers();
  }, []);

  function checkedCount(e) {

    if (e.target.checked) {
      setSelectedUserid([Number(e.target.value), ...selectedUserid]);
      setUserCount((p) => p + 1);
    } else {
      setSelectedUserid(
        selectedUserid.filter((user) => user !== Number(e.target.value))
      );
      setUserCount((p) => p - 1);
    }
  }

  function getTitle(e) {
    setTitle(e.target.value);
  }

  function getMessage(e) {
    setMessage(e.target.value);
  }

  console.log("Selected user id",selectedUserid)

  async function sendNotification(e) {
    e.preventDefault()

    setLoading(true)

    setTimeout(async() => {
         try {
     
        let notification = {
          "user_id": selectedUserid.map(Number), 
          title: title,
          message: message,
        };

        await api.post(`/admin/notifications`, notification);
    
      setUserCount(0);
      setMessage("");
      setTitle("");
      setSelectedUserid([]);
      toast.success("Send notification successfully")
      setLoading(false)
    } catch (e) {
      toast.warning("Error in sending notification")
  }finally{
    setLoading(false)
  }
        
    }, 1500);

   
}

  console.log(selectedUserid);

  function handleSelectAll() {
    if (selectedUserid.length === allUser.length) {
      setSelectedUserid([]);
      setUserCount(0);
    } else {
      const allUserIds = allUser.map((user) => user.id);

      setSelectedUserid(allUserIds);

      setUserCount(allUser.length);
    }
  }

  return (
    <div className="p-10">
      <p className="flex items-center gap-2 text-3xl font-bold text-gray-800 mb-8 ">
        Send Notifications
      </p>
      <form className="p-6 main-cont rounded-2xl" onSubmit={(e)=>sendNotification(e)}>
        <label htmlFor="title" className="block text-lg font-semibold mb-3 ">
          Notification Title
        </label>
        <input
          required
          value={title}
          onChange={getTitle}
          type="text"
          className="capitalize w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label
          htmlFor="text"
          className="block text-lg font-semibold mt-5 mb-3 "
        >
          Notification Message
        </label>
        <textarea
          required
          onChange={getMessage}
          name=""
          id=""
          className="capitalize w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows={7}
          value={message}
        ></textarea>
        <button
        disabled={loading}
          className="flex gap-3 px-4 py-3 bg-black text-white font-semibold rounded-lg shadow-md mt-3"
          
        >
          {loading?<span className="flex gap-2 items-center">Sending Notification... <Spinner/></span>:<span className="flex gap-2 items-center">Send Notification ({userCount})<SendIcon size={18}/></span>}
        </button>
      </form>
      <div className=" mb-5  mt-7 main-cont rounded-2xl px-6 py-3">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 ">
          Select User <User2 />
        </h2>
        <hr className="text-gray-700 mt-3" />

        <div className=" mt-3">
          <p className="text-sm text-gray-600 pt-2">
            {userCount} of {allUser.length} Selected
          </p>
          {allUser.map((user) => (
            <div className="flex gap-3 py-2 items-baseline">
              <input
                type="checkbox"
                onChange={checkedCount}
                value={user.id}
                checked={selectedUserid.includes(user.id)}
              />
              <p className="capitalize font-semibold">{user.name}</p>
              <p className="text-sm text-gray-700">{user.email}</p>
            </div>
          ))}
          <button
            onClick={handleSelectAll}
            className="bg-black/80 text-white px-4 py-1 text-sm font-medium rounded-md mt-2"
          >
            {selectedUserid.length === allUser.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
