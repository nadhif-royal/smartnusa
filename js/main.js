/* FILE: js/main.js - FINAL SMARTNUSA (Complete 7-Days Detailed Itinerary) */

// --- 1. GLOBAL HELPER FUNCTIONS ---
window.scrollContainer = function(containerId, scrollAmount) {
    const container = document.getElementById(containerId);
    if (container) {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
};

window.switchFeature = function(element, featureId) {
    const allItems = document.querySelectorAll('.feature-item');
    allItems.forEach(item => { item.classList.remove('active'); });
    if (element) { element.classList.add('active'); }
};

// --- 2. MAIN LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("SmartNusa JS Loaded.");

    // A. Navbar Sticky
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    // B. Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.classList.remove('ph-list'); icon.classList.add('ph-x');
                } else {
                    icon.classList.remove('ph-x'); icon.classList.add('ph-list');
                }
            }
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // C. MOCKUP SLIDESHOW (SMOOTH PRELOADER FIX)
    const sliderImg = document.getElementById('mockup-slider');
    
    // Daftar Frame Lengkap
    const frames = [
        'assets/FrameSplashScreen.png', 
        'assets/FrameSplashScreen2.png',
        'assets/FrameDashboard.png', 
        'assets/FrameNusaAI.png',
        'assets/FrameNusaAI2.png',
        'assets/FrameSmartItinerary.png',
        'assets/FrameAboutItinerary.png',
        'assets/FrameChatBot.png',
        'assets/FrameNusaTrip.png', 
        'assets/FrameTravelMate.png',
        'assets/FrameNusaSOS.png',
        'assets/FrameNusaPoints.png',
        'assets/FrameNusaEco.png'
    ];

    function preloadImages(imageArray) {
        imageArray.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }

    preloadImages(frames);

    let currentFrameIndex = 0;
    
    if(sliderImg) {
        setInterval(() => {
            sliderImg.classList.add('fade-out'); 
            setTimeout(() => {
                currentFrameIndex = (currentFrameIndex + 1) % frames.length;
                const nextImageSrc = frames[currentFrameIndex];

                const tempLoader = new Image();
                tempLoader.onload = () => {
                    sliderImg.src = nextImageSrc;
                    sliderImg.classList.remove('fade-out');
                };
                tempLoader.src = nextImageSrc;

                setTimeout(() => {
                    if (sliderImg.classList.contains('fade-out')) {
                        sliderImg.src = nextImageSrc; 
                        sliderImg.classList.remove('fade-out');
                    }
                }, 2000);

            }, 500); 
        }, 3500); 
    }

    // D. Itinerary Generator Logic
    const demoForm = document.getElementById('itinerary-form');
    const resultDiv = document.getElementById('demo-result');
    const timelineContainer = document.getElementById('timeline-container');
    
    if (demoForm) {
        const submitBtn = demoForm.querySelector('button');

        demoForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const loc = document.getElementById('location').value;
            const days = parseInt(document.getElementById('days').value);
            const budget = document.getElementById('budget').value;

            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Generating...';
            submitBtn.disabled = true;

            setTimeout(() => {
                try {
                    document.getElementById('res-loc').innerText = loc;
                    document.getElementById('res-days').innerText = days + " Days";
                    document.getElementById('res-budget').innerText = budget;

                    let htmlContent = generateSmartTimeline(loc, days, budget);

                    timelineContainer.innerHTML = htmlContent;
                    resultDiv.classList.remove('hidden');
                    
                } catch (error) {
                    console.error("Error generating itinerary:", error);
                    timelineContainer.innerHTML = "<p style='color:red;'>Something went wrong. Please try again.</p>";
                    resultDiv.classList.remove('hidden');
                } finally {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 1200);
        });
    }
});

