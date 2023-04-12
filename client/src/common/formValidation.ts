
export const validateLoginInput = (username:string, password:string): boolean =>{
    if (username.length < 4){
        return false;
    }else if (password.length < 8){
        return false;
    }
    return true;
}


export const validateRegisterInput = (username:string, email:string, password:string, confirmPassword:string) : boolean => {
    if (username.length < 4){
        return false;
    }else if (email.length < 8){
        return false;
    }else if (password.length < 8){
        return false;
    }else if (password !== confirmPassword){
        return false;
    }
    return true;
}