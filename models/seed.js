//// IMPORT DEPENDENCIES ////

const mongoose = require('./connection')
const Bottle = require('./bottle')

//// SEED CODE ////

const db = mongoose.connection
console.log('db in seed', db)
db.on('open', () => {
	const startBottles = [
		       // name, location, datePurchased, holdingTime, holdingExpiration, volumeRemaining, sharing, sharedWith
               { 
                name: 'Hibiki', 
                location: 'The Mandarin', 
                datePurchased: new Date(2022, 12, 15)
            },{ 
                name: 'Johnnie Walker Black Label', 
                location: 'Nokal', 
                datePurchased: new Date(2023, 1, 2),
                holdingTime: 90,
                holdingExpiration: new Date(2023, 4, 2),
                volumeRemaining: 375,
                sharing: true,
                sharedWith: 'Noli'
            },{ 
                name: 'Sake', 
                location: 'Izakaya', 
                datePurchased: new Date(2022, 12, 1)
            },{ 
                name: 'Premium Sake', 
                location: 'Izakaya', 
                datePurchased: new Date(2022, 12, 8)
            },{ 
                name: 'White Wine', 
                location: 'Izakaya', 
                datePurchased: new Date(2023, 1, 23)
            },{ 
                name: 'Don Julio 1942', 
                location: 'Sofitel', 
                datePurchased: new Date(2022, 11, 26)
            },{ 
                name: 'Casamigos Blanco', 
                location: 'Salon de Ning', 
                datePurchased: new Date(2023, 1, 30)
            },{ 
                name: 'Clase Azul Reposado', 
                location: 'Nobu', 
                datePurchased: new Date(2022, 10, 31)
            },{ 
                name: 'Casamigos Reposado', 
                location: 'Salon de Ning', 
                datePurchased: new Date(2023, 1, 6)
            },{ 
                name: 'Johnnie Walker Black Label', 
                location: 'Nobu', 
                datePurchased: new Date(2022, 11, 14)
            },{ 
                name: 'Hibiki', 
                location: 'XYLO', 
                datePurchased: new Date(2022, 12, 31)
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
