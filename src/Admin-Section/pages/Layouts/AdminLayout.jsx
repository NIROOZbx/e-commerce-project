
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useState } from "react";

function AdminLayout(){
     const [isExpanded, setIsExpanded] = useState(true);

    return( 
        <> 
       
        <div className="flex h-screen">
          <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        

       <div className={`transition-all duration-300 ${isExpanded ? "ml-64" : "ml-16"} pt-7 flex-1`}>
            <Outlet/>
        </div>
        </div>
       

        
        </>
    )

}

export default AdminLayout