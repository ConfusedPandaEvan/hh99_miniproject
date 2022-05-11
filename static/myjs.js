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
                let highdg = rows[i]['highdg']
                let lowdg = rows[i]['lowdg']
                let wetrdc = rows[i]['wetrdc_pm']

                let temp_html = `<a><p> ${day}</p><p>${date}</p> <img src="https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt${wetrdc}.svg" alt="weather"></a>`
                $("#week").append(temp_html)


            }
            let high_today = rows[1]['highdg']
            let low_today = rows[1]['lowdg']
            let ttg = high_today - low_today
            let temp2_html = `일교차: ${ttg}℃`


            $("#ttg").append(temp2_html)
        }
    })

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