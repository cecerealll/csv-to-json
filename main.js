const selectedFile = document.getElementById('csv');
const convertRow = document.getElementById('row');
const convertCol = document.getElementById('col');

let fileToRead;

selectedFile.addEventListener('change', function () {
    fileToRead = selectedFile.files[0];
});



convertRow.addEventListener('click', function readFileRow() {
    // read whatever is in the csv
    const scan = new FileReader();
    if(!fileToRead) {
        console.log('oh no');
    }
    scan.readAsText(fileToRead);
    // when it's done reading
    scan.onload = function (e) {
        // get rid of the weird enter sign for that showed up suddenly for some reason
        const fileString = e.target.result.replace(/\n/ig, '');

        // to split the csv into diff rows
        const fileRows = fileString.split(`\r`);
        console.log(fileRows);

        // split individual words
        const fileCol = fileRows.map(col => col.split(','));

        // get rid of the first empty string
        fileCol[0].shift();

        // the animals array
        const firstRow = fileCol[0];
        console.log(fileCol);

        // use reduce method on the firstRow array, building an object as we go
        const obj = firstRow.reduce((acc, curr) => {
            // acc[curr] somehow represents the key so in this case the heading, made each of them empty objects, looks like dog:{}, cat:{} etc
            acc[curr] = {};

            // do a loop over the rest of the arrays, started at i=1 cuz i=0 is the firstRow
            for (let i = 1; i < fileCol.length; i++) {
                console.log(fileCol[i]);
                console.log(fileCol[i][1])
                // for each animal, add the first key(which are the animal properties) and make them equal to the relative values
                acc[curr][fileCol[i][0]] = fileCol[i][i];
            }
            return acc;

        }, {});

        console.log(JSON.stringify(obj));
        const jsonObj = JSON.stringify(obj, null, 2);
        document.querySelector('.code').innerHTML = `<pre><code>${jsonObj}</code></pre>`;
    }
})

convertCol.addEventListener('click', function readFileCol() {
    const scan = new FileReader();
    scan.readAsText(fileToRead);
    scan.onload = function (e) {
        // get rid of the weird enter sign for that showed up suddenly for some reason
        const fileString = e.target.result.replace(/\n/ig, '');

        // to split the csv into diff rows
        const fileRows = fileString.split(`\r`);

        // split individual words
        const fileCol = fileRows.map(col => col.split(','));

        // get rid of the first empty string
        fileCol[0].shift();
        console.log(fileCol);

        const [properties, ...others] = fileCol;
        console.log(others);
        const obj = others.reduce((acc, curr) => {

            const [heading, ...values] = curr;
            console.log(properties);
            acc[curr[0]] = {};
            for (let i = 0; i < properties.length; i++) {
                console.log(properties[i]);
                acc[curr[0]][properties[i]] = values[i];
            }

            return acc;
        }, {});

        console.log(obj);

        console.log(JSON.stringify(obj));
        const jsonObj = JSON.stringify(obj, null, 2);
        document.querySelector('.code').innerHTML = `<pre><code>${jsonObj}</code></pre>`;
    }
});

// convert the csv file into a JSON file
// this is essentially what we want from the csv
// {
//     "Dog": {
//         "Loud": "yes",
//         "Dirty": "yes",
//         "Fluffy": "yes"
//     },
//     "Cat": {
//         "Loud": "no",
//         "Dirty": "no",
//         "Fluffy": "yes"
//     },
//     "Bird": {
//         "Loud": "yes",
//         "Dirty": "no",
//         "Fluffy": "no"
//     },
//     "Lizard": {
//         "Loud": "no",
//         "Dirty": "no",
//         "Fluffy": "no"
//     }
// }
