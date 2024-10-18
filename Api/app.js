const apiURL = 'https://67023276b52042b542d96f2c.mockapi.io/posts'

function fetchPosts () {
     fetch(apiURL)
    .then((response =>response.json()))
    .then((data =>displyData(data)))
    .catch((error =>console.log('error',error)))
     
}
fetchPosts()


 function displyData(posts){
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML='';
    for(i=0 ;i<posts.length;i++){
        const postDiv =document.createElement('div');
        postDiv.className = "post";
        postDiv .innerHTML =
        `   <div class="post-header">
                            <img src="${posts.avater}" alt="Avatar">
                            
                            <div>
                                <h3>${posts[i].name}</h3>
                                <small>${posts[i].createdAt}</small>
                            </div>
                        </div>
                        <h3>${posts[i].title}</h3>
                        <p>${posts[i].body}</p>
                        <div class="actions">
                         <button onclick="updatePost(${posts[i].id})">Edit</button>
                            <button  onclick="deleteItem(${posts[i].id})">Delete</button>
                        </div>`
    
                        postsDiv.prepend(postDiv)
                        // let deleteBtn = postDiv.querySelector(".")
    }
    console.log(posts)
 }


//  ==================================create post=================


document.getElementById('createPostForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const name = document.getElementById('name').value
    const title = document.getElementById('title').value
    const avatar = document.getElementById('avatar').value
    const body = document.getElementById('body').value

    const newPost = {
        name: name,
        title: title,
        avatar: avatar,
        body: body,
        createdAt: new Date().toISOString()
    }

    console.log(newPost)

    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

}
)
// ================================Delete============================
let deleteItem = (id)=>{
    fetch(`${apiURL}/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(data => {
        alert(`${data.name} is successfully deleted`)
        console.log(data)
        fetchPosts()
      });

}
// ============================================================edit====================
function updatePost(id){
    fetch( `${apiURL}/${id}`)
    .then((response) => response.json()) 
    .then (data =>{
        console.log(data)
        document.getElementById("create-post").style.display="none"
        document.getElementById("update-post").style.display="block"
        document.getElementById("updatePostForm").name.value= data.name;
        document.getElementById("updatePostForm").avatar.value= data.avatar;
        document.getElementById("updatePostForm").body.value= data.body;
        document.getElementById("updatePostForm").title.value= data.title;
       
      
    } )
    .catch (error => console.log(error))

    document.getElementById("updatePostForm").addEventListener("submit", function (e) {
        e.preventDefault()
    console.log("hello i am running ",id)
    let name =  document.getElementById("updatePostForm").name.value ;
    let avatar=  document.getElementById("updatePostForm").avatar.value ;
    let body = document.getElementById("updatePostForm").body.value  ;
    let title= document.getElementById("updatePostForm").title.value  ;
    console.log("data",name,avatar,body,title)
    let updateData = {
        name:name,
        title:title,
        avatar:avatar,
        body:body,
        createdAt: new Date ().toISOString(),
    
        
    };
    console.log(updateData)
    fetch(`${apiURL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
        .then(response => response.json())
        .then(data => {
            alert(`${data.name} is successfully updated`)
            fetchPosts()
             document.getElementById("create-post").style.display="block"
        document.getElementById("update-post").style.display="none"

        })
        .catch(error => console.log(error))
    })
    
}


// document.getElementById("updatePostForm").addEventListener("submit", function (e) {
//     e.preventDefault()
// console.log("hello i am running ",id)
// let name =  document.getElementById("updatePostForm").name.value ;
// let avatar=  document.getElementById("updatePostForm").avatar.value ;
// let body = document.getElementById("updatePostForm").body.value  ;
// let title= document.getElementById("updatePostForm").title.value  ;
// console.log("data",name,avatar,body,title)
// let updateData = {
//     name:name,
//     title:title,
//     avatar:avatar,
//     body:body,
//     createdAt: new Data ().toISOString(),

    
// };

// fetch(`${apiURL}/${id}`, {
//     method: 'PUT',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(updateData)
// })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error))
// })


