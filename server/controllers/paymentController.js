const asyncError = require("../middleWare/asyncError")
const stripe = require("stripe")('sk_test_51O6vXlSFASUyNS1A2hPrsjQBsgyT1s4kQwdVcO3NFxHch2Os2yYFTRnCrse4rNBMWwKXIMGag7lYWE7Wvk8Ed3aM00QWi4swgp')

exports.processPayment = asyncError(async (req, res, next) => {
  try{
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  }
  catch(error){
    console.log(error)
    res.status(401).json({error})
  }
    
});

exports.sendStripeKey = asyncError( async(req, res, next) => {
    res.status(200).json({
        success: true,
        stripeKey: process.env.STRIPE_API_KEY,
    })
})