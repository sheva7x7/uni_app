export const menuList = [
    {
        link: "/",
        label: "Home"
    },
    {
        link: "/subscription",
        label: "Subscription"
    }
]

export const UNI_API_URL = "http://universities.hipolabs.com/search"

export const listColumns = [{
    id: "name",
    label: "Name",
    align: "left",
    minWidth: 100
}, {
    id: "country",
    label: "Country",
    align: "left",
    minWidth: 100
}, {
    id: "web_pages",
    label: "Websites",
    align: "left",
    minWidth: 100
}]

export const searchFilterOptions = [{
    value: "country",
    label: "Search by country"
}, {
    value: "name",
    label: "Search by name"
}, {
    value: "both",
    label: "Search all"
}]

export const filterActionTypes = {
    "country" : "UPDATE_COUNTRY_FILTER",
    "name": "UPDATE_NAME_FILTER",
    "both": "UPDATE_BOTH_FILTER"
}