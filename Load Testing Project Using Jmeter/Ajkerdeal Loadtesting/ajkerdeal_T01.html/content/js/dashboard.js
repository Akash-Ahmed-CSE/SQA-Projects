/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7478448275862069, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://ajkerdeal.com/-39"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-38"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-37"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-36"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-42"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-41"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-40"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-46"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-45"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-44"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-43"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-28"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-27"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-26"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-25"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-29"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-31"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-30"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-35"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-18"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-34"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-19"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/-33"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-16"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-32"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-17"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-19"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-16"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-18"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-15"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-14"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/-19"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/-18"], "isController": false}, {"data": [0.0, 500, 1500, "Cotton"], "isController": true}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-22"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-20"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/-20"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-11"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-23"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-12"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/-24"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-15"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-23"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-14"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-22"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-17"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-16"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-5"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-6"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-7"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-1"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-2"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-4"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-20"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-22"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-23"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-13"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans-9"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/-12"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/-11"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-4"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/category/mens-shopping-pants-jeans"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-0"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-9"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-59"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-58"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-7"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-8"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-5"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/-6"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/-3"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/-4"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/-1"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/-2"], "isController": false}, {"data": [0.0, 500, 1500, "https://ajkerdeal.com/category/womens-fashion-sharee-cotton"], "isController": false}, {"data": [0.75, 500, 1500, "https://ajkerdeal.com/-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-60"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-61"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-49"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-48"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-47"], "isController": false}, {"data": [0.0, 500, 1500, "Jeans"], "isController": true}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-53"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-52"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-51"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-50"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-57"], "isController": false}, {"data": [0.5, 500, 1500, "https://ajkerdeal.com/-56"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-55"], "isController": false}, {"data": [1.0, 500, 1500, "https://ajkerdeal.com/-54"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 226, 0, 0.0, 759.1106194690265, 19, 11789, 208.0, 2078.7000000000003, 3309.7499999999977, 7411.969999999999, 1.5421042216808936, 116.49074641511945, 2.0714295766719206], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://ajkerdeal.com/-39", 2, 0, 0.0, 163.5, 127, 200, 163.5, 200.0, 200.0, 200.0, 0.022569797097524096, 0.48922900515155615, 0.015075919154986796], "isController": false}, {"data": ["https://ajkerdeal.com/-38", 2, 0, 0.0, 272.5, 171, 374, 272.5, 374.0, 374.0, 374.0, 0.022505035501693502, 0.5047699246925249, 0.01501068285903971], "isController": false}, {"data": ["https://ajkerdeal.com/-37", 2, 0, 0.0, 186.5, 185, 188, 186.5, 188.0, 188.0, 188.0, 0.022536480928503015, 0.6241438778241027, 0.015031656713054255], "isController": false}, {"data": ["https://ajkerdeal.com/-36", 2, 0, 0.0, 106.5, 63, 150, 106.5, 150.0, 150.0, 150.0, 0.022564704289550288, 0.06869674377214162, 0.015094553162443305], "isController": false}, {"data": ["https://ajkerdeal.com/", 2, 0, 0.0, 9568.0, 7347, 11789, 9568.0, 11789.0, 11789.0, 11789.0, 0.019933025035879445, 68.37541485608357, 0.8222372827300272], "isController": false}, {"data": ["https://ajkerdeal.com/-42", 2, 0, 0.0, 194.0, 173, 215, 194.0, 215.0, 215.0, 215.0, 0.022541052892580613, 0.41169340012059463, 0.014968667936479312], "isController": false}, {"data": ["https://ajkerdeal.com/-41", 2, 0, 0.0, 169.0, 129, 209, 169.0, 209.0, 209.0, 209.0, 0.02255350819820023, 0.5116937297018427, 0.015043013768916756], "isController": false}, {"data": ["https://ajkerdeal.com/-40", 2, 0, 0.0, 219.0, 140, 298, 219.0, 298.0, 298.0, 298.0, 0.02255121945719215, 0.4815918623924589, 0.014997441846042825], "isController": false}, {"data": ["https://ajkerdeal.com/-46", 2, 0, 0.0, 131.5, 127, 136, 131.5, 136.0, 136.0, 136.0, 0.02255935931419548, 0.17518752467429924, 0.015024885793243471], "isController": false}, {"data": ["https://ajkerdeal.com/-45", 2, 0, 0.0, 132.5, 116, 149, 132.5, 149.0, 149.0, 149.0, 0.02256343144665441, 0.02700340355261228, 0.015049632498110314], "isController": false}, {"data": ["https://ajkerdeal.com/-44", 2, 0, 0.0, 160.5, 140, 181, 160.5, 181.0, 181.0, 181.0, 0.022552236618066598, 0.47521570861946477, 0.015042165634901841], "isController": false}, {"data": ["https://ajkerdeal.com/-43", 2, 0, 0.0, 202.0, 155, 249, 202.0, 249.0, 249.0, 249.0, 0.022540036740259888, 0.3556219077887097, 0.015034028411716312], "isController": false}, {"data": ["https://ajkerdeal.com/-28", 2, 0, 0.0, 225.5, 172, 279, 225.5, 279.0, 279.0, 279.0, 0.022534957352593213, 0.676070727372086, 0.015382749208459622], "isController": false}, {"data": ["https://ajkerdeal.com/-27", 2, 0, 0.0, 195.5, 135, 256, 195.5, 256.0, 256.0, 256.0, 0.02252988025368645, 0.5199143899753298, 0.015379283493483232], "isController": false}, {"data": ["https://ajkerdeal.com/-26", 2, 0, 0.0, 324.5, 153, 496, 324.5, 496.0, 496.0, 496.0, 0.022556051788694905, 0.42406038184576167, 0.01539714863310326], "isController": false}, {"data": ["https://ajkerdeal.com/-25", 2, 0, 0.0, 329.5, 276, 383, 329.5, 383.0, 383.0, 383.0, 0.022512888628739954, 0.34621261101668205, 0.0153676847182512], "isController": false}, {"data": ["https://ajkerdeal.com/-29", 2, 0, 0.0, 150.5, 137, 164, 150.5, 164.0, 164.0, 164.0, 0.02256852368002347, 0.5183156793407734, 0.015405662160484772], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-10", 2, 0, 0.0, 223.0, 183, 263, 223.0, 263.0, 263.0, 263.0, 0.03713951458654435, 0.0073626186143247105, 0.028543748026963287], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-11", 2, 0, 0.0, 116.0, 52, 180, 116.0, 180.0, 180.0, 180.0, 0.037234240607662804, 0.0073813973079644045, 0.027925680455747105], "isController": false}, {"data": ["https://ajkerdeal.com/-31", 2, 0, 0.0, 300.0, 238, 362, 300.0, 362.0, 362.0, 362.0, 0.022500225002250022, 0.7657217685458104, 0.015359040309153091], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-14", 2, 0, 0.0, 170.5, 111, 230, 170.5, 230.0, 230.0, 230.0, 0.03725366017211191, 0.024429524224192527, 0.02852233356927318], "isController": false}, {"data": ["https://ajkerdeal.com/-30", 2, 0, 0.0, 297.5, 159, 436, 297.5, 436.0, 436.0, 436.0, 0.022496428691945156, 0.5743729296255469, 0.015356448882489904], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-15", 2, 0, 0.0, 923.5, 916, 931, 923.5, 931.0, 931.0, 931.0, 0.03670869812602096, 0.01100543977020355, 0.02337311638492741], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-12", 2, 0, 0.0, 224.0, 112, 336, 224.0, 336.0, 336.0, 336.0, 0.03712503712503712, 0.02441768799190674, 0.028496366386991386], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-13", 2, 0, 0.0, 181.0, 111, 251, 181.0, 251.0, 251.0, 251.0, 0.03728908362077002, 0.024561998927938845, 0.028622284888598862], "isController": false}, {"data": ["https://ajkerdeal.com/-35", 2, 0, 0.0, 182.0, 149, 215, 182.0, 215.0, 215.0, 215.0, 0.022563686003745573, 0.43147540769760145, 0.015402359879509915], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-18", 2, 0, 0.0, 58.0, 53, 63, 58.0, 63.0, 63.0, 63.0, 0.037268932617769826, 0.006078038815593321, 0.02806088578935599], "isController": false}, {"data": ["https://ajkerdeal.com/-34", 2, 0, 0.0, 288.0, 207, 369, 288.0, 369.0, 369.0, 369.0, 0.022518972234107235, 0.6312789228049632, 0.01578966998446191], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-19", 2, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 0.03728074263239324, 0.007354208995843197, 0.027814929073387142], "isController": false}, {"data": ["https://ajkerdeal.com/-33", 2, 0, 0.0, 441.0, 184, 698, 441.0, 698.0, 698.0, 698.0, 0.022442155344599295, 0.6202056192351714, 0.015319400962768464], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-16", 2, 0, 0.0, 55.5, 52, 59, 55.5, 59.0, 59.0, 59.0, 0.03727101619425654, 0.006005583664113602, 0.027552889901418163], "isController": false}, {"data": ["https://ajkerdeal.com/-32", 2, 0, 0.0, 331.0, 184, 478, 331.0, 478.0, 478.0, 478.0, 0.022552490922622407, 0.47757762637852097, 0.015394717924719786], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-17", 2, 0, 0.0, 58.0, 53, 63, 58.0, 63.0, 63.0, 63.0, 0.037268932617769826, 0.005968852489564699, 0.028133676673375074], "isController": false}, {"data": ["https://ajkerdeal.com/-17", 2, 0, 0.0, 2766.0, 2284, 3248, 2766.0, 3248.0, 3248.0, 3248.0, 0.02189333566862247, 2.7275162284350642, 0.01430336090069183], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-19", 2, 0, 0.0, 52.5, 52, 53, 52.5, 53.0, 53.0, 53.0, 0.026881359121517186, 0.005302768107955539, 0.020056014032069462], "isController": false}, {"data": ["https://ajkerdeal.com/-16", 2, 0, 0.0, 1378.0, 1285, 1471, 1378.0, 1471.0, 1471.0, 1471.0, 0.021787679067487336, 0.8328042445122283, 0.014234333297020535], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-18", 2, 0, 0.0, 52.5, 51, 54, 52.5, 54.0, 54.0, 54.0, 0.02686980237260355, 0.004382086910375773, 0.020231071903591146], "isController": false}, {"data": ["https://ajkerdeal.com/-15", 2, 0, 0.0, 1381.0, 70, 2692, 1381.0, 2692.0, 2692.0, 2692.0, 0.02179337699273191, 0.09506935061184905, 0.014344468840919245], "isController": false}, {"data": ["https://ajkerdeal.com/-14", 2, 0, 0.0, 1651.0, 164, 3138, 1651.0, 3138.0, 3138.0, 3138.0, 0.021769892239033417, 0.35475995292260804, 0.014392790083814085], "isController": false}, {"data": ["https://ajkerdeal.com/-19", 2, 0, 0.0, 781.0, 158, 1404, 781.0, 1404.0, 1404.0, 1404.0, 0.022448200776707748, 0.22426278705636746, 0.015016618683637507], "isController": false}, {"data": ["https://ajkerdeal.com/-18", 2, 0, 0.0, 635.0, 240, 1030, 635.0, 1030.0, 1030.0, 1030.0, 0.022363609933915535, 0.9838022819268487, 0.014719797944784247], "isController": false}, {"data": ["Cotton", 2, 0, 0.0, 1890.5, 1737, 2044, 1890.5, 2044.0, 2044.0, 2044.0, 0.026069161485420822, 4.318608635898539, 0.46680092284831665], "isController": true}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-21", 2, 0, 0.0, 118.0, 108, 128, 118.0, 128.0, 128.0, 128.0, 0.03723077495858076, 0.02461448695992107, 0.028250304826969972], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-22", 2, 0, 0.0, 117.5, 117, 118, 117.5, 118.0, 118.0, 118.0, 0.037242560798480505, 0.012802130274477673, 0.0286593143644557], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-20", 2, 0, 0.0, 107.5, 53, 162, 107.5, 162.0, 162.0, 162.0, 0.037193387015788594, 0.007336976735536421, 0.027786075260818624], "isController": false}, {"data": ["https://ajkerdeal.com/-20", 2, 0, 0.0, 395.0, 107, 683, 395.0, 683.0, 683.0, 683.0, 0.02242755898448013, 0.025504777770924913, 0.015002810453485243], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-11", 2, 0, 0.0, 721.0, 692, 750, 721.0, 750.0, 750.0, 750.0, 0.02679169457468185, 0.4498859259879437, 0.01784368720696584], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-10", 2, 0, 0.0, 485.5, 163, 808, 485.5, 808.0, 808.0, 808.0, 0.02703031449770918, 0.45098918280601696, 0.018504150842670056], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-13", 2, 0, 0.0, 158.5, 108, 209, 158.5, 209.0, 209.0, 209.0, 0.026971262120210917, 0.01775256901271695, 0.020702550807115017], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-23", 2, 0, 0.0, 54.5, 54, 55, 54.5, 55.0, 55.0, 55.0, 0.03729116945107399, 0.007356265848747017, 0.028041211403639618], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-12", 2, 0, 0.0, 174.0, 117, 231, 174.0, 231.0, 231.0, 231.0, 0.026936752505117983, 0.26907816540512874, 0.018019214322271306], "isController": false}, {"data": ["https://ajkerdeal.com/-24", 2, 0, 0.0, 551.0, 128, 974, 551.0, 974.0, 974.0, 974.0, 0.022503009777557748, 0.2135258735387108, 0.015558721604014537], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-15", 2, 0, 0.0, 1231.5, 1001, 1462, 1231.5, 1462.0, 1462.0, 1462.0, 0.026618752911426097, 0.007980426898249817, 0.018248402874825313], "isController": false}, {"data": ["https://ajkerdeal.com/-23", 2, 0, 0.0, 580.0, 546, 614, 580.0, 614.0, 614.0, 614.0, 0.022466609002370228, 0.5034473080789926, 0.01491923254063648], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-14", 2, 0, 0.0, 166.0, 110, 222, 166.0, 222.0, 222.0, 222.0, 0.02690088369402935, 0.017653704924206762, 0.02059598907824122], "isController": false}, {"data": ["https://ajkerdeal.com/-22", 2, 0, 0.0, 695.0, 580, 810, 695.0, 810.0, 810.0, 810.0, 0.022453493202204935, 3.317273384611499, 0.015173649703052553], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-17", 2, 0, 0.0, 67.0, 53, 81, 67.0, 81.0, 81.0, 81.0, 0.026880997822639176, 0.004305159807532055, 0.020292003239160236], "isController": false}, {"data": ["https://ajkerdeal.com/-21", 2, 0, 0.0, 399.5, 168, 631, 399.5, 631.0, 631.0, 631.0, 0.022561904224716565, 0.031121767302160305, 0.015048613853009195], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-16", 2, 0, 0.0, 68.5, 53, 84, 68.5, 84.0, 84.0, 84.0, 0.0268987128965879, 0.00433426526165723, 0.01988508365499711], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-5", 2, 0, 0.0, 2795.0, 1662, 3928, 2795.0, 3928.0, 3928.0, 3928.0, 0.02565418163160595, 0.30569562916880455, 0.017411773665982556], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-6", 2, 0, 0.0, 886.5, 786, 987, 886.5, 987.0, 987.0, 987.0, 0.026731177909354576, 0.18719655936326335, 0.017907800825993397], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-7", 2, 0, 0.0, 1292.5, 445, 2140, 1292.5, 2140.0, 2140.0, 2140.0, 0.026243963888305688, 0.8224689132046504, 0.016812539365945834], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-8", 2, 0, 0.0, 367.0, 150, 584, 367.0, 584.0, 584.0, 584.0, 0.02698035829915821, 0.004400117027304123, 0.020261616730520182], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-1", 2, 0, 0.0, 290.0, 133, 447, 290.0, 447.0, 447.0, 447.0, 0.026852125345721112, 0.009584425599473699, 0.020479990131843935], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-2", 2, 0, 0.0, 1875.5, 1684, 2067, 1875.5, 2067.0, 2067.0, 2067.0, 0.026414147417356735, 3.1339457288323627, 0.017489054637663932], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-3", 2, 0, 0.0, 2249.0, 2106, 2392, 2249.0, 2392.0, 2392.0, 2392.0, 0.026169104754926335, 2.888644939222254, 0.017275698060869336], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-4", 2, 0, 0.0, 323.5, 163, 484, 323.5, 484.0, 484.0, 484.0, 0.026955994339241188, 0.24694744423478673, 0.01824267976278725], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-0", 2, 0, 0.0, 733.0, 538, 928, 733.0, 928.0, 928.0, 928.0, 0.026822595354326486, 4.442754294968082, 0.01786426760903385], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-20", 2, 0, 0.0, 55.5, 54, 57, 55.5, 57.0, 57.0, 57.0, 0.026867997528144227, 0.04205996097423359, 0.017842029608533275], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-22", 2, 0, 0.0, 379.5, 116, 643, 379.5, 643.0, 643.0, 643.0, 0.026853928058326735, 1.4625163221531479, 0.018016258375068813], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-21", 2, 0, 0.0, 131.5, 109, 154, 131.5, 154.0, 154.0, 154.0, 0.02684239487847106, 0.03583354863170892, 0.01772017474399066], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-23", 2, 0, 0.0, 108.5, 68, 149, 108.5, 149.0, 149.0, 149.0, 0.026858616244091103, 0.10706725733240223, 0.017966945436721102], "isController": false}, {"data": ["https://ajkerdeal.com/-13", 2, 0, 0.0, 860.0, 99, 1621, 860.0, 1621.0, 1621.0, 1621.0, 0.021697386549790077, 0.8906099135359146, 0.014323665339509855], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans-9", 2, 0, 0.0, 2018.0, 2005, 2031, 2018.0, 2031.0, 2031.0, 2031.0, 0.026316482012684543, 2.9049386990447115, 0.017732785731203453], "isController": false}, {"data": ["https://ajkerdeal.com/-12", 2, 0, 0.0, 516.5, 396, 637, 516.5, 637.0, 637.0, 637.0, 0.021458076283461188, 0.3580187825223969, 0.014584786223915026], "isController": false}, {"data": ["https://ajkerdeal.com/-11", 2, 0, 0.0, 819.0, 148, 1490, 819.0, 1490.0, 1490.0, 1490.0, 0.02151462994836489, 0.026977328958691912, 0.01428705895008606], "isController": false}, {"data": ["https://ajkerdeal.com/-10", 2, 0, 0.0, 4174.0, 3363, 4985, 4174.0, 4985.0, 4985.0, 4985.0, 0.021099272075113407, 2.329038202869501, 0.014114259151809262], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-6", 2, 0, 0.0, 175.0, 60, 290, 175.0, 290.0, 290.0, 290.0, 0.03719477041527961, 0.007373572650685314, 0.028041369883394396], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-5", 2, 0, 0.0, 163.5, 60, 267, 163.5, 267.0, 267.0, 267.0, 0.03719407870267054, 0.006065831194673808, 0.0283677494792829], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-4", 2, 0, 0.0, 151.5, 63, 240, 151.5, 240.0, 240.0, 240.0, 0.03719407870267054, 0.006065831194673808, 0.028295104794316746], "isController": false}, {"data": ["https://ajkerdeal.com/category/mens-shopping-pants-jeans", 2, 0, 0.0, 4371.0, 3852, 4890, 4371.0, 4890.0, 4890.0, 4890.0, 0.02546927132414742, 17.117887308025367, 0.4262869543208619], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-3", 2, 0, 0.0, 151.5, 62, 241, 151.5, 241.0, 241.0, 241.0, 0.037192695354632356, 0.007373161286123405, 0.027676595566630713], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-2", 2, 0, 0.0, 60.0, 53, 67, 60.0, 67.0, 67.0, 67.0, 0.037192695354632356, 0.0060292845985048535, 0.027712916558187972], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-1", 2, 0, 0.0, 126.0, 65, 187, 126.0, 187.0, 187.0, 187.0, 0.037193387015788594, 0.013293730124783812, 0.02836722193294032], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-0", 2, 0, 0.0, 739.5, 510, 969, 739.5, 969.0, 969.0, 969.0, 0.03688063582216158, 5.838737691087794, 0.02467112845525457], "isController": false}, {"data": ["Test", 2, 0, 0.0, 9568.0, 7347, 11789, 9568.0, 11789.0, 11789.0, 11789.0, 0.0199131785415588, 68.30733626388944, 0.8214186148393006], "isController": true}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-9", 2, 0, 0.0, 95.5, 68, 123, 95.5, 123.0, 123.0, 123.0, 0.037246028642196026, 0.007383734193716594, 0.028225506080414173], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-8", 2, 0, 0.0, 60.5, 52, 69, 60.5, 69.0, 69.0, 69.0, 0.03720999460455078, 0.0060684268544531055, 0.027943833838769094], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton-7", 2, 0, 0.0, 29.5, 19, 40, 29.5, 40.0, 40.0, 40.0, 0.03721691881129161, 0.0369261616330784, 0.026895038984722456], "isController": false}, {"data": ["https://ajkerdeal.com/-9", 2, 0, 0.0, 120.5, 106, 135, 120.5, 135.0, 135.0, 135.0, 0.021830962854616703, 0.03547531463875214, 0.01471031676727102], "isController": false}, {"data": ["https://ajkerdeal.com/-59", 2, 0, 0.0, 1070.0, 796, 1344, 1070.0, 1344.0, 1344.0, 1344.0, 0.02227742072022901, 3.141638448600421, 0.014641312641322388], "isController": false}, {"data": ["https://ajkerdeal.com/-58", 2, 0, 0.0, 93.5, 56, 131, 93.5, 131.0, 131.0, 131.0, 0.02257565666941337, 0.020944212730412796, 0.014903460848167422], "isController": false}, {"data": ["https://ajkerdeal.com/-7", 2, 0, 0.0, 954.0, 822, 1086, 954.0, 1086.0, 1086.0, 1086.0, 0.021652285940088126, 0.9439254850112051, 0.01454762961599671], "isController": false}, {"data": ["https://ajkerdeal.com/-8", 2, 0, 0.0, 2721.5, 97, 5346, 2721.5, 5346.0, 5346.0, 5346.0, 0.02167833683799779, 0.07695386172472848, 0.014586302813848121], "isController": false}, {"data": ["https://ajkerdeal.com/-5", 2, 0, 0.0, 969.5, 832, 1107, 969.5, 1107.0, 1107.0, 1107.0, 0.02145094169634047, 0.3586957760414432, 0.014705626045733408], "isController": false}, {"data": ["https://ajkerdeal.com/-6", 2, 0, 0.0, 5121.0, 2806, 7436, 5121.0, 7436.0, 7436.0, 7436.0, 0.02106726778604083, 1.8507718191059053, 0.012693851781237492], "isController": false}, {"data": ["https://ajkerdeal.com/-3", 2, 0, 0.0, 3108.5, 1955, 4262, 3108.5, 4262.0, 4262.0, 4262.0, 0.020747533636938906, 4.1576517552413454, 0.013838442845731713], "isController": false}, {"data": ["https://ajkerdeal.com/-4", 2, 0, 0.0, 583.5, 160, 1007, 583.5, 1007.0, 1007.0, 1007.0, 0.021670585430865415, 0.04686475726235494, 0.014390623137684065], "isController": false}, {"data": ["https://ajkerdeal.com/-1", 2, 0, 0.0, 3032.0, 2816, 3248, 3032.0, 3248.0, 3248.0, 3248.0, 0.0210630522469011, 17.580377347872105, 0.013143838267353321], "isController": false}, {"data": ["https://ajkerdeal.com/-2", 2, 0, 0.0, 3270.0, 3197, 3343, 3270.0, 3343.0, 3343.0, 3343.0, 0.020979314396005536, 6.823522007300802, 0.013030121050644066], "isController": false}, {"data": ["https://ajkerdeal.com/category/womens-fashion-sharee-cotton", 2, 0, 0.0, 1890.5, 1737, 2044, 1890.5, 2044.0, 2044.0, 2044.0, 0.03616374945754376, 5.990874727641762, 0.6475571387241429], "isController": false}, {"data": ["https://ajkerdeal.com/-0", 2, 0, 0.0, 733.5, 376, 1091, 733.5, 1091.0, 1091.0, 1091.0, 0.021421303486317142, 4.498139024259626, 0.012467868044770526], "isController": false}, {"data": ["https://ajkerdeal.com/-60", 2, 0, 0.0, 111.5, 80, 143, 111.5, 143.0, 143.0, 143.0, 0.022619061082774453, 0.05179853343662704, 0.014799580981893441], "isController": false}, {"data": ["https://ajkerdeal.com/-61", 2, 0, 0.0, 292.0, 264, 320, 292.0, 320.0, 320.0, 320.0, 0.022568269013766643, 0.19797925835025953, 0.014722269239449333], "isController": false}, {"data": ["https://ajkerdeal.com/-49", 2, 0, 0.0, 124.0, 122, 126, 124.0, 126.0, 126.0, 126.0, 0.02257642118571364, 0.3094336634194248, 0.01514648569783718], "isController": false}, {"data": ["https://ajkerdeal.com/-48", 2, 0, 0.0, 214.5, 124, 305, 214.5, 305.0, 305.0, 305.0, 0.022529118886160365, 0.2649811600243314, 0.015092749566314461], "isController": false}, {"data": ["https://ajkerdeal.com/-47", 2, 0, 0.0, 138.0, 120, 156, 138.0, 156.0, 156.0, 156.0, 0.02255630617930008, 0.14252986243472768, 0.015088935285957571], "isController": false}, {"data": ["Jeans", 2, 0, 0.0, 4371.0, 3852, 4890, 4371.0, 4890.0, 4890.0, 4890.0, 0.021407317020957765, 14.387849407552501, 0.3583007875216749], "isController": true}, {"data": ["https://ajkerdeal.com/-53", 2, 0, 0.0, 719.0, 676, 762, 719.0, 762.0, 762.0, 762.0, 0.022410721289064687, 0.9923747520813958, 0.014728921315957554], "isController": false}, {"data": ["https://ajkerdeal.com/-52", 2, 0, 0.0, 204.0, 181, 227, 204.0, 227.0, 227.0, 227.0, 0.022538512683548013, 0.30715326611221927, 0.015099042676673767], "isController": false}, {"data": ["https://ajkerdeal.com/-51", 2, 0, 0.0, 152.0, 150, 154, 152.0, 154.0, 154.0, 154.0, 0.022563940566580547, 0.2862469432911764, 0.015116077371752202], "isController": false}, {"data": ["https://ajkerdeal.com/-50", 2, 0, 0.0, 127.0, 117, 137, 127.0, 137.0, 137.0, 137.0, 0.022581009371118888, 0.24143377060517107, 0.015127512137292538], "isController": false}, {"data": ["https://ajkerdeal.com/-57", 2, 0, 0.0, 1372.5, 1352, 1393, 1372.5, 1393.0, 1393.0, 1393.0, 0.02225288174818639, 5.922591438481908, 0.014755572956072811], "isController": false}, {"data": ["https://ajkerdeal.com/-56", 2, 0, 0.0, 678.5, 563, 794, 678.5, 794.0, 794.0, 794.0, 0.022459292532285232, 0.8722934797866367, 0.015024038461538462], "isController": false}, {"data": ["https://ajkerdeal.com/-55", 2, 0, 0.0, 103.5, 96, 111, 103.5, 111.0, 111.0, 111.0, 0.022591722392915237, 0.16281924927706487, 0.015222937940538585], "isController": false}, {"data": ["https://ajkerdeal.com/-54", 2, 0, 0.0, 447.0, 412, 482, 447.0, 482.0, 482.0, 482.0, 0.02250376938137138, 1.9916275429259402, 0.014042879526070617], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 226, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
