import _ from "lodash";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <>
      <div>
        <ul className="pagination">
          {/* <li className="page-item">
            <a
              style={{ cursor: "pointer" }}
              onClick={(page) => onPageChange(page)}
              className="page-link"
              tabindex="-1"
            >
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li> */}
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                style={{ cursor: "pointer" }}
                onClick={() => onPageChange(page)}
                className="page-link"
              >
                {page}
              </a>
            </li>
          ))}
          {/* <li className="page-item">
            <a
              style={{ cursor: "pointer" }}
              onClick={(page) => onPageChange(page)}
              className="page-link"
            >
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Pagination;
