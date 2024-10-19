import { useEffect, useState } from 'react';
import './App.css';
import { getEmails } from './utils/api';
import EmailList from './components/EmailList';
import EmailBody from './components/EmailBody';

function App() {
  const [emails, setEmails] = useState([])
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filterType, setFilterType] = useState('all'); 

  useEffect(() => {
    const fetchEmails = async () => {
      const emailData = await getEmails();
      const emailsWithStatus = emailData.map((email) => ({
        ...email,
        favorite: false, 
        read: false     
      }));
      setEmails(emailsWithStatus);
    };

    fetchEmails();
  }, []);

  const handleEmailClick = (email) => {
    setSelectedEmail({
      id: email.id,
      subject: email.subject,
      date: email.date,
      sender: email.from
    });

    // Mark the clicked email as read
    setEmails((prevEmails) =>
      prevEmails.map((e) =>
        e.id === email.id ? { ...e, read: true } : e
      )
    );

  };

  const handleFavoriteToggle = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, favorite: !email.favorite } : email
      )
    );
  };

  // Function to filter emails based on filterType
  const getFilteredEmails = () => {
    if (filterType === 'favorites') {
      return emails.filter((email) => email.favorite);
    } else if (filterType === 'read') {
      return emails.filter((email) => email.read);
    } else if (filterType === 'unread') {
      return emails.filter((email) => !email.read);
    }
    return emails; 
  };

  return (
    <>
      <main className='container'>
        <div className='content'>
        <div className='filter-buttons'>
          <p>Filter By : </p>
          <a onClick={() => setFilterType('unread')}>Unread</a>
          <a onClick={() => setFilterType('read')}>Read</a>
          <a onClick={() => setFilterType('favorites')}>Favorites</a>
        </div>
          <div className="app">
            <div className={`email-container ${selectedEmail ? 'split-view' : ''}`}>
              <div className="email-list-section">
                <EmailList emails={getFilteredEmails()} onEmailSelect={handleEmailClick} />
              </div>
              <div className="email-body-section">
                {selectedEmail &&
                  <EmailBody
                    emailId={selectedEmail.id}
                    subject={selectedEmail.subject}
                    date={selectedEmail.date}
                    sender={selectedEmail.sender}
                    email={selectedEmail}
                    onFavoriteToggle={handleFavoriteToggle}
                  />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
