const Crawler = require("crawler")
const {PrintErrorMsg, PrintSuccessMsg} = require('../console')

const initUrl = process.env.npm_config_url

let urlHistory = []
function addUrlToQueue ( url ) {
    c.queue( url )
}
const c = new Crawler({
    maxConnections: 100,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            PrintErrorMsg(error)
        } else {
            const url = res.options.uri
            if( res.statusCode === 200 ) {
                PrintSuccessMsg(url)
            } else {
                PrintErrorMsg(url, res.statusCode)
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
if (initUrl) {
    c.queue( [initUrl] )
}
