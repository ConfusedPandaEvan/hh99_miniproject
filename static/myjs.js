
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
                let temp_html = `<div class="header1">오늘의 날씨: ${now_sky}</div> <br/>
                                       <div class="header2">현재 기온: ${now_weather}℃</div><br/>`
                $("#weather").append(temp_html)


            let text_sun = "맑음"
            let text_sun2 = "갬"
            let text_cloud = "구름"
            let text_dcloud = "흐림"
            let text_rain = "비"
            let text_rain2 = "소나기"
            let text_thunder = "뇌우"
            let text_snow = '눈'

            if (text_sun.indexOf(now_sky) != -1){
                document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1525490829609-d166ddb58678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (text_sun2.indexOf(now_sky) != -1){
                document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1525490829609-d166ddb58678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (text_cloud.indexOf(now_sky) != -1){
                document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1500491460312-c32fc2dbc751?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (text_dcloud.indexOf(now_sky) != -1){
                document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1500740516770-92bd004b996e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (text_rain.indexOf(now_sky) != -1){
                document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1603321544554-f416a9a11fcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (text_rain2.indexOf(now_sky) != -1){
                document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1603321544554-f416a9a11fcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (text_thunder.indexOf(now_sky) != -1){
                document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1511149755252-35875b273fd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else if (text_snow.indexOf(now_sky) != -1){
                document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1610805796563-8da423735fce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";
            }else{
                document.getElementById("main1").style.background = "url(https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80) no-repeat"
                document.getElementById("main1").style.backgroundSize = "cover";

            }
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

                let temp_html = `<div class="day-of-week">
                                    <p> ${day}</p>
                                    <p class="date">${date}</p> 
                                    <img src="https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt${wetrdc}.svg" alt="weather">
                                 </div>`
                $("#week").append(temp_html)


            }

             let high_today = rows[0]['highdg']
            let low_today = rows[0]['lowdg']
            let ttg = high_today - low_today
            let temp2_html = `<div class="header3">(일교차: ${ttg}℃)</div> <br/>`
            $("#weather").append(temp2_html)
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

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function get_posts(username) {
    if (username == undefined) {
        username = ""
    }
    $("#post-box").empty()
    $("#post-box2").empty()
    $.ajax({
        type: "GET",
        url: `/get_posts?username_give=${username}`,
        data: {},
        success: function (response) {
            if (response["result"] == "success") {


                let posts = response["posts"]

                for (let i = 0; i < posts.length; i++) {
                    let post = posts[i]
                    // If today's date equals to the post's date
                    if (post["date"].split("T")[0] == formatDate(new Date())) {
                        let html_temp = `<div class="today">
                                            <img class="today_image2" src="/static/${post['post_pic_real']}">
                                            </img>
                                            <img class="today_image1" src="/static/${post['post_pic_real2']}">
                                            </img>
                                            <br><br>
                                            <a>${post['username']}님의 빠숑</a>
                                            <p>기온 : <span id="temp"> ${post["weather"]}</span>℃</p>
                                            <p>${post['post_info']}</p>
                                        </div>`

                        $("#post-box").append(html_temp)
                    }
                    else {
                        let html_temp = `<div class="today">
                                            <img class="today_image2" src="/static/${post['post_pic_real']}">
                                            </img>
                                            <img class="today_image1" src="/static/${post['post_pic_real2']}">
                                            </img>
                                            <br><br>
                                            <a>${post['username']}님의 빠숑</a>
                                            <p>기온 : <span id="temp"> ${post["weather"]}</span>℃</p>
                                            <p>${post['post_info']}</p>
                                        </div>`

                        $("#post-box2").append(html_temp)
                    }
                }
            } 
        }
    })
}