
import classnames from "classnames/bind"
import styles from "./listing.scss"
import { useState, memo } from "react"
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

const cx = classnames.bind(styles)

const Listing = (props) => {
    const {
        columns,
        rows
    } = props

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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