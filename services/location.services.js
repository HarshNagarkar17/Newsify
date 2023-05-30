// async function getPlaceName(latitude, longitude) {
//     const apiKey = process.env.LOCATION_API; 
//     const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.results.length > 0) {
//             const { city, country } = data.results[0].components;
//             return { city, country };
//         } else {
//             console.log('Place not found');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

async function trackLocation() {
    const ipapiUrl = 'https://ipapi.co/json/';
    try {
        const response = await fetch(ipapiUrl);
        const { latitude, longitude, city, country_name } = await response.json();
        return {city, country_name};
    } catch (error) {
        console.error('Error:', error);
    }
}

// trackLocation()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

module.exports = {
    trackLocation
};
