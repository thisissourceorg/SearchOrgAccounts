import { LightningElement, track } from 'lwc';
import getLatestCreatedAccounts from '@salesforce/apex/AccountSearch.getLatestCreatedAccounts';
import getSearchedAccounts from '@salesforce/apex/AccountSearch.getSearchedAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Account Name', fieldName: 'recordLink', type: 'url', typeAttributes: { label: { fieldName: 'Name__c' }, tooltip:  { fieldName: 'Name__c' }, target: '_self'}},
    { label: 'Billing Country', fieldName: 'BillingCountry__c', type: 'text' },
    { label: 'Number Of Open Opportunities', fieldName: 'Number_Of_Open_Opportunities_c__c', type: 'number' },
    { label: 'Number Of Contacts', fieldName: 'Number_of_Contacts_c__c', type: 'number' },
]

export default class CustomRecordSearch extends LightningElement {
    searchKey;
    @track accounts;
    columns = COLUMNS;
    isLoading = false;

    /**
     * Connected callback hook
     * Calls an apex method to fetch latest created 5 accounts
     */
    connectedCallback() {
        this.isLoading = true;
        getLatestCreatedAccounts({})
        .then(result => {
            if(result) {
                this.accountsDataHelper(result);
            }
            this.isLoading = false;
        })
        .catch( error=>{
            this.isLoading = false;
            this.accounts = null;
            const event = new ShowToastEvent({
                title: 'Error',
                message: error.message,
                variant: 'error'
            });
            this.dispatchEvent(event);
        });
    }

    /**
     * Handler method to set search key
     * @param {*} event 
     */
    handleSearchKeyChange(event){
        this.searchKey = event.target.value.trim();
    }

    /**
     * Methods gets called when search button is clicked
     * Calls an apex method to fetch accounts based on search key
     */
    searchButtonClicked(){
        this.isLoading = true;
        if(this.searchKey != null && this.searchKey != '') {
            getSearchedAccounts({searchKey: this.searchKey})
            .then(result => {
                if(result) {
                    this.accounts = [];
                    this.accountsDataHelper(result);
                }
                this.isLoading = false;
            })
            .catch( error=>{
                this.isLoading = false;
                this.accounts = null;
                const event = new ShowToastEvent({
                    title: 'Error',
                    message: error.message,
                    variant: 'error'
                });
                this.dispatchEvent(event);
            });
        }
        else {
            this.isLoading = false;
            const event = new ShowToastEvent({
                title: 'Warning',
                message: 'Please Add Search Key',
                variant: 'warning'
            });
            this.dispatchEvent(event);
        }
    }

    /**
     * Helper function to process returned accounts and created account hyperlink
     * @param {*} returnedAccounts 
     */
    accountsDataHelper(returnedAccounts) {
        var tempAccountList = [];
        for (var i = 0; i < returnedAccounts.length; i++) {
            let tempAccountRecord = Object.assign({}, returnedAccounts[i]); //cloning object
            tempAccountRecord.recordLink = "/" + tempAccountRecord.Id;
            tempAccountList.push(tempAccountRecord);
        }
        this.accounts = tempAccountList;
    }
}