#!/usr/bin/env node
// CSV Utils
const fs = require('fs');
const parse = require('csv-parse')

require('yargs')
.scriptName("csv-utils")
.usage('$0 <cmd> [args]')

// Convert csv file to json & vice versa
.command(['convert <action> [infile] [outfile]','c <action> [in] [out]'], 'Convert', (yargs) => {
    yargs.positional('action', {
        type: 'string',
        describe: 'Configuration action',
        choices: ['tocsv', 'tojson'],
        string: true
    })
    yargs.positional('infile', {
        type: 'string',
        describe: 'Input File path'
    })
    yargs.positional('outfile', {
        type: 'string',
        describe: 'Output File path'
    })}, 
    function (argv) {
        switch (argv.action) {
            case 'tocsv': {
                console.log('todo!');
                break;
            };
            case 'tojson': {
                if ((!argv.infile)||(!argv.outfile)) { 
                    console.error('Please specify input & output files');
                    process.exit(1);
                }
                var count = 0 
                var parser = 
                    parse(
                    {
                        delimiter: ',',
                        columns: true
                    },
                    function(err, data){
                        for(row of data) {
                            count++
                            console.log(`Row: ${JSON.stringify(row)}`)
                            console.log(`Name: ${row.FIRSTNAME} ${row.SURNAME}`)
                        }
                    })
                    .on('end', function(){
                        console.log(`Rows: ${count}`)
                  })
                  
                let json = fs.createReadStream(argv.infile).pipe(parser);
                //console.log(JSON.stringify(json));
                break;
            };
        }
    })

.option('verbose', {
    alias: 'v',
    describe: 'Verbose Mode'
})
.strict()
.showHelpOnFail(true)
.demandCommand(1, 'Please specify command')
.help()
.argv