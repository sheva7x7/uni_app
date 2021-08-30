const getSubscription = () => {
    const data = localStorage.getItem("subscriptions")
    return data ? JSON.parse(data) : []
}

const saveSubscription = (email) => {
    const subscriptions = getSubscription()
    subscriptions.push({email})
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions))
}

export {
    saveSubscription
}