export const SITE_CONTACT = {
    phoneDisplay: '(304) 649-2607',
    phoneHref: 'tel:+13046492607',
    phone: '+13046492607',                     // Schema.org E.164 format
    addressLines: [
        'WV Wild Outdoors',
        '14 Candy St',
        'Birch River, WV 26610',
    ],
    hours: 'Mon-Sat 10am-5pm',                 // Store hours (single source of truth)
    mapsUrl: 'https://www.google.com/maps/place/14+Candy+St,+Birch+River,+WV+26610',
    // Highway positioning for out-of-state hunters (Phase 3A)
    highway: {
        interstate: 'I-79',
        exit: '57',
        exitName: 'Frametown',
        feetFromExit: 1500,                    // ~1500 feet from Exit 57, across from fire station road
        directions: "Take I-79 Exit 57 (Frametown). We're just off the exit, across from the fire station road.",
    },
    // Nearby Wildlife Management Areas for hunting SEO
    nearbyWMAs: [
        { name: 'Burnsville Lake WMA', distance: '20 min' },
        { name: 'Elk River WMA', distance: '15 min' },
        { name: 'Stonewall Jackson Lake WMA', distance: '40 min' },
    ],
};
