How to extract data for reporting in jmeter
============================================
Dear Concerned, 

I’ve completed performance test on frequently used API for test App. 
Test executed for the below mentioned scenario in https://ajkerdeal.com/

01 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 226 And Total Concurrent API requested: 1400.
02 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 452 And Total Concurrent API requested: 1400.
04 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 904 And Total Concurrent API requested: 1400.
05 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 1130 And Total Concurrent API requested: 1400.
09 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 2260 And Total Concurrent API requested: 2100.
10 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 3982 And Total Concurrent API requested: 2100.
12 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 2237 And Total Concurrent API requested: 2800.
15 Concurrent Request with 02 Loop Count; Avg TPS for Total Samples is ~ 8476 And Total Concurrent API requested: 3500.

While executed 15 concurrent request, found  101 request got connection timeout and error rate is 1.19%. 

Summary: Server can handle almost concurrent 1 API call with almost zero (0) error rate.

Please find the details report from the attachment and  let me know if you have any further queries. 