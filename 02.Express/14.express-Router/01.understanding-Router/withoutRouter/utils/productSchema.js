 export const sortProduct_Schema={
        sort:{
            in:['query'],
            notEmpty:{errorMessage:"sort cannot be empty"},
            isLength:{options:{min:3,max:3},errorMessage:"Small"},
            isString:{errorMessage:"sort parameter value should be string"}}
};
    export const createProduct_Schema={
        productName:{
            in:['body'],
            notEmpty:{errorMessage:"product name cannot be empty"},
            isLength:{options:{min:4,max:20},errorMessage:"Product name must be atleat 5 character long and max 20 character long"},
            isString:{errorMessage:"product Name must be a string"}
        },
        qty:{
            in:['body'],
            notEmpty:{errorMessage:"qty cannot be empty"},
            isLength:{options:{max:3},errorMessage:"should not exceed more than 3"}
        }
    };
    
    export const updateProduct_Schema={
        pid:{
            in:['params'],
            toInt:true,
            isNumeric:{
                errorMessage:"product id should be number"
            },
            custom:{
                options: (value) => {
                const length = value.toString().length;
                if (length<1||length >3) { // Validate length (1-3 digits)
                    throw new Error('Product ID must be a valid length (1-3 digits).');
                }
                return true; 
            }}
        }
    };
    
    
    export const deleteProduct_Schema={
        pid:{
            in:['params'],
            toInt:true,
            isNumeric:{
                errorMessage:"product id should be number"
            },
            custom:{
                options: (value) => {
                const length = value.toString().length;
                if (length<1||length >3) { // Validate length (1-3 digits)
                    throw new Error('product ID must be a valid length (1-3 digits).');
                }
                return true; 
            }}
        }
    };
    
    
    export const patchProduct_Schema={
        pid:{
            in:['params'],
            toInt:true,
            isNumeric:{
                errorMessage:"product id should be number"
            },
            custom:{
                options: (value) => {
                const length = value.toString().length;
                if (length<1||length >3) { // Validate length (1-3 digits)
                    throw new Error('product ID must be a valid length (1-3 digits).');
                }
                return true; 
            }}
        }
    };