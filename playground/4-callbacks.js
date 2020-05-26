const geocode = (address, callback) => {
    return setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        callback(address, data)
    }, 2000)
}
function getData(address, data){
    console.log(address, ':\n' ,  data);
}
geocode('Philadelpia', getData)