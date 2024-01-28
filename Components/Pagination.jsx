import { motion } from "framer-motion";
import styles from "../Components/pagination.module.scss";

const Pagination = (props) => {
  const pagesCount = Math.ceil(props.length / props.itemsPerPage);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <motion.div
      key={props.currentPage} // Added key to remount component on page change
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className={styles.pagination}
    >
      <ul>
        <li
          className={props.currentPage === 1 ? styles.invisible : null}
          onClick={() => props.onPageChanged(props.currentPage - 1)}
        >
          <button className="page-link">&laquo;</button>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={props.currentPage === page ? styles.active : null}
            onClick={() => props.onPageChanged(page)}
          >
            <button className="page-link">{page}</button>
          </li>
        ))}

        <li
          className={props.currentPage === pagesCount ? styles.invisible : null}
          onClick={() => props.onPageChanged(props.currentPage + 1)}
        >
          <button className="page-link">&raquo;</button>
        </li>
      </ul>
    </motion.div>
  );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
};

export default Pagination;
