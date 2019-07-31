function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
$(document).ready(function() {
    var artcleId = getUrlParam("id");
    var productId = getUrlParam("productId");
    if (artcleId == 0) {
        $.ajax({
            async: false,
            type: "GET",
            url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/products?pid=" + productId,
            dataType: "json",
            success: function(res) {
                var list = "<div class='productsList-li-bg'>" + "<div class='productsList-li-ti'>" +
                    "<img class='list-ti-img' src=" + res.img + ">" +
                    " <span class='list-ti'>" + "STUDIO</span>" + "</div></div>";
                for (var i = 0; i < res.category.length; i++) {
                    list += "<div class='productsList-li-bg id='>" +
                        res.category[i].cid +
                        "<div class='productsList - li'>" +
                        "<span class = 'list-name' >" +
                        res.category[i].name +
                        "</span> </div> </div>";
                }
                $(".productsList-ul").append(list);
                var content = "<div class='product-all'>" + "<div class='product-hot'>" +
                    "<h2 class='ar-ti'>" + "热门教程" + "</h2>" +
                    "<ul class='article-list'>";
                for (var i = 0; i < res.articles.length; i++) {
                    content += "<li class='articl-content'id=" +
                        res.articles[i].id +
                        ">" +
                        res.articles[i].title +
                        "</li>";
                }
                content += "</ul></div>" + "<div class='product-common'>" +
                    "<h2 class='ar-ti'>" + "常见提问" + "</h2>" +
                    "<ul class='article-list'>";
                for (var i = 0; i < res.article.length; i++) {
                    content += "<li class='articl-content'id=" +
                        res.article[i].id +
                        ">" +
                        res.article[i].title +
                        "</li>";
                }
                content += "</ul></div></div>";
                $(".articles").append(content);
            }
        })
    } else {
        $.ajax({
            async: false,
            type: "GET",
            url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/get?id=" + artcleId + "&pid=" + productId,
            dataType: "json",
            success: function(res) {
                var list = "<div class='productsList-li-bg' id = 0>" + "<div class='productsList-li-ti'>" +
                    "<img class='list-ti-img' src=" + res.img + ">" +
                    " <span class='list-ti'>" + res.name + "</span>" + "</div></div>";
                for (var i = 0; i < res.product.length; i++) {
                    list += "<div class='productsList-li-bg' id=" +
                        res.product[i].id + ">" +
                        "<div class='productsList-li'>" +
                        "<span class = 'list-name' >" +
                        res.product[i].title +
                        "</span> </div> </div>";
                }
                $(".productsList-ul").append(list);
                document.getElementById(artcleId).classList.add('li-choose');
                var artcon = "<div class='nr-detail-bg'><div class='nr-detail'><div class='nr-title'>" +
                    "<p class='head'>" + res.article.title + "</p>" +
                    "<p class='head-time'>" + "最近更新时间： " + res.article.update_time + "</p>" +
                    "</div><div class='nr-article'>" +
                    "<div class='markdown-view'>" +
                    res.article.content +
                    "</div><div class='article-access'>" +
                    "<span class='access-tip'>以上内容是否对你有所帮助</span>" +
                    "<button type='button' class='ar-bu-left'>有帮助</button>" +
                    "<button type='button' class='ar-bu-right'>没帮助</button>" +
                    "</div></div></div></div>";
                $(".articles").append(artcon);
            }
        })
    }
    $(".productsList-li-bg").click(function(e) {
        var a1 = $(this).attr("id");
        window.location.href("products.html?id=" + a1 + "&productId=" + productId);
    });
    $(".ar-bu-left").click(function(e) {
        $.ajax({
            async: false,
            type: "GET",
            url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/star?articleID=" + artcleId + "&status=" + 1,
            success: function(res) {
                alert("感谢你的支持！");
            }
        })
    });
    $(".ar-bu-right").click(function(e) {
        $.ajax({
            async: false,
            type: "GET",
            url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/star?articleID=" + artcleId + "&status=" + 0,
            success: function(res) {
                alert("感谢你的反馈！");
            }
        })
    })
})