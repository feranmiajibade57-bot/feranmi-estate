// Nationwide branch network — one desk in every state capital + the FCT.
// Addresses and direct lines are sample details for this demonstration build.

const mk = (state, city, address, region) => ({
  state,
  city,
  address,
  region,
  phone: `+234 801 555 ${String(100 + Math.abs(state.charCodeAt(0) * 7 + city.length * 13) % 800).slice(0, 4)}`,
  email: `${city.toLowerCase().replace(/[^a-z]/g, '')}@feranmiestates.com`,
});

export const regions = ['All', 'South-West', 'South-East', 'South-South', 'North-Central', 'North-East', 'North-West'];

export const branches = [
  // HQ
  { ...mk('Lagos', 'Lekki', 'Feranmi House, 14B Admiralty Way, Lekki Phase 1', 'South-West'), hq: true },
  // South-West
  mk('Ogun', 'Abeokuta', '12 Quarry Road, Ibara', 'South-West'),
  mk('Oyo', 'Ibadan', '7 Cocoa Mall Close, Jericho', 'South-West'),
  mk('Osun', 'Osogbo', '4 Oke-Fia Business Plaza', 'South-West'),
  mk('Ondo', 'Akure', '18 Oyemekun Road, Alagbaka', 'South-West'),
  mk('Ekiti', 'Ado-Ekiti', '3 Bank Road, Old Garage', 'South-West'),
  // South-East
  mk('Anambra', 'Awka', '9 Zik Avenue, Agu Awka', 'South-East'),
  mk('Enugu', 'Enugu', '22 Independence Layout, Ogui', 'South-East'),
  mk('Imo', 'Owerri', '15 Wetheral Road, New Owerri', 'South-East'),
  mk('Abia', 'Umuahia', '6 Bende Road, Isigate', 'South-East'),
  mk('Ebonyi', 'Abakaliki', '11 Water Works Road, Kpirikpiri', 'South-East'),
  // South-South
  mk('Rivers', 'Port Harcourt', '31 Ada George Road, Rumuogba', 'South-South'),
  mk('Delta', 'Warri', '8 Airport Road, Effurun', 'South-South'),
  mk('Edo', 'Benin City', '27 Sapele Road, Oka', 'South-South'),
  mk('Akwa Ibom', 'Uyo', '14 Ikot Ekpene Road, Itam', 'South-South'),
  mk('Cross River', 'Calabar', '9 Marian Road, State Housing', 'South-South'),
  mk('Bayelsa', 'Yenagoa', '5 Melford Okilo Road, Amarata', 'South-South'),
  // North-Central
  mk('FCT', 'Abuja', 'Plot 112, Aminu Kano Crescent, Wuse II', 'North-Central'),
  mk('Kwara', 'Ilorin', '16 Ahmadu Bello Way, GRA', 'North-Central'),
  mk('Kogi', 'Lokoja', '7 Ganaja Road, Lokongoma', 'North-Central'),
  mk('Niger', 'Minna', '4 Bosso Road, Chanchaga', 'North-Central'),
  mk('Benue', 'Makurdi', '19 Old Otukpo Road, High Level', 'North-Central'),
  mk('Plateau', 'Jos', '23 Rwang Pam Street, Rayfield', 'North-Central'),
  mk('Nasarawa', 'Lafia', '6 Makurdi Road, Tudun Wada', 'North-Central'),
  // North-East
  mk('Adamawa', 'Yola', '10 Galadima Aminu Way, Jimeta', 'North-East'),
  mk('Bauchi', 'Bauchi', '21 Yandoka Road, Fadaman Mada', 'North-East'),
  mk('Borno', 'Maiduguri', '13 Baga Road, Monday Market Area', 'North-East'),
  mk('Gombe', 'Gombe', '8 Bauchi Road, New GRA', 'North-East'),
  mk('Taraba', 'Jalingo', '5 Hammaruwa Way, Jalingo', 'North-East'),
  mk('Yobe', 'Damaturu', '4 Potiskum Road, Damaturu', 'North-East'),
  // North-West
  mk('Kano', 'Kano', '27 Ahmadu Bello Way, Nassarawa', 'North-West'),
  mk('Kaduna', 'Kaduna', '14 Ahmadu Bello Way, Ungwan Rimi', 'North-West'),
  mk('Katsina', 'Katsina', '9 IBB Way, Kofar Kaura', 'North-West'),
  mk('Kebbi', 'Birnin Kebbi', '6 Emir Haruna Road, Birnin Kebbi', 'North-West'),
  mk('Sokoto', 'Sokoto', '11 Kano Road, Gwiwa', 'North-West'),
  mk('Zamfara', 'Gusau', '7 Sani Abacha Way, Tudun Wada', 'North-West'),
  mk('Jigawa', 'Dutse', '3 Kazaure Road, Dutse', 'North-West'),
];
