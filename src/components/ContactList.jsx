import ContactListItem from './ContactListItem'
import { useContext } from 'react'
import { ContactsContext } from '../App'

function ContactList() {
    const { contacts } = useContext(ContactsContext);

    return (
        <div className='contactList'> 
            <h2>Contacts</h2> 
            <ul>
                {contacts.map((contact) => (
                    <ContactListItem key={contact.id} contact={contact} />
                ))}
            </ul>
        </div>
    )
}

export default ContactList