
import classnames from "classnames/bind"
import styles from "./listing.scss"
import { useState, memo, useMemo } from "react"
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const cx = classnames.bind(styles)

const Listing = (props) => {
    const {
        columns,
        rows
    } = props

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sortColumn, setSortColumn] = useState("")
    const [sortDirection, setSortDirection] = useState("ASC")

    const sortedRows = useMemo(() => {
        console.log("memo", sortColumn, sortDirection)
        if (sortColumn === "") {
            return rows
        } 
        return [...rows].sort((a, b) => {
            return (sortDirection === "ASC" && a[sortColumn] > b[sortColumn]) ||
            (sortDirection === "DESC" && b[sortColumn] >= a[sortColumn]) ? 1 : -1
        })
    }, [sortColumn, sortDirection, rows])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const changeSorting = (column) => {
        if (column.id === sortColumn) {
            setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC")
        } else {
            setSortColumn(column.id)
        }
    }

    const renderCell = (value, column) => {
        return (
            Array.isArray(value) ? 
            <TableCell className={cx("table-cell")} key={column.id} align={column.align}>
            {
                value.map((item) => (
                    <div key={item}>
                        {item}
                    </div>
                ))
            }
            </TableCell> :
            <TableCell className={cx("table-cell")} key={column.id} align={column.align}>
                {column.format && typeof value === 'number' ? column.format(value) : value}
            </TableCell>
        )
    }

    return (        
        rows.length ?
        <Paper className={cx("listing-container")}>
            <TableContainer className={cx("table-container")}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            column.sortable ? 
                            <TableCell
                                key={column.id}
                                data-testid={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                onClick={() => changeSorting(column)}
                            >
                                {column.label} 
                                {
                                    sortColumn === column.id && sortDirection === "ASC" &&
                                        <ArrowDropUpIcon className={cx("table-icon")} fontSize="small" />
                                }
                                {
                                    sortColumn === column.id && sortDirection === "DESC" &&
                                        <ArrowDropDownIcon className={cx("table-icon")} fontSize="small" />
                                }
                            </TableCell> :
                            <TableCell
                                key={column.id}
                                data-testid={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell> 
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                {columns.map((column) => {
                                    const value = row[column.id]
                                    return (
                                        renderCell(value, column)
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper> : 
        <Paper data-testid="no-data" className={cx(["listing-container", "list-empty"])}>
            No data
        </Paper>
    )
}

export default memo(Listing)