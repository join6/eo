function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
$(document).ready(function() {
    if (getUrlParam("productId") == null) {
        $.ajax({
            type: "GET",
            url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/admin/index",
            dataType: "json",
            success: function(res) {
                var proList = "<div class='manage-list-ul'>" +
                    "<div class='manage-list-li'>" +
                    "<span>" + "产品分类" + "</span>" +
                    "</div>" +
                    "<div class='manage-list-li'>" +
                    "<span>" + "最后编辑时间" + "</span>" +
                    "</div>" +
                    "<div class='manage-list-li-last'>" +
                    "<span>" + "操作" + "</span>" +
                    "</div>" +
                    "</div>";
                for (var i = 0; i < res.product.length; i++) {
                    proList += "<div class='manage-list-ul' id=" +
                        res.product[i].id +
                        ">" +
                        "<div class='manage-list-li-p'>" +
                        "<span class='center'>" +
                        res.product[i].name +
                        "</span></div>" +
                        "<div class='manage-list-li-t'>" +
                        "<span class='center'>" +
                        res.product[i].updatetime +
                        "</span></div>" +
                        "<div class='manage-list-li-w'>" +
                        "<div class='print' style='cursor: pointer'>" + "编辑" + "</div>" +
                        "<div> | </div>" +
                        "<div class='delete' style='cursor: pointer'>" + "删除" + "</div>" +
                        "</div></div>";
                }
                $(".manage-list-ul-bg").append(proList);
                $(".manage-list-ul-bg .manage-list-ul .manage-list-li-w").on("click", ".delete", function(e) {
                    var productId = $(".delete").parent().parent().attr('id');
                    $.ajax({
                        type: "DELETE",
                        url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/product/delete",
                        dataType: "json",
                        data: {
                            "productID": productId
                        },
                        success: function(res) {
                            alert(res.message);
                            if (res.success == true) {
                                $(productId).remove();
                            };
                        }
                    });
                });
                $(".manage-list-ul-bg .manage-list-ul .manage-list-li-w").on("click", ".print", function(e) {
                    var productId = $(".print").parent().parent().attr('id');
                    $.ajax({
                        type: "GET",
                        url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/top",
                        dataType: "json",
                        success: function(data) {
                            for (var i = 0; i < data.products.length; i++) {
                                if (productId == data.products[i].id) {
                                    document.getElementById('shade').classList.remove('hide');
                                    document.getElementById('pro-modal').classList.remove('hide');
                                    $("#productName-1").val(data.products[i].name);
                                    $("#productIcon-1").val(data.products[i].img);
                                    $("#productDetail-1").val(data.products[i].text);
                                }

                            }
                        }
                    });
                });
                $(".manage-list-ul-bg .manage-list-ul").on("click", ".manage-list-li-p", function(e) {
                    var productId = $(".manage-list-li-p").parent()[0].id;
                    var productName = "";
                    for (var i = 0; i < res.product.length; i++) {
                        if (productId == res.product[i].id)
                            productName = res.product[i].name;
                    }
                    window.location.href("back.html?productId=" + productId + "&productName=" + productName);
                });
            }
        });
    } else if (getUrlParam("productId") != null) {
        var pro = getUrlParam("productId");
        var pron = getUrlParam("productName");
        var title = "<span class='manage-title'>" + pron + "</span>";
        $(".manage-title-bg").append(title);
        document.getElementById('new-pro').classList.add('hide');
        document.getElementById('new-fir').classList.remove('hide');
        document.getElementById('new-art').classList.remove('hide');
        $.ajax({
            type: "GET",
            url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/admin/articles?id=" + pro,
            dataType: "json",
            success: function(res) {
                var artilist = "<div class='manage-list-ul'>" +
                    "<div class='manage-list-some'>" +
                    "<span>" + "一级分类/教程" + "</span>" +
                    "</div>" +
                    "<div class='manage-list-some'>" +
                    "<span>" + "赞   " + "</span>" +
                    "<span>" + "踩   " + "</span>" +
                    "<span>" + "阅读量       " + "</span>" +
                    "</div>" +
                    "<div class='manage-list-some'>" +
                    "<span>" + "最后编辑时间" + "</span>" +
                    "</div>" +
                    "<div class='manage-list-li-last'>" +
                    "<span>" + "操作" + "</span>" +
                    "</div>" +
                    "</div>";
                for (var i = 0; i < res.article.length; i++) {
                    artilist += "<div class='manage-list-ul' id=" +
                        res.article[i].id +
                        ">" +
                        "<div class='manage-list-at'>" +
                        "<span class='center'>" +
                        res.article[i].title +
                        "</span></div>" +
                        "<div class='manage-list-some'>" +
                        "<span>" + res.article[i].star + "       </span>" +
                        "<span>" + res.article[i].unstar + "     </span>" +
                        "<span>" + res.article[i].reading + "</span>" +
                        "</div>" +
                        "<div class='manage-list-li-am'>" +
                        "<span class='center'>" +
                        res.article[i].updatetime +
                        "</span></div>" +
                        "<div class='manage-list-li-w'>" +
                        "<div class='print' style='cursor: pointer'>" + "编辑" + "</div>" +
                        "<div> | </div>" +
                        "<div class='delete' style='cursor: pointer'>" + "删除" + "</div>" +
                        "</div></div>";
                }
                for (var i = 0; i < res.category.length; i++) {
                    artilist += "<div class='manage-list-ul' id=" +
                        res.category[i].id +
                        ">" +
                        "<div class='manage-list-ac'>" +
                        "<span class='center'>" +
                        res.category[i].name +
                        "</span></div>" +
                        "<div class='manage-list-some'>" +
                        "</div>" +
                        "<div class='manage-list-li-am'>" +
                        "<span class='center'>" +
                        res.category[i].updatetime +
                        "</span></div>" +
                        "<div class='manage-list-li-wa'>" +
                        "<div class='print' style='cursor: pointer'>" + "编辑" + "</div>" +
                        "<div> | </div>" +
                        "<div class='delete' style='cursor: pointer'>" + "删除" + "</div>" +
                        "</div></div>";
                }
                $(".manage-list-ul-bg").append(artilist);
                $(".manage-list-ul-bg .manage-list-ul").on("click", ".manage-list-li-ac", function(e) {
                    var cateId = $(".manage-list-li-ac").parent()[0].id;
                    alert(cateId);
                    for (var i = 0; i < res.product.length; i++) {
                        if (productId == res.product[i].id)
                            pron += ">" + res.product[i].name;
                    }
                    window.location.href("back.html?profriId=" + cateId + "&productName=" + productName);
                });
                $(".manage-list-ul-bg .manage-list-ul").on("click", ".manage-list-li-at", function(e) {
                    var artId = $(".manage-list-li-at").parent()[0].id;
                    window.location.href("back.html?proartId=" + cateId);
                });
                $(".manage-list-ul-bg .manage-list-ul .manage-list-li-wa").on("click", ".print", function(e) {
                    var firId = $(".print").parent().parent().attr('id');
                    $.ajax({
                        type: "GET",
                        url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/category/second",
                        dataType: "json",
                        data: {
                            "productID": pro
                        },
                        success: function(data) {
                            for (var i = 0; i < data.firstCategory.length; i++) {
                                if (firId == data.firstCategory[i].categoryID) {
                                    document.getElementById('shade').classList.remove('hide');
                                    document.getElementById('pro-modal').classList.remove('hide');
                                    $("#productName").val(pro);
                                    $("#productDetail").val(data.firstCategory[i].name);
                                }

                            }
                        }
                    });
                });
                $(".manage-list-ul-bg .manage-list-ul .manage-list-li-wa").on("click", ".delete", function(e) {
                    var artcleId = $(".delete").parent().parent().id;
                    $.ajax({
                        type: "DELETE",
                        url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/product/delete",
                        dataType: "json",
                        data: {
                            "productID": artcleId
                        },
                        success: function(res) {
                            $(artcleId).remove();
                        }
                    })
                });

            }
        });
    } else if (getUrlParam("profriId") != null) {
        var pro = getUrlParam("profriId");
        var pron = getUrlParam("productName");
        var title = "<span class='manage-title'>" + pron + "</span>";
        $(".manage-title-bg").append(title);
        document.getElementById('new-fir').classList.add('hide');
        document.getElementById('new-sec').classList.remove('hide');
        document.getElementById('new-art').classList.remove('hide');
        $.ajax({
            type: "GET",
            url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/category/detail?categoryID=" + pro,
            dataType: "json",
            success: function(res) {
                var artilist = "<div class='manage-list-ul'>" +
                    "<div class='manage-list-some'>" +
                    "<span>" + "二级分类/教程" + "</span>" +
                    "</div>" +
                    "<div class='manage-list-some'>" +
                    "<span>" + "赞   " + "</span>" +
                    "<span>" + "踩   " + "</span>" +
                    "<span>" + "阅读量       " + "</span>" +
                    "</div>" +
                    "<div class='manage-list-some'>" +
                    "<span>" + "最后编辑时间" + "</span>" +
                    "</div>" +
                    "<div class='manage-list-li-last'>" +
                    "<span>" + "操作" + "</span>" +
                    "</div>" +
                    "</div>";
                for (var i = 0; i < res.article.length; i++) {
                    artilist += "<div class='manage-list-ul' id=" +
                        res.article[i].id +
                        ">" +
                        "<div class='manage-list-at'>" +
                        "<span class='center'>" +
                        res.article[i].title +
                        "</span></div>" +
                        "<div class='manage-list-some'>" +
                        "<span>" + res.article[i].star + "   </span>" +
                        "<span>" + res.article[i].unstar + "   </span>" +
                        "<span>" + res.article[i].reading + "</span>" +
                        "</div>" +
                        "<div class='manage-list-li-am'>" +
                        "<span class='center'>" +
                        res.article[i].updatetime +
                        "</span></div>" +
                        "<div class='manage-list-li-w'>" +
                        "<div class='print' style='cursor: pointer'>" + "编辑" + "</div>" +
                        "<div> | </div>" +
                        "<div class='delete' style='cursor: pointer'>" + "删除" + "</div>" +
                        "</div></div>";
                }
                for (var i = 0; i < res.category.length; i++) {
                    artilist += "<div class='manage-list-ul' id=" +
                        res.category[i].id +
                        ">" +
                        "<div class='manage-list-ac'>" +
                        "<span class='center'>" +
                        res.category[i].name +
                        "</span></div>" +
                        "<div class='manage-list-some'>" +
                        "</div>" +
                        "<div class='manage-list-li-am'>" +
                        "<span class='center'>" +
                        res.category[i].updatetime +
                        "</span></div>" +
                        "<div class='manage-list-li-wa'>" +
                        "<div class='print' style='cursor: pointer'>" + "编辑" + "</div>" +
                        "<div> | </div>" +
                        "<div class='delete' style='cursor: pointer'>" + "删除" + "</div>" +
                        "</div></div>";
                }
                $(".manage-list-ul-bg").append(artilist);
                $(".manage-list-ul-bg .manage-list-ul .manage-list-li-wa").on("click", ".print", function(e) {
                    var productId = $(".print").parent().parent().attr('id');
                    $.ajax({
                        type: "GET",
                        url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/top",
                        dataType: "json",
                        success: function(data) {
                            for (var i = 0; i < data.products.length; i++) {
                                if (productId == data.products[i].id) {
                                    document.getElementById('shade').classList.remove('hide');
                                    document.getElementById('pro-modal').classList.remove('hide');
                                    $("#productName-1").val(data.products[i].name);
                                    $("#productIcon-1").val(data.products[i].img);
                                    $("#productDetail-1").val(data.products[i].text);
                                }

                            }
                        }
                    });
                });
                $(".manage-list-ul-bg .manage-list-ul .manage-list-li-wa").on("click", ".delete", function(e) {
                    var artcleId = $(".delete").parent().parent().id;
                    $.ajax({
                        type: "DELETE",
                        url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/product/delete",
                        dataType: "json",
                        data: {
                            "productID": artcleId
                        },
                        success: function(res) {
                            $(artcleId).remove();
                        }
                    })
                });
                $(".manage-list-ul-bg .manage-list-ul").on("click", ".manage-list-li-p", function(e) {
                    var productId = $(".manage-list-li-p").parent()[0].id;
                    for (var i = 0; i < res.product.length; i++) {
                        if (productId == res.product[i].id)
                            pro += " > " + res.product[i].name;
                    }
                    window.location.href("back.html?prosecId=" + productId + "&productName=" + pro);
                });
                $(".manage-list-ul-bg .manage-list-ul").on("click", ".manage-list-li-ac", function(e) {
                    var productId = $(".manage-list-li-ac").parent()[0].id;
                    for (var i = 0; i < res.product.length; i++) {
                        if (productId == res.product[i].id)
                            pro += " > " + res.product[i].name;
                    }
                    window.location.href("back.html?prosecId=" + productId + "&productName=" + pro);
                });

            }
        });
    }
    $(".re-button").click(function(e) {
        window.location.href("help.html");
    });
    $(".close").click(function(e) {
        document.getElementById('shade').classList.add('hide');
        document.getElementById('pro-modal').classList.add('hide');
        document.getElementById('fri-modal').classList.add('hide');
        document.getElementById('modal').classList.add('hide');
    });
    $("#new-pro").click(function(e) {
        document.getElementById('shade').classList.remove('hide');
        document.getElementById('modal').classList.remove('hide');
    });
    $("#BSubmit").click(function(e) {
        $.ajax({
            type: "POST",
            url: "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/admin/addProduct",
            dataType: "json",
            data: {
                img: $(".myFileUpload").val(),
                name: $("#productName").val(),
                detail: $("#productDetail").val()
            },
            success: function(res) {
                window.location.href("back.html");
            }
        });
    });
    $(".print").click(function(e) {

    });
    $(".myFileUpload").change(function() {
        var arrs = $(this).val().split('\\');
        var filename = arrs[arrs.length - 1];
        $(".show").html(filename);
    });
    $("#new-fir").click(function(e) {
        document.getElementById('shade').classList.remove('hide');
        document.getElementById('fri-modal').classList.remove('hide');
    });

})