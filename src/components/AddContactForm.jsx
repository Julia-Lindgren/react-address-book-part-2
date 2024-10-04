import React, { useContext, useEffect } from 'react';
import { ContactsContext } from '../App';
import { useNavigate, useParams } from 'react-router-dom';

function ContactForm({ editMode }) {
    const { id } = useParams();
    const { contacts, setContacts, formData, setFormData } = useContext(ContactsContext);
    const baseUrl = 'https://boolean-uk-api-server.fly.dev/Julia-Lindgren';
    const navigate = useNavigate();

    useEffect(() => {
        if (editMode && id) {
            const contactToEdit = contacts.find(contact => contact.id === id);
            if (contactToEdit) {
                setFormData({
                    firstName: contactToEdit.firstName,
                    lastName: contactToEdit.lastName,
                    street: contactToEdit.street,
                    city: contactToEdit.city
                });
            }
        }
    }, [editMode, id, contacts, setFormData]);

    const createContact = async (newContact) => {
        try {
            const response = await fetch(`${baseUrl}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContact),
            });
            if (!response.ok) {
                throw new Error('Failed to create contact');
            }
            const createdContact = await response.json();
            setContacts([...contacts, createdContact]); 
        } catch (error) {
            console.error('Error creating contact:', error);
        }
    };

    const updateContact = async (formData) => {
        try {
            const response = await fetch(`${baseUrl}/contact/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update contact');
            }

            const updatedContact = await response.json();
            setContacts(contacts.map(contact => (contact.id === id ? updatedContact : contact)));
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            updateContact(formData);
        } else {
            
            createContact(formData);
        }

        setFormData({
            firstName: '',
            lastName: '',
            street: '',
            city: ''
        });
        if (editMode) {
            navigate(`/contact/${id}`);
        } else {
            navigate('/contact');
        }
        
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>{editMode ? 'Edit Contact' : 'Add a New Contact'}</h2>

            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <label>
                Street:
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <button type="submit">
                {editMode ? 'Update Contact' : 'Add Contact'}
            </button>
        </form>
    );
}

export default ContactForm;
