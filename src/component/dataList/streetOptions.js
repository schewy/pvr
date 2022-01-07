const streetOptions = [
    {
        "value": "",
        "label": "Specials",
        "city": "Special"
    },
    {
        "value": "Gorilla Gate",
        "label": "Gorilla Gate",
        "city":"Yellow Yards",
        "district" : "Buenas Bananas"
    },
    {
        "value": "Winston Way",
        "label": "Winston Way",
        "city":"Beige Bay",
        "district":"Tobacco Trees"
    },
    {
        "value": "Licky Loops",
        "label": "Licky Loops",
        "city":"Orange Oasis",
        "district":"Apricot Alley",
    },
    {
        "value": "Rusty Ridge",
        "label": "Rusty Ridge",
        "city":"Beige Bay",
        "district":"The Soils"
    },
    {
        "value": "Cobra Cove",
        "label": "Cobra Cove",
        "city":"Beige Bay",
        "district":"Sandy Secrets"
    },
    {
        "value": "Morris Mews",
        "label": "Morris Mews",
        "city":"Beige Bay",
        "district":"Tobacco Trees"
    },
    {
        "value": "Peaky Parkway",
        "label": "Peaky Parkway",
        "city":"Yellow Yards",
        "district":"Lemon Lands",
    },
    {
        "value": "Smooth Suburbs",
        "label": "Smooth Suburbs",
        "city":"Green Grove",
        "district":"Avocado Avenues",
    },
    {
        "value": "Ape Gang Avenue",
        "label": "Ape Gang Avenue",
        "city":"Yellow Yards",
        "district":"Buenas Bananas"
    },
    {
        "value": "Ecliptic Ends",
        "label": "Ecliptic Ends",
        "city":"X AE X-II",
        "district":"Elon Estates"
    },
    {
        "value": "Raspberry Road",
        "label": "Raspberry Road",
        "city":"Purple Palms ",
        "district":"Berrington Bay",
    },
    {
        "value": "Polished Plaza",
        "label": "Polished Plaza",
        "city":"Blue Bayside",
        "district":"San Sapphire"
    },
    {
        "value": "Tiny Community",
        "label": "Tiny Community",
        "city":"Orange Oasis",
        "district":"Tangerine Tinies"
    },
    {
        "value": "Volcanic Ville",
        "label": "Volcanic Ville",
        "city":"X AE X-II",
        "district":"Terrestial Town"
    },
    {
        "value": "Shiraz Square",
        "label": "Shiraz Square",
        "city":"Purple Palms ",
        "district":"Grapey Gardens"
    },
    {
        "value": "Cake Crescent",
        "label": "Cake Crescent",
        "city":"Yellow Yards",
        "district":"Buttergonia",
    },
    {
        "value": "Fresh Rise",
        "label": "Fresh Rise",
        "city":"Orange Oasis",
        "district":"Apricot Alley"
    },
    {
        "value": "Blueberry Beach",
        "label": "Blueberry Beach",
        "city":"Purple Palms ",
        "district":"Berrington Bay"
    },
    {
        "value": "Scary Road",
        "label": "Scary Road",
        "city":"Orange Oasis",
        "district":"Port Pumpkin"
    },
    {
        "value": "Refractive Road",
        "label": "Refractive Road",
        "city":"Blue Bayside",
        "district":"San Sapphire",
    },
    {
        "value": "Lucky Lane",
        "label": "Lucky Lane",
        "city":"Beige Bay",
        "district":"Tobacco Trees"
    },
    {
        "value": "Scented Street",
        "label": "Scented Street",
        "city":"Purple Palms ",
        "district":"Lazy Lavenders"
    },
    {
        "value": "Resonance Road",
        "label": "Resonance Road",
        "city":"Green Grove",
        "district":"Emerald Ends",
    },
    {
        "value": "Little Lane",
        "label": "Little Lane",
        "city":"Orange Oasis",
        "district":"Tangerine Tinies",
    },
    {
        "value": "Galactic Gates",
        "label": "Galactic Gates",
        "city":"Blue Bayside",
        "district":"Starry Skies",
    },
    {
        "value": "Wine Way",
        "label": "Wine Way",
        "city":"Purple Palms ",
        "district":"Grapey Gardens"
    },
    {
        "value": "Pesto Park",
        "label": "Pesto Park",
        "city":"Green Grove",
        "district":"Basil Borough"
    },
    {
        "value": "Juice Road",
        "label": "Juice Road",
        "city":"Orange Oasis",
        "district":"Mount Mango",
    },
    {
        "value": "Pigeon Park",
        "label": "Pigeon Park",
        "city":"Beige Bay",
        "district":"The Soils",
    },
    {
        "value": "Clay Circus",
        "label": "Clay Circus",
        "city":"Beige Bay",
        "district":"Muddy Mountains"
    },
    {
        "value": "Seed Street",
        "label": "Seed Street",
        "city":"Beige Bay",
        "district":"The Soils"
    },
    {
        "value": "Root Road",
        "label": "Root Road",
        "city":"Green Grove",
        "district":"Froggy Forest"
    },
    {
        "value": "Lobelia Lane",
        "label": "Lobelia Lane",
        "city":"Purple Palms ",
        "district":"Violet Ville"
    },
    {
        "value": "Squeezy Street",
        "label": "Squeezy Street",
        "city":"Yellow Yards","district":"Lemon Lands"
    },
    {
        "value": "Rocket Ridge",
        "label": "Rocket Ridge","city":"X AE X-II","district":"Elon Estates"
    },
    {
        "value": "Jumpy Lane",
        "label": "Jumpy Lane","city":"Orange Oasis","district":"Carrot Cove"
    },
    {
        "value": "Leaf Lane",
        "label": "Leaf Lane","city":"Beige Bay","district":"Wasted Woods"
    },
    {
        "value": "Wasabi Way",
        "label": "Wasabi Way","city":"Green Grove","district":"Froggy Forest"
    },
    {
        "value": "Strawberry Square",
        "label": "Strawberry Square","city":"Purple Palms ","district":"Berrington Bay"
    },
    {
        "value": "Hammer Hill",
        "label": "Hammer Hill","city":"Green Grove","district":"Emerald Ends"
    },
    {
        "value": "Carmine Circus",
        "label": "Carmine Circus","city":"X AE X-II","district":"Orbital Oasis"
    },
    {
        "value": "Hubble Hills",
        "label": "Hubble Hills","city":"Blue Bayside","district":"Starry Skies"
    },
    {
        "value": "Flour Way",
        "label": "Flour Way", "city":"Yellow Yards","district":"Buttergonia"
    },
    {
        "value": "Naranja Narrows",
        "label": "Naranja Narrows", "city":"Orange Oasis","district":"Mount Mango"
    },
    {
        "value": "Salty Strip",
        "label": "Salty Strip", "city":"Blue Bayside","district":"Oyster Oceans"
    },
    {
        "value": "Bunny Beach",
        "label": "Bunny Beach", "city":"Orange Oasis","district":"Carrot Cove"
    },
    {
        "value": "Rough Road",
        "label": "Rough Road", "city":"Beige Bay","district":"Muddy Mountains"
    },
    {
        "value": "Spicy Stream",
        "label": "Spicy Stream","city":"Green Grove","district":"Froggy Forest"
    },
    {
        "value": "Eyesight Road",
        "label": "Eyesight Road","city":"Orange Oasis","district":"Carrot Cove"
    },
    {
        "value": "Ruby Rise",
        "label": "Ruby Rise","city":"X AE X-II","district":"Orbital Oasis"
    },
    {
        "value": "Raisin Road",
        "label": "Raisin Road", "city":"Purple Palms ","district":"Grapey Gardens"
    },
    {
        "value": "Pit Park",
        "label": "Pit Park","city":"Orange Oasis","district":"Mount Mango"
    },
    {
        "value": "Dough Drive",
        "label": "Dough Drive","city":"Yellow Yards","district":"Buttergonia"
    },
    {
        "value": "Lumber Lake",
        "label": "Lumber Lake","city":"Beige Bay","district":"Wasted Woods"
    },
    {
        "value": "Pagua Path",
        "label": "Pagua Path", "city":"Green Grove","district":"Avocado Avenues"
    },
    {
        "value": "Dynamic Dunes",
        "label": "Dynamic Dunes", "city":"Beige Bay","district":"Sandy Secrets"
    },
    {
        "value": "Carved Lane",
        "label": "Carved Lane", "city":"Orange Oasis","district":"Port Pumpkin"
    },
    {
        "value": "Levitating Lavas",
        "label": "Levitating Lavas", "city":"X AE X-II","district":"Terrestial Town"
    },
    {
        "value": "Trick Or Street",
        "label": "Trick Or Street", "city":"Orange Oasis","district":"Port Pumpkin"
    },
    {
        "value": "Guaca Gardens",
        "label": "Guaca Gardens", "city":"Green Grove","district":"Avocado Avenues"
    },
    {
        "value": "Musky Alley",
        "label": "Musky Alley", "city":"X AE X-II","district":"Elon Estates"
    },
    {
        "value": "Gutter Gate",
        "label": "Gutter Gate", "city":"Beige Bay","district":"Sandy Secrets"
    },
    {
        "value": "Ares Alpines",
        "label": "Ares Alpines", "city":"X AE X-II","district":"Terrestial Town"
    },
    {
        "value": "Wanderers Way",
        "label": "Wanderers Way", "city":"Beige Bay","district":"Muddy Mountains"
    },
    {
        "value": "Icy Isle",
        "label": "Icy Isle", "city":"Beige Bay","district":"Wasted Woods"
    },
    {
        "value": "Shiny Street",
        "label": "Shiny Street", "city":"Yellow Yards","district":"Sunny Sands"
    },
    {
        "value": "Beam Boulevard",
        "label": "Beam Boulevard", "city":"Blue Bayside","district":"Starry Skies"
    },
    {
        "value": "Amethyst Avenue",
        "label": "Amethyst Avenue", "city":"Purple Palms ","district":"Violet Ville"
    },
    {
        "value": "Rover Road",
        "label": "Rover Road", "city":"X AE X-II","district":"Orbital Oasis"
    },
    {
        "value": "Drippy Drive",
        "label": "Drippy Drive", "city":"Orange Oasis","district":"Apricot Alley"
    },
    {
        "value": "Hexagon Hills",
        "label": "Hexagon Hills", "city":"Blue Bayside","district":"San Sapphire"
    },
    {
        "value": "Citrus Circus",
        "label": "Citrus Circus", "city":"Yellow Yards","district":"Lemon Lands"
    },
    {
        "value": "Goldmann Lane",
        "label": "Goldmann Lane", "city":"Yellow Yards","district":"Sunny Sands"
    },
    {
        "value": "Divers Drive",
        "label": "Divers Drive", "city":"Blue Bayside","district":"Oyster Oceans"
    },
    {
        "value": "Sunray Road",
        "label": "Sunray Road", "city":"Yellow Yards","district":"Sunny Sands"
    },
    {
        "value": "Fort Wenty",
        "label": "Fort Wenty", "city":"Green Grove","district":"Basil Borough"
    },
    {
        "value": "Wavy Way",
        "label": "Wavy Way", "city":"Blue Bayside","district":"Oyster Oceans"
    },
    {
        "value": "Cider Crescent",
        "label": "Cider Crescent", "city":"Purple Palms ","district":"Violet Ville"
    },
    {
        "value": "Kongs Cross",
        "label": "Kongs Cross", "city":"Yellow Yards","district":"Buenas Bananas"
    },
    {
        "value": "Fragrant Farm",
        "label": "Fragrant Farm", "city":"Purple Palms ","district":"Lazy Lavenders"
    },
    {
        "value": "Dreamy Drive",
        "label": "Dreamy Drive", "city":"Orange Oasis","district":"Tangerine Tinies"
    },
    {
        "value": "Mauve Meadow",
        "label": "Mauve Meadow", "city":"Purple Palms ","district":"Lazy Lavenders"
    },
    {
        "value": "Dried Drive",
        "label": "Dried Drive", "city":"Green Grove","district":"Basil Borough"
    },
    {
        "value": "Pine Path",
        "label": "Pine Path", "city":"Green Grove","district":"Emerald Ends"
    }
]

export default streetOptions;