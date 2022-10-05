import React from 'react'
import axios from "axios";


let basic_url = 'https://hgcradio.org/api/'
export default class AppServices extends React.Component {


    async getApi() {

        var res = null;
        var url = basic_url + 'albums';

        try {
            await axios.get(url).then((response) => {
                res = response;

            });
        } catch (err) {
            return false;
        }
        return res;


    };


    async getAlbumSongs(id) {

        var res = null;
        var url = basic_url + 'album/' + id;

        try {
            await axios.get(url).then((response) => {
                res = response;

            });
        } catch (err) {
            return false;
        }
        return res;


    };
    async getHistory() {

        var res = null;
        var url = basic_url + 'history';

        try {
            await axios.get(url).then((response) => {
                res = response;

            });
        } catch (err) {
            return false;
        }
        return res;


    };
    async getSchedule() {

        var res = null;
        var url = basic_url + 'schedule';

        try {
            await axios.get(url).then((response) => {
                res = response;

            });
        } catch (err) {
            return false;
        }
        return res;


    };

    async getHost() {

        var res = null;
        var url = basic_url + 'hosts';

        try {
            await axios.get(url).then((response) => {
                res = response;

            });
        } catch (err) {
            return false;
        }
        return res;


    };
    async getCurrentSong() {

        var res = null;
        var url = basic_url + 'on-air';

        try {
            await axios.get(url).then((response) => {
                res = response;
            });
        } catch (err) {
            return false;
        }
        return res;


    };
    async getHostIndivitual(id) {

        var res = null;
        var url = basic_url + 'host/' + id;

        try {
            await axios.get(url).then((response) => {
                res = response;

            });
        } catch (err) {
            return false;
        }
        return res;


    };

    async contactDataStore(name, email, message) {

        var res = null;

        const body = {
            name: name,
            email: email,
            message: message
        }
        var url = basic_url + 'contact';
        try {
            await axios.post(url, body).then((response) => {
                res = response;

            });
        } catch (err) {
            return false;
        }
        return res;


    };

    async storeRegisterData(name, email, username, password, password_confirmation) {
        var res = null;

        const body = {
            name: name,
            email: email,
            username: username,
            password: password,
            password_confirmation: password_confirmation
        }
        debugger
        try {
            await axios.post("https://hgcradio.org/api/auth/register", body).then((response) => {
                res = response;
                debugger

            });
        } catch (error) {
            return res = error;
        }
        return res;


    };
    async storeRegisterArtist(name, email, password, confirmPassword, city, state, zipCode, country) {
        var res = null;

        const body = {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
            city: city,
            state: state,
            zip: zipCode,
            country: country
        }
        debugger
        try {
            await axios.post("https://hgcradio.org/api/auth/register/artist", body).then((response) => {
                res = response;
                debugger

            });
        } catch (error) {
            return res = error;
        }
        return res;


    };
    async storeLoginData(email, password) {
        var res = null;
        const body = {
            email: email,
            password: password,
        }
        debugger
        try {
            await axios.post("https://hgcradio.org/api/auth/login", body).then((response) => {
                res = response;
                debugger

            });
        } catch (error) {
            return res = error;
        }
        return res;


    };
    async fetchPayment(type, type_id, token) {

         
        var res = null;
     
        const headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const body = {
            type: type,
            type_id: type_id,
        }
        debugger
        try {
            await axios.post("https://hgcradio.org/api/payment-token", body, { headers: headers }).then((response) => {
                res = response;
                debugger

            });
        } catch (error) {
            return res = error;
        }
        return res;


    };


    async previousPayment(token) {

        var res = null;
     
        const headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        try {
            await axios.get("https://hgcradio.org/api/purhcased/music", { headers: headers }).then((response) => {
                res = response;

            });
        } catch (error) {
            return res = error;
        }
        return res;


    };

    async downloadSong(token, id) {

        var res = null;
     
        const headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        debugger
        try {
            await axios.get("https://hgcradio.org/api/purhcased/album/" + id, { headers: headers }).then((response) => {
                res = response;

            });
        } catch (error) {
            return res = error;
        }
        return res;


    };

    async OTPVerify(otp) {
        var res = null;
        const body = {
            otp: otp,
        }
        debugger
        try {
            await axios.post("https://hgcradio.org/api/auth/verify-otp", body).then((response) => {
                res = response;
                debugger

            });
        } catch (error) {
            debugger
            return res = error.response.data.message;
        }
        return res;

    }

    async RegisterOTPVerify(email, otp) {
        var res = null;
        const body = {
            email: email,
            otp: otp,
        }
        debugger
        try {
            await axios.post("https://hgcradio.org/api/auth/register/verification", body).then((response) => {
                res = response;
                debugger

            });
        } catch (error) {
            debugger
            return res = error.response.data.message;
        }
        return res;

    }

    async forgetPassword(email) {
        var res = null;
        const body = {
            email: email,
        }
        debugger
        try {
            await axios.post("https://hgcradio.org/api/auth/forget-password", body).then((response) => {
                res = response;
                debugger

            });
        } catch (error) {
            return res = error;
        }
        return res;


    };

    async GuestBookDataStore(name, email, country, city, state, invite_name, invite_email, invite_country, invite_city, invite_state, message) {

        var res = null;

        const body = {
            name: name,
            email: email,
            country: country,
            city: city,
            state: state,
            invite_name: invite_name,
            invite_email: invite_email,
            invite_city: invite_city,
            invite_state: invite_state,
            invite_country: invite_country,
            message: message
        }
        var url = basic_url + 'subscribe';
        try {
            await axios.post(url, body).then((response) => {
                res = response;

            });
        } catch (err) {
            return false;
        }
        return res;
    };


    async commentStore(name, email, country, city, state, host_id, comment) {

        var res = null;
        const body = {
            name: name,
            email: email,
            city: city,
            state: state,
            country: country,
            host_id: host_id,
            comment: comment
        }
        var url = 'https://hgcradio.org/api/comment';
        try {
            await axios.post((url), body).then((response) => {
                res = response;
            });
        } catch (err) {
            res = err;
        }
        return res;
    };
}
