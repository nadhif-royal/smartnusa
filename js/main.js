/* FILE: js/main.js - FINAL SMARTNUSA (Ultra-Detailed 7-Days Itinerary) */

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

    // Fungsi Preload agar gambar sudah tersimpan di cache browser
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
                    timelineContainer.innerHTML = "<p style='color:red;'>Terjadi kesalahan. Silakan coba lagi.</p>";
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

// --- 3. DATABASE ITINERARY (ULTRA-DETAILED & PERSONALIZED) ---
function generateSmartTimeline(location, days, budget) {
    const db = {
        'Bali': {
            'Backpacker': [
                [{t:"07:30", a:"Arrive at Ngurah Rai Airport, pick up pre-booked scooter/GoRide"}, {t:"09:00", a:"Drop luggage at Canggu/Kuta Hostel & freshen up"}, {t:"10:30", a:"Brunch at local warung (Nasi Campur Bali)"}, {t:"13:00", a:"Beginner surf lesson or chill at Batu Bolong Beach"}, {t:"16:30", a:"Sunset walk with fresh coconut at Double Six Beach"}, {t:"19:00", a:"Dinner at authentic Nasi Pedas Bu Andika"}, {t:"21:00", a:"Explore Legian street nightlife & mingle with travelers"}],
                [{t:"07:00", a:"Early morning ride to Ubud center to avoid traffic"}, {t:"08:30", a:"Morning nature walk at Campuhan Ridge Walk"}, {t:"11:30", a:"Hunt for affordable souvenirs at Ubud Art Market"}, {t:"13:00", a:"Lunch at famous Nasi Ayam Kedewatan Ibu Mangku"}, {t:"15:00", a:"Visit Sacred Monkey Forest Sanctuary"}, {t:"18:00", a:"Return to South Bali"}, {t:"20:00", a:"Late dinner at local night market (Pasar Senggol)"}],
                [{t:"06:30", a:"Head to Sanur Harbor, take public fastboat to Nusa Penida"}, {t:"08:30", a:"Arrive in Penida, rent a scooter at the port"}, {t:"10:00", a:"Trek down the iconic Kelingking Beach (T-Rex cliff)"}, {t:"13:00", a:"Quick lunch at a local warung near Angel's Billabong"}, {t:"14:30", a:"Swim and explore Broken Beach & Angel's Billabong"}, {t:"16:30", a:"Sunset chill at Crystal Bay"}, {t:"19:00", a:"Dinner and check-in at affordable Penida guesthouse"}],
                [{t:"07:00", a:"Morning snorkeling tour to Manta Point (Join group boat)"}, {t:"11:30", a:"Shower, check out, and grab a quick lunch"}, {t:"13:00", a:"Take the fastboat back to Sanur"}, {t:"15:00", a:"Ride to Uluwatu area & check-in hostel"}, {t:"16:30", a:"Explore the hidden Suluban Beach cave"}, {t:"19:00", a:"Eat local seafood BBQ at budget stalls near Jimbaran"}],
                [{t:"05:00", a:"Super early ride to Lempuyang Temple (Gate of Heaven) in East Bali"}, {t:"09:30", a:"Feed Koi fish and take aesthetic photos at Tirta Gangga"}, {t:"12:30", a:"Lunch with authentic Satay Lilit Karangasem"}, {t:"14:30", a:"Relax at the pristine Virgin Beach (Pantai Pasir Putih)"}, {t:"18:00", a:"Long ride back to South Bali"}, {t:"20:30", a:"Late dinner at Sate Babi Bawah Pohon"}],
                [{t:"08:00", a:"Morning ride to Tegalalang Rice Terrace for epic photos"}, {t:"11:00", a:"Experience traditional purification ritual at Tirta Empul"}, {t:"13:30", a:"Taste authentic Babi Guling at Gianyar Market"}, {t:"15:30", a:"Visit a local Luwak Coffee plantation (Free entry/tasting)"}, {t:"18:00", a:"Window shopping & night stroll at Seminyak Eat Street"}, {t:"20:00", a:"Farewell drinks at a budget-friendly beach bar"}],
                [{t:"08:30", a:"Relaxing breakfast at the hostel & packing"}, {t:"10:30", a:"Buy local snacks (Pie Susu) at Krishna Oleh-Oleh"}, {t:"12:30", a:"Last authentic lunch at a local Padang restaurant"}, {t:"14:30", a:"Return scooter / Order GoCar"}, {t:"15:30", a:"Arrive at Airport for departure"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Private Driver Airport Pick-up & Welcome Garland"}, {t:"10:30", a:"Check-in at Boutique Hotel in Seminyak or Sanur"}, {t:"12:30", a:"Welcome lunch at the iconic Made's Warung"}, {t:"15:00", a:"Relaxing Traditional Balinese Massage (90 mins)"}, {t:"17:00", a:"Sunset beanbags session at La Plancha with tapas"}, {t:"19:30", a:"Vibrant dinner at Motel Mexicola or similar trendy spot"}],
                [{t:"08:00", a:"Start Full Day Kintamani Tour with private AC car"}, {t:"09:30", a:"Watch traditional Barong & Kris Dance in Batubulan"}, {t:"12:30", a:"Grand Buffet Lunch with spectacular Mount Batur volcano view"}, {t:"15:30", a:"Explore the pristine Penglipuran Traditional Village"}, {t:"18:30", a:"Famous Crispy Duck dinner at Bebek Tepi Sawah Ubud"}, {t:"21:00", a:"Return to hotel"}],
                [{t:"07:30", a:"Transfer to Sanur, board comfortable Fast Boat to Nusa Penida"}, {t:"09:30", a:"Private AC Car Tour (West Route): Kelingking Beach"}, {t:"12:30", a:"Seafood Lunch at a local beachfront restaurant"}, {t:"14:00", a:"Explore Angel's Billabong & Broken Beach"}, {t:"16:30", a:"Return Fast Boat to Sanur"}, {t:"19:00", a:"Authentic Italian dinner at Massimo Sanur (Famous Gelato)"}],
                [{t:"09:00", a:"Bedugul Lake Tour: Visit iconic Ulun Danu Beratan Temple"}, {t:"11:30", a:"Photo stop at Handara Golf Resort Gates"}, {t:"13:00", a:"Buffet Lunch at Mentari Resto near the cool lake"}, {t:"15:30", a:"Leisurely walk through Jatiluwih Rice Terrace (UNESCO)"}, {t:"18:30", a:"Return to hotel to freshen up"}, {t:"20:00", a:"Dinner at a cozy aesthetic cafe in Canggu"}],
                [{t:"09:00", a:"Morning free time: Enjoy hotel pool or local shopping"}, {t:"12:00", a:"Cafe Hopping & Brunch in trendy Canggu (e.g., Crate Cafe / Baked)"}, {t:"15:00", a:"Visit GWK Cultural Park (Explore by buggy)"}, {t:"17:30", a:"Watch Kecak Fire Dance at Uluwatu Temple during sunset"}, {t:"20:00", a:"Romantic Seafood BBQ Dinner right on the sand at Jimbaran"}],
                [{t:"09:00", a:"Fun Water Sports at Tanjung Benoa (Banana boat, Turtle Island)"}, {t:"13:00", a:"Lunch at a nice local beach club in Nusa Dua"}, {t:"15:30", a:"Shopping at Bali Collection"}, {t:"17:00", a:"Sundowner chill & swim at Potato Head Beach Club Seminyak"}, {t:"20:30", a:"Upscale dinner inside Potato Head or nearby fine restaurant"}],
                [{t:"08:30", a:"Leisure breakfast at hotel & final packing"}, {t:"10:30", a:"Shopping for premium souvenirs at Joger & Uniqlo Bali"}, {t:"12:30", a:"Lunch at local favorite spot (e.g., Nasi Tempong Indra)"}, {t:"14:30", a:"Private Transfer to Ngurah Rai Airport for departure"}]
            ],
            'Luxury': [
                [{t:"10:00", a:"VIP Airport Handling, Fast Track Immigration & Limousine Transfer"}, {t:"11:30", a:"Arrive at 5-Star Resort (e.g., Apurva Kempinski / St. Regis) - Early check-in if available"}, {t:"13:00", a:"Gourmet Lunch at Cuca Flavor, Jimbaran"}, {t:"15:30", a:"Afternoon High Tea at the resort lounge overlooking the ocean"}, {t:"18:00", a:"Leisure walk at private beach"}, {t:"19:30", a:"Welcome Fine Dining Experience at the resort's signature restaurant"}],
                [{t:"09:00", a:"Private Helicopter Tour over Kintamani Volcano & Uluwatu Coastline"}, {t:"11:30", a:"Touch down in Ubud, visit Blanco Renaissance Museum"}, {t:"13:00", a:"Gastronomy Lunch at Apéritif Restaurant & Bar"}, {t:"15:30", a:"Exclusive Silver & Wood Carving class with local maestro"}, {t:"19:30", a:"World-class 7-course Degustation Menu at Locavore (Pre-booked)"}],
                [{t:"08:00", a:"Board a Private Luxury Yacht Charter to Nusa Penida & Lembongan"}, {t:"10:30", a:"Snorkeling with Manta Rays accompanied by Private Marine Guide"}, {t:"13:00", a:"Gourmet Seafood Lunch prepared by onboard chef"}, {t:"15:00", a:"Relaxing at private beach club in Nusa Lembongan"}, {t:"17:30", a:"Sunset Champagne Cruise on the way back to Bali"}, {t:"20:30", a:"Light supper & rest at resort"}],
                [{t:"09:00", a:"Full Day Wellness Retreat: Private Yoga Session overlooking the ocean"}, {t:"11:00", a:"2.5-Hour Signature Spa Ritual (Balinese boreh & flower bath)"}, {t:"13:30", a:"Organic, plant-based Lunch at Alchemy Bali or resort"}, {t:"16:00", a:"Free time to enjoy private villa pool"}, {t:"19:00", a:"Romantic Private Cave Dinner at Samabe Bali Suites with personal butler"}],
                [{t:"08:30", a:"Exclusive Vintage VW Safari Tour exploring East Bali"}, {t:"11:00", a:"Tenganan Ancient Village Private Tour with local historian"}, {t:"13:30", a:"Lunch with breathtaking views at Amankila Resort"}, {t:"16:00", a:"Visit the serene Taman Ujung Water Palace"}, {t:"19:30", a:"Fresh Premium Lobster & Wagyu Dinner at Jimbaran Beachfront"}],
                [{t:"11:00", a:"Late start. Reserve Private VIP Cabana at Savaya Dayclub Uluwatu"}, {t:"13:00", a:"Lunch, Sushi, & Premium Cocktails by the infinity pool"}, {t:"16:30", a:"Transfer to Ayana Resort for Priority Access to Rock Bar"}, {t:"18:00", a:"Sunset drinks at Rock Bar"}, {t:"20:30", a:"Private Chef BBQ Dinner setup directly at your Villa"}],
                [{t:"10:00", a:"Personalized shopping session at Seminyak Village & Designer Boutiques"}, {t:"13:00", a:"Farewell Lunch at Merah Putih Restaurant"}, {t:"15:00", a:"Transfer to Airport, Premium Airport Lounge Access"}, {t:"16:00", a:"VIP Departure Service"}]
            ]
        },
        'Yogyakarta': {
            'Backpacker': [
                [{t:"08:00", a:"Arrive via Train at Tugu Station, walk to Malioboro Hostel"}, {t:"09:30", a:"Drop bags and walk around Beringharjo Traditional Market"}, {t:"12:00", a:"Lunch: Authentic Gudeg Mbah Lindu or Pecel Senggol"}, {t:"14:30", a:"Explore Vredeburg Fort Museum (Budget entry)"}, {t:"17:00", a:"Sunset chill at Alun-Alun Kidul (Try the blindfold walk)"}, {t:"19:30", a:"Dinner & chill at Angkringan Kopi Joss Lik Man"}],
                [{t:"07:30", a:"Rent motorbike & Morning ride to Tamansari Water Castle"}, {t:"08:30", a:"Explore the underground mosque and pools"}, {t:"11:30", a:"Ride to Kotagede to see silver artisans & old architecture"}, {t:"13:30", a:"Lunch: Spicy Mangut Lele Mbah Marto"}, {t:"15:30", a:"Ride to Parangtritis Beach"}, {t:"17:30", a:"Sunset at Parangtritis & Sandboarding at Gumuk Pasir"}, {t:"20:00", a:"Return to city, dinner at Oseng Mercon Bu Narti"}],
                [{t:"04:00", a:"Early morning ride to Punthuk Setumbu for Borobudur Sunrise view"}, {t:"08:00", a:"Enter Borobudur Temple grounds (Regular ticket)"}, {t:"11:30", a:"Visit the nearby Gereja Ayam (Chicken Church) & Bukit Rhema"}, {t:"13:30", a:"Lunch at a local warung near Magelang"}, {t:"16:00", a:"Ride back to Jogja & Rest"}, {t:"19:00", a:"Legendary Sate Klathak Pak Pong for dinner"}],
                [{t:"08:00", a:"Long motorbike ride to Gunung Kidul Beaches"}, {t:"10:30", a:"Beach hopping: Pantai Krakal, Drini, & Kukup"}, {t:"13:30", a:"Seafood lunch at local stalls on Indrayanti Beach"}, {t:"16:00", a:"Head up to Bukit Bintang for sunset and city views"}, {t:"18:30", a:"Dinner with roasted corn and noodles at Bukit Bintang"}, {t:"20:30", a:"Night ride back to the hostel"}],
                [{t:"08:30", a:"Ride north to Kaliurang (Mount Merapi slope)"}, {t:"10:00", a:"Explore Merapi Museum & Alien Stone (Batu Alien)"}, {t:"13:00", a:"Lunch & relax at Kaliurang Park"}, {t:"15:00", a:"Cultural Visit to Ullen Sentalu Museum"}, {t:"18:00", a:"Return to city center"}, {t:"19:30", a:"Dinner at the famous Mie Ayam Tumini"}],
                [{t:"09:00", a:"Take the Prameks/Commuter train to Solo (Surakarta) for a day trip"}, {t:"10:30", a:"Walk around Pasar Klewer for cheap batik"}, {t:"13:00", a:"Lunch: Tengkleng Klewer Bu Edi"}, {t:"15:00", a:"Visit Keraton Surakarta (Solo Palace)"}, {t:"17:30", a:"Return train to Yogyakarta"}, {t:"20:00", a:"Last night stroll at Malioboro & live street music"}],
                [{t:"08:30", a:"Morning hunt for fresh Bakpia Pathok 25 directly from the factory"}, {t:"10:30", a:"Buy Dagadu shirts or local crafts for souvenirs"}, {t:"12:30", a:"Final lunch at Nasi Kuning Mbah Karto"}, {t:"14:00", a:"Walk to Tugu Station for departure"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Private Car Airport/Station Pick-up"}, {t:"10:30", a:"Check-in at 4-Star Hotel (e.g., Melia Purosani or Harper)"}, {t:"12:30", a:"Authentic Javanese Lunch at Gudeg Yu Djum"}, {t:"15:00", a:"Leisurely walk & shopping at Malioboro Mall & Street"}, {t:"17:30", a:"Relax at hotel pool"}, {t:"19:30", a:"Dinner with cultural vibes at The House of Raminten"}],
                [{t:"04:30", a:"Borobudur Sunrise Tour (Manohara Resort VIP Access)"}, {t:"09:30", a:"Return to hotel for a full breakfast and short rest"}, {t:"13:00", a:"Unique mushroom-based lunch at Jejamuran Resto"}, {t:"15:30", a:"Merapi Volcano Lava Tour by Classic 4x4 Jeep"}, {t:"19:30", a:"Dinner at Bakmi Jowo Mbah Gito (Traditional wooden interior)"}],
                [{t:"09:00", a:"Guided Cultural Tour of Sultan Palace (Keraton Yogyakarta)"}, {t:"11:30", a:"Visit Taman Sari Water Castle"}, {t:"13:30", a:"Royal Cuisine Lunch at Bale Raos (Sultan's favorite dishes)"}, {t:"16:00", a:"Head to Prambanan Temple to explore and watch the sunset"}, {t:"19:00", a:"Watch the epic Ramayana Ballet Performance (VIP Seats)"}, {t:"21:00", a:"Late scenic dinner at Abhayagiri Restaurant"}],
                [{t:"08:30", a:"Drive to Gunung Kidul for Cave Tubing Adventure at Goa Pindul"}, {t:"12:30", a:"Head to the southern coast for a fresh Seafood Lunch"}, {t:"15:00", a:"Relax at the clean and beautiful Sadranan Beach"}, {t:"17:30", a:"Drive up to Heha Sky View for a stunning sunset panorama"}, {t:"19:30", a:"Dinner at Heha Sky View overlooking the city lights"}],
                [{t:"09:00", a:"Photo hunting at the misty Mangunan Pine Forest"}, {t:"11:30", a:"Visit the Hobbit House at Sukorame"}, {t:"13:30", a:"Lunch at Sate Ratu (Famous tourist culinary spot)"}, {t:"16:00", a:"Sunset Chill with live acoustic music at Obelix Hills"}, {t:"20:00", a:"Upscale Mediterranean Dinner at Mediterranea by Kamil"}],
                [{t:"10:00", a:"Private Traditional Batik Making Class at Tirtodipuran village"}, {t:"13:00", a:"Lunch at Canting Restaurant (Rooftop views)"}, {t:"15:30", a:"Relaxing 2-Hour Traditional Javanese Massage & Spa"}, {t:"18:30", a:"Explore Prawirotaman street for art shops"}, {t:"20:00", a:"Dinner at a trendy cafe in Prawirotaman"}],
                [{t:"09:00", a:"Premium Souvenir Shopping at Hamzah Batik & Mirota Kampus"}, {t:"11:30", a:"Checkout from Hotel"}, {t:"12:30", a:"Lunch at a comfortable local restaurant"}, {t:"14:00", a:"Comfortable Drop-off to YIA Airport via Toll Road"}]
            ],
            'Luxury': [
                [{t:"10:00", a:"Alphard VIP Airport Transfer from YIA"}, {t:"11:30", a:"Arrive & Check-in at Amanjiwo or The Phoenix Hotel"}, {t:"13:00", a:"Gourmet Lunch at the resort's fine dining restaurant"}, {t:"16:00", a:"Afternoon Heritage High Tea session with traditional snacks"}, {t:"18:30", a:"Private guided walk around the historical hotel area"}, {t:"20:00", a:"Exclusive Royal Dinner at Gadri Resto (Hosted by Royal Family)"}],
                [{t:"04:30", a:"Private Guided Borobudur Sunrise Access (Exclusive Zone)"}, {t:"08:30", a:"Champagne & Gourmet Breakfast with Stupa View at Dagi Abhinaya"}, {t:"11:00", a:"Return to resort for relaxation and pool time"}, {t:"13:30", a:"Lunch at Plataran Borobudur Resort"}, {t:"16:00", a:"In-villa Luxury Spa Treatment (2 Hours)"}, {t:"19:30", a:"Fine Dining at Sekar Kedhaton Restaurant"}],
                [{t:"09:00", a:"Private Keraton Tour accompanied by a Royal Abdi Dalem"}, {t:"12:00", a:"Visit exclusive silver workshops in Kotagede"}, {t:"13:30", a:"Gourmet Lunch at Six Senses Restaurant"}, {t:"16:30", a:"Private Ratu Boko Sunset Picnic Setup with Butler"}, {t:"19:30", a:"Private Ramayana Ballet Performance combined with Dinner"}],
                [{t:"07:30", a:"Morning 18-hole Golf Session at Merapi Golf Club (Volcano view)"}, {t:"12:30", a:"Freshen up and Lunch at Hyatt Regency Yogyakarta"}, {t:"15:00", a:"Exclusive Private Batik Workshop with a Javanese Maestro"}, {t:"18:30", a:"Return to hotel"}, {t:"20:00", a:"Fine Dining experience at Lemah Ledok Garden Resto"}],
                [{t:"09:30", a:"Private Helicopter City Tour over Yogyakarta, Coastline & Temples"}, {t:"11:30", a:"Touch down and transfer to Kaliurang"}, {t:"12:30", a:"Private VIP Curator Tour at Ullen Sentalu Museum"}, {t:"14:30", a:"European Fine Dining Lunch at Beukenhof Restaurant"}, {t:"17:00", a:"Relax at hotel"}, {t:"20:00", a:"Dinner at Sasanti Restaurant & Gallery"}],
                [{t:"10:00", a:"Leisurely morning and lavish breakfast in bed"}, {t:"12:30", a:"Lunch at a private setting in Plataran Heritage"}, {t:"15:00", a:"Private Andong (Horse Carriage) tour around local villages"}, {t:"17:30", a:"Sunset cocktails at a luxury rooftop lounge"}, {t:"20:00", a:"Romantic Farewell Dinner at Mil & Bay or Private Tent"}],
                [{t:"09:30", a:"Personalized Premium Gift Shopping (Silverware, Silk Batik, Luwak Coffee)"}, {t:"12:00", a:"Final Gourmet Lunch at the hotel"}, {t:"13:30", a:"VIP Airport Transfer"}, {t:"15:00", a:"VIP Lounge Access & Fast Track Departure Service"}]
            ]
        },
        'Malang': {
            'Backpacker': [
                [{t:"08:00", a:"Arrive at Malang Station, take local Angkot to Hostel"}, {t:"10:00", a:"Drop bags and walk to Jodipan Colorful Village (Kampung Warna Warni)"}, {t:"13:00", a:"Lunch at Legendary Bakso President (Right beside active train tracks)"}, {t:"15:30", a:"Walk to Alun-Alun Malang & visit Jami Great Mosque"}, {t:"18:30", a:"Culinary hunt at Alun-Alun Night Market"}, {t:"20:30", a:"Early sleep to prepare for Bromo"}],
                [{t:"00:30", a:"Wake up & join Midnight Shared Jeep for Bromo Adventure"}, {t:"04:30", a:"Hike up Penanjakan for epic Sunrise"}, {t:"07:00", a:"Explore Bromo Crater, Savana, and Whispering Sands"}, {t:"12:00", a:"Return to Malang city & grab quick lunch"}, {t:"14:00", a:"Deep Nap Time at hostel"}, {t:"19:00", a:"Dinner & warm up with famous STMJ Glintung"}],
                [{t:"08:30", a:"Rent Motorbike and ride up the winding roads to Batu City"}, {t:"11:00", a:"Enjoy Paragliding Hill View at Gunung Banyak (Omah Kayu)"}, {t:"13:30", a:"Lunch at historic Pecel Kawi"}, {t:"15:30", a:"Explore Coban Rondo Waterfall & get lost in the Labyrinth"}, {t:"18:00", a:"Check-in budget homestay in Batu"}, {t:"19:30", a:"Evening snack at Pos Ketan Legenda 1967 at Batu Square"}],
                [{t:"08:00", a:"Morning nature walk at Selecta Flower Garden & Pool"}, {t:"12:00", a:"Affordable heavy Lunch at Warung Wareg (Spicy Gourami)"}, {t:"14:00", a:"Visit Jatim Park 2 (Secret Zoo & Animal Museum)"}, {t:"18:30", a:"Return to Malang City"}, {t:"20:00", a:"Dinner at Mie Gacoan Malang (Famous spicy noodles)"}],
                [{t:"06:30", a:"Long motorbike ride to Southern Beaches (Pantai Balekambang)"}, {t:"09:30", a:"Explore the 'Tanah Lot of East Java' and its island temple"}, {t:"12:30", a:"Picnic Lunch by the sea with local grilled fish"}, {t:"15:00", a:"Beach hop to Pantai Goa Cina or Sendang Biru"}, {t:"17:30", a:"Watch Sunset on the Coast"}, {t:"19:30", a:"Ride back to Malang city & late dinner"}],
                [{t:"09:00", a:"Explore Kayutangan Heritage Street (Colonial Dutch vibes)"}, {t:"11:30", a:"Visit Brawijaya Military Museum"}, {t:"13:30", a:"Lunch with famous Black Soup Rawon Tessy"}, {t:"15:30", a:"Hangout at local student cafes around Suhat area"}, {t:"19:00", a:"Coffee night at classic Toko Kopi Kongca (Chinatown vibes)"}],
                [{t:"08:30", a:"Morning hunt for authentic Keripik Tempe at Sanan Village"}, {t:"11:00", a:"Early lunch & nostalgic ice cream at Toko Oen (Since 1930)"}, {t:"13:00", a:"Return motorbike / Checkout"}, {t:"14:30", a:"Train Departure from Malang Station"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Private Driver Pick-up from Station/Airport"}, {t:"11:00", a:"City sightseeing (Ijen Boulevard)"}, {t:"12:30", a:"Authentic East Java Lunch at Rawon Nguling"}, {t:"14:30", a:"Check-in at Santika or Harris Hotel"}, {t:"16:30", a:"Relax at hotel pool & enjoy afternoon tea"}, {t:"19:00", a:"Dinner with History & Museum vibes at Inggil Resto"}],
                [{t:"01:00", a:"Private Jeep Bromo Sunrise Tour (Direct pick up from hotel)"}, {t:"05:00", a:"Sunrise viewing at King Kong Hill"}, {t:"07:00", a:"Explore Bromo Crater, Teletubbies Savana, Sand Sea"}, {t:"09:00", a:"Breakfast Picnic style at Savana"}, {t:"12:30", a:"Return to Hotel to rest and shower"}, {t:"18:30", a:"Dinner at Ocean Garden or Bakso Bakar Pahlawan Trip"}],
                [{t:"09:00", a:"Trip to Batu City with Private Car"}, {t:"10:30", a:"Explore Jatim Park 3 (Dino Park & Legend Stars)"}, {t:"13:30", a:"Lunch at Sate Kelinci Batu (Rabbit Satay)"}, {t:"15:30", a:"Visit Museum Angkut (Massive Transportation Museum & Show)"}, {t:"19:00", a:"Dinner at Pasar Parkiran Batu or local famous resto"}],
                [{t:"08:30", a:"Agrotourism Apple Picking in Batu (Pick and eat fresh)"}, {t:"11:30", a:"Photo Hunt at Flora Wisata San Terra (Korean/Dutch architecture)"}, {t:"14:00", a:"Lunch at Ria Djenaka Cafe Batu"}, {t:"16:00", a:"Relax back at hotel"}, {t:"18:30", a:"Fun evening rides at Batu Night Spectacular (BNS) & Dinner"}],
                [{t:"07:00", a:"Day trip to the majestic Tumpak Sewu Waterfall (The Niagara of Indonesia)"}, {t:"10:00", a:"Trekking down the waterfall canyon (Guided)"}, {t:"13:30", a:"Lunch at Local Resto in Lumajang area"}, {t:"16:30", a:"Drive back to Malang"}, {t:"19:30", a:"Upscale local dinner at Javanine Resto Malang"}],
                [{t:"08:00", a:"Drive to Southern Coast for Tiga Warna Marine Conservation"}, {t:"10:30", a:"Guided trekking and Snorkeling in the pristine clear water"}, {t:"14:00", a:"Fresh Grilled Fish Lunch at Sendang Biru Port"}, {t:"16:30", a:"Return to Malang City"}, {t:"19:30", a:"Farewell dinner at Melati Restaurant (Hotel Tugu)"}],
                [{t:"09:30", a:"Shopping for Malang Strudel & Lapis Malang for souvenirs"}, {t:"11:30", a:"Checkout from hotel"}, {t:"12:30", a:"Lunch at Simpang Luwe or Cafe Bukit Delight"}, {t:"14:30", a:"Private Transfer to Airport/Station"}]
            ],
            'Luxury': [
                [{t:"10:00", a:"VIP Pick-up & Private Transfer to the historical Hotel Tugu Malang"}, {t:"11:30", a:"Check-in to a luxurious themed suite"}, {t:"13:00", a:"Welcome Lunch & Javanese Massage at Hotel Apsara Spa"}, {t:"16:00", a:"Exclusive High Tea at Tugu Lounges surrounded by antiques"}, {t:"19:30", a:"Fine Dining at Melati Restaurant (Dutch Colonial & Javanese menu)"}],
                [{t:"01:30", a:"Premium Bromo Tour using luxury Toyota Hardtop & Private Guide"}, {t:"05:30", a:"VIP view of Sunrise away from crowds"}, {t:"08:30", a:"Premium Breakfast Picnic setup overlooking the Bromo caldera"}, {t:"12:30", a:"Return to hotel, extensive Spa Recovery Package (2 hours)"}, {t:"19:30", a:"Indochina Royal Dinner at SaigonSan Restaurant"}],
                [{t:"10:00", a:"Check out and Transfer to Golden Tulip Resort Batu (Mountain view)"}, {t:"12:30", a:"Lunch at The Clubhouse with panoramic mountain views"}, {t:"15:00", a:"Private VIP Tour of Museum Angkut with personal guide"}, {t:"18:00", a:"Sunset cocktails at the resort"}, {t:"20:00", a:"Sky Bar Dinner with city lights view at resort"}],
                [{t:"07:30", a:"Morning 18-Hole Golf Session at Finna Golf & Country Club"}, {t:"13:00", a:"Gourmet Lunch at Golf Club Resto"}, {t:"15:30", a:"Relaxing afternoon at Onsen Hot Springs Resort VIP room"}, {t:"19:30", a:"Romantic Fine Dining at Omah Kitir Batu"}],
                [{t:"09:00", a:"Private Tour to Wonosari Tea Plantation (Lawang)"}, {t:"11:00", a:"Exclusive Horse Riding Session through the tea fields"}, {t:"13:30", a:"Lunch at Rollaas Tea Resort"}, {t:"16:00", a:"Return to hotel for leisure and high tea"}, {t:"19:30", a:"Dinner at The 1920 Cafe Malang or similar premium cafe"}],
                [{t:"09:30", a:"Singhasari Temple History Tour with Local Expert Archeologist"}, {t:"12:30", a:"Lunch at Djati Lounge (Premium modern architecture & pool)"}, {t:"15:30", a:"Relax at Private Pool Villa"}, {t:"18:00", a:"In-villa spa session"}, {t:"20:00", a:"Private Chef BBQ Dinner prepared at your villa"}],
                [{t:"10:00", a:"Premium Souvenirs shopping (Batik Malang & Craft) with assistant"}, {t:"12:30", a:"Final Gourmet Lunch at Tugu"}, {t:"14:30", a:"VIP Airport Transfer with Escort"}]
            ]
        },
        'Labuan Bajo': {
            'Backpacker': [
                [{t:"10:00", a:"Arrive at Airport, take local Ojek to budget Hostel in town"}, {t:"12:30", a:"Lunch at local Nasi Padang or Warung nearby"}, {t:"15:00", a:"Walk around the Marina & local markets"}, {t:"16:30", a:"Sunset Hike at Bukit Sylvia (Free entry, stunning panoramic view)"}, {t:"19:30", a:"Fresh Seafood dinner at Kampung Ujung Fish Market"}],
                [{t:"05:30", a:"Walk to port, Join Open Deck Boat Trip (Sharing) for Komodo Tour"}, {t:"08:30", a:"Hike to the top of Padar Island for the iconic 3-beach view"}, {t:"11:30", a:"Snorkeling at Pink Beach (Box lunch included)"}, {t:"14:00", a:"Komodo Dragon Trekking at Komodo Island with Ranger"}, {t:"17:00", a:"Sunset view from the boat heading back"}, {t:"19:30", a:"Back to Hostel & late dinner at local warung"}],
                [{t:"08:30", a:"Rent Scooter & ride through villages to Rangko Cave (Goa Rangko)"}, {t:"11:00", a:"Take small boat to cave, swim in the natural illuminated salt pool"}, {t:"14:00", a:"Lunch at local Warung in the coastal village"}, {t:"17:00", a:"Watch Sunset at Paradise Bar with live reggae music"}, {t:"20:00", a:"Dinner at local Night Market"}],
                [{t:"08:00", a:"Scooter ride to Cunca Wulang Canyon (Share guide cost with others)"}, {t:"11:00", a:"Cliff jumping and swimming at the canyon river"}, {t:"14:00", a:"Late lunch on the way back to town"}, {t:"16:30", a:"Relax & chill at Pede Beach"}, {t:"19:00", a:"Dinner at local eatery or hostel BBQ"}],
                [{t:"09:00", a:"Explore Batu Cermin Cave (Mirror Rock Cave) near town"}, {t:"12:00", a:"Lunch at Warung Mama (Famous for authentic local taste)"}, {t:"14:30", a:"Work/Chill/Read at Escape Bajo Coffee Shop"}, {t:"17:30", a:"Sunset view from the cafe overlooking the harbor"}, {t:"20:00", a:"Street food exploration for dinner"}],
                [{t:"09:00", a:"Free Day / Do Laundry / Walk around Marina promenade"}, {t:"12:30", a:"Lunch at La Cucina (Budget-friendly pizza/pasta)"}, {t:"15:00", a:"Hike up to Amelia Sea View for final sunset photography"}, {t:"18:30", a:"Return to hostel"}, {t:"20:00", a:"Farewell dinner & drinks with hostel mates"}],
                [{t:"08:00", a:"Buy authentic Ikat Weaving Souvenir at local traditional market"}, {t:"10:00", a:"Morning coffee at local roastery (e.g., Carpenter Cafe)"}, {t:"11:30", a:"Pack bags & checkout"}, {t:"12:30", a:"Ojek drop to Airport for departure"}]
            ],
            'Comfort': [
                [{t:"10:00", a:"Airport Pick-up by Hotel Shuttle"}, {t:"11:30", a:"Early Check-in at Ayana / Loccal Collection Resort"}, {t:"13:00", a:"Lunch with Marina view at Bajo Taco or hotel resto"}, {t:"15:30", a:"Relax at the resort pool or private beach"}, {t:"17:30", a:"Sunset cocktail at hotel lounge"}, {t:"19:30", a:"Dinner at La Cucina Restaurant"}],
                [{t:"06:00", a:"Board Comfortable Full Day Speedboat Tour"}, {t:"07:30", a:"Padar Island Hike for iconic views before it gets too hot"}, {t:"10:30", a:"Pink Beach Photo & Swim"}, {t:"13:00", a:"See Komodo Dragons & enjoy catered Lunch on Boat"}, {t:"15:00", a:"Manta Point Snorkeling (Swim with Manta Rays)"}, {t:"17:00", a:"Return to hotel"}, {t:"19:00", a:"Dinner at Taman Laut Handayani"}],
                [{t:"09:00", a:"Relaxing morning at Hotel Pool / Spa treatment"}, {t:"12:30", a:"Lunch at Molas Cafe (with pool access & billiards)"}, {t:"15:30", a:"Board an Afternoon Local Wooden Boat Sunset Cruise"}, {t:"18:00", a:"Watch thousands of flying foxes (bats) at Kalong Island during sunset"}, {t:"20:00", a:"Return to harbor and have dinner in town"}],
                [{t:"09:00", a:"Cultural Trip to Melo Village in the highlands"}, {t:"11:00", a:"Watch traditional Caci Whip Dance performance & drink local coffee"}, {t:"13:30", a:"Lunch at traditional Flores house or local restaurant"}, {t:"16:00", a:"Return to town, head to Loccal Collection (Santorini vibes)"}, {t:"17:30", a:"Sunset view & Tapas"}, {t:"19:30", a:"Dinner at the resort"}],
                [{t:"08:30", a:"Half Day speedboat trip to Kanawa Island (White sand & starfish)"}, {t:"12:30", a:"Lunch and relax on the island resort"}, {t:"15:30", a:"Return to Labuan Bajo town"}, {t:"17:00", a:"Leisure walk around Marina"}, {t:"19:30", a:"Dinner at Mai Ceng'go (Famous local seafood & ribs)"}],
                [{t:"09:30", a:"Souvenir Shopping (Flores Pearls, Ikat, & Premium Coffee)"}, {t:"13:00", a:"Lunch at Artomoro Restaurant or similar"}, {t:"15:00", a:"Afternoon Spa Treatment in town (e.g., Flores Spa)"}, {t:"18:00", a:"Head to Atlantis on the Rock"}, {t:"18:30", a:"Farewell Sunset Drinks & Dinner at Atlantis"}],
                [{t:"09:00", a:"Premium Coffee & Breakfast at Cafe Melinjo"}, {t:"11:30", a:"Packing and checkout"}, {t:"13:00", a:"Comfortable Airport Transfer by hotel shuttle"}]
            ],
            'Luxury': [
                [{t:"10:00", a:"Private SUV Transfer from Airport to Ayana Komodo or Plataran"}, {t:"11:30", a:"Check-in to Ocean View Suite with welcome drinks"}, {t:"13:30", a:"Lunch at Kisik Seafood Restaurant or resort fine dining"}, {t:"16:00", a:"Private beach time or spa intro"}, {t:"17:30", a:"Sunset at Unique Rooftop Bar with premium cocktails"}, {t:"20:00", a:"Fine Dining Experience at HonZEN (Japanese)"}],
                [{t:"08:00", a:"Board a Private Luxury Phinisi Yacht for 2-Day Liveaboard"}, {t:"10:30", a:"Cruise to Kelor Island for private snorkeling"}, {t:"13:00", a:"Gourmet Lunch prepared by private onboard chef"}, {t:"16:00", a:"Sunset Trekking at Padar Island (Guided, avoiding crowds)"}, {t:"19:30", a:"Exclusive Dinner Under the Stars on the Yacht Deck"}],
                [{t:"07:00", a:"Morning swim at Pink Beach (Private access before crowds arrive)"}, {t:"10:00", a:"Private Ranger Tour to see Komodo Dragons on Komodo Island"}, {t:"13:00", a:"Lunch on Yacht while sailing"}, {t:"15:00", a:"Champagne & Snorkeling at Taka Makassar sandbank & Manta Point"}, {t:"17:30", a:"Return cruise to the luxury resort"}, {t:"20:00", a:"Light dinner and rest at resort"}],
                [{t:"10:00", a:"Full Day Wellness: Private Yoga Session on the pier"}, {t:"11:30", a:"Extensive 3-Hour Signature Spa Package at Resort"}, {t:"14:00", a:"Healthy Organic Lunch at resort's green cafe"}, {t:"16:30", a:"Private Sunset Yacht Cocktail Cruise (Short trip)"}, {t:"20:00", a:"Exclusive Teppanyaki Dinner"}],
                [{t:"09:00", a:"Private Helicopter Tour over Komodo National Park Islands (1 Hour)"}, {t:"11:00", a:"Return to resort & relax"}, {t:"13:30", a:"Lunch at Atlantis on the Rock"}, {t:"16:00", a:"Private Beach Setup & Relax at Waecicu Beach"}, {t:"19:30", a:"Romantic Private Beach Dinner with Bonfire & Butler"}],
                [{t:"10:00", a:"Leisure & Infinity Pool Time at the resort"}, {t:"13:00", a:"In-Villa Dining Experience for Lunch"}, {t:"15:30", a:"Afternoon High Tea & local culture presentation in-house"}, {t:"18:00", a:"Final sunset watching from suite balcony"}, {t:"19:30", a:"Premium Lobster & Wagyu Farewell Dinner at main restaurant"}],
                [{t:"10:00", a:"Boutique Shopping for Premium Flores Pearls & Textiles (Brought to hotel)"}, {t:"12:00", a:"Check out & Private Transfer"}, {t:"12:30", a:"VIP Airport Handling & Lounge Access"}, {t:"14:00", a:"First Class Departure"}]
            ]
        },
        'East Java': {
            'Backpacker': [
                [{t:"08:00", a:"Train from Jakarta/Jogja to Malang Station"}, {t:"11:30", a:"Arrive, take Angkot & Check-in Colorful Hostel in Malang"}, {t:"13:30", a:"Lunch at local Bakso President"}, {t:"15:00", a:"Explore Jodipan Colorful Village & Tridi Village"}, {t:"18:00", a:"Stroll around Malang Alun-Alun"}, {t:"19:30", a:"Dinner at Alun-Alun Night Market"}],
                [{t:"00:00", a:"Wake up for Midnight Shared Jeep to Bromo"}, {t:"04:30", a:"Arrive at Penanjakan for epic Sunrise"}, {t:"06:30", a:"Hike Bromo Crater & explore Whispering Sands"}, {t:"11:30", a:"Return to Malang"}, {t:"13:00", a:"Lunch & Deep Nap Time at hostel"}, {t:"19:00", a:"Dinner with Spicy Rawon Tessy"}],
                [{t:"08:00", a:"Take morning Economy Train from Malang to Banyuwangi"}, {t:"15:00", a:"Arrive in Banyuwangi & Check-in to Homestay"}, {t:"16:30", a:"Walk around local Osing village"}, {t:"19:00", a:"Dinner with authentic super-spicy Nasi Tempong Mbok Wah"}, {t:"20:30", a:"Early sleep for midnight hike"}],
                [{t:"00:00", a:"Start Ijen Blue Fire Hike (Share transport & local guide)"}, {t:"04:00", a:"Witness the Blue Fire & sunrise over the Acid Lake"}, {t:"08:30", a:"Watch sulfur miners at work"}, {t:"10:00", a:"Return to homestay & Rest/Sleep"}, {t:"14:30", a:"Afternoon bus to Red Island Beach (Pantai Merah)"}, {t:"17:30", a:"Sunset at the beach"}, {t:"19:30", a:"Budget seafood dinner"}],
                [{t:"08:00", a:"Rent motorbike, long ride to Baluran National Park"}, {t:"11:00", a:"Explore Bekol Savana (Little Africa of Java)"}, {t:"13:30", a:"Lunch near Bama Beach inside the park"}, {t:"15:30", a:"Relax at the beach, watch wild monkeys and deer"}, {t:"18:00", a:"Ride back to Banyuwangi city"}, {t:"20:00", a:"Dinner at local warung"}],
                [{t:"09:00", a:"Walking tour at Kampung Arab Banyuwangi"}, {t:"12:30", a:"Lunch with unique Rujak Soto (Mix of salad & soup)"}, {t:"15:00", a:"Visit traditional Osing village (Kemiren)"}, {t:"17:00", a:"Visit Boom Beach for historical Dutch architecture"}, {t:"18:00", a:"Sunset at Boom Beach"}, {t:"19:30", a:"Farewell street food dinner at Taman Blambangan"}],
                [{t:"08:30", a:"Buy local Osing Coffee Beans & snacks at local market"}, {t:"10:30", a:"Packing & Checkout"}, {t:"11:30", a:"Early lunch (Sego Cawuk)"}, {t:"13:00", a:"Head to Train Station / Ketapang Ferry Port to Bali"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Pick-up from Surabaya Airport, Head to Probolinggo/Bromo"}, {t:"12:30", a:"Lunch at Rawon Setan Surabaya or local resto on the way"}, {t:"16:00", a:"Check-in at comfortable Bromo Hotel (e.g., Lava View Lodge)"}, {t:"17:30", a:"Enjoy the cool climate and sunset from the hotel"}, {t:"19:00", a:"Dinner at hotel & early sleep for sunrise"}],
                [{t:"03:00", a:"Private Jeep to Penanjakan Sunrise (No sharing)"}, {t:"06:00", a:"Explore Sea of Sand & Bromo Crater"}, {t:"09:00", a:"Breakfast at Hotel & Checkout"}, {t:"11:00", a:"Transfer to Bondowoso/Banyuwangi in AC Car"}, {t:"14:00", a:"Lunch on the way"}, {t:"17:00", a:"Check-in Hotel in Banyuwangi (e.g., El Royale/Aston)"}, {t:"19:00", a:"Dinner & early rest"}],
                [{t:"00:30", a:"Ijen Crater Tour with Private Guide & Gas Masks"}, {t:"05:30", a:"Enjoy the stunning turquoise sulfur lake view & sunrise"}, {t:"09:30", a:"Return to hotel for Breakfast & Rest"}, {t:"13:00", a:"Lunch at hotel"}, {t:"15:00", a:"Relaxing afternoon by the hotel pool/spa"}, {t:"19:00", a:"Dinner at local famous restaurant (Srengenge Asri)"}],
                [{t:"08:30", a:"Visit De Jawatan Forest (Magical Trembesi trees, Lord of the Rings vibe)"}, {t:"12:00", a:"Lunch at Floating Restaurant or local cafe"}, {t:"14:00", a:"Drive to Red Island Beach (Pantai Pulau Merah)"}, {t:"15:30", a:"Surfing lesson or chill by the beach"}, {t:"17:30", a:"Premium Sunset view & Seafood Dinner on the beach"}, {t:"20:00", a:"Return to hotel"}],
                [{t:"08:00", a:"Comfortable AC Car trip to Baluran Safari"}, {t:"10:30", a:"Wildlife spotting at Savana Bekol"}, {t:"12:30", a:"Picnic Lunch Setup or lunch at Bama Beach resto"}, {t:"14:30", a:"Snorkeling or mangrove walk at Bama Beach"}, {t:"17:00", a:"Return trip to city"}, {t:"19:30", a:"Dinner at Seafood Resto in town"}],
                [{t:"09:00", a:"Check-out and move to Dialoog Hotel for a premium leisure day"}, {t:"12:30", a:"Lunch at the hotel's beachfront resto"}, {t:"15:00", a:"Banyuwangi City Tour (Pendopo & Blambangan Park)"}, {t:"17:00", a:"Sunset at Dialoog Beach Club"}, {t:"19:30", a:"Farewell Dinner with cultural dance performance"}],
                [{t:"09:00", a:"Souvenir shopping (Batik Gajah Oling & premium coffee)"}, {t:"11:30", a:"Checkout and final Lunch"}, {t:"13:30", a:"Transfer to Blimbingsari Airport for departure"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"VIP Arrival at Surabaya Airport, luxury van transfer"}, {t:"12:30", a:"Fine Dining Lunch at Majapahit Hotel Surabaya"}, {t:"14:30", a:"Scenic drive to Bromo"}, {t:"17:00", a:"Check-in at Plataran Bromo Resort & Spa"}, {t:"18:00", a:"Welcome massage"}, {t:"19:30", a:"Exclusive Highland Dinner at the resort"}],
                [{t:"03:00", a:"Premium Hardtop Jeep for Bromo Sunrise with private guide"}, {t:"07:30", a:"Private Gourmet Picnic Breakfast on the Savana"}, {t:"10:00", a:"Return to resort, extensive Spa & Massage"}, {t:"13:00", a:"Lunch at Resort overlooking the hills"}, {t:"15:30", a:"Afternoon tea & agriculture tour"}, {t:"19:00", a:"Fine Dining Experience"}],
                [{t:"09:00", a:"Private Helicopter transfer to Ijen/Banyuwangi area (if available) or Luxury Van"}, {t:"12:30", a:"Check-in at Jiwa Jawa Resort Ijen"}, {t:"14:00", a:"Lunch at Resort"}, {t:"16:00", a:"Explore resort's art gallery & terraced gardens"}, {t:"19:30", a:"Mountain view Dinner & early rest for midnight hike"}],
                [{t:"01:30", a:"Private Ijen VIP Expedition with Health/Safety team & Porter"}, {t:"07:30", a:"Return to resort for extensive recovery Massage"}, {t:"10:00", a:"Late Breakfast & Sleep"}, {t:"14:00", a:"Late lunch and leisure time"}, {t:"17:00", a:"Private traditional Gandrung dance performance at resort"}, {t:"19:30", a:"Dinner"}],
                [{t:"09:00", a:"Private Transfer to Dialoog Hotel Banyuwangi"}, {t:"11:30", a:"Check-in to Ocean View Suite"}, {t:"13:00", a:"Premium Seafood Lunch at Casabanyu"}, {t:"15:30", a:"Relax at the oceanfront Infinity Pool"}, {t:"18:00", a:"Sunset Cocktails"}, {t:"19:30", a:"Exclusive Beachfront Dinner"}],
                [{t:"08:30", a:"Charter Private Yacht/Premium Boat to Menjangan Island (Bali border)"}, {t:"10:30", a:"World-class private snorkeling/diving session"}, {t:"13:00", a:"Gourmet Lunch served on the Yacht"}, {t:"15:30", a:"Cruise back to Banyuwangi"}, {t:"17:00", a:"Return to hotel & Spa"}, {t:"19:30", a:"Farewell Fine Dining"}],
                [{t:"10:00", a:"Premium Gifts shopping with personal assistant (Batik & Coffee)"}, {t:"12:30", a:"Farewell Lunch at Dialoog"}, {t:"14:00", a:"VIP Airport Departure Service at Blimbingsari Airport"}]
            ]
        },
        'Central Java': {
            'Backpacker': [
                [{t:"09:00", a:"Train to Semarang Station, take BRT (Bus) to city center"}, {t:"11:30", a:"Check-in to budget hostel"}, {t:"13:00", a:"Explore mystical Lawang Sewu (Thousand Doors)"}, {t:"15:30", a:"Walk around Kota Lama (Old Town) & Blenduk Church"}, {t:"18:00", a:"Sunset at Semarang Old Town"}, {t:"19:30", a:"Dinner & street food at Simpang Lima (Tahu Gimbal)"}],
                [{t:"07:00", a:"Take a local bus to Wonosobo, then minibus to Dieng Plateau"}, {t:"11:30", a:"Arrive & Check-in Homestay in Dieng"}, {t:"13:30", a:"Explore Sikidang Crater (Kawah Sikidang)"}, {t:"15:30", a:"Visit Arjuna Temple Complex"}, {t:"18:00", a:"Return to homestay"}, {t:"19:00", a:"Eat local Mie Ongklok & Sate Sapi for dinner in the cold"}],
                [{t:"03:30", a:"Hike Bukit Sikunir for the famous Golden Sunrise"}, {t:"07:30", a:"Visit the colorful Telaga Warna & Telaga Pengilon"}, {t:"10:30", a:"Checkout and take bus down to Magelang"}, {t:"14:00", a:"Lunch on the way"}, {t:"15:30", a:"Check-in Magelang Hostel"}, {t:"19:00", a:"Dinner at local Alun-Alun Magelang (Kupat Tahu)"}],
                [{t:"04:30", a:"Hike Punthuk Setumbu for Borobudur silhouette sunrise"}, {t:"08:30", a:"Visit Gereja Ayam (Chicken Church) at Bukit Rhema"}, {t:"11:00", a:"Explore Borobudur Temple (Regular access)"}, {t:"14:00", a:"Lunch and bus ride to Solo (Surakarta)"}, {t:"17:00", a:"Check-in Solo Hostel"}, {t:"19:30", a:"Dinner with Nasi Liwet Solo & Susu Shi Jack"}],
                [{t:"09:00", a:"Shopping for cheap Batik at Pasar Klewer"}, {t:"12:30", a:"Lunch at Tengkleng Klewer Bu Edi"}, {t:"14:30", a:"Explore Kampung Batik Kauman on foot"}, {t:"17:00", a:"Visit Triwindu Antique Market"}, {t:"19:00", a:"Evening walk at Ngarsopuro"}, {t:"20:00", a:"Dinner at Cafe Tiga Tjeret"}],
                [{t:"09:00", a:"Visit Keraton Surakarta (Solo Palace)"}, {t:"12:00", a:"Lunch at Timlo Solo"}, {t:"14:00", a:"Visit Danar Hadi Batik Museum"}, {t:"16:30", a:"Relax at Balekambang Park / City walk"}, {t:"18:30", a:"Take Prameks/Commuter Train back to Semarang/Jogja for departure base"}, {t:"20:30", a:"Late dinner"}],
                [{t:"09:00", a:"Last minute street food hunting (Lumpia Semarang or Serabi Solo)"}, {t:"11:00", a:"Packing & Checkout"}, {t:"12:30", a:"Depart via Station/Airport"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Flight/Train to Semarang, Comfort Car Pick-up"}, {t:"11:00", a:"Check-in at 4-Star Hotel"}, {t:"13:00", a:"Lunch at historic Pesta Keboen Resto"}, {t:"15:30", a:"Visit Sam Poo Kong Temple"}, {t:"17:30", a:"Walk around Kota Lama"}, {t:"20:00", a:"Dinner at Spiegel Bar & Bistro or Kampung Laut Seafood"}],
                [{t:"08:00", a:"Comfortable Drive to Dieng Plateau"}, {t:"12:00", a:"Lunch with premium Mie Ongklok & Sate sapi"}, {t:"14:00", a:"Explore Arjuna Temple & Sikidang Crater"}, {t:"16:00", a:"Visit Telaga Warna"}, {t:"17:30", a:"Check-in to nice Villa/Guesthouse in Dieng"}, {t:"19:00", a:"Warm dinner at villa"}],
                [{t:"04:00", a:"Sikunir Sunrise Tour via Jeep/Car"}, {t:"08:00", a:"Breakfast at Villa & Checkout"}, {t:"09:30", a:"Drive down to Magelang"}, {t:"13:00", a:"Check-in at MesaStila Resort or similar"}, {t:"15:30", a:"Coffee Plantation Tour within resort"}, {t:"19:30", a:"Dinner with Javanese ambiance"}],
                [{t:"04:30", a:"Borobudur Sunrise via Manohara Access"}, {t:"09:00", a:"Breakfast & Rest at hotel"}, {t:"12:00", a:"Checkout"}, {t:"13:00", a:"Lunch at Amanjiwo Restaurant (Comfort access) or Sekar Kedhaton"}, {t:"15:30", a:"Comfortable Transfer to Solo City"}, {t:"17:30", a:"Check-in Hotel in Solo"}, {t:"19:30", a:"Dinner at Kusuma Sahid"}],
                [{t:"09:00", a:"Tour of Mangkunegaran Palace Solo"}, {t:"12:00", a:"Taste authentic Serabi Solo"}, {t:"13:00", a:"Lunch at local favorite resto"}, {t:"15:00", a:"Exclusive Batik Making Class at Kampung Laweyan"}, {t:"18:00", a:"Relax at hotel"}, {t:"19:30", a:"Dinner at Selat Solo Mbak Lies"}],
                [{t:"08:30", a:"Day trip to Tawangmangu Highlands"}, {t:"11:00", a:"Visit Grojogan Sewu Waterfall (Comfortable walk)"}, {t:"13:30", a:"Lunch at local Tea Garden Cafe (Ndoro Dongker)"}, {t:"16:30", a:"Return to Solo"}, {t:"19:30", a:"Farewell Dinner at Goela Klapa"}],
                [{t:"09:30", a:"Premium Batik Shopping at Danar Hadi & local snacks"}, {t:"12:00", a:"Lunch & Checkout"}, {t:"14:00", a:"Comfortable Airport/Station Transfer"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"VIP Arrival at Semarang, Luxury Alphard Transfer"}, {t:"11:00", a:"Check-in at Padma Hotel Semarang or Tentrem"}, {t:"13:00", a:"Lunch at Spiegel Bar & Bistro in Old Town"}, {t:"15:30", a:"Private Heritage City Tour"}, {t:"18:00", a:"Relax at hotel pool"}, {t:"20:00", a:"Fine Dining at hotel's signature restaurant"}],
                [{t:"08:00", a:"Luxury Van transfer to Borobudur Area (Magelang)"}, {t:"11:30", a:"Lunch at Enam Langit by Plataran with panoramic Stupa View"}, {t:"14:00", a:"Check-in at Amanjiwo Resort"}, {t:"16:00", a:"In-villa Spa Treatment"}, {t:"18:30", a:"Sunset cocktails"}, {t:"19:30", a:"Exclusive Dinner at resort"}],
                [{t:"04:30", a:"Private Borobudur Sunrise Access with Expert Archeologist"}, {t:"08:30", a:"Champagne Breakfast at Dagi Abhinaya"}, {t:"11:00", a:"Rest & enjoy resort facilities"}, {t:"14:00", a:"Private Elephant Safari / VW Tour around villages"}, {t:"17:00", a:"Afternoon tea"}, {t:"19:30", a:"Gourmet Javanese Degustation Dinner"}],
                [{t:"09:00", a:"Private Transfer to Solo City"}, {t:"11:30", a:"Check-in at Alila Solo Luxury Suite"}, {t:"12:30", a:"Lunch at Agra Rooftop Alila Solo"}, {t:"15:00", a:"Private Batik Collection Tour at Danar Hadi (VIP Access)"}, {t:"18:00", a:"Spa session at Alila"}, {t:"20:30", a:"Royal Dining Experience"}],
                [{t:"09:00", a:"Exclusive VIP Tour of Keraton Solo & Mangkunegaran"}, {t:"12:30", a:"Lunch at Canting Londo Kitchen"}, {t:"15:00", a:"Hunt for Antiques at Triwindu Market with private guide"}, {t:"17:30", a:"Return to hotel"}, {t:"19:30", a:"Dinner at Epice Restaurant"}],
                [{t:"08:00", a:"Morning Golf at Merapi Golf Club or VIP Spa Day"}, {t:"13:30", a:"Luxury Lunch at a heritage colonial house"}, {t:"16:00", a:"Relaxing afternoon high tea in Solo"}, {t:"19:30", a:"Farewell Fine Dining Experience"}],
                [{t:"10:00", a:"Personalized Gift Shopping & Packing with butler"}, {t:"12:00", a:"Farewell Lunch"}, {t:"13:30", a:"VIP Transfer to Solo Airport"}, {t:"14:30", a:"VIP Lounge Access & Fast Track Departure"}]
            ]
        },
        'West Java': {
            'Backpacker': [
                [{t:"08:00", a:"Train to Bandung, take Angkot to Hostel in city center"}, {t:"11:00", a:"Drop bags & walk to Braga Street"}, {t:"12:30", a:"Lunch with authentic Batagor Riri / Cuanki Serayu"}, {t:"14:30", a:"Historical walk at Braga & Asia Afrika (Museum KAA)"}, {t:"17:00", a:"Sunset at Alun-Alun Bandung"}, {t:"19:30", a:"Dinner at Lengkong Night Street Food"}],
                [{t:"08:00", a:"Take Angkot/Bus up to Lembang"}, {t:"10:30", a:"Explore Floating Market Lembang"}, {t:"13:00", a:"Lunch at floating market stalls"}, {t:"14:30", a:"Visit Farmhouse Susu Lembang (Hobbit house)"}, {t:"17:30", a:"Return to Bandung city"}, {t:"20:00", a:"Dinner with Nasi Kalong or Sate Maulana Yusuf"}],
                [{t:"07:00", a:"Take public bus from Leuwipanjang to Ciwidey (South Bandung)"}, {t:"10:30", a:"Explore the mystical Kawah Putih (White Crater)"}, {t:"13:30", a:"Lunch with Nasi Liwet at local saung"}, {t:"15:00", a:"Visit Ranca Upas to feed the deer"}, {t:"17:30", a:"Bus ride back to city"}, {t:"20:00", a:"Late dinner & rest"}],
                [{t:"08:00", a:"Long Bus Ride from Bandung to Pangandaran Beach"}, {t:"14:30", a:"Arrive & Check-in Homestay near the beach"}, {t:"16:00", a:"Explore Pangandaran National Park (Jungle trek)"}, {t:"17:30", a:"Chill and watch Sunset at Pangandaran West Beach"}, {t:"19:30", a:"Affordable Seafood dinner at local fish market"}],
                [{t:"08:00", a:"Rent bike / local transport to Green Canyon (Cukang Taneuh)"}, {t:"09:30", a:"Boat ride & budget body rafting through the canyon"}, {t:"13:30", a:"Lunch at local warung near the river"}, {t:"15:30", a:"Visit Batu Hiu (Shark Rock) for sunset"}, {t:"18:30", a:"Return to Pangandaran"}, {t:"20:00", a:"Dinner & beachside walk"}],
                [{t:"08:00", a:"Morning Bus to Bogor (via Bandung/Tasikmalaya)"}, {t:"14:30", a:"Arrive & Check-in Bogor Hostel"}, {t:"16:00", a:"Walk around Bogor Botanical Garden outer ring & feed deer"}, {t:"19:00", a:"Dinner with famous Soto Kuning Pak Yusup or Surya Kencana street food"}],
                [{t:"08:30", a:"Explore Bogor Botanical Garden (Kebun Raya) inside"}, {t:"11:30", a:"Lunch with authentic Asinan Bogor & Roti Unyil"}, {t:"13:30", a:"Checkout and take Commuter Line (Train) to Jakarta / Airport"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Take WHOOSH Fast Train from Jakarta to Bandung, Car Pick-up"}, {t:"10:30", a:"Check-in at Padma Hotel or similar 4-star in Ciumbuleuit"}, {t:"12:30", a:"Lunch at Kampung Daun with nature vibes and waterfall"}, {t:"15:00", a:"Shopping at Rumah Mode Factory Outlet"}, {t:"17:30", a:"Relax at hotel heated pool"}, {t:"19:30", a:"Dinner at Miss Bee Providore"}],
                [{t:"08:30", a:"Drive up to Tangkuban Perahu Crater (Drive right to the top)"}, {t:"11:30", a:"Explore the aesthetic Orchid Forest Cikole"}, {t:"13:30", a:"Lunch at Dusun Bambu Leisure Park"}, {t:"16:00", a:"Coffee and sunset view at Lereng Anteng or Punclut"}, {t:"19:00", a:"Return to city, Dinner in Paskal Food Market"}],
                [{t:"08:00", a:"Drive to South Bandung (Ciwidey)"}, {t:"10:30", a:"Comfortable tour of Kawah Putih via shuttle"}, {t:"13:00", a:"Lunch at Pinisi Resto (Iconic ship-shaped restaurant)"}, {t:"15:00", a:"Explore Glamping Lakeside view & Rancabali Tea plantation"}, {t:"18:00", a:"Return to Bandung"}, {t:"19:30", a:"Dinner at The Valley Bistro Cafe"}],
                [{t:"08:00", a:"Comfortable private transfer from Bandung to Pangandaran"}, {t:"13:30", a:"Check-in at Laut Biru Resort or Pantai Indah"}, {t:"15:00", a:"Relax at the resort pool or the beach"}, {t:"17:30", a:"Sunset Dinner at premium seafood restaurant on the coast"}, {t:"20:00", a:"Evening beach stroll"}],
                [{t:"08:30", a:"Private Boat Tour at Green Canyon"}, {t:"10:30", a:"Guided Body Rafting Experience with safety gear"}, {t:"13:30", a:"Lunch with local Sundanese setup (Nasi Liwet)"}, {t:"15:30", a:"Sunset chill and surf watching at Batu Karas Beach"}, {t:"18:30", a:"Return to hotel in Pangandaran & dinner"}],
                [{t:"08:00", a:"Private Transfer to Garut"}, {t:"12:00", a:"Lunch at famous Asep Strawberry"}, {t:"14:00", a:"Check-in at Kampung Sampireun Resort & Spa"}, {t:"15:30", a:"Enjoy private hot spring and traditional canoe on the lake"}, {t:"19:30", a:"Romantic dinner by the lake with Sundanese music"}],
                [{t:"09:00", a:"Shopping for Chocodot & Leather jackets in Garut"}, {t:"11:30", a:"Checkout and Lunch"}, {t:"13:00", a:"Comfortable transfer back to Bandung or Jakarta Airport"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"Private Luxury Car pick-up from Jakarta to Bandung"}, {t:"11:30", a:"Arrive and Check-in at Intercontinental Dago Pakar or The Trans Luxury"}, {t:"13:00", a:"Lunch at The 18th Restaurant and Lounge"}, {t:"16:00", a:"Afternoon High Tea with panoramic city views"}, {t:"18:00", a:"Spa treatment at hotel"}, {t:"20:00", a:"Fine Dining at Burgundy Dine & Wine"}],
                [{t:"08:30", a:"Morning Golf at Dago Heritage or VIP Spa Treatment"}, {t:"13:00", a:"Lunch at Nara Park VIP Section"}, {t:"15:30", a:"Private Shopping tour at Premium Outlets with assistant"}, {t:"18:00", a:"Return to hotel to freshen up"}, {t:"19:30", a:"Dinner at The Peak Resort Dining (City light views)"}],
                [{t:"08:00", a:"Private Guided Tour to Kawah Putih & Glamping Lakeside"}, {t:"12:30", a:"Exclusive Lunch at a luxury resort in South Bandung"}, {t:"15:00", a:"VIP Strawberry Picking & Private Tea Tour"}, {t:"18:00", a:"Return to hotel"}, {t:"20:00", a:"In-room dining or hotel Fine Dining"}],
                [{t:"09:00", a:"Helicopter City Tour over Bandung (Optional) or Leisure morning"}, {t:"12:00", a:"Lunch at Maxi's Resto"}, {t:"14:00", a:"Private Transfer to Puncak / Bogor area"}, {t:"16:30", a:"Check-in at Pullman Ciawi Vimala Hills"}, {t:"18:00", a:"Relax at luxury pool"}, {t:"20:00", a:"Dinner at hotel's premium steakhouse"}],
                [{t:"09:00", a:"Taman Safari Bogor VIP Access (Behind the scenes & private guide)"}, {t:"13:30", a:"Lunch at Royal Safari Garden"}, {t:"16:00", a:"Relaxing afternoon at Vimala Hills Spa (2 hours)"}, {t:"19:00", a:"Transfer to Nicole's River Park"}, {t:"19:30", a:"Dinner at Nicole's Kitchen"}],
                [{t:"09:00", a:"Private Tea Walk & Picnic at Gunung Mas Tea Estate"}, {t:"12:30", a:"Lunch at Puncak Pass Resort (Historic colonial vibes)"}, {t:"15:00", a:"Leisure time in private villa/resort"}, {t:"17:30", a:"Sunset cocktails"}, {t:"19:30", a:"Farewell Fine Dining"}],
                [{t:"10:00", a:"Premium Souvenir arrangements & packing by butler"}, {t:"12:00", a:"Farewell Lunch"}, {t:"13:30", a:"VIP Transfer back to Jakarta Soekarno-Hatta Airport"}, {t:"15:30", a:"Lounge access & Departure"}]
            ]
        }
    };

    let scheduleHTML = '';
    
    // 1. Get Location Data
    let locationData = db[location];
    if (!locationData) locationData = db['Bali']; // Fallback to Bali

    // 2. Get Budget Data
    let budgetData = locationData[budget];
    if (!budgetData) budgetData = locationData['Comfort']; // Fallback to Comfort

    // 3. Loop Days (Valid sampai dengan jumlah hari yang dipilih, misal 7 Hari)
    for(let i = 0; i < days; i++) {
        let dailyActs = budgetData[i];
        
        // Fallback for missing days (jika terjadi error/data hari kurang dari yang diminta)
        if (!dailyActs) {
            dailyActs = [
                {t:"08:00", a:"Morning Leisure Time / Hotel Breakfast"}, 
                {t:"10:30", a:"Free Exploration & City Walk"},
                {t:"13:00", a:"Lunch at Local Favorite Spot"},
                {t:"15:30", a:"Afternoon Sightseeing & Cultural Visit"},
                {t:"17:30", a:"Sunset Viewing"},
                {t:"19:30", a:"Relaxing Dinner & Rest"}
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