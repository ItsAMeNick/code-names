(this["webpackJsonpcode-names"]=this["webpackJsonpcode-names"]||[]).push([[0],{45:function(e,t,a){e.exports=a.p+"static/media/win_blue.7fbba14c.png"},46:function(e,t,a){e.exports=a.p+"static/media/win_red.b27b6041.png"},47:function(e,t,a){e.exports=a.p+"static/media/lose_blue.0ed29987.png"},48:function(e,t,a){e.exports=a.p+"static/media/lose_red.c9c9c4d2.png"},50:function(e,t,a){e.exports=a(71)},71:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),n=a(19),o=a.n(n),l=a(12),i=a(13),p=a(15),u=a(14),c=a(10),d=a(8),m=a.n(d);a(62);m.a.initializeApp({apiKey:"AIzaSyASdKlIHzVKmMTI31Qx-P0rtRMf2LTEw7w",authDomain:"code-names-6dcda.firebaseapp.com",databaseURL:"https://code-names-6dcda.firebaseio.com",projectId:"code-names-6dcda",storageBucket:"code-names-6dcda.appspot.com",messagingSenderId:"920823128002",appId:"G-1SD6GP60LL"});var h=m.a.firestore(),y=a(49),b=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={loaded:0},r}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;h.collection("words").get().then((function(t){var a={};for(var r in t.docs){var s=t.docs[r].data();a[s.version]=s.words}e.setState({loaded:100}),e.props.setWords(a)}))}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(y.a,{now:this.state.loaded,label:this.state.loaded+"%"}))}}]),a}(r.Component),f=Object(c.b)((function(e){return{}}),(function(e){return{setWords:function(t){return e({type:"set_words",payload:t})}}}))(b),g=a(11),v=a.n(g),E=a(17),_=a(6),k=a(7),C=a(4),w=a(18),R=a(9),B=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={player_name:"",session_key:"",error_message:""},r}return Object(i.a)(a,[{key:"joinGame",value:function(){var e=this;this.state.player_name?this.state.session_key?h.collection("sessions").where("key","==",this.state.session_key.toUpperCase()).get().then((function(t){1===t.docs.length?"lobby"!==t.docs[0].data().stage?e.setState({error_message:"Please wait for the current round to finish before attempting to join."}):t.docs[0].data().players.includes(e.state.player_name)?e.setState({error_message:"Player name is unavaliable."}):(h.collection("sessions").doc(t.docs[0].id).update({players:m.a.firestore.FieldValue.arrayUnion(e.state.player_name)}),e.props.setSession(t.docs[0].data().key,t.docs[0].id),e.props.setPlayer(e.state.player_name),v.a.save("cn_session",{key:t.docs[0].data().key,db_id:t.docs[0].id}),v.a.save("cn_player",e.state.player_name)):e.setState({error_message:"Session key does not exist."})})):this.setState({error_message:"Enter a session key."}):this.setState({error_message:"Enter a Name!"})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,this.state.error_message?s.a.createElement(k.a,null,s.a.createElement(C.a,null,s.a.createElement(R.a,{variant:"danger"},this.state.error_message))):null,s.a.createElement(k.a,null,s.a.createElement(C.a,null,s.a.createElement(w.a.Label,null," Session Key: ")),s.a.createElement(C.a,null,s.a.createElement(w.a.Control,{onChange:function(t){return e.setState({session_key:t.target.value})}}))),s.a.createElement("br",null),s.a.createElement(k.a,null,s.a.createElement(C.a,null,s.a.createElement(w.a.Label,null," Player Name: ")),s.a.createElement(C.a,null,s.a.createElement(w.a.Control,{onChange:function(t){return e.setState({player_name:t.target.value})}}))),s.a.createElement("br",null),s.a.createElement(k.a,null,s.a.createElement(_.a,{onClick:function(){return e.joinGame()}},"Join Game")))}}]),a}(r.Component),j=Object(c.b)((function(e){return{}}),(function(e){return{setSession:function(t,a){return e({type:"set_session",payload:{key:t,db_id:a}})},setPlayer:function(t){return e({type:"set_player",payload:t})}}}))(B),O="ABCDEFGHJKLMNOPQRSTUVWXYZ98765432",G=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={player_name:"",error_message:""},r}return Object(i.a)(a,[{key:"hostGame",value:function(){var e=this;if(this.state.player_name){var t=O[Math.floor(Math.random()*O.length)]+O[Math.floor(Math.random()*O.length)]+O[Math.floor(Math.random()*O.length)]+O[Math.floor(Math.random()*O.length)];h.collection("sessions").add({players:[this.state.player_name],teams:{red:[],blue:[]},key:t,stage:"lobby",version:"classic",round:{id:0,words:[],board:[]}}).then((function(a){e.props.setSession(t,a.id),e.props.setPlayer(e.state.player_name),v.a.save("cn_session",{key:t,db_id:a.id}),v.a.save("cn_player",e.state.player_name)}))}else this.setState({error_message:"Enter a Name!"})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,this.state.error_message?s.a.createElement(k.a,null,s.a.createElement(C.a,null,s.a.createElement(R.a,{variant:"danger"},this.state.error_message))):null,s.a.createElement(k.a,null,s.a.createElement(C.a,null,s.a.createElement(w.a.Label,null," Player Name: ")),s.a.createElement(C.a,null,s.a.createElement(w.a.Control,{onChange:function(t){return e.setState({player_name:t.target.value})}}))),s.a.createElement(k.a,null,s.a.createElement(_.a,{onClick:function(){return e.hostGame()}},"Host Game")))}}]),a}(r.Component),S=Object(c.b)((function(e){return{topics:e.topics}}),(function(e){return{setRoom:function(t){return e({type:"set_topics",payload:t})},setSession:function(t,a){return e({type:"set_session",payload:{key:t,db_id:a}})},setPlayer:function(t){return e({type:"set_player",payload:t})}}}))(G),A=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={mode:""},r}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=v.a.load("cn_session"),t=v.a.load("cn_player");e&&e.key&&e.db_id&&t&&(this.props.setSession(e),this.props.setPlayer(t))}},{key:"genBody",value:function(){var e=this;switch(this.state.mode){case"join":return s.a.createElement(E.a.Body,null,s.a.createElement(j,null));case"host":return s.a.createElement(E.a.Body,null,s.a.createElement(S,null));default:return s.a.createElement(E.a.Body,null,s.a.createElement(k.a,null,s.a.createElement(C.a,null),s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"success",onClick:function(){return e.setState({mode:"join"})}},"Join")),s.a.createElement(C.a,null),s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"warning",onClick:function(){return e.setState({mode:"host"})}},"Host")),s.a.createElement(C.a,null)))}}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement(E.a,null,s.a.createElement(E.a.Header,null,"Code Names"),this.genBody(),s.a.createElement(E.a.Footer,null,""!==this.state.mode?s.a.createElement(_.a,{variant:"dark",onClick:function(){return e.setState({mode:""})}},"Back"):null)))}}]),a}(r.Component),M=Object(c.b)((function(e){return{}}),(function(e){return{setSession:function(t){return e({type:"set_session",payload:t})},setPlayer:function(t){return e({type:"set_player",payload:t})}}}))(A),F=a(39),V=a(28),x=a(23),T=a(45),D=a.n(T),L=a(46),P=a.n(L),I=a(47),U=a.n(I),N=a(48),H=a.n(N);function J(e){if(!e)return"";for(var t=e.toLowerCase().split(" "),a=0;a<t.length;a++)t[a]=t[a][0].toUpperCase()+t[a].slice(1);return t.join(" ")}var K={background:"#ffeecc",textAlign:"center"},W={background:"black",color:"white",textAlign:"center"},Q={background:"#ffb3b3",textAlign:"center"},X={background:"#99c2ff",textAlign:"center"},z=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={},r}return Object(i.a)(a,[{key:"genBoard",value:function(){var e=this,t=[],a=function(a){var r=s.a.createElement("tr",{key:"r"+a},[0,1,2,3,4].map((function(t){var r=K;return"A"===e.props.round.board[5*a+t]?r=W:"R"===e.props.round.board[5*a+t]?r=Q:"B"===e.props.round.board[5*a+t]&&(r=X),s.a.createElement("td",{id:4*a+t,style:r,key:"i"+(5*a+t)},s.a.createElement("strong",null,J(e.props.round.words[5*a+t])))})));t.push(r)};for(var r in[0,1,2,3,4])a(r);return t}},{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(k.a,{key:"you"},s.a.createElement(C.a,null,s.a.createElement(R.a,{variant:"red"===this.props.player_team?"danger":"primary"},(this.props.teams.red[this.props.round.id%this.props.teams.red.length]===this.props.player_name||this.props.teams.blue[this.props.round.id%this.props.teams.blue.length]===this.props.player_name?"Codemaster ":"Agent ")+J(this.props.player_name))),s.a.createElement(C.a,null,s.a.createElement(R.a,{variant:"dark"},"Red Score: "+this.props.score.red)),s.a.createElement(C.a,null,s.a.createElement(R.a,{variant:"dark"},"Blue Score: "+this.props.score.blue))),s.a.createElement(k.a,null,"red"===this.props.player_team?s.a.createElement(C.a,null,!(this.props.round.id%2)&&this.props.score.red>this.props.score.blue||this.props.round.id%2&&this.props.score.red>=this.props.score.blue?s.a.createElement(x.a,{src:P.a,style:{width:"100%"}}):s.a.createElement(x.a,{src:H.a,style:{width:"100%"}})):s.a.createElement(C.a,null,!(this.props.round.id%2)&&this.props.score.red>this.props.score.blue||this.props.round.id%2&&this.props.score.red>=this.props.score.blue?s.a.createElement(x.a,{src:U.a,style:{width:"100%"}}):s.a.createElement(x.a,{src:D.a,style:{width:"100%"}}))),s.a.createElement(k.a,{key:"scores"},s.a.createElement(C.a,null,s.a.createElement(V.a,{bordered:!0},s.a.createElement("tbody",null,this.genBoard())))))}}]),a}(r.Component),Y=Object(c.b)((function(e){return{player_name:e.player_name,player_team:e.player_team,players:e.players,teams:e.teams,round:e.round,score:e.score}}),(function(e){return{}}))(z);function Z(e){if(!e)return"";for(var t=e.toLowerCase().split(" "),a=0;a<t.length;a++)t[a]=t[a][0].toUpperCase()+t[a].slice(1);return t.join(" ")}var $={background:"white",textAlign:"center"},q={background:"#ffeecc",textAlign:"center"},ee={background:"black",color:"white",textAlign:"center"},te={background:"#ffb3b3",textAlign:"center"},ae={background:"#99c2ff",textAlign:"center"},re=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={},r}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;h.collection("sessions").doc(this.props.session.db_id).onSnapshot({includeMetadataChanges:!0},(function(t){t.exists?e.props.updateGame(t.data()):(v.a.remove("cn_player"),v.a.remove("cn_session"),e.props.clearGame())}))}},{key:"giveGuesses",value:function(e){h.collection("sessions").doc(this.props.session.db_id).update({guesses:e})}},{key:"genBody",value:function(){switch(this.props.stage){case"lobby":return this.lobby();case"game":return this.game();case"results":return s.a.createElement(Y,null);default:return null}}},{key:"genFooter",value:function(){var e=this;switch(this.props.stage){case"lobby":return this.props.players[0]===this.props.player_name?s.a.createElement(k.a,null,s.a.createElement(C.a,null,s.a.createElement(_.a,{onClick:function(){return e.startGame()}},"Start Game")),this.props.player_team?s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"red"===this.props.player_team?"primary":"danger",onClick:function(){return e.switchTeams()}},"Switch Teams")):null,s.a.createElement(C.a,null,s.a.createElement(_.a,{onClick:function(){h.collection("sessions").doc(e.props.session.db_id).delete()}},"End Game"))):s.a.createElement(k.a,null,this.props.player_team?s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"red"===this.props.player_team?"primary":"danger",onClick:function(){return e.switchTeams()}},"Switch Teams")):null,s.a.createElement(C.a,null,s.a.createElement(_.a,{onClick:function(){h.collection("sessions").doc(e.props.session.db_id).update({players:m.a.firestore.FieldValue.arrayRemove(e.props.player_name),"teams.red":m.a.firestore.FieldValue.arrayRemove(e.props.player_name),"teams.blue":m.a.firestore.FieldValue.arrayRemove(e.props.player_name)}).then((function(){v.a.remove("cn_player"),v.a.remove("cn_session"),e.props.clearGame()}))}},"Leave Game")));case"game":if(this.props.players[0]===this.props.player_name)return s.a.createElement(k.a,null,s.a.createElement(C.a,null,s.a.createElement(_.a,{onClick:function(){h.collection("sessions").doc(e.props.session.db_id).update({stage:"lobby"})}},"Return to Lobby")));break;case"results":return this.props.players[0]===this.props.player_name?s.a.createElement(k.a,null,s.a.createElement(C.a,null,s.a.createElement(_.a,{onClick:function(){return e.startGame()}},"Next Round")),s.a.createElement(C.a,null,s.a.createElement(_.a,{onClick:function(){h.collection("sessions").doc(e.props.session.db_id).update({stage:"lobby"})}},"Return to Lobby")),s.a.createElement(C.a,null,s.a.createElement(_.a,{onClick:function(){h.collection("sessions").doc(e.props.session.db_id).delete()}},"End Game"))):s.a.createElement(_.a,{onClick:function(){h.collection("sessions").doc(e.props.session.db_id).update({players:m.a.firestore.FieldValue.arrayRemove(e.props.player_name),"teams.red":m.a.firestore.FieldValue.arrayRemove(e.props.player_name),"teams.blue":m.a.firestore.FieldValue.arrayRemove(e.props.player_name)}).then((function(){v.a.remove("cn_player"),v.a.remove("cn_session"),e.props.clearGame()}))}},"Leave Game");default:return null}}},{key:"startGame",value:function(){if(this.props.players<4||this.props.teams.red.length<2||this.props.teams.blue.length<2)return null;for(var e=[];e.length<25;){var t=this.props.words[this.props.version][Math.floor(Math.random()*this.props.words[this.props.version].length)];e.includes(t)||e.push(t)}var a=Array(25).fill("C"),r=[],s=Math.floor(25*Math.random());for(a[s]="A",r.push(s);r.length<10;)s=Math.floor(25*Math.random()),r.includes(s)||(r.push(s),a[s]=this.props.round.id%2?"B":"R");for(;r.length<18;)s=Math.floor(25*Math.random()),r.includes(s)||(r.push(s),a[s]=this.props.round.id%2?"R":"B");h.collection("sessions").doc(this.props.session.db_id).update({version:this.props.version,stage:"game","round.words":e,"round.board":a,"round.guesses":Array(25).fill(""),turn:this.props.round.id%2?"B":"R",guesses:0,score:{red:0,blue:0},bonus:!1})}},{key:"switchTeams",value:function(){var e=this;"red"===this.props.player_team?h.collection("sessions").doc(this.props.session.db_id).update({"teams.red":m.a.firestore.FieldValue.arrayRemove(this.props.player_name),"teams.blue":m.a.firestore.FieldValue.arrayUnion(this.props.player_name)}).then((function(){e.props.setTeam("blue")})):h.collection("sessions").doc(this.props.session.db_id).update({"teams.blue":m.a.firestore.FieldValue.arrayRemove(this.props.player_name),"teams.red":m.a.firestore.FieldValue.arrayUnion(this.props.player_name)}).then((function(){e.props.setTeam("red")}))}},{key:"getGameVersions",value:function(){var e=[];for(var t in this.props.words)e.push(s.a.createElement("option",{key:t,label:Z(t),value:t}));return e}},{key:"lobby",value:function(){var e=this,t=[];if(this.props.player_team){for(var a in t.push(s.a.createElement(R.a,{variant:"info",key:"code"},"Room Code: "+this.props.session.key)),this.props.players[0]===this.props.player_name&&t.push(s.a.createElement(k.a,{key:"mode"},s.a.createElement(C.a,null,s.a.createElement(w.a.Label,null,s.a.createElement(R.a,{variant:"dark"},"Game Version:"))),s.a.createElement(C.a,null,s.a.createElement(w.a.Control,{as:"select",value:this.props.version,onChange:function(t){return e.props.changeVersion(t.target.value)}},this.getGameVersions())))),this.props.teams.red)t.push(s.a.createElement(F.a.Item,{variant:"danger",key:this.props.teams.red[a]},this.props.teams.red[a]));for(var r in this.props.teams.blue)t.push(s.a.createElement(F.a.Item,{variant:"primary",key:this.props.teams.blue[r]},this.props.teams.blue[r]))}else t.push(s.a.createElement(k.a,{key:"pick_team"},s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"danger",onClick:function(){h.collection("sessions").doc(e.props.session.db_id).update({"teams.red":m.a.firestore.FieldValue.arrayUnion(e.props.player_name)}).then((function(){e.props.setTeam("red")}))}},"Join RED Team")),s.a.createElement(_.a,{variant:"primary",onClick:function(){h.collection("sessions").doc(e.props.session.db_id).update({"teams.blue":m.a.firestore.FieldValue.arrayUnion(e.props.player_name)}).then((function(){e.props.setTeam("blue")}))}},"Join BLUE Team"),s.a.createElement(C.a,null)));return t}},{key:"game",value:function(){var e=this,t=[];return t.push(s.a.createElement(k.a,{key:"you"},s.a.createElement(C.a,null,s.a.createElement(R.a,{variant:"red"===this.props.player_team?"danger":"primary"},(this.props.teams.red[this.props.round.id%this.props.teams.red.length]===this.props.player_name||this.props.teams.blue[this.props.round.id%this.props.teams.blue.length]===this.props.player_name?"Codemaster ":"Agent ")+Z(this.props.player_name))))),t.push(s.a.createElement(k.a,{key:"scores"},s.a.createElement(C.a,null,s.a.createElement(R.a,{variant:"dark"},"Red Score: "+this.props.score.red)),s.a.createElement(C.a,null,s.a.createElement(R.a,{variant:"dark"},"Blue Score: "+this.props.score.blue)))),t.push(s.a.createElement(k.a,{key:"board+role"},s.a.createElement(C.a,null,s.a.createElement(V.a,{bordered:!0},s.a.createElement("tbody",null,this.genBoard()))))),t.push(s.a.createElement(k.a,{key:"players"},s.a.createElement(C.a,null,s.a.createElement(R.a,{variant:"dark"},0===this.props.guesses?("R"===this.props.turn?"Red":"Blue")+" Codemaster is giving a hint.":("R"===this.props.turn?"Red":"Blue")+" team is making guesses.")))),0!==this.props.guesses||("R"===this.props.turn?"red":"blue")!==this.props.player_team||this.props.teams.red[this.props.round.id%this.props.teams.red.length]!==this.props.player_name&&this.props.teams.blue[this.props.round.id%this.props.teams.blue.length]!==this.props.player_name||t.push(s.a.createElement("div",{key:"guesses"},("R"===this.props.turn&&this.props.teams.red[this.props.round.id%this.props.teams.red.length]===this.props.player_name||"B"===this.props.turn&&this.props.teams.blue[this.props.round.id%this.props.teams.blue.length]===this.props.player_name)&&0===this.props.guesses?s.a.createElement(k.a,null,"R"===this.props.turn&&this.props.score.red<(this.props.round.id%2?8:9)||"B"===this.props.turn&&this.props.score.blue<(this.props.round.id%2?9:8)?s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"secondary",onClick:function(){e.giveGuesses(1)}},"1")):null,"R"===this.props.turn&&this.props.score.red<(this.props.round.id%2?7:8)||"B"===this.props.turn&&this.props.score.blue<(this.props.round.id%2?8:7)?s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"secondary",onClick:function(){e.giveGuesses(2)}},"2")):null,"R"===this.props.turn&&this.props.score.red<(this.props.round.id%2?6:7)||"B"===this.props.turn&&this.props.score.blue<(this.props.round.id%2?7:6)?s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"secondary",onClick:function(){e.giveGuesses(3)}},"3")):null,"R"===this.props.turn&&this.props.score.red<(this.props.round.id%2?5:6)||"B"===this.props.turn&&this.props.score.blue<(this.props.round.id%2?6:5)?s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"secondary",onClick:function(){e.giveGuesses(4)}},"4")):null,"R"===this.props.turn&&this.props.score.red<(this.props.round.id%2?4:5)||"B"===this.props.turn&&this.props.score.blue<(this.props.round.id%2?5:4)?s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"secondary",onClick:function(){e.giveGuesses(5)}},"5")):null,"R"===this.props.turn&&this.props.score.red<(this.props.round.id%2?3:4)||"B"===this.props.turn&&this.props.score.blue<(this.props.round.id%2?4:3)?s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"secondary",onClick:function(){e.giveGuesses(6)}},"6")):null,"R"===this.props.turn&&this.props.score.red<(this.props.round.id%2?2:3)||"B"===this.props.turn&&this.props.score.blue<(this.props.round.id%2?3:2)?s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"secondary",onClick:function(){e.giveGuesses(7)}},"7")):null,"R"===this.props.turn&&this.props.score.red<(this.props.round.id%2?1:2)||"B"===this.props.turn&&this.props.score.blue<(this.props.round.id%2?2:1)?s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"secondary",onClick:function(){e.giveGuesses(8)}},"8")):null,"R"===this.props.turn&&this.props.score.red<(this.props.round.id%2?0:1)||"B"===this.props.turn&&this.props.score.blue<(this.props.round.id%2?1:0)?s.a.createElement(C.a,null,s.a.createElement(_.a,{variant:"secondary",onClick:function(){e.giveGuesses(9)}},"9")):null):null)),this.props.guesses>0&&(this.props.bonus?t.push(s.a.createElement(k.a,{key:"info_guesses"},s.a.createElement(C.a,null,s.a.createElement(R.a,{variant:"dark"},("R"===this.props.turn?"Red":"Blue")+" team has a Bonus Guess!")),("red"===this.props.player_team&&"R"===this.props.turn||"blue"===this.props.player_team&&"B"===this.props.turn)&&this.props.teams.red[this.props.round.id%this.props.teams.red.length]!==this.props.player_name&&this.props.teams.blue[this.props.round.id%this.props.teams.blue.length]!==this.props.player_name?s.a.createElement(C.a,null,s.a.createElement(_.a,{onClick:function(){var t="blue"===e.props.player_team?"R":"B";h.collection("sessions").doc(e.props.session.db_id).update({guesses:0,bonus:!1,turn:t})}},"Skip Bonus Guess")):null)):t.push(s.a.createElement(k.a,{key:"info_guesses"},s.a.createElement(C.a,null,s.a.createElement(R.a,{variant:"dark"},("R"===this.props.turn?"Red":"Blue")+" team has "+this.props.guesses+" guesses remaining."))))),t}},{key:"genBoard",value:function(){var e=this,t=[];if(this.props.teams.red[this.props.round.id%this.props.teams.red.length]===this.props.player_name||this.props.teams.blue[this.props.round.id%this.props.teams.blue.length]===this.props.player_name){var a=function(a){var r=s.a.createElement("tr",{key:"r"+a},[0,1,2,3,4].map((function(t){var r=q;return"A"===e.props.round.board[5*a+t]?r=ee:"R"===e.props.round.board[5*a+t]?r=te:"B"===e.props.round.board[5*a+t]&&(r=ae),s.a.createElement("td",{id:4*a+t,style:r,key:"i"+(5*a+t)},e.props.round.guesses[5*a+t]?s.a.createElement("del",null,Z(e.props.round.words[5*a+t])):s.a.createElement("strong",null,Z(e.props.round.words[5*a+t])))})));t.push(r)};for(var r in[0,1,2,3,4])a(r)}else{var n=function(a){var r=s.a.createElement("tr",{key:"r"+a},[0,1,2,3,4].map((function(t){var r=$;return e.props.round.guesses[5*a+t]&&(r="A"===e.props.round.board[5*a+t]?ee:"R"===e.props.round.board[5*a+t]?te:"B"===e.props.round.board[5*a+t]?ae:q),s.a.createElement("td",{id:5*a+t,style:r,key:"i"+(5*a+t),onClick:function(){("R"===e.props.turn&&"red"===e.props.player_team||"B"===e.props.turn&&"blue"===e.props.player_team)&&h.collection("sessions").doc(e.props.session.db_id).get().then((function(r){var s=r.data(),n="R"===s.turn?"R":"B";if(s.guesses>0&&!s.round.guesses[5*a+t]){switch(s.round.guesses[5*a+t]="X",s.guesses=s.guesses-1,s.round.board[5*a+t]){case"A":s.guesses=0,s.stage="results",s.round.id=s.round.id+1,"red"===e.props.player_team?s.score.red=-1:s.score.blue=-1;break;case"R":s.score.red+=1,"blue"===e.props.player_team&&(n="R",s.guesses=0,s.bonus=!1);break;case"B":s.score.blue+=1,"red"===e.props.player_team&&(n="B",s.guesses=0,s.bonus=!1);break;case"C":s.guesses=0,s.bonus=!1,n="R"===s.turn?"B":"R"}s.guesses<=0&&("red"===e.props.player_team&&"R"===s.round.board[5*a+t]||"blue"===e.props.player_team&&"B"===s.round.board[5*a+t])&&(s.bonus?(n="blue"===e.props.player_team?"R":"B",s.bonus=!1):(s.bonus=!0,s.guesses=1)),(s.score.red>=(e.props.round.id%2?8:9)||s.score.blue>=(e.props.round.id%2?9:8))&&(s.stage="results",s.round.id=s.round.id+1),h.collection("sessions").doc(e.props.session.db_id).update({guesses:s.guesses,"round.guesses":s.round.guesses,turn:n,score:s.score,stage:s.stage,"round.id":s.round.id,bonus:s.bonus})}}))}},s.a.createElement("strong",null,Z(e.props.round.words[5*a+t])))})));t.push(r)};for(var o in[0,1,2,3,4])n(o)}return t}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(E.a,null,s.a.createElement(E.a.Header,null,Z(this.props.stage)),s.a.createElement(E.a.Body,null,this.genBody()),s.a.createElement(E.a.Footer,null,this.genFooter())))}}]),a}(r.Component),se=Object(c.b)((function(e){return{session:e.session,player_name:e.player_name,player_team:e.player_team,stage:e.stage,players:e.players,teams:e.teams,words:e.words,version:e.version,round:e.round,turn:e.turn,guesses:e.guesses,score:e.score,bonus:e.bonus}}),(function(e){return{updateGame:function(t){return e({type:"update_game",payload:t})},clearGame:function(){return e({type:"clear_game",payload:null})},changeVersion:function(t){return e({type:"set_version",payload:t})},setTeam:function(t){return e({type:"set_team",payload:t})}}}))(re),ne=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={},r}return Object(i.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",integrity:"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh",crossOrigin:"anonymous"}),this.props.db_updated?s.a.createElement(s.a.Fragment,null,this.props.session.key&&this.props.session.db_id?s.a.createElement(se,null):s.a.createElement(M,null)):s.a.createElement(f,null))}}]),a}(r.Component),oe=Object(c.b)((function(e){return{db_updated:e.db_updated,session:e.session}}),(function(e){return{debug:function(){return e({type:"dump_store",payload:null})},load:function(){return e({type:"load_wordlist",payload:null})}}}))(ne);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var le=a(26),ie=a(21),pe=a.n(ie),ue={player_name:"",player_team:"",players:[],teams:{red:[],blue:[]},db_updated:!1,version:"classic",words:{},session:{key:"",db_id:""},stage:"",round:{id:0,words:"",board:""},turn:"",guesses:0,bonus:!1,score:{red:0,blue:0}},ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"dump_store":return console.log(e),e;case"set_words":var a=pe.a.cloneDeep(e);return a.words=t.payload,a.db_updated=!0,a;case"set_version":var r=pe.a.cloneDeep(e);return r.version=t.payload,r;case"set_session":var s=pe.a.cloneDeep(e);return s.session=t.payload,s;case"set_player":var n=pe.a.cloneDeep(e);return n.player_name=t.payload,n;case"set_team":var o=pe.a.cloneDeep(e);return o.player_team=t.payload,o;case"update_game":var l=pe.a.cloneDeep(e);for(var i in l.version=t.payload.version,l.stage=t.payload.stage,l.players=t.payload.players,l.round=t.payload.round,l.turn=t.payload.turn,l.guesses=t.payload.guesses,l.bonus=t.payload.bonus,l.score=t.payload.score,t.payload.players[t.payload.round.chameleon]===e.player_name?l.round.role="":l.round.role=t.payload.round.word,l.teams=t.payload.teams,t.payload.teams.red)e.player_name===t.payload.teams.red[i]&&(l.player_team="red");for(var p in t.payload.teams.blue)e.player_name===t.payload.teams.blue[p]&&(l.player_team="blue");return l;case"clear_game":var u=pe.a.cloneDeep(ue);return u;default:return e}};a(70);var de,me=(de=window.REDUX_INITIAL_DATA,Object(le.b)(ce,de));o.a.render(s.a.createElement(c.a,{store:me},s.a.createElement(oe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.b9e8f10a.chunk.js.map