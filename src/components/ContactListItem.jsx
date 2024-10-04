import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { ContactsContext } from '../App'

function ContactListItem({ contact }) {

    return (
        <li className='contactListItem'>
            <span>{contact.firstName} {contact.lastName}</span>
            <Link to={`/contact/${contact.id}`}>
                <span>view</span>
            </Link>
        </li>
    )

}

export default ContactListItem