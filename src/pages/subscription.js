import { useState } from "react"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button"
import { saveSubscription } from "../actions/subscription"
import classnames from "classnames/bind"
import styles from "./subscription.scss"

const cx = classnames.bind(styles)

const Subscription = () => {
    const [email, setEmail] = useState("")

    const subscribe = () => {
        saveSubscription(email)
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className={cx("subscription-container")}>
            <FormControl className={cx("subscription-element")}>
                <TextField 
                    placeholder="Email Address" 
                    id="email" 
                    value={email} 
                    onChange={onEmailChange}
                />
            </FormControl>
            <Button 
                className={cx("subscription-element")}
                variant="contained"
                color="primary"
                size="small"
                onClick={subscribe}
            >
                Subscribe
            </Button>
        </div>
    )
}

export default Subscription