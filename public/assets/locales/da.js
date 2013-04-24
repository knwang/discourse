Array.prototype.indexOf||(Array.prototype.indexOf=function(e){"use strict";if(void 0===this||null===this)throw new TypeError;var t=Object(this),n=t.length>>>0;if(0===n)return-1;var r=0;if(arguments.length>0&&(r=Number(arguments[1]),r!==r?r=0:0!==r&&1/0!==r&&r!==-1/0&&(r=(r>0||-1)*Math.floor(Math.abs(r)))),r>=n)return-1;for(var s=r>=0?r:Math.max(n-Math.abs(r),0);n>s;s++)if(s in t&&t[s]===e)return s;return-1});var I18n=I18n||{};I18n.defaultLocale="en",I18n.fallbacks=!1,I18n.defaultSeparator=".",I18n.locale=null,I18n.PLACEHOLDER=/(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,I18n.fallbackRules={},I18n.pluralizationRules={en:function(e){return 0==e?["zero","none","other"]:1==e?"one":"other"}},I18n.getFallbacks=function(e){if(e===I18n.defaultLocale)return[];if(!I18n.fallbackRules[e]){for(var t=[],n=e.split("-"),r=1;n.length>r;r++)t.push(n.slice(0,r).join("-"));t.push(I18n.defaultLocale),I18n.fallbackRules[e]=t}return I18n.fallbackRules[e]},I18n.isValidNode=function(e,t,n){return null!==e[t]&&e[t]!==n},I18n.lookup=function(e,t){var n,t=t||{},r=e,s=this.prepareOptions(I18n.translations),i=t.locale||I18n.currentLocale(),a=s[i]||{},t=this.prepareOptions(t);for("object"==typeof e&&(e=e.join(this.defaultSeparator)),t.scope&&(e=t.scope.toString()+this.defaultSeparator+e),e=e.split(this.defaultSeparator);a&&e.length>0;)n=e.shift(),a=a[n];if(!a){if(I18n.fallbacks)for(var o=this.getFallbacks(i),u=0;o.length>u&&!(a=I18n.lookup(r,this.prepareOptions({locale:o[u]},t)));o++);!a&&this.isValidNode(t,"defaultValue")&&(a=t.defaultValue)}return a},I18n.prepareOptions=function(){for(var e,t={},n=arguments.length,r=0;n>r;r++)if(e=arguments[r])for(var s in e)this.isValidNode(t,s)||(t[s]=e[s]);return t},I18n.interpolate=function(e,t){t=this.prepareOptions(t);var n,r,s,i=e.match(this.PLACEHOLDER);if(!i)return e;for(var a=0;n=i[a];a++)s=n.replace(this.PLACEHOLDER,"$1"),r=t[s],this.isValidNode(t,s)||(r="[missing "+n+" value]"),regex=new RegExp(n.replace(/\{/gm,"\\{").replace(/\}/gm,"\\}")),e=e.replace(regex,r);return e},I18n.translate=function(e,t){t=this.prepareOptions(t);var n=this.lookup(e,t);try{return"object"==typeof n?"number"==typeof t.count?this.pluralize(t.count,e,t):n:this.interpolate(n,t)}catch(r){return this.missingTranslation(e)}},I18n.localize=function(e,t){switch(e){case"currency":return this.toCurrency(t);case"number":return e=this.lookup("number.format"),this.toNumber(t,e);case"percentage":return this.toPercentage(t);default:return e.match(/^(date|time)/)?this.toTime(e,t):t.toString()}},I18n.parseDate=function(e){var t,n;if("object"==typeof e)return e;if(t=e.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?(Z|\+0000)?/)){for(var r=1;6>=r;r++)t[r]=parseInt(t[r],10)||0;t[2]-=1,n=t[7]?new Date(Date.UTC(t[1],t[2],t[3],t[4],t[5],t[6])):new Date(t[1],t[2],t[3],t[4],t[5],t[6])}else"number"==typeof e?(n=new Date,n.setTime(e)):e.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/)?(n=new Date,n.setTime(Date.parse(e))):(n=new Date,n.setTime(Date.parse(e)));return n},I18n.toTime=function(e,t){var n=this.parseDate(t),r=this.lookup(e);return n.toString().match(/invalid/i)?n.toString():r?this.strftime(n,r):n.toString()},I18n.strftime=function(e,t){var n=this.lookup("date");if(!n)return e.toString();n.meridian=n.meridian||["AM","PM"];var r=e.getDay(),s=e.getDate(),i=e.getFullYear(),a=e.getMonth()+1,o=e.getHours(),u=o,l=o>11?1:0,c=e.getSeconds(),h=e.getMinutes(),p=e.getTimezoneOffset(),f=Math.floor(Math.abs(p/60)),d=Math.abs(p)-60*f,m=(p>0?"-":"+")+(2>f.toString().length?"0"+f:f)+(2>d.toString().length?"0"+d:d);u>12?u-=12:0===u&&(u=12);var g=function(e){var t="0"+e.toString();return t.substr(t.length-2)},b=t;return b=b.replace("%a",n.abbr_day_names[r]),b=b.replace("%A",n.day_names[r]),b=b.replace("%b",n.abbr_month_names[a]),b=b.replace("%B",n.month_names[a]),b=b.replace("%d",g(s)),b=b.replace("%e",s),b=b.replace("%-d",s),b=b.replace("%H",g(o)),b=b.replace("%-H",o),b=b.replace("%I",g(u)),b=b.replace("%-I",u),b=b.replace("%m",g(a)),b=b.replace("%-m",a),b=b.replace("%M",g(h)),b=b.replace("%-M",h),b=b.replace("%p",n.meridian[l]),b=b.replace("%S",g(c)),b=b.replace("%-S",c),b=b.replace("%w",r),b=b.replace("%y",g(i)),b=b.replace("%-y",g(i).replace(/^0+/,"")),b=b.replace("%Y",i),b=b.replace("%z",m)},I18n.toNumber=function(e,t){t=this.prepareOptions(t,this.lookup("number.format"),{precision:3,separator:".",delimiter:",",strip_insignificant_zeros:!1});var n,r,s=0>e,i=Math.abs(e).toFixed(t.precision).toString(),a=i.split("."),o=[];for(e=a[0],n=a[1];e.length>0;)o.unshift(e.substr(Math.max(0,e.length-3),3)),e=e.substr(0,e.length-3);if(r=o.join(t.delimiter),t.precision>0&&(r+=t.separator+a[1]),s&&(r="-"+r),t.strip_insignificant_zeros){var u={separator:new RegExp(t.separator.replace(/\./,"\\.")+"$"),zeros:/0+$/};r=r.replace(u.zeros,"").replace(u.separator,"")}return r},I18n.toCurrency=function(e,t){return t=this.prepareOptions(t,this.lookup("number.currency.format"),this.lookup("number.format"),{unit:"$",precision:2,format:"%u%n",delimiter:",",separator:"."}),e=this.toNumber(e,t),e=t.format.replace("%u",t.unit).replace("%n",e)},I18n.toHumanSize=function(e,t){for(var n,r,s=1024,i=e,a=0;i>=s&&4>a;)i/=s,a+=1;return 0===a?(n=this.t("number.human.storage_units.units.byte",{count:i}),r=0):(n=this.t("number.human.storage_units.units."+[null,"kb","mb","gb","tb"][a]),r=0===i-Math.floor(i)?0:1),t=this.prepareOptions(t,{precision:r,format:"%n%u",delimiter:""}),e=this.toNumber(i,t),e=t.format.replace("%u",n).replace("%n",e)},I18n.toPercentage=function(e,t){return t=this.prepareOptions(t,this.lookup("number.percentage.format"),this.lookup("number.format"),{precision:3,separator:".",delimiter:""}),e=this.toNumber(e,t),e+"%"},I18n.pluralizer=function(e){return pluralizer=this.pluralizationRules[e],void 0!==pluralizer?pluralizer:this.pluralizationRules.en},I18n.findAndTranslateValidNode=function(e,t){for(i=0;e.length>i;i++)if(key=e[i],this.isValidNode(t,key))return t[key];return null},I18n.pluralize=function(e,t,n){var r;try{r=this.lookup(t,n)}catch(s){}if(!r)return this.missingTranslation(t);var i;return n=this.prepareOptions(n),n.count=e.toString(),pluralizer=this.pluralizer(this.currentLocale()),key=pluralizer(Math.abs(e)),keys="object"==typeof key&&key instanceof Array?key:[key],i=this.findAndTranslateValidNode(keys,r),null==i&&(i=this.missingTranslation(t,keys[0])),this.interpolate(i,n)},I18n.missingTranslation=function(){for(var e='[missing "'+this.currentLocale(),t=arguments.length,n=0;t>n;n++)e+="."+arguments[n];return e+='" translation]'},I18n.currentLocale=function(){return I18n.locale||I18n.defaultLocale},I18n.t=I18n.translate,I18n.l=I18n.localize,I18n.p=I18n.pluralize,I18n.translations={da:{js:{share:{topic:"del et link til dette emne",post:"del et link til dette indlæg",close:"luk"},edit:"rediger titel og kategori for dette emne",not_implemented:"Beklager, denne feature er ikke blevet implementeret endnu.",no_value:"Nej",yes_value:"Ja",of_value:"af",generic_error:"Beklager, der opstod en fejl.",log_in:"Log ind",age:"Alder",last_post:"Sidste indlæg",admin_title:"Admin",flags_title:"Flag",show_more:"vis mere",links:"Links",faq:"FAQ",you:"Dig",ok:"ok",or:"eller",now:"lige nu",suggested_topics:{title:"Foreslåede emner"},bookmarks:{not_logged_in:"Beklager, du skal være logget ind for at kunne bogmærke indlæg.",created:"Du har bogmærket dette indlæg.",not_bookmarked:"Du har læst dette indlæg; klik for at bogmærke det.",last_read:"Dette er det sidste indlæg, du har læst."},new_topics_inserted:"{{count}} nye emner.",show_new_topics:"Klik for at se.",preview:"forhåndsvising",cancel:"annulér",save:"Gem ændringer",saving:"Gemmer…",saved:"Gemt!",user_action_descriptions:{6:"Svar"},user:{profile:"Profil",title:"Bruger",mute:"Mute",edit:"Redigér indstillinger",download_archive:"download arkiv med alle mine indlæg",private_message:"Private beskeder",private_messages:"Beskeder",activity_stream:"Aktivitet",preferences:"Indstillinger",bio:"Om mig",change_password:"skift",invited_by:"Inviteret af",trust_level:"Tillidsniveau",external_links_in_new_tab:"Åbn alle eksterne links i en ny fane",enable_quoting:"Tillad citerings-svar for markeret tekst",change_username:{action:"skift",title:"Skift brugernavn",confirm:"Der kan være konsekvenser ved at skifte brugernavn. Er du sikker på at du vil skifte?",taken:"Beklager, det brugernavn er optaget.",error:"Der skete en fejl i forbindelse med skift af dit brugernavn.",invalid:"Det brugernavn er ugyldigt. Det må kun bestå af bogstaver og tal"},change_email:{action:"skift",title:"Skift e-mail-adresse",taken:"Beklager, den e-mail-adresse er optaget af en anden bruger.",error:"Der opstod en fejl i forbindelse med skift af din e-mail-adresse. Måske er adressen allerede i brug?",success:"Vi har sendt en e-mail til din nye adresse. Klik på linket i mail’en for at aktivere din nye e-mail-adresse."},email:{title:"E-mail",instructions:"Din e-mail-adresse vil aldrig blive vist offentligt.",ok:"Det ser fint ud. Vi e-mail’er dig for at bekræfte.",invalid:"Skriv venligst en gyldig e-mail-adresse.",authenticated:"Din e-mail er bekræftet af {{provider}}.",frequency:"Vi sender dig kun e-mail, hvis du ikke har været på siden for nylig, og du ikke allerede har set de ting vi ville e-mail’e dig om.."},name:{title:"Navn",instructions:"En længere udgave af dit navn; behøver ikke at være unikt. Bruges som alternativ @navn match og vises kun på din profilside.",too_short:"Dit navn er for kort.",ok:"Dit navn ser fint ud."},username:{title:"Brugernavn",instructions:"Skal være unikt og uden mellemrum. Andre brugere kan referere til dig som @brugernavn.",short_instructions:"Andre brugere kan referere til dig som @{{username}}.",available:"Brugernavnet er tilgængeligt.",global_match:"E-mail-adressen matcher det registrerede brugernavn.",global_mismatch:"Allerede registreret. Prøv {{suggestion}}?",not_available:"Ikke ledigt. Prøv {{suggestion}}?",too_short:"Dit brugernavn er for kort.",too_long:"Dit brugernavn er for langt.",checking:"Checker om brugernavnet er ledigt…",enter_email:"Brugernavn fundet. Skriv den tilhørende e-mail-adresse."},password_confirmation:{title:"Kodeord igen"},last_posted:"Sidste indlæg",last_emailed:"Sidste e-mail",last_seen:"Sidst set",created:"Oprettet",log_out:"Log ud",website:"Website",email_settings:"E-mail",email_digests:{title:"Når jeg ikke besøger sitet, send mig et e-mail-sammendrag af ny aktivitet",daily:"dagligt",weekly:"ugenligt",bi_weekly:"hver anden uge"},email_direct:"Modtag e-mail, når nogen citerer dig, svarer på dine indlæg eller nævner dit @brugernavn",email_private_messages:"Modtag e-mail, når nogen sender dig en privat besked",other_settings:"Andre",new_topic_duration:{label:"Betragt emner som nye når",not_viewed:"Jeg ikke har set dem endnu",last_here:"de er blevet oprettet efter jeg var her sidst",after_n_days:{one:"de er blevet oprettet inden for det sidste døgn",other:"de er blevet oprettet inden for de sidste {{count}} døgn"},after_n_weeks:{one:"de er blevet oprettet inden for den sidste uge",other:"de er blevet oprettet inden for de sidste {{count}} uger"}},auto_track_topics:"Følg automatisk emner jeg åbner",auto_track_options:{never:"aldrig",always:"altid",after_n_seconds:{one:"efter et sekund",other:"efter {{count}} sekunder"},after_n_minutes:{one:"efter et minut",other:"efter {{count}} minutter"}},invited:{title:"Invitationer",user:"Inviteret bruger",none:"{{username}} har ikke inviteret nogen brugere til dette site.",redeemed:"Brugte invitationer",redeemed_at:"Invitation brugt",pending:"Udestående invitationer",topics_entered:"Emner åbnet",posts_read_count:"Indlæg læst",rescind:"Fjern invitation",rescinded:"Invitation fjernet",time_read:"Læse tid",days_visited:"Besøgsdage",account_age_days:"Kontoens alder i dage"},password:{title:"Kodeord",too_short:"Dit kodeord er for kort.",ok:"Dit kodeord ser fint ud."},ip_address:{title:"Sidste IP-adresse"},avatar:{title:"Brugerbillede",instructions:"Vi bruger <a href='https://gravatar.com' target='_blank'>Gravatar</a> for brugerbilleder baseret på e-mail-adresse"},filters:{all:"Alle"},stream:{posted_by:"Skrevet af",sent_by:"Sendt af",private_message:"privat besked",the_topic:"emnet"}},loading:"Indlæser…",close:"Luk",learn_more:"Læs mere…",year:"år",year_desc:"emner oprettet inden for de sidste 365 dage",month:"måned",month_desc:"emner oprettet inden for de sidste 30 dage",week:"uge",week_desc:"emner oprettet inden for de sidste 7 dage",first_post:"Første indlæg",mute:"Mute",unmute:"Unmute",best_of:{title:"Topindlæg",description:"Der er <b>{{count}}</b> indlæg i dette emne. Det er mange! Vil du gerne spare lidt tid, ved kun at se de indlæg der har flest interaktioner og svar?",button:"Vis kun “Topindlæg”"},private_message_info:{title:"Privat samtale",invite:"Invitér andre…"},email:"E-mail",username:"Brugernavn",last_seen:"Sidst set",created:"Oprettet",trust_level:"Tillidsniveau",create_account:{title:"Opret konto",action:"Lav konto nu!",invite:"Har du ikke en konto endnu?",failed:"Noget gik galt. Måske er e-mail-adressen allerede registreret – prøv “Glemt kodeord”-linket"},forgot_password:{title:"Glemt kodeord",action:"Jeg har glemt mit kodeord",invite:"Skriv brugernavn eller e-mail-adresse, så sender vi dig en mail så du kan nulstille dit kodeord.",reset:"Nulstil kodeord",complete:"Du burde snart få en e-mail med en forklaring på hvordan du kan nulstille dit kodeord."},login:{title:"Log ind",username:"Brugernavn",password:"Kodeord",email_placeholder:"e-mail-adresse eller brugernavn",error:"Ukendt fejl",reset_password:"Nulstil kodeord",logging_in:"Logger ind…",or:"Eller",authenticating:"Logger ind…",awaiting_confirmation:"Din konto mangler at blive aktiveret. Brug “Glemt kodeord” linket for at få en ny aktiverings-mail.",awaiting_approval:"Din konto er ikke blevet godkendt af en moderator endnu. Du får en e-mail når den bliver godkendt.",not_activated:"Du kan ikke logge ind endnu. Vi har tidligere sendt en aktiverings-e-mail til dig på <b>{{sentTo}}</b>. Følg venligst instruktionerne i den e-mail for at aktivere din konto.",resend_activation_email:"Klik her for at sende aktiverings-e-mail’en igen.",sent_activation_email_again:"Vi har sendt endnu en aktiverings-e-mail til dig på <b>{{currentEmail}}</b>. Det kan tage nogen få minutter før den når frem; check også din spam-mappe.",google:{title:"med Google",message:"Logger ind med Google (check at pop-op-blokering ikke er aktiv)"},twitter:{title:"med Twitter",message:"Logger ind med Twitter (check at pop-op-blokering ikke er aktiv)"},facebook:{title:"med Facebook",message:"Logger ind med Facebook (check at pop-op-blokering ikke er aktiv)"},yahoo:{title:"med Yahoo",message:"Logger ind med Yahoo (check at pop-op-blokering ikke er aktiv)"},github:{title:"med GitHub",message:"Logger ind med GitHub (check at pop-op-blokering ikke er aktiv)"},persona:{title:"med Persona",message:"Logger ind med Mozilla Persona (check at pop-op-blokering ikke er aktiv)"}},composer:{posting_not_on_topic:'Du svarer nu på emnet "{{title}}", men du ser i øjeblikket på et andet emne.',saving_draft_tip:"gemmer",saved_draft_tip:"gemt",saved_local_draft_tip:"gemt lokalt",similar_topics:"Dit emne minder om…",drafts_offline:"kladder offline",min_length:{need_more_for_title:"{{n}} tegn mangler for titlen",need_more_for_reply:"{{n}} tegn mangler for svaret"},save_edit:"Gem ændringer",reply_original:"Svar til det oprindelige emne",reply_here:"Svar her",reply:"Svar",cancel:"Annulér",create_topic:"Opret emne",create_pm:"Opret privat besked",users_placeholder:"Tilføj bruger",title_placeholder:"Skriv din titel her. Hvad handler diskussionen om i en kort sætning?",reply_placeholder:"Skriv dit svar her. Brug Markdown eller BBCode til at formatere. Træk et billede ind for at uploade det.",view_new_post:"Se dit nye indlæg.",saving:"Gemmer…",saved:"Gemt!",saved_draft:"Du har en kladde i gang. Klik hvorsomhelst i denne kasse for at forsætte med redigering af den.",uploading:"Uploader…",show_preview:"forhåndsvisning &raquo;",hide_preview:"&laquo; skjul forhåndsvisning",bold_title:"Fed",bold_text:"fed skrift",italic_title:"Kursiv",italic_text:"kursiv skrift",link_title:"Link",link_description:"skriv beskrivelse af linket her",link_dialog_title:"Indsæt link",link_optional_text:"evt. titel",quote_title:"Citatblok",quote_text:"Citatblok",code_title:"Programkode",code_text:"skriv programkode her",image_title:"Billede",image_description:"skriv billedets beskrivelse her",image_dialog_title:"Indsæt billede",image_optional_text:"evt. titel",image_hosting_hint:"Brug for <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>gratis billed hosting?</a>",olist_title:"Numereret liste",ulist_title:"Punktopstilling",list_item:"Listepunkt",heading_title:"Overskrift",heading_text:"Overskrift",hr_title:"Vandret streg",undo_title:"Fortryd",redo_title:"Gentag",help:"Markdown redigeringshjælp"},notifications:{title:"notifikation ved @navns nævnelse, svar til dine indlæg og emner, private beskeder, mv.",none:"Du har ikke nogen notifikationer lige nu.",more:"se ændre notifikationer",mentioned:"<span title='mentioned' class='icon'>@</span> {{username}} {{link}}",quoted:"<i title='quoted' class='icon icon-quote-right'></i> {{username}} {{link}}",replied:"<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}",posted:"<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}",edited:"<i title='edited' class='icon icon-pencil'></i> {{username}} {{link}}",liked:"<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}",private_message:"<i class='icon icon-lock' title='private message'></i> {{username}} har sendt dig en privat besked: {{link}}",invited_to_private_message:"{{username}} har inviteret dig til en privat samtale: {{link}}",invitee_accepted:"<i title='accepted your invitation' class='icon icon-signin'></i> {{username}} har accepteret din invitation",moved_post:"<i title='moved post' class='icon icon-arrow-right'></i> {{username}} flyttede indlæg til {{link}}"},image_selector:{title:"Indsæt billede",from_my_computer:"Fra min computer",from_the_web:"Fra nettet",add_image:"Indsæt billede",remote_tip:"skriv adressen på et billede i formen http://example.com/billede.jpg",local_tip:"klik for at vælge et billede fra din computer.",upload:"Upload",uploading_image:"Uploader billede"},search:{title:"søg efter emner, indlæg, brugere eller kategorier",placeholder:"skriv søgeord her",no_results:"Ingen resultater fundet.",searching:"Søger…"},site_map:"gå til en anden emneoversigt eller kategori",go_back:"gå tilbage",current_user:"gå til brugerside",favorite:{title:"Favorit",help:"tilføj dette emne til din favorit-liste"},topics:{none:{favorited:"Du har ikke nogen favorit-emner endnu. For at gøre et emne til favorit, tryk på stjernen ved siden af emnets titel.",unread:"Du har ingen ulæste emner.","new":"Du har ingen nye emner.",read:"Du har ikke læst nogen emner endnu.",posted:"Du har ikke skrevet nogen indlæg endnu.",latest:"Der er ikke nogen populære emner. Det er sørgeligt.",category:"Der er ingen emner i kategorien {{category}}."},bottom:{latest:"Der er ikke flere populære emner.",posted:"Der er ikke flere emner.",read:"Der er ikke flere læste emner.","new":"Der er ikke flere nye emner.",unread:"Der er ikke flere ulæste emner.",favorited:"Der er ikke flere favorit-emner.",category:"Der er ikke flere emner i kategorien {{category}}."}},topic:{create_in:"Opret emne i kategorien {{categoryName}}",create:"Opret emne",create_long:"Opret et nyt emne i debatten",private_message:"Start en privat samtale",list:"Emner","new":"nye emner",title:"Emne",loading_more:"Indlæser flere emner…",loading:"Indlæser emne…",invalid_access:{title:"Emnet er privat",description:"Beklager, du har ikke adgang til dette emne!"},server_error:{title:"Emnet kunne ikke indlæses",description:"Beklager, vi kunne ikke indlæse det emne, muligvis grundet et problem med netværksforbindelsen. Prøv venligst igen. Hvis problemet fortæstter, så skriv venligst til os."},not_found:{title:"Emnet findes ikke",description:"Beklager, vi kunne ikke finde det emne i databasen. Måske er det blevet fjernet af moderator?"},unread_posts:"der er {{unread}} indlæg du ikke har læst i dette emne",new_posts:"der er kommet {{new_posts}} nye indlæg i dette emne siden du læste det sidst",likes:{one:"der er en “Synes godt om” i dette emne",other:"der er {{count}} “Synes godt om” i dette emne"},back_to_list:"Tilbage til emneoversigt",options:"Emneindstillinger",show_links:"vis links i dette emne",toggle_information:"vis detaljer om emnet",read_more_in_category:"Mere læsestof? Se andre emner i {{catLink}} eller {{latestLink}}.",read_more:"Mere læsestof? {{catLink}} else {{latestLink}}.",browse_all_categories:"Vis alle kategorier",view_latest_topics:"vis populære emner",suggest_create_topic:"Hvorfor ikke oprette et emne?",read_position_reset:"Din læseposition er blevet nulstillet.",jump_reply_up:"hop til tidligere svar",jump_reply_down:"hop til senere svar",progress:{title:"emnestatus",jump_top:"hop til første indlæg",jump_bottom:"hop til sidste indlæg",total:"antal indlæg",current:"nuværende indlæg"},notifications:{title:"",reasons:{"3_2":"Du får notifikationer fordi du overvåger dette emne.","3_1":"Du får notifikationer fordi du oprettede dette emne.",3:"Du får notifikationer fordi du overvåger dette emne.","2_4":"Du får notifikationer fordi du har besvaret dette emne.","2_2":"Du får notifikationer fordi du følger dette emne.",2:'Du får notifikationer fordi du <a href="/users/{{username}}/preferences">har læst dette emne</a>.',1:"Du får kun notifikationer hvis nogen nævner dit @navn eller svarer på dit indlæg.","1_2":"Du får kun notifikationer hvis nogen nævner dit @navn eller svarer på dit indlæg.",0:"Du får ingen notifikationer for dette emne.","0_2":"Du får ingen notifikationer for dette emne."},watching:{title:"Overvåger",description:"samme som Følger, plus at du får besked om alle nye indlæg."},tracking:{title:"Følger",description:"du får besked om ulæste indlæg, @navns nævnelse og svar til dine indlæg."},regular:{title:"Standard",description:"du får kun besked hvis nogen nævner dit @navn eller svarer på dit indlæg."},muted:{title:"Stille!",description:"du får ikke besked om nogen hændelser i dette emne, og det vil ikke fremgå af din liste over ulæste emner."}},actions:{"delete":"Slet emne",open:"Åbn emne",close:"Luk emne",unpin:"Un-Pin Topic",pin:"Pin Topic",unarchive:"Unarchive Topic",archive:"Arkivér emne",invisible:"Gør usynlig",visible:"Gør synlig",reset_read:"Glem hvilke emner jeg har læst",multi_select:"Toggle Multi-Select",convert_to_topic:"Konvertér til normalt emne"},reply:{title:"Svar",help:"begynd at skrive et svar til dette emne"},clear_pin:{title:"Clear pin",help:"Clear the pinned status of this topic so it no longer appears at the top of your topic list"},share:{title:"Del",help:"del et link til dette emne"},inviting:"Inviterer…",invite_private:{title:"Invitér til privat samtale",email_or_username:"Inviteret brugers e-mail eller brugernavn",email_or_username_placeholder:"e-mail-adresse eller brugernavn",action:"Invitér",success:"Tak! Vi har inviteret den bruger til at deltage i din private samtale.",error:"Beklager, der skete en fejl, da vi forsøgte at invitere den bruger."},invite_reply:{title:"Invitér venner til at svare",help:"send invitationer til dine venner, så de kan svare på dette indlæg med et enkelt klik",email:"Vi sender din ven en kort e-mail, som giver dem mulighed for at svare på dette emne med ved at klikke på et link.",email_placeholder:"e-mail-adresse",success:"Tak! Vi har sendt en invitation til <b>{{email}}</b>. Du får besked, når de bruger din invitation. Check invitations-fanen på din brugerside, for at følge med i hvem du har inviteret.",error:"Beklager, vi kunne ikke invitere den person. Måske er de allerede brugere?"},login_reply:"Log ind for at svare",filters:{user:"Du ser kun endlæg fra specifikke brugere.",best_of:"Du ser kun “Topindlæg”.",cancel:"Se alle indlæg i emnet."},move_selected:{title:"Flyt valgte indlæg",topic_name:"Ny emnetitel:",error:"Sorry, there was an error moving those posts.",instructions:{one:"Du laver nu et nyt emne med det valgte indlæg.",other:"Du laver nu et nyt emne med de <b>{{count}}</b> valgte indlæg."}},multi_select:{select:"vælg",selected:"valgt ({{count}})","delete":"slet valgte",cancel:"glem valg",move:"flyt valgte",description:{one:"Du har valgt <b>1</b> indlæg.",other:"Du har valgt <b>{{count}}</b> indlæg."}}},post:{reply:"Svar til {{link}} af {{replyAvatar}} {{username}}",reply_topic:"Svar til {{link}}",quote_reply:"citér svar",edit:"Redigerer {{link}} af {{replyAvatar}} {{username}}",post_number:"indlæg {{number}}",in_reply_to:"som svar til",reply_as_new_topic:"Svar som nyt emne",continue_discussion:"Fortsætter debatten fra {{postLink}}:",follow_quote:"gå til det citerede indlæg",deleted_by_author:"(indlæg slettet af forfatter)",has_replies:{one:"Svar",other:"Svar"},errors:{create:"Sorry, there was an error creating your post. Please try again.",edit:"Sorry, there was an error editing your post. Please try again.",upload:"Sorry, there was an error uploading that file. Please try again."},abandon:"Er du sikker på at du vil droppe dit indlæg?",archetypes:{save:"Gem indstillinger"},controls:{reply:"begynd at et svar på dette indlæg",like:"synes godt om dette indlæg",edit:"redigér dette indlæg",flag:"gør moderators opmærksomh på dette indlæg","delete":"slet dette indlæg",undelete:"annulér sletning",share:"del et link til dette indlæg",bookmark:"bogmærk dette indlæg til din brugerside",more:"Mere"},actions:{flag:"Flag",clear_flags:{one:"Fjern flag",other:"Fjern flags"},it_too:"{{alsoName}} det også",undo:"Fortryd {{alsoName}}",by_you_and_others:{zero:"Du {{long_form}}",one:"Du og en anden {{long_form}}",other:"Du og {{count}} andre {{long_form}}"},by_others:{one:"En person {{long_form}}",other:"{{count}} personer {{long_form}}"}},edits:{one:"en ændring",other:"{{count}} ændringer",zero:"ingen ændringer"},"delete":{confirm:{one:"Er du sikker på at du vil slette indlægget?",other:"Er du sikker på at du vil slette alle de indlæg?"}}},category:{none:"(ingen kategori)",edit:"redigér",edit_long:"Redigér kategori",view:"Vis emner i kategori","delete":"Slet kategori",create:"Ny kategori",creation_error:"There has been an error during the creation of the category.",more_posts:"se alle {{posts}}…",name:"Kategorinavn",description:"Beskrivelse",topic:"kategoriemne",badge_colors:"Mærkefarver",background_color:"Baggrundsfarve",foreground_color:"Tekstfarve",name_placeholder:"Bør være kort og kontant.",color_placeholder:"En web-farve",delete_confirm:"Er du sikker på at du vil slette den kategori?",list:"Kategoriliste",no_description:"Der er ingen beskrivelse for denne kategori.",change_in_category_topic:"besøg kategoriemnet for at redigere beskrivelsen"},flagging:{title:"Why are you flagging this post?",action:"Flag Post",cant:"Sorry, you can't flag this post at this time.",custom_placeholder:"Why does this post require moderator attention? Let us know specifically what you are concerned about, and provide relevant links where possible.",custom_message:{at_least:"enter at least {{n}} characters",more:"{{n}} to go...",left:"{{n}} remaining"}},topic_summary:{title:"Topic Summary",links_shown:"show all {{totalLinks}} links..."},topic_statuses:{locked:{help:"emnet er låst; det modtager ikke flere svar"},pinned:{help:"this topic is pinned; it will display at the top of its category"},archived:{help:"emnet er arkiveret; det er frosset og kan ikke ændres"},invisible:{help:"emnet er usynligt; det vises ikke på lister og kan kun tilgåes med et direkte link"}},posts:"Indlæg",posts_long:"{{number}} indlæg i dette emne",original_post:"Oprindeligt indlæg",views:"Visninger",replies:"Svar",views_long:"dette emne er blevet vist {{number}} gange",activity:"Aktivitet",likes:"Synes godt om",top_contributors:"Deltagere",category_title:"Kategori",history:"Historik",changed_by:"af {{author}}",categories_list:"Kategorioversigt",filters:{latest:{title:"Populære",help:"de mest populære nyere emner"},favorited:{title:"Favoritter",help:"emner du har markeret som favoritter"},read:{title:"Læste",help:"emner du har læst"},categories:{title:"Kategorier",title_in:"Kategori - {{categoryName}}",help:"alle emner grupperet efter kategori"},unread:{title:{zero:"Ulæst",one:"Ulæst (1)",other:"Ulæst ({{count}})"},help:"emner du følger med i med ulæste indlæg"},"new":{title:{zero:"Nye",one:"Ny (1)",other:"Nye ({{count}})"},help:"nye emner siden dit sidste besøg, og emner du følger med i med nye indlæg"},posted:{title:"Mine indlæg",help:"emner du har skrevet indlæg i"},category:{title:{zero:"{{categoryName}}",one:"{{categoryName}} (1)",other:"{{categoryName}} ({{count}})"},help:"populære emner i kategorien {{categoryName}}"}},type_to_filter:"type to filter...",admin:{title:"Discourse Admin",dashboard:{title:"Dashboard",version:"Installed version",up_to_date:"You are running the latest version of Discourse.",critical_available:"A critical update is available.",updates_available:"Updates are available.",please_upgrade:"Please upgrade!",latest_version:"Latest version",total_users:"Total Users",moderator_short:"mod",reports:{today:"Today",yesterday:"Yesterday",last_7_days:"Last 7 Days",last_30_days:"Last 30 Days",all_time:"All Time","7_days_ago":"7 Days Ago","30_days_ago":"30 Days Ago"}},commits:{latest_changes:"Latest changes: please update often!",by:"by"},flags:{title:"Flags",old:"Old",active:"Active",clear:"Clear Flags",clear_title:"dismiss all flags on this post (will unhide hidden posts)","delete":"Delete Post",delete_title:"delete post (if its the first post delete topic)",flagged_by:"Flagged by",error:"Something went wrong"},customize:{title:"Customize",header:"Header",css:"Stylesheet",override_default:"Do not include standard style sheet",enabled:"Enabled?",preview:"preview",undo_preview:"undo preview",save:"Save","new":"New",new_style:"New Style","delete":"Delete",delete_confirm:"Delete this customization?"},email_logs:{title:"Email Logs",sent_at:"Sent At",email_type:"Email Type",to_address:"To Address",test_email_address:"email address to test",send_test:"send test email",sent_test:"sent!"},impersonate:{title:"Impersonate User",username_or_email:"Username or Email of User",help:"Use this tool to impersonate a user account for debugging purposes.",not_found:"That user can't be found.",invalid:"Sorry, you may not impersonate that user."},users:{title:"Users",create:"Add Admin User",last_emailed:"Last Emailed",not_found:"Sorry that username doesn't exist in our system.","new":"New",active:"Active",pending:"Pending",approved:"Approved?",approved_selected:{one:"approve user",other:"approve users ({{count}})"}},user:{ban_failed:"Something went wrong banning this user {{error}}",unban_failed:"Something went wrong unbanning this user {{error}}",ban_duration:"How long would you like to ban the user for? (days)",delete_all_posts:"Delete all posts",ban:"Ban",unban:"Unban",banned:"Banned?",moderator:"Moderator?",admin:"Admin?",show_admin_profile:"Admin",refresh_browsers:"Force browser refresh",show_public_profile:"Show Public Profile",impersonate:"Impersonate",revoke_admin:"Revoke Admin",grant_admin:"Grant Admin",revoke_moderation:"Revoke Moderation",grant_moderation:"Grant Moderation",reputation:"Reputation",permissions:"Permissions",activity:"Activity",like_count:"Likes Received",private_topics_count:"Private Topics Count",posts_read_count:"Posts Read",post_count:"Posts Created",topics_entered:"Topics Entered",flags_given_count:"Flags Given",flags_received_count:"Flags Received",approve:"Approve",approved_by:"approved by",time_read:"Read Time"},site_settings:{show_overriden:"Only show overridden",title:"Site Settings",reset:"reset to default"}}}}},I18n.locale="da";