/**
 Komponentti, joka renderöi yksittäisen viestin.
 @param {Object} message - Objekti, joka sisältää viestin tiedot, kuten viestin sisällön, lähettäjän käyttäjänimen ja luomisajan.
 @returns {JSX.Element} - Palauttaa viestin HTML-rakenteen sisältäen käyttäjänimen, viestin sisällön, luomisajan ja käyttäjän profiilikuvan.
 */
const Message = ({message}) => {
    return(
        <div class="message">
            <div class="message-avatar">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="User Avatar"/>
            </div>
            <div class="message-body">
                <div class="message-author">{message.username}</div>
                <div class="message-content">
                    {message.message_content}
                </div>
                <div class="message-time">{new Date(message.created_at).toLocaleString('fi-FI')}</div>
            </div>
        </div>
    );
}
export default Message;
