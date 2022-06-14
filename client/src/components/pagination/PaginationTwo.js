import styled from "styled-components";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const PaginationTwo = ({ setCurrentItems, items }) => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    let endOffset = 10;
    if (itemOffset === items.length) {
      endOffset = items.length;
      setItemOffset(endOffset - itemsPerPage);
    } else {
      endOffset = itemOffset + itemsPerPage;
    }
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event) => {
    document
      .getElementById("main-wrapper")
      .scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {items.length > itemsPerPage && (
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
      )}
    </>
  );
};

export default PaginationTwo;

const Div = styled.div`
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
`;
