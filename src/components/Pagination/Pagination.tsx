import { FC } from 'react';
import { getPaginationItems } from './getPaginationItems'
import classes from './Pagination.module.css'

type Props = {
    currentPage: number;
    lastPage: number;
    maxLength: number;
    setCurrentPage: Function
};

const PaginationF:FC<Props> = ({currentPage, lastPage, maxLength, setCurrentPage}) => {

    const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

    return (
        <>
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Previous
            </button>
            {pageNums.map((num, index) => (
                num === currentPage
                ? <button className={`${classes.buttonPage} ${classes.active}`} key={index} onClick={() => setCurrentPage(num)}> {!isNaN(num) ? num : '...'}</button>
                : <button className={classes.buttonPage} key={index} onClick={() => setCurrentPage(num)}> {!isNaN(num) ? num : '...'}</button>)
            )}
                            
            {/* {pageNums.map((pageNum, idx) => (
                <button
                    key={idx}
                    disabled={isNaN(pageNum)}
                    onClick={() => setCurrentPage(pageNum)}
                >
                   
                </button>
            ))} */}
            <button
                disabled={currentPage === lastPage}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>
        </>
    )
}

export default PaginationF