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
