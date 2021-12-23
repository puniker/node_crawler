
const PrintErrorMsg = ( msg = '', alert = 'ERROR' ) => {
    console.log(msg, '\x1b[41m\x1b[34m'+ alert +'\x1b[0m')
}
const PrintSuccessMsg = ( msg = '', alert = 'OK' ) => {
    console.log(msg, '\x1b[42m\x1b[30m' + alert + '\x1b[0m')
}

module.exports = {PrintErrorMsg, PrintSuccessMsg}