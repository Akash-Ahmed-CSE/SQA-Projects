How to extract data for reporting in jmeter
============================================
Dear Concerned, 

I’ve completed performance test on frequently used API for test App. 
Test executed for the below mentioned scenario in https://ajkerdeal.com/

01 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 1.9 And Total Concurrent API requested: 226.
02 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 3.450 And Total Concurrent API requested: 452.
04 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 6 And Total Concurrent API requested: 904.
05 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 7 And Total Concurrent API requested: 1130.
09 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 12 And Total Concurrent API requested: 2260.
10 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 11 And Total Concurrent API requested: 3982.
12 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 11 And Total Concurrent API requested: 2237.
15 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 10 And Total Concurrent API requested: 8476.

While executed 15 concurrent request, found  101 request got connection timeout and error rate is 1.19%. 

Summary: Server can handle almost concurrent 1 API call with almost zero (0) error rate.

Please find the details report from the attachment and  let me know if you have any further queries. 
