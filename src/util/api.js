import * as APILIST from '../constants/api.js';
import * as globals from '../util/globals';
export const API = {

    //Agent API

    getJobs: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.JOBS + data, buildHeader());
    },

    getJobsAccepted: (onResponse, data, isHeaderRequired) => {
      request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.JOBS_ACCEPTED + data, buildHeader());
  },

    applyJob: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'POST', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.JOBS + data, buildHeader());
    },

    canApplyJob: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.JOBS + data, buildHeader());
    },
    
    canReviewJob: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.JOBS + data, buildHeader());
    },

    getJobsComments: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.COMMENTS + data +'/reviews', buildHeader());
    },

    updateUser: (onResponse, data, isHeaderRequired) => {
        request(onResponse, data, 'PUT', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.UPDATE_USER, buildHeader());
    },

    updatePassword: (onResponse, data, isHeaderRequired) => {
        request(onResponse, data, 'PUT', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.UPDATE_PASSWORD, buildHeader());
    },

    getAgentCommentsProfile: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.AGENT_COMMENTS_PROFILE +'/reviews', buildHeader());
    },

    getAgentReportProfile: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.AGENT_REPORT_PROFILE + data, buildHeader());
    },
    
    setReview: (onResponse, data, job_id, isHeaderRequired) => {
        request(onResponse, data, 'POST', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.SET_REVIEW + job_id + "/review", buildHeader());
    },   
    confirmPayment: (onResponse, data, job_id, isHeaderRequired) => {
        request(onResponse, data, 'POST', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.SET_REVIEW + job_id + "/confirm_payment", buildHeader());
    },

    //Customers API

    getCustomerJobs: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.CUSTOMERS_JOBS + data, buildHeader());
    },

    agentContract: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.CUSTOMERS_JOBS + data, buildHeader());
    },

    agentReviews: (onResponse, job_id, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.AGENT_REVIEWS + job_id + "/can_review", buildHeader());
    },

    customerProperties: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.CUSTOMERS_PROPERTIES, buildHeader());
    },

    createProperties: (onResponse, data, isHeaderRequired) => {
        request(onResponse, data, 'POST', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.CUSTOMERS_PROPERTIES, buildHeader());
    },

    createJob: (onResponse, data, isHeaderRequired) => {
        request(onResponse, data, 'POST', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.CUSTOMERS_CREATEDJOB, buildHeader());
    },

    updateProperties: (onResponse, data, isHeaderRequired,id) => {
        request(onResponse, data, 'POST', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.CUSTOMERS_PROPERTIES + "/"+ id, buildHeader());
    },

    customerUpdateProfile: (onResponse, data, isHeaderRequired) => {
        request(onResponse, data, 'PUT', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.CUSTOMERS_PROFILE, buildHeader());
    },

    customerUpdatePassword: (onResponse, data, isHeaderRequired) => {
        request(onResponse, data, 'PUT', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.CUSTOMERS_PASSWORD, buildHeader());
    },

    getCity: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.GET_CITY, buildHeader());
    },

    getNeightborhoods: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.GET_NEIGHTBORHOODS + data + "/neightborhoods", buildHeader());
    },

    jobDetail: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.CUSTOMERS_JOBS + data, buildHeader());
    },

    setCustomerReview: (onResponse, data, job_id, isHeaderRequired) => {
        request(onResponse, data, 'POST', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.SET_CUSTERMER_REVIEW + job_id + "/review", buildHeader());
    },   
    
    getServiceType: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.GET_CUSTERMER_SERVICETYPE + data, buildHeader());
    },

    getNextJobsApiCall: (onResponse, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.NEXT_JOBS, buildHeader());
    },

    getHoliday: (onResponse, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.GET_HOLIDAY, buildHeader());
    },
    
    setAddCard: (onResponse, data, isHeaderRequired) => {
        request(onResponse, data, 'POST', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.ADD_CARD  , buildHeader());
    },   

    setAddInvoiceDetail: (onResponse, data, isHeaderRequired) => {
        request(onResponse, data, 'POST', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.ADD_INVOICE_DETAIL  , buildHeader());
    },

    setEditInvoiceDetail: (onResponse, data, idEdit, isHeaderRequired) => {
        request(onResponse, data, 'PUT', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.EDIT_INVOICE_DETAIL + idEdit, buildHeader());
    },

    setEditProperty: (onResponse, data, idEdit, isHeaderRequired) => {
        request(onResponse, data, 'PUT', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.EDIT_PROPERTY + idEdit, buildHeader());
    },

    getCardLists: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.GET_CARD_LIST , buildHeader());
    },

    getDetailsListsCreateJob: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.GET_DETAILS_LIST_CREATED_JOB , buildHeader());
    },

    getCustomerCommentsProfile: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.CUSTOMER_COMMENTS_PROFILE +'/reviews', buildHeader());
    },

    loginWithFacebook: (onResponse, data, isHeaderRequired) => {
        request(onResponse, data, 'POST', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.CUSTOMER_FACEBOOK_LOGIN  , buildHeader());
    },   

    destroyCard: (onResponse, id, isHeaderRequired) => {
        request(onResponse, {}, 'DELETE', 'JSON', isHeaderRequired, APILIST.BASE_URL + APILIST.DELETE_CARD + id, buildHeader());
    },

    destroyInvoice: (onResponse, id, isHeaderRequired) => {
        request(onResponse, {}, 'DELETE', 'JSON', isHeaderRequired, APILIST.BASE_URL + APILIST.DELETE_INVOICE + id, buildHeader());
    },

    detroyProperty: (onResponse, id, isHeaderRequired) => {
        request(onResponse, {}, 'DELETE', 'JSON', isHeaderRequired, APILIST.BASE_URL + APILIST.DELETE_PROPERTY + id, buildHeader());
    }
}

export const buildHeader = (headerParams = {}) => {
    var header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + globals.access_token || ''
    }
    Object.assign(header, headerParams);
    return header;
    
}

async function request(onResponse, data, type, returnType, isHeaderRequired, featureURL, secureRequest) {
    let response = '';
    let responseJSON;
    try {
        if (type === 'GET') {
            if (isHeaderRequired) {
                console.log("Request Call get with Header");
                response = await fetch(featureURL, {
                    method: type,
                    headers: secureRequest
                });
            }
            else {
                response = await fetch(featureURL, {
                    method: type,
                });
            }
        }
        else {
            response = await fetch(featureURL, {
                method: type,
                headers: secureRequest,
                body: JSON.stringify(data)
            });
        }
        if (returnType === 'TEXT') {
            responseJSON = await response.text();
        }
        else {
            responseJSON = await response.json();
        }

        if (response.status == 200) {
            onResponse.success(responseJSON);
        } else {
            onResponse.error(responseJSON);
        }
        // if (onResponse.complete) {
        //     console.log("onResponse complete");
        //     onResponse.complete();
        // }
    } catch (error) {
        console.log("ESTAMOS EN ERROR =================>>>>>>>>>>>>>",error)
        onResponse.error(responseJSON);
        // if (onResponse.complete) {
        //     console.log("onResponse catch complete");
        //     onResponse.complete();
        // }
    }
}
