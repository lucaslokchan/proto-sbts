const uri = "QmcqvyCNH4i7k43N3qeaZZH2rtSPCeprfUXrtFSrTQHpbx"
url = "https://ipfs.io/ipfs/" + uri

console.log(url)

fetch(url)


async function fetchAPI() {
    const response = await fetch('https://ipfs.io/ipfs/QmSMiUtwmxMAzHdute17u5CPrB2eUwBYUR4JP5KLpAHTsH');
    return response.json()
}

fetchAPI().then(response => console.log(response))

fetchAPI().then(response => {console.log(response);
                             console.log(response['description']);
                             console.log(response['image']);
                             console.log(response['attributes'][0]);
                             console.log(response['attributes'][1]);
                             console.log(response['attributes'][2]);
                            })