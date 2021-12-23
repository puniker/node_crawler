const Crawler = require('crawler')
const {PrintErrorMsg, PrintSuccessMsg} = require('../console')

const cImg = new Crawler({
    maxConnections: 10,
    callback: (error, res, done) => {
        if ( error ) {
            console.log( error )
        } else {
            if ( res.statusCode === 200 ) {
                PrintSuccessMsg(res.options.uri)
            } else {
                // error fetch
                PrintErrorMsg(res.options.uri, res.statusCode)

            }
        }

        done()
    }
})

const c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error)
        } else {
            const crawledPage = res.options.uri
            //const $ = res.$
            //console.log ( res.$('img')[0] )
            if ( res.statusCode === 200 ) {
                const images = res.$('img')
                var allImages = []
                images.each( index => {
                    const img_src = images[index].attribs.src
                    var img_path
                    ( img_src.startsWith("http") ) ? img_path = new URL(img_src).pathname : img_path = img_src
                    //PrintSuccessMsg(crawledPage + img_path)
                    allImages = [ ...allImages, crawledPage + img_path]
                })
                console.log(`${allImages.length} imagenes encontradas en el site.`)
                cImg.queue(allImages)

            } else {
                console.log( 'Error de conexión con servidor', res.statusCode );
            }
        }

        done()
        
    }
})

c.queue( process.env.npm_config_url );
