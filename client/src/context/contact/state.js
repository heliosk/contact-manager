import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './context';
import contactReducer from './reducers';
// action types
import * as types from './types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // ACTIONS CREATORS

    // Get contacts
    const getContacts = async () => {
        
        try {
            const res = await axios.get('/api/contacts');
            
            // dispacth to our reducer
            dispatch({ type: types.GET_CONTACTS, payload: res.data});

        } catch (err) {
            
            dispatch({ type: types.CONTACT_ERROR, payload: err.response.msg });
        }
    }


    // Add contact
    const addContact = async contact => {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            
            // dispacth to our reducer
            dispatch({ type: types.ADD_CONTACT, payload: res.data});

        } catch (err) {
            
            dispatch({ type: types.CONTACT_ERROR, payload: err.response.msg });
        }
    }

    // Delete contact
    const deleteContact = async id  => {

        try {
            await axios.delete(`/api/contacts/${id}`);
            
            // dispacth to our reducer
            dispatch({ 
                type: types.DELETE_CONTACT, 
                payload: id
            });

        } catch (err) {
            
            dispatch({ 
                type: types.CONTACT_ERROR, 
                payload: err.response.msg 
            });
        }

    }
    
    // Update contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            
            // dispacth to our reducer
            dispatch({ 
                type: types.UPDATE_CONTACT, 
                payload: res.data
            });

        } catch (err) {
            
            dispatch({ 
                type: types.CONTACT_ERROR, 
                payload: err.response.msg 
            });
        }
    }

    // Clear contact
    const clearContacts = () => {
        dispatch({ type: types.CLEAR_CONTACTS });
    }

    // Set current contact
    const setCurrent = contact => {
        dispatch({ type: types.SET_CURRENT, payload: contact });
    };

    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: types.CLEAR_CURRENT });
    };

    // Filter contacts
    const filterContacts = text => {
        dispatch({ type: types.FILTER_CONTACTS, payload: text});
    }

    // Clear filter
    const clearFilter = () => {
        dispatch({ type: types.CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;

