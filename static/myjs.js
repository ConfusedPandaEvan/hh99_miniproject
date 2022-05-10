function post() {
    let name = $('#input-name').val()
    let file = $('#input-pic')[0].files[0]
    let about = $("#textarea-about").val()
    let today = new Date().toISOString()
    // Today_climate Goes here
    let form_data = new FormData()
    form_data.append("file_give", file)
    form_data.append("name_give", name)
    form_data.append("about_give", about)
    form_data.append("date_give", today)
    console.log(name, file, about, form_data)

    $.ajax({
        type: "POST",
        url: "/posting",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response["result"] == "success") {
                alert(response["msg"])
                $("#modal-post").removeClass("is-active")
                window.location.reload()

            } else
                alert("cool")
        }
    });
}

function get_posts(username) {
    if (username == undefined) {
        username = ""
    }
    $("#post-box").empty()
    $.ajax({
        type: "GET",
        url: `/get_posts?username_give=${username}`,
        data: {},
        success: function (response) {
            if (response["result"] == "success") {

                let posts = response["posts"]

                for (let i = 0; i < posts.length; i++) {
                    let post = posts[i]
                    let time_post = new Date(post["date"])
                    // let time_before = time2str(time_post)


                    // let html_temp = `<div class="box" id="${post["_id"]}">
                    //                     <article class="media">
                    //                         <div class="media-left">
                    //                             <a class="image is-64x64" href="/user/${post['username']}">
                    //                                 <img class="is-rounded" src="/static/${post['profile_pic_real']}"
                    //                                      alt="Image">
                    //                             </a>
                    //                         </div>
                    //                         <div class="media-content">
                    //                             <div class="content">
                    //                                 <p>
                    //                                     <strong>${post['profile_name']}</strong> <small>@${post['username']}</small> <small>${time_before}</small>
                    //                                     <br>
                    //                                     ${post['comment']}
                    //                                 </p>
                    //                             </div>
                    //                             <nav class="level is-mobile">
                    //                                 <div class="level-left">
                    //                                     <a class="level-item is-sparta" aria-label="heart" onclick="toggle_like('${post['_id']}', 'heart')">
                    //                                         <span class="icon is-small"><i class="fa ${class_heart}"
                    //                                                                        aria-hidden="true"></i></span>&nbsp;<span class="like-num">${num2str(count_heart)}</span>
                    //                                     </a>
                    //                                 </div>
                    //
                    //                             </nav>
                    //                         </div>
                    //                     </article>
                    //                 </div>`
                    let html_temp = `<div class="today">
                                        <img class="today_image2" src="/static/${post['post_pic_real']}">
                                        </img>
                                        <div class="today_image1">
                                        </div>
                                        <a>${post['username']}님의 빠숑</a>
                                        <p>기온 : <span id="temp"> 21.3</span>℃</p>
                                        <p>${post['post_info']}</p>
                                    </div>`
                    $("#post-box").append(html_temp)
                }
            } else console.log(wtf)
        }
    })
}
