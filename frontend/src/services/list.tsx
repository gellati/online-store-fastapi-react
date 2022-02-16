

export function getList() {
    return fetch('http://localhost:8000/api/v1/products')
        .then(data => data.json())
}

export function setItem(item:any) {
    return fetch('http://localhost:8000/api/v1/products', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item })
    })
    .then(data => data.json())
}