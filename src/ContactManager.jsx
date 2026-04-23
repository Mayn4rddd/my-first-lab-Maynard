import React, { useMemo, useState, useEffect } from 'react';
import './ContactManager.css';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  image: null,
};

const STORAGE_KEY = 'netflix-contacts';

function getContacts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading contacts from localStorage:', error);
    return [];
  }
}

function saveContacts(contacts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error('Error saving contacts to localStorage:', error);
  }
}

function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [modalMode, setModalMode] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [formValues, setFormValues] = useState(emptyForm);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const loadedContacts = getContacts();
    setContacts(loadedContacts);
  }, []);

  const updateContacts = (newContacts) => {
    setContacts(newContacts);
    saveContacts(newContacts);
  };

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return contacts;
    return contacts.filter((contact) =>
      [contact.name, contact.email, contact.phone, contact.address]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [contacts, search]);

  const openAddModal = () => {
    setSelectedContact(null);
    setFormValues(emptyForm);
    setModalMode('add');
  };

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setFormValues({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      image: contact.image || null,
    });
    setModalMode('edit');
  };

  const openDeleteConfirm = (contact) => {
    setSelectedContact(contact);
    setShowDeleteConfirm(true);
  };

  const closeModal = () => {
    setModalMode(null);
    setFormValues(emptyForm);
    setSelectedContact(null);
  };

  const handleFormChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleFormChange('image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveContact = (event) => {
    event.preventDefault();
    const trimmed = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      address: formValues.address.trim(),
      image: formValues.image,
    };

    if (!trimmed.name || !trimmed.email || !trimmed.phone) return;

    if (modalMode === 'edit' && selectedContact) {
      updateContacts(
        contacts.map((contact) =>
          contact.id === selectedContact.id ? { ...contact, ...trimmed } : contact,
        ),
      );
    } else {
      const nextId = Date.now();
      updateContacts([{ id: nextId, ...trimmed }, ...contacts]);
    }

    closeModal();
  };

  const handleConfirmDelete = () => {
    if (!selectedContact) return;
    updateContacts(contacts.filter((item) => item.id !== selectedContact.id));
    setShowDeleteConfirm(false);
    setSelectedContact(null);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div>
          <p className="contact-subtitle">Contacts</p>
          <h1 className="contact-title">Manage your people</h1>
        </div>

        <div className="contact-actions">
          <div className="search-wrapper">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              type="search"
              className="contact-search"
              placeholder="Search contacts"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <button className="btn btn-add-contact" onClick={openAddModal}>
            + Add Contact
          </button>
        </div>
      </div>

      <div className="contact-grid">
        {filteredContacts.length ? (
          filteredContacts.map((contact) => (
            <div className="contact-card" key={contact.id}>
              <div className="card-media">
                {contact.image ? (
                  <img src={contact.image} alt={contact.name} className="profile-photo" />
                ) : (
                  <div className="profile-fallback">
                    {contact.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
              </div>
              <div className="contact-card-body">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-meta">{contact.email}</div>
                <div className="contact-meta">{contact.phone}</div>
                <div className="contact-address">{contact.address || 'No street address'}</div>
              </div>

              <div className="card-overlay">
                <button className="overlay-button" onClick={() => openEditModal(contact)}>
                  Edit
                </button>
                <button className="overlay-button overlay-delete" onClick={() => openDeleteConfirm(contact)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h2>{search ? 'No contacts found' : 'No contacts yet'}</h2>
            <p>
              {search
                ? 'Try a different search, or add a new contact to populate the grid.'
                : 'Add your first contact to get started.'}
            </p>
          </div>
        )}
      </div>

      {modalMode && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-window">
            <div className="modal-header">
              <div>
                <p className="modal-label">{modalMode === 'edit' ? 'Edit Contact' : 'Add Contact'}</p>
                <h2>{modalMode === 'edit' ? 'Update contact details' : 'Create a new contact'}</h2>
              </div>
              <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                ×
              </button>
            </div>
            <form className="contact-form" onSubmit={handleSaveContact}>
              <label className="form-field">
                <span>Name</span>
                <input
                  value={formValues.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  required
                  placeholder="Full name"
                />
              </label>
              <label className="form-field">
                <span>Email</span>
                <input
                  type="email"
                  value={formValues.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  required
                  placeholder="email@example.com"
                />
              </label>
              <label className="form-field">
                <span>Phone</span>
                <input
                  type="tel"
                  value={formValues.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  required
                  placeholder="+639123456789"
                />
              </label>
              <label className="form-field">
                <span>Address</span>
                <input
                  value={formValues.address}
                  onChange={(e) => handleFormChange('address', e.target.value)}
                  placeholder="Street, city, state"
                />
              </label>
              <label className="form-field file-field">
                <span>Profile image</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <div className="file-helper">PNG, JPG or GIF. Optional.</div>
              </label>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {modalMode === 'edit' ? 'Save Changes' : 'Add Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && selectedContact && (
        <div className="modal-backdrop" role="alertdialog" aria-modal="true">
          <div className="modal-window modal-small">
            <div className="modal-header">
              <div>
                <p className="modal-label">Confirm delete</p>
                <h2>Remove {selectedContact.name}?</h2>
              </div>
              <button className="modal-close" onClick={() => setShowDeleteConfirm(false)} aria-label="Close delete dialog">
                ×
              </button>
            </div>
            <div className="confirm-body">
              <p>This action cannot be undone. Are you sure you want to delete this contact?</p>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </button>
                <button className="btn btn-delete" onClick={handleConfirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactManager;
