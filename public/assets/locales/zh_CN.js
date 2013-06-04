Array.prototype.indexOf||(Array.prototype.indexOf=function(e){"use strict";if(void 0===this||null===this)throw new TypeError;var t=Object(this),n=t.length>>>0;if(0===n)return-1;var r=0;if(arguments.length>0&&(r=Number(arguments[1]),r!==r?r=0:0!==r&&1/0!==r&&r!==-1/0&&(r=(r>0||-1)*Math.floor(Math.abs(r)))),r>=n)return-1;for(var s=r>=0?r:Math.max(n-Math.abs(r),0);n>s;s++)if(s in t&&t[s]===e)return s;return-1});var I18n=I18n||{};I18n.defaultLocale="en",I18n.fallbacks=!1,I18n.defaultSeparator=".",I18n.locale=null,I18n.PLACEHOLDER=/(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,I18n.fallbackRules={},I18n.pluralizationRules={en:function(e){return 0==e?["zero","none","other"]:1==e?"one":"other"}},I18n.getFallbacks=function(e){if(e===I18n.defaultLocale)return[];if(!I18n.fallbackRules[e]){for(var t=[],n=e.split("-"),r=1;n.length>r;r++)t.push(n.slice(0,r).join("-"));t.push(I18n.defaultLocale),I18n.fallbackRules[e]=t}return I18n.fallbackRules[e]},I18n.isValidNode=function(e,t,n){return null!==e[t]&&e[t]!==n},I18n.lookup=function(e,t){var n,t=t||{},r=e,s=this.prepareOptions(I18n.translations),i=t.locale||I18n.currentLocale(),a=s[i]||{},t=this.prepareOptions(t);for("object"==typeof e&&(e=e.join(this.defaultSeparator)),t.scope&&(e=t.scope.toString()+this.defaultSeparator+e),e=e.split(this.defaultSeparator);a&&e.length>0;)n=e.shift(),a=a[n];if(!a){if(I18n.fallbacks)for(var o=this.getFallbacks(i),l=0;o.length>l&&!(a=I18n.lookup(r,this.prepareOptions({locale:o[l]},t)));o++);!a&&this.isValidNode(t,"defaultValue")&&(a=t.defaultValue)}return a},I18n.prepareOptions=function(){for(var e,t={},n=arguments.length,r=0;n>r;r++)if(e=arguments[r])for(var s in e)this.isValidNode(t,s)||(t[s]=e[s]);return t},I18n.interpolate=function(e,t){t=this.prepareOptions(t);var n,r,s,i=e.match(this.PLACEHOLDER);if(!i)return e;for(var a=0;n=i[a];a++)s=n.replace(this.PLACEHOLDER,"$1"),r=t[s],this.isValidNode(t,s)||(r="[missing "+n+" value]"),regex=new RegExp(n.replace(/\{/gm,"\\{").replace(/\}/gm,"\\}")),e=e.replace(regex,r);return e},I18n.translate=function(e,t){t=this.prepareOptions(t);var n=this.lookup(e,t);try{return"object"==typeof n?"number"==typeof t.count?this.pluralize(t.count,e,t):n:this.interpolate(n,t)}catch(r){return this.missingTranslation(e)}},I18n.localize=function(e,t){switch(e){case"currency":return this.toCurrency(t);case"number":return e=this.lookup("number.format"),this.toNumber(t,e);case"percentage":return this.toPercentage(t);default:return e.match(/^(date|time)/)?this.toTime(e,t):t.toString()}},I18n.parseDate=function(e){var t,n;if("object"==typeof e)return e;if(t=e.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?(Z|\+0000)?/)){for(var r=1;6>=r;r++)t[r]=parseInt(t[r],10)||0;t[2]-=1,n=t[7]?new Date(Date.UTC(t[1],t[2],t[3],t[4],t[5],t[6])):new Date(t[1],t[2],t[3],t[4],t[5],t[6])}else"number"==typeof e?(n=new Date,n.setTime(e)):e.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/)?(n=new Date,n.setTime(Date.parse(e))):(n=new Date,n.setTime(Date.parse(e)));return n},I18n.toTime=function(e,t){var n=this.parseDate(t),r=this.lookup(e);return n.toString().match(/invalid/i)?n.toString():r?this.strftime(n,r):n.toString()},I18n.strftime=function(e,t){var n=this.lookup("date");if(!n)return e.toString();n.meridian=n.meridian||["AM","PM"];var r=e.getDay(),s=e.getDate(),i=e.getFullYear(),a=e.getMonth()+1,o=e.getHours(),l=o,u=o>11?1:0,c=e.getSeconds(),h=e.getMinutes(),p=e.getTimezoneOffset(),d=Math.floor(Math.abs(p/60)),f=Math.abs(p)-60*d,m=(p>0?"-":"+")+(2>d.toString().length?"0"+d:d)+(2>f.toString().length?"0"+f:f);l>12?l-=12:0===l&&(l=12);var g=function(e){var t="0"+e.toString();return t.substr(t.length-2)},b=t;return b=b.replace("%a",n.abbr_day_names[r]),b=b.replace("%A",n.day_names[r]),b=b.replace("%b",n.abbr_month_names[a]),b=b.replace("%B",n.month_names[a]),b=b.replace("%d",g(s)),b=b.replace("%e",s),b=b.replace("%-d",s),b=b.replace("%H",g(o)),b=b.replace("%-H",o),b=b.replace("%I",g(l)),b=b.replace("%-I",l),b=b.replace("%m",g(a)),b=b.replace("%-m",a),b=b.replace("%M",g(h)),b=b.replace("%-M",h),b=b.replace("%p",n.meridian[u]),b=b.replace("%S",g(c)),b=b.replace("%-S",c),b=b.replace("%w",r),b=b.replace("%y",g(i)),b=b.replace("%-y",g(i).replace(/^0+/,"")),b=b.replace("%Y",i),b=b.replace("%z",m)},I18n.toNumber=function(e,t){t=this.prepareOptions(t,this.lookup("number.format"),{precision:3,separator:".",delimiter:",",strip_insignificant_zeros:!1});var n,r,s=0>e,i=Math.abs(e).toFixed(t.precision).toString(),a=i.split("."),o=[];for(e=a[0],n=a[1];e.length>0;)o.unshift(e.substr(Math.max(0,e.length-3),3)),e=e.substr(0,e.length-3);if(r=o.join(t.delimiter),t.precision>0&&(r+=t.separator+a[1]),s&&(r="-"+r),t.strip_insignificant_zeros){var l={separator:new RegExp(t.separator.replace(/\./,"\\.")+"$"),zeros:/0+$/};r=r.replace(l.zeros,"").replace(l.separator,"")}return r},I18n.toCurrency=function(e,t){return t=this.prepareOptions(t,this.lookup("number.currency.format"),this.lookup("number.format"),{unit:"$",precision:2,format:"%u%n",delimiter:",",separator:"."}),e=this.toNumber(e,t),e=t.format.replace("%u",t.unit).replace("%n",e)},I18n.toHumanSize=function(e,t){for(var n,r,s=1024,i=e,a=0;i>=s&&4>a;)i/=s,a+=1;return 0===a?(n=this.t("number.human.storage_units.units.byte",{count:i}),r=0):(n=this.t("number.human.storage_units.units."+[null,"kb","mb","gb","tb"][a]),r=0===i-Math.floor(i)?0:1),t=this.prepareOptions(t,{precision:r,format:"%n%u",delimiter:""}),e=this.toNumber(i,t),e=t.format.replace("%u",n).replace("%n",e)},I18n.toPercentage=function(e,t){return t=this.prepareOptions(t,this.lookup("number.percentage.format"),this.lookup("number.format"),{precision:3,separator:".",delimiter:""}),e=this.toNumber(e,t),e+"%"},I18n.pluralizer=function(e){return pluralizer=this.pluralizationRules[e],void 0!==pluralizer?pluralizer:this.pluralizationRules.en},I18n.findAndTranslateValidNode=function(e,t){for(i=0;e.length>i;i++)if(key=e[i],this.isValidNode(t,key))return t[key];return null},I18n.pluralize=function(e,t,n){var r;try{r=this.lookup(t,n)}catch(s){}if(!r)return this.missingTranslation(t);var i;return n=this.prepareOptions(n),n.count=e.toString(),pluralizer=this.pluralizer(this.currentLocale()),key=pluralizer(Math.abs(e)),keys="object"==typeof key&&key instanceof Array?key:[key],i=this.findAndTranslateValidNode(keys,r),null==i&&(i=this.missingTranslation(t,keys[0])),this.interpolate(i,n)},I18n.missingTranslation=function(){for(var e='[missing "'+this.currentLocale(),t=arguments.length,n=0;t>n;n++)e+="."+arguments[n];return e+='" translation]'},I18n.currentLocale=function(){return I18n.locale||I18n.defaultLocale},I18n.t=I18n.translate,I18n.l=I18n.localize,I18n.p=I18n.pluralize,MessageFormat={locale:{}},MessageFormat.locale.zh_CN=function(){return"other"},I18n.messageFormat=function(e){var t=e;return function(e,n){var r=t[e];if(!r)return"Missing Key: "+e;try{return r(n)}catch(s){return s.message}return t[e](n)}}({}),I18n.translations={zh_CN:{js:{share:{topic:"分享一个到本主题的链接",post:"分享一个到本帖的链接",close:"关闭",twitter:"分享这个链接到 Twitter",facebook:"分享这个链接到 Facebook","google+":"分享这个链接到 Google+",email:"用电子邮件发送这个链接"},edit:"编辑本主题的标题和分类",not_implemented:"非常抱歉，此功能暂时尚未实现！",no_value:"否",yes_value:"是",of_value:"之于",generic_error:"抱歉，发生了一个错误。",log_in:"登录",age:"寿命",last_post:"最后一帖",admin_title:"管理员",flags_title:"投诉",show_more:"显示更多",links:"链接",faq:"常见问答（FAQ）",you:"你",or:"或",now:"刚刚",read_more:"阅读更多",in_n_seconds:{one:"一秒内",other:"{{count}}秒内"},in_n_minutes:{one:"一分钟内",other:"{{count}}分钟内"},in_n_hours:{one:"一小时内",other:"{{count}}小时内"},in_n_days:{one:"一天内",other:"{{count}}天内"},suggested_topics:{title:"推荐主题"},bookmarks:{not_logged_in:"抱歉，要给帖子加书签，你必须先登录。",created:"你给此帖的书签已加上。",not_bookmarked:"你已经阅读过此帖，点此给它加上书签。",last_read:"这是你阅读过的最后一帖。"},new_topics_inserted:"{{count}} 个新主题。",show_new_topics:"点此显示。",preview:"预览",cancel:"取消",save:"保存修改",saving:"保存中……",saved:"已保存！",choose_topic:{none_found:"没有找到主题",title:{search:"通过名称、url或者id，搜索主题：",placeholder:"在此输入主题标题"}},user_action:{user_posted_topic:"<a href='{{userUrl}}'>{{user}}</a> 发起 <a href='{{topicUrl}}'>本主题</a>",you_posted_topic:"<a href='{{userUrl}}'>你</a> 发起 <a href='{{topicUrl}}'>本主题</a>",user_replied_to_post:"<a href='{{userUrl}}'>{{user}}</a> 回复 <a href='{{postUrl}}'>{{post_number}}</a>",you_replied_to_post:"<a href='{{userUrl}}'>你</a> 回复 <a href='{{postUrl}}'>{{post_number}}</a>",user_replied_to_topic:"<a href='{{userUrl}}'>{{user}}</a> 回复 <a href='{{topicUrl}}'>本主题</a>",you_replied_to_topic:"<a href='{{userUrl}}'>你</a> 回复 <a href='{{topicUrl}}'>本主题</a>",user_mentioned_user:"<a href='{{user1Url}}'>{{user}}</a> 提到 <a href='{{user2Url}}'>{{another_user}}</a>",user_mentioned_you:"<a href='{{user1Url}}'>{{user}}</a> 提到 <a href='{{user2Url}}'>你</a>",you_mentioned_user:"<a href='{{user1Url}}'>你</a> 提到 <a href='{{user2Url}}'>{{user}}</a>",posted_by_user:"发起人 <a href='{{userUrl}}'>{{user}}</a>",posted_by_you:"发起人 <a href='{{userUrl}}'>你</a>",sent_by_user:"发送人 <a href='{{userUrl}}'>{{user}}</a>",sent_by_you:"发送人 <a href='{{userUrl}}'>你</a>"},user_action_groups:{1:"给出的赞",2:"收到的赞",3:"书签",4:"主题",5:"回复",6:"回应",7:"提到",9:"引用",10:"喜爱",11:"编辑",12:"发送条目",13:"收件箱"},user:{profile:"介绍信息",title:"用户",mute:"防打扰",edit:"修改参数",download_archive:"下载我的帖子的存档",private_message:"私信",private_messages:"消息",activity_stream:"活动",preferences:"设置",bio:"关于我",invited_by:"邀请者为",trust_level:"用户级别",external_links_in_new_tab:"始终在新的标签页打开外部链接",enable_quoting:"在高亮选择文字时启用引用回复",moderator:"{{user}} 是版主",admin:"{{user}} 是管理员",change_password:{action:"修改",success:"（电子邮件已发送）",in_progress:"（正在发送电子邮件）",error:"（错误）"},change_username:{action:"修改",title:"修改用户名",confirm:"修改你的用户名可能会导致一些相关后果，你真的确定要这么做么？",taken:"抱歉此用户名已经有人使用了。",error:"在修改你的用户名时发生了错误。",invalid:"此用户名不合法，用户名只能包含字母和数字"},change_email:{action:"修改",title:"修改电子邮箱",taken:"抱歉此电子邮箱不可用。",error:"抱歉在修改你的电子邮箱时发生了错误，可能此邮箱已经被使用了？",success:"我们发送了一封确认信到此邮箱地址，请按照邮箱内指示完成确认。"},email:{title:"电子邮箱",instructions:"你的电子邮箱绝不会公开给他人。",ok:"不错哦，我们会发送电子邮件让你确认。",invalid:"请填写正确的电子邮箱地址。",authenticated:"你的电子邮箱已经被 {{provider}} 确认有效。",frequency:"只有当你最近一段时间没有访问时，我们才会把你未读过的内容发送到你的电子邮箱。"},name:{title:"名字",instructions:"你的名字，不要求独一无二（可以与他人的名字重复）。用于在@name匹配你时参考，只在你的用户页面显示。",too_short:"你设置的名字太短了。",ok:"你的名字符合要求。"},username:{title:"用户名",instructions:"必须是独一无二的，中间不能有空格。其他人可以使用 @{{username}} 来提及你。",short_instructions:"其他人可以用 @{{username}} 来提及你。",available:"你的用户名可用。",global_match:"电子邮箱与注册用户名相匹配。",global_mismatch:"已被人注册。试试 {{suggestion}} ？",not_available:"不可用。试试 {{suggestion}} ？",too_short:"你设置的用户名太短了。",too_long:"你设置的用户名太长了。",checking:"查看用户名是否可用……",enter_email:"找到用户名，请输入对应电子邮箱。"},password_confirmation:{title:"请再次输入密码"},last_posted:"最后一帖",last_emailed:"最后一次邮寄",last_seen:"最后一次见到",created:"创建时间",log_out:"登出",website:"网站",email_settings:"电子邮箱",email_digests:{title:"当我不访问此站时，向我的邮箱发送最新摘要",daily:"每天",weekly:"每周",bi_weekly:"每两周"},email_direct:"当有人引用你、回复你或提及你 @username 时发送一封邮件给你",email_private_messages:"当有人给你发私信时发送一封邮件给你",other_settings:"其它",new_topic_duration:{label:"认为主题是新主题，当",not_viewed:"我还没有浏览它们",last_here:"它们是在我最近一次访问这里之后发表的",after_n_days:{one:"它们是昨天发表的",other:"它们是之前 {{count}} 天发表的"},after_n_weeks:{one:"它们是上周发表的",other:"它们是之前 {{count}} 周发表的"}},auto_track_topics:"自动追踪我进入的主题",auto_track_options:{never:"从不",always:"始终",after_n_seconds:{one:"1 秒之后",other:"{{count}} 秒之后"},after_n_minutes:{one:"1 分钟之后",other:"{{count}} 分钟之后"}},invited:{title:"邀请",user:"邀请用户",none:"{{username}} 尚未邀请任何用户到本站。",redeemed:"确认邀请",redeemed_at:"确认时间",pending:"待定邀请",topics_entered:"已进入的主题",posts_read_count:"已阅的帖子",rescind:"删除邀请",rescinded:"邀请已删除",time_read:"阅读时间",days_visited:"访问天数",account_age_days:"帐号存在天数"},password:{title:"密码",too_short:"你设置的密码太短了。",ok:"你设置的密码符合要求。"},ip_address:{title:"最后使用的IP地址"},avatar:{title:"头像",instructions:"我们目前使用 <a href='https://gravatar.com' target='_blank'>Gravatar</a> 来基于你的邮箱生成头像"},filters:{all:"全部"},stream:{posted_by:"发帖人",sent_by:"发送时间",private_message:"私信",the_topic:"本主题"}},loading:"载入中……",close:"关闭",learn_more:"了解更多……",year:"年",year_desc:"365天以前发表的主题",month:"月",month_desc:"30天以前发表的主题",week:"周",week_desc:"7天以前发表的主题",first_post:"第一帖",mute:"防打扰",unmute:"解除防打扰",best_of:{title:"优秀",enabled_description:"你现在正在浏览本主题的“优秀”视图。",description:"此主题中有 <b>{{count}}</b> 个帖子，是不是有点多哦！你愿意切换到只显示最多交互和回复的帖子视图么？",enable:"切换到“优秀”视图",disable:"取消“优秀”"},private_message_info:{title:"私下交流",invite:"邀请其他人……"},email:"电子邮箱",username:"用户名",last_seen:"最后一次见到",created:"创建时间",trust_level:"用户级别",create_account:{title:"创建帐号",action:"现在就创建一个！",invite:"还没有帐号吗？",failed:"出问题了，有可能这个电子邮箱已经被注册了。试试忘记密码链接"},forgot_password:{title:"忘记密码",action:"我忘记了我的密码",invite:"输入你的用户名和电子邮箱地址，我们会发送密码重置邮件给你。",reset:"重置密码",complete:"你很快会收到一封电子邮件，告诉你如何重置密码。"},login:{title:"登录",username:"登录",password:"密码",email_placeholder:"电子邮箱地址或用户名",error:"未知错误",reset_password:"重置密码",logging_in:"登录中……",or:"或",authenticating:"验证中……",awaiting_confirmation:"你的帐号尚未激活，点击忘记密码链接来重新发送激活邮件。",awaiting_approval:"你的帐号尚未被论坛版主批准。一旦你的帐号获得批准，你会收到一封电子邮件。",not_activated:"你还不能登录。我们之前在<b>{{sentTo}}</b>发送了一封激活邮件给你。请按照邮件中的介绍来激活你的帐号。",resend_activation_email:"点击此处来重新发送激活邮件。",sent_activation_email_again:"我们在<b>{{currentEmail}}</b>又发送了一封激活邮件给你，邮件送达可能需要几分钟，有的电子邮箱服务商可能会认为此邮件为垃圾邮件，请检查一下你邮箱的垃圾邮件文件夹。",google:{title:"使用谷歌帐号登录",message:"使用谷歌（Google）帐号验证登录（请确保没有禁止浏览器弹出对话框）"},twitter:{title:"使用推特帐号登录",message:"使用推特（Twitter）帐号验证登录（请确保没有禁止浏览器弹出对话框）"},facebook:{title:"使用脸书帐号登录",message:"使用脸书（Facebook）帐号验证登录（请确保没有禁止浏览器弹出对话框）"},yahoo:{title:"使用雅虎帐号登录",message:"使用雅虎（Yahoo）帐号验证登录（请确保没有禁止浏览器弹出对话框）"},github:{title:"使用 GitHub 帐号登录",message:"使用 GitHub 帐号验证登录（请确保没有禁止浏览器弹出对话框）"},persona:{title:"使用 Persona 帐号登录",message:"使用 Mozilla Persona 帐号验证登录（请确保没有禁止浏览器弹出对话框）"}},composer:{posting_not_on_topic:'你正在回复主题 "{{title}}"，但是当前你正在浏览的是另外一个主题。',saving_draft_tip:"保存中",saved_draft_tip:"已保存",saved_local_draft_tip:"已本地保存",similar_topics:"你的主题与此有些类似...",drafts_offline:"离线草稿",min_length:{need_more_for_title:"请给标题再输入至少 {{n}} 个字符",need_more_for_reply:"请给正文内容再输入至少 {{n}} 个字符"},save_edit:"保存编辑",reply_original:"回复原始帖",reply_here:"在此回复",reply:"回复",cancel:"取消",create_topic:"创建主题",create_pm:"创建私信",users_placeholder:"添加一个用户",title_placeholder:"在此输入你的标题，简明扼要的用一句话说明讨论的内容。",reply_placeholder:"在此输入你的内容。你可以使用 Markdown（参考 http://wowubuntu.com/markdown/） 或 BBCode（参考 http://www.bbcode.org/reference.php） 来格式化内容。拖拽或粘贴一幅图片到这儿即可将它上传。",view_new_post:"浏览你的新帖子。",saving:"保存中……",saved:"已保存！",saved_draft:"你有一个帖子草稿尚发表。在框中任意处点击即可接着编辑。",uploading:"上传中……",show_preview:"显示预览 &raquo;",hide_preview:"&laquo; 隐藏预览",quote_post_title:"引用整个帖子",bold_title:"加粗",bold_text:"加粗文字",italic_title:"斜体",italic_text:"斜体文字",link_title:"链接",link_description:"在此输入链接描述",link_dialog_title:"插入链接",link_optional_text:"可选标题",quote_title:"引用",quote_text:"引用",code_title:"代码",code_text:"在此输入代码",image_title:"图片",image_description:"在此输入图片描述",image_dialog_title:"插入图片",image_optional_text:"可选标题",image_hosting_hint:"需要 <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>免费图片存储？</a>",olist_title:"数字列表",ulist_title:"符号列表",list_item:"列表条目",heading_title:"标题",heading_text:"标题头",hr_title:"分割线",undo_title:"撤销",redo_title:"重做",help:"Markdown 编辑帮助",toggler:"隐藏或显示编辑面板",admin_options_title:"本主题可选设置",auto_close_label:"自动关闭主题，过：",auto_close_units:"天"},notifications:{title:"使用 @name 提及到你，回复你的帖子和主题，私信等等的通知消息",none:"你当前没有任何通知。",more:"浏览以前的通知",mentioned:"<span title='mentioned' class='icon'>@</span> {{username}} {{link}}",quoted:"<i title='quoted' class='icon icon-quote-right'></i> {{username}} {{link}}",replied:"<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}",posted:"<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}",edited:"<i title='edited' class='icon icon-pencil'></i> {{username}} {{link}}",liked:"<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}",private_message:"<i class='icon icon-envelope-alt' title='私信'></i> {{username}} 发送给你一条私信：{{link}}",invited_to_private_message:"{{username}} 邀请你进行私下交流：{{link}}",invitee_accepted:"<i title='已接受你的邀请' class='icon icon-signin'></i> {{username}} 已接受你的邀请",moved_post:"<i title='移动帖子' class='icon icon-arrow-right'></i> {{username}} 已将帖子移动到 {{link}}",total_flagged:"被投诉帖子的总数"},image_selector:{title:"插入图片",from_my_computer:"来自我的设备",from_the_web:"来自网络",add_image:"添加图片",remote_title:"网络图片",remote_tip:"输入图片网络，格式为：http://example.com/image.jpg",local_title:"本地图片",local_tip:"点击从你的设备中选择一张图片。",upload:"上传",uploading_image:"上传图片中"},search:{title:"搜索主题、帖子、用户或分类",placeholder:"在此输入你的搜索条件",no_results:"没有找到结果。",searching:"搜索中……"},site_map:"去另一个主题列表或分类",go_back:"返回",current_user:"去你的用户页面",favorite:{title:"收藏",help:{star:"将此主题加入你的收藏列表",unstar:"将此主题从你的收藏列表中移除"}},topics:{none:{favorited:"你尚未收藏任何主题。要收藏一个主题，点击标题旁的星星图标。",unread:"你没有未阅主题。","new":"你没有新主题可读。",read:"你尚未阅读任何主题。",posted:"你尚未在任何主题中发帖。",latest:"伤心啊，没有主题。",hot:"没有热门主题。",category:"没有 {{category}} 分类的主题。"},bottom:{latest:"没有更多主题可看了。",hot:"没有更多热门主题可看了。",posted:"没有更多已发布主题可看了。",read:"没有更多已阅主题可看了。","new":"没有更多新主题可看了。",unread:"没有更多未阅主题可看了。",favorited:"没有更多收藏主题可看了。",category:"没有更多 {{category}} 分类的主题了。"}},rank_details:{toggle:"切换主题排名详细",show:"显示主题排名详细信息",title:"主题排名详细"},topic:{create_in:"创建一个 {{categoryName}} 分类的主题",create:"创建主题",create_long:"创建一个新主题",private_message:"开启一段私下交流",list:"主题","new":"新主题",title:"主题",loading_more:"载入更多主题中……",loading:"载入主题中……",invalid_access:{title:"这是私密主题",description:"抱歉，你没有访问此主题的权限！"},server_error:{title:"载入主题失败",description:"抱歉，无法载入此主题。有可能是网络连接问题导致的，请重试。如果问题始终存在，请告诉我们。"},not_found:{title:"未找到主题",description:"抱歉，无法找到此主题。有可能它被论坛版主删掉了？"},unread_posts:"此主题中你有 {{unread}} 个帖子未阅",new_posts:"从你最近一次阅读此主题后，又有 {{new_posts}} 个新帖子发表",likes:{one:"此主题得到了一个赞",other:"此主题得到了 {{count}} 个赞"},back_to_list:"返回主题列表",options:"主题选项",show_links:"显示此主题中的链接",toggle_information:"切换主题详细",read_more_in_category:"想阅读更多内容？浏览 {{catLink}} 或 {{latestLink}} 里的其它主题。",read_more:"想阅读更多内容？{{catLink}} 或 {{latestLink}}。",browse_all_categories:"浏览所有分类",view_latest_topics:"浏览热门主题",suggest_create_topic:"这就创建一个主题吧！",read_position_reset:"你的阅读位置已经被重置。",jump_reply_up:"跳转至更早的回复",jump_reply_down:"跳转至更晚的回复",deleted:"此主题已被删除",auto_close_notice:"本主题将在%{timeLeft}后自动关闭",auto_close_title:"自动关闭设置",auto_close_save:"保存",auto_close_cancel:"取消",auto_close_remove:"不自动关闭该主题",progress:{title:"主题进度",jump_top:"跳转到第一帖",jump_bottom:"跳转到最后一帖",total:"全部帖子",current:"当前帖"},notifications:{title:"",reasons:{"3_2":"因为你在关注此主题，所以你将收到相关通知。","3_1":"因为你创建了此主题，所以你将收到相关通知。",3:"因为你在关注此主题，所以你将收到相关通知。","2_4":"因为你在此主题内发表了回复，所以你将收到相关通知。","2_2":"因为你在追踪此主题，所以你将收到相关通知。",2:'因为你<a href="/users/{{username}}/preferences">阅读了此主题</a>，所以你将收到相关通知。',1:"因为有人 @name 提及了你或回复了你的帖子，所以你将收到相关通知。","1_2":"仅当有人 @name 提及了你或回复了你的帖子，你才会收到相关通知。",0:"你将忽略关于此主题的所有通知。","0_2":"你将忽略关于此主题的所有通知。"},watching:{title:"关注",description:"与追踪一样，额外的是一旦有新帖子发表，你都会收到通知。"},tracking:{title:"追踪",description:"关于你的未阅帖子、@name 提及与对你的帖子的回复，你都会收到通知。"},regular:{title:"常规",description:"只有当有人 @name 提及你或者回复你的帖子时，你才会收到通知。"},muted:{title:"防打扰",description:"你不会收到关于此主题的任何通知，也不会在你的未阅选项卡中显示。"}},actions:{"delete":"删除主题",open:"打开主题",close:"关闭主题",auto_close:"自动关闭",unpin:"解除主题置顶",pin:"置顶主题",unarchive:"解除主题存档",archive:"存档主题",invisible:"使不可见",visible:"使可见",reset_read:"重置阅读数据",multi_select:"选择将被合并/拆分的帖子",convert_to_topic:"转换到常规主题"},reply:{title:"回复",help:"开始给本主题撰写回复"},clear_pin:{title:"清除置顶",help:"将本主题的置顶状态清除，这样它将不再始终显示在主题列表顶部"},share:{title:"分享",help:"分享一个到本帖的链接"},inviting:"邀请中……",invite_private:{title:"邀请进行私下交流",email_or_username:"受邀人的电子邮箱或用户名",email_or_username_placeholder:"电子邮箱地址或用户名",action:"邀请",success:"谢谢！我们已经邀请该用户参与此私下交流。",error:"抱歉，在邀请该用户时发生了错误。"},invite_reply:{title:"邀请朋友来回复",action:"邮件邀请",help:"向你的朋友发送邀请，他们只需要一个点击就能回复这个主题",email:"我们会给你的朋友发送一封邮件，他们只需要点击其中的一个链接就可以回复这个主题了。",email_placeholder:"电子邮箱地址",success:"谢谢！我们已发送一个邀请邮件到<b>{{email}}</b>。当他们确认的时候我们会通知你。你也可以在你的用户页面的邀请选项卡下查看邀请状态。",error:"抱歉，我们不能邀请此人，可能他/她已经是本站用户了？"},login_reply:"登录来回复",filters:{user:"你在浏览 {{n_posts}} {{by_n_users}}.",n_posts:{one:"一个帖子",other:"{{count}} 帖子"},by_n_users:{one:"一个指定用户",other:"{{count}} 个用户中的"},best_of:"你在浏览 {{n_best_posts}} {{of_n_posts}}.",n_best_posts:{one:"一个优秀帖子",other:"{{count}} 优秀帖子"},of_n_posts:{one:"一个帖子中的",other:"{{count}} 个帖子中的"},cancel:"再次显示本主题下的所有帖子。"},split_topic:{title:"拆分主题",action:"拆分主题",topic_name:"新主题名：",error:"拆分主题时发生错误。",instructions:{one:"你想如何移动该帖？",other:"你想如何移动你所选择的这{{count}}篇帖子？"}},merge_topic:{title:"合并主题",action:"合并主题",error:"合并主题时发生错误。",instructions:{one:"请选择你想将那篇帖子移至其下的主题。",other:"请选择你想将那{{count}}篇帖子移至其下的主题。"}},multi_select:{select:"选择",selected:"已选择（{{count}}）","delete":"删除所选",cancel:"取消选择",description:{one:"你已选择了<b>一个</b>帖子。",other:"你已选择了<b>{{count}}</b>个帖子。"}}},post:{reply:"回复 {{replyAvatar}} {{username}} 发表的 {{link}}",reply_topic:"回复 {{link}}",quote_reply:"引用回复",edit:"编辑 {{link}}",post_number:"帖子 {{number}}",in_reply_to:"回复给",reply_as_new_topic:"回复为新主题",continue_discussion:"从 {{postLink}} 继续讨论：",follow_quote:"跳转至所引用的帖子",deleted_by_author:"（作者删除了帖子）",expand_collapse:"展开/收缩",has_replies:{one:"回复",other:"回复"},errors:{create:"抱歉，在创建你的帖子时发生了错误。请重试。",edit:"抱歉，在编辑你的帖子时发生了错误。请重试。",upload:"抱歉，在上传文件时发生了错误。请重试。",upload_too_large:"抱歉，你上传的文件太大了（最大不能超过 {{max_size_kb}}kb），请调整文件大小后重新上传。",upload_too_many_images:"抱歉, 你只能一次上传一张图片。",only_images_are_supported:"抱歉，你只能上传图片。"},abandon:"你确定要丢弃你的帖子吗？",archetypes:{save:"保存选项"},controls:{reply:"开始给本帖撰写回复",like:"赞本帖",edit:"编辑本帖",flag:"投诉本帖以提醒论坛版主","delete":"删除本帖",undelete:"恢复本帖",share:"分享一个到本帖的链接",bookmark:"给本帖做书签到你的用户页",more:"更多"},actions:{flag:"投诉",clear_flags:{one:"清除投诉",other:"清除投诉"},it_too:{off_topic:"也投诉",spam:"也投诉",inappropriate:"也投诉",custom_flag:"也投诉",bookmark:"也做书签",like:"也赞它",vote:"也对它投票"},undo:{off_topic:"撤销投诉",spam:"撤销投诉",inappropriate:"撤销投诉",bookmark:"撤销书签",like:"撤销赞",vote:"撤销投票"},people:{off_topic:"{{icons}} 投诉它偏离主题",spam:"{{icons}} 投诉它为垃圾信息",inappropriate:"{{icons}} 投诉它为不当内容",notify_moderators:"{{icons}} 向版主投诉它",notify_moderators_with_url:"{{icons}} <a href='{{postUrl}}'>通知了版主</a>",notify_user:"{{icons}} 发起了一个私下交流",notify_user_with_url:"{{icons}} 发送了一条<a href='{{postUrl}}'>私有消息</a>",bookmark:"{{icons}} 对它做了书签",like:"{{icons}} 赞了它",vote:"{{icons}} 对它投票"},by_you:{off_topic:"你投诉它偏离主题",spam:"你投诉它为垃圾信息",inappropriate:"你投诉它为不当内容",notify_moderators:"你向版主投诉了它",notify_user:"你对该用户发起了一个私下交流",bookmark:"你对该帖做了书签",like:"你赞了它",vote:"你对该帖投了票"},by_you_and_others:{off_topic:{one:"你和另一个用户投诉它偏离主题",other:"你和其他 {{count}} 个用户投诉它偏离主题"},spam:{one:"你和另一个用户投诉它为垃圾信息",other:"你和其他 {{count}} 个用户投诉它为垃圾信息"},inappropriate:{one:"你和另一个用户投诉它为不当内容",other:"你和其他 {{count}} 个用户投诉它为不当内容"},notify_moderators:{one:"你和另一个用户向版主投诉了它",other:"你和其他 {{count}} 个用户向版主投诉了它"},notify_user:{one:"你和另一个用户对该用户发起了一个私下交流",other:"你和其他 {{count}} 个用户对该用户发起了一个私下交流"},bookmark:{one:"你和另一个用户对该帖做了书签",other:"你和其他 {{count}} 个用户对该帖做了书签"},like:{one:"你和另一个用户赞了它",other:"你和其他 {{count}} 个用户赞了它"},vote:{one:"你和另一个用户对该帖投了票",other:"你和其他 {{count}} 个用户对该帖投了票"}},by_others:{off_topic:{one:"一个用户投诉它偏离主题",other:"{{count}} 个用户投诉它偏离主题"},spam:{one:"一个用户投诉它为垃圾信息",other:"{{count}} 个用户投诉它为垃圾信息"},inappropriate:{one:"一个用户投诉它为不当内容",other:"{{count}} 个用户投诉它为不当内容"},notify_moderators:{one:"一个用户向版主投诉了它",other:"{{count}} 个用户向版主投诉了它"},notify_user:{one:"一个用户对该用户发起了一个私下交流",other:"{{count}} 个用户对该用户发起了一个私下交流"},bookmark:{one:"一个用户对该帖做了书签",other:"{{count}} 个用户对该帖做了书签"},like:{one:"一个用户赞了它",other:"{{count}} 个用户赞了它"},vote:{one:"一个用户对该帖投了票",other:"{{count}} 个用户对该帖投了票"}}},edits:{one:"一次编辑",other:"{{count}}次编辑",zero:"未编辑"},"delete":{confirm:{one:"你确定要删除此帖吗？",other:"你确定要删除这些帖子吗？"}}},category:{none:"（未分类）",edit:"编辑",edit_long:"编辑分类",edit_uncategorized:"编辑未分类的",view:"浏览分类下的主题",general:"通常",settings:"设置","delete":"删除分类",create:"创建分类",save:"保存分类",creation_error:"创建此分类时发生了错误。",save_error:"在保存此分类时发生了错误。",more_posts:"浏览全部 {{posts}} ……",name:"分类名称",description:"描述",topic:"分类主题",badge_colors:"徽章颜色",background_color:"背景色",foreground_color:"前景色",name_placeholder:"应该简明扼要。",color_placeholder:"任何网络色彩",delete_confirm:"你确定要删除此分类吗？",delete_error:"在删除此分类时发生了错误。",list:"列出分类",no_description:"本分类没有描述信息。",change_in_category_topic:"访问分类主题来编辑描述信息",hotness:"热度",already_used:"此色彩已经被另一个分类使用",is_secure:"安全类型？",add_group:"添加分组",security:"安全",allowed_groups:"授权的分组：",auto_close_label:"自动关闭主题，过："},flagging:{title:"为何要给投诉本帖？",action:"投诉帖子",notify_action:"通知",cant:"抱歉，当前你不能投诉本帖。",custom_placeholder_notify_user:"为何你要私下联系该用户？",custom_placeholder_notify_moderators:"为何本帖需要论坛版主的关注？为何本帖需要论坛版主的关注？",custom_message:{at_least:"输入至少 {{n}} 个字符",more:"还差 {{n}} 个……",left:"还剩下 {{n}}"}},topic_summary:{title:"主题概要",links_shown:"显示所有 {{totalLinks}} 个链接……",clicks:"点击",topic_link:"主题链接"},topic_statuses:{locked:{help:"本主题已关闭，不再接受新的回复"},pinned:{help:"本主题已置顶，它将始终显示在它所属分类的顶部"},archived:{help:"本主题已归档，即已经冻结，无法修改"},invisible:{help:"本主题不可见，它将不被显示在主题列表中，只能通过一个直接链接来访问"}},posts:"帖子",posts_long:"本主题有 {{number}} 个帖子",original_post:"原始帖",views:"浏览",replies:"回复",views_long:"本主题已经被浏览过 {{number}} 次",activity:"活动",likes:"赞",top_contributors:"参与者",category_title:"分类",history:"历史",changed_by:"由 {{author}}",categories_list:"分类列表",filters:{latest:{title:"最新",help:"最新发布的帖子"},hot:{title:"热门",help:"最近最受欢迎的主题"},favorited:{title:"收藏",help:"你收藏的主题"},read:{title:"已阅",help:"你已经阅读过的主题"},categories:{title:"分类",title_in:"分类 - {{categoryName}}",help:"归属于不同分类的所有主题"},unread:{title:{zero:"未阅",one:"1个未阅主题",other:"{{count}}个未阅主题"},help:"追踪的主题中有未阅帖子的主题"},"new":{title:{zero:"新主题",one:"新主题（1）",other:"新主题（{{count}}）"},help:"你最近一次访问后的新主题，以及你追踪的主题中有新帖子的主题"},posted:{title:"我的帖子",help:"你发表过帖子的主题"},category:{title:{zero:"{{categoryName}}",one:"{{categoryName}}（1）",other:"{{categoryName}}（{{count}}）"},help:"在 {{categoryName}} 分类中热门的主题"}},browser_update:'抱歉, <a href="http://www.iteriter.com/faq/#browser">你的浏览器版本太低，推荐使用Chrome</a>. 请 <a href="http://www.google.com/chrome/">升级你的浏览器</a>。',type_to_filter:"输入过滤条件……",admin:{title:"论道 管理",moderator:"版主",dashboard:{title:"管理面板",version:"安装的版本",up_to_date:"你正在运行最新的论坛版本。",critical_available:"有一个关键更新可用。",updates_available:"目前有可用更新。",please_upgrade:"请升级！",installed_version:"已安装",latest_version:"最新版本",problems_found:"你安装的论坛目前有以下问题：",last_checked:"上次检查",refresh_problems:"刷新",no_problems:"找不到问题.",moderators:"版主：",admins:"管理员：",private_messages_short:"私信",private_messages_title:"私密信息",reports:{today:"今天",yesterday:"昨天",last_7_days:"7 天以内",last_30_days:"30 天以内",all_time:"所有时间内","7_days_ago":"7 天之前","30_days_ago":"30 天之前",all:"全部",view_table:"以表格展示",view_chart:"以柱状图展示"}},commits:{latest_changes:"最后的改动: 请经常升级！",by:"来自"},flags:{title:"投诉",old:"过去的",active:"活跃的",clear:"清除投诉",clear_title:"撤销本帖的所有投诉（已隐藏的帖子将会被取消隐藏）","delete":"删除帖子",delete_title:"删除帖子（如果它是主题第一帖，那么将删除主题）",flagged_by:"投诉者为",error:"出错了",view_message:"查看消息"},groups:{title:"群组",edit:"编辑群组",selector_placeholder:"添加用户",name_placeholder:"组名，不能含有空格，与用户名规则一致"},api:{title:"应用开发接口（API）",long_title:"API信息",key:"密钥",generate:"生成API密钥",regenerate:"重新生成API密钥",info_html:"API密钥可以用来通过JSON调用创建和更新主题。",note_html:"请<strong>安全的</strong>保管好本密钥，任何拥有该密钥的用户可以使用它以论坛任何用户的名义来发帖。"},customize:{title:"定制",long_title:"站点定制",header:"头部",css:"层叠样式表（CSS）",override_default:"覆盖缺省值？",enabled:"启用？",preview:"预览",undo_preview:"撤销预览",save:"保存","new":"新建",new_style:"新样式","delete":"删除",delete_confirm:"删除本定制内容？",about:"站点定制允许你修改样式表和站点头部。选择或者添加一个来开始编辑。"},email_logs:{title:"电子邮件",sent_at:"发送时间",email_type:"邮件类型",to_address:"目的地址",test_email_address:"测试电子邮件地址",send_test:"发送测试电子邮件",sent_test:"已发送！"},impersonate:{title:"假冒用户",username_or_email:"用户名或用户电子邮件",help:"使用此工具来假冒一个用户帐号以方便调试。",not_found:"无法找到该用户。",invalid:"抱歉，你不能假冒该用户。"},users:{title:"用户",create:"添加管理员用户",last_emailed:"最后一次邮寄",not_found:"抱歉，在我们的系统中此用户名不存在。","new":"新建",active:"活跃",pending:"待定",approved:"已批准？",approved_selected:{one:"批准用户",other:"批准用户（{{count}}）"},titles:{active:"活动用户","new":"新用户",pending:"等待审核用户",newuser:"信用等级为0的用户（新用户）",basic:"信用等级为1的用户（基本用户）",regular:"信用等级为2的用户（常访问用户）",leader:"信用等级为3的用户（高级用户）",elder:"信用等级为4的用户（骨灰用户）",admins:"管理员",moderators:"版主"}},user:{ban_failed:"禁止此用户时发生了错误 {{error}}",unban_failed:"解禁此用户时发生了错误 {{error}}",ban_duration:"你计划禁止该用户多久？（天）",delete_all_posts:"删除所有帖子",ban:"禁止",unban:"解禁",banned:"已禁止？",moderator:"版主？",admin:"管理员？",show_admin_profile:"管理员",refresh_browsers:"强制浏览器刷新",show_public_profile:"显示公开介绍",impersonate:"假冒用户",revoke_admin:"吊销管理员资格",grant_admin:"赋予管理员资格",revoke_moderation:"吊销论坛版主资格",grant_moderation:"赋予论坛版主资格",reputation:"声誉",permissions:"权限",activity:"活动",like_count:"收到的赞",private_topics_count:"私有主题数量",posts_read_count:"已阅帖子数量",post_count:"创建的帖子数量",topics_entered:"进入的主题数量",flags_given_count:"所做投诉数量",flags_received_count:"收到投诉数量",approve:"批准",approved_by:"批准人",time_read:"阅读次数","delete":"删除用户",delete_forbidden:"此用户还无法删除，因为他/她还有帖子。请先删除该用户的所有帖子。",delete_confirm:"你 确定 你要永久的从本站删除此用户？该操作无法撤销！",deleted:"该用户已被删除。",delete_failed:"在删除用户时发生了错误。请确保删除该用户前删除了该用户的所有帖子。",send_activation_email:"发送激活邮件",activation_email_sent:"激活邮件已发送。",send_activation_email_failed:"在发送激活邮件时发生了错误。",activate:"激活帐号",activate_failed:"在激活用户帐号时发生了错误。",deactivate_account:"停用帐号",deactivate_failed:"在停用用户帐号时发生了错误。"},site_content:{none:"选择内容类型以开始编辑。",title:"内容",edit:"编辑站点内容"},site_settings:{show_overriden:"只显示被覆盖了缺省值的",title:"设置",reset:"重置为缺省值"}}}}},I18n.locale="zh_CN";