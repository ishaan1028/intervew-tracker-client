import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useLocation, useNavigate } from "react-router-dom";

type PaginateProps = {
  totalCount: number;
};

const Paginate: React.FC<PaginateProps> = ({ totalCount }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const page = queryParams.get("page") || 1;

  const handleSubmit = (pageNo: number) => {
    queryParams.set("page", String(pageNo));
    navigate(`/interview?${queryParams.toString()}`);
  };

  useEffect(() => {
    setCurrentPage(+page);
  }, [page]);

  return (
    <Pagination
      activePage={currentPage}
      itemsCountPerPage={10}
      totalItemsCount={totalCount}
      onChange={(pageNo: number) => handleSubmit(pageNo)}
      nextPageText="Next"
      prevPageText="Prev"
      firstPageText="First"
      lastPageText="Last"
      itemClass="page-item"
      linkClass="page-link"
    />
  );
};

export default Paginate;
