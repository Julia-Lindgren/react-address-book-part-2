import { useContext } from 'react'
import { ContactsContext } from '../App'
import ContactList from './ContactList';
import SideMenu from './SideMenu';

function Dashboard() {
    const { contacts } = useContext(ContactsContext);

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