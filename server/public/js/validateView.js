/**
 * Created by Administrator on 2017/6/30.
 */
$().ready(function () {
// 在键盘按下并释放及提交后验证提交表单
  $('#loginForm').validate({
    rules: {
      username: {
        required: true
      },
      password: {
        required: true,
        isPassword: true
      }
    },
    messages: {
      username: {
        required: '请输入用户名'
      },
      password: {
        required: '请输入密码',
        isPassword: '密码至少包含数字字母，并且6-12位'
      }
    },
    submitHandler: function () {
      // 登录
      $.ajax({
        type: 'post',
        url: '/api/login',
        data: {
          username: $('#loginForm').find('[name="username"]').val(),
          password: $('#loginForm').find('[name="password"]').val()
        },
        dataType: 'json',
        success: function (result) {
          if (result.status === 1) {
            window.location.reload()
          } else {
            console.log(result)
          }
        }
      })
    }
  })

  $('#registerForm').validate({
    rules: {
      username: {
        required: true
      },
      password: {
        required: true,
        isPassword: true
      },
      repassword: {
        required: true,
        isPassword: true,
        equalTo: '#password'
      }
    },
    messages: {
      username: {
        required: '请输入用户名'
      },
      password: {
        required: '请输入密码',
        isPassword: '密码至少包含数字字母，并且6-12位'
      },
      repassword: {
        required: '请输入密码',
        isPassword: '密码至少包含数字字母，并且6-12位',
        equalTo: '两次密码输入不一致'
      }
    },
    submitHandler: function () {
      // 注册
      $.ajax({
        type: 'post',
        url: '/api/register',
        data: {
          username: $('#registerForm').find('[name="username"]').val(),
          password: $('#registerForm').find('[name="password"]').val()
        },
        dataType: 'json',
        success: function (result) {
          alert(result.message)
        }
      })
    }
  })
  jQuery.validator.addMethod('isPassword', (value) => {
    var password = /^(?=.*[0-9].*)(?=.*[a-z].*).{6,12}$/
    return password.test(value)
  }, '密码至少包含数字字母，并且6-12位')
})
