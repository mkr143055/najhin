(() => {
const D=window.NAJHIN_DATA||{levels:[],lessons:[],exercises:[],devoirs:[],exams:[]};
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const level=id=>D.levels.find(x=>x.id===id);
const lesson=s=>D.lessons.find(x=>x.slug===s);
const pathLevel=id=>({tronc:"tronc-commun.html", "1bac":"1ere-bac.html","2bac":"2eme-bac.html"})[id]||"index.html";
const rel=(p)=>p||"#";
const lurl=l=>`../cours/${l.slug}.html`;
const exurl=e=>`../exercices/${e.slug}.html`;
function initShell(){
 const saved=localStorage.getItem("najhin-theme")||"light";document.documentElement.dataset.theme=saved;
 $("themeToggle")?.addEventListener("click",()=>{let t=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=t;localStorage.setItem("najhin-theme",t);$("themeToggle").textContent=t==="dark"?"☀":"☾";});
 if($("themeToggle"))$("themeToggle").textContent=saved==="dark"?"☀":"☾";
 $("menuToggle")?.addEventListener("click",()=>{$("mobileNav")?.classList.toggle("open");});
 $("yearNow")&&($("yearNow").textContent=new Date().getFullYear());
 const globalSearch=$("globalSearch"), results=$("globalSearchResults");
 if(globalSearch&&results){globalSearch.addEventListener("input",()=>{let q=globalSearch.value.trim().toLowerCase();if(!q){results.classList.remove("show");return;}let hits=D.lessons.filter(x=>(x.title+" "+x.description+" "+x.levelName).toLowerCase().includes(q)).slice(0,6);results.innerHTML=hits.map(x=>`<a href="${lurl(x)}"><b>${esc(x.title)}</b><small class="muted"> · ${esc(x.levelName)}</small></a>`).join("")||'<div class="sample-note">Aucun résultat trouvé.</div>';results.classList.add("show");});document.addEventListener("click",e=>{if(!results.contains(e.target)&&e.target!==globalSearch)results.classList.remove("show");});}
}
function lessonCard(l, prefix=""){
 return `<article class="card"><div><span class="tag">${esc(l.levelName)}</span></div><h3>${esc(l.title)}</h3><p class="card-description">${esc(l.description)}</p><div class="card-foot"><span>${l.exercises.length} exercices</span><a href="${prefix}cours/${l.slug}.html">Consulter le cours →</a></div></article>`;
}
function initHome(){
 if(!$("homeLevels"))return;
 $("homeLevels").innerHTML=D.levels.map(l=>`<a class="level-card" href="${l.slug}.html"><div class="level-icon">${esc(l.short)}</div><span class="eyebrow">${l.tracks.length} filières</span><h3>${esc(l.name)}</h3><p>${esc(l.description)}</p><b class="text-link">Accéder au niveau →</b></a>`).join("");
 $("homeLessons").innerHTML=D.lessons.slice(0,6).map(l=>lessonCard(l,"")).join("");
}
function initLevel(){
 const id=document.body.dataset.level;if(!id)return;const lv=level(id);if(!lv)return;
 $("levelTitle").textContent=lv.name;$("levelDescription").textContent=lv.description;$("levelShort").textContent=lv.short;
 $("trackFilter")&&lv.tracks.forEach(t=>$("trackFilter").add(new Option(t,t)));
 const draw=()=>{let q=($("lessonSearch")?.value||"").toLowerCase(),tr=$("trackFilter")?.value||"all";let arr=D.lessons.filter(l=>l.level===id&&(tr==="all"||l.tracks.includes(tr))&&(l.title+" "+l.description+" "+l.topics.join(" ")).toLowerCase().includes(q));$("lessonGrid").innerHTML=arr.map(l=>lessonCard(l,"")).join("")||'<div class="empty">Aucun chapitre ne correspond à votre recherche.</div>';$("resultCount").textContent=`${arr.length} chapitre(s)`;};
 $("lessonSearch")?.addEventListener("input",draw);$("trackFilter")?.addEventListener("change",draw);draw();
 $("levelDevoirs").innerHTML=D.devoirs.filter(x=>x.level===id).map(d=>`<article class="card assessment-card"><span class="tag">${esc(lv.name)} · ${esc(d.track)}</span><h3>${esc(d.title)}</h3><p>${esc(d.date)}</p><div class="action-row"><a class="btn btn-primary btn-small" href="devoirs.html#${d.slug}">Voir le devoir</a></div></article>`).join("")||'<div class="empty">Les devoirs de ce niveau seront ajoutés prochainement.</div>';
}
function initCourse(){
 const slug=document.body.dataset.lesson;if(!slug)return;const l=lesson(slug);if(!l){$("courseTitle").textContent="Cours introuvable";return;}
 document.title=l.title+" | Najhin.ma";$("courseTitle").textContent=l.title;$("courseDescription").textContent=l.description;$("courseLevel").textContent=l.levelName;$("courseLevel").href="../"+pathLevel(l.level);
 $("courseTopics").innerHTML=l.topics.map(t=>`<li>${esc(t)}</li>`).join("");
 $("coursePdf").src="../"+l.pdf;$("coursePdfDownload").href="../"+l.pdf;
 $("courseVideo").src="../"+l.video;
 $("courseExerciseGrid").innerHTML=l.exercises.map(e=>`<article class="card"><span class="tag">${esc(e.difficulty)} · Exercice test</span><h3>${esc(e.title)}</h3><p>${esc(e.statement)}</p><div class="card-foot"><span>Énoncé + correction</span><a href="../exercices/${e.slug}.html">Ouvrir →</a></div></article>`).join("");
 const done=JSON.parse(localStorage.getItem("najhin-done")||"[]");let progress=l.exercises.filter(e=>done.includes(e.slug)).length; $("courseProgress").textContent=`${progress}/${l.exercises.length} exercices terminés`;$("courseProgressBar").style.width=(100*progress/l.exercises.length)+"%";
 document.querySelectorAll("[data-tab]").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b===btn));document.querySelectorAll(".tab-panel").forEach(p=>p.classList.toggle("active",p.id===btn.dataset.tab));}));
}
function initExercise(){
 const slug=document.body.dataset.exercise;if(!slug)return;const e=D.exercises.find(x=>x.slug===slug);if(!e){$("exerciseTitle").textContent="Exercice introuvable";return;}const l=lesson(e.lesson);
 document.title=e.title+" | Najhin.ma";$("exerciseTitle").textContent=e.title;$("exerciseLesson").textContent=l.title;$("exerciseLesson").href="../cours/"+l.slug+".html";$("exerciseLevel").textContent=l.levelName;$("exerciseStatement").textContent=e.statement;$("exerciseAnswer").textContent=e.answer;$("statementImage").src="../"+e.statementImage;$("correctionImage").src="../"+e.correctionImage;
 $("statementPdf").href="../"+e.statementPdf;$("correctionPdf").href="../"+e.correctionPdf;
 $("showAnswer").addEventListener("click",()=>{$("answerBox").classList.toggle("show");$("showAnswer").textContent=$("answerBox").classList.contains("show")?"Masquer la correction":"Afficher la correction";});
 $("markDone").addEventListener("click",()=>{let done=JSON.parse(localStorage.getItem("najhin-done")||"[]");if(!done.includes(e.slug))done.push(e.slug);localStorage.setItem("najhin-done",JSON.stringify(done));$("markDone").textContent="✓ Exercice terminé";$("markDone").classList.add("btn-soft");});
}
function initDevoirs(){
 if(!$("devoirGrid"))return;const draw=()=>{let lv=$("devoirLevel").value;let arr=D.devoirs.filter(d=>lv==="all"||d.level===lv);$("devoirGrid").innerHTML=arr.map(d=>`<article class="card assessment-card" id="${d.slug}"><span class="tag">${esc(level(d.level).name)} · ${esc(d.track)}</span><h3>${esc(d.title)}</h3><p>${esc(d.date)} · Document de démonstration</p><div class="action-row"><a class="btn btn-primary btn-small" href="${d.statement}">Sujet PDF</a><a class="btn btn-outline btn-small" href="${d.correction}">Correction PDF</a></div></article>`).join("")||'<div class="empty">Aucun devoir trouvé.</div>';};$("devoirLevel").addEventListener("change",draw);draw();
}
function initExams(){
 if(!$("examGrid"))return;const years=[...new Set(D.exams.map(x=>x.year))].sort().reverse();years.forEach(y=>$("examYear").add(new Option(y,y)));
 const draw=()=>{let y=$("examYear").value,s=$("examSession").value;let arr=D.exams.filter(e=>(y==="all"||e.year===y)&&(s==="all"||e.session===s));$("examGrid").innerHTML=arr.map(e=>`<article class="card assessment-card"><span class="tag">${e.year} · ${esc(e.session)}</span><h3>${esc(e.title)}</h3><p>${esc(e.level)} · ${esc(e.track)} · ${e.exercises.length} exercices</p><div class="action-row"><a class="btn btn-primary btn-small" href="examen.html?exam=${e.slug}">Consulter l'examen →</a><a class="btn btn-outline btn-small" href="${e.full}">Sujet complet PDF</a></div></article>`).join("")||'<div class="empty">Aucun examen pour ces filtres.</div>';};$("examYear").addEventListener("change",draw);$("examSession").addEventListener("change",draw);draw();
}
function initExamDetail(){
 const slug=new URLSearchParams(location.search).get("exam");if(!slug)return;const e=D.exams.find(x=>x.slug===slug);if(!e){$("examTitle").textContent="Examen introuvable";return;}
 $("examTitle").textContent=e.title;$("examMeta").textContent=`${e.level} · ${e.track} · ${e.year} · ${e.session}`;$("fullExam").href=e.full;
 $("examExerciseList").innerHTML=e.exercises.map((x,i)=>`<article class="exam-exercise"><span class="tag">Exercice ${i+1} · ${esc(x.topic)}</span><h3>${esc(x.title)}</h3><div class="action-row"><a class="btn btn-primary btn-small" href="${x.statement}">Énoncé PDF</a><a class="btn btn-outline btn-small" href="${x.correction}">Correction PDF</a></div></article>`).join("");
}
initShell();initHome();initLevel();initCourse();initExercise();initDevoirs();initExams();initExamDetail();
})();