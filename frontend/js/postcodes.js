document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login if no token is found
        window.location.href = 'index.html';
    }

    const postalCodeModal = document.getElementById('postalCodeModal');
    const modalTitle = document.getElementById('modalTitle');
    const postalCodeForm = document.getElementById('postalCodeForm');
    const postalCodeList = document.getElementById('postalCodeList');
    const addPostalCodeBtn = document.getElementById('addPostalCodeBtn');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Function to fetch and display postal codes
    function fetchPostalCodes() {
        fetch('http://localhost:3000/postcodes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            postalCodeList.innerHTML = ''; // Clear existing list
            data.forEach(postcode => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${postcode.postcodeID}</td>
                    <td>${postcode.Latitude}</td>
                    <td>${postcode.Longitude}</td>
                    <td>${postcode.postcode}</td>
                    <td>
                        <button class="editBtn" data-id="${postcode.postcodeID}">Edit</button>
                        <button class="deleteBtn" data-id="${postcode.postcodeID}">Delete</button>
                    </td>
                `;
                postalCodeList.appendChild(row);
            });

            // Add event listeners for edit and delete buttons
            document.querySelectorAll('.editBtn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const postId = btn.getAttribute('data-id');
                    openModal('Update Postal Code', postId);
                });
            });

            document.querySelectorAll('.deleteBtn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const postId = btn.getAttribute('data-id');
                    deletePostalCode(postId);
                });
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // Function to open modal for adding/updating postal code
    function openModal(title, postId = '') {
        modalTitle.textContent = title;
        if (postId) {
            // Fetch postal code details for update
            fetch(`http://localhost:3000/postcodes/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                // Fill form fields with existing data
                document.getElementById('postIdInput').value = postId;
                document.getElementById('postcodeID').value = data.postcodeID;
                document.getElementById('latitude').value = data.Latitude;
                document.getElementById('longitude').value = data.Longitude;
                document.getElementById('postcodeName').value = data.postcode;

                // Show modal
                postalCodeModal.style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
        } else {
            // Clear form fields for new entry
            postalCodeForm.reset();
            // Show modal
            postalCodeModal.style.display = 'block';
        }
    }

    // Function to close modal
    function closeModal() {
        postalCodeModal.style.display = 'none';
    }

    // Event listener for Add Postal Code button
    addPostalCodeBtn.addEventListener('click', function() {
        openModal('Add Postal Code');
    });

    // Event listener for close button in modal
    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    // Event listener for form submission (Add or Update Postal Code)
    postalCodeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const postId = document.getElementById('postIdInput').value;
        const postData = {
            postcodeID: document.getElementById('postcodeID').value,
            Latitude: document.getElementById('latitude').value,
            Longitude: document.getElementById('longitude').value,
            postcode: document.getElementById('postcodeName').value
        };

        let url = 'http://localhost:3000/postcodes';
        let method = 'POST';

        if (postId) {
            // If postId exists, update existing postal code
            url += `/${postId}`;
            method = 'PUT';
        }

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save postal code');
            }
            closeModal();
            fetchPostalCodes(); // Refresh postal codes list
        })
        .catch(error => console.error('Error:', error));
    });

    // Function to delete postal code
    function deletePostalCode(postId) {
        if (confirm('Are you sure you want to delete this postal code?')) {
            fetch(`http://localhost:3000/postcodes/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete postal code');
                }
                fetchPostalCodes(); // Refresh postal codes list
            })
            .catch(error => console.error('Error:', error));
        }
    }

    // Initial fetch of postal codes on page load
    fetchPostalCodes();
});
