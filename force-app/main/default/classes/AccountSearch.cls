public with sharing class AccountSearch {
    /**
     * Method takes a search key as parameter
     * Query external accounts with name contianing the search key
     */
    @AuraEnabled(Cacheable = true)
    public static List<Account__x> getSearchedAccounts(String searchKey) 
    {
        searchKey = '%' + searchKey + '%';
        List<Account__x> accountList = ExternalObjQuery.records([Select  DisplayUrl, Name__c, BillingCountry__c,
                                                                 Number_Of_Open_Opportunities_c__c,Number_of_Contacts_c__c 
                                                                 From Account__x Where Name__c LIKE :searchKey]);
        if(accountList.size() > 0) 
        {
            return accountList; 
        }
        return null;
    }

    /**
     * Method query and returns 5 latest created accounts
     */
    @AuraEnabled(Cacheable = true)
    public static List<Account__x> getLatestCreatedAccounts() 
    {
        List<Account__x> accountList = ExternalObjQuery.records([Select  DisplayUrl, Name__c, BillingCountry__c,
                                        Number_Of_Open_Opportunities_c__c,Number_of_Contacts_c__c 
                                        From Account__x order by CreatedDate__c desc Limit 5]);
        if(accountList.size() > 0) 
        {
            return accountList; 
        }
        return null;
    }
}