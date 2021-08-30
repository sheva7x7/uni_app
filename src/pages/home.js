import { useReducer, useEffect, useState } from "react"
import axios from "axios"
import {UNI_API_URL, listColumns, searchFilterOptions, filterActionTypes} from "../constants/AppConstants"
import Listing from "../components/listing"
import classnames from "classnames/bind"
import styles from "./home.scss"
import CircularProgress from '@material-ui/core/CircularProgress'
import Filter from '../components/filter'

const cx = classnames.bind(styles)

const initialState = {
    filter: {
        country: "",
        name: ""
    },
    fullData: [],
    filteredDataByCountry: [],
    filteredDataByName: []
}

const reducer = (state, action) => {
    switch(action.type) {
        case "LOAD_FULL_LIST":
            return {...state, fullData: action.payload}
        case "LOAD_FILTER_BY_NAME_LIST": 
            return {...state, filteredDataByName: action.payload}        
        case "LOAD_FILTER_BY_COUNTRY_LIST": 
            return {...state, filteredDataByCountry: action.payload}
        case "UPDATE_COUNTRY_FILTER":
            return {...state, filter: {country: action.payload, name: ""}}
        case "UPDATE_NAME_FILTER":
            return {...state, filter: {country: "", name: action.payload}}
        case "UPDATE_BOTH_FILTER":
            return {...state, filter: {country: action.payload, name: action.payload}}
        case "CLEAR_FILTER":
            return {...state, filter: {country: "", name: ""}, filteredDataByCountry: [], filteredDataByName: []}
        default:
            return state
    }
}

const useFilter = (filter) => {
    const [hasFilter, setHasFilter] = useState(false)

    useEffect(() => {
        setHasFilter(filter.country !== "" || filter.name !== "")
    }, [filter.country, filter.name])
    return {
        hasFilter
    }
}

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isLoading, setIsLoading] = useState(true)
    const [isFilterByNameListLoading, setIsFilterByNameListLoading] = useState(false)
    const [isFilterByCountryListLoading, setIsFilterByCountryListLoading] = useState(false)
    const [filterValue, setFilterValue] = useState("country")
    const [searchValue, setSearchValue] = useState("")
    const { hasFilter } = useFilter(state.filter)

    useEffect(() => {
        axios.get(UNI_API_URL)
            .then((res) => {
                const payload = res.data
                dispatch({
                    type: "LOAD_FULL_LIST",
                    payload
                })
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        if (filterValue) {
            updateFilters()
        }
    }, [filterValue])

    useEffect(() => {
        if (state.filter.name !== "") {
            performSearchByName()
        }
    }, [state.filter.name])

    useEffect(() => {
        if (state.filter.country !== "") {
            performSearchByCountry()
        }
    }, [state.filter.country])

    const updateFilters = () => {
        if (searchValue !== "") {
            dispatch({
                type: filterActionTypes[filterValue],
                payload: searchValue
            })
        } else {
            dispatch({
                type: "CLEAR_FILTER"
            })
        }
    }

    const performSearchByName = () => {
        setIsFilterByNameListLoading(true)
        axios.get(`${UNI_API_URL}?name=${state.filter.name}`)
            .then((res) => {
                const payload = res.data
                dispatch({
                    type: "LOAD_FILTER_BY_NAME_LIST",
                    payload
                })
                setIsFilterByNameListLoading(false)
            })
    }

    const performSearchByCountry = () => {
        setIsFilterByCountryListLoading(true)
        axios.get(`${UNI_API_URL}?country=${state.filter.country}`)
            .then((res) => {
                const payload = res.data
                dispatch({
                    type: "LOAD_FILTER_BY_COUNTRY_LIST",
                    payload
                })
                setIsFilterByCountryListLoading(false)
            })
    }

    const onFilterChange = (e) => {
        console.log(e.target)
        setFilterValue(e.target.value)
    }

    const onSearchChange = (e) => {
        console.log(e.target)
        setSearchValue(e.target.value)
    }

    const onSearchBlur = () => {
        updateFilters()
    }

    const renderFullList = () => {
        return (
            <div className={cx("home-container")}>
                <div className={cx("list-title")}>University List</div>
                {
                    isLoading ? 
                    <div className={cx("list-loader")}>
                        <CircularProgress />
                    </div> :
                    <Listing 
                        columns={listColumns}
                        rows={state.fullData}
                    />
                }
            </div>
        )
    }

    const renderFilteredLists = () => {
        return (
            <div className={cx("home-container")}>
                {
                    state.filter.country !== "" &&
                    <div>
                        <div className={cx("list-title")}>Search: country</div>
                        {
                            isFilterByCountryListLoading ? 
                            <div className={cx("list-loader")}>
                                <CircularProgress />
                            </div> :
                            <Listing 
                                columns={listColumns}
                                rows={state.filteredDataByCountry}
                            />
                        }
                    </div>
                }
                {
                    state.filter.name !== "" &&
                    <div>
                        <div className={cx("list-title")}>Search: name</div>
                        {
                            isFilterByNameListLoading ? 
                            <div className={cx("list-loader")}>
                                <CircularProgress />
                            </div> :
                            <Listing 
                                columns={listColumns}
                                rows={state.filteredDataByName}
                            />
                        }
                    </div>
                }
            </div> 
        )
    }

    return (
        <div className={cx("page-container")}>
            <Filter
                searchValue={searchValue}
                filterValue={filterValue}
                filterOptions={searchFilterOptions}
                onFilterChange={onFilterChange}
                onSearchChange={onSearchChange}
                onSearchBlur={onSearchBlur}
            />
            {!hasFilter && renderFullList()}
            {hasFilter && renderFilteredLists()}
        </div>
    )
}

export default Home