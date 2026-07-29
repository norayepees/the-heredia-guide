/* =====================================================================
   THE HEREDIA GUIDE — shared UI dictionary (ES / EN)
   This file holds interface text only (labels, buttons, headings).
   Business content (place names, descriptions) lives in each
   building's config.js, already written in both languages there.
   Shared between all buildings — do not duplicate per building.
===================================================================== */
var I18N = {
  brand_sub:            { en:"Guest Guide",                     es:"Guía del huésped" },
  whatsapp_us:           { en:"WhatsApp us",                     es:"Escríbenos" },
  see_useful:            { en:"Useful information",              es:"Información útil" },
  discover_malaga:       { en:"Discover Málaga",                 es:"Descubre Málaga" },

  // Nav (4 tabs: Nora's picks and Favourites now live together under "Recommendations")
  nav_util:              { en:"Useful",  es:"Útil" },
  nav_reco:              { en:"Recommendations", es:"Recomendaciones" },
  nav_malaga:            { en:"Málaga", es:"Málaga" },
  nav_ayuda:             { en:"Help",    es:"Ayuda" },

  h_util:                { en:"Useful Information",              es:"Información Útil" },
  e_util:                { en:"Everything practical, in one place", es:"Todo lo práctico, en un solo lugar" },

  address_title:         { en:"Address",                         es:"Dirección" },
  copy_address:          { en:"Copy address",                    es:"Copiar dirección" },
  copied:                { en:"✓ Copied",                        es:"✓ Copiado" },
  open_maps:             { en:"Maps",                             es:"Mapa" },
  call:                  { en:"Call",                             es:"Llamar" },
  email:                 { en:"Email",                            es:"Correo" },

  checkin_title:         { en:"Check-in",                        es:"Check-in" },
  checkin_from:          { en:"From",                             es:"A partir de las" },
  checkout_title:        { en:"Check-out",                       es:"Check-out" },
  checkout_before:       { en:"Before",                           es:"Antes de las" },
  co_1:                  { en:"Switch off the air conditioning",  es:"Apaga el aire acondicionado" },
  co_2:                  { en:"Turn off all lights",               es:"Apaga las luces" },
  co_3:                  { en:"Close every door and window",      es:"Cierra puertas y ventanas" },
  co_4:                  { en:"Double-check you have all your belongings", es:"Comprueba que has recogido todas tus pertenencias" },
  co_5:                  { en:"Leave the keys where indicated",   es:"Deja las llaves en el lugar indicado" },

  ac_title:              { en:"Air Conditioning",                 es:"Aire Acondicionado" },
  ac_1:                  { en:"Keep doors and windows closed while it's running.", es:"Mantén puertas y ventanas cerradas mientras esté encendido." },
  ac_2:                  { en:"Please switch it off when you go out.", es:"Apágalo cuando salgas del apartamento." },

  trash_title:           { en:"Waste Disposal",                   es:"Basura" },
  trash_text:            { en:"Bins are located on",              es:"Los contenedores se encuentran en" },
  trash_hours:           { en:"Recommended time",                 es:"Horario recomendado" },

  parking_title:         { en:"Parking",                          es:"Aparcamiento" },
  market_title:          { en:"Supermarket",                      es:"Supermercado" },
  pharmacy_title:        { en:"Pharmacy",                         es:"Farmacia" },
  pharmacy_guardia:      { en:"On-duty pharmacy",                 es:"Farmacia de guardia" },
  luggage_title:         { en:"Luggage Storage",                  es:"Consigna de Equipaje" },
  luggage_text:          { en:"Need to store your bags before check-in or after check-out? We recommend a nearby luggage storage service.", es:"Si necesitas guardar tus maletas antes del check-in o después del check-out, recomendamos un servicio de consigna cercano." },
  luggage_pending:       { en:"We're finalising the details of this service — ask us and we'll point you to the best option nearby.", es:"Estamos confirmando los detalles de este servicio — pregúntanos y te indicamos la mejor opción cercana." },

  contact_title:         { en:"Contact",                          es:"Contacto" },
  contact_hours:         { en:"Attention hours",                  es:"Horario de atención" },
  contact_afterhours:    { en:"If you need help outside these hours for an urgent issue with the apartment, message us anyway — we'll do our best to help as soon as possible.",
                            es:"Si necesitas ayuda fuera de este horario por una incidencia urgente relacionada con el apartamento, escríbenos igualmente e intentaremos ayudarte lo antes posible." },

  h_nora:                { en:"Recommended by Nora",              es:"Recomendado por Nora" },
  e_nora:                { en:"My favourite spots to enjoy Málaga like a local", es:"Mis lugares favoritos para disfrutar Málaga como alguien de aquí" },

  h_comer:               { en:"Our Favourites",                   es:"Nuestros Favoritos" },
  e_comer:               { en:"A curated selection, not a directory", es:"No es un directorio, es una selección cuidada" },

  h_malaga:              { en:"Explore Málaga",                   es:"Descubre Málaga" },
  e_malaga:              { en:"Sorted by distance from your door", es:"Ordenado por distancia desde tu puerta" },
  h_beaches:             { en:"Beaches",                          es:"Playas" },
  h_shopping:            { en:"Shopping",                         es:"Compras" },
  h_transport:           { en:"Getting Around",                   es:"Transporte" },
  t_airport:             { en:"Airport",                          es:"Aeropuerto" },
  t_train:               { en:"Train Station",                   es:"Estación de Tren" },
  t_taxi:                { en:"Taxi",                             es:"Taxi" },

  h_help:                { en:"Need Help?",                       es:"¿Necesitas Ayuda?" },
  e_help:                { en:"We're here",                       es:"Estamos aquí" },
  help_text:             { en:"Anything at all — just message us.", es:"Cualquier cosa — solo escríbenos." },
  h_emg:                 { en:"Emergency",                         es:"Emergencias" },
  e_emg:                 { en:"Just in case",                     es:"Por si acaso" },
  emg_all:               { en:"Emergencies",                       es:"Emergencias" },
  emg_national:          { en:"National Police",                  es:"Policía Nacional" },
  emg_local:             { en:"Local Police",                     es:"Policía Local" },
  emg_fire:              { en:"Fire Brigade",                     es:"Bomberos" },
  emg_hospital:          { en:"Nearest hospital",                 es:"Hospital más cercano" },
  emg_note:              { en:"For any urgent issue with the apartment, please contact Heredia Suites as well.",
                            es:"Para cualquier incidencia urgente relacionada con el apartamento, contacta también con Heredia Suites." },

  review_title:          { en:"We hope you enjoyed your stay",    es:"Esperamos que hayas disfrutado tu estancia" },
  review_text:           { en:"If everything went well, it would mean a lot if you took a minute to leave us a review.",
                            es:"Si todo ha ido bien, nos ayudaría muchísimo que dedicaras un minuto a dejarnos una reseña." },
  review_booking:        { en:"Review on Booking",                es:"Reseña en Booking" },
  review_google:         { en:"Review on Google",                 es:"Reseña en Google" },
  review_rebook:         { en:"Book with us again",                es:"Volver a reservar" },
  footer_made:           { en:"made with care for our guests",    es:"hecho con cariño para nuestros huéspedes" },

  walk_min:              { en:"min walk",                          es:"min andando" },
  recommends:            { en:"Nora recommends",                  es:"Recomendado por Nora" },
};
