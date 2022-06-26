const axios=require('axios');
const {expect}=require('chai');


//** const value */
const url = 'https://{{base}}';
const body = {
        "description" : "text",
        "callback_url" : "string",
        "amount" : 2000
}
const header = {
    "Authentication" : "string",
    'Content-Type': 'application/json'
}

describe("PATCH test api ",async()=>{
    
    it('Execute API call with valid required parameters', async() => {
        const response = await axios.patch(
            `${url}/qr_codes/qr_code_id`,
            body,
            header
        )
    
        expect(response.status).equals(200);
        expect(response.data).to.exist;

    });

    it('[Negative Case] Execute API call with path value is empty', async() => {
        try {
            await axios.patch(
                `${url}/qr_codes/`,
                body,
                header
            );
        } catch (error) {
            expect(error.message).eqls("Request failed with status code 404");
            expect(error.code).eqls('QR_CODE_NOT_FOUND_ERROR');
            expect(error.response.status).eqls(404);
            expect(error).haveOwnProperty('message');
        }

    });

    it('[Negative Case] Execute API call with Authentication is empty', async() => {
        try {
            header.Authentication = '';
            await axios.patch(
                `${url}/qr_codes/qr_code_id'`,
                body,
                header
            );
        } catch (error) {
            expect(error.message).eqls("Request failed with status code 401");
            expect(error.response.status).eqls(401);
            expect(error).haveOwnProperty('message');
        }

    });

    it('[Negative Case] Execute API call using QR code blank or invalid callback url', async() => {
        try {
            body.callback_url = '';
            await axios.patch(
                `${url}/qr_codes/qr_code_id'`,
                body,
                header
            );
        } catch (error) {
            expect(error.message).eqls("Request failed with status code 404");
            expect(error.code).eqls('QR_CODE_NOT_FOUND_ERROR');
            expect(error.response.status).eqls(404);
            expect(error).haveOwnProperty('message');
        }

    });

    it('[Negative Case] Execute API call using QR code that has been used', async() => {
        try {
            body.callback_url = 'input url qr code that has been used';
            await axios.patch(
                `${url}/qr_codes/qr_code_id'`,
                body,
                header
            );
        } catch (error) {
            expect(error.message).eqls("Request failed with status code 400");
            expect(error.code).eqls('QR_CODE_CODE_IN_USE');
            expect(error.response.status).eqls(400);
            expect(error).haveOwnProperty('message');
        }

    });

    it('[Negative Case] Execute API call with invalid JSON format', async() => {
        try {
    
            await axios.patch(
                `${url}/qr_codes/qr_code_id'`,
                {
                    description : "text",
                    callback_url : "",
                    amount : 2000
                },
                header
            );
        } catch (error) {
            expect(error.message).eqls("Request failed with status code 400");
            expect(error.code).eqls('INVALID_JSON_FORMAT');
            expect(error.response.status).eqls(400);
            expect(error).haveOwnProperty('message');
        }

    });

    it('[Negative Case] Execute API call with amount less than 1,500 USD', async() => {
        try {
            body.amount = 100;
            await axios.patch(
                `${url}/qr_codes/qr_code_id'`,
                body,
                header
            );
        } catch (error) {
            expect(error.message).eqls("Request failed with status code 400");
            expect(error.code).eqls('API_VALIDATION_ERROR');
            expect(error.response.status).eqls(400);
            expect(error).haveOwnProperty('message');
        }

    });

    it('[Negative Case] Execute API call with amount less than 1,500 USD', async() => {
        try {
            body.amount = 100;
            await axios.patch(
                `${url}/qr_codes/qr_code_id'`,
                body,
                header
            );
        } catch (error) {
            expect(error.message).eqls("Request failed with status code 400");
            expect(error.code).eqls('API_VALIDATION_ERROR');
            expect(error.response.status).eqls(400);
            expect(error).haveOwnProperty('message');
        }

    });

})
