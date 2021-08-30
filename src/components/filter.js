import { memo } from "react"
import TextField from "@material-ui/core/TextField"
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from "@material-ui/core/FormControl"
import classnames from "classnames/bind"
import styles from "./filter.scss"

const cx = classnames.bind(styles)

const Filter = (props) => {
    const {
        searchValue,
        onSearchChange,
        filterValue,
        onFilterChange,
        filterOptions,
        onSearchBlur
    } = props

    return (
        <div className={cx("filter-container")}>
            <FormControl className={cx("filter-element")}>
                <TextField 
                    placeholder="Search" 
                    id="search" 
                    InputProps={{"data-testid": "search-input"}}
                    data-testid="search"
                    value={searchValue} 
                    onChange={onSearchChange}
                    onBlur={onSearchBlur}
                />
            </FormControl>
            <FormControl className={cx("filter-element")}>
                <Select
                    id="filter-select"
                    MenuProps={{"data-testid": "filter-select-menu"}}
                    SelectDisplayProps={{"data-testid": "filter-select"}}
                    value={filterValue}
                    onChange={onFilterChange}
                >
                    {
                        filterOptions.map((option) => (
                            <MenuItem data-testid={option.value} key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default memo(Filter)