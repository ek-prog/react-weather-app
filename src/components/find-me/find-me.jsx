import React, {useState, useEffect} from "react";
const FindMe = () =>{

// const API_key_yandex = '905a83a5-04b2-4f94-a08f-ce094f8b277c';
    const [location, setLocation] = useState({
        coordinates: {lat: "", lng: ""},
    });


    // const [latitude, setLatitude] = useState('');
    // const [longitude, setLongitude] = useState('');
    const [cityName, setCityName] = useState('');

    const [isLoaded, setIsLoaded] = useState(false);


    const success = (location) =>{
        setLocation({
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

let latitude = location.coordinates.lat;
let longitude = location.coordinates.lng;

    const error = error =>{
        setLocation({
           error,
        });
    };

    useEffect(()=>{
        if(!("geolocation" in navigator)){
            error({
                code: 0,
                message: 'Geolocation не поддерживается вашим браузером',
            });
        }
        navigator.geolocation.getCurrentPosition(success, error)
    }, []);



    useEffect(()=>{
        fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=905a83a5-04b2-4f94-a08f-ce094f8b277c&geocode=${longitude},${latitude}&format=json&kind=locality`)
            .then(res => res.json())
            .then(
                (result) => {
                    if (! result
                        .response
                        .GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName){
                        alert('Введите город');
                    }else {
                        setCityName(
                            result
                                .response
                                .GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName)


                        console.log(result.response.GeoObjectCollection.featureMember[0].GeoObject.description);
                        console.log(result.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName);
                        setIsLoaded(true);
                    }
            })

    }, []);


    return(
        <p>{cityName} .</p>
        // <FindMe cityName={cityName} />

    );

};
export default FindMe;