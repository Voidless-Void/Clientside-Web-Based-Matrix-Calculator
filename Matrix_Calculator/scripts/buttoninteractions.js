
RowForm=document.getElementById('row-form');

//declaring slider row and column variables
//make row list and column list
allRows=[
    document.getElementsByClassName("r1"),
    document.getElementsByClassName("r2"),
    document.getElementsByClassName("r3"),
    //document.getElementsByClassName("r4"),
    //document.getElementsByClassName("r5"),
    //document.getElementsByClassName("r6")
]
//slider logic for the row slider for adjsuting number and table rows appear/disappear
const rslider = document.getElementById("rowrange");
const routput = document.getElementById("rowvalue");
routput.innerHTML = rslider.value;
const cslider = document.getElementById("columnrange");
const coutput = document.getElementById("columnvalue");
coutput.innerHTML = cslider.value;

rslider.oninput = function () {
  routput.innerHTML = this.value;
  updateTableDisplay();
}

//maeke 
//slider logic for the column slider for adjusting number and table columsn appear/disappear 
cslider.oninput = function () {
  coutput.innerHTML = this.value;
   updateTableDisplay();
    //for loop through rows is equla to slider less than or equal to slider value show
    //loop through chekc columns and then if equal show//nd if not hide
    //then if vlaue is equal to row value then loop through columns and do less than/or equal to columsn value
}

//add table and row visbilty toggling baseed on number rows or columns selected
function updateTableDisplay() {
  const rowValue = parseInt(rslider.value);
  const colValue = parseInt(cslider.value);

  // Loop through rows 1 to 6
  for (let r = 1; r <= 6; r++) {
    // For each row, get all inputs with class "rX" (row)
    const rowInputs = document.getElementsByClassName(`r${r}`);

    // Loop through all inputs in this row
    for (let i = 0; i < rowInputs.length; i++) {
      const input = rowInputs[i];

      // Column number is from the 'name' attribute: e.g., c1, c2 ...
      const colName = input.getAttribute('name'); // "c1", "c2", etc.
      const colNum = parseInt(colName.substring(1)); // get number after "c"

      // Show input if row and column are within slider values, else hide
      if (r <= rowValue && colNum <= colValue) {
        input.style.display = '';
      } else {
        input.style.display = 'none';
      }
    }

    // The <th> cell with row label is always visible, so no need to hide it.
    // If you want to explicitly ensure it's visible:
    const rowHeader = document.querySelector(`#Row${r} > th`);
    if (rowHeader) rowHeader.style.display = '';
  }
}

RefButton=document.getElementById("rowechelon");
RefButton.addEventListener('click',function(){
    if(InputChecker()){
      RefCaller();
    }
    else{
        alert("Not a valid entry! Please fix and fill all entries or make the matrix smaller!")
    }
})
RedRefButton=document.getElementById("reducedrowechelon");
RedRefButton.addEventListener('click',function(){
    if(InputChecker()){
        RedRefCaller();
    }
    else{
        alert("Not a valid entry! Please fix and fill all entries or make the matrix smaller!")
    }
})



function RefCaller(){
    let matrix=MatrixMaker();
    console.log(matrix.toString());
    const row_length = math.size(matrix).get([0]);
    const col_length = math.size(matrix).get([1]);
    let row_start=0;
    let col_start=0;
    let cur_row=0;
    let pivot=[];
    while((cur_row!==row_length)&&(col_start!==col_length)){
        pivot=FindFirstPivotColumnandRow(matrix,row_start,col_start);
        if(pivot.length!==0){
            console.log('pivot');
            let row_temp=pivot[0];
            col_start=pivot[1];
            console.log(row_temp);
            console.log(col_start);
            const row1 = math.row(matrix, row_temp).toArray();
        const row2 = math.row(matrix, cur_row).toArray();
        if(cur_row!==row_temp){
            matrix = math.subset(matrix, math.index(row_temp,math.range(0, matrix.size()[1])), row2);
            matrix = math.subset(matrix, math.index(cur_row,math.range(0, matrix.size()[1])), row1);
            console.log(matrix.toString());
        }
        matrix=MakePivotOne(matrix,cur_row,col_start);   
        console.log(matrix.toString());
        }
        
        matrix=MakeEntriesBelowPivotZero(matrix,col_start,cur_row,row_length);
        console.log(matrix.toString());
        row_start++;
        col_start++;
        cur_row++;
    }
    MatrixOutput(matrix);
}

