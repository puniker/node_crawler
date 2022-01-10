const Crawler = require("crawler")
const {PrintErrorMsg, PrintSuccessMsg} = require('./console')
const fs = require("fs")

const initUrl = process.env.npm_config_url

let urlHistory = []
function addUrlToQueue ( url ) {
    c.queue( url )
}
const c = new Crawler({
    maxConnections: 100,

    callback: (error, res, done) => {
        if (error) {
            console.log( res.options.uri)
            PrintErrorMsg(error)
        } else {
            const url = res.options.uri
            if( res.statusCode === 200 ) {
                PrintSuccessMsg(url)
            } else {
                PrintErrorMsg(url, res.statusCode)
                WriteErrorFile( `${url} => ${res.statusCode}` )
            }
            if ( url.startsWith(initUrl) ) {
                let $ = res.$
                try {
                    let urls = $("a")
                    Object.keys(urls).forEach((item) => {
                        if (urls[item].type === 'tag') {
                            let href = urls[item].attribs.href
                            if (href && !urlHistory.includes(href)) {
                                href = href.trim()
                                urlHistory.push(href)
                                href.startsWith('http') ? addUrlToQueue(href) : addUrlToQueue(`${url}${href}`)
                            }
                        }
                    });
                } catch (e) {
                    console.error(`Error encontrado en la url: ${url}. Abortando.`)
                    done()
                }
            }
            done()

        }

        done()
        
    }
})
let now = new Date()
const errorFile = `logs/errors_${now}.log`

if (initUrl) {
    fs.appendFile(errorFile, '', () => { console.log('Fichero de errores inicializado') })
    c.queue( [initUrl] )
}

const WriteErrorFile = (msg) => { 
    console.log(msg)
    fs.appendFile(errorFile, msg + '\r\n' , () => {

    })

}