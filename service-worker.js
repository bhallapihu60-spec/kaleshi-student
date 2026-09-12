/* =================================================
   KALESHI — SERVICE WORKER
   ================================================= */


/* =================================================
   CACHE SETTINGS
   ================================================= */

const CACHE_NAME = "kaleshi-student-v1";


const APP_FILES = [

    "./",

    "./index.html",
    "./notes.html",
    "./todo.html",
    "./calendar.html",

    "./style.css",

    "./script.js",
    "./notes.js",
    "./todo.js",
    "./calendar.js",

    "./manifest.json",
    "./icon.png"

];


/* =================================================
   INSTALL
   ================================================= */

self.addEventListener(
    "install",
    function (event) {

        event.waitUntil(

            caches.open(CACHE_NAME)

                .then(function (cache) {

                    return cache.addAll(
                        APP_FILES
                    );

                })

                .then(function () {

                    return self.skipWaiting();

                })

        );

    }
);


/* =================================================
   ACTIVATE
   ================================================= */

self.addEventListener(
    "activate",
    function (event) {

        event.waitUntil(

            caches.keys()

                .then(function (cacheNames) {

                    return Promise.all(

                        cacheNames

                            .filter(function (cacheName) {

                                return (
                                    cacheName !==
                                    CACHE_NAME
                                );

                            })

                            .map(function (cacheName) {

                                return caches.delete(
                                    cacheName
                                );

                            })

                    );

                })

                .then(function () {

                    return self.clients.claim();

                })

        );

    }
);


/* =================================================
   FETCH
   ================================================= */

self.addEventListener(
    "fetch",
    function (event) {

        /*
         * Only handle normal GET requests.
         */

        if (event.request.method !== "GET") {
            return;
        }


        event.respondWith(

            caches.match(event.request)

                .then(function (cachedResponse) {

                    /*
                     * If the file is already cached,
                     * use the cached version.
                     */

                    if (cachedResponse) {

                        return cachedResponse;

                    }


                    /*
                     * Otherwise try the internet.
                     */

                    return fetch(event.request)

                        .then(function (networkResponse) {

                            /*
                             * Save successful responses
                             * in the cache.
                             */

                            if (
                                networkResponse &&
                                networkResponse.status === 200 &&
                                networkResponse.type === "basic"
                            ) {

                                const responseClone =
                                    networkResponse.clone();


                                caches.open(CACHE_NAME)

                                    .then(function (cache) {

                                        cache.put(
                                            event.request,
                                            responseClone
                                        );

                                    });

                            }


                            return networkResponse;

                        })

                        .catch(function () {

                            /*
                             * If there is no internet
                             * and the page is not cached,
                             * show the home page.
                             */

                            return caches.match(
                                "./index.html"
                            );

                        });

                })

        );

    }
);


/* =================================================
   MESSAGE
   ================================================= */

self.addEventListener(
    "message",
    function (event) {

        if (
            event.data &&
            event.data.type === "SKIP_WAITING"
        ) {

            self.skipWaiting();

        }

    }
);
