const fs = require('fs');

// read the json from a file
const input = require('./big-event.json');

// assuming we want to preserve all fields from the input
function getFieldNamesFromJson(input) {
    const fieldNames = [];
    input.settings.formContentData.forEach(fieldName => {
        fieldNames.push(fieldName)
    });
    return fieldNames;
}

// iterate to create a new JSON object. output should have this format
/**
 * { id: string, fields: [{name: string, value: string | []}]}
 */
function formatFields(input) {
    const result = {
        id: '',
        fields: []
    };

    // set the id based on the input
    result.id = input.form_id;

    // get field names from input for iterating
    const fieldNames = getFieldNamesFromJson(input);

    // iterate over field names from input to build output
    fieldNames.forEach(name => {
        result.fields.push({
            name: name,
            value: input.fields_by_key[name].value
        })
    });

    return result;
}

const formatted = formatFields(input);
fs.writeFile('./event.json', JSON.stringify(formatted, null, 4), err => {
    if (err) {
        console.log("Couldn't save the file.");
        console.log(err);
    } else {
        console.log("Saved the file.");
    }
})
