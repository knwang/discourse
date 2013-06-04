Array.prototype.indexOf||(Array.prototype.indexOf=function(e){"use strict";if(void 0===this||null===this)throw new TypeError;var t=Object(this),n=t.length>>>0;if(0===n)return-1;var r=0;if(arguments.length>0&&(r=Number(arguments[1]),r!==r?r=0:0!==r&&1/0!==r&&r!==-1/0&&(r=(r>0||-1)*Math.floor(Math.abs(r)))),r>=n)return-1;for(var s=r>=0?r:Math.max(n-Math.abs(r),0);n>s;s++)if(s in t&&t[s]===e)return s;return-1});var I18n=I18n||{};I18n.defaultLocale="en",I18n.fallbacks=!1,I18n.defaultSeparator=".",I18n.locale=null,I18n.PLACEHOLDER=/(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,I18n.fallbackRules={},I18n.pluralizationRules={en:function(e){return 0==e?["zero","none","other"]:1==e?"one":"other"}},I18n.getFallbacks=function(e){if(e===I18n.defaultLocale)return[];if(!I18n.fallbackRules[e]){for(var t=[],n=e.split("-"),r=1;n.length>r;r++)t.push(n.slice(0,r).join("-"));t.push(I18n.defaultLocale),I18n.fallbackRules[e]=t}return I18n.fallbackRules[e]},I18n.isValidNode=function(e,t,n){return null!==e[t]&&e[t]!==n},I18n.lookup=function(e,t){var n,t=t||{},r=e,s=this.prepareOptions(I18n.translations),i=t.locale||I18n.currentLocale(),a=s[i]||{},t=this.prepareOptions(t);for("object"==typeof e&&(e=e.join(this.defaultSeparator)),t.scope&&(e=t.scope.toString()+this.defaultSeparator+e),e=e.split(this.defaultSeparator);a&&e.length>0;)n=e.shift(),a=a[n];if(!a){if(I18n.fallbacks)for(var o=this.getFallbacks(i),l=0;o.length>l&&!(a=I18n.lookup(r,this.prepareOptions({locale:o[l]},t)));o++);!a&&this.isValidNode(t,"defaultValue")&&(a=t.defaultValue)}return a},I18n.prepareOptions=function(){for(var e,t={},n=arguments.length,r=0;n>r;r++)if(e=arguments[r])for(var s in e)this.isValidNode(t,s)||(t[s]=e[s]);return t},I18n.interpolate=function(e,t){t=this.prepareOptions(t);var n,r,s,i=e.match(this.PLACEHOLDER);if(!i)return e;for(var a=0;n=i[a];a++)s=n.replace(this.PLACEHOLDER,"$1"),r=t[s],this.isValidNode(t,s)||(r="[missing "+n+" value]"),regex=new RegExp(n.replace(/\{/gm,"\\{").replace(/\}/gm,"\\}")),e=e.replace(regex,r);return e},I18n.translate=function(e,t){t=this.prepareOptions(t);var n=this.lookup(e,t);try{return"object"==typeof n?"number"==typeof t.count?this.pluralize(t.count,e,t):n:this.interpolate(n,t)}catch(r){return this.missingTranslation(e)}},I18n.localize=function(e,t){switch(e){case"currency":return this.toCurrency(t);case"number":return e=this.lookup("number.format"),this.toNumber(t,e);case"percentage":return this.toPercentage(t);default:return e.match(/^(date|time)/)?this.toTime(e,t):t.toString()}},I18n.parseDate=function(e){var t,n;if("object"==typeof e)return e;if(t=e.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?(Z|\+0000)?/)){for(var r=1;6>=r;r++)t[r]=parseInt(t[r],10)||0;t[2]-=1,n=t[7]?new Date(Date.UTC(t[1],t[2],t[3],t[4],t[5],t[6])):new Date(t[1],t[2],t[3],t[4],t[5],t[6])}else"number"==typeof e?(n=new Date,n.setTime(e)):e.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/)?(n=new Date,n.setTime(Date.parse(e))):(n=new Date,n.setTime(Date.parse(e)));return n},I18n.toTime=function(e,t){var n=this.parseDate(t),r=this.lookup(e);return n.toString().match(/invalid/i)?n.toString():r?this.strftime(n,r):n.toString()},I18n.strftime=function(e,t){var n=this.lookup("date");if(!n)return e.toString();n.meridian=n.meridian||["AM","PM"];var r=e.getDay(),s=e.getDate(),i=e.getFullYear(),a=e.getMonth()+1,o=e.getHours(),l=o,u=o>11?1:0,c=e.getSeconds(),h=e.getMinutes(),p=e.getTimezoneOffset(),d=Math.floor(Math.abs(p/60)),f=Math.abs(p)-60*d,m=(p>0?"-":"+")+(2>d.toString().length?"0"+d:d)+(2>f.toString().length?"0"+f:f);l>12?l-=12:0===l&&(l=12);var g=function(e){var t="0"+e.toString();return t.substr(t.length-2)},b=t;return b=b.replace("%a",n.abbr_day_names[r]),b=b.replace("%A",n.day_names[r]),b=b.replace("%b",n.abbr_month_names[a]),b=b.replace("%B",n.month_names[a]),b=b.replace("%d",g(s)),b=b.replace("%e",s),b=b.replace("%-d",s),b=b.replace("%H",g(o)),b=b.replace("%-H",o),b=b.replace("%I",g(l)),b=b.replace("%-I",l),b=b.replace("%m",g(a)),b=b.replace("%-m",a),b=b.replace("%M",g(h)),b=b.replace("%-M",h),b=b.replace("%p",n.meridian[u]),b=b.replace("%S",g(c)),b=b.replace("%-S",c),b=b.replace("%w",r),b=b.replace("%y",g(i)),b=b.replace("%-y",g(i).replace(/^0+/,"")),b=b.replace("%Y",i),b=b.replace("%z",m)},I18n.toNumber=function(e,t){t=this.prepareOptions(t,this.lookup("number.format"),{precision:3,separator:".",delimiter:",",strip_insignificant_zeros:!1});var n,r,s=0>e,i=Math.abs(e).toFixed(t.precision).toString(),a=i.split("."),o=[];for(e=a[0],n=a[1];e.length>0;)o.unshift(e.substr(Math.max(0,e.length-3),3)),e=e.substr(0,e.length-3);if(r=o.join(t.delimiter),t.precision>0&&(r+=t.separator+a[1]),s&&(r="-"+r),t.strip_insignificant_zeros){var l={separator:new RegExp(t.separator.replace(/\./,"\\.")+"$"),zeros:/0+$/};r=r.replace(l.zeros,"").replace(l.separator,"")}return r},I18n.toCurrency=function(e,t){return t=this.prepareOptions(t,this.lookup("number.currency.format"),this.lookup("number.format"),{unit:"$",precision:2,format:"%u%n",delimiter:",",separator:"."}),e=this.toNumber(e,t),e=t.format.replace("%u",t.unit).replace("%n",e)},I18n.toHumanSize=function(e,t){for(var n,r,s=1024,i=e,a=0;i>=s&&4>a;)i/=s,a+=1;return 0===a?(n=this.t("number.human.storage_units.units.byte",{count:i}),r=0):(n=this.t("number.human.storage_units.units."+[null,"kb","mb","gb","tb"][a]),r=0===i-Math.floor(i)?0:1),t=this.prepareOptions(t,{precision:r,format:"%n%u",delimiter:""}),e=this.toNumber(i,t),e=t.format.replace("%u",n).replace("%n",e)},I18n.toPercentage=function(e,t){return t=this.prepareOptions(t,this.lookup("number.percentage.format"),this.lookup("number.format"),{precision:3,separator:".",delimiter:""}),e=this.toNumber(e,t),e+"%"},I18n.pluralizer=function(e){return pluralizer=this.pluralizationRules[e],void 0!==pluralizer?pluralizer:this.pluralizationRules.en},I18n.findAndTranslateValidNode=function(e,t){for(i=0;e.length>i;i++)if(key=e[i],this.isValidNode(t,key))return t[key];return null},I18n.pluralize=function(e,t,n){var r;try{r=this.lookup(t,n)}catch(s){}if(!r)return this.missingTranslation(t);var i;return n=this.prepareOptions(n),n.count=e.toString(),pluralizer=this.pluralizer(this.currentLocale()),key=pluralizer(Math.abs(e)),keys="object"==typeof key&&key instanceof Array?key:[key],i=this.findAndTranslateValidNode(keys,r),null==i&&(i=this.missingTranslation(t,keys[0])),this.interpolate(i,n)},I18n.missingTranslation=function(){for(var e='[missing "'+this.currentLocale(),t=arguments.length,n=0;t>n;n++)e+="."+arguments[n];return e+='" translation]'},I18n.currentLocale=function(){return I18n.locale||I18n.defaultLocale},I18n.t=I18n.translate,I18n.l=I18n.localize,I18n.p=I18n.pluralize,MessageFormat={locale:{}},MessageFormat.locale.pt=function(e){return 1===e?"one":"other"},I18n.messageFormat=function(e){var t=e;return function(e,n){var r=t[e];if(!r)return"Missing Key: "+e;try{return r(n)}catch(s){return s.message}return t[e](n)}}({}),I18n.translations={pt:{js:{share:{topic:"partilhe um link para este tópico",post:"partilhe um link para esta mensagem"},edit:"edite o título ou a categoria deste tópico",not_implemented:"Essa característica ainda não foi implementada, desculpe!",no_value:"Não",yes_value:"Sim",of_value:"de",generic_error:"Pedimos desculpa, ocorreu um erro.",log_in:"Log In",age:"Idade",last_post:"Último post",admin_title:"Admin",flags_title:"Flags",show_more:"mostrar mais",links:"Links",faq:"FAQ",you:"Você",ok:"ok",suggested_topics:{title:"Tópicos Sugeridos"},bookmarks:{not_logged_in:"Desculpe, tem de estar ligado para fazer o bookmark destas mensagens.",created:"Você fez o bookmark desta mensagem.",not_bookmarked:"Você leu esta mensagem; clique para fazer o bookmark dela.",last_read:"Esta é a última mensagem que você leu."},new_topics_inserted:"{{count}} novos tópicos.",show_new_topics:"Clque para mostrar.",preview:"prever",cancel:"cancelar",save:"Guardar Alterações",saving:"Guardando...",saved:"Guardado!",user_action_descriptions:{6:"Respostas"},user:{profile:"Perfil",title:"Utilizador",mute:"Silenciar",edit:"Editar Preferências",download_archive:"fazer o download do arquivo das minhas mensagens",private_message:"Mensagem Privada",private_messages:"Mensagens",activity_stream:"Actividade",preferences:"Preferências",bio:"Sobre mim",change_password:"alterar",invited_by:"Convidado Por",trust_level:"Nível de Confiança",change_username:{action:"alterar",title:"Alterar Nome de Utilizador",confirm:"Poderá haver consequências ao alterar o nome de utilizador. Tens a certeza que o queres fazer?",taken:"Desculpa, esse nome de utilizador já está a ser usado",error:"Houve um erro ao alterar o teu nome de utilizador",invalid:"Esse nome de utilizador é inválido. Tem que conter apenas números e letras"},change_email:{action:"alterar",title:"Alterar Email",taken:"Desculpa, esse email não é válido",error:"Houve um erro ao alterar o email. Talvez já esteja a ser utilizado?",success:"Enviamos um email para esse endereço. Por favor segue as instruções de confirmação"},email:{title:"Email",instructions:"O teu email nunca vai ser visível publicamente",ok:"Parace estár bem. Vamos enviar-te um email para confirmar",invalid:"Por favor introduz um endereço de email válido",authenticated:"O teu email foi autenticado por {{provider}}.",frequency:"Vamos apenas enviar-te emails quando não te virmos à algum tempo e tu não tiveres visto as coisas que te temos enviado"},name:{title:"Nome",instructions:"O teu nome completo; não precisa de ser único.",too_short:"O teu nome é demasiado curto",ok:"O teu nome parece estar bem"},username:{title:"Nome de Utilizador",instructions:"As pessoas podem mencionar-te como @{{username}}.",available:"O teu nome de utilizador está disponível.",global_match:"O email corresponde ao nome de utilizador registado.",global_mismatch:"Já está registado. Tenta {{suggestion}}?",not_available:"Não está disponível. Tenta {{suggestion}}?",too_short:"O teu nome de utilizador é demasiado curto.",too_long:"O teu nome de utilizador é demasiado comprido.",checking:"A verificar disponibilidade do nome de utilizador...",enter_email:"Nome de utilizador encontrado. Intruduz o email referente."},last_posted:"Último Post",last_emailed:"Último Email",last_seen:"Última vez visto",created:"Criado a",log_out:"Log Out",website:"Web Site",email_settings:"Email",email_digests:{title:"Quando não visito o site, enviar-me um email com um resumo do que é novo",daily:"diariamente",weekly:"semanalmente",bi_weekly:"duas em duas semanas"},email_direct:"Receber um email quando alguém te cita, responde aos teus posts, ou menciona o teu @nome_de_utilizador",email_private_messages:"Recebe um email quando alguém te envia uma mensagem privada",other_settings:"Outros",new_topic_duration:{label:"Considerar tópicos como novos quando",not_viewed:"Não os vi ainda",last_here:"foram postados desde a última vez que estive lá",after_n_days:{one:"foram postados no último dia",other:"foram postados nos últimos {{count}} dias"},after_n_weeks:{one:"foram postados na última semana",other:"foram postados nas últimas {{count}} semanas"}},auto_track_topics:"Automaticamente vigiar os tópicos em que eu entro",auto_track_options:{never:"nunca",always:"sempre",after_n_seconds:{one:"passado 1 segundo",other:"passado {{count}} segundos"},after_n_minutes:{one:"passado 1 minuto",other:"passado {{count}} minutos"}},invited:{title:"Convites",user:"Utilizadores convidados",none:"{{username}} ainda não convidou ninguém para o site.",redeemed:"Convites usados",redeemed_at:"Usado em",pending:"Convites Pendentes",topics_entered:"Tópicos em que entrou",posts_read_count:"Posts Vistos",rescind:"Remover Convite",rescinded:"Convite Removido",time_read:"Tempo de Leitura",days_visited:"Dias Visitados",account_age_days:"Idade da conta em dias"},password:{title:"Password",too_short:"A tua password é demasiado curta.",ok:"A tua password parece estár ok."},ip_address:{title:"Último endereço IP"},avatar:{title:"Avatar",instructions:"Nós utilizamos <a href='https://gravatar.com' target='_blank'>Gravatar</a> para os avatares baseados no teu email"},filters:{all:"Todos"},stream:{posted_by:"Postado por",sent_by:"Enviado por",private_message:"mansagem privada",the_topic:"o tópico"}},loading:"A Carregar...",close:"Fechar",learn_more:"sabe mais...",year:"ano",year_desc:"tópicos postados nos últimos 365 dias",month:"mês",month_desc:"tópicos postados nos últimos 30 dias",week:"semana",week_desc:"tópicos postados nos últimos 7 dias",first_post:"Primeiro post",mute:"Silenciar",unmute:"Reativar",best_of:{title:"Melhor De",description:"Há <b>{{count}}</b> posts neste tópico. Isso é muito! Gostarias de poupar tempo alterando a vista para mostrar apenas os posts com mais interações e respostas?",button:'Alterar para a vista "Melhor De"'},private_message_info:{title:"Conversas Privadas",invite:"Convidar Outros..."},email:"Email",username:"Username",last_seen:"Visto pela última vez",created:"Criado",trust_level:"Nível de confiança",create_account:{title:"Criar Conta",action:"Criar uma agora!",invite:"Ainda sem conta?",failed:"Alguma coisa correu mal, talvez este email já esteja registado, tenta o link para password esquecida."},forgot_password:{title:"Esqueci a Password",action:"Esqueci-me da minha password",invite:"Insere o teu nome de utilizador ou endereço de email, e nós enviamos-te um email para repor a password.",reset:"Repor Password",complete:"Deverás receber um email com instruções de como repor a tua password em breve."},login:{title:"Log In",username:"Login",password:"Password",email_placeholder:"endereço de email ou nome de utilizador",error:"Erro desconhecido",reset_password:"Repor Password",logging_in:"A fazer Log In...",or:"Ou",authenticating:"A auntenticar...",awaiting_confirmation:"A tua conta está à espera de ativação, utiliza o link 'esqueci a password' para pedir um novo link para ativar o email",awaiting_approval:"A tua conta ainda não foi aprovada por um moderador. Vais recever um email quando estiver aprovada.",google:{title:"Log In com Google",message:"A autenticar com Google (garante que os bloqueadores de pop-ups não está ativos)"},twitter:{title:"Log In com Twitter",message:"A autenticar com Twitter (garante que os bloqueadores de pop-ups não está ativos)"},facebook:{title:"Log In com Facebook",message:"A autenticar com Facebook (garante que os bloqueadores de pop-ups não está ativos)"},yahoo:{title:"Log In com Yahoo",message:"A autenticar com Yahoo (garante que os bloqueadores de pop-ups não está ativos)"}},composer:{saving_draft_tip:"a guardar",saved_draft_tip:"guardado",saved_local_draft_tip:"guardado localmente",min_length:{at_least:"insere pelo menos {{n}} caracteres",more:"{{n}} to go..."},save_edit:"Guardar Edição",reply:"Responder",create_topic:"Criar um Tópico",create_pm:"Criar uma Mensagem Privada",users_placeholder:"Adicionar um utilizador",title_placeholder:"Escreve o teu título aqui. O que é esta discução sobre numa pequena frase?",reply_placeholder:"Escreve a tua resposta aqui. Utiliza Markdown ou BBCode para formatar. Arrasta ou cola aqui uma imagem para a enviar.",view_new_post:"Ver os teus novos posts.",saving:"A guardar...",saved:"Guardado!",saved_draft:"Tens um rascunho de um post em progresso. Clica em qualquer sitio nesta caixa para continuar a edição.",uploading:"A enviar...",show_preview:"mostrar pré-visualização &raquo;",hide_preview:"&laquo; esconder pré-visualização"},notifications:{title:"notificações de mencionamento de @nome, respostas aos teus posts e tópicos, mensagens privadas, etc",none:"Não tens notifcações neste momento..",more:"ver notificações antigas",mentioned:"<span title='mentioned' class='icon'>@</span> {{username}} {{link}}",quoted:"<i title='quoted' class='icon icon-quote-right'></i> {{username}} {{link}}",replied:"<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}",posted:"<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}",edited:"<i title='edited' class='icon icon-pencil'></i> {{username}} {{link}}",liked:"<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}",private_message:"<i class='icon icon-envelope-alt' title='private message'></i> {{username}} enviou-te uma mensagem privada: {{link}}",invited_to_private_message:"{{username}} convidou-te para uma conversa privada: {{link}}",invitee_accepted:"<i title='accepted your invitation' class='icon icon-signin'></i> {{username}} aceitou o teu convite",moved_post:"<i title='moved post' class='icon icon-arrow-right'></i> {{username}} moveu o post para {{link}}"},image_selector:{from_my_computer:"Do meu dispositivo",from_the_web:"Da internet",add_image:"Adicionar Imagem",remote_tip:"insere o endereço de uma imagem no formato http://example.com/image.jpg",local_tip:"clica para selecionar uma imagem no teu dispositivo.",upload:"Enviar",uploading_image:"A enviar imagem"},search:{title:"procurar por tópicos, posts, utilizadores, ou categorias",placeholder:"escreve aqui o teu termo de buscar",no_results:"Não foi encontrado nenhum resultado.",searching:"A procurar ..."},site_map:"ir para outra lista de tópicos ou categorias",go_back:"voltar atrás",current_user:"ir para a tua página de utilizador",favorite:{title:"Favorito",help:"adicionar este tópico à tua lista de favoritos"},topics:{no_favorited:"Ainda não marcaste nenhum tópico como favorito. Para marcar um tópico como favorito, clica na estrela à beira do título.",no_unread:"Não tens tópicos ainda não lidos para ler.",no_new:"Não tens novos tópicos para ler.",no_read:"Ainda não leste nenhum tópico.",no_posted:"Ainda não postaste em nenhum tópico.",no_latest:"Não há tópicos populares. Isso é triste.",footer:'Não há mais tópicos neste categoria. <a href="/categories">Procurar todas as categorias</a> ou <a href="/">ver tópicos populares</a>'},topic:{create_in:"Criar Tópico sobre {{categoryName}}",create:"Criar Tópico",create_long:"Criar um novo Tópico",private_message:"Começar uma nova conversa privada",list:"Tópicos","new":"novo tópico",title:"Tópico",loading_more:"A carregar mais tópicos...",loading:"A carregar tópico...",missing:"Tópico não encontrado",not_found:{title:"Tópico não encontrado",description:"Desculpa, não podemos encontrar esse tópico. Talvez tenha sido apagado?"},unread_posts:"tens {{unread}} posts antigos não lidos neste tópico",new_posts:"há {{new_posts}} novos posts neste tópico desde a última vez que o leste",likes:"há {{likes}} gostos neste tópico",back_to_list:"Voltar à lista dos Tópicos",options:"Opções do Tópico",show_links:"mostrar links dentro deste post",toggle_information:"alternar detalhes do tópico",read_more_in_category:"Queres ler mais? Procura outros tópicos em {{catLink}} ou {{latestLink}}.",read_more:"Queres ler mais? {{catLink}} ou {{latestLink}}.",browse_all_categories:"Procurar todas as categorias",view_latest_topics:"ver tópicos populares",progress:{title:"progresso do tópico",jump_top:"saltar para o primeiro post",jump_bottom:"saltar para o último post",total:"total de posts",current:"post atual"},notifications:{title:"",reasons:{"3_2":"Irás receber notificações porque estás a observar este tópico.","3_1":"Irás receber notificações porque criaste este tópico.","2_4":"Irás receber notificações porque postaste uma resposta neste tópico.","2_2":"Irás receber notificações porque estás a monitorizar este tópico.",2:'Irás receber notificações porque tu <a href="/users/{{username}}/preferences">leste este tópico</a>.',1:"Irás ser notificado apenas se alguém menciona o teu @nome ou te responde ao teu post.","1_2":"Irás ser notificado apenas se alguém menciona o teu @nome ou te responde ao teu post.",0:"Estás a ignorar todas as notificações para este tópico.","0_2":"Estás a ignorar todas as notificações para este tópico."},watching:{title:"Observar",description:"o mesmo que monitorizar, mas ainda serás notificado de todos os novos posts."},tracking:{title:"Monitorizar",description:"serás notificado de posts não lidos, mencionamentos de @nome, e respostas aos teus posts."},regular:{title:"Regular",description:"irás ser notificado apenas se alguém menciona o teu @nome ou responde ao teu post."},muted:{title:"Silenciar",description:"não serás notificado relativamente a nada deste tópico, e não aparecerá na tua tab de não lidos."}},actions:{"delete":"Apagar Tópico",open:"Abrir Tópico",close:"Fechar Tópico",unpin:"Desafixar Tópico",pin:"Afixar Tópico",unarchive:"Desarquivar Tópico",archive:"Arquivar Tópico",invisible:"Tornar Invisível",visible:"Tornar Visível",reset_read:"Repor Data de Leitura",multi_select:"Alternar Multi-Seleção",convert_to_topic:"Converter a Tópico Regular"},reply:{title:"Responder",help:"começa a compor uma resposta a este tópico"},share:{title:"Partilhar",help:"partilhar um link para este tópico"},inviting:"A convidar...",invite_private:{title:"Convidar para Conersa Privada",email_or_username:"Email ou Nome de Utilizador do Convidado",email_or_username_placeholder:"endereço de email ou username",action:"Convite",success:"Obrigado! Convidamos esse utilizador para participar nesta conversa privada.",error:"Desculpa, houve um erro ao convidar esse utilizador."},invite_reply:{title:"Convidar um amigo para Responder",help:"envia convites aos teus amigos para que eles possam responder a este tópico com um simples clique.",email:"Enviaremos ao teu amigo um pequeno email para que ele possa responder a este tópico apenas com um clique.",email_placeholder:"endereço de email",success:"Obrigado! Enviamos um convite para <b>{{email}}</b>. Irás saber quando eles utilizarem o convite. Podes dirigir-te à tab de Convites na tua página de tulizador para saberes quem já convidaste.",error:"Desculpa não podíamos convidar essa pessoa. Talvez já seja um utilizador?"},login_reply:"Log In para responder",filters:{user:"Estás a ver apenas os posts de um utilizador especifico.",best_of:"Estás a ver apenas os posts em 'Melhor De'.",cancel:"Mostrar todos os posts neste tópico outra vez."},move_selected:{title:"Mover Posts Selectionados",topic_name:"Nome para o Novo Tópico:",error:"Desculpa, houve um erro ao tentar mover esses posts..",instructions:{one:"Estás prestes a criar um novo tópico e preenchê-lo com o post que selecionaste.",other:"Estás prestes a criar um novo tópico e preenchê-lo com os <b>{{count}}</b> posts que selecionaste."}},multi_select:{select:"selecionar",selected:"({{count}}) selecionados","delete":"apagar selecionados",cancel:"cancelar seleção",move:"mover selecionados",description:{one:"Selectionaste <b>1</b> post.",other:"Selecionaste <b>{{count}}</b> posts."}}},post:{reply:"Em resposta a {{link}} por {{replyAvatar}} {{username}}",reply_topic:"Responder a {{link}}",edit:"Editar {{link}}",in_reply_to:"Em resposta a",reply_as_new_topic:"Responder como um novo Tópico",continue_discussion:"Continuar a discussão desde {{postLink}}:",follow_quote:"ir para o post citado",deleted_by_author:"(post removido pelo autor)",has_replies:{one:"Resposta",other:"Respostas"},errors:{create:"Desculpa, houve um erro ao criar o teu post. Por favor tenta outra vez.",edit:"Desculpa, houve um erro ao editar o teu post. Por favor tenta outra vez.",upload:"Desculpa, houve um erro ao enviar esse ficheiro. Por favor tenta otura vez."},abandon:"De certeza que queres abandonar o teu post?",archetypes:{save:"Guardar as Opções"},controls:{reply:"começa a compor uma resposta a este tópico",like:"gostar deste tópico",edit:"editar este tópico",flag:"denuncia este tópico com uma flag para avisar os moderadores","delete":"apagar este post",undelete:"desapagar este post",share:"partilhar um link para este post",bookmark:"marcar este post na tua página de utilizador",more:"Mais"},actions:{flag:"Flag",clear_flags:{one:"Apagar flag",other:"Apagar flags"},it_too:"{{alsoName}} também",undo:"Desfazer {{alsoName}}",by_you_and_others:{zero:"Tu {{long_form}}",one:"Tu e outra pessoa {{long_form}}",other:"Tu e outras {{count}} pessoas {{long_form}}"},by_others:{one:"1 pessoa {{long_form}}",other:"{{count}} pessoas {{long_form}}"}},edits:{one:"1 edição",other:"{{count}} edições",zero:"sem edições"},"delete":{confirm:{one:"Tens a certeza que queres apagar este post?",other:"Tens a certeza que queres apagar todos esses posts?"}}},category:{none:"(sem categoria)",edit:"editar",view:"Visualizar Tópicos na Categoria","delete":"Apagar Categoria",create:"Criar Categoria",more_posts:"visualizar todos os {{posts}}...",name:"Nome da Categoria",description:"Descrição",topic:"tópico da categoria",color:"Cor",name_placeholder:"Deve ser curto e sucinto.",color_placeholder:"Qualquer cor web",delete_confirm:"Tens a certeza que queres apagar esta categoria?",list:"Lista de Categorias"},flagging:{title:"Porque estás a pôr uma flag neste post?",action:"Flag Post",cant:"Desculpa, não podes por uma flag neste momento.",custom_placeholder:"Porquê a necessidade deste post ter atenção da moderação? Faz-nos saber especificamente quais as tuas preocupações, e fornece links relevantes se possível.",custom_message:{at_least:"insere pelo menos {{n}} caracteres",more:"{{n}} em falta...",left:"{{n}} restantes"}},topic_summary:{title:"Sumário do Tópico",links_shown:"mostrar todos os {{totalLinks}} links..."},topic_statuses:{locked:{help:"este tópico está fechado; não serão aceites mais respostas"},pinned:{help:"este tópico está fixado; irá ser mostrado no topo da sua categoria"},archived:{help:"este tópico está arquivado; está congelado e não pode ser alterado"},invisible:{help:"este tópico está invisível; não aparecerá na listagem dos tópicos, e pode apenas ser acedido por link direto"}},posts:"Posts",posts_long:"{{number}} posts neste tópico",original_post:"Post Original",views:"Visualizações",replies:"Respostas",views_long:"este tópico foi visto {{number}} vezes",activity:"Atividade",likes:"Gostos",top_contributors:"Participantes",category_title:"Categoria",categories_list:"Lista de Categorias",filters:{latest:{title:"Populares",help:"os tópicos recentes mais populares"},favorited:{title:"Favoritos",help:"tópicos que marcaste como favorito"},read:{title:"Lido",help:"tópicos que tu leste"},categories:{title:"Categorias",title_in:"Categoria - {{categoryName}}",help:"todos os tópicos agrupados por categoria"},unread:{title:{zero:"Não lido",one:"Não lido (1)",other:"Não lidos ({{count}})"},help:"tópicos monitorizados com posts não lidos"},"new":{title:{zero:"Novo",one:"Novo (1)",other:"Novos ({{count}})"},help:"novos tópicos desde a tua última visita, e tópicos monitorizados com posts novos"},posted:{title:"Meus posts",help:"tópicos em que postastes em"},category:{title:{zero:"{{categoryName}}",one:"{{categoryName}} (1)",other:"{{categoryName}} ({{count}})"},help:"tópicos populares na categoria {{categoryName}}"}},type_to_filter:"escreve para filtrar...",admin:{title:"Discourse Admin",dashboard:"Painel Administrativo",flags:{title:"Flags",old:"Antigo",active:"Ativo",clear:"Apagar Flags",clear_title:"descartar todas a flags neste post (vai passar posts escondidos a visíveis)","delete":"Apagar Post",delete_title:"apagar post (se for o primeiro post, apagar tópico)",flagged_by:"Flagged por"},customize:{title:"Personalizar",header:"Cabeçalho",css:"Stylesheet",override_default:"Sobrepor padrão?",enabled:"Habilitado?",preview:"pré-visualização",undo_preview:"desfazer pré-visualização",save:"Guardar","delete":"Apagar",delete_confirm:"Apagar esta personalização?"},email_logs:{title:"Email",sent_at:"Enviado a",email_type:"Tipo de Email",to_address:"Para (endereço)",test_email_address:"endereço de email para testar",send_test:"enviar email de teste",sent_test:"enviado!"},impersonate:{title:"Personificar Utilizador",username_or_email:"Nome do Utilizador ou Email do Utilizador",help:"Utiliza este ferramenta para personificar uma conta de utilizador para efeitos de depuração.",not_found:"Esse utilizador não consegue ser encotrado.",invalid:"Desculpa, não podes personificar esse utilizador."},users:{title:"Utilizadores",create:"Adicionar Utilizador Admin",last_emailed:"Último email enviado",not_found:"Desculpa, esse nome de utilizador não existe no nosso sistema.","new":"Novo",active:"Ativo",pending:"Pendente",approved:"Aprovado?",approved_selected:{one:"aprovar utilizador",other:"aprovar utilizadores ({{count}})"}},user:{ban_failed:"Algo correu mal ao banir este utilizador {{error}}",unban_failed:"Algo não correu bem ao desbanir este utilizador {{error}}",ban_duration:"Por quanto tempo gostarias de banir a pessoa? (dias)",delete_all_posts:"Apagar todos os posts",ban:"Banir",unban:"Desbanir",banned:"Banido?",moderator:"Moderador?",admin:"Admin?",show_admin_profile:"Admin",refresh_browsers:"Forçar atualização da página no browser",show_public_profile:"Mostrar Perfil Público",impersonate:"Personificar",revoke_admin:"Revogar Admin",grant_admin:"Conceder Admin",revoke_moderation:"Revogar Moderação",grant_moderation:"Conceder Moderação",reputation:"Reputação",permissions:"Permissões",activity:"Atividade",like_count:"Gostos recebidos",private_topics_count:"Contagem de tópicos privados",posts_read_count:"Posts lidos",post_count:"Posts criados",topics_entered:"Tópicos que entrou",flags_given_count:"Flags dadas",flags_received_count:"Flags recebidas",approve:"Aprovar",approved_by:"aprovado por",time_read:"Tempo de leitura"},site_settings:{show_overriden:"Apenas mostrar valores alterados",title:"Configurações do Site",reset:"repor valores padrão"}}}}},I18n.locale="pt";