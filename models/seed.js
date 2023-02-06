//// IMPORT DEPENDENCIES ////

const mongoose = require('./connection')
const Bottle = require('./bottle')

//// SEED CODE ////

const db = mongoose.connection
console.log('db in seed', db)
db.on('open', () => {
	const startBottles = [
		       // brand, type, location, datePurchased, imageURL, keepTime, keepExpiration, volumeRemaining, sharing, sharedWith
               { 
                brand: 'Akashi',
                type: 'Scotch',
                location: 'Bank Bar',
                datePurchased: new Date (2022, 10, 14),
                imageURL: 'https://i.imgur.com/qMyJ1rx.png',
                keepTime: 60,
                volumeRemaining: 500,
                sharing: true, 
                sharedWith: 'Buddy, Johnv, Noli, Robert, Yuan'
            },{ 
                brand: 'Banhez',
                type: 'Mezcal',
                location: 'Pablo Bistro',
                datePurchased: new Date (2022, 10, 28),
                imageURL: 'https://i.imgur.com/WhFEKKy.png',
                keepTime: 45,
                volumeRemaining: 375,
                sharing: false
            },{ 
                brand: 'Don Julio 70',
                type: 'Tequila',
                location: 'Ralph\'s Wine Bar',
                datePurchased: new Date (2022, 11, 11),
                imageURL: 'https://i.imgur.com/dxtOo4T.png',
                keepTime: 30,
                volumeRemaining: 10,
                sharing: true,
                sharedWith: 'Joe'
            },{ 
                brand: 'Corralejo',
                type: 'Tequila',
                location: 'Casa Morales',
                datePurchased: new Date (2022, 11, 25),
                imageURL: 'https://i.imgur.com/nNnFgRI.png',
                keepTime: 180,
                volumeRemaining: 750,
                sharing: false
            },{ 
                brand: 'Hibiki',
                type: 'Japanese Whisky',
                location: 'Martini\'s',
                datePurchased: new Date (2022, 12, 09),
                imageURL: 'https://i.imgur.com/OxKx3N1.png',
                keepTime: 90,
                volumeRemaining: 5,
                sharing: true,
                sharedWith: 'Dondi'
            },{ 
                brand: 'Lagavulin',
                type: 'Scotch Whisky',
                location: 'Casa Morales',
                datePurchased: new Date (2022, 12, 23),
                imageURL: 'https://i.imgur.com/Ik8C2PL.png',
                keepTime: 180,
                volumeRemaining: 750,
                sharing: false
            },{ 
                brand: 'Japanese',
                type: 'Sake',
                location: 'Casa Morales',
                datePurchased: new Date (2023, 01, 06),
                imageURL: 'https://i.imgur.com/ArfO2ha.png',
                keepTime: 180,
                volumeRemaining: 750,
                sharing: false
            },{ 
                brand: 'Stolichnaya Gold',
                type: 'Vodka',
                location: 'Casa Morales',
                datePurchased: new Date (2023, 01, 20),
                imageURL: 'https://i.imgur.com/gb03VaA.png',
                keepTime: 180,
                volumeRemaining: 750,
                sharing: false
            }
	]


	Bottle.remove({})
        .then(deletedBottles => {
		    console.log('this is what remove returns', deletedBottles)
            Bottle.create(startBottles)
                .then((data) => {
                    console.log('Here are the new seed bottles', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
	    })
        .catch(error => {
            console.log(error)
            db.close()
        })
})
