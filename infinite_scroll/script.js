const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}


async function showPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}


function showLoading(){
    loading.classList.add('loader-show');
    setTimeout(function(){
        loading.classList.remove('loader-show');
        setTimeout(function(){
            page++;
            showPosts();
        },300);
    },1000);
}

function filterPosts(evt){
  const term=evt.target.value.toUpperCase();
  const posts=document.querySelectorAll('.post');
  
  posts.forEach( post => {
 const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

  
      if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
        post.style.display = 'flex';
      } else {
        post.style.display = 'none';
      }
    });
  }
  showPosts();
window.addEventListener('scroll',()=>{
    const x=document.documentElement;
    const {scrollTop,scrollHeight,clientHeight}=x;
    if(scrollTop+clientHeight>=scrollHeight-10){
        console.log("end");
        showLoading();
    }
   });


   
   
   filter.addEventListener('input', filterPosts);