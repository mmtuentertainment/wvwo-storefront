export const SITE_CONTACT = {
    phoneDisplay: '(304) 649-2607',
    phoneHref: 'tel:+13046492607',
    phone: '+13046492607',                     // Schema.org E.164 format
    addressLines: [
        'WV Wild Outdoors',
        '121 WV-82',
        'Birch River, WV 26610',
    ],
    hours: 'Mon-Sat 10am-5pm',                 // Store hours (single source of truth)
    mapsUrl: 'https://www.google.com/maps?q=38.499062065971785,-80.75460796564259',
    // Highway positioning for out-of-state hunters (Phase 3A)
    highway: {
        interstate: 'I-79',
        exit: '57',
        exitName: 'Little Birch/Cowen',         // Exit 57 sign text
        feetFromExit: 1500,                    // ~1500 feet from Exit 57, across from GoMart
        directions: "Take I-79 Exit 57. We're across from GoMart, visible from Rt 19.",
    },
    // Drive times from major cities for highway hunter capture
    driveTimes: [
        { city: 'Pittsburgh, PA', time: '~2.5 hours' },
        { city: 'Charleston, WV', time: '~1.5 hours' },
        { city: 'Charlotte, NC', time: '~5 hours' },
    ],
    // Nearby Wildlife Management Areas for hunting SEO
    nearbyWMAs: [
        { name: 'Burnsville Lake WMA', distance: '20 min' },
        { name: 'Elk River WMA', distance: '15 min' },
        { name: 'Stonewall Jackson Lake WMA', distance: '40 min' },
    ],
};
