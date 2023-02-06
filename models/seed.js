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
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/qMyJ1rx.png',
                keepTime: 60,
                volumeRemaining: 500,
                sharing: false
            },{ 
                brand: 'Bacalhoa',
                type: 'Moscatel Wine',
                location: 'Martini\'s',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/WBWVs0P.png',
                keepTime: 90,
                volumeRemaining: 200,
                sharing: true,
                sharedWith: 'Alexis'
            },{ 
                brand: 'Banhez',
                type: 'Mezcal',
                location: 'Pablo Bistro',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/WhFEKKy.png',
                keepTime: 45,
                volumeRemaining: 375,
                sharing: false,
                sharedWith: 'Tia'
            },{ 
                brand: 'Bombay Sapphire',
                type: 'Gin',
                location: 'Casa Morales',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/XgQcPmo.png',
                keepTime: 180,
                volumeRemaining: 200,
                sharing: false
            },{ 
                brand: 'Don Julio 70',
                type: 'Tequila',
                location: 'Ralph\'s Wine Bar',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/dxtOo4T.png',
                keepTime: 30,
                volumeRemaining: 10,
                sharing: true,
                sharedWith: 'Joe'
            },{ 
                brand: 'Cellier des Princes',
                type: 'Chateauneuf du Bape',
                location: 'Casa Morales',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/FhwxVwS.png',
                keepTime: 180,
                volumeRemaining: 750,
                sharing: false
            },{ 
                brand: 'Corralejo',
                type: 'Tequila',
                location: 'Casa Morales',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/nNnFgRI.png',
                keepTime: 180,
                volumeRemaining: 750,
                sharing: false
            },{ 
                brand: 'Grey Goose',
                type: 'Vodka',
                location: 'Bank Bar',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/E0aRI4F.png',
                keepTime: 60,
                volumeRemaining: 600,
                sharing: true,
                sharedWith: 'Mia'
            },{ 
                brand: 'Hibiki',
                type: 'Japanese Whisky',
                location: 'Martini\'s',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/OxKx3N1.png',
                keepTime: 90,
                volumeRemaining: 5,
                sharing: true,
                sharedWith: 'Dondi'
            },{ 
                brand: 'Johnnie Walker',
                type: 'Scotch Whisky',
                location: 'Casa Morales',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/aL2hIEF.png',
                keepTime: 180,
                volumeRemaining: 700,
                sharing: false
            },{ 
                brand: 'Lagavulin',
                type: 'Scotch Whisky',
                location: 'Casa Morales',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/Ik8C2PL.png',
                keepTime: 180,
                volumeRemaining: 750,
                sharing: false
            },{ 
                brand: 'Chateau Siran',
                type: 'Margaux',
                location: 'Casa Morales',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/ue0EfIj.png',
                keepTime: 180,
                volumeRemaining: 750,
                sharing: false
            },{ 
                brand: 'Japanese',
                type: 'Sake',
                location: 'Casa Morales',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/ArfO2ha.png',
                keepTime: 180,
                volumeRemaining: 750,
                sharing: false
            },{ 
                brand: 'Stolichnaya',
                type: 'Vodka',
                location: 'Pablo Bistro',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/fdVkKz6.png',
                keepTime: 45,
                volumeRemaining: 150,
                sharing: true,
                sharedWith: 'Sierra'
            },{ 
                brand: 'Stolichnaya Gold',
                type: 'Vodka',
                location: 'Casa Morales',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/gb03VaA.png',
                keepTime: 180,
                volumeRemaining: 750,
                sharing: false
            },{ 
                brand: 'Tanqueray',
                type: 'Gin',
                location: 'Ralph\'s Wine Bar',
                datePurchased: new Date (2022, 11, 15),
                imageURL: 'https://i.imgur.com/7hq30MJ.png',
                keepTime: 30,
                volumeRemaining: 300,
                sharing: true,
                sharedWith: 'Kamille'
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
