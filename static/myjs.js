$(document).ready(function () {
    show_weather()
    show_week_weather()
})

function show_weather() {
    $.ajax({
        type: 'GET',
        url: '/weather',
        data: {},
        success: function (response) {
            let rows = response['weathers']
            for (let i = 0; i < rows.length; i++) {
                let now_weather = rows[i]['now_weather']
                let now_sky = rows[i]['now_sky']
                let temp_html = `오늘의 날씨: ${now_sky} <br/>
                                       현재 기온: ${now_weather}℃<br/>`
                $("#weather").append(temp_html)

            }
        }
    })
}

function show_week_weather() {
    $.ajax({
        type: 'GET',
        url: '/weekweather',
        data: {},
        success: function (response) {
            let rows = response['weekweathers']

            for (let i = 0; i < 7; i++) {
                let day = rows[i]['day']
                let date = rows[i]['date']
                let wetrdc = rows[i]['wetrdc_pm']

                let temp_html = `<a><p> ${day}</p><p>${date}</p> <img src="https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt${wetrdc}.svg" alt="weather"></a>`
                $("#week").append(temp_html)


            }
            let high_today = rows[0]['highdg']
            let low_today = rows[0]['lowdg']
            let ttg = high_today - low_today
            let temp2_html = `일교차: ${ttg}℃`
            $("#ttg").append(temp2_html)
            let weather_pic = rows[0]['wetrdc_pm']

            if (weather_pic == 1) {
                 document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1525490829609-d166ddb58678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (weather_pic == 5) {
                 document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1500491460312-c32fc2dbc751?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (weather_pic == 7) {
                 document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1500740516770-92bd004b996e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (weather_pic == 9) {
                 document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1603321544554-f416a9a11fcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (weather_pic == 12) {
                 document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1610805796563-8da423735fce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (weather_pic == 18) {
                 document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1511149755252-35875b273fd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else {
                 document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1568816756611-aaf3d3bd0ef4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1440&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";


        }
        },})
}

function post() {
    let name = $('#input-name').val()
    let file = $('#input-pic')[0].files[0]
    let file2 = $('#input-pic2')[0].files[0]
    let about = $("#textarea-about").val()
    let today = new Date().toISOString()
    // Today_climate Goes here
    let form_data = new FormData()
    form_data.append("file_give", file)
    form_data.append("file_give2", file2)
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

function sign_out() {
            $.removeCookie('mytoken', {path: '/'});
            alert('로그아웃!')
            window.location.href = "/login"
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
                                        <img class="today_image1" src="/static/${post['post_pic_real2']}">
                                        </img>
                                        <br><br>
                                        <a>${post['username']}님의 빠숑</a>
                                        <p>기온 : <span id="temp"> 21.3</span>℃</p>
                                        <p>${post['post_info']}</p>
                                    </div>`
                    $("#post-box").append(html_temp)
                }
            } 
        }
    })
}