exports.verifyNumberPhone = ({phoneNumber}) =>{
    var regex = /^(0|\+33|0033)[1-9]([-. ]?[0-9]){8}$/;
    // possibilité de pas separer les chiffres
    // possibilite de les separer avec espace, . ou -

    if (regex.test(phoneNumber)) {
        return true; 
    } else {
        return false; 
    }

}

exports.verifyEmail = (email) =>{
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}