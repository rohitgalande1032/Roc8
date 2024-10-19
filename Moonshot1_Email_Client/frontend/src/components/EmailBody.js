import React, { useState, useEffect } from 'react'
import { getEmailBody } from '../utils/api';
const EmailBody = ({ email, emailId, sender, subject, date, onFavoriteToggle }) => {
    console.log(emailId);

    const [emailBody, setEmailBody] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchEmailBody = async () => {
            setIsLoading(true)
            const body = await getEmailBody(emailId);
            setEmailBody(body);
            setIsLoading(false)
        };

        if (emailId) {
            fetchEmailBody();
        }
    }, [emailId]);

    if (isLoading) {
        return <div className="loading">Loading email content...</div>;
    }

    if (!emailBody) {
        return <div className="empty-body">No email selected</div>;
    }

    const formattedDate = new Date(date).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const decodeHtml = (html) => {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = html;
        return textArea.value;
    };

    return (
        <div className="email-body">
            <div className="email-header">
                <div className='sub-head'>
                    <div className="avatar">{sender.name.charAt(0).toUpperCase()}</div>
                    <div className="email-info">
                        <h2 className="email-subject">{subject}</h2>
                        <div className="email-date">{formattedDate}</div>
                    </div>
                </div>
                <div>
                    <button onClick={() => onFavoriteToggle(email.id)}>
                        {email.favorite ? 'Unmark Favorite' : 'Mark as Favorite'}
                    </button>
                </div>
            </div>
            <div
                className="email-content"
                dangerouslySetInnerHTML={{ __html: decodeHtml(emailBody.body) }}
            ></div>
        </div>
    );
}

export default EmailBody