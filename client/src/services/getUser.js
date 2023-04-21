const getUser = () => {
    const chatUser = JSON.parse(localStorage.getItem('chatUser'))
    return chatUser
}

export default getUser