import { useEffect, useRef, useState } from "react";

export default function usePagination({ page, setPage, data }) {
    // const item = Number(window.localStorage.getItem("currentPage"));
    // const [currentPage, setCurrentPage] = useState(page);

    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [pageNumberLimit, setPageNumberLimit] = useState(2);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(2);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    useEffect(() => {
        // window.localStorage.setItem("currentPage", `${currentPage}`);
        setMaxPageNumberLimit(page + 1);
        setMinPageNumberLimit(page - 1);
    }, [page]);

    const handleClick = (e) => {
        setPage(Number(e.target.id));
    };
    const pages = [];
    for (let i = 1; i <= Math.ceil(data?.length / itemsPerPage); i++) {
        pages.push(i);
    }
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map((number) => {
        // console.log(maxPageNumberLimit,minPageNumberLimit);
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li className="page-item ">
                    <a
                        className={`page-link ${
                            page === number ? "active" : ""
                        }`}
                        key={number}
                        id={number}
                        onClick={handleClick}
                    >
                        {number}
                    </a>
                </li>
            );
        } else {
            return null;
        }
    });

    const handleNextBtn = (e) => {
        setPage(page + 1);
        if (page + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const handlePrevBtn = (e) => {
        setPage(page - 1);
        if ((page - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = (
            <li className="page-item ">
                <a className={`page-link`} onClick={handleNextBtn}>
                    &hellip;
                </a>
            </li>
        );
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = (
            <li className="page-item ">
                <a className={`page-link`} onClick={handlePrevBtn}>
                    &hellip;
                </a>
            </li>
        );
    }

    return {
        currentItems,
        handlePrevBtn,
        pageDecrementBtn,
        renderPageNumbers,
        pageIncrementBtn,
        handleNextBtn,
        pages,
    };
}

{/* <div className="mt-5 mb-5 text-center">
                <nav aria-label="Page navigation example d-inline ">
                    <ul className="pagination justify-content-center">
                        <button
                            className="page-link"
                            onClick={() => {
                                setCurentPage(curentPage-1);
                                setSearchParams({page: curentPage-1})}}
                            disabled={curentPage === 0 ? true : false}
                        >
                            Previous
                        </button>
                        {new Array(total_page).fill(0).map((item, index) => (
                            <li
                                
                                class={`page-link ${
                                    curentPage === index ? "active" : ""
                                }`}
                                onClick={() => {
                                    setCurentPage(index);
                                    setSearchParams({page: index})}}
                            >
                                {index + 1}
                            </li>
                        ))}
                        <button
                            className="page-link"
                            onClick={() => {
                                setCurentPage(curentPage+1);
                                setSearchParams({page: curentPage+1})}}
                            disabled={curentPage === total_page - 1 ? true : false}
                        >
                            Next{" "}
                        </button>
                    </ul>
                </nav>
            </div> */}

            //     const getSingleStudent = async (idStudent) => {
//         const response = await axios.get(
//             `https://prod.example.fafu.com.vn/employee/${idStudent}`
//         );
//         const result = response.data;
// 
//         result.gender = result.gender === 1 ? "male" : "female";
//         console.log("bitrh1", result.birthday);
//         result.birthday = new Date(result.birthday).toISOString().slice(0,10);
//         console.log("bitrh2", result.birthday);
//         setData(result);
//         form.setFieldsValue({
//             username: result.username,
//             firstname: result.firstname,
//             lastname: result.lastname,
//             address: result.address,
//             email: result.email,
//             birthday: moment(result.birthday, 'YYYY-MM-DD'),
//             phone: result.phone,
//             gender: result.gender,
//         });
//     };