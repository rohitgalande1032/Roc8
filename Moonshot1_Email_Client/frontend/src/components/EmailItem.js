import React from 'react'

const EmailItem = ({email, onEmailSelect}) => {

  const {from, subject, short_description, date} = email

  const formattedDate = new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
});
  return (
    <div className={`email-item ${email.read ? 'email-read' : 'email-unread'}`} onClick={() => onEmailSelect(email)}>
      <div className="avatar">{from.name.charAt(0).toUpperCase()}</div>
      <div className="email-details">
        <div className="from">From <span className='bold'>Foo Bar: {from.email}</span></div>
        <div className="subject">Subject: <span className='bold'>{subject}</span></div>
        <div className="description">{short_description}</div>
        <div className='favorite'>
            <div className="date">{formattedDate}</div>
            {email.favorite && <span className="favorite-label">Favorite</span>}
        </div>
    
      </div>
    </div>
  )
}

export default EmailItem