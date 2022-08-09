const checkMillionDollarIdea = (req, res, next) => {
    const valueOfIdea = req.body.numWeeks * req.body.weeklyRevenue;
    if (valueOfIdea >= 1000000) {
        next();
    } else res.status(400).send('Not a million dollar idea')
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
