function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
$(document).ready(function() {
    var keywords = getUrlParam("keywords");
    var productId = getUrlParam("productId");
    $.ajax({
        async: false,
        type: "GET",
        url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/search" + window.location.search,
        dataType: "json",
        success: function(res) {
            var list = "";
            for (var i = 0; i < res.product.length; i++) {
                list += "<div class='groupList-li-bg'>" +
                    "<div class='groupList-li' id=" +
                    res.product[i].id +
                    ">" +
                    "<span class = 'list-name'> " +
                    res.product[i].name +
                    "</span>" +
                    "<span class = 'list-num'>" +
                    " (" +
                    res.product[i].count +
                    ")" +
                    "</span> </div> </div> ";
            }
            var tips = 0;
            for (var i = 0; i < res.product.length; i++) {
                if (productId == res.product[i].id)
                    tips = i;
            }
            var nr = "<span class='re-title'>" + "搜索到" + "<b>" +
                res.product[tips].count +
                "</b>" + "个关于" + "<b>" +
                keywords +
                "</b>" + "的结果" + "</span>";
            for (var i = 0; i < res.article.length; i++) {
                nr += "<div class='result-items' id=" +
                    res.article[i].pid +
                    ">" +
                    "<div class='result-title' id=''" +
                    res.article[i].id +
                    ">" +
                    res.article[i].title +
                    "</div>" +
                    "<div class='result-nr'>" +
                    res.article[i].content +
                    "</div>" +
                    "<div class='result-list'>" +
                    res.article[i].productList +
                    "</div></div>";
            }
            $(".groupList-ul").append(list);
            $(".searchResult").append(nr);
            document.getElementById(productId).classList.add('li-choose');
        }
    });
    $(".result-title").click(function(e) {
        var a1 = $(".result-title").attr("id");
        var a2 = $(".result-items").attr("id");
        window.location.href("products.html?id=" + a1 + "&productId=" + a2);

    });
    $(".groupList-li").click(function(e) {
        var a1 = $(".groupList-li").attr("id");
        document.location.href("search.html?keywords=" + keywords + "&productId=" + a1);
    });
    $(".sousuo-btn-s").click(function(e) {
        window.event.returnValue = false;
        var k = $("input:text[class='search-input']").val();
        window.location.href("search.html?keywords=" + k + "&productId=-1");
    });

})