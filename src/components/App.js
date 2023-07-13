import React,{useState,useEffect} from "react";
import { v4 as uuid } from "uuid";
import {BrowserRouter as Router,Switch,Route, Routes} from "react-router-dom";
import api from "../api/Contcats"
import './App.css';
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
 function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts,  setContacts] = useState([]);
  
  // const retrieveContacts = async()=>{
  //   const response = await api.get("/contacts");
  //   return response.data;
  // };
  // retrieveContacts();
  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts,{id : uuid(),...contact}])
  };
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };
  // useEffect(()=> {
  //   const getAllContacts = async () => {
  //     const allContacts = await retriveContacts();
  //     if(allContacts) setContacts(allContacts);
  //   }
  //   getAllContacts();
    // const retrieveContacts=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retrieveContacts) setContacts(retrieveContacts);
//  },[])
  useEffect(()=> {
     localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts]);
  return (
    <div className="ui container">
      <Router>
      <Header/>
        <Routes>
      
        <Route path="/" 
        element={<ContactList contacts={contacts} getContactId={removeContactHandler} />}/>
        <Route path="/add" 
        element={<AddContact addContactHandler={addContactHandler}/>}/>
        <Route path="/contact/:id" element={<ContactDetail/>}/>
      {/* <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Routes>
      </Router>
    </div>
    
  );
};

export default App;
