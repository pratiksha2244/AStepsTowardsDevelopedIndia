records = new Array(); // Array to record the data added
graph = new Array();  // Array to record the data which cannot be appended
delsrecord = new Array(); // Array to store delete item
// Store in Local Storage
function init() {
    if (localStorage.recorded) {
        // Parse the store data to the records
        records = JSON.parse(localStorage.recorded);
    }
    graph = JSON.parse(localStorage.recording)
    delsrecord = JSON.parse(localStorage.del)
}


  // Store Data in users Table
function userstable() {
      document.getElementById('tableBody').innerHTML = "";
      if (localStorage.recorded) {
          records = JSON.parse(localStorage.recorded);
          for (var i = 0; i < records.length; i++) {
              prepareTable(i, records[i].states, records[i].districts, records[i].date, records[i].problems)
            }
      }
  }
  // Function to get Parameter from URL
  function getparam1() {
      para = document.querySelector('#st')
      params = new URLSearchParams(window.location.search);
      return params.get('state')

  }
  // Store Data in CM Table
  function cmTable() {
      document.getElementById('tableBody').innerHTML = "";
      param = getparam1();
      para.append(`WELCOME ${params.get('state')}'s CHIEF MINISTER`);
      if (localStorage.recorded) {
          records = JSON.parse(localStorage.recorded);
          for (var i = 0; i < records.length; i++) {
              if (records[i].states == param) {
                  prepareTable1(i, records[i].districts, records[i].date, records[i].ministrys, records[i].problems)
              }
          }
      }
  }
//   Param for minister
  function getparam2() {
    paras = document.querySelector('#st')
    params = new URLSearchParams(window.location.search);
    min = params.get('ministry');
    chief = params.get('state');
    return (min+'and'+chief);
    // return (params.get('ministry') && params.get('state'))

}
//  Store Data in Minister's Table
  function ministerTable(){
    document.getElementById('tableBody').innerHTML = "";
    param1 = getparam2();
    paras.append(`${params.get('ministry')} Minister`);
    if (localStorage.recorded) {
        records = JSON.parse(localStorage.recorded);
        for (var i = 0; i < records.length; i++) {
           if((records[i].ministrys+'and'+records[i].states)==param1){
            prepareTable2(i, records[i].states, records[i].districts, records[i].date, records[i].problems)
        }
    }
    }
}

function saveData() {
    // Storing Data in variables
    var state = document.getElementById("inputState").value
    var district = document.getElementById("inputDistrict").value
    var ministry = document.getElementById("ministry").value
    var dates = document.getElementById("dates").value
    var problem = document.getElementById("description").value
    var pass = document.getElementById("password").value
    // action = document.getElementById("date").value

    // Declare key to the values
    var stuobj = {
        states: state,
        districts: district,
        ministrys: ministry,
        date: dates,
        problems: problem,
        pas: pass
    };
    // Push data in the records
    records.push(stuobj);
    graph.push(stuobj);


    // JSON stingify the data
    localStorage.recorded = JSON.stringify(records);
    localStorage.recording = JSON.stringify(graph);
    localStorage.del = JSON.stringify(delsrecord);

    // alert after submit
    alert('Your Query Submitted');

    init();
    // Empty the input after sending data
    document.getElementById("inputState").value = '';
    document.getElementById("inputDistrict").value = '';
    document.getElementById("ministry").value = '';
    document.getElementById("dates").value = '';
    document.getElementById("description").value = '';
    document.getElementById("password").value = '';

}

