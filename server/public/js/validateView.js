/**
 * Created by Administrator on 2017/6/30.
 */
$().ready(function() {
// 在键盘按下并释放及提交后验证提交表单
    $("#loginForm").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            username: {
                required: "请输入用户名"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 6 个字母"
            }
        },
        submitHandler: function() {
            //登录
            $.ajax({
                type:'post',
                url:'/api/login',
                data:{
                    username: $("#loginForm").find('[name="username"]').val(),
                    password: $("#loginForm").find('[name="password"]').val()
                },
                dataType:'json',
                success:function(result){
                    if(result.status == 1){
                        window.location.reload();
                    }
                }
            })
        }
    });

    $("#registerForm").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true,
                minlength: 6
            },
            repassword: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            }
        },
        messages: {
            username: {
                required: "请输入用户名"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 6 个字母"
            },
            repassword: {
                required: "请输入密码",
                minlength: "密码长度不能小于 6 个字母",
                equalTo: "两次密码输入不一致"
            }
        },
        submitHandler: function() {
            //注册
            $.ajax({
                type:'post',
                url:'/api/register',
                data:{
                    username:$("#registerForm").find('[name="username"]').val(),
                    password:$("#registerForm").find('[name="password"]').val()
                },
                dataType:'json',
                success:function(result){
                    alert(result.message);
                }
            })
        }
    });

});