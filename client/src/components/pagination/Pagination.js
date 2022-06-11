import ReactPaginate from "react-paginate";
import styled from "styled-components";

const Pagination = ({ setPage, pageCount }) => {
  const handlePageClick = (event) => {
    document
      .getElementById("main-wrapper")
      .scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPage(event.selected + 1);
  };

  return (
    <Div>
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
    </Div>
  );
};

export default Pagination;

const Div=styled.div`
.pagination {
  margin-top: 20px;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  font-size: 1.2rem;
  gap: 5px;
  font-family: inherit;
}
.pagination .page-num {
  padding: 5px 13px;
  cursor: pointer;
  border-radius: 3px;
  font-weight: 400;
}
.pagination .page-num:hover {
  background-color: #343a40;
  color: var(--color-font);
}
.pagination .active {
  background-color: #343a40;
  color: var(--color-font);
}
`