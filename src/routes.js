import ContactList from './components/ContactList'
import AddContact from './components/AddContact'
import UpdateContact from './components/UpdateContact'

export default [{
    path: '/',
    component: ContactList
  },
  {
    path: '/addContact',
    name: 'add',
    component: AddContact
  },
  {
    path: '/updateContact/:no',
    name: 'update',
    component: UpdateContact
  }
]