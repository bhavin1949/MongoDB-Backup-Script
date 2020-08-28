
const fs = require('fs');
const _ = require('lodash');
const exec = require('child_process').exec;
const path = require('path');
const { spawn } = require('child_process');
const rmdir = require('rimraf');

// Concatenate root directory path with our backup folder.
const backupDirPath = "C:\\disk back up\\MongoDB\\"

const dbOptions = {
    user: 'gemfind',
    pass: 'Express#321',
    host: '34.205.171.23',
    port: 27017,
    database: 'gemfind',
    autoBackup: true,
    removeOldBackup: true,
    keepLastDaysBackup: 2,
    autoBackupPath: backupDirPath
};

// return stringDate as a date object.
exports.stringToDate = dateString => {
    return new Date(dateString);
};

// Check if variable is empty or not.
exports.empty = mixedVar => {
    let undef, key, i, len;
    const emptyValues = [undef, null, false, 0, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedVar === emptyValues[i]) {
            return true;
        }
    }
    if (typeof mixedVar === 'object') {
        for (key in mixedVar) {
            return false;
        }
        return true;
    }
    return false;
};

// Auto backup function
exports.dbAutoBackUp = () => {
    // check for auto backup is enabled or disabled
    if (dbOptions.autoBackup == true) {
        let date = new Date();
        let beforeDate, oldBackupDir, oldBackupPath;

        // Current date
        currentDate = this.stringToDate(date);
        let newBackupDir =
            currentDate.getFullYear() +
            '-' +
            (currentDate.getMonth() + 1) +
            '-' +
            currentDate.getDate();

        // New backup path for current backup process
        let newBackupPath = dbOptions.autoBackupPath + 'GemfindBackup-' + newBackupDir;
        // check for remove old backup after keeping # of days given in configuration
        if (dbOptions.removeOldBackup == true) {
            beforeDate = _.clone(currentDate);
            // Substract number of days to keep backup and remove old backup
            beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup);
            oldBackupDir =
                beforeDate.getFullYear() +
                '-' +
                (beforeDate.getMonth() + 1) +
                '-' +
                beforeDate.getDate();
            // old backup(after keeping # of days)
            oldBackupPath = dbOptions.autoBackupPath + 'GemfindBackup-' + oldBackupDir;
        }


        var args = ['--host', dbOptions.host, '--port', dbOptions.port, '--db', dbOptions.database, '--username', dbOptions.user,
            '--password', dbOptions.pass, '--out', newBackupPath]
        mongodump = spawn('C:\\Program Files\\MongoDB\\Server\\4.2\\bin\\mongodump', args);
        mongodump.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        mongodump.stderr.on('data', function (data) {
            if (dbOptions.removeOldBackup == true) {
                if (fs.existsSync(oldBackupPath)) {
                    rmdir(oldBackupPath, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Successfully removed the olbackup directory" + oldBackupPath)
                        }
                    })
                }
            }
        });
        mongodump.on('exit', function (code) {
            console.log('mongodump exited with code ' + code);

        });
    }
};