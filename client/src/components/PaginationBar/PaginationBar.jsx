import './PaginationBar.scss';

function PaginationBar({ fullList, from, goToPage, pageIndex, pageSize }) {
    // number of items being displayed on each page
    const pageCount = Math.ceil(fullList.length / pageSize);

    const canPreviousPage = () => {
        if(pageIndex === 0) {
            return true
        } 
    }
    const canNextPage = () => {
        if(pageIndex >= pageCount - 1) {
            return true
        }
    }

    return (
        <div className="pagination">
            <button onClick={() => goToPage(0)} disabled={canPreviousPage()}>{'<<'}</button>{' '}
            <button onClick={() => goToPage(pageIndex - 1)} disabled={canPreviousPage()}>{'<'}</button>{' '}
            <button onClick={() => goToPage(pageIndex + 1)} disabled={canNextPage()}>{'>'}</button>{' '}
            <button onClick={() => goToPage(pageCount - 1)} disabled={canNextPage()}>{'>>'}</button>{' '}
            <span>Page{' '}<strong>{pageIndex + 1} of {pageCount}</strong>{' '}</span>
            <span>| Go to page:{' '}
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        goToPage(page)
                    }}
                    style={{ width: '100px' }}/>
            </span>{' '}

        </div>
    )
}

export default PaginationBar
