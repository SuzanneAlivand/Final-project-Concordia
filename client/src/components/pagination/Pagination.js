import "./pagination.css";
import ReactPaginate from "react-paginate";

const Pagination = ({ setPage, pageCount }) => {
  const handlePageClick = (event) => {
    document
      .getElementById("main-wrapper")
      .scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPage(event.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
};

export default Pagination;