function RedRefCaller(){
    let matrix=MatrixMaker();
    console.log(matrix.toString());
    const row_length = math.size(matrix).get([0]);
    const col_length = math.size(matrix).get([1]);
    let row_start=0;
    let col_start=0;
    let cur_row=0;
    let pivot=[];
    while((cur_row!==row_length)&&(col_start!==col_length)){
        pivot=FindFirstPivotColumnandRow(matrix,row_start,col_start);
        if(pivot.length!==0){
            console.log('pivot');
            let row_temp=pivot[0];
            col_start=pivot[1];
            console.log(row_temp);
            console.log(col_start);
            const row1 = math.row(matrix, row_temp).toArray();
        const row2 = math.row(matrix, cur_row).toArray();
        if(cur_row!==row_temp){
            matrix = math.subset(matrix, math.index(row_temp,math.range(0, matrix.size()[1])), row2);
            matrix = math.subset(matrix, math.index(cur_row,math.range(0, matrix.size()[1])), row1);
            console.log(matrix.toString());
        }
        matrix=MakePivotOne(matrix,cur_row,col_start);   
        console.log(matrix.toString());
        }
        matrix=MakeEntriesBelowPivotZero(matrix,col_start,cur_row,row_length);
        matrix=MakePivotentriesaboveZero(matrix,col_start,cur_row);
        row_start++;
        col_start++;
        cur_row++;
    }
    MatrixOutput(matrix);
    

}


function InputChecker(){
    const rowValue = parseInt(rslider.value);
    const colValue = parseInt(cslider.value);
    for (let r = 1; r <= 6; r++) {
        // For each row, get all inputs with class "rX" (row)
        const rowInputs = document.getElementsByClassName(`r${r}`);
        for (let i = 0; i < rowInputs.length; i++) {
            const input = rowInputs[i];
            // Column number is from the 'name' attribute: e.g., c1, c2 ...
            const colName = input.getAttribute('name'); // "c1", "c2", etc.
            const colNum = parseInt(colName.substring(1)); // get number after "c"
            // Show input if row and column are within slider values, else hide
            if (r <= rowValue && colNum <= colValue){
                if(input.value===''){
                    return false
                }
            }
        }
    }
    return true
    //need to check input of form to see if they are empty or not and reprompt user if they are or are not.
    //loop through and find visble columns to see if they are empty or not and take in that input and pass it on

}

function MatrixMaker(){
    const rowValue = parseInt(rslider.value);
    const colValue = parseInt(cslider.value);
    matlist=[];
    for (let r = 1; r <= 6; r++) {
        // For each row, get all inputs with class "rX" (row)
        const rowInputs = document.getElementsByClassName(`r${r}`);
         rowlist=[];
        for (let i = 0; i < rowInputs.length; i++) {
            const input = rowInputs[i];
            // Column number is from the 'name' attribute: e.g., c1, c2 ...
            const colName = input.getAttribute('name'); // "c1", "c2", etc.
            const colNum = parseInt(colName.substring(1)); // get number after "c"
            // Show input if row and column are within slider values, else hide
            if (r <= rowValue && colNum <= colValue){
                if(input.value!==''){
                    rowlist.push(parseFloat(input.value));
                }
            }
        }
        if(rowlist.length!==0){
            matlist.push(rowlist);
        }
    }
    const matrix=math.matrix(matlist);
    return matrix;
}

