export const SITE_CONTACT = {
    phoneDisplay: '(304) 649-2607',
    phoneHref: 'tel:+13046492607',
    phone: '+13046492607',                     // Schema.org E.164 format
    addressLines: [
        'WV Wild Outdoors',
        '121 Birch River Rd',
        'Birch River, WV 26610',
    ],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=WV+Wild+Outdoors+121+Birch+River+Rd+Birch+River+WV',
    // Highway positioning for out-of-state hunters (Phase 3A)
    highway: {
        interstate: 'I-79',
        exit: '57',
        exitName: 'Frametown',
        milesFromExit: 3,
        directions: "Take I-79 Exit 57, head south on US-19 for 3 miles. We're on the right.",
    },
    // Nearby Wildlife Management Areas for hunting SEO
    nearbyWMAs: [
        { name: 'Burnsville Lake WMA', distance: '15 min' },
        { name: 'Elk River WMA', distance: '20 min' },
        { name: 'Stonewall Jackson Lake WMA', distance: '30 min' },
    ],
};
