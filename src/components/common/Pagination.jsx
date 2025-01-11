import React, { useState } from "react";

export default function Pagination({
  itemLength = 200,
  itemPerPage = 10,
  setPage = (num) => {},
  currentPage,
}) {
  const totalPages = Math.ceil(itemLength / itemPerPage); // Adjust as needed

  const handlePageClick = (page) => {
    if (page != 0 && page <= totalPages) {
      setPage(page);
    }
    // Add navigation logic here, e.g., using a router or window.location
  };

  return (
    <>
      {totalPages > 1 ? (
        <React.Fragment>
          {" "}
          <li onClick={() => handlePageClick(currentPage - 1)}>
            <a className={`nav-item`}>
              <i className="icon icon-arr-l nav-item" />
            </a>
          </li>
          {[...Array(totalPages)].slice(0, 4).map((_, index) => {
            const page = index + 1;
            return (
              <li key={page}>
                <a
                  className={`nav-item ${currentPage === page ? "active" : ""}`}
                  style={{color: `${ currentPage === page ? '' : '#008ff7 ' }`}}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </a>
              </li>
            );
          })}
          {currentPage >= 5 && (
            <li>
              <a className={`nav-item active`} style={{color: `${ currentPage === page ? '#008ff7' : '' }`}}>{currentPage}</a>
            </li>
          )}
          {totalPages >= 5 && currentPage != totalPages && (
            <li className={`nav-item`}>
              <a className="nav-item">...</a>
            </li>
          )}
          <li onClick={() => handlePageClick(currentPage + 1)}>
            <a className={`nav-item`}>
              <i className="icon icon-arr-r nav-item" />
            </a>
          </li>{" "}
        </React.Fragment>
      ) : (
        ""
      )}
    </>
  );
}
