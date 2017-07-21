/**
 * Created by Administrator on 2017/6/30.
 */
$(function () {
  var $loginForm = $('#loginForm')
  var $registerForm = $('#registerForm')
  var $forgetForm = $('#forgetForm')
  // 从登录切换到注册
  $('.registerBtn a').on('click', function () {
    $loginForm.hide()
    $forgetForm.hide()
    $registerForm.show()
  })
  //  切换到登录
  $('.hasUserBtn a').on('click', function () {
    $registerForm.hide()
    $forgetForm.hide()
    $loginForm.show()
  })
  //  切换到忘记密码
  $('#forgetBtn').on('click', function () {
    $registerForm.hide()
    $loginForm.hide()
    $forgetForm.show()
  })

  // 退出登录
  $('#logout').on('click', function () {
    $.ajax({
      type: 'get',
      url: '/api/logout',
      success: function (result) {
        console.log(result)
        if (result.status === 1) {
          window.location.reload()
        }
      }
    })
  })

  // 设置当前页选中
  var nowName = window.location.href.split('/')
  nowName = nowName[nowName.length - 1]
  $('#menu li').each(function () {
    var href = $(this).find('a').attr('href').split('/')
    href = href[href.length - 1]
    if (nowName === href) {
      $(this).addClass('active').siblings().removeClass('active');
    }
  })
})
//  分类列表删除按钮弹出框
function disp_confirm(url) {
  var r = confirm('确定要删除该分类？')
  if (r === true) {
    window.location.href = url
  }
}