// Prepared table for storing users information
function prepareTable(index, state, district, dates, problem) {
      var table = document.getElementById('tableBody');
      var row = table.insertRow();

      var statecell = row.insertCell(0);
      var districtcell = row.insertCell(1);
      var datecell = row.insertCell(2);
      var problemcell = row.insertCell(3);
      var actioncell = row.insertCell(4);

      statecell.innerHTML = state;
      districtcell.innerHTML = district;
      datecell.innerHTML = dates;
      problemcell.innerHTML = problem;
      actioncell.innerHTML = '<button class="btn" onclick="deleteTableRow(' + index + ')">Done</button>';
  }

  // Prepared table for storing Chief Minister information
  function prepareTable1(index, district, dates, ministry, problem) {
      var table = document.getElementById('tableBody');
      var row = table.insertRow();


      var districtcell = row.insertCell(0);
      var datecell = row.insertCell(1);
      var ministrycell = row.insertCell(2);
      var problemcell = row.insertCell(3);
      var actioncell = row.insertCell(4);


      districtcell.innerHTML = district;
      datecell.innerHTML = dates;
      ministrycell.innerHTML = ministry;
      problemcell.innerHTML = problem;
      actioncell.innerHTML = '<button class="btn">Done</button>';
  }

//   Prepare table for storing minister information
function prepareTable2(index, state, district, dates, problem) {
    var table = document.getElementById('tableBody');
    var row = table.insertRow();

    var statecell = row.insertCell(0);
    var districtcell = row.insertCell(1);
    var datecell = row.insertCell(2);
    var problemcell = row.insertCell(3);
    var actioncell = row.insertCell(4);

    statecell.innerHTML = state;
    districtcell.innerHTML = district;
    datecell.innerHTML = dates;
    problemcell.innerHTML = problem;
    actioncell.innerHTML = '<button class="btn">Done</button>';
}

// Function to delete row
function deleteTableRow(index) {
    val = prompt("Enter Password");
    delsrecord = JSON.parse(localStorage.del)
    if (localStorage.recorded) {
        records = JSON.parse(localStorage.recorded);
        for (var i = 0; i < records.length; i++) {
            if ((records[index].pas) == val) {
                delsrecord.push(records[index])
                //   console.log(records[index])
                // recorded ----- records
                // recording ---- graph
                // del ------ delsrecord
                records.splice(index, 1);
                localStorage.del = JSON.stringify(delsrecord)
                localStorage.recorded = JSON.stringify(records);
                userstable();
            } 
            else if(val == ""){
                alert("Can't be Empty")
            }
            else {
                alert("Please enter Corret Password");
                return
            }  
        }  
    }
}


graphs = JSON.parse(localStorage.recording)
dels = JSON.parse(localStorage.del)

