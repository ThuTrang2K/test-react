import { useEffect, useRef, useState } from "react";

export default function usePagination({data,setData}){
    
    const item = Number(window.localStorage.getItem("currentPage"));
    const [currentPage, setCurrentPage] = useState(item? item: 1);

    
    const [itemsPerPage, setItemsPerPage] = useState(3);
    
    const [pageNumberLimit, setPageNumberLimit]= useState(2);
    const [maxPageNumberLimit, setMaxPageNumberLimit]= useState(2);
    const [minPageNumberLimit, setMinPageNumberLimit]= useState(0);
    useEffect(()=>{
        window.localStorage.setItem("currentPage", `${currentPage}`);
        setMaxPageNumberLimit(currentPage+1)
        setMinPageNumberLimit(currentPage-1)
    },[currentPage])

    const handleClick =(e)=>{
        setCurrentPage(Number(e.target.id))
    }
    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
    }
    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)
    
    const renderPageNumbers = pages.map((number) => {
        // console.log(maxPageNumberLimit,minPageNumberLimit);
        if(number< maxPageNumberLimit+1 && number> minPageNumberLimit){
            return (
                <li className="page-item ">
                    <a className={`page-link ${currentPage === number ? "active":''}`} key={number} id={number}  onClick={handleClick}>
                        {number}
                    </a>
                </li>
            );
        }else {
            return null
        }
    });
    
    
    const handleNextBtn=(e)=>{
        setCurrentPage(currentPage+1)
        if(currentPage+1>maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit+ pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit+ pageNumberLimit)
        }
    }
    const handlePrevBtn=(e)=>{
        setCurrentPage(currentPage-1)
        if((currentPage-1)%pageNumberLimit===0){
            setMaxPageNumberLimit(maxPageNumberLimit- pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit- pageNumberLimit)
        }
    }

    let pageIncrementBtn = null ;
    if(pages.length>maxPageNumberLimit){
        pageIncrementBtn= <li className="page-item ">
        <a className={`page-link`} onClick={handleNextBtn}>
            &hellip;
        </a>
    </li>
    }

    let pageDecrementBtn = null ;
    if(minPageNumberLimit>=1){
        pageDecrementBtn= <li className="page-item ">
        <a className={`page-link`} onClick={handlePrevBtn}>
            &hellip;
        </a>
    </li>
    }

    
    return{
        setCurrentPage,currentItems, handlePrevBtn, currentPage,pageDecrementBtn,renderPageNumbers,pageIncrementBtn,handleNextBtn,pages
    }
}