// --- 3. DATABASE ITINERARY (COMPREHENSIVE 7 DAYS ALL BUDGETS) ---
function generateSmartTimeline(location, days, budget) {
    const db = {
        'Bali': {
            'Backpacker': [
                [{t:"08:00", a:"Arrive at Ngurah Rai Airport, take GoRide to Hostel in Kuta"}, {t:"11:30", a:"Check-in & unpack"}, {t:"12:30", a:"Lunch at legendary Nasi Pedas Bu Andika"}, {t:"15:30", a:"Stroll and relax at Kuta Beach for sunset"}, {t:"19:00", a:"Dinner at local warung in Poppies Lane & explore Legian nightlife"}],
                [{t:"07:30", a:"Rent Scooter & ride to Ubud center"}, {t:"09:30", a:"Morning walk at Campuhan Ridge Walk"}, {t:"13:00", a:"Lunch at Nasi Ayam Kedewatan Ibu Mangku"}, {t:"15:30", a:"Hunt souvenirs at Ubud Traditional Art Market"}, {t:"19:00", a:"Dinner at Warung Makan Bu Rus in Ubud"}],
                [{t:"06:30", a:"Head to Sanur Harbor, public fastboat to Nusa Penida"}, {t:"09:30", a:"Rent bike and ride to Kelingking Beach"}, {t:"13:00", a:"Lunch at local warung near Angel's Billabong"}, {t:"15:30", a:"Snorkeling and chill at Crystal Bay"}, {t:"18:30", a:"Return fastboat to Sanur & Dinner at Sindhu Night Market"}],
                [{t:"05:00", a:"Sunrise scooter ride to Lempuyang Temple (Gate of Heaven)"}, {t:"10:30", a:"Feed Koi fish at Tirta Gangga Water Palace"}, {t:"13:30", a:"Lunch with authentic Satay Lilit"}, {t:"16:00", a:"Relax at the hidden Virgin Beach Karangasem"}, {t:"19:30", a:"Ride back to South Bali & late dinner"}],
                [{t:"08:30", a:"Beach hopping in Uluwatu (Padang-Padang & Suluban Beach)"}, {t:"13:00", a:"Affordable lunch at Warung Local Pecatu"}, {t:"16:30", a:"Visit Uluwatu Temple for spectacular sunset"}, {t:"18:00", a:"Watch Kecak Fire Dance Show"}, {t:"20:00", a:"Budget seafood dinner near Jimbaran"}],
                [{t:"07:30", a:"Explore Tegalalang Rice Terrace before the crowds"}, {t:"11:00", a:"Purification ritual at Tirta Empul Temple"}, {t:"13:30", a:"Taste famous Babi Guling at Gianyar Market"}, {t:"16:00", a:"Visit a local Luwak Coffee plantation"}, {t:"19:00", a:"Night stroll & dinner at Seminyak Eat Street"}],
                [{t:"09:00", a:"Breakfast and packing at hostel"}, {t:"11:00", a:"Buy affordable Bali souvenirs at Krishna Oleh-Oleh"}, {t:"13:00", a:"Farewell lunch at a local Padang restaurant"}, {t:"15:00", a:"GoJek ride to Airport for departure"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Private Driver Airport Pick-up & Welcome Garland"}, {t:"12:00", a:"Lunch at the iconic Made's Warung"}, {t:"14:00", a:"Check-in at Boutique Hotel in Seminyak"}, {t:"16:30", a:"Sunset beanbags session at La Plancha with cocktails"}, {t:"19:30", a:"Dinner at Motel Mexicola"}],
                [{t:"08:00", a:"Full Day Kintamani Tour, watch Barong Dance in Batubulan"}, {t:"12:30", a:"Grand Buffet Lunch with Mount Batur volcano view"}, {t:"15:00", a:"Explore Penglipuran Traditional Village"}, {t:"19:00", a:"Famous Crispy Duck dinner at Bebek Tepi Sawah Ubud"}],
                [{t:"07:30", a:"Fast Boat to Nusa Penida (West Trip Package)"}, {t:"10:00", a:"Private AC Car Tour to Broken Beach & Angel Billabong"}, {t:"13:00", a:"Seafood Lunch at local beachfront resto"}, {t:"16:00", a:"Return Fast Boat to Sanur"}, {t:"19:00", a:"Dinner at Massimo Italian Restaurant Sanur"}],
                [{t:"09:00", a:"Bedugul Lake Tour: Visit iconic Ulun Danu Beratan Temple"}, {t:"12:30", a:"Buffet Lunch at Mentari Resto near the lake"}, {t:"15:00", a:"Walk through Jatiluwih Rice Terrace (UNESCO Heritage)"}, {t:"18:30", a:"Return to hotel and relax"}, {t:"19:30", a:"Dinner at a cozy cafe in Canggu"}],
                [{t:"10:00", a:"Morning Traditional Balinese Spa & Massage session"}, {t:"13:00", a:"Cafe Hopping & Lunch in trendy Canggu (e.g., Crate Cafe)"}, {t:"16:30", a:"Afternoon tea at GWK Cultural Park"}, {t:"19:30", a:"Romantic Seafood BBQ Dinner on Jimbaran Sand"}],
                [{t:"09:00", a:"Fun Water Sports at Tanjung Benoa (Banana boat/Parasailing)"}, {t:"13:00", a:"Lunch at local beach club"}, {t:"16:30", a:"Sundowner chill at Potato Head Beach Club Seminyak"}, {t:"20:00", a:"Dinner inside Potato Head or nearby upscale restaurant"}],
                [{t:"09:00", a:"Leisure breakfast at hotel pool"}, {t:"11:00", a:"Shopping for premium souvenirs at Joger & Uniqlo Bali"}, {t:"13:00", a:"Private Transfer to Airport for departure"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"VIP Airport Handling & Limousine Transfer"}, {t:"12:00", a:"Lunch at Cuca Flavor, Jimbaran"}, {t:"14:30", a:"Check-in at 5-Star Resort (e.g., The Mulia / Apurva Kempinski)"}, {t:"16:00", a:"Afternoon High Tea at the resort lounge"}, {t:"19:30", a:"Welcome Fine Dining Experience"}],
                [{t:"09:00", a:"Private Helicopter Tour over Kintamani Volcano & Coastline"}, {t:"12:30", a:"Gastronomy Lunch at Apéritif Restaurant & Bar, Ubud"}, {t:"15:30", a:"Private Art Museum & Gallery Tour in Ubud"}, {t:"19:30", a:"Exclusive 7-course Degustation Menu at Locavore"}],
                [{t:"08:00", a:"Private Yacht Charter to Nusa Penida & Lembongan"}, {t:"11:00", a:"Snorkeling with Manta Rays accompanied by Private Marine Guide"}, {t:"13:30", a:"Gourmet Lunch prepared by onboard chef"}, {t:"17:00", a:"Sunset Champagne Cruise on the way back"}, {t:"20:00", a:"Rest & light dinner at resort"}],
                [{t:"10:00", a:"Full Day Wellness Retreat & 2-Hour Signature Spa Ritual"}, {t:"13:30", a:"Organic Healthy Lunch at Alchemy Bali"}, {t:"16:30", a:"Private Sunset Yoga Session overlooking the ocean"}, {t:"19:30", a:"Romantic Private Cave Dinner at Samabe Bali Suites"}],
                [{t:"09:00", a:"Exclusive Vintage VW Safari Tour through East Bali"}, {t:"12:30", a:"Lunch with breathtaking views at Amankila Resort"}, {t:"15:30", a:"Tenganan Ancient Village Private Tour with local historian"}, {t:"19:30", a:"Fresh Premium Lobster Dinner at resort beachfront"}],
                [{t:"11:00", a:"Reserve Private VIP Cabana at Savaya Dayclub Uluwatu"}, {t:"13:00", a:"Lunch & Cocktails by the infinity pool"}, {t:"17:00", a:"Priority Access to Rock Bar for sunset views"}, {t:"20:00", a:"Private Chef BBQ Dinner setup at your Villa"}],
                [{t:"10:00", a:"High-end Shopping session at Seminyak Village & Designer Boutiques"}, {t:"12:30", a:"Premium Airport Lounge Access & Lunch"}, {t:"14:00", a:"VIP Departure & Fast Track Immigration Service"}]
            ]
        },
        'Yogyakarta': {
            'Backpacker': [
                [{t:"08:30", a:"Bus TransJogja adventure from Airport/Station to city"}, {t:"11:00", a:"Check-in at Friendly Hostel near Malioboro"}, {t:"12:30", a:"Lunch at legendary Gudeg Mbah Lindu"}, {t:"16:00", a:"Walk along Malioboro street & Beringharjo Market"}, {t:"19:30", a:"Angkringan Kopi Joss (Charcoal Coffee) Experience near Tugu"}],
                [{t:"08:00", a:"Rent Motorbike & Morning City Ride"}, {t:"09:30", a:"Explore Tamansari Water Castle & Underground Tunnels"}, {t:"13:00", a:"Lunch at Gudeg Permata (Local Favorite)"}, {t:"16:30", a:"Blind Walk Myth challenge at Alun-Alun Kidul"}, {t:"19:00", a:"Dinner at Oseng Mercon Bu Narti"}],
                [{t:"04:00", a:"Early ride for Sunrise at Punthuk Setumbu"}, {t:"08:00", a:"Visit Borobudur Temple (Explore temple grounds)"}, {t:"12:30", a:"Lunch at local warung near Magelang"}, {t:"14:30", a:"Explore the unique Chicken Church (Gereja Ayam)"}, {t:"19:00", a:"Authentic Sate Klathak Pak Pong dinner"}],
                [{t:"08:00", a:"Long ride to Gunung Kidul Southern Beaches"}, {t:"10:30", a:"Beach hopping: Baron, Krakal, Kukup"}, {t:"13:00", a:"Fresh local seafood lunch on the white sands of Indrayanti"}, {t:"16:30", a:"Sunset city view & coffee from Bukit Bintang"}, {t:"19:30", a:"Return to city & rest"}],
                [{t:"09:00", a:"Cultural Visit to Ullen Sentalu Museum in Kaliurang"}, {t:"12:30", a:"Lunch & Picnic vibe at Kaliurang Park"}, {t:"15:30", a:"Visit Merapi Museum"}, {t:"19:00", a:"Dinner at the Legendary Mie Ayam Tumini"}],
                [{t:"09:00", a:"Walking Tour around Kota Gede Silver District"}, {t:"12:30", a:"Spicy Mangut Lele Mbah Marto for lunch"}, {t:"15:30", a:"Sandboarding at Gumuk Pasir Parangkusumo"}, {t:"18:00", a:"Sunset at Parangtritis Beach"}, {t:"20:00", a:"Late dinner back at Malioboro area"}],
                [{t:"09:00", a:"Buy fresh Bakpia Pathok 25 directly from the oven"}, {t:"11:00", a:"Last minute shopping at Bringharjo"}, {t:"13:00", a:"Train/Flight Departure from Yogyakarta"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Private Car Airport Pick-up to City Center"}, {t:"12:00", a:"Authentic Lunch at Gudeg Yu Djum"}, {t:"14:00", a:"Check-in at 4-Star Hotel (e.g., Harper/Marriott)"}, {t:"16:00", a:"Relax at hotel pool"}, {t:"19:00", a:"Unique Javanese Dinner at The House of Raminten"}],
                [{t:"04:30", a:"Borobudur Sunrise Tour via Manohara Resort Access"}, {t:"10:00", a:"Return to hotel for breakfast & rest"}, {t:"13:00", a:"Mushroom concept lunch at Jejamuran Resto"}, {t:"15:30", a:"Merapi Volcano Lava Tour by Classic Jeep"}, {t:"19:30", a:"Dinner at Bakmi Jowo Mbah Gito with traditional vibes"}],
                [{t:"08:30", a:"Sultan Palace (Kraton) Cultural Tour with Official Guide"}, {t:"12:30", a:"Royal Cuisine Lunch at Bale Raos Resto"}, {t:"15:30", a:"Visit Prambanan Temple for Sunset"}, {t:"19:00", a:"Watch Ramayana Ballet Performance (VIP Seat)"}, {t:"21:00", a:"Late dinner at Abhayagiri"}],
                [{t:"09:00", a:"Cave Tubing Adventure at Goa Pindul"}, {t:"13:00", a:"Seafood Lunch by the Pantai Selatan"}, {t:"15:30", a:"Relax at Drini Beach"}, {t:"17:30", a:"Sunset Dinner and City Lights at Heha Sky View"}],
                [{t:"09:00", a:"Photo hunt at Instagrammable Mangunan Pine Forest"}, {t:"12:30", a:"Lunch at Sate Ratu (Famous tourist spot)"}, {t:"15:30", a:"Sunset Chill with live music at Obelix Hills"}, {t:"19:30", a:"Dinner at Mediterranea Restaurant by Kamil"}],
                [{t:"10:00", a:"Private Traditional Batik Making Class at Tirtodipuran"}, {t:"13:00", a:"Lunch at Canting Restaurant"}, {t:"16:00", a:"Relaxing 2-Hour Javanese Massage & Spa"}, {t:"19:00", a:"Dinner at local culinary center"}],
                [{t:"09:00", a:"Premium Souvenir Shopping at Hamzah Batik & Dagadu"}, {t:"11:30", a:"Comfortable Drop-off to YIA Airport via Toll Road"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"Alphard VIP Airport Transfer"}, {t:"12:00", a:"Check-in at Luxury Resort (Amanjiwo / Phoenix Hotel)"}, {t:"14:00", a:"Lunch at the resort's fine dining restaurant"}, {t:"16:00", a:"Heritage High Tea session"}, {t:"19:30", a:"Exclusive Royal Dinner at Gadri Resto (Sultan's Brother's House)"}],
                [{t:"04:30", a:"Private Guided Borobudur Sunrise Access"}, {t:"08:30", a:"Champagne Breakfast with Stupa View at Dagi Abhinaya"}, {t:"13:00", a:"Lunch at Plataran Borobudur Resort"}, {t:"16:00", a:"In-villa Spa Treatment"}, {t:"19:30", a:"Fine Dining at Sekar Kedhaton"}],
                [{t:"09:00", a:"Private Kraton Tour with Royal Abdi Dalem"}, {t:"12:30", a:"Gourmet Lunch at Six Senses Restaurant"}, {t:"16:00", a:"Private Ratu Boko Sunset Picnic Setup"}, {t:"19:30", a:"Private Ramayana Performance & Dinner"}],
                [{t:"08:00", a:"Morning Golf Session at Merapi Golf Club (Volcano view)"}, {t:"13:30", a:"Lunch at Hyatt Regency Yogyakarta"}, {t:"16:00", a:"Premium Spa Treatment at Sheraton Mustika"}, {t:"19:30", a:"Dinner at Lemah Ledok Garden Resto"}],
                [{t:"10:00", a:"Private Helicopter City Tour over Yogyakarta & Temples"}, {t:"13:00", a:"Lunch at Abhayagiri Venue"}, {t:"15:30", a:"Exclusive Private Batik Workshop with Maestro"}, {t:"19:30", a:"Dinner at Sasanti Restaurant"}],
                [{t:"10:00", a:"Ullen Sentalu Museum with Private VIP Curator"}, {t:"13:30", a:"European Lunch at Beukenhof Restaurant"}, {t:"16:00", a:"Afternoon relax at luxury pool"}, {t:"19:30", a:"Romantic Dinner at Mil & Bay"}],
                [{t:"10:00", a:"Premium Gift Shopping (Silverware & Silk Batik)"}, {t:"12:30", a:"VIP Airport Lounge Access & Departure Service"}]
            ]
        },
        'Malang': {
            'Backpacker': [
                [{t:"09:00", a:"Arrive at Malang Station, take Angkot to Hostel"}, {t:"12:00", a:"Lunch at Legendary Bakso President (Train track view)"}, {t:"14:30", a:"Walking Tour at Jodipan Colorful Village"}, {t:"17:00", a:"Stroll at Malang City Square (Alun-Alun)"}, {t:"19:30", a:"Culinary hunt at Alun-Alun Night Market"}],
                [{t:"00:30", a:"Join Midnight Shared Jeep for Bromo Sunrise Adventure"}, {t:"05:00", a:"Sunrise at Penanjakan, explore Crater & Whispering Sands"}, {t:"13:00", a:"Return to Malang city & Nap Time"}, {t:"19:00", a:"Dinner & warm up with famous STMJ Glintung"}],
                [{t:"08:30", a:"Rent Motorbike and ride up to Batu City"}, {t:"11:00", a:"Enjoy Paragliding Hill View at Gunung Banyak"}, {t:"13:30", a:"Lunch at historic Pecel Kawi"}, {t:"15:30", a:"Explore Coban Rondo Waterfall & Labyrinth"}, {t:"19:30", a:"Evening snack at Pos Ketan Legenda 1967 Batu"}],
                [{t:"08:00", a:"Nature Walk at Selecta Flower Garden"}, {t:"12:30", a:"Affordable Lunch at Warung Wareg"}, {t:"15:00", a:"Visit Jatim Park 2 (Secret Zoo)"}, {t:"19:00", a:"Dinner at Mie Gacoan Malang"}],
                [{t:"07:00", a:"Long ride to Southern Beaches (Pantai Balekambang)"}, {t:"11:00", a:"Explore the 'Tanah Lot of East Java'"}, {t:"13:30", a:"Picnic Lunch by the sea with local grilled fish"}, {t:"16:30", a:"Watch Sunset on the Coast"}, {t:"19:30", a:"Ride back to Malang city"}],
                [{t:"09:00", a:"Explore Kayutangan Heritage Street (Colonial Dutch vibes)"}, {t:"13:00", a:"Lunch with famous Black Soup Rawon Tessy"}, {t:"15:30", a:"Visit Brawijaya Museum"}, {t:"19:00", a:"Coffee night at classic Toko Kopi Kongca"}],
                [{t:"09:00", a:"Buy authentic Keripik Tempe at Sanan Village"}, {t:"11:30", a:"Early lunch at Toko Oen (Classic ice cream)"}, {t:"13:00", a:"Train Departure from Malang Station"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Private Driver Pick-up from Station/Airport"}, {t:"12:00", a:"Authentic Lunch at Rawon Nguling"}, {t:"14:00", a:"Check-in at Santika/Harris Hotel"}, {t:"16:00", a:"Relax at hotel & afternoon tea"}, {t:"19:00", a:"Dinner with History & Museum vibes at Inggil Resto"}],
                [{t:"01:00", a:"Private Jeep Bromo Sunrise Tour (No sharing)"}, {t:"06:00", a:"Explore Bromo Crater, Teletubbies Savana, Sand Sea"}, {t:"09:00", a:"Breakfast Picnic style at Savana"}, {t:"13:00", a:"Rest at Hotel in Malang"}, {t:"19:00", a:"Dinner at Bakso President or Ocean Garden"}],
                [{t:"09:00", a:"Trip to Batu City with Private Car"}, {t:"10:30", a:"Explore Jatim Park 3 (Dino Park & Legend Stars)"}, {t:"13:30", a:"Lunch at Sate Kelinci Batu"}, {t:"16:00", a:"Visit Museum Angkut (Transportation Museum)"}, {t:"19:00", a:"Dinner at Pasar Parkiran Batu"}],
                [{t:"08:30", a:"Agrotourism Apple Picking in Batu"}, {t:"11:30", a:"Photo Hunt at Flora Wisata San Terra"}, {t:"14:00", a:"Lunch at Ria Djenaka Cafe"}, {t:"18:30", a:"Fun evening rides at Batu Night Spectacular (BNS)"}],
                [{t:"07:00", a:"Day trip to majestic Tumpak Sewu Waterfall"}, {t:"10:00", a:"Trekking down the waterfall canyon"}, {t:"14:00", a:"Lunch at Local Resto in Lumajang"}, {t:"19:00", a:"Dinner at Javanine Resto Malang"}],
                [{t:"08:30", a:"Beach Day: Tiga Warna Marine Conservation (Snorkeling)"}, {t:"13:30", a:"Fresh Grilled Fish Lunch at Sendang Biru"}, {t:"17:00", a:"Return to Malang City"}, {t:"19:30", a:"Farewell dinner at Melati Restaurant"}],
                [{t:"09:00", a:"Shopping for Malang Strudel & Lapis Malang"}, {t:"11:30", a:"Lunch at Simpang Luwe"}, {t:"13:00", a:"Private Transfer to Airport/Station"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"VIP Pick-up & Private Transfer to Hotel Tugu Malang"}, {t:"12:30", a:"Welcome Javanese Massage at Hotel"}, {t:"15:00", a:"Exclusive High Tea at Tugu Lounges"}, {t:"19:30", a:"Fine Dining at Melati Restaurant (Dutch Colonial theme)"}],
                [{t:"01:00", a:"Premium Bromo Tour using luxury Toyota Hardtop & Guide"}, {t:"06:30", a:"Premium Breakfast Picnic setup overlooking Bromo"}, {t:"12:00", a:"Return to hotel, extensive Spa Recovery Package"}, {t:"19:30", a:"Indochina Royal Dinner at SaigonSan"}],
                [{t:"10:00", a:"Transfer & Check-in to Golden Tulip Resort Batu"}, {t:"12:30", a:"Lunch at The Clubhouse with mountain views"}, {t:"15:00", a:"Private VIP Tour of Museum Angkut"}, {t:"19:30", a:"Sky Bar Dinner with city lights view at resort"}],
                [{t:"08:30", a:"Morning Golf Session at Finna Golf & Country Club"}, {t:"13:30", a:"Gourmet Lunch at Golf Club Resto"}, {t:"16:00", a:"Relaxing afternoon at Batu hot springs VIP room"}, {t:"19:30", a:"Fine Dining at Omah Kitir Batu"}],
                [{t:"09:00", a:"Private Tour to Wonosari Tea Plantation"}, {t:"11:00", a:"Exclusive Horse Riding Session"}, {t:"13:30", a:"Lunch at Plantation Resort"}, {t:"19:00", a:"Dinner at The 1920 Cafe Malang"}],
                [{t:"09:30", a:"Singhasari Temple History Tour with Local Archeologist"}, {t:"12:30", a:"Lunch at Djati Lounge (Premium modern architecture)"}, {t:"16:00", a:"Relax at Private Pool Villa"}, {t:"20:00", a:"Private Chef BBQ Dinner"}],
                [{t:"10:00", a:"Premium Souvenirs shopping (Batik Malang & Craft)"}, {t:"12:00", a:"Lunch at Tugu"}, {t:"14:00", a:"VIP Airport Transfer with Escort"}]
            ]
        },
        'Labuan Bajo': {
            'Backpacker': [
                [{t:"10:00", a:"Arrive at Airport, take local Ojek to budget Hostel"}, {t:"12:30", a:"Lunch at local Nasi Padang or Warung"}, {t:"16:30", a:"Sunset Hike at Bukit Sylvia (Free entry, stunning view)"}, {t:"19:30", a:"Seafood dinner at Kampung Ujung Fish Market"}],
                [{t:"06:00", a:"Join Open Deck Boat Trip (Sharing) for Komodo Tour"}, {t:"09:00", a:"Hike to the top of Padar Island"}, {t:"12:00", a:"Snorkeling at Pink Beach (Box lunch included)"}, {t:"15:00", a:"Komodo Dragon Trekking at Komodo Island"}, {t:"19:00", a:"Back to Hostel & rest"}],
                [{t:"09:00", a:"Rent Scooter & ride to Rangko Cave (Goa Rangko)"}, {t:"11:30", a:"Swim in the cave's natural salt pool"}, {t:"14:00", a:"Lunch at local Warung in the village"}, {t:"17:00", a:"Watch Sunset at Paradise Bar with live reggae"}, {t:"20:00", a:"Dinner at Night Market"}],
                [{t:"08:00", a:"Scooter ride to Cunca Wulang Canyon (Share guide cost)"}, {t:"11:00", a:"Cliff jumping and swimming at the canyon"}, {t:"14:00", a:"Late lunch on the way back"}, {t:"16:30", a:"Relax & chill at Pede Beach"}, {t:"19:00", a:"Dinner at local eatery"}],
                [{t:"09:00", a:"Explore Batu Cermin Cave (Mirror Rock Cave)"}, {t:"12:30", a:"Lunch at Warung Mama"}, {t:"15:30", a:"Work/Chill at Escape Bajo Coffee Shop"}, {t:"18:00", a:"Sunset view from the cafe"}, {t:"20:00", a:"Street food exploration"}],
                [{t:"09:00", a:"Free Day / Laundry / Walk around Marina"}, {t:"12:00", a:"Lunch at La Cucina (Budget pizza)"}, {t:"16:30", a:"Hike up to Amelia Sea View for final sunset"}, {t:"19:30", a:"Farewell dinner with hostel mates"}],
                [{t:"08:30", a:"Buy authentic Ikat Weaving Souvenir at local market"}, {t:"10:30", a:"Morning coffee at local roastery"}, {t:"12:00", a:"Ojek drop to Airport for departure"}]
            ],
            'Comfort': [
                [{t:"10:00", a:"Airport Pick-up by Hotel Shuttle"}, {t:"12:30", a:"Lunch with Marina view at Bajo Taco"}, {t:"14:30", a:"Check-in at Ayana / Loccal Collection Resort"}, {t:"17:00", a:"Sunset cocktail at hotel pool"}, {t:"19:30", a:"Dinner at La Cucina Restaurant"}],
                [{t:"06:00", a:"Full Day Speedboat Tour (Comfortable & Fast)"}, {t:"08:00", a:"Padar Island Hike for iconic views"}, {t:"11:00", a:"Pink Beach Photo & Swim"}, {t:"13:30", a:"See Komodo Dragons & Lunch on Boat"}, {t:"16:00", a:"Manta Point Snorkeling"}, {t:"18:30", a:"Return to hotel"}],
                [{t:"09:00", a:"Relaxing morning at Hotel Pool / Spa"}, {t:"13:00", a:"Lunch at Molas Cafe (with pool access)"}, {t:"16:30", a:"Afternoon Local Wooden Boat Sunset Cruise"}, {t:"18:30", a:"Watch flying foxes (bats) at Kalong Island"}, {t:"20:00", a:"Dinner at Taman Laut Handayani"}],
                [{t:"09:00", a:"Cultural Trip to Melo Village"}, {t:"11:00", a:"Watch traditional Caci Whip Dance performance"}, {t:"13:30", a:"Lunch at traditional Flores house"}, {t:"17:00", a:"Sunset at Loccal Collection (Santorini vibes)"}, {t:"19:30", a:"Dinner at the resort"}],
                [{t:"08:30", a:"Half Day trip to Kanawa Island (White sand & starfish)"}, {t:"12:30", a:"Lunch and relax on the island"}, {t:"15:30", a:"Return to Labuan Bajo town"}, {t:"19:00", a:"Dinner at Mai Ceng'go (Famous local seafood)"}],
                [{t:"09:30", a:"Souvenir Shopping (Pearls & Premium Coffee)"}, {t:"13:00", a:"Lunch at Artomoro Restaurant"}, {t:"15:00", a:"Afternoon Spa Treatment in town"}, {t:"18:30", a:"Farewell Dinner at Atlantis on the Rock"}],
                [{t:"09:00", a:"Premium Coffee & Breakfast at Cafe Melinjo"}, {t:"11:30", a:"Packing and checkout"}, {t:"13:00", a:"Comfortable Airport Transfer"}]
            ],
            'Luxury': [
                [{t:"10:00", a:"Private SUV Transfer to Ayana Komodo or Plataran"}, {t:"13:00", a:"Lunch at Kisik Seafood Restaurant"}, {t:"15:00", a:"Check-in to Ocean View Suite"}, {t:"17:30", a:"Sunset at Unique Rooftop Bar with premium cocktails"}, {t:"20:00", a:"Fine Dining Experience at HonZEN"}],
                [{t:"08:00", a:"Board a Private Luxury Phinisi Yacht for Liveaboard"}, {t:"10:30", a:"Cruise to Kelor Island for private snorkeling"}, {t:"13:00", a:"Gourmet Lunch prepared by private onboard chef"}, {t:"16:30", a:"Sunset Trekking at Padar Island"}, {t:"19:30", a:"Dinner Under the Stars on the Yacht Deck"}],
                [{t:"07:00", a:"Morning swim at Pink Beach (Private access before crowds)"}, {t:"10:30", a:"Private Ranger Tour to see Komodo Dragons"}, {t:"13:30", a:"Lunch on Yacht"}, {t:"15:30", a:"Champagne & Snorkeling at Taka Makassar sandbank"}, {t:"18:00", a:"Return cruise to the luxury resort"}],
                [{t:"10:00", a:"Full Day Wellness & Spa Package at Resort"}, {t:"13:30", a:"Healthy Organic Lunch at resort's green cafe"}, {t:"17:00", a:"Private Sunset Yacht Cocktail Cruise"}, {t:"20:00", a:"Exclusive Teppanyaki Dinner"}],
                [{t:"09:00", a:"Private Helicopter Tour over Komodo National Park Islands"}, {t:"13:00", a:"Lunch at Atlantis on the Rock"}, {t:"16:00", a:"Private Beach Setup & Relax"}, {t:"19:30", a:"Romantic Private Beach Dinner with Bonfire"}],
                [{t:"10:00", a:"Leisure & Infinity Pool Time"}, {t:"13:00", a:"In-Villa Dining Experience for Lunch"}, {t:"16:00", a:"Afternoon High Tea"}, {t:"19:30", a:"Premium Lobster & Wagyu Farewell Dinner"}],
                [{t:"10:00", a:"Boutique Shopping for Premium Flores Pearls & Textiles"}, {t:"12:30", a:"VIP Airport Handling & Lounge Access"}, {t:"14:00", a:"First Class Departure"}]
            ]
        },
        'East Java': {
            'Backpacker': [
                [{t:"08:00", a:"Train to Malang Station"}, {t:"11:30", a:"Check-in Colorful Hostel in Malang"}, {t:"13:00", a:"Lunch at local Bakso Stall"}, {t:"15:00", a:"Explore Jodipan Colorful Village"}, {t:"19:00", a:"Dinner at Alun-Alun Night Market"}],
                [{t:"00:00", a:"Midnight Shared Jeep to Bromo"}, {t:"05:00", a:"Sunrise at Penanjakan & Crater hike"}, {t:"11:00", a:"Return to Malang"}, {t:"13:00", a:"Nap Time at hostel"}, {t:"19:00", a:"Dinner with Spicy Rawon"}],
                [{t:"09:00", a:"Train from Malang to Banyuwangi"}, {t:"15:00", a:"Arrive & Check-in to Homestay"}, {t:"17:00", a:"Walk around local village"}, {t:"19:30", a:"Dinner with authentic Nasi Tempong"}],
                [{t:"00:00", a:"Start Ijen Blue Fire Hike with local guide"}, {t:"04:30", a:"Witness the Blue Fire & Acid Lake Sunrise"}, {t:"09:00", a:"Return to homestay & Rest"}, {t:"14:00", a:"Afternoon trip to Red Island Beach (Pantai Merah)"}, {t:"18:00", a:"Sunset at the beach & seafood dinner"}],
                [{t:"08:00", a:"Rent motorbike to Baluran National Park"}, {t:"11:00", a:"Explore Bekol Savana (Little Africa)"}, {t:"13:30", a:"Lunch near Bama Beach"}, {t:"16:00", a:"Relax at the beach, watch monkeys"}, {t:"19:00", a:"Ride back to Banyuwangi & Dinner"}],
                [{t:"09:00", a:"Walking tour at Kampung Arab Banyuwangi"}, {t:"12:30", a:"Lunch with unique Rujak Soto"}, {t:"15:30", a:"Visit Boom Beach for historical architecture"}, {t:"17:30", a:"Sunset at Boom Beach"}, {t:"19:30", a:"Farewell street food dinner"}],
                [{t:"08:30", a:"Buy local Osing Coffee Beans & Souvenirs"}, {t:"11:00", a:"Packing & Checkout"}, {t:"13:00", a:"Head to Train Station / Ferry Port"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Pick-up from Surabaya Airport, Head to Probolinggo/Bromo"}, {t:"12:30", a:"Lunch at Rawon Setan Surabaya"}, {t:"16:00", a:"Check-in at comfortable Bromo Hotel (e.g., Lava View)"}, {t:"19:00", a:"Dinner at hotel & early sleep for sunrise"}],
                [{t:"03:00", a:"Private Jeep to Penanjakan Sunrise"}, {t:"07:00", a:"Sea of Sand & Crater Photo Session"}, {t:"10:00", a:"Breakfast at Hotel & Checkout"}, {t:"14:00", a:"Transfer to Bondowoso/Banyuwangi"}, {t:"19:00", a:"Dinner & Check-in Hotel in Banyuwangi"}],
                [{t:"00:30", a:"Ijen Crater Tour with Private Guide & Gas Masks"}, {t:"06:00", a:"Enjoy the stunning turquoise sulfur lake view"}, {t:"10:00", a:"Return to hotel for Breakfast & Rest"}, {t:"14:00", a:"Relaxing afternoon by the hotel pool"}, {t:"19:00", a:"Dinner at local famous restaurant"}],
                [{t:"08:30", a:"Visit De Jawatan Forest (Lord of the Rings vibe)"}, {t:"12:00", a:"Lunch at Floating Restaurant"}, {t:"15:00", a:"Head to Red Island for Surfing / Chilling"}, {t:"17:30", a:"Premium Sunset view & Seafood Dinner on the beach"}],
                [{t:"08:00", a:"Comfortable AC Car to Baluran Safari"}, {t:"11:00", a:"Wildlife spotting at Savana Bekol"}, {t:"13:00", a:"Picnic Lunch Setup"}, {t:"15:30", a:"Snorkeling at Bama Beach"}, {t:"19:00", a:"Dinner at Seafood Resto in town"}],
                [{t:"09:00", a:"Check-in to Dialoog Hotel for a leisure day"}, {t:"12:30", a:"Lunch at the hotel's beachfront resto"}, {t:"16:00", a:"Banyuwangi City Tour (Pendopo & Blambangan Park)"}, {t:"19:30", a:"Farewell Dinner with cultural dance performance"}],
                [{t:"09:00", a:"Souvenir shopping (Batik Gajah Oling)"}, {t:"11:30", a:"Checkout and Lunch"}, {t:"13:30", a:"Transfer to Blimbingsari Airport"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"VIP Arrival at Surabaya Airport, luxury van transfer"}, {t:"12:30", a:"Fine Dining Lunch at Majapahit Hotel Surabaya"}, {t:"15:00", a:"Scenic drive to Bromo"}, {t:"17:00", a:"Check-in at Plataran Bromo Resort"}, {t:"19:30", a:"Exclusive Highland Dinner"}],
                [{t:"03:00", a:"Premium Hardtop Jeep for Bromo Sunrise"}, {t:"07:30", a:"Private Gourmet Picnic Breakfast on the Savana"}, {t:"11:00", a:"Return to resort, enjoying Spa & Massage"}, {t:"14:00", a:"Lunch at Resort"}, {t:"19:00", a:"Fine Dining Experience"}],
                [{t:"09:00", a:"Private Helicopter transfer to Ijen/Banyuwangi area"}, {t:"11:30", a:"Check-in at Jiwa Jawa Resort Ijen"}, {t:"13:30", a:"Lunch at Resort"}, {t:"16:00", a:"Explore resort's art gallery & gardens"}, {t:"19:00", a:"Mountain view Dinner"}],
                [{t:"01:30", a:"Private Ijen VIP Expedition with Health/Safety team"}, {t:"08:00", a:"Return for extensive recovery Massage"}, {t:"13:00", a:"Late lunch and leisure time"}, {t:"17:00", a:"Private cultural performance at resort"}],
                [{t:"09:00", a:"Private Transfer to Dialoog Hotel Banyuwangi"}, {t:"13:00", a:"Premium Seafood Lunch"}, {t:"15:30", a:"Relax at the oceanfront Infinity Pool"}, {t:"19:30", a:"Exclusive Beachfront Dinner"}],
                [{t:"08:30", a:"Charter Private Yacht to Menjangan Island (Bali border)"}, {t:"11:00", a:"World-class private snorkeling session"}, {t:"13:00", a:"Gourmet Lunch on the Yacht"}, {t:"16:00", a:"Return to hotel"}, {t:"19:30", a:"Farewell Fine Dining"}],
                [{t:"10:00", a:"Premium Gifts shopping with personal assistant"}, {t:"12:30", a:"Lunch at Dialoog"}, {t:"14:00", a:"VIP Airport Departure Service"}]
            ]
        },
        'Central Java': {
            'Backpacker': [
                [{t:"09:00", a:"Train to Semarang Station"}, {t:"11:30", a:"Check-in to budget hostel"}, {t:"13:00", a:"Explore mystical Lawang Sewu"}, {t:"16:00", a:"Walk around Kota Lama (Old Town)"}, {t:"19:30", a:"Dinner & street food at Simpang Lima"}],
                [{t:"07:00", a:"Take a local bus to Dieng Plateau"}, {t:"11:00", a:"Arrive & Check-in Homestay in Dieng"}, {t:"13:30", a:"Explore Sikidang Crater (Kawah Sikidang)"}, {t:"16:30", a:"Visit Arjuna Temple Complex"}, {t:"19:00", a:"Eat local Mie Ongklok for dinner"}],
                [{t:"03:30", a:"Hike Bukit Sikunir for Golden Sunrise"}, {t:"08:00", a:"Visit the colorful Telaga Warna lake"}, {t:"11:00", a:"Checkout and take bus to Magelang"}, {t:"15:00", a:"Check-in Magelang Hostel"}, {t:"19:00", a:"Dinner at local Alun-Alun"}],
                [{t:"04:30", a:"Hike Punthuk Setumbu for Borobudur silhouette sunrise"}, {t:"08:30", a:"Visit Gereja Ayam (Chicken Church)"}, {t:"13:00", a:"Lunch and bus ride to Solo (Surakarta)"}, {t:"16:30", a:"Check-in Solo Hostel"}, {t:"19:30", a:"Dinner with Nasi Liwet Solo"}],
                [{t:"09:00", a:"Shopping for cheap Batik at Klewer Market"}, {t:"13:00", a:"Lunch at Tengkleng Klewer"}, {t:"15:30", a:"Explore Kampung Batik Kauman"}, {t:"19:00", a:"Evening walk at Ngarsopuro & Dinner"}],
                [{t:"09:00", a:"Visit Keraton Surakarta (Solo Palace)"}, {t:"12:30", a:"Lunch at Timlo Solo"}, {t:"15:00", a:"Visit Danar Hadi Batik Museum"}, {t:"18:30", a:"Take Prameks Train back to Semarang/Jogja for departure base"}],
                [{t:"09:00", a:"Last minute street food hunting"}, {t:"11:30", a:"Packing & Checkout"}, {t:"13:00", a:"Depart via Station/Airport"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Flight/Train to Semarang, Comfort Car Pick-up"}, {t:"13:00", a:"Lunch at historic Pesta Keboen Resto"}, {t:"15:30", a:"Visit Sam Poo Kong Temple"}, {t:"18:30", a:"Check-in 4-Star Hotel"}, {t:"20:00", a:"Dinner at Kampung Laut Seafood"}],
                [{t:"08:00", a:"Comfortable Drive to Dieng Plateau"}, {t:"12:00", a:"Lunch with premium Mie Ongklok & Sate sapi"}, {t:"14:00", a:"Explore Arjuna Temple & Sikidang Crater"}, {t:"17:00", a:"Check-in to nice Villa/Guesthouse"}, {t:"19:00", a:"Warm dinner at villa"}],
                [{t:"04:00", a:"Sikunir Sunrise Tour via Jeep/Car"}, {t:"09:00", a:"Drive down to Magelang"}, {t:"13:00", a:"Check-in at MesaStila Resort or similar"}, {t:"15:30", a:"Coffee Plantation Tour within resort"}, {t:"19:30", a:"Dinner with Javanese ambiance"}],
                [{t:"04:30", a:"Borobudur Sunrise via Manohara Access"}, {t:"10:00", a:"Breakfast & Rest"}, {t:"13:00", a:"Lunch at Amanjiwo Restaurant (Comfort access)"}, {t:"15:30", a:"Transfer to Solo City"}, {t:"19:00", a:"Dinner at Kusuma Sahid"}],
                [{t:"09:00", a:"Tour of Mangkunegaran Palace Solo"}, {t:"12:30", a:"Taste authentic Serabi Solo & Lunch"}, {t:"15:00", a:"Exclusive Batik Making Class"}, {t:"19:00", a:"Dinner at Selat Solo Mbak Lies"}],
                [{t:"08:30", a:"Day trip to Tawangmangu Highlands"}, {t:"11:00", a:"Visit Grojogan Sewu Waterfall"}, {t:"13:30", a:"Lunch at local Tea Garden Cafe"}, {t:"16:30", a:"Return to Solo"}, {t:"19:30", a:"Farewell Dinner"}],
                [{t:"09:30", a:"Premium Batik Shopping at Danar Hadi"}, {t:"12:00", a:"Lunch & Checkout"}, {t:"14:00", a:"Airport/Station Transfer"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"VIP Arrival at Semarang, Luxury Alphard Transfer"}, {t:"12:30", a:"Lunch at Spiegel Bar & Bistro in Old Town"}, {t:"15:00", a:"Private Heritage City Tour"}, {t:"17:30", a:"Check-in at Padma Hotel Semarang"}, {t:"20:00", a:"Fine Dining at hotel"}],
                [{t:"08:00", a:"Luxury Van transfer to Borobudur Area"}, {t:"12:30", a:"Lunch at Enam Langit by Plataran with Stupa View"}, {t:"15:00", a:"Check-in at Amanjiwo Resort"}, {t:"16:30", a:"In-villa Spa Treatment"}, {t:"19:30", a:"Exclusive Dinner at resort"}],
                [{t:"04:30", a:"Private Borobudur Access with Expert Archeologist"}, {t:"09:00", a:"Champagne Breakfast at Dagi Abhinaya"}, {t:"13:00", a:"Private Elephant Safari / VW Tour"}, {t:"19:00", a:"Gourmet Javanese Degustation Dinner"}],
                [{t:"09:00", a:"Private Transfer to Solo"}, {t:"12:00", a:"Lunch at Agra Rooftop Alila Solo"}, {t:"14:30", a:"Check-in at Alila Solo Luxury Suite"}, {t:"16:30", a:"Private Batik Collection Tour"}, {t:"20:00", a:"Royal Dining Experience"}],
                [{t:"09:00", a:"Exclusive VIP Tour of Keraton Solo"}, {t:"12:30", a:"Lunch at Canting Londo Kitchen"}, {t:"15:00", a:"Hunt for Antiques at Triwindu Market with guide"}, {t:"19:30", a:"Dinner at Epice Restaurant"}],
                [{t:"08:00", a:"Morning Golf at Merapi Golf Club or Spa Day"}, {t:"13:30", a:"Luxury Lunch"}, {t:"16:00", a:"Relaxing afternoon tea"}, {t:"19:30", a:"Farewell Fine Dining Experience"}],
                [{t:"10:00", a:"Personalized Gift Shopping & Packing"}, {t:"12:30", a:"VIP Lounge Access"}, {t:"14:00", a:"VIP Departure from Solo Airport"}]
            ]
        },
        'West Java': {
            'Backpacker': [
                [{t:"08:00", a:"Train to Bandung, Angkot to Hostel"}, {t:"12:30", a:"Lunch with Batagor Riri / Cuanki"}, {t:"15:00", a:"Historical walk at Braga Street & Asia Afrika"}, {t:"19:00", a:"Dinner at Lengkong Night Street Food"}],
                [{t:"08:30", a:"Take Angkot/Bus to Lembang"}, {t:"11:00", a:"Explore Floating Market Lembang"}, {t:"14:00", a:"Visit Farmhouse Susu Lembang"}, {t:"17:00", a:"Return to Bandung city"}, {t:"19:30", a:"Dinner with Nasi Kalong"}],
                [{t:"07:00", a:"Public bus to Ciwidey (South Bandung)"}, {t:"10:30", a:"Explore Kawah Putih (White Crater)"}, {t:"13:30", a:"Lunch with Nasi Liwet at local saung"}, {t:"15:30", a:"Visit Ranca Upas Deer Park"}, {t:"19:00", a:"Return to city & Rest"}],
                [{t:"08:00", a:"Long Bus Ride to Pangandaran Beach"}, {t:"14:30", a:"Arrive & Check-in Homestay near the beach"}, {t:"16:30", a:"Chill and watch Sunset at Pangandaran West Beach"}, {t:"19:30", a:"Affordable Seafood dinner at fish market"}],
                [{t:"08:00", a:"Local transport to Green Canyon (Cukang Taneuh)"}, {t:"10:00", a:"Boat ride & budget body rafting"}, {t:"14:00", a:"Lunch near the river"}, {t:"16:00", a:"Visit Batu Hiu (Shark Rock) for sunset"}, {t:"19:30", a:"Dinner back at Pangandaran"}],
                [{t:"08:00", a:"Bus to Bogor (via Bandung/Tasikmalaya)"}, {t:"14:30", a:"Check-in Bogor Hostel"}, {t:"16:00", a:"Walk around Bogor Botanical Garden outer ring"}, {t:"19:00", a:"Dinner with famous Soto Kuning Pak Yusup"}],
                [{t:"09:00", a:"Explore Bogor Botanical Garden (Kebun Raya)"}, {t:"12:00", a:"Lunch with Asinan Bogor"}, {t:"14:00", a:"Take Commuter Line (Train) to Jakarta / Airport"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Take WHOOSH Fast Train to Bandung, Car Pick-up"}, {t:"12:30", a:"Lunch at Kampung Daun with nature vibes"}, {t:"15:00", a:"Check-in at Padma Hotel or similar 4-star"}, {t:"17:00", a:"Relax at hotel heated pool"}, {t:"19:30", a:"Dinner at Miss Bee Providore"}],
                [{t:"08:30", a:"Drive to Tangkuban Perahu Crater"}, {t:"11:30", a:"Explore Orchid Forest Cikole"}, {t:"13:30", a:"Lunch at Dusun Bambu Leisure Park"}, {t:"16:30", a:"Coffee at Lereng Anteng"}, {t:"19:30", a:"Dinner in Bandung City (e.g., Paskal area)"}],
                [{t:"08:00", a:"Drive to South Bandung (Ciwidey)"}, {t:"10:30", a:"Comfort tour of Kawah Putih"}, {t:"13:00", a:"Lunch at Pinisi Resto (Ship-shaped restaurant)"}, {t:"15:30", a:"Glamping Lakeside view & Tea plantation"}, {t:"19:00", a:"Dinner at hotel"}],
                [{t:"08:00", a:"Comfortable private transfer to Pangandaran"}, {t:"13:30", a:"Check-in at Laut Biru Resort or Pantai Indah"}, {t:"15:00", a:"Relax at the beach"}, {t:"17:30", a:"Sunset Dinner at premium seafood restaurant"}],
                [{t:"08:30", a:"Private Boat Tour at Green Canyon"}, {t:"11:00", a:"Guided Body Rafting Experience"}, {t:"14:00", a:"Lunch with local Sundanese setup"}, {t:"16:30", a:"Sunset at Batu Karas Beach"}, {t:"19:30", a:"Return to hotel & dinner"}],
                [{t:"08:00", a:"Transfer to Garut"}, {t:"12:30", a:"Lunch at Asep Strawberry"}, {t:"14:30", a:"Check-in at Kampung Sampireun Resort"}, {t:"16:00", a:"Enjoy private hot spring and canoe"}, {t:"19:30", a:"Romantic dinner by the lake"}],
                [{t:"09:00", a:"Shopping for Chocodot & Leather jackets in Garut"}, {t:"12:00", a:"Lunch and comfortable transfer back to Bandung/Jakarta Airport"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"Private Luxury Car pick-up from Jakarta to Bandung"}, {t:"12:30", a:"Lunch at The 18th Restaurant and Lounge"}, {t:"15:00", a:"Check-in at Intercontinental Dago Pakar"}, {t:"16:30", a:"Afternoon High Tea"}, {t:"20:00", a:"Fine Dining at Burgundy Dine & Wine"}],
                [{t:"08:30", a:"Morning Golf at Dago Heritage or VIP Spa Treatment"}, {t:"13:00", a:"Lunch at Nara Park VIP Section"}, {t:"15:30", a:"Private Shopping tour at Premium Outlets"}, {t:"19:30", a:"Dinner at The Peak Resort Dining"}],
                [{t:"08:00", a:"Private Guided Tour to Kawah Putih & Glamping Lakeside"}, {t:"12:30", a:"Lunch at exclusive resort in South Bandung"}, {t:"15:00", a:"VIP Strawberry Picking & Tea Tour"}, {t:"19:00", a:"Return to hotel & Fine Dining"}],
                [{t:"09:00", a:"Helicopter City Tour over Bandung (Optional)"}, {t:"12:30", a:"Lunch at Maxi's Resto"}, {t:"15:00", a:"Transfer to Puncak / Bogor area"}, {t:"17:30", a:"Check-in at Pullman Ciawi Vimala Hills"}, {t:"20:00", a:"Dinner at hotel"}],
                [{t:"09:00", a:"Taman Safari Bogor VIP Access (Behind the scenes)"}, {t:"13:30", a:"Lunch at Royal Safari Garden"}, {t:"16:00", a:"Relaxing afternoon at Vimala Hills Spa"}, {t:"19:30", a:"Dinner at Nicole's River Park"}],
                [{t:"09:00", a:"Private Tea Walk & Picnic at Gunung Mas"}, {t:"13:00", a:"Lunch at Puncak Pass Resort"}, {t:"16:00", a:"Leisure time in private villa/resort"}, {t:"19:30", a:"Farewell Fine Dining"}],
                [{t:"10:00", a:"Premium Souvenir arrangements & packing"}, {t:"12:00", a:"Lunch"}, {t:"14:00", a:"VIP Transfer back to Jakarta Airport"}]
            ]
        }
    };

    let scheduleHTML = '';
    
    // 1. Get Location Data
    let locationData = db[location];
    if (!locationData) locationData = db['Bali'];

    // 2. Get Budget Data
    let budgetData = locationData[budget];
    if (!budgetData) budgetData = locationData['Comfort'];

    // 3. Loop Days (Sekarang Valid sampai 7 Hari!)
    for(let i = 0; i < days; i++) {
        let dailyActs = budgetData[i];
        
        // Fallback for missing days (jika terjadi error/data kurang)
        if (!dailyActs) {
            dailyActs = [
                {t:"09:00", a:"Morning Leisure Time / Free Exploration"}, 
                {t:"13:00", a:"Lunch at Local Favorite Spot"},
                {t:"15:30", a:"Afternoon Sightseeing"},
                {t:"19:00", a:"Relaxing Dinner & Rest"}
            ];
        }
        
        let listItems = '<div class="schedule-list">';
        dailyActs.forEach(item => {
            listItems += `
                <div class="schedule-item">
                    <span class="time-slot">${item.t}</span>
                    <span class="activity-desc">${item.a}</span>
                </div>`;
        });
        listItems += '</div>';

        scheduleHTML += `
        <div class="day-item">
            <span class="day-label">Day ${i + 1}</span>
            ${listItems}
        </div>`;
    }

    return scheduleHTML;
}