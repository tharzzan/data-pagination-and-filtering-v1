const daftar = {
    title: "Mr",
    first: "Andy",
    last: "Hartono",
}

function createElement(elementType, propObj) {
    // const element = document.createElement(elementType)
    alert (`element: ${elementType}`)

    for (let i = 0; i < Object.keys(propObj).length; i++) {
       const prop = Object.keys(propObj)[i]
       const value = propObj[prop]
       
    //    element[prop] = value
        alert (`${prop} / ${value}`)
    }

    // return element
 }

createElement('div',daftar)
// alert(daftar.first)

// alert(Object.keys(daftar))