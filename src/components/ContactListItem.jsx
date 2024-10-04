import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { ContactsContext } from '../App'

function ContactListItem({ contact }) {
    const { contacts, setContacts } = useContext(ContactsContext);

    const baseUrl = 'https://boolean-uk-api-server.fly.dev/Julia-Lindgren';

    const deleteContact = async () => {
        try {
            const response = await fetch(`${baseUrl}/contact/${contact.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete contact');
            }

            setContacts(contacts.filter(c => c.id !== contact.id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <li className='contactListItem'>
            <span>{contact.firstName} {contact.lastName}</span>
            <Link to={`/contact/${contact.id}`}>
                <span>view</span>
            </Link>
            <button onClick={deleteContact}>Delete</button>
            <Link to={`/contact/${contact.id}/edit`}>
                <button>Update</button>
            </Link>
        </li>
    )

}

export default ContactListItem