async function fetchJSON() {
    urls = graphs;
    urll = dels;
    return urls;
};
// Counting The no. of responses per state
count = {}
counts = {}
var statein
fetchJSON().then(urls => {
    statein = urls.map(function (index) {
        return index.states;
    })
    delin = urll.map(function(index){
      return index.states;
    })
    statein.forEach((x) => {
        count[x] = (count[x] || 0) + 1;
    })
    day = [{
            category: 'Andhra Pradesh',
            sales: {
                value: count['Andra Pradesh']
            }
        },
        {
            category: 'Arunachal Pradesh',
            sales: {
                value: count['Arunachal Pradesh']
            }
        },
        {
            category: 'Assam',
            sales: {
                value: count['Assam']
            }
        },
        {
            category: 'Bihar',
            sales: {
                value: count['Bihar']
            }
        },
        {
            category: 'Chhattisgarh',
            sales: {
                value: count['Chhattisgarh']
            }
        },
        {
            category: 'Goa',
            sales: {
                value: count['Goa']
            }
        },
        {
            category: 'Gujarat',
            sales: {
                value: count['Gujarat']
            }
        },
        {
            category: 'Haryana',
            sales: {
                value: count['Haryana']
            }
        },
        {
            category: 'Jammu and Kashmir',
            sales: {
                value: count['Jammu and Kashmir']
            }
        },

        {
            category: 'Himachal Pradesh',
            sales: {
                value: count['Himachal Pradesh']
            }
        },
        {
            category: 'Jharkhand',
            sales: {
                value: count['Jharkhand']
            }
        },
        {
            category: 'Karnataka',
            sales: {
                value: count['Karnataka']
            }
        },
        {
            category: 'Kerala',
            sales: {
                value: count['Kerala']
            }
        },
        {
            category: 'Madhya Pradesh',
            sales: {
                value: count['Madya Pradesh']
            }
        },
        {
            category: 'Maharashtra',
            sales: {
                value: count['Maharashtra']
            }
        },
        {
            category: 'Manipur',
            sales: {
                value: count['Manipur']
            }
        },
        {
            category: 'Meghalaya',
            sales: {
                value: count['Meghalaya']
            }
        },

        {
            category: 'Mizoram',
            sales: {
                value: count['Mizoram']
            }
        },
        {
            category: 'Nagaland',
            sales: {
                value: count['Nagaland']
            }
        },
        {
            category: 'Odisha',
            sales: {
                value: count['Orissa']
            }
        },
        {
            category: 'Punjab',
            sales: {
                value: count['Punjab']
            }
        },
        {
            category: 'Rajasthan',
            sales: {
                value: count['Rajasthan']
            }
        },
        {
            category: 'Sikkim',
            sales: {
                value: count['Sikkim']
            }
        },
        {
            category: 'Tamil Nadu',
            sales: {
                value: count['Tamil Nadu']
            }
        },
        {
            category: 'Telangana',
            sales: {
                value: count['Telangana']
            }
        },

        {
            category: 'Tripura',
            sales: {
                value: count['Tripura']
            }
        },
        {
            category: 'Uttar Pradesh',
            sales: {
                value: count['Uttar Pradesh']
            }
        },
        {
            category: 'Uttarakhand',
            sales: {
                value: count['Uttaranchal']
            }
        },
        {
            category: 'West Bengal',
            sales: {
                value: count['West Bengal']
            }
        },
        {
            category: 'Andaman and Nicobar Islands',
            sales: {
                value: count['Andaman and Nicobar Islands']
            }
        },
        {
            category: 'Chandigarh',
            sales: {
                value: count['Chandigarh']
            }
        },
        {
            category: 'Dadra & Nagar Haveli',
            sales: {
                value: count['Dadar and Nagar Haveli']
            }
        },
        {
            category: 'Daman & Diu',
            sales: {
                value: count['Daman and Diu']
            }
        },

        {
            category: 'Lakshadweep',
            sales: {
                value: count['Lakshadeep']
            }
        },
        {
            category: 'Puducherry',
            sales: {
                value: count['Chhattisgarh']
            }
        },
        {
            category: 'Ladakh',
            sales: {
                value: count['Pondicherry']
            }
        },
    ];
    delin.forEach((y)=>{
        counts[y] = (counts[y] || 0) + 1;
    })
    daydone =  [{
        category: 'Andhra Pradesh',
        sales: {
            value: counts['Andra Pradesh']
        }
    },
    {
        category: 'Arunachal Pradesh',
        sales: {
            value: counts['Arunachal Pradesh']
        }
    },
    {
        category: 'Assam',
        sales: {
            value: counts['Assam']
        }
    },
    {
        category: 'Bihar',
        sales: {
            value: counts['Bihar']
        }
    },
    {
        category: 'Chhattisgarh',
        sales: {
            value: counts['Chhattisgarh']
        }
    },
    {
        category: 'Goa',
        sales: {
            value: counts['Goa']
        }
    },
    {
        category: 'Gujarat',
        sales: {
            value: counts['Gujarat']
        }
    },
    {
        category: 'Haryana',
        sales: {
            value: counts['Haryana']
        }
    },
    {
        category: 'Jammu and Kashmir',
        sales: {
            value: counts['Jammu and Kashmir']
        }
    },

    {
        category: 'Himachal Pradesh',
        sales: {
            value: counts['Himachal Pradesh']
        }
    },
    {
        category: 'Jharkhand',
        sales: {
            value: counts['Jharkhand']
        }
    },
    {
        category: 'Karnataka',
        sales: {
            value: counts['Karnataka']
        }
    },
    {
        category: 'Kerala',
        sales: {
            value: counts['Kerala']
        }
    },
    {
        category: 'Madhya Pradesh',
        sales: {
            value: counts['Madya Pradesh']
        }
    },
    {
        category: 'Maharashtra',
        sales: {
            value: counts['Maharashtra']
        }
    },
    {
        category: 'Manipur',
        sales: {
            value: counts['Manipur']
        }
    },
    {
        category: 'Meghalaya',
        sales: {
            value: counts['Meghalaya']
        }
    },

    {
        category: 'Mizoram',
        sales: {
            value: counts['Mizoram']
        }
    },
    {
        category: 'Nagaland',
        sales: {
            value: counts['Nagaland']
        }
    },
    {
        category: 'Odisha',
        sales: {
            value: counts['Orissa']
        }
    },
    {
        category: 'Punjab',
        sales: {
            value: counts['Punjab']
        }
    },
    {
        category: 'Rajasthan',
        sales: {
            value: counts['Rajasthan']
        }
    },
    {
        category: 'Sikkim',
        sales: {
            value: counts['Sikkim']
        }
    },
    {
        category: 'Tamil Nadu',
        sales: {
            value: counts['Tamil Nadu']
        }
    },
    {
        category: 'Telangana',
        sales: {
            value: counts['Telangana']
        }
    },

    {
        category: 'Tripura',
        sales: {
            value: counts['Tripura']
        }
    },
    {
        category: 'Uttar Pradesh',
        sales: {
            value: counts['Uttar Pradesh']
        }
    },
    {
        category: 'Uttarakhand',
        sales: {
            value: counts['Uttaranchal']
        }
    },
    {
        category: 'West Bengal',
        sales: {
            value: counts['West Bengal']
        }
    },
    {
        category: 'Andaman and Nicobar Islands',
        sales: {
            value: counts['Andaman and Nicobar Islands']
        }
    },
    {
        category: 'Chandigarh',
        sales: {
            value: counts['Chandigarh']
        }
    },
    {
        category: 'Dadra & Nagar Haveli',
        sales: {
            value: counts['Dadar and Nagar Haveli']
        }
    },
    {
        category: 'Daman & Diu',
        sales: {
            value: counts['Daman and Diu']
        }
    },

    {
        category: 'Lakshadweep',
        sales: {
            value: counts['Lakshadeep']
        }
    },
    {
        category: 'Puducherry',
        sales: {
            value: counts['Chhattisgarh']
        }
    },
    {
        category: 'Ladakh',
        sales: {
            value: counts['Pondicherry']
        }
    },
];

    // const month = [
    //     2,3,15,7,5,4,14,21
    // ];
    // const monthdone  = [
    //     4,12,1,5,22,21,26,31
    // ];
    // const year = [30,22,11,23,12,2,15,11];
    // const yeardone = [28,15,9,23,10,2,12,10];
    //   labels: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
    //       "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", 
    //       "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    //        "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
    //        "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
    //        "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
    //        "Andaman and Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu",
    //         "Delhi", "Jammu and Kashmir", "Jammu (Winter)",
    //          "Lakshadweep", "Puducherry", "Ladakh"],
    // setup 



    const data = {
        datasets: [{
            label: 'Queries Submitted',
            data: day,
            backgroundColor: [
                "red"
            ],
            borderColor: [
                "red"
            ],

        }, {
            label: 'Queries Solved',
            data: daydone,
            backgroundColor: [
                "green"
            ],
            borderColor: [
                "green"
            ]
        }]
    };

    // config 
    const config = {
        type: 'bar',
        data,
        options: {
            parsing: {
                xAxisKey: 'sales.value',
                yAxisKey: 'category'
            },
            indexAxis: 'y',
        },
        // plugins : [ChartDataLabels]
    };

    // render init block
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    myChart.update();

})

  