function FindFirstPivotColumnandRow(matrix,row_start,col_start){
    const rowlength = math.size(matrix).get([0]);
    const collength = math.size(matrix).get([1]);
    let pivot=[];
    outerLoop: for(let c=col_start;c<collength;c++){
        for(let r=row_start;r<rowlength;r++){
            const value = math.subset(matrix, math.index(r, c));
            if(value!==0){
                pivot.push(r);
                pivot.push(c);
                break outerLoop;
            }
        }
    }
    return pivot;
}

function MakePivotOne(matrix,row,col){
    let divisor=matrix.get([row,col]);
    if(divisor!==0){
        console.log(divisor);
        let scalar=1/divisor;
        console.log(scalar,divisor,row,col);
        const temp_row=math.row(matrix,row);
        const updated_row=math.multiply(temp_row,scalar);
        matrix=math.subset(matrix, math.index(row,math.range(0, matrix.size()[1])), updated_row.toArray());
    }
    return matrix;
}

function MakeEntriesBelowPivotZero(matrix,col,row,row_length){
    let zeros_below=false;
    
    let nxt_row=row+1;
    if (nxt_row!==row_length){
        let scalar=-(matrix.get([nxt_row, col]));
    }
    if(row<row_length-1){
        let scalar=-(matrix.get([nxt_row, col]));
        if(scalar===0){
            zeros_below=true;
        }
        while(zeros_below===false){
            let scalar=-(matrix.get([nxt_row, col])); 
            const temp_row=math.row(matrix,nxt_row);
            const adder_row=math.row(matrix,row);
            const updated_row=math.multiply(adder_row,scalar);
            const new_row = math.add(temp_row,updated_row);
            matrix=math.subset(matrix,math.index(nxt_row,math.range(0, matrix.size()[1])), new_row.toArray());
            nxt_row++;
            if(nxt_row==row_length){
                zeros_below=true;
            }
        }
    }
    return matrix;
}

function MakePivotentriesaboveZero(matrix,col,row){
    let zeros_above=false;
    if(row!==0){
        let nxt_row=row-1;
        if(math.isZero(math.subset(matrix,math.index(row,col)))){
            console.log('is Zero')
            zeros_above=true;

        }
        while(zeros_above===false){
            let scalar=-(matrix.get([nxt_row, col])); 
            const temp_row=math.row(matrix,nxt_row);
            const adder_row=math.row(matrix,row);
            const updated_row=math.multiply(adder_row,scalar);
            const new_row = math.add(temp_row,updated_row);
            matrix=math.subset(matrix,math.index(nxt_row,math.range(0, matrix.size()[1])), new_row.toArray());
            nxt_row--;
            if(nxt_row<0){
                zeros_above=true;
            }
        }
    }
    return matrix;
}

function MatrixOutput(matrix){
    let ouput_arr=matrix.valueOf();
    const rowValue = parseInt(rslider.value);
    const colValue = parseInt(cslider.value);
    const rowlength = math.size(matrix).get([0]);
    for (let r = 1; r <= rowlength; r++) {
        // For each row, get all inputs with class "rX" (row)
        const rowInputs = document.getElementsByClassName(`r${r}`);
        // Loop through all inputs in this row
        for (let i = 0; i < rowInputs.length; i++) {
        const input = rowInputs[i];

        // Column number is from the 'name' attribute: e.g., c1, c2 ...
        const colName = input.getAttribute('name'); // "c1", "c2", etc.
        const colNum = parseInt(colName.substring(1)); // get number after "c"

        // Show input if row and column are within slider values, else hide
        if (r <= rowValue && colNum <= colValue) {
            input.value = ouput_arr[r-1][i];
        } else {
            input.style.display = 'none';

        }
        }

        // The <th> cell with row label is always visible, so no need to hide it.
        // If you want to explicitly ensure it's visible:
        const rowHeader = document.querySelector(`#Row${r} > th`);
        if (rowHeader) rowHeader.style.display = '';
  }
}
