import {render, fireEvent} from "@testing-library/react"
import Navbar from "./navbar"

describe("test elements", () => {
    const menuList = [
        {
            link: "/",
            label: "Home"
        },
        {
            link: "/subscription",
            label: "Subscription"
        }
    ]
    test("elements on load", () => {
        const { getByTestId } = render(<Navbar menuList={menuList}/>)
        const navTitle = getByTestId("nav-title")
        const navLogin = getByTestId("nav-login")
        const navMenu = getByTestId("nav-menu")
        const navIcon = getByTestId("nav-icon")
        expect(navTitle).toBeInTheDocument()
        expect(navLogin).toBeInTheDocument()
        expect(navMenu).toBeInTheDocument()
        expect(navIcon).toBeInTheDocument()
    })

    test("open menu", () => {
        const { getByTestId } = render(<Navbar menuList={menuList}/>)
        const navIcon = getByTestId("nav-icon")
        const navMenu = getByTestId("nav-menu")
        expect(navMenu).toHaveAttribute("aria-hidden")
        fireEvent.click(navIcon)
        expect(navMenu).not.toHaveAttribute("aria-hidden")
    })
})