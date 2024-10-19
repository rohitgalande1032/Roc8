import React from 'react'
import EmailItem from './EmailItem';

const EmailList = ({ emails, onEmailSelect }) => {
    
    return (
        <div className='email-list' >
            {emails.map((email) => (
                <EmailItem key={email.id} email={email} onEmailSelect={onEmailSelect} />
            ))}
        </div>
    )
}

export default EmailList


