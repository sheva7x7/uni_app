import {render, fireEvent} from "@testing-library/react"
import Filter from "./filter"

describe("test elements", () => {
    let searchFilterOptions, filterValue, searchValue

    beforeEach(() => {
        searchFilterOptions = [{
            value: "country",
            label: "Search by country"
        }, {
            value: "name",
            label: "Search by name"
        }, {
            value: "both",
            label: "Search all"
        }]
        filterValue = "country"
        searchValue = ""
    })

   
    test("elements on load", () => {
        const { getByTestId } = render(<Filter
            searchValue={searchValue}
            filterValue={filterValue}
            filterOptions={searchFilterOptions}
        />)
        const search = getByTestId("search")
        const filterSelect = getByTestId("filter-select")
        expect(search).toBeInTheDocument()
        expect(filterSelect).toBeInTheDocument()
    })

    test("open menu", () => {
        const { getByTestId } = render(<Filter
            searchValue={searchValue}
            filterValue={filterValue}
            filterOptions={searchFilterOptions}
        />)
        const filterSelect = getByTestId("filter-select")
        fireEvent.mouseDown(filterSelect)
        const menu = getByTestId("filter-select-menu")
        expect(menu).toBeInTheDocument()
    })

    test("filter on change", () => {
        const filterChange = (e) => {
            filterValue = e.target.value
        }
        const { getByTestId } = render(<Filter
            searchValue={searchValue}
            filterValue={filterValue}
            filterOptions={searchFilterOptions}            
            onFilterChange={filterChange}
            // onSearchChange={onSearchChange}
            // onSearchBlur={onSearchBlur}
        />)
        const filterSelect = getByTestId("filter-select")
        fireEvent.mouseDown(filterSelect)
        const both = getByTestId("both")
        fireEvent.click(both)
        expect(filterValue).toBe("both")
    })

    test("filter on change", () => {
        const filterChange = (e) => {
            filterValue = e.target.value
        }
        const { getByTestId } = render(<Filter
            searchValue={searchValue}
            filterValue={filterValue}
            filterOptions={searchFilterOptions}            
            onFilterChange={filterChange}
        />)
        const filterSelect = getByTestId("filter-select")
        fireEvent.mouseDown(filterSelect)
        const both = getByTestId("both")
        fireEvent.click(both)
        expect(filterValue).toBe("both")
    })

    test("search on change", () => {
        const onSearchChange = (e) => {
            searchValue = e.target.value
        }
        const { getByTestId } = render(<Filter
            // searchValue={searchValue}
            filterValue={filterValue}
            filterOptions={searchFilterOptions}
            onSearchChange={onSearchChange}
        />)
        const search = getByTestId("search-input")
        fireEvent.click(search)
        expect(search.childNodes[0]).toHaveFocus()
        fireEvent.change(search.childNodes[0], {
            target: {
                value: "abc"
            }
        })
        expect(searchValue).toBe("abc")
    })
})