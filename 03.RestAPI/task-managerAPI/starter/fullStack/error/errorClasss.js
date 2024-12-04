class customApiError extends Error
{
    constructor(message,statusCode)
    {
        super(message);
        this.statusCode=statusCode;//adding status code property
    }
}

const createCustomError=(msg,statusCode)=>{
    return new customApiError(msg,statusCode);
}

export {createCustomError,customApiError};