const list_element = document.getElementById('table');
const pagination_element = document.getElementById('pagination');
const row_element = document.getElementById('rowing');

let current_page = 1;
let rows = 5;

function DisplayList (items, wrapper, rows_per_page, page) {
	wrapper.innerHTML = "";
	page--;

    if(items.length>0){
    let myTable = document.querySelector('#table');

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = items.slice(start, end);

    let headers = ['Kode', 'Kelas', 'Kode MK', 'Nama MK', 'SKS'];
   
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    myTable.appendChild(table);

	for (let i = 0; i < paginatedItems.length; i++) {
		let emp = paginatedItems[i];

        let row = document.createElement('tr');
        Object.values(emp).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        table.appendChild(row);
		
	}
    }
    else{

    }
}

function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, items) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		DisplayList(items, list_element, rows, current_page);

		let current_btn = document.querySelector('.pagenumbers button.active');
		// if(current_btn.classList.contains('active'))
        current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}

function SetupRow (items, wrapper) {
	wrapper.innerHTML = "";

    let btn = RowButton(10, items);
    wrapper.appendChild(btn);
    let btn2 = RowButton(15, items);
    wrapper.appendChild(btn2);
    let btn3 = RowButton(25, items);
    wrapper.appendChild(btn3);
	
}

function RowButton (page, items) {
	let button = document.createElement('button');
	button.innerText = page;

	if (rows == page) button.classList.add('active');
    
	button.addEventListener('click', function () {
        ChangeRow(items, current_page, page)

		button.classList.add('active');
	});

	return button;
}

function ChangeRow (items, page, row){
    if(items.length!=0){
        const log = document.getElementById('log');
        
        log.textContent = "";

        rows = row
        DisplayList(items, list_element, row, page);
        SetupPagination(items, pagination_element, row);
        SetupRow(items, row_element);
    }
    else{
        const log = document.getElementById('log');
        
        log.textContent = "Pencarian tidak ditemukan";
        console.log("oaskdaos")
        DisplayList(items, list_element, row, page);
        SetupPagination(items, pagination_element, row);
        SetupRow(items, row_element);
    }
}

    const searchform = document.querySelector('#searchq');

const log = document.getElementById('log');

searchform.addEventListener('change', SearchQuery)

function SearchQuery(e) {
    fetch("./storage.json")
        .then(function(resp){
            return resp.json();
        })
        .then(function(data){
            console.log(data);
       
            var searchResult = data.filter( 
                (x) => x.namamk.toLowerCase().includes(e.target.value.toLowerCase())
                || x.kodemk.toLowerCase().includes(e.target.value.toLowerCase())
                || x.kodek.toLowerCase().includes(e.target.value.toLowerCase())
                || x.namak.toLowerCase().includes(e.target.value.toLowerCase())
                || x.sks.toLowerCase().includes(e.target.value.toLowerCase()) 
            )

            console.log(e.target.value)
            console.log(searchResult)
            ChangeRow(searchResult, current_page, rows)
        });
        
}

function DalamProdiNew(){
    fetch("./storage.json")
        .then(function(resp){
            return resp.json();
        })
        .then(function(data){

            var searchResult = data.filter( 
                (x) => x.kodemk.toLowerCase().includes('if')
            )

            console.log(searchResult)
            current_page = 1
            ChangeRow(searchResult, 1, rows)
        });
}

function LuarProdiNew(){
    fetch("./storage.json")
        .then(function(resp){
            return resp.json();
        })
        .then(function(data){

            var searchResult = data.filter( 
                (x) => !x.kodemk.toLowerCase().includes('if')
            )


            console.log(searchResult)
            current_page = 1
            ChangeRow(searchResult, 1, rows)
        });
}

fetch("./storage.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data);
        list_items = data
        DisplayList(list_items, list_element, rows, current_page);
        SetupPagination(list_items, pagination_element, rows);
        SetupRow(list_items, row_element);
    });
