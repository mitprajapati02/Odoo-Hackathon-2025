/**
 * Utility to mock or call an API to get the base currency code for a country.
 * In a production app, this would query the REST Countries API.
 */
const getCountryCurrency = (countryName) => {
    // Mock lookup based on country name (must match frontend selection)
    const currencyMap = {
        'United States': 'USD',
        'United Kingdom': 'GBP',
        'India': 'INR',
        'Ukraine': 'UAH', // For the user's test case
        'Germany': 'EUR',
    };
    
    // Return the corresponding currency code, default to USD if not found.
    return currencyMap[countryName] || 'USD'; 
};

/**
 * Utility to fetch the conversion rate between two currencies.
 */
const getExchangeRate = async (baseCurrency, targetCurrency) => {
    // Replace with actual logic calling the ExchangeRate API if needed for expense conversion later.
    // For now, we return 1.0 for mock data.
    return 1.0; 
};

module.exports = { getCountryCurrency, getExchangeRate };
