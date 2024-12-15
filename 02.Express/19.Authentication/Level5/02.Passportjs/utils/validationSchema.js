export const user_nameSchema={
user_name:{
    in:['params'],
    notEmpty:{errorMessage:"user name cannot be empty"},
    isLength:{options:{min:4,max:32},
    errorMessage:"User name must be atleat 5 character long and max 32 character long"},
    isString:{errorMessage:"User Name must be a string"}}
};


export const sort_Schema={
    sort:{
        in:['query'],
        notEmpty:{errorMessage:"sort cannot be empty"},
        isLength:{options:{min:3,max:3},errorMessage:"Small"},
        isString:{errorMessage:"sort parameter value should be string"}}
    
};
export const createUser_Schema={
    name:{
        in:['body'],
        notEmpty:{errorMessage:"user name cannot be empty"},
        isLength:{options:{min:4,max:32},errorMessage:"User name must be atleat 5 character long and max 32 character long"},
        isString:{errorMessage:"User Name must be a string"}
    },
    age:{
        in:['body'],
        notEmpty:{errorMessage:"age cannot be empty"},
        isLength:{options:{max:3},errorMessage:"should not exceed more than 3"}
    }
};

export const update_Schema={
    id:{
        in:['params'],
        toInt:true,
        isNumeric:{
            errorMessage:"user id should be number"
        },
        custom:{
            options: (value) => {
            const length = value.toString().length;
            if (length<1||length>3) { // Validate length (1-3 digits)
                throw new Error('User ID must be a valid length (1-3 digits).');
            }
            return true; 
        }}
    }
};


export const delete_Schema={
    id:{
        in:['params'],
        toInt:true,
        isNumeric:{
            errorMessage:"user id should be number"
        },
        custom:{
            options: (value) => {
            const length = value.toString().length;
            if (length<1||length>3) { // Validate length (1-3 digits)
                throw new Error('User ID must be a valid length (1-3 digits).');
            }
            return true; 
        }}
    }
};


export const patch_Schema={
    id:{
        in:['params'],
        toInt:true,
        isNumeric:{
            errorMessage:"user id should be number"
        },
        custom:{
            options: (value) => {
            const length = value.toString().length;
            if (length<1||length>3) { // Validate length (1-3 digits)
                throw new Error('User ID must be a valid length (1-3 digits).');
            }
            return true; 
        }}
    }
};