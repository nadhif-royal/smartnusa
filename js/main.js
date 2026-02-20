/* FILE: js/main.js - FINAL SMARTNUSA (Grid Features, No Mockup) */

window.scrollContainer = function(containerId, scrollAmount) {
    const container = document.getElementById(containerId);
    if (container) {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
};

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

    // C. Itinerary Generator Logic
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
            }, 1000);
        });
    }
});

// --- DATABASE ITINERARY ---
function generateSmartTimeline(location, days, budget) {
    const db = {
        'Bali': {
            'Backpacker': [
                [{t:"09:00", a:"Arrive DPS Airport, take Grab Bike to Hostel"}, {t:"12:00", a:"Check-in at Kuta/Canggu Hostel"}, {t:"16:00", a:"Sunset Walk at Kuta Beach (Free Entry)"}, {t:"19:00", a:"Dinner at Nasi Pedas Bu Andika"}],
                [{t:"08:00", a:"Rent Scooter & Ride to Ubud"}, {t:"10:00", a:"Campuhan Ridge Walk (Nature Trail)"}, {t:"13:00", a:"Lunch Nasi Ayam Kedewatan"}, {t:"16:00", a:"Explore Ubud Traditional Market"}],
                [{t:"07:00", a:"Public Ferry to Nusa Penida"}, {t:"10:00", a:"Rent Bike to Kelingking Beach"}, {t:"13:00", a:"Warung Lunch"}, {t:"16:00", a:"Crystal Bay Sunset Chill"}],
                [{t:"05:00", a:"Sunrise Ride to Lempuyang (Gateway to Heaven)"}, {t:"10:00", a:"Feed Koi Fish at Tirta Gangga Palace"}, {t:"13:00", a:"Local Satay Lilit Lunch"}, {t:"16:00", a:"Relax at the Hidden Virgin Beach"}],
                [{t:"09:00", a:"Beach Hopping in Uluwatu (Padang-Padang)"}, {t:"13:00", a:"Lunch at Local Warung"}, {t:"17:00", a:"Watch Sunset from Single Fin Cliff"}],
                [{t:"08:00", a:"Explore Tegalalang Rice Terrace Early Morning"}, {t:"11:00", a:"Purification Ritual at Tirta Empul"}, {t:"14:00", a:"Taste Suckling Pig at Gianyar Market"}],
                [{t:"09:00", a:"Affordable Souvenirs at Krishna Oleh-Oleh"}, {t:"12:00", a:"GoJek Ride to Airport for Departure"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Private Driver Airport Pick-up & Welcome"}, {t:"12:00", a:"Check-in at Boutique Hotel Seminyak"}, {t:"16:00", a:"Sunset Beanbags Session at La Plancha"}, {t:"19:00", a:"Dinner at the Legendary Made's Warung"}],
                [{t:"08:00", a:"Full Day Kintamani Tour & Barong Dance"}, {t:"12:00", a:"Buffet Lunch with Mount Batur View"}, {t:"15:00", a:"Visit Luwak Coffee Plantation"}, {t:"19:00", a:"Famous Crispy Duck Dinner in Ubud"}],
                [{t:"07:30", a:"Fast Boat to Nusa Penida (West Trip)"}, {t:"09:30", a:"Private Car Tour to Broken Beach & Angel Billabong"}, {t:"13:00", a:"Lunch at Resto with AC"}, {t:"16:00", a:"Return Fast Boat to Sanur"}],
                [{t:"09:00", a:"Bedugul Tour: Ulun Danu Beratan Temple"}, {t:"12:00", a:"Buffet Lunch near the Lake"}, {t:"15:00", a:"Walk through Jatiluwih Rice Terrace (UNESCO)"}],
                [{t:"10:00", a:"Morning Traditional Balinese Spa"}, {t:"13:00", a:"Cafe Hopping in Trendy Canggu"}, {t:"17:00", a:"Watch Kecak Fire Dance at Uluwatu"}, {t:"19:30", a:"Seafood Dinner on Jimbaran Sand"}],
                [{t:"09:00", a:"Fun Water Sports at Tanjung Benoa"}, {t:"13:00", a:"Explore the Majestic GWK Cultural Park"}, {t:"17:00", a:"Sundowner Cocktails at Potato Head Club"}],
                [{t:"09:00", a:"Shopping at Joger & Uniqlo"}, {t:"11:00", a:"Premium Coffee Break"}, {t:"13:00", a:"Private Transfer to Airport"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"VIP Airport Handling & Limousine Transfer"}, {t:"12:00", a:"Check-in 5-Star Resort Nusa Dua"}, {t:"16:00", a:"Afternoon High Tea at The Mulia"}, {t:"19:00", a:"Fine Dining Experience at Cuca Flavor"}],
                [{t:"09:00", a:"Private Helicopter Tour over Kintamani Volcano"}, {t:"12:00", a:"Gastronomy Lunch at Apéritif Ubud"}, {t:"15:00", a:"Private Art Museum Tour"}, {t:"19:00", a:"Degustation Menu at Locavore"}],
                [{t:"08:00", a:"Private Yacht Charter to Nusa Penida"}, {t:"11:00", a:"Snorkeling with Manta Rays (Private Guide)"}, {t:"13:00", a:"Beachfront Lunch at Beach Club"}, {t:"17:00", a:"Sunset Champagne Cruise Return"}],
                [{t:"10:00", a:"Full Day Wellness Retreat & Body Spa"}, {t:"13:00", a:"Organic Healthy Lunch at Alchemy"}, {t:"16:00", a:"Private Sunset Yoga Session"}, {t:"19:00", a:"Romantic Cave Dinner at Samabe"}],
                [{t:"09:00", a:"Exclusive VW Safari Tour East Bali"}, {t:"12:00", a:"Lunch at Amankila Resort"}, {t:"15:00", a:"Tenganan Ancient Village Private Tour"}, {t:"19:00", a:"Fresh Lobster Dinner"}],
                [{t:"11:00", a:"Private Cabana at Omnia/Savaya Club"}, {t:"17:00", a:"Priority Access Rock Bar Sunset"}, {t:"20:00", a:"Private Chef BBQ Dinner at Villa"}],
                [{t:"10:00", a:"High-end Shopping at Seminyak Village"}, {t:"12:00", a:"Premium Airport Lounge Access"}, {t:"14:00", a:"VIP Departure Service"}]
            ]
        },
        'Yogyakarta': {
            'Backpacker': [
                [{t:"09:00", a:"Bus TransJogja Adventure from Airport"}, {t:"13:00", a:"Check-in Friendly Hostel near Malioboro"}, {t:"19:00", a:"Angkringan Kopi Joss (Charcoal Coffee) Experience"}],
                [{t:"08:00", a:"Rent Motorbike & City Ride"}, {t:"09:00", a:"Explore Tamansari Water Castle Tunnels"}, {t:"13:00", a:"Lunch Gudeg Permata (Local Favorite)"}, {t:"17:00", a:"Blind Walk at Alun-Alun Kidul"}],
                [{t:"04:00", a:"Sunrise Ride to Punthuk Setumbu"}, {t:"08:00", a:"Photo Stop outside Borobudur Temple"}, {t:"13:00", a:"Explore the Unique Chicken Church"}, {t:"19:00", a:"Authentic Sate Klathak Pak Pong"}],
                [{t:"08:00", a:"Ride to Gunung Kidul Beaches"}, {t:"12:00", a:"Relax on white sands of Indrayanti"}, {t:"16:00", a:"City View from Bukit Bintang"}],
                [{t:"09:00", a:"Cultural Visit Ullen Sentalu Museum"}, {t:"13:00", a:"Picnic at Kaliurang Park"}, {t:"19:00", a:"Dinner Legendary Mie Ayam Tumini"}],
                [{t:"09:00", a:"Walking Tour Kota Gede Silver District"}, {t:"13:00", a:"Spicy Mangut Lele Mbah Marto"}, {t:"16:00", a:"Sandboarding at Gumuk Pasir"}],
                [{t:"09:00", a:"Buy Bakpia Pathok 25 Fresh from Oven"}, {t:"12:00", a:"Train Departure from Tugu Station"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Private Car Airport Pick-up"}, {t:"13:00", a:"Lunch Authentic Gudeg Yu Djum"}, {t:"15:00", a:"Check-in 4-Star Hotel"}, {t:"19:00", a:"Javanese Dinner at The House of Raminten"}],
                [{t:"04:00", a:"Borobudur Sunrise Tour (Manohara Access)"}, {t:"11:00", a:"Merapi Volcano Lava Tour by Jeep"}, {t:"13:00", a:"Mushroom Lunch at Jejamuran"}, {t:"19:00", a:"Dinner Bakmi Jowo Mbah Gito"}],
                [{t:"08:00", a:"Sultan Palace (Kraton) Tour with Guide"}, {t:"12:00", a:"Royal Cuisine Lunch at Bale Raos"}, {t:"16:00", a:"Sunset at Prambanan Temple"}, {t:"19:00", a:"Ramayana Ballet VIP Seat"}],
                [{t:"09:00", a:"Cave Tubing Adventure at Goa Pindul"}, {t:"13:00", a:"Seafood Lunch by the Beach"}, {t:"17:00", a:"Sunset Dinner at Heha Sky View"}],
                [{t:"09:00", a:"Instagrammable Spot: Mangunan Pine Forest"}, {t:"13:00", a:"Lunch Sate Ratu"}, {t:"16:00", a:"Sunset Chill at Obelix Hills"}],
                [{t:"10:00", a:"Traditional Batik Making Class"}, {t:"13:00", a:"Lunch at Mediterranea"}, {t:"16:00", a:"Javanese Massage & Spa"}],
                [{t:"09:00", a:"Shopping at Hamzah Batik"}, {t:"12:00", a:"Drop to YIA Airport"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"Alphard Airport Transfer"}, {t:"12:00", a:"Check-in Amanjiwo / Phoenix Hotel"}, {t:"16:00", a:"Heritage High Tea"}, {t:"19:00", a:"Royal Dinner at Gadri Resto"}],
                [{t:"04:30", a:"Private Borobudur Sunrise Access"}, {t:"09:00", a:"Champagne Breakfast with Stupa View"}, {t:"13:00", a:"Lunch at Plataran Borobudur"}, {t:"19:00", a:"Fine Dining at Sekar Kedhaton"}],
                [{t:"09:00", a:"Private Kraton Tour with Abdi Dalem"}, {t:"12:00", a:"Lunch at Six Senses"}, {t:"16:00", a:"Ratu Boko Sunset Picnic"}, {t:"20:00", a:"Private Ramayana Performance"}],
                [{t:"08:00", a:"Golf Session at Merapi Golf Club"}, {t:"13:00", a:"Lunch at Hyatt Regency"}, {t:"17:00", a:"Spa Treatment at Sheraton"}],
                [{t:"10:00", a:"Private Helicopter City Tour"}, {t:"13:00", a:"Lunch at Abhayagiri Venue"}, {t:"16:00", a:"Private Batik Workshop"}],
                [{t:"09:00", a:"Ullen Sentalu VIP Guide"}, {t:"13:00", a:"European Lunch at Beukenhof"}, {t:"19:00", a:"Romantic Dinner at Mil & Bay"}],
                [{t:"10:00", a:"Premium Gift Shopping"}, {t:"13:00", a:"VIP Airport Lounge Access"}]
            ]
        },
        'Malang': {
            'Backpacker': [
                [{t:"09:00", a:"Arrive Station, Angkot to Hostel"}, {t:"12:00", a:"Lunch Legendary Bakso President"}, {t:"16:00", a:"Walking Tour Jodipan Colorful Village"}, {t:"19:00", a:"Alun-Alun Night Market Culinary"}],
                [{t:"00:00", a:"Midnight Shared Jeep Bromo Adventure"}, {t:"12:00", a:"Return to City & Nap"}, {t:"19:00", a:"Dinner Warm STMJ Glintung"}],
                [{t:"09:00", a:"Rent Motorbike to Batu City"}, {t:"11:00", a:"Paragliding Hill View (Entry Only)"}, {t:"13:00", a:"Lunch Pecel Kawi"}, {t:"19:00", a:"Snack at Pos Ketan Legenda"}],
                [{t:"08:00", a:"Nature Walk at Coban Rondo Waterfall"}, {t:"12:00", a:"Lunch Warung Wareg"}, {t:"15:00", a:"Explore Selecta Flower Garden"}],
                [{t:"07:00", a:"Ride to Southern Beaches (Balekambang)"}, {t:"13:00", a:"Picnic Lunch by the Sea"}, {t:"17:00", a:"Watch Sunset on the Coast"}],
                [{t:"09:00", a:"Explore Kayutangan Heritage Street"}, {t:"13:00", a:"Lunch Black Soup Rawon Tessy"}, {t:"19:00", a:"Coffee at Toko Kopi Kongca"}],
                [{t:"09:00", a:"Buy Keripik Tempe (Oleh-oleh)"}, {t:"12:00", a:"Train Departure"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Private Driver Pick-up"}, {t:"12:00", a:"Lunch Authentic Rawon Nguling"}, {t:"14:00", a:"Check-in Santika/Harris Hotel"}, {t:"19:00", a:"Dinner with History at Inggil Resto"}],
                [{t:"00:30", a:"Private Jeep Bromo Sunrise Tour"}, {t:"08:00", a:"Breakfast Picnic at Savana"}, {t:"13:00", a:"Rest at Hotel"}, {t:"19:00", a:"Dinner Bakso President"}],
                [{t:"09:00", a:"Trip to Batu City"}, {t:"10:30", a:"Explore Jatim Park 3 (Dino Park)"}, {t:"13:00", a:"Lunch Sate Kelinci"}, {t:"16:00", a:"Visit Museum Angkut"}],
                [{t:"08:00", a:"Apple Picking Agrotourism"}, {t:"11:00", a:"Flora San Terra Photo Hunt"}, {t:"14:00", a:"Lunch Ria Djenaka"}, {t:"19:00", a:"Fun at Batu Night Spectacular"}],
                [{t:"07:00", a:"Tumpak Sewu Waterfall Tour"}, {t:"13:00", a:"Lunch Local Resto"}, {t:"19:00", a:"Dinner Mie Gacoan Heritage"}],
                [{t:"09:00", a:"Beach Day: Tiga Warna Conservation"}, {t:"13:00", a:"Grilled Fish Lunch"}, {t:"18:00", a:"Back to Malang City"}],
                [{t:"09:00", a:"Shopping Malang Strudel"}, {t:"12:00", a:"Airport Transfer"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"Private Transfer to Hotel Tugu"}, {t:"12:00", a:"Welcome Massage"}, {t:"14:00", a:"High Tea at Tugu"}, {t:"19:00", a:"Dinner at Melati Restaurant"}],
                [{t:"01:00", a:"Premium Bromo Tour (Toyota Hardtop)"}, {t:"06:00", a:"Premium Breakfast Picnic Bromo"}, {t:"13:00", a:"Spa Recovery Package"}, {t:"19:00", a:"Dinner at SaigonSan"}],
                [{t:"10:00", a:"Transfer to Golden Tulip Batu"}, {t:"12:00", a:"Lunch at The Clubhouse"}, {t:"15:00", a:"Private Museum Angkut Tour"}, {t:"19:00", a:"Sky Bar Dinner with View"}],
                [{t:"09:00", a:"Golf Session at Finna Golf"}, {t:"13:00", a:"Lunch with Mountain View"}, {t:"19:00", a:"Fine Dining at Omah Kitir"}],
                [{t:"08:00", a:"Private Tour Tea Plantation"}, {t:"12:00", a:"Lunch at Resort"}, {t:"15:00", a:"Horse Riding Session"}],
                [{t:"09:00", a:"Singhasari Temple History Tour"}, {t:"12:00", a:"Lunch Djati Lounge"}, {t:"16:00", a:"Relax at Pool Villa"}],
                [{t:"10:00", a:"Premium Souvenirs"}, {t:"13:00", a:"VIP Airport Transfer"}]
            ]
        },
        'Labuan Bajo': {
            'Backpacker': [
                [{t:"10:00", a:"Arrive, Ojeks to Hostel"}, {t:"13:00", a:"Lunch Nasi Padang"}, {t:"17:00", a:"Sunset Hike Bukit Sylvia (Free)"}, {t:"19:00", a:"Kampung Ujung Fish Market"}],
                [{t:"06:00", a:"Open Deck Boat Trip (Sharing)"}, {t:"09:00", a:"Hike Padar Island Top"}, {t:"13:00", a:"Komodo Trekking Adventure"}, {t:"18:00", a:"Back to Hostel"}],
                [{t:"09:00", a:"Rent Scooter to Rangko Cave"}, {t:"13:00", a:"Lunch Local Warung"}, {t:"17:00", a:"Sunset at Paradise Bar"}],
                [{t:"08:00", a:"Cunca Wulang Canyon (Share Cost)"}, {t:"13:00", a:"Lunch"}, {t:"16:00", a:"Relax at Pede Beach"}],
                [{t:"09:00", a:"Explore Batu Cermin Cave"}, {t:"12:00", a:"Lunch"}, {t:"15:00", a:"Coffee at Escape Bajo"}],
                [{t:"09:00", a:"Free Day / Laundry"}, {t:"17:00", a:"Sunset Amelia Sea View"}],
                [{t:"08:00", a:"Buy Ikat Weaving Souvenir"}, {t:"11:00", a:"Airport Drop"}]
            ],
            'Comfort': [
                [{t:"10:00", a:"Airport Pick-up"}, {t:"12:00", a:"Lunch at Bajo Taco"}, {t:"15:00", a:"Check-in Ayana/Similar"}, {t:"18:00", a:"Sunset Dinner at La Cucina"}],
                [{t:"06:00", a:"Speedboat Tour Full Day"}, {t:"07:30", a:"Padar Island Hike"}, {t:"10:00", a:"Pink Beach Photo & Swim"}, {t:"14:00", a:"Manta Point Snorkeling"}],
                [{t:"09:00", a:"Relax Hotel Pool"}, {t:"13:00", a:"Lunch Molas Cafe"}, {t:"16:30", a:"Sunset Cruise Local Boat"}],
                [{t:"09:00", a:"Trip to Melo Village (Caci Dance)"}, {t:"13:00", a:"Lunch"}, {t:"17:00", a:"Sunset at Loccal Collection"}],
                [{t:"08:00", a:"Day Trip Kanawa Island"}, {t:"12:00", a:"Lunch on Island"}, {t:"19:00", a:"Dinner Mai Ceng'go"}],
                [{t:"09:00", a:"Souvenir Shopping"}, {t:"13:00", a:"Spa Treatment"}, {t:"18:00", a:"Farewell Dinner Atlantis"}],
                [{t:"09:00", a:"Coffee at Cafe Melinjo"}, {t:"11:00", a:"Airport Transfer"}]
            ],
            'Luxury': [
                [{t:"10:00", a:"Private Car to Ayana/Plataran"}, {t:"13:00", a:"Lunch Kisik Seafood"}, {t:"17:00", a:"Sunset at Unique Rooftop Bar"}, {t:"20:00", a:"Fine Dining at HonZEN"}],
                [{t:"08:00", a:"Private Phinisi Liveaboard Start"}, {t:"12:00", a:"Lunch on Yacht"}, {t:"16:00", a:"Padar Sunset View"}, {t:"19:00", a:"Dinner Under the Stars"}],
                [{t:"07:00", a:"Pink Beach Private Access"}, {t:"11:00", a:"Komodo Dragon Private Ranger"}, {t:"15:00", a:"Taka Makassar Champagne"}, {t:"18:00", a:"Return to Resort"}],
                [{t:"10:00", a:"Full Day Spa Package"}, {t:"13:00", a:"Healthy Lunch"}, {t:"17:00", a:"Sunset Yacht Cocktail Cruise"}],
                [{t:"09:00", a:"Helicopter Tour over Komodo"}, {t:"13:00", a:"Lunch at Atlantis on the Rock"}, {t:"19:00", a:"Private Beach Dinner"}],
                [{t:"10:00", a:"Leisure & Pool Time"}, {t:"13:00", a:"Lunch at Resort"}, {t:"19:00", a:"Lobster Dinner"}],
                [{t:"10:00", a:"Premium Gift Shopping"}, {t:"12:00", a:"VIP Airport Handling"}]
            ]
        },
        'East Java': {
            'Backpacker': [
                [{t:"08:00", a:"Train to Malang Station"}, {t:"13:00", a:"Check-in Colorful Hostel"}, {t:"19:00", a:"Explore Night Market"}],
                [{t:"00:00", a:"Shared Jeep to Bromo"}, {t:"12:00", a:"Nap Time"}, {t:"19:00", a:"Spicy Bakso"}],
                [{t:"09:00", a:"Train to Banyuwangi"}, {t:"15:00", a:"Homestay Check-in"}, {t:"19:00", a:"Nasi Tempong Dinner"}],
                [{t:"00:00", a:"Ijen Blue Fire Hike"}, {t:"08:00", a:"Rest"}, {t:"13:00", a:"Red Island Beach"}],
                [{t:"08:00", a:"Baluran National Park Ride"}, {t:"12:00", a:"Savana Photo"}, {t:"15:00", a:"Beach Relax"}],
                [{t:"09:00", a:"Kampung Arab Tour"}, {t:"13:00", a:"Rujak Soto Lunch"}, {t:"16:00", a:"Boom Beach Sunset"}],
                [{t:"09:00", a:"Buy Coffee Beans"}, {t:"12:00", a:"Train Station"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Pick-up Surabaya Airport"}, {t:"12:00", a:"Rawon Setan Lunch"}, {t:"15:00", a:"Bromo Hotel"}],
                [{t:"03:00", a:"Private Jeep Sunrise"}, {t:"08:00", a:"Sea of Sand Photo"}, {t:"13:00", a:"Transfer Bondowoso"}],
                [{t:"00:00", a:"Ijen Tour Guide"}, {t:"09:00", a:"Breakfast"}, {t:"12:00", a:"Transfer Banyuwangi"}],
                [{t:"08:00", a:"De Jawatan Forest"}, {t:"12:00", a:"Floating Resto"}, {t:"15:00", a:"Red Island Sunset"}],
                [{t:"08:00", a:"Baluran Safari"}, {t:"12:00", a:"Picnic Lunch"}, {t:"15:00", a:"Snorkeling"}],
                [{t:"09:00", a:"Dialoog Hotel Leisure"}, {t:"13:00", a:"Lunch"}, {t:"16:00", a:"City Tour"}],
                [{t:"09:00", a:"Souvenirs"}, {t:"11:00", a:"Airport Transfer"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"VIP Arrival Surabaya"}, {t:"12:00", a:"Majapahit Hotel Lunch"}, {t:"15:00", a:"Luxury Van Bromo"}],
                [{t:"03:00", a:"Premium Hardtop Bromo"}, {t:"07:00", a:"Picnic Breakfast"}, {t:"12:00", a:"Resort Spa"}, {t:"19:00", a:"Fine Dining"}],
                [{t:"09:00", a:"Helicopter to Ijen"}, {t:"12:00", a:"Jiwa Jawa Resort"}, {t:"19:00", a:"Mountain Dinner"}],
                [{t:"02:00", a:"Private Ijen Expedition"}, {t:"09:00", a:"Massage"}, {t:"13:00", a:"Resort Lunch"}],
                [{t:"09:00", a:"Private Transfer Dialoog"}, {t:"13:00", a:"Seafood Lunch"}, {t:"17:00", a:"Infinity Pool"}],
                [{t:"09:00", a:"Private Yacht Menjangan"}, {t:"12:00", a:"Boat Lunch"}, {t:"15:00", a:"Private Snorkeling"}],
                [{t:"10:00", a:"Premium Gifts"}, {t:"12:00", a:"VIP Departure"}]
            ]
        },
        'Central Java': {
            'Backpacker': [
                [{t:"09:00", a:"Train to Semarang"}, {t:"13:00", a:"Lawang Sewu"}, {t:"19:00", a:"Simpang Lima Food"}],
                [{t:"08:00", a:"Bus to Dieng"}, {t:"13:00", a:"Sikidang Crater"}, {t:"16:00", a:"Homestay"}],
                [{t:"03:00", a:"Sikunir Hike"}, {t:"08:00", a:"Telaga Warna"}, {t:"13:00", a:"Bus to Magelang"}],
                [{t:"04:00", a:"Punthuk Setumbu"}, {t:"08:00", a:"Chicken Church"}, {t:"13:00", a:"Bus to Solo"}],
                [{t:"09:00", a:"Klewer Market"}, {t:"13:00", a:"Nasi Liwet"}, {t:"16:00", a:"Batik Village"}],
                [{t:"09:00", a:"Solo Palace"}, {t:"12:00", a:"Train to Jogja"}],
                [{t:"09:00", a:"Free Time"}, {t:"12:00", a:"Depart"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Flight to Semarang"}, {t:"13:00", a:"Pesta Keboen"}, {t:"15:00", a:"Sam Poo Kong"}],
                [{t:"08:00", a:"Car to Dieng"}, {t:"12:00", a:"Mie Ongklok"}, {t:"14:00", a:"Arjuna Temple"}],
                [{t:"04:00", a:"Sikunir Sunrise"}, {t:"09:00", a:"MesaStila Resort"}, {t:"15:00", a:"Coffee Tour"}],
                [{t:"04:30", a:"Borobudur Manohara"}, {t:"12:00", a:"Amanjiwo Lunch"}, {t:"15:00", a:"Transfer Solo"}],
                [{t:"09:00", a:"Mangkunegaran Palace"}, {t:"13:00", a:"Serabi Solo"}, {t:"16:00", a:"Batik Museum"}],
                [{t:"09:00", a:"Tawangmangu Trip"}, {t:"11:00", a:"Waterfall"}, {t:"14:00", a:"Tea Garden"}],
                [{t:"09:00", a:"Shopping"}, {t:"12:00", a:"Airport Transfer"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"VIP Arrival"}, {t:"12:00", a:"Spiegel Bistro"}, {t:"15:00", a:"Private City Tour"}],
                [{t:"08:00", a:"Luxury Van Borobudur"}, {t:"12:00", a:"Stupa View Lunch"}, {t:"16:00", a:"Spa"}],
                [{t:"04:30", a:"Private Borobudur"}, {t:"09:00", a:"Champagne Breakfast"}, {t:"13:00", a:"Elephant Safari"}],
                [{t:"09:00", a:"Transfer Alila Solo"}, {t:"12:00", a:"Agra Rooftop"}, {t:"16:00", a:"Private Batik"}],
                [{t:"09:00", a:"Royal Dinner"}, {t:"12:00", a:"Kusuma Sahid"}, {t:"15:00", a:"Antique Market"}],
                [{t:"08:00", a:"Merapi Golf"}, {t:"13:00", a:"Hyatt Lunch"}, {t:"19:00", a:"Fine Dining"}],
                [{t:"10:00", a:"Gifts"}, {t:"13:00", a:"VIP Depart"}]
            ]
        },
        'West Java': {
            'Backpacker': [
                [{t:"08:00", a:"Train to Bandung"}, {t:"12:00", a:"Batagor Riri"}, {t:"15:00", a:"Braga Street Walk"}],
                [{t:"09:00", a:"Angkot Lembang"}, {t:"11:00", a:"Floating Market"}, {t:"14:00", a:"Farmhouse"}],
                [{t:"07:00", a:"Kawah Putih Bus"}, {t:"12:00", a:"Nasi Liwet"}, {t:"15:00", a:"Deer Park"}],
                [{t:"08:00", a:"Bus Pangandaran"}, {t:"14:00", a:"Homestay"}, {t:"17:00", a:"Sunset"}],
                [{t:"08:00", a:"Green Canyon"}, {t:"13:00", a:"Seafood"}, {t:"16:00", a:"Batu Hiu"}],
                [{t:"08:00", a:"Bus to Bogor"}, {t:"14:00", a:"Botanical Garden"}, {t:"18:00", a:"Soto Kuning"}],
                [{t:"09:00", a:"Train Jakarta"}, {t:"12:00", a:"End of Trip"}]
            ],
            'Comfort': [
                [{t:"09:00", a:"Whoosh Train"}, {t:"12:00", a:"Kampung Daun"}, {t:"15:00", a:"Padma Hotel"}],
                [{t:"08:00", a:"Tangkuban Perahu"}, {t:"12:00", a:"Dusun Bambu"}, {t:"16:00", a:"Orchid Forest"}],
                [{t:"08:00", a:"Kawah Putih"}, {t:"12:00", a:"Pinisi Resto"}, {t:"15:00", a:"Glamping"}],
                [{t:"08:00", a:"Transfer Pangandaran"}, {t:"13:00", a:"Laut Biru"}, {t:"17:00", a:"Sunset Dinner"}],
                [{t:"08:00", a:"Private Boat Canyon"}, {t:"12:00", a:"Seafood"}, {t:"15:00", a:"Body Rafting"}],
                [{t:"08:00", a:"Transfer Garut"}, {t:"12:00", a:"Asep Strawberry"}, {t:"15:00", a:"Hot Spring"}],
                [{t:"09:00", a:"Dodol Shopping"}, {t:"12:00", a:"Airport"}]
            ],
            'Luxury': [
                [{t:"09:00", a:"Private Car Jakarta"}, {t:"12:00", a:"The 18th Resto"}, {t:"15:00", a:"Intercontinental"}],
                [{t:"09:00", a:"Golf Dago"}, {t:"13:00", a:"Burgundy Dine"}, {t:"16:00", a:"Spa"}],
                [{t:"08:00", a:"Private Kawah Putih"}, {t:"12:00", a:"Resort Lunch"}, {t:"15:00", a:"Strawberry VIP"}],
                [{t:"09:00", a:"Heli City Tour"}, {t:"12:00", a:"Miss Bee"}, {t:"15:00", a:"Premium Outlet"}],
                [{t:"08:00", a:"Transfer Puncak"}, {t:"12:00", a:"Puncak Pass"}, {t:"15:00", a:"Safari VIP"}],
                [{t:"09:00", a:"Tea Walk"}, {t:"12:00", a:"Nicole's Kitchen"}, {t:"16:00", a:"Pullman Relax"}],
                [{t:"10:00", a:"Souvenirs"}, {t:"12:00", a:"VIP Transfer"}]
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

    // 3. Loop Days
    for(let i = 0; i < days; i++) {
        let dailyActs = budgetData[i];
        
        if (!dailyActs) {
            dailyActs = [
                {t:"09:00", a:"Free Leisure Time / Shopping"}, 
                {t:"13:00", a:"Lunch at Local Favorite"},
                {t:"18:00", a:"Relaxing Dinner"}
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