import React, { useContext, useEffect } from 'react';
import { ContactsContext } from '../App';
import { useNavigate } from 'react-router-dom';

function ContactForm({ currentContact, editMode, onSubmit }) {
    const { contacts, setContacts, formData, setFormData } = useContext(ContactsContext);
    const baseUrl = 'https://boolean-uk-api-server.fly.dev/Julia-Lindgren';
    const navigate = useNavigate();

    useEffect(() => {
        if (currentContact) {
            setFormData(currentContact);
        }
    }, [currentContact, setFormData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode && currentContact) {
            //TODO: update contact
        } else {
            
            createContact(formData);
        }

        setFormData({
            firstName: '',
            lastName: '',
            street: '',
            city: ''
        });

        navigate('/contact');
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
