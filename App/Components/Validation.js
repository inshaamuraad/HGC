import React, { Component } from 'react';
class Validation extends React.Component {
    emailValidation(email) {
        
        var res = false;
        if (email != null) {
            if (email.length == 0) {
                res = 'Please enter an email address';
            }
            else {
                res = true;
                
            }
        }
        return res;
        

    }

    passwordValidation(pass) {
        res = false;
        if (pass != null) {
            if (pass.length == 0) {
                res = 'Please Enter a Password';
            }
            else {
                res = true;
            }
        }
        return res;
    }
    confirmPasswordValidation(confirmPass) {
        res = false;
        if (confirmPass != null) {
            if (confirmPass.length == 0) {
                res = 'Please Enter a Confirm Password';
            }
            else {

                res = true;
            }
        }
        return res;
    }
    passwordNotMatchedValidation(pass, confirmPass) {
        res = false;
        if (confirmPass != null && pass != null) {
            if (pass != confirmPass) {
                res = 'Password not Matched';
            }
            else {

                res = true;
            }
        }
        return res;
    }
    nameValidation(name) {
        var res = false;
        if (name != null) {
            if (name.length == 0) {
                res = 'Please Enter User Name';
            }
            else {
                res = true;
            }
        }
        return res;
    }
    usernameValidation(name) {
        var res = false;
        if (name != null) {
            if (name.length == 0) {
                res = 'Please Enter User Name';
            }
            else {
                res = true;
            }
        }
        return res;
    }

}
export default Validation;