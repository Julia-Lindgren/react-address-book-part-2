import './App.css';
import { useEffect, useState, createContext } from 'react';
import { Route, Routes, Link, BrowserRouter, Navigate} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ContactView from './components/ContactView';
import ContactForm from './components/AddContactForm';

export const ContactsContext = createContext();

function App() {
    const [contacts, setContacts] = useState([])
    const baseUrl = 'https://boolean-uk-api-server.fly.dev/Julia-Lindgren';

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        city: ''
    });

    const fetchContacts = async () => {
        fetch(baseUrl + '/contact')
            .then((response) => response.json())
            .then((data) => {
                setContacts(data);
                console.log(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <ContactsContext.Provider value={{ contacts, setContacts, formData, setFormData }}>
            <>
                <header>
                </header>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/contact" replace />} />
                        <Route path="/contact" element={<Dashboard />} />
                        <Route path="/contact/:id" element={<ContactView />} />
                        <Route path="/contact/create" element={<ContactForm />} />
                    </Routes>
                </BrowserRouter>

            </>
        </ContactsContext.Provider>
    );
}

export default App;
