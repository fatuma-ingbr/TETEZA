const staticCacheDB = 'staticCacheDB';
const dynamicCacheDB = 'dynamicCacheDB';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/style.css',
    '/css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];

//function to limit cache size
//const limitCacheSize = (name, size) =>{
//    caches.open(name).then(cache => {
//        cache.keys().then(keys =>{
//            if(keys.length > size){
//                cache.delete(keys[0]).then(limitCacheSize(name,size))
//            }
//        })
//    })
//};



//pre-caching app shell/core assets
self.addEventListener('install', evt =>{
    evt.waitUntil(
        caches.open(staticCacheDB).then(cache =>{
            console.log('cashing shell assets');
            cache.addAll(assets);
        })
    )
});

self.addEventListener('activate', evt =>{
    //console.log('service worker has been activated.');
    
    evt.waitUntil(
        caches.keys().then(keys =>{
            return Promise.all(keys
                .filter(key => key !==  staticCacheDB  && dynamicCacheDB)
                .map(key => caches.delete(key)))
        })
    );
});

self.addEventListener('fetch', evt =>{
    
    if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
        evt.respondWith(
        caches.match(evt.request).then(cacheRes =>{
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheDB).then(cache =>{
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheDB, 25);
                    return fetchRes;
                })
            });
        }).catch(() =>{
            if(evt.request.url.indexOf('.html' > -1)){
                return caches.match('/index.html');
            }
        })
        );
    };
});
















