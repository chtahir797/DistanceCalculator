document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login if no token is found
        window.location.href = 'index.html';
    }

    const postcode1Dropdown = document.getElementById('postcode1');
    const postcode2Dropdown = document.getElementById('postcode2');
    const calculateBtn = document.getElementById('calculateBtn');
    const distanceResult = document.getElementById('distanceResult');

    // Fetch postal codes from the backend and populate the dropdowns
    function fetchPostcodes() {
        fetch('http://localhost:3000/postcodes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            populateDropdown(postcode1Dropdown, data);
            populateDropdown(postcode2Dropdown, data);
        })
        .catch(error => console.error('Error:', error));
    }

    function populateDropdown(dropdown, data) {
        data.forEach(postcode => {
            const option = document.createElement('option');
            option.value = postcode.postcodeID;
            option.text = postcode.postcode;
            dropdown.appendChild(option);
        });
    }

    // Calculate distance using the Haversine formula
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const toRadians = (degree) => degree * (Math.PI / 180);

        const R = 3958.8; // Radius of the Earth in miles
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // Event listener for the Calculate Distance button
    calculateBtn.addEventListener('click', function() {
        const postcode1ID = postcode1Dropdown.value;
        const postcode2ID = postcode2Dropdown.value;

        if (postcode1ID && postcode2ID) {
            // Fetch details of the selected postal codes
            Promise.all([
                fetch(`http://localhost:3000/postcodes/${postcode1ID}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => response.json()),
                fetch(`http://localhost:3000/postcodes/${postcode2ID}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => response.json())
            ])
            .then(([postcode1, postcode2]) => {
                const distance = calculateDistance(
                    postcode1.Latitude, postcode1.Longitude,
                    postcode2.Latitude, postcode2.Longitude
                );
                distanceResult.textContent = `The distance is ${distance.toFixed(2)} miles.`;
            })
            .catch(error => console.error('Error:', error));
        } else {
            distanceResult.textContent = 'Please select both postal codes.';
        }
    });

    // Initial fetch of postal codes on page load
    fetchPostcodes();
});
