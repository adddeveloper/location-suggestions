// This is the icons for each type of address.
const iconMap = {
    "restaurant": "bi bi-fork-knife",
    "residential": "bi bi-house",
    "house": "bi bi-house",
    "detached": "bi bi-house",
    "apartments": "bi bi-building",
    "public": "bi bi-building",
    "hotel": "bi bi-building",
    "school": "bi bi-building",
    "retail": "bi bi-shop",
    "department_store": "bi bi-shop",
    "commercial": "bi bi-briefcase",
    "industrial": "bi bi-truck",
    "yes": "bi bi-building",
    "unknown": "bi bi-geo"
};
var pickupInput = document.getElementById('from');
var suggestionsContainer = document.getElementById('suggestions');
pickupInput.addEventListener('input', async function () {
    var queryText = pickupInput.value.trim();
    if (!queryText) {
        suggestionsContainer.style.display = 'none';
        suggestionsContainer.innerHTML = '';
        return;
    }

    // Currently restricting adress to only Prince Edward Island by passing '&bbox=-64.5,45.9,-61.9,47.2' in the url. 
    var photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(queryText)}&limit=5&bbox=-64.5,45.9,-61.9,47.2`;

    var response = await fetch(photonUrl);
    var result = await response.json();

    suggestionsContainer.innerHTML = '';
    if (result.features.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    result.features.forEach(function (feature) {
        var props = feature.properties;

        let fullParts = [
            props.name,
            props.housenumber,
            props.street,
            props.city,
            props.postcode,
            props.state,
            props.country
        ];

        let full = fullParts.filter(Boolean).join(' ')
        var suggestionItem = document.createElement('div');
        suggestionItem.className = 'pac-item';

        var icon = document.createElement('span');
        var type = props.osm_value || props.osm_key;

        console.log(type, props)
        icon.className = iconMap[type] || iconMap['unknown'];

        var mainText = document.createElement('span');
        mainText.className = 'pac-item-query';
        mainText.textContent = props.name || props.street;

        var detailText = document.createElement('span');
        detailText.className = 'pac-line';

        let formattedAddress = '';

        if (["residential", "house", "apartments", "detached"].includes(type)) {
            formattedAddress = `${props.housenumber} ${props.street}, ${props.city}, ${props.postcode}`.replace(/\s+/g, ' ').trim();
        } else if (["restaurant", "retail", "commercial", "hotel", "school"].includes(type)) {
            formattedAddress = `${props.name}, ${props.street}, ${props.city}, ${props.postcode}`.replace(/\s+/g, ' ').trim();
        } else {
            formattedAddress = `${props.name || props.street}, ${props.city}, ${props.postcode}`.replace(/\s+/g, ' ').trim();
        }

        detailText.textContent = formattedAddress;

        suggestionItem.appendChild(icon);
        suggestionItem.appendChild(mainText);
        suggestionItem.appendChild(detailText);

        console.log()

        suggestionItem.addEventListener('click', function () {
            pickupInput.value = full;
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
        });

        suggestionsContainer.appendChild(suggestionItem);
    });

    suggestionsContainer.style.top = pickupInput.offsetTop + pickupInput.offsetHeight + 'px';
    suggestionsContainer.style.left = pickupInput.offsetLeft + 'px';
    suggestionsContainer.style.display = 'flex';
});

document.addEventListener('click', function (event) {
    if (!event.target.closest('.autocomplete-wrapper')) {
        suggestionsContainer.style.display = 'none';
    }
});

// This is the same code above but for the dropoff input. (DONT JUDGE! I KNOW! I KNOW. I AM JUST LAZY.)
var pickupInputto = document.getElementById('to');
var suggestionsContainerto = document.getElementById('suggestionsto');

pickupInputto.addEventListener('input', async function () {
    var queryText = pickupInputto.value.trim();
    if (!queryText) {
        suggestionsContainerto.style.display = 'none';
        suggestionsContainerto.innerHTML = '';
        return;
    }

    // Currently restricting adress to only Prince Edward Island by passing '&bbox=-64.5,45.9,-61.9,47.2' in the url. 
    var photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(queryText)}&limit=5&bbox=-64.5,45.9,-61.9,47.2`;

    var response = await fetch(photonUrl);
    var result = await response.json();

    suggestionsContainerto.innerHTML = '';
    if (result.features.length === 0) {
        suggestionsContainerto.style.display = 'none';
        return;
    }

    result.features.forEach(function (feature) {
        var props = feature.properties;

        let fullParts = [
            props.name,
            props.housenumber,
            props.street,
            props.city,
            props.postcode,
            props.state,
            props.country
        ];

        let full = fullParts.filter(Boolean).join(' ')

        var suggestionItem = document.createElement('div');
        suggestionItem.className = 'pac-item';

        var icon = document.createElement('span');
        var type = props.osm_value || props.osm_key;
        console.log(type, props)
        icon.className = iconMap[type] || iconMap['unknown'];

        var mainText = document.createElement('span');
        mainText.className = 'pac-item-query';
        mainText.textContent = props.name || props.street;

        var detailText = document.createElement('span');
        detailText.className = 'pac-line';

        let formattedAddress = '';

        if (["residential", "house", "apartments", "detached"].includes(type)) {
            formattedAddress = `${props.housenumber} ${props.street}, ${props.city}, ${props.postcode}`.replace(/\s+/g, ' ').trim();
        } else if (["restaurant", "retail", "commercial", "hotel", "school"].includes(type)) {
            formattedAddress = `${props.name}, ${props.street}, ${props.city}, ${props.postcode}`.replace(/\s+/g, ' ').trim();
        } else {
            formattedAddress = `${props.name || props.street}, ${props.city}, ${props.postcode}`.replace(/\s+/g, ' ').trim();
        }

        detailText.textContent = formattedAddress;

        suggestionItem.appendChild(icon);
        suggestionItem.appendChild(mainText);
        suggestionItem.appendChild(detailText);

        suggestionItem.addEventListener('click', function () {
            pickupInputto.value = full;
            suggestionsContainerto.innerHTML = '';
            suggestionsContainerto.style.display = 'none';
        });

        suggestionsContainerto.appendChild(suggestionItem);
    });

    suggestionsContainerto.style.top = pickupInputto.offsetTop + pickupInputto.offsetHeight + 'px';
    suggestionsContainerto.style.left = pickupInputto.offsetLeft + 'px';
    suggestionsContainerto.style.display = 'flex';
});

document.addEventListener('click', function (event) {
    if (!event.target.closest('.autocomplete-wrapper')) {
        suggestionsContainerto.style.display = 'none';
    }
});