import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Contacts from '../Contacts/Contacts';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../FilterContacts/FilterContacts';
import style from './App.css';

class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }

  localContacts = '';

  componentDidMount() {
   const localContacts = localStorage.getItem('contacts');
    if (localContacts) {
      this.setState({
        contacts: JSON.parse(localContacts)
      })
    } else return;

  }

  componentDidUpdate(prevProps, prevState) {
    return (this.state.contacts ? localStorage.setItem('contacts', JSON.stringify(this.state.contacts)) : [])
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  addContacts = (name, number) => {
    const contact = {
      name,
      id: uuidv4(),
      number
    };

    const doubleName = this.state.contacts.find(el => el.name === contact.name);
    if (doubleName) {
      alert(`${contact.name} is already in contacts`);
      return
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact]
      }
    })
  }


  handleDelete = nameId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== nameId)
      }
    })
  }
   handleFilter = () => {
      const { contacts, filter } = this.state;
      return (contacts.length ? contacts.filter((contact => contact.name.toLowerCase().includes(filter.toLowerCase()) )) : [])

    }

  render() {
    const {filter} = this.state;
    return (
      <div className={style.container}>
        <h1>Phonebook</h1>
        <ContactForm toAddContacts={this.addContacts}/>
        <h2>Contacts</h2>
        <Filter value={filter} toFilter={this.handleChange} />
        <Contacts contacts={this.handleFilter()} onDelete={this.handleDelete}/>
      </div>
    )
  }
}

export default App;
