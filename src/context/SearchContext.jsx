import { createContext, useState } from "react"

export const SearchContext=createContext(null)
function SearchData({children}){

    const[searchData,setSearchData]=useState('')

    const[getSearchData,setGetSearchData]=useState('')

    return  ( 
        <SearchContext.Provider value={{searchData,setSearchData,setGetSearchData,getSearchData}}> 
            {children}
        </SearchContext.Provider>
    )

}

export default SearchData