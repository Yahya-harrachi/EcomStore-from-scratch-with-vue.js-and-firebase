/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const stripe = require('stripe')('sk_test_51PLPasLfLb9j6eAEkXyKVPKiXHORppoztup2WKNRz3u8L0E9OCuUesQOhbznpOmLgmBH8cvMAW27V8ORol70j1SY00nLSn91m7npm'); // Replace 'MY_KEY_HERE' with your actual Stripe secret key

const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Function to create a Stripe checkout session with Firestore query
exports.stripeCheckout = functions.https.onCall(async (data, context) => {
    const productId = data['id'];
    console.log('product id = ' + productId);

    let price = -1;
    let name = '';
    let image = '';

    const db = admin.firestore();
    const querySnapshot = await db.collection('clothes').where('id', '==', productId).get();
    if (querySnapshot.docs.length > 0){
        const doc = querySnapshot.docs[0];
        price = doc.data().price;
        name = doc.data().name;
        image = doc.data().image;
    } else {
        console.log('Error: document with product id ' + productId + ' not found');
        return null;
    }
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            name: name,
            description: 'description!',
            images: [image],
            amount: Math.round(price * 100),
            currency: 'usd',
            quantity: 1
        }],
        mode: 'payment',
        success_url: 'https://ecomstorevue.web.app/success',
        cancel_url: 'https://ecomstorevue.web.app/cancel',
    });

    return session.id;
});

// Function to create a Stripe checkout session without Firestore query
exports.stripeCheckoutWithoutDbQueries = functions.https.onCall(async (data, context) => {
    const productName = data['productName'];
    const price = data['price'];
    const image = data['image']; // Ensure you pass image URL in the data

    console.log('data: ', data);
    console.log('product name = ', productName);
    console.log('price = ', price);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            name: productName,
            description: 'description!',
            images: [image],
            amount: Math.round(price * 100),
            currency: 'usd',
            quantity: 1
        }],
        mode: 'payment',
        success_url: 'https://ecomstorevue.web.app/success',
        cancel_url: 'https://ecomstorevue.web.app/cancel',
    });

    return session.id;
});

// Example function to generate a random number via HTTP request
exports.randomNumberRequest = functions.https.onRequest((request, response) => {
    const number = Math.round(Math.random() * 100);
    console.log('number', number);
    response.send(number.toString());
});

// Example function to generate a random number via callable function
exports.randomNumberCall = functions.https.onCall((data, context) => {
    const number = Math.round(Math.random() * 100);
    console.log('number', number);
    return number;
});
