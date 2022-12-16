public virtual inherited sharing class ExternalObjQuery 
{
    public static List<SObject> records(List<SObject> records)
    {
        return instance.passThrough(records);
    }
    
    static ExternalObjQuery instance = new ExternalObjQuery();
    @TestVisible static void setMock(ExternalObjQuery mock) { instance = mock; }
    
    protected virtual List<SObject> passThrough(List<SObject> records)
    {
        return records;
    }
}