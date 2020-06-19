import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/context';

const ContactFilter = () => {
    
    const contactContext = useContext(ContactContext);
    const text = useRef('');

    const { filtered } = contactContext;

    const onChange = e => {
        if(text.current.value !== '') {
            contactContext.filterContacts(e.target.value);
        } else {
            contactContext.clearFilter();
        }
    }

    useEffect(() => {
        if(filtered === null) {
            text.current.value = '';
        }
    });

    return (
        <div>
            <form>
                <input 
                    ref={text} 
                    type="text" 
                    placeholder="Filter Contacts..." 
                    onChange={onChange} />
            </form>
        </div>
    )
}

export default ContactFilter;
