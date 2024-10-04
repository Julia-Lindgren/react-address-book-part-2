import { Link, useParams} from 'react-router-dom';
import { useContext } from 'react'
import { ContactsContext } from '../App'

function ContactView() {
    const { id } = useParams(); 
    const { contacts } = useContext(ContactsContext);

    const contact = contacts.find(contact => String(contact.id) === String(id));

    if (!contact) {
        return <div>Contact not found.</div>;
    }

    return (
        <div>
            <h3>{contact.firstName} {contact.lastName}</h3>
            <p>{contact.street} {contact.city}</p>
        </div>
    )

}

export default ContactView