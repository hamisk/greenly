import React from 'react'
import GroceryListItem from '../GroceryListItem/GroceryListItem'
import './GroceryTable.scss'

function GroceryTable() {

    const gotoPage = () => {}
    const canPreviousPage = () => {}
    const previousPage = () => {}
    const nextPage = () => {}
    const canNextPage = () => {}
    const pageCount = 5
    const pageIndex = 1
    const pages = [0, 1]



    return (
        <div className="grocery-table">
            <div className="grocery-table__subheaders">
                <p className="grocery-table__sub">CO2e</p>
                <p className="grocery-table__sub">Land use</p>
                <p className="grocery-table__sub">water use</p>
                <p className="grocery-table__sub">pollutants</p>
                <p className="grocery-table__sub">quantity</p>
            </div>
            <ul className="grocery-table__list">
                <GroceryListItem />
                <GroceryListItem />
                <GroceryListItem />
                <GroceryListItem />
                <GroceryListItem />
            </ul>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>{' '}
                <span>Page{' '}<strong>{pageIndex + 1} of {pages.length}</strong>{' '}</span>
                <span>| Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}/>
                </span>{' '}
                {/* <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}>
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select> */}
            </div>
        </div>
    )
}

export default GroceryTable
