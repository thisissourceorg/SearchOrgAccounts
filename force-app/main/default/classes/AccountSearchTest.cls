@isTest
public class AccountSearchTest {
	class Mock extends ExternalObjQuery
    {
        final List<Account__x> externalRecords;
        Mock(List<Account__x> externalRecords)
        {
            this.externalRecords = externalRecords;
        }
        
        protected override List<SObject> passThrough(List<SObject> records)
        {
            return externalRecords;
        }
    }
    
    public static void createTestData()
    {
        List<Account__x> mockAccountRecords = new List<Account__x>();
        Account__x mockAccount = new Account__x();
        mockAccount.Name__c = 'Test Account';
        mockAccountRecords.add(mockAccount);
        
        ExternalObjQuery.setMock(new Mock(mockAccountRecords));
    }
    
    @isTest
    public static void testGetSearchedAccounts()
    {  
        createTestData();
        
        Test.startTest();
        List<Account__x> returnedAccounts = AccountSearch.getSearchedAccounts('Test');
        System.assert(returnedAccounts.size() > 0);
        Test.stopTest();
    }
    
    @isTest
    public static void testGetLatestCreatedAccounts()
    {
        createTestData();
        
        Test.startTest();
        List<Account__x> returnedAccounts = AccountSearch.getLatestCreatedAccounts();
        System.assert(returnedAccounts.size() > 0);
        Test.stopTest();
    }
}