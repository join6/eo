$(document).ready(function() {
    $.ajax({
        async: false,
        type: "GET",
        url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/top",
        dataType: "json",
        success: function(res) {
            var nn = "";
            var pr = "";
            var ch = "<option value='-1'>搜全站</option>";
            for (var arr = 0; arr < res.articles.length; arr++) {
                nn += "<li class='hot-1' id=" +
                    res.articles[arr].id +
                    ">" +
                    "<span class='fi-li'>-</span>" +
                    "<span class='fi-ti'>" +
                    res.articles[arr].title +
                    "</span>" +
                    "<span class='fi-pr' id=" +
                    res.articles[arr].pid +
                    ">" +
                    res.articles[arr].product_name +
                    "</span>" +
                    "</li>";
            }
            for (var arr = 0; arr < res.products.length; arr++) {
                pr += "<div class='product-items' id=" +
                    res.products[arr].id +
                    ">" +
                    "<div class='icon-pr'>" +
                    "<img src=" +
                    res.products[arr].img +
                    ">" +
                    "</div>" +
                    "<div class='product-text'>" +
                    "<span class='text'>" +
                    res.products[arr].name +
                    "</span>" +
                    "<span class='text-detail'" +
                    ">" +
                    res.products[arr].text +
                    "</span>" +
                    " </div>" +
                    "</div>";
                ch += "<option value=" +
                    res.products[arr].id +
                    ">" +
                    res.products[arr].name +
                    "</option>";
            }
            $(".hotQuestion").append(nn);
            $(".productList-bg").append(pr);
            $(".select-area").append(ch);
        },
        error: function() {
            alert("error");
        }
    });
    $(".hot-1").click(function(e) {
        var a1 = $(".hot-1").attr("id");
        var a2 = $(".fi-pr").attr("id");
        window.location.href("products.html?id=" + a1 + "&productId=" + a2);
    });
    $(".product-items").click(function(e) {
        var a = $(".product-items").attr("id");
        window.location.href("products.html?id=0&productId=" + a);
    });
    $(".sousuo-btn").click(function(e) {
        window.event.returnValue = false;
        var a = $(".select-area").children('option:selected').val();
        var k = $("input:text[class='search-input']").val();
        window.location.href("search.html?keywords=" + k + "&productId=" + a);

    });
    $("#login").click(function(e) {
        document.getElementById('shade').classList.remove('hide');
        document.getElementById('modal').classList.remove('hide');
        document.getElementsByClassName('base-container').css("height", "500px");
    });
    $(".close").click(function(e) {
        document.getElementById('shade').classList.add('hide');
        document.getElementById('modal').classList.add('hide');
        $("#input-top-loginInput").val("");
        $("#input-bottom-loginInput").val("");
    });
    $("#BSignIn").click(function(e) {
        $.ajax({
            type: "POST",
            url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/admin/login?account=" + $("#input-top-loginInput").val() + "&password=" + $("#input-bottom-loginInput").val(),
            dataType: "json",
            success: function(data) {
                if (data.result == 1) {
                    window.location.href = "back.html";
                } else {
                    alert("账户或密码错误");
                }
            },
            error: function() {
                alert("error");
            }
        })
    });
});