let locationForm = document.getElementById('location-form');
locationForm.addEventListener('submit',displayResult);


function displayResult(e){
    e.preventDefault();
    let address = document.getElementById('location-input').value;
    address = address.replace(/ /g,'+');
    fetch(`http://localhost:60000/p?address=${address}`).then( (response) =>{
        response.json().then( (data) =>{


        let formattedAddress = `
        <ul class = 'list-group'>
            <li class = 'list-group-item'>${data.FA}</li>
        </ul>
        `;
        document.getElementById('formatted-address').innerHTML = formattedAddress;
            console.log(data.name);
        let senatorName = `
            <ul class = 'list-group'>
                <li class = 'list-group-item'>${data.name}</li>
            </ul>
            `;
            document.getElementById('mlaname').innerHTML=senatorName

        });
    } );
}