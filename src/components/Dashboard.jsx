import { useContext, useEffect } from 'react'
import { ContactsContext } from '../App'
import ContactList from './ContactList';
import SideMenu from './SideMenu';

function Dashboard() {
    const { contacts, setContacts } = useContext(ContactsContext);
    const baseUrl = 'https://boolean-uk-api-server.fly.dev/Julia-Lindgren';

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(baseUrl + '/contact');
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts(); 
    }, [setContacts]);

    return (
        <main >
            <section className="dashboard-layout">
                <SideMenu />
                <ContactList />
            </section>
        </main>
    )
}

export default Dashboard