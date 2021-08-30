import {useState, memo} from "react"
import { useHistory } from "react-router-dom"
import classnames from "classnames/bind"
import styles from "./navbar.scss"
import MenuIcon from "@material-ui/icons/Menu"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const cx = classnames.bind(styles)
const Navbar = (props) => {
    const { 
        menuList
    } = props;

    const [menuOpen, setMenuOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState("")

    const history = useHistory()

    const openMenu = (e) => {
        setAnchorEl(e.currentTarget)
        setMenuOpen(true)
    }

    const handleClose = (item) => {
        history.push(item.link)
        setMenuOpen(false)
    }

    return (
        <div className={cx("navbar")}>
            <div>
                <MenuIcon data-testid="nav-icon" onClick={openMenu}/>
                <Menu
                    id="nav-menu"
                    data-testid="nav-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={menuOpen}
                    onClose={handleClose}
                >
                    {
                        menuList.map((item) => (
                            <MenuItem key={item.label} onClick={() => handleClose(item)}>{item.label}</MenuItem>
                        ))
                    }
                </Menu>
            </div>
            <div data-testid="nav-title">
                University App 
            </div>
            <div data-testid="nav-login">
                Login
            </div>
        </div>
    )
}

export default memo(Navbar)