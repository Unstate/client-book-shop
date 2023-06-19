import { FC } from 'react';
import { getPaginationItems } from './getPaginationItems'
import PageLink from './PageLink';
import left from './../../assets/left.svg'
import right from './../../assets/right.svg'

type Props = {
    currentPage: number;
    lastPage: number;
    maxLength: number;
    setCurrentPage: Function
};

const PaginationF: FC<Props> = ({ currentPage, lastPage, maxLength, setCurrentPage }) => {

    const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

    return (
        <div className='m-auto mt-[40px]'>
            <nav className="pagination" aria-label="Pagination">
                <PageLink
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <img src={left}></img>
                </PageLink>
                {pageNums.map((pageNum, idx) => (
                    <PageLink
                        key={idx}
                        active={currentPage === pageNum}
                        disabled={isNaN(pageNum)}
                        onClick={() => setCurrentPage(pageNum)}
                    >
                        {!isNaN(pageNum) ? pageNum < 10 ? '0' + pageNum : pageNum : '...'}
                    </PageLink>
                ))}
                <PageLink
                    disabled={currentPage === lastPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <img src={right}></img>
                </PageLink>
            </nav>
        </div>
    );
}

export default PaginationF