import {memo} from "react"
import classnames from "classnames/bind"
import styles from "./notFound.scss"

const cx = classnames.bind(styles)

const NotFound = () => {
    return (
        <div className={cx("not-found-container")}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
        </div>
    )
}

export default memo(NotFound)