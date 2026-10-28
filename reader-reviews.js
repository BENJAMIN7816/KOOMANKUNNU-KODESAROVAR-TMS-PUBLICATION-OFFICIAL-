// Only privacy-filtered review assets are shipped with this website.
const readerReviews={
 code:[
  {id:'code-1',source:'WhatsApp',pages:['code-1']},
  {id:'code-2',source:'Instagram',pages:['code-2']},
  {id:'code-3',source:'Instagram',pages:['code-3']},
  {id:'code-4',source:'Instagram',pages:['code-4','code-4-1','code-4-2','code-4-3']},
  {id:'code-5',source:'Instagram',pages:['code-5']},
  {id:'code-6',source:'Instagram',pages:['code-6']},
  {id:'code-7',source:'Instagram',pages:['code-7','code-7-1','code-7-2']},
  {id:'code-8',source:'Instagram · Screenshot',pages:['code-8']},
  {id:'code-9',source:'WhatsApp',pages:['code-9']}
 ],
 kooman:[
  {id:'kooman-1',source:'WhatsApp',pages:['kooman-1']},
  {id:'kooman-3',source:'WhatsApp',pages:['kooman-3']},
  {id:'kooman-4',source:'Instagram',pages:['kooman-4']},
  {id:'kooman-5',source:'Instagram',pages:['kooman-5']},
  {id:'kooman-6',source:'Instagram',pages:['kooman-6']},
  {id:'kooman-7',source:'Instagram',pages:['kooman-7']},
  {id:'kooman-8',source:'Instagram',pages:['kooman-8']},
  {id:'kooman-9',source:'WhatsApp',pages:['kooman-9']},
  {id:'kooman-10',source:'Instagram',pages:['kooman-10']}
 ]
};
function screenshotCards(bookId,all=false){
 const rows=readerReviews[bookId];
 return `<div class="reader-grid">${(all?rows:rows.slice(0,3)).map((r,i)=>`<button class="reader-card" type="button" data-read-review="${r.id}" data-review-book="${bookId}" aria-label="Read ${books.find(b=>b.id===bookId).english} review ${i+1}, ${r.pages.length} page${r.pages.length>1?'s':''}"><span class="reader-image"><img src="assets/reviews/${r.pages[0]}.jpg" alt="${r.source} reader review screenshot" loading="lazy"><span class="reader-open">വലുതായി വായിക്കുക ↗</span></span><span class="reader-meta"><span><small>${r.source}</small><strong>Review ${String(i+1).padStart(2,'0')}</strong></span><span class="page-count">${r.pages.length} ${r.pages.length===1?'page':'pages'}</span></span></button>`).join('')}</div>`;
}
function screenshotSection(bookId){
 const b=books.find(x=>x.id===bookId);
 return `<section class="section reader-section" id="${bookId}-user-reviews"><div class="heading"><div><p class="eyebrow">${b.english.toUpperCase()} · USER REVIEWS</p><h2>${b.name}</h2><p class="ml">വായനക്കാരുടെ അഭിപ്രായങ്ങൾ</p></div><p class="muted">WhatsApp & Instagram<br>വ്യക്തിഗത വിവരങ്ങൾ മറച്ചിരിക്കുന്നു.</p></div>${screenshotCards(bookId)}<a class="button reader-all" href="reviews.html?book=${bookId}">എല്ലാ റിവ്യൂകളും കാണുക <span>${readerReviews[bookId].length} ↗</span></a></section>`;
}
const homeReviews=document.querySelector('#user-reviews');
if(homeReviews)homeReviews.innerHTML=screenshotSection('kooman')+screenshotSection('code');
if(detail){const id=new URLSearchParams(location.search).get('book');detail.insertAdjacentHTML('beforeend',screenshotSection(id==='kooman'?'kooman':'code'));}
const gallery=document.querySelector('#review-gallery');
if(gallery){
 const id=new URLSearchParams(location.search).get('book')==='kooman'?'kooman':'code';
 const b=books.find(x=>x.id===id);
 document.title=b.english+' — User Reviews | TMS Publications';
 gallery.innerHTML=`<section class="section reader-section"><a class="textlink" href="book.html?book=${id}">← ${b.english}</a><div class="heading gallery-heading"><div><p class="eyebrow">USER REVIEWS · ${readerReviews[id].length} REVIEWS</p><h1>${b.name}</h1><p class="ml">വായനക്കാരുടെ അഭിപ്രായങ്ങൾ</p></div><p class="muted">സ്ക്രീൻഷോട്ടിൽ തൊട്ട് മുഴുവൻ റിവ്യൂ വായിക്കാം.<br>തുടർപേജുകൾ ഒരുമിച്ച് ക്രമപ്പെടുത്തിയിരിക്കുന്നു.</p></div><nav class="review-book-nav" aria-label="Choose book reviews"><a href="reviews.html?book=kooman" ${id==='kooman'?'aria-current="page"':''}>കൂമൻകുന്ന്</a><a href="reviews.html?book=code" ${id==='code'?'aria-current="page"':''}>കോഡ് സരോവർ</a></nav>${screenshotCards(id,true)}<p class="fine privacy-note">വായനക്കാരുടെ വ്യക്തിഗത വിവരങ്ങൾ മറച്ചിരിക്കുന്നു. അഭിപ്രായങ്ങളുടെ ഉള്ളടക്കം മാറ്റിയിട്ടില്ല.</p></section>`;
}
document.body.insertAdjacentHTML('beforeend',`<dialog id="reader-dialog" aria-labelledby="reader-title"><div class="reader-toolbar"><div><p class="eyebrow" id="reader-book-name"></p><h3 id="reader-title"></h3></div><button type="button" class="reader-close" aria-label="Close review">×</button></div><div id="reader-pages"></div><div class="reader-bottom"><button type="button" id="previous-review">← Previous review</button><button type="button" id="next-review">Next review →</button></div></dialog>`);
const readerDialog=document.querySelector('#reader-dialog');
let activeReviewBook='code',activeReviewIndex=0;
function renderFullReview(){
 const list=readerReviews[activeReviewBook],r=list[activeReviewIndex];
 document.querySelector('#reader-book-name').textContent=books.find(x=>x.id===activeReviewBook).english+' · USER REVIEWS';
 document.querySelector('#reader-title').textContent=`Review ${String(activeReviewIndex+1).padStart(2,'0')} / ${list.length}`;
 document.querySelector('#reader-pages').innerHTML=r.pages.map((p,i)=>`<figure class="reader-page"><figcaption>${r.pages.length>1?`ഭാഗം ${i+1} / ${r.pages.length}`:r.source}</figcaption><img src="assets/reviews/${p}.jpg" alt="Review ${activeReviewIndex+1}, page ${i+1} of ${r.pages.length}" ${i>0?'loading="lazy"':''}></figure>`).join('');
 document.querySelector('#previous-review').disabled=activeReviewIndex===0;
 document.querySelector('#next-review').disabled=activeReviewIndex===list.length-1;
 readerDialog.scrollTop=0;
}
document.addEventListener('click',e=>{
 const trigger=e.target.closest('[data-read-review]');if(!trigger)return;
 activeReviewBook=trigger.dataset.reviewBook;
 activeReviewIndex=readerReviews[activeReviewBook].findIndex(r=>r.id===trigger.dataset.readReview);
 renderFullReview();readerDialog.showModal();document.body.classList.add('reading-review');
});
document.querySelector('.reader-close').onclick=()=>readerDialog.close();
readerDialog.addEventListener('close',()=>document.body.classList.remove('reading-review'));
readerDialog.addEventListener('click',e=>{if(e.target!==readerDialog)return;const b=readerDialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)readerDialog.close();});
document.querySelector('#previous-review').onclick=()=>{if(activeReviewIndex>0){activeReviewIndex--;renderFullReview();}};
document.querySelector('#next-review').onclick=()=>{if(activeReviewIndex<readerReviews[activeReviewBook].length-1){activeReviewIndex++;renderFullReview();